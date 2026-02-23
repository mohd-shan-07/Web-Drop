import { useEffect, useRef, useState, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import { toast } from 'sonner';

const ICE_SERVERS = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:global.stun.twilio.com:3478' }
  ],
};

const CHUNK_SIZE = 16 * 1024;

export interface TransferHistory {
  id: string;
  name: string;
  size: string;
  date: string;
  type: 'sent' | 'received';
}

export function useWebRTC(roomId: string) {
  const [status, setStatus] = useState<'idle' | 'connecting' | 'connected' | 'transferring' | 'completed'>('idle');
  const [progress, setProgress] = useState(0);
  const [speed, setSpeed] = useState<string>('0 KB/s');
  const [currentFileName, setCurrentFileName] = useState<string>(""); // NEW: Tracks the active file
  const [history, setHistory] = useState<TransferHistory[]>([]);
  
  const socketRef = useRef<Socket | null>(null);
  const peerRef = useRef<RTCPeerConnection | null>(null);
  const dataChannelRef = useRef<RTCDataChannel | null>(null);
  
  const lastBytesRef = useRef(0);
  const lastTimeRef = useRef(Date.now());

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  useEffect(() => {
    socketRef.current = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001');
    socketRef.current.emit('join-room', roomId);

    socketRef.current.on('user-connected', async () => {
      setStatus('connecting');
      const peer = createPeer();
      const channel = peer.createDataChannel('file-transfer');
      setupDataChannel(channel);
      dataChannelRef.current = channel;

      const offer = await peer.createOffer();
      await peer.setLocalDescription(offer);
      socketRef.current?.emit('signal', { room: roomId, signal: offer });
    });

    socketRef.current.on('signal', async ({ signal }) => {
      if (!peerRef.current) peerRef.current = createPeer();
      
      try {
        if (signal.type === 'offer') {
          setStatus('connecting');
          await peerRef.current.setRemoteDescription(new RTCSessionDescription(signal));
          const answer = await peerRef.current.createAnswer();
          await peerRef.current.setLocalDescription(answer);
          socketRef.current?.emit('signal', { room: roomId, signal: answer });
          
          peerRef.current.ondatachannel = (event) => {
            setupDataChannel(event.channel);
            dataChannelRef.current = event.channel;
          };
        } else if (signal.type === 'answer') {
          await peerRef.current.setRemoteDescription(new RTCSessionDescription(signal));
        } else if (signal.candidate) {
          await peerRef.current.addIceCandidate(new RTCIceCandidate(signal.candidate));
        }
      } catch (error) {
        console.error("Error processing WebRTC signal:", error);
      }
    });

    return () => {
      socketRef.current?.disconnect();
      peerRef.current?.close();
    };
  }, [roomId]);

  function createPeer() {
    const peer = new RTCPeerConnection(ICE_SERVERS);
    peerRef.current = peer;
    peer.onicecandidate = (event) => {
      if (event.candidate) socketRef.current?.emit('signal', { room: roomId, signal: { candidate: event.candidate } });
    };
    peer.onconnectionstatechange = () => {
      if (peer.connectionState === 'connected') setStatus('connected');
      if (peer.connectionState === 'disconnected') setStatus('idle');
    };
    return peer;
  }

  // --- RECEIVER LOGIC ---
  let receivedChunks: ArrayBuffer[] = [];
  let receivedBytes = 0;
  let expectedSize = 0;
  let activeFileName = "";

  function setupDataChannel(channel: RTCDataChannel) {
    channel.onopen = () => {
      setStatus('connected');
      toast.success('Peer Connected!');
    };

    channel.onmessage = (event) => {
      const { data } = event;
      
      if (typeof data === 'string') {
        const meta = JSON.parse(data);
        if (meta.type === 'metadata') {
          expectedSize = meta.size;
          activeFileName = meta.name;
          setCurrentFileName(meta.name); // Update UI
          receivedChunks = [];
          receivedBytes = 0;
          setStatus('transferring');
          lastTimeRef.current = Date.now();
        }
        return;
      }

      receivedChunks.push(data);
      receivedBytes += data.byteLength;
      
      const percentage = Math.min(100, Math.round((receivedBytes / expectedSize) * 100));
      setProgress(percentage);
      updateSpeed(receivedBytes);

      if (receivedBytes >= expectedSize) {
        setStatus('completed');
        downloadFile(new Blob(receivedChunks), activeFileName);
        toast.success(`Received: ${activeFileName}`);
        
        setHistory(prev => [{
          id: crypto.randomUUID(), name: activeFileName, size: formatBytes(expectedSize),
          date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), type: 'received'
        }, ...prev]);
      }
    };
  }

  // --- SENDER LOGIC (MULTI-FILE QUEUE) ---
  const sendFiles = useCallback((files: File[]) => {
    if (!dataChannelRef.current || dataChannelRef.current.readyState !== 'open') {
      toast.error('Connection not ready');
      return;
    }

    // Recursive function to send files sequentially
    const sendNextFile = (index: number) => {
      if (index >= files.length) {
        setStatus('completed');
        setCurrentFileName("");
        toast.success('All files sent successfully!');
        return;
      }

      const file = files[index];
      setCurrentFileName(file.name);
      setStatus('transferring');
      
      // 1. Send Metadata
      dataChannelRef.current!.send(JSON.stringify({ type: 'metadata', name: file.name, size: file.size }));

      // 2. Send Chunks
      const reader = new FileReader();
      let offset = 0;

      reader.onload = (e) => {
        if (e.target?.result && dataChannelRef.current) {
          const buffer = e.target.result as ArrayBuffer;
          dataChannelRef.current.send(buffer);
          offset += buffer.byteLength;

          setProgress(Math.round((offset / file.size) * 100));
          updateSpeed(offset);

          if (offset < file.size) {
            readSlice(offset);
          } else {
            // Finished sending THIS file
            setHistory(prev => [{
              id: crypto.randomUUID(), name: file.name, size: formatBytes(file.size),
              date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), type: 'sent'
            }, ...prev]);
            
            // Wait a tiny bit, then send the next file in the array
            setTimeout(() => sendNextFile(index + 1), 200);
          }
        }
      };

      const readSlice = (o: number) => reader.readAsArrayBuffer(file.slice(o, o + CHUNK_SIZE));
      readSlice(0);
    };

    sendNextFile(0); // Start the queue
  }, []);

  function updateSpeed(currentBytes: number) {
    const now = Date.now();
    const timeDiff = (now - lastTimeRef.current) / 1000;
    if (timeDiff >= 1) {
      const speedMB = ((currentBytes - lastBytesRef.current) / 1024 / 1024).toFixed(2);
      setSpeed(`${speedMB} MB/s`);
      lastBytesRef.current = currentBytes;
      lastTimeRef.current = now;
    }
  }

  function downloadFile(blob: Blob, name: string) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = name;
    a.click();
    URL.revokeObjectURL(url);
  }

  function resetTransfer() {
    setStatus(peerRef.current?.connectionState === 'connected' ? 'connected' : 'idle');
    setProgress(0);
    setSpeed('0 KB/s');
    setCurrentFileName("");
  }

  return { status, progress, speed, currentFileName, sendFiles, history, resetTransfer };
}