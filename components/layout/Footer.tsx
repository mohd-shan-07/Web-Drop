import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full bg-black border-t border-[#48494B]/50 pt-16 pb-8 mt-auto">
      <div className="w-full px-6 md:px-12 xl:px-24">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          <div className="md:col-span-2">
            {/* Logo Image Only - No Text */}
            <Link href="/" className="inline-block mb-6 opacity-90 hover:opacity-100 transition duration-200">
              <Image 
                src="/images/img.png" 
                alt="WebDrop Logo" 
                width={140} 
                height={42} 
                className="w-[110px] md:w-[130px] h-auto object-contain"
              />
            </Link>
            <p className="text-sm text-[#F3F4F0]/50 max-w-sm font-light leading-relaxed">
              Premium peer-to-peer file sharing. Move your data across devices instantly, securely, and freely.
            </p>
          </div>

          <div>
            <h4 className="text-[#F3F4F0] font-medium mb-6 text-sm">Product</h4>
            <ul className="space-y-4 text-sm text-[#F3F4F0]/50 font-light">
              <li><Link href="/send" className="hover:text-[#B19F91] transition-colors">Send Files</Link></li>
              <li><Link href="/receive" className="hover:text-[#B19F91] transition-colors">Receive Files</Link></li>
              <li><Link href="#features" className="hover:text-[#B19F91] transition-colors">Features</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[#F3F4F0] font-medium mb-6 text-sm">Legal</h4>
            <ul className="space-y-4 text-sm text-[#F3F4F0]/50 font-light">
              <li><Link href="/privacy" className="hover:text-[#B19F91] transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-[#B19F91] transition-colors">Terms of Service</Link></li>
              <li><a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-[#B19F91] transition-colors">GitHub</a></li>
            </ul>
          </div>
        </div>

        <div className="w-full border-t border-[#48494B]/30 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#F3F4F0]/40 font-light">
          <p>© {new Date().getFullYear()} WebDrop. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B19F91]" /> Operational
            </span>
            <span>v2.1.0</span>
          </div>
        </div>
        
      </div>
    </footer>
  );
}