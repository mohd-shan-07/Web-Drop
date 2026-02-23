"use client";
import Link from "next/link";
import Image from "next/image";
import { Settings, Github, ArrowRight } from "lucide-react";

export default function Navbar() {
  return (
    <header className="fixed top-0 w-full z-50 bg-[#EFE9E0] transition-colors duration-300">
      <div className="w-full px-6 md:px-12 h-16 flex items-center justify-between">
        
        <Link href="/" className="flex items-center opacity-90 hover:opacity-100 transition duration-200">
          <Image 
            src="/images/img.png" 
            alt="WebDrop Logo" 
            width={160} 
            height={48} 
            priority
            unoptimized // 👈 THIS BYPASSES THE CACHE SO YOUR NEW IMAGE SHOWS
            className="w-[130px] md:w-[160px] h-auto object-contain"
          />
        </Link>

        <div className="flex items-center gap-1 sm:gap-3">
          <button className="p-2 rounded-lg text-[#1C1C1C]/60 hover:text-[#0F9E99] hover:bg-[#1C1C1C]/5 transition-all">
            <Settings className="w-5 h-5" />
          </button>
          
          <a href="https://github.com" target="_blank" rel="noreferrer" className="p-2 rounded-lg text-[#1C1C1C]/60 hover:text-[#0F9E99] hover:bg-[#1C1C1C]/5 transition-all hidden sm:block">
            <Github className="w-5 h-5" />
          </a>

          <Link href="/send" className="ml-2 hidden md:block">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0F9E99] text-white text-sm font-medium transition-colors hover:bg-[#0C807B] shadow-lg shadow-[#0F9E99]/20">
              Share File <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </Link>
        </div>

      </div>
    </header>
  );
}