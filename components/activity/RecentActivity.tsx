"use client";
import { ArrowUpRight, ArrowDownLeft, Clock } from 'lucide-react';

interface Activity {
  id: string;
  name: string;
  size: string;
  date: string;
  type: 'sent' | 'received';
}

export default function RecentActivity({ activities }: { activities: Activity[] }) {
  if (activities.length === 0) return null;

  return (
    <div className="w-full max-w-3xl mx-auto mt-12">
      <h3 className="text-lg font-semibold text-[#1C1C1C] mb-6 flex items-center gap-2">
        <Clock className="w-4 h-4 text-[#0F9E99]" /> Session History
      </h3>
      <div className="grid gap-3">
        {activities.map((item) => (
          <div 
            key={item.id} 
            // 👇 Fixed: Changed from dark bg-[#111827] to light frosted glass
            className="flex items-center justify-between p-4 rounded-xl bg-white border border-[#1C1C1C]/10 shadow-sm hover:border-[#0F9E99]/30 transition-all"
          >
            <div className="flex items-center gap-4">
              <div className={`p-2 rounded-lg ${
                item.type === 'sent' 
                  ? 'bg-[#0F9E99]/10 text-[#0F9E99]' 
                  : 'bg-[#0C807B]/10 text-[#0C807B]'
              }`}>
                {item.type === 'sent' ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownLeft className="w-5 h-5" />}
              </div>
              <div>
                <p className="text-sm font-medium text-[#1C1C1C]">{item.name}</p>
                <p className="text-xs text-[#1C1C1C]/60 mt-0.5">{item.size} • {item.type === 'sent' ? 'Sent' : 'Received'}</p>
              </div>
            </div>
            <span className="text-xs text-[#1C1C1C]/40 font-mono">{item.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
}