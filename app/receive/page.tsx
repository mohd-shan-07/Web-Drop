"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { DownloadCloud, ArrowRight } from "lucide-react";

export default function ReceivePage() {
  const router = useRouter();
  const [code, setCode] = useState("");

  const handleJoinRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length === 6) {
      router.push(`/room/${code}`);
    }
  };

  return (
    // Matches the Soft Ivory background
    <div className="w-full flex-1 flex flex-col items-center justify-center px-6 min-h-[85vh] bg-[#EFE9E0]">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md p-10 md:p-12 rounded-[2rem] bg-white/50 border border-[#1C1C1C]/10 backdrop-blur-md shadow-xl shadow-black/5 text-center"
      >
        {/* Premium Icon Wrapper with Tropical Teal */}
        <div className="w-16 h-16 mx-auto mb-8 rounded-2xl border border-[#0F9E99]/20 flex items-center justify-center bg-[#0F9E99]/10 shadow-sm">
          <DownloadCloud className="w-7 h-7 text-[#0F9E99]" />
        </div>
        
        <h2 className="text-2xl font-medium tracking-tight mb-3 text-[#1C1C1C]">Receive a File</h2>
        <p className="text-[#1C1C1C]/70 text-sm font-light leading-relaxed mb-10 px-2">
          Enter the 6-digit code from the sender to connect instantly.
        </p>
        
        <form onSubmit={handleJoinRoom} className="space-y-4">
          {/* Luxury minimal input field */}
          <input 
            type="text" 
            maxLength={6}
            placeholder="000000"
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/[^0-9]/g, ''))}
            className="w-full text-center text-4xl font-mono tracking-[0.4em] text-[#1C1C1C] bg-transparent border-b-2 border-[#1C1C1C]/20 focus:outline-none focus:border-[#0F9E99] pb-4 transition-colors placeholder:text-[#1C1C1C]/20"
          />
          
          {/* Button changes state dynamically: 
            Disabled = Light grey wash, Active = Tropical Teal 
          */}
          <button 
            type="submit"
            disabled={code.length !== 6}
            className="w-full mt-10 flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-medium transition-all
                       disabled:cursor-not-allowed disabled:bg-[#1C1C1C]/5 disabled:text-[#1C1C1C]/40 
                       bg-[#0F9E99] text-white hover:bg-[#0C807B] hover:shadow-lg hover:shadow-[#0F9E99]/20"
          >
            Connect to Device {code.length === 6 && <ArrowRight className="w-4 h-4" />}
          </button>
        </form>
      </motion.div>
    </div>
  );
}