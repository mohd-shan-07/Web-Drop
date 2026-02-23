"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useWebRTC } from "@/hooks/useWebRTC";
import TransferRoom from "@/components/transfer/TransferRoom";
import RecentActivity from "@/components/activity/RecentActivity";
import { FileUp } from "lucide-react";
import { toast } from "sonner";

export default function RoomPage() {
  const params = useParams();
  const roomId = params.id as string;
  
  const { status, progress, speed, currentFileName, sendFiles, history, resetTransfer } = useWebRTC(roomId);
  
  const [pendingFiles, setPendingFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  // Process files from click OR drag
  const handleFiles = (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    if (fileArray.length === 0) return;

    setPendingFiles(fileArray);
    
    if (status === 'connected') {
      sendFiles(fileArray);
      setPendingFiles([]); // clear pending after sending
    } else {
      toast.info(`${fileArray.length} file(s) queued! Waiting for peer to connect...`);
    }
  };

  // Drag Event Handlers
  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  // Auto-send if files were queued BEFORE the peer connected
  useEffect(() => {
    if (status === 'connected' && pendingFiles.length > 0) {
      sendFiles(pendingFiles);
      setPendingFiles([]);
    }
  }, [status, pendingFiles, sendFiles]);

  return (
    <div className="min-h-[85vh] pt-24 pb-12 px-6 flex flex-col items-center bg-[#EFE9E0] text-[#1C1C1C]">
      
      <TransferRoom 
        roomId={roomId}
        status={status}
        progress={progress}
        speed={speed}
        fileName={currentFileName}
        onReset={resetTransfer}
      />

      {status !== 'transferring' && status !== 'completed' && (
        <div className="mt-8 w-full max-w-md">
          {/* Light Theme: Frosted Glass Drag & Drop Zone */}
          <label 
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            className={`group cursor-pointer relative w-full flex flex-col items-center justify-center h-40 rounded-2xl border-2 border-dashed transition-all shadow-xl shadow-black/5 ${
              isDragging 
                ? "bg-[#0F9E99]/10 border-[#0F9E99]" 
                : "bg-white/50 border-[#1C1C1C]/20 hover:bg-white/80 hover:border-[#0F9E99]/50"
            }`}
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <div className={`p-3 rounded-full mb-3 transition-colors ${
                isDragging ? "bg-[#0F9E99]/20" : "bg-[#1C1C1C]/5 group-hover:bg-[#0F9E99]/10"
              }`}>
                <FileUp className={`w-8 h-8 transition-colors ${
                  isDragging ? "text-[#0F9E99]" : "text-[#1C1C1C]/40 group-hover:text-[#0F9E99]"
                }`} />
              </div>
              <p className="text-sm text-[#1C1C1C]/60 text-center px-4">
                <span className="font-semibold text-[#1C1C1C]">Click to select</span> or drag files here
              </p>
            </div>
            {/* Added value reset to allow re-uploading the exact same file if necessary */}
            <input 
              type="file" 
              multiple 
              className="hidden" 
              onChange={(e) => {
                if (e.target.files) handleFiles(e.target.files);
                e.target.value = '';
              }} 
            />
          </label>
        </div>
      )}

      <RecentActivity activities={history} />
    </div>
  );
}