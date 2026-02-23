"use client";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Download } from "lucide-react"; 
import { 
  FcDisplay, FcIphone, FcDataBackup, FcGlobe, FcLock, 
  FcKey, FcChargeBattery, FcOpenedFolder, FcSmartphoneTablet, 
  FcVideoFile, FcShare, FcCheckmark 
} from "react-icons/fc";
import { 
  FaInstagram, FaWhatsapp, FaLinkedin, FaGithub,
  FaAndroid, FaApple, FaWindows 
} from "react-icons/fa";

const STEPS = [
  { step: "01", title: "Select your file", desc: "Drag and drop any file. No accounts, no onboarding." },
  { step: "02", title: "Share the code", desc: "WebDrop generates a secure 6-digit room code instantly." },
  { step: "03", title: "Transfer instantly", desc: "The receiver enters the code and the P2P transfer begins." },
];

const FEATURES = [
  { icon: FcDataBackup, title: "No Cloud Storage", desc: "Files transfer directly between devices. We never hold your data." },
  { icon: FcGlobe, title: "Cross-Platform", desc: "Share seamlessly between iOS, Android, macOS, and Windows." },
  { icon: FcLock, title: "E2E Encrypted", desc: "Secured via WebRTC DTLS and SRTP protocols by default." },
  { icon: FcKey, title: "No Sign-up", desc: "Zero friction. Open the application and begin transferring." },
  { icon: FcChargeBattery, title: "Blazing Fast", desc: "Utilizes local network speeds when devices share a connection." },
  { icon: FcOpenedFolder, title: "Unlimited Size", desc: "Send 10MB or 100GB. Peer-to-peer transfers have no caps." },
];

const PLATFORM_TRANSFERS = [
  {
    id: 1,
    fromIcon: FaAndroid,
    toIcon: FaApple,
    title: "Android → iPhone",
    desc: "Send photos from Android to iPhone instantly."
  },
  {
    id: 2,
    fromIcon: FaApple,
    toIcon: FaWindows,
    title: "iPhone → Windows",
    desc: "Move files from iPhone to Windows without cables."
  },
  {
    id: 3,
    fromIcon: FaApple,
    toIcon: FaAndroid,
    title: "Mac → Android",
    desc: "Share large files from Mac to Android seamlessly."
  },
  {
    id: 4,
    fromIcon: FaWindows,
    toIcon: FaApple,
    title: "Windows → Mac",
    desc: "Transfer documents from Windows to Mac in seconds."
  }
];

const USE_CASES = [
  { icon: FcSmartphoneTablet, title: "Phone to Laptop", desc: "Move media to your desktop without emailing it to yourself." },
  { icon: FcVideoFile, title: "Large Video Files", desc: "Send 4K videos directly to a client without hitting cloud limits." },
  { icon: FcShare, title: "Quick Sharing", desc: "Instantly drop a document to a coworker sitting across the room." },
];

