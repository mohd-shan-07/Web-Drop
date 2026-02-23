import { create } from 'zustand';

export interface FileQueueItem {
  id: string;
  file: File;
  progress: number;
  status: 'pending' | 'transferring' | 'paused' | 'completed' | 'error';
  speed: number; // Bytes per second
}

interface TransferState {
  // Connection
  isConnected: boolean;
  connectionQuality: 'excellent' | 'good' | 'poor' | 'disconnected';
  peerDeviceName: string | null;
  peerDeviceType: 'desktop' | 'mobile' | null;
  
  // File Queue
  queue: FileQueueItem[];
  addFiles: (files: File[]) => void;
  removeFile: (id: string) => void;
  updateFileProgress: (id: string, progress: number, speed: number) => void;
  setFileStatus: (id: string, status: FileQueueItem['status']) => void;
  
  // Analytics
  transferStartTime: number | null;
  totalBytesTransferred: number;
}

export const useTransferStore = create<TransferState>((set) => ({
  isConnected: false,
  connectionQuality: 'disconnected',
  peerDeviceName: null,
  peerDeviceType: null,
  
  queue: [],
  transferStartTime: null,
  totalBytesTransferred: 0,

 addFiles: (files) => set((state) => ({
    queue: [
      ...state.queue,
      ...files.map(file => ({
        id: crypto.randomUUID(),
        file,
        progress: 0,
        status: 'pending' as const, // <-- FIX: Add 'as const' here
        speed: 0
      }))
    ]
  })),
  removeFile: (id) => set((state) => ({
    queue: state.queue.filter(item => item.id !== id)
  })),

  updateFileProgress: (id, progress, speed) => set((state) => ({
    queue: state.queue.map(item => 
      item.id === id ? { ...item, progress, speed } : item
    )
  })),

  setFileStatus: (id, status) => set((state) => ({
    queue: state.queue.map(item => 
      item.id === id ? { ...item, status } : item
    )
  })),
}));