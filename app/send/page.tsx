"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CloudUpload, ArrowRight, Loader2 } from "lucide-react";

export default function SendPage() {
  const router = useRouter();
  const [isGenerating, setIsGenerating] = useState(false);

  const generateRoomAndRedirect = () => {
    setIsGenerating(true);
    const roomId = Math.floor(100000 + Math.random() * 900000).toString();
    
    setTimeout(() => {
      router.push(`/room/${roomId}`);
    }, 600);
  };

  return (
    // Background updated to Soft Ivory
    <div className="w-full flex-1 flex flex-col items-center justify-center px-6 min-h-[85vh] bg-[#EFE9E0]">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md p-10 md:p-12 rounded-[2rem] bg-white/50 border border-[#1C1C1C]/10 backdrop-blur-md shadow-xl shadow-black/5 text-center"
      >
        <div className="w-16 h-16 mx-auto mb-8 rounded-2xl border border-[#0F9E99]/20 flex items-center justify-center bg-[#0F9E99]/10 shadow-sm">
          <CloudUpload className="w-7 h-7 text-[#0F9E99]" />
        </div>
        
        <h2 className="text-2xl font-medium tracking-tight mb-3 text-[#1C1C1C]">Send a File</h2>
        <p className="text-[#1C1C1C]/70 text-sm font-light leading-relaxed mb-10 px-2">
          Click below to generate a secure room code. You will be able to select your files on the next screen.
        </p>

        <button 
          onClick={generateRoomAndRedirect}
          disabled={isGenerating}
          className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-[#0F9E99] text-white font-medium transition-all hover:bg-[#0C807B] disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-[#0F9E99]/20 hover:shadow-xl hover:shadow-[#0F9E99]/30"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" /> Preparing Secure Room...
            </>
          ) : (
            <>
              Generate Code & Select File <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </motion.div>
    </div>
  );
}