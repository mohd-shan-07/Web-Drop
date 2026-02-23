import { Check, X } from "lucide-react";

export default function WhyWebDrop() {
  return (
    <section className="w-full py-24 bg-zinc-50 dark:bg-graphite-900/50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-2xl font-semibold tracking-tight mb-3">Why WebDrop?</h2>
          <p className="text-zinc-500 text-sm">A fundamentally better way to move data.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* WebDrop Card */}
          <div className="p-8 rounded-2xl bg-white dark:bg-graphite-800 border border-zinc-200 dark:border-graphite-700 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-accent-500" />
            <h3 className="text-lg font-semibold mb-6">WebDrop (P2P)</h3>
            <ul className="space-y-4">
              {['Instant transfer start', 'No file size limits', 'End-to-end encrypted', 'No account required'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-300">
                  <div className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center text-green-500"><Check className="w-3 h-3" /></div>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Cloud Storage Card */}
          <div className="p-8 rounded-2xl bg-zinc-100 dark:bg-graphite-900 border border-zinc-200 dark:border-graphite-700 opacity-80 text-zinc-500">
            <h3 className="text-lg font-medium mb-6">Traditional Cloud</h3>
            <ul className="space-y-4">
              {['Upload then download', 'Strict size limits', 'Data stored on servers', 'Sign-up required'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm">
                  <div className="w-5 h-5 rounded-full bg-red-500/10 flex items-center justify-center text-red-500"><X className="w-3 h-3" /></div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}