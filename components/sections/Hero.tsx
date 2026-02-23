"use client";
import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="w-full relative pt-32 pb-24 overflow-hidden border-b border-white/5">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent/10 blur-[120px] rounded-full pointer-events-none" />

      {/* FIX: Expanded to max-w-[1400px] */}
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-10 relative z-10 flex flex-col items-center text-center">
        <motion.div 
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-muted mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          WebRTC P2P Protocol Active
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.1]"
        >
          Share files instantly. <br className="hidden md:block" />
          Direct to device.
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="text-base text-muted mb-10 max-w-xl mx-auto leading-relaxed"
        >
          No cloud storage. No size limits. End-to-end encrypted. 
          WebDrop moves your data over the shortest possible path.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
        >
          <Link href="/send" className="w-full sm:w-auto">
            <button className="w-full flex items-center justify-center gap-2 bg-accent text-white px-8 py-3.5 rounded-lg font-medium transition-all duration-200 hover:scale-[1.02] hover:bg-blue-600">
              Start Sharing <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
          <Link href="/receive" className="w-full sm:w-auto">
            <button className="w-full flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg font-medium text-white border border-white/10 bg-white/5 transition-all duration-200 hover:bg-white/10">
              <Download className="w-4 h-4" /> Receive File
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}