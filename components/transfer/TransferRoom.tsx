"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Monitor, Smartphone, CheckCircle, FileText } from "lucide-react";
import { useEffect } from "react";
import confetti from "canvas-confetti";

interface RoomProps {
  status: 'idle' | 'connecting' | 'connected' | 'transferring' | 'completed';
  progress: number;
  speed: string;
  fileName?: string; 
  roomId: string;
  onReset: () => void;
}

export default function TransferRoom({ status, progress, speed, fileName, roomId, onReset }: RoomProps) {
  
  useEffect(() => {
    if (status === 'completed') {
      // Updated confetti to match Tropical Teal theme
      confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ['#0F9E99', '#ffffff'] });
    }
  }, [status]);

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-8 px-4">
        <div className="flex items-center gap-2">
          {/* Status Dot and Text in Tropical Teal */}
          <div className="w-2 h-2 rounded-full bg-[#0F9E99] animate-pulse" />
          <span className="text-sm font-medium text-[#0F9E99] uppercase tracking-wider">Secure Room {roomId}</span>
        </div>
        <div className="px-3 py-1 rounded-full bg-white/60 border border-[#1C1C1C]/10 text-xs text-[#1C1C1C]/60 shadow-sm">
          {status === 'connected' || status === 'transferring' ? 'Direct P2P Encrypted' : 'Waiting for Peer...'}
        </div>
      </div>

      {/* Main Glassmorphism Card */}
      <div className="relative overflow-hidden rounded-3xl bg-white/50 backdrop-blur-md border border-[#1C1C1C]/10 shadow-xl shadow-black/5 p-8 md:p-12">
        <div className="flex items-center justify-between mb-16 relative z-10">
          
          {/* Sender */}
          <div className="flex flex-col items-center gap-4">
            <div className="w-20 h-20 rounded-2xl bg-white border border-[#1C1C1C]/10 flex items-center justify-center shadow-sm">
              <Monitor className="w-8 h-8 text-[#1C1C1C]/50" />
            </div>
            <span className="text-sm text-[#1C1C1C]/60 font-medium">Your Device</span>
          </div>

          {/* Progress Line */}
          <div className="flex-1 mx-8 relative h-[2px] bg-[#1C1C1C]/10 rounded-full overflow-hidden">
            {status !== 'idle' && (
              <motion.div 
                className="h-full bg-[#0F9E99] shadow-[0_0_20px_rgba(15,158,153,0.5)]"
                initial={{ width: "0%" }}
                animate={{ width: status === 'connected' ? "100%" : status === 'transferring' ? `${progress}%` : "50%" }}
                transition={status === 'connecting' ? { repeat: Infinity, duration: 1.5 } : { duration: 0.5 }}
              />
            )}
          </div>

          {/* Receiver */}
          <div className="flex flex-col items-center gap-4">
            <div className={`w-20 h-20 rounded-2xl border flex items-center justify-center shadow-sm transition-all duration-500 ${
              status !== 'idle' 
                ? 'bg-[#0F9E99]/10 border-[#0F9E99]/50 shadow-[0_0_20px_rgba(15,158,153,0.15)]' 
                : 'bg-white/50 border-[#1C1C1C]/10 border-dashed'
            }`}>
              {status === 'idle' ? (
                <div className="animate-pulse text-2xl font-mono text-[#1C1C1C]/30">?</div>
              ) : (
                <Smartphone className="w-8 h-8 text-[#0F9E99]" />
              )}
            </div>
            <span className="text-sm text-[#1C1C1C]/60 font-medium">Remote Peer</span>
          </div>
        </div>

        {/* Dynamic Content States */}
        <AnimatePresence mode="wait">
          
          {/* 1. TRANSFERRING STATE */}
          {status === 'transferring' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-center">
              <h3 className="text-2xl font-bold text-[#1C1C1C] mb-2">{progress}%</h3>
              <p className="text-[#1C1C1C]/60 text-sm mb-6 font-mono">{speed}</p>
              
              {fileName && (
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-lg bg-white border border-[#1C1C1C]/10 shadow-sm">
                  <FileText className="w-4 h-4 text-[#0F9E99]" />
                  <span className="text-sm text-[#1C1C1C]/80 truncate max-w-[200px]">{fileName}</span>
                </div>
              )}
            </motion.div>
          )}

          {/* 2. COMPLETED STATE */}
          {status === 'completed' && (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-[#0F9E99]/10 border border-[#0F9E99]/20 flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-[#0F9E99]" />
              </div>
              <h3 className="text-xl font-bold text-[#1C1C1C] mb-1">Transfer Complete</h3>
              <p className="text-[#1C1C1C]/60 text-sm mb-6">All files sent successfully.</p>
              <button 
                onClick={onReset} 
                className="px-8 py-3 bg-[#0F9E99] hover:bg-[#0C807B] text-white rounded-xl text-sm font-medium transition-colors shadow-lg shadow-[#0F9E99]/20"
              >
                Send More Files
              </button>
            </motion.div>
          )}

          {/* 3. IDLE (WAITING) STATE */}
          {status === 'idle' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center space-y-4">
              <div className="inline-block p-4 bg-white rounded-2xl border border-[#1C1C1C]/10 shadow-sm">
                <div className="text-4xl font-mono font-bold tracking-[0.2em] text-[#1C1C1C]">{roomId}</div>
              </div>
              <p className="text-[#1C1C1C]/60 text-sm">Share this code with the receiver</p>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}