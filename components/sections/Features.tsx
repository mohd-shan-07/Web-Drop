import { Shield, Zap, HardDrive, Globe, UserX, Cpu } from "lucide-react";

const features = [
  { icon: HardDrive, title: "No Cloud Storage", desc: "Files transfer directly between devices. We never store your data." },
  { icon: Zap, title: "Unlimited Size", desc: "Send 10MB or 100GB. Since it's P2P, there are no artificial caps." },
  { icon: Shield, title: "E2E Encrypted", desc: "Secured via WebRTC DTLS/SRTP protocols by default." },
  { icon: Globe, title: "Works Everywhere", desc: "Share seamlessly between iOS, Android, Mac, and Windows." },
  { icon: UserX, title: "No Sign-up", desc: "Zero onboarding friction. Open the app and start transferring." },
  { icon: Cpu, title: "Blazing Fast", desc: "Utilizes local network speeds when devices are on the same Wi-Fi." },
];

export default function Features() {
  return (
    <section className="w-full py-24 border-b border-white/5 bg-background">
      {/* FIX: Expanded to max-w-[1400px] */}
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="mb-16 text-center md:text-left">
          <h2 className="text-3xl font-bold tracking-tight text-white mb-4">Built for performance.</h2>
          <p className="text-muted text-base max-w-2xl">Everything you need to move data securely, without the enterprise bloat.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, i) => (
            <div key={i} className="p-8 rounded-xl bg-card border border-white/5 hover:border-white/10 transition-colors group">
              <feat.icon className="w-6 h-6 text-muted mb-4 group-hover:text-accent transition-colors" />
              <h3 className="text-white font-medium mb-2">{feat.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}