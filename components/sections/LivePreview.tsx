"use client";
import { motion } from "framer-motion";
import { Monitor, Smartphone, FileArchive, CheckCircle2 } from "lucide-react";

export default function LivePreview() {
  return (
    <section className="w-full py-24 border-b border-white/5 overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-white mb-12">Frictionless connection.</h2>
        
        <div className="p-8 rounded-2xl bg-card border border-white/10 shadow-2xl relative">
          <div className="flex items-center justify-between mb-8 relative z-10">
            {/* Sender */}
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                <Monitor className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs text-muted font-medium">MacBook Pro</span>
            </div>

            {/* Connecting Line & Progress */}
            <div className="flex-1 mx-8 relative">
              <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="h-full bg-accent"
                />
              </div>
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-mono text-muted tracking-widest uppercase">
                Transferring • 45 MB/s
              </div>
            </div>

            {/* Receiver */}
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center">
                <Smartphone className="w-5 h-5 text-accent" />
              </div>
              <span className="text-xs text-muted font-medium">iPhone 15</span>
            </div>
          </div>

          {/* File Card UI */}
          <div className="bg-background rounded-lg border border-white/5 p-4 flex items-center justify-between text-left">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/5 rounded-md"><FileArchive className="w-4 h-4 text-muted" /></div>
              <div>
                <p className="text-sm text-white font-medium">startup_assets.zip</p>
                <p className="text-xs text-muted">1.2 GB • 45 seconds remaining</p>
              </div>
            </div>
            <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
              <CheckCircle2 className="w-5 h-5 text-emerald-500 opacity-50" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}