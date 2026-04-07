import React from 'react';
import Shell from '@/components/layout/Shell';
import { 
  History, 
  ArrowRight, 
  TrendingUp, 
  Activity, 
  Clock, 
  Calendar,
  ChevronRight,
  Download,
  Share2
} from 'lucide-react';

const historyItems = [
  { id: 'h_1', date: '7 Nisan 2026', time: '12:45', overallScore: 78, metaScore: 82, googleScore: 64, change: '+4%' },
  { id: 'h_2', date: '6 Nisan 2026', time: '09:12', overallScore: 74, metaScore: 78, googleScore: 68, change: '+2%' },
  { id: 'h_3', date: '30 Mart 2026', time: '18:22', overallScore: 72, metaScore: 72, googleScore: 70, change: 'First Audit' },
];

export default function HistoryPage() {
  return (
    <Shell>
      <div className="space-y-8">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white mb-2 flex items-center gap-3">
              <History className="w-8 h-8 text-zinc-400" />
              Audit Snapshots
            </h1>
            <p className="text-zinc-500 text-sm">Review historical alignment scores and performance deltas.</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-sm font-semibold rounded-xl border border-zinc-800 transition-all">
            <Download className="w-4 h-4" />
            Export Full History (PDF)
          </button>
        </div>

        {/* Comparison Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="p-8 rounded-3xl bg-zinc-900 border border-zinc-800/50 flex flex-col justify-between">
              <div>
                <div className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-1">Health Trend</div>
                <div className="text-3xl font-black text-white italic tracking-tighter mb-4 text-emerald-400">+12.4%</div>
                <p className="text-xs text-zinc-500 leading-relaxed max-w-xs">
                  Your overall alignment score has increased steadily since the first audit on March 30.
                </p>
              </div>
              <div className="pt-8 flex items-end justify-between">
                 <div className="flex -space-x-1">
                    {[72, 74, 78].map((s, i) => (
                      <div key={i} className="w-8 h-12 bg-blue-600/20 border-t border-blue-500/30 rounded-t flex items-end">
                         <div className="w-full bg-blue-600/40" style={{ height: `${s}%` }} />
                      </div>
                    ))}
                 </div>
                 <span className="text-[10px] font-bold text-zinc-700 uppercase">Weekly View</span>
              </div>
           </div>

           <div className="p-8 rounded-3xl bg-gradient-to-br from-indigo-600/10 to-blue-600/10 border border-indigo-500/20">
              <div className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-1">Latest Benchmark</div>
              <h3 className="text-xl font-bold text-white mb-2">Beat 12% of competitors</h3>
              <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                Your Shopify page conversion readiness is higher than most stores in the "Health & Wellness" category.
              </p>
              <button className="flex items-center gap-2 text-xs font-bold text-blue-400 hover:text-white transition-colors">
                View Benchmarking Report
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
           </div>
        </div>

        {/* History Timeline */}
        <div className="bg-zinc-900 border border-zinc-800/50 rounded-2xl overflow-hidden">
           <div className="p-6 border-b border-zinc-800/50 flex items-center justify-between">
              <h2 className="font-semibold text-white">Analysis Log</h2>
              <div className="p-2 bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-500">
                 <Calendar className="w-4 h-4" />
              </div>
           </div>
           <div className="divide-y divide-zinc-800/50">
              {historyItems.map((item) => (
                <div key={item.id} className="p-6 group hover:bg-zinc-800/30 transition-all flex items-center justify-between">
                   <div className="flex items-center gap-6">
                      <div className="w-12 h-12 rounded-2xl bg-zinc-950 border border-zinc-800 flex flex-col items-center justify-center">
                         <Clock className="w-4 h-4 text-zinc-600 mb-1" />
                         <span className="text-[9px] font-black text-zinc-500 uppercase">{item.time}</span>
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white mb-0.5">{item.date}</div>
                        <div className="flex items-center gap-2">
                           <span className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">Global Scan v1.0</span>
                           <div className="w-1 h-1 rounded-full bg-zinc-800" />
                           <span className="text-[10px] text-emerald-400 font-bold">{item.change}</span>
                        </div>
                      </div>
                   </div>

                   <div className="flex items-center gap-12">
                      <div className="hidden lg:flex gap-8">
                         <div className="text-center">
                            <div className="text-[9px] font-black text-zinc-600 uppercase tracking-widest mb-1">Overall</div>
                            <div className="text-sm font-bold tracking-tight text-white">{item.overallScore}%</div>
                         </div>
                         <div className="text-center">
                            <div className="text-[9px] font-black text-zinc-600 uppercase tracking-widest mb-1">Meta</div>
                            <div className="text-sm font-bold tracking-tight text-zinc-400">{item.metaScore}%</div>
                         </div>
                         <div className="text-center">
                            <div className="text-[9px] font-black text-zinc-600 uppercase tracking-widest mb-1">Google</div>
                            <div className="text-sm font-bold tracking-tight text-zinc-400">{item.googleScore}%</div>
                         </div>
                      </div>
                      <div className="flex items-center gap-2">
                         <button className="p-2 bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-500 hover:text-white transition-colors">
                           <Share2 className="w-4 h-4" />
                         </button>
                         <button className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold rounded-xl transition-all border border-zinc-700/50">
                            View Snapshot
                         </button>
                      </div>
                   </div>
                </div>
              ))}
           </div>
        </div>
        
        <p className="text-center text-[10px] font-black text-zinc-700 uppercase tracking-widest">
           Retention: Snapshots are stored for 12 months for active organizations.
        </p>
      </div>
    </Shell>
  );
}