const RECENT_ACTIVITY = [
  { name: "brand_assets_v2.zip", size: "1.2 GB", status: "Completed" },
  { name: "financial_report.pdf", size: "4.2 MB", status: "Completed" },
  { name: "campaign_video_4k.mp4", size: "840 MB", status: "Completed" },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

function CrossPlatformShowcase() {
  return (
    // UPDATED: Background matches the exact Soft Ivory (#EFE9E0) of the main page
    <section className="w-full py-24 border-y border-[#1C1C1C]/10 bg-[#EFE9E0]">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-[#111111] mb-4">
            Works across every device.
          </h2>
          <p className="text-lg text-[#6b6b6b]">
            Send from anywhere. Receive everywhere.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PLATFORM_TRANSFERS.map((transfer) => (
            <div 
              key={transfer.id}
              className="group flex flex-col p-8 rounded-xl bg-white border border-[#1C1C1C]/10 shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-[#0F9E99]/50 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-10">
                {/* UPDATED: Inner circles are Soft Ivory to pop against the white cards */}
                <div className="w-14 h-14 rounded-full bg-[#EFE9E0] flex items-center justify-center shadow-sm">
                  <transfer.fromIcon className="w-6 h-6 text-[#111111]" />
                </div>
                <ArrowRight className="w-5 h-5 text-[#0F9E99] transition-transform duration-300 group-hover:translate-x-1" />
                <div className="w-14 h-14 rounded-full bg-[#EFE9E0] flex items-center justify-center shadow-sm">
                  <transfer.toIcon className="w-6 h-6 text-[#111111]" />
                </div>
              </div>
              <h3 className="text-lg font-medium text-[#111111] mb-2">{transfer.title}</h3>
              <p className="text-sm text-[#6b6b6b] leading-relaxed">{transfer.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default function LuxuryLandingPage() {
  return (
    <div className="w-full bg-[#EFE9E0] text-[#1C1C1C] font-sans selection:bg-[#0F9E99]/30 relative overflow-x-hidden">
      
      {/* 1️⃣ HERO SECTION */}
      <section className="w-full pt-48 pb-32 flex flex-col items-center justify-center text-center">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="w-full px-6 md:px-12">
          <h1 className="text-5xl md:text-7xl font-medium tracking-tight mb-8 text-[#1C1C1C] leading-[1.1]">
            Share files instantly.<br />
            Direct to device.
          </h1>
          
          <p className="text-lg text-[#1C1C1C]/70 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            No cloud storage. No size limits. End-to-end encrypted. <br className="hidden md:block" />
            WebDrop routes your data over the shortest possible path.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/send" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-3.5 rounded-lg bg-[#0F9E99] text-white font-medium transition-colors hover:bg-[#0C807B] shadow-lg shadow-[#0F9E99]/20">
                Start Sharing <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
            <Link href="/receive" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-3.5 rounded-lg border border-[#1C1C1C]/20 text-[#1C1C1C] bg-transparent transition-colors hover:bg-[#1C1C1C]/5">
                <Download className="w-4 h-4" /> Receive File
              </button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* FULL WIDTH SUBTLE DIVIDER */}
      <div className="w-full px-6 md:px-12">
        <div className="w-full border-b border-[#1C1C1C]/10" />
      </div>

      {/* 3️⃣ LIVE TRANSFER PREVIEW */}
      <section className="w-full py-32 relative z-10">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="w-full px-6 md:px-12">
          <div className="w-full p-10 md:p-16 rounded-2xl bg-white/50 border border-[#1C1C1C]/10 backdrop-blur-md shadow-xl shadow-black/5">
            <div className="flex items-center justify-between relative z-10 max-w-5xl mx-auto">
              
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-xl border border-[#1C1C1C]/10 flex items-center justify-center bg-white shadow-sm">
                  <FcDisplay className="w-8 h-8" />
                </div>
                <span className="text-xs text-[#1C1C1C]/60 font-medium tracking-wide">MacBook Pro</span>
              </div>

              <div className="flex-1 mx-8 relative">
                <div className="h-[2px] w-full bg-[#1C1C1C]/10 rounded-full overflow-hidden">
                  <motion.div 
                    animate={{ width: ["0%", "100%"] }} 
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }} 
                    className="h-full bg-[#0F9E99]" 
                  />
                </div>
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] font-mono text-[#1C1C1C]/50 tracking-widest uppercase">
                  Transferring • 45 MB/s
                </div>
              </div>

              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-xl border border-[#0F9E99]/20 flex items-center justify-center bg-[#0F9E99]/5 shadow-sm">
                  <FcIphone className="w-8 h-8" />
                </div>
                <span className="text-xs text-[#1C1C1C]/60 font-medium tracking-wide">iPhone 15</span>
              </div>

            </div>
          </div>
        </motion.div>
      </section>

      {/* 2️⃣ HOW IT WORKS */}
      <section className="w-full py-24 border-y border-[#1C1C1C]/10">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="w-full px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {STEPS.map((step, i) => (
              <motion.div key={i} variants={fadeUp} className="flex flex-col">
                <div className="text-[#0F9E99] font-mono text-sm mb-6 font-medium tracking-widest">{step.step}</div>
                <h3 className="text-xl font-medium mb-3 text-[#1C1C1C]">{step.title}</h3>
                <p className="text-[#1C1C1C]/70 leading-relaxed font-light">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* 4️⃣ FEATURES WITH COLORED ICONS */}
      <section className="w-full py-32">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="w-full px-6 md:px-12">
          <div className="mb-16">
            <h2 className="text-3xl font-medium tracking-tight mb-4 text-[#1C1C1C]">Uncompromising performance.</h2>
            <p className="text-[#1C1C1C]/70 font-light max-w-2xl">The architecture you need to move data securely, wrapped in a minimal interface.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feat, i) => (
              <div key={i} className="p-8 rounded-xl bg-white/40 border border-[#1C1C1C]/10 transition-all hover:bg-white/80 hover:border-[#1C1C1C]/20 hover:shadow-lg hover:shadow-black/5">
                <feat.icon className="w-8 h-8 mb-6 drop-shadow-sm" />
                <h3 className="text-lg font-medium mb-2 text-[#1C1C1C]">{feat.title}</h3>
                <p className="text-sm text-[#1C1C1C]/70 font-light leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* NEW: CROSS PLATFORM SHOWCASE */}
      <CrossPlatformShowcase />

      {/* 5️⃣ SECURITY & USE CASES */}
      <section className="w-full py-32 border-y border-[#1C1C1C]/10 bg-[#EFE9E0]">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="w-full px-6 md:px-12 grid lg:grid-cols-2 gap-20">
          
          {/* Security Left Side */}
          <div className="flex flex-col justify-center">
            <FcLock className="w-10 h-10 mb-8 drop-shadow-sm" />
            <h2 className="text-3xl font-medium tracking-tight mb-6">Absolute privacy.</h2>
            <p className="text-[#1C1C1C]/70 font-light leading-relaxed mb-12">
              Because WebDrop utilizes WebRTC DataChannels, your files are transferred directly between peers. 
              The connection is secured using DTLS and SRTP, ensuring it is mathematically impossible to intercept your transfer.
            </p>

            <div className="space-y-8">
              {USE_CASES.map((useCase, i) => (
                <div key={i} className="flex gap-4">
                  <div className="mt-1 bg-white/60 p-2 rounded-lg border border-[#1C1C1C]/10 shadow-sm">
                    <useCase.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-[#1C1C1C] mb-1">{useCase.title}</h4>
                    <p className="text-sm text-[#1C1C1C]/70 font-light">{useCase.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 6️⃣ RECENT ACTIVITY CARD */}
          <div className="p-8 rounded-2xl bg-white/60 border border-[#1C1C1C]/10 flex flex-col justify-center shadow-xl shadow-black/5">
            <h3 className="text-sm font-medium mb-8 text-[#1C1C1C]/60 uppercase tracking-widest flex items-center gap-2">
              <FcDataBackup className="w-4 h-4" /> Session History
            </h3>
            <div className="space-y-4">
              {RECENT_ACTIVITY.map((item, i) => (
                <div key={i} className="flex items-center justify-between pb-4 border-b border-[#1C1C1C]/10 last:border-0 last:pb-0">
                  <div>
                    <p className="text-sm font-medium text-[#1C1C1C] mb-1">{item.name}</p>
                    <p className="text-xs text-[#1C1C1C]/50 font-mono">{item.size}</p>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-medium text-[#0F9E99]">
                    <FcCheckmark className="w-4 h-4" /> {item.status}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </motion.div>
      </section>

      {/* 7️⃣ FINAL CTA */}
      <section className="w-full py-40">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="w-full px-6 md:px-12 text-center">
          <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-6 text-[#1C1C1C]">Ready to drop the cloud?</h2>
          <p className="text-[#1C1C1C]/70 mb-10 text-lg font-light">Direct transfers. Zero onboarding. Completely free.</p>
          <Link href="/send">
            <button className="px-10 py-4 bg-[#0F9E99] text-white rounded-lg font-medium transition-colors hover:bg-[#0C807B] shadow-lg shadow-[#0F9E99]/20">
              Start Sharing Now
            </button>
          </Link>
        </motion.div>
      </section>

      {/* 🦶 FULL WIDTH FOOTER */}
      <footer className="w-full bg-[#EFE9E0] border-t border-[#1C1C1C]/10 pt-16 pb-8">
        <div className="w-full px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            
            <div className="md:col-span-2">
              <Link href="/" className="inline-block mb-6 opacity-90 hover:opacity-100 transition duration-200">
                <Image 
                  src="/images/img.png" 
                  alt="WebDrop Logo" 
                  width={160} 
                  height={48} 
                  unoptimized
                  className="w-[130px] md:w-[160px] h-auto object-contain"
                />
              </Link>
              <p className="text-sm text-[#1C1C1C]/60 max-w-md font-light leading-relaxed mb-6">
                Premium peer-to-peer file sharing. Move your data across devices instantly, securely, and freely without the cloud.
              </p>
              
              <div className="flex items-center gap-4">
                <a href="https://www.instagram.com/mhdshan____/" target="_blank" rel="noreferrer" className="p-2.5 rounded-full bg-white border border-[#1C1C1C]/10 text-[#1C1C1C]/60 hover:text-[#0F9E99] hover:border-[#0F9E99]/30 transition-all shadow-sm">
                  <FaInstagram className="w-4 h-4" />
                </a>
                <a href="https://api.whatsapp.com/send/?phone=%2B919746873413&text&type=phone_number&app_absent=0" target="_blank" rel="noreferrer" className="p-2.5 rounded-full bg-white border border-[#1C1C1C]/10 text-[#1C1C1C]/60 hover:text-[#0F9E99] hover:border-[#0F9E99]/30 transition-all shadow-sm">
                  <FaWhatsapp className="w-4 h-4" />
                </a>
                <a href="https://www.linkedin.com/in/muhammed-shan-s-63760a333/" target="_blank" rel="noreferrer" className="p-2.5 rounded-full bg-white border border-[#1C1C1C]/10 text-[#1C1C1C]/60 hover:text-[#0F9E99] hover:border-[#0F9E99]/30 transition-all shadow-sm">
                  <FaLinkedin className="w-4 h-4" />
                </a>
                <a href="https://github.com/mohd-shan-07" target="_blank" rel="noreferrer" className="p-2.5 rounded-full bg-white border border-[#1C1C1C]/10 text-[#1C1C1C]/60 hover:text-[#0F9E99] hover:border-[#0F9E99]/30 transition-all shadow-sm">
                  <FaGithub className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-[#1C1C1C] font-medium mb-6 text-sm">Product</h4>
              <ul className="space-y-4 text-sm text-[#1C1C1C]/60 font-light">
                <li><Link href="/send" className="hover:text-[#0F9E99] transition-colors">Send Files</Link></li>
                <li><Link href="/receive" className="hover:text-[#0F9E99] transition-colors">Receive Files</Link></li>
                <li><Link href="#features" className="hover:text-[#0F9E99] transition-colors">Features</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-[#1C1C1C] font-medium mb-6 text-sm">Legal</h4>
              <ul className="space-y-4 text-sm text-[#1C1C1C]/60 font-light">
                <li><Link href="#" className="hover:text-[#0F9E99] transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-[#0F9E99] transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>

          <div className="w-full border-t border-[#1C1C1C]/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-[#1C1C1C]/50 font-light">
            <p className="text-center md:text-left">© {new Date().getFullYear()} WebDrop. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0F9E99]" /> Operational
              </span>
              <span>v2.1.0</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}