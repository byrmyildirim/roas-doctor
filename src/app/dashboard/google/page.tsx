import React from 'react';
import Shell from '@/components/layout/Shell';
import { 
  Search, 
  Settings, 
  RefreshCw, 
  CheckCircle2, 
  TrendingUp, 
  BarChart3, 
  ExternalLink,
  Table,
  Filter,
  Zap,
  Target
} from 'lucide-react';

const keywords = [
  { term: 'sustainable yoga mat', intent: 'High Commercial', matchScore: 94, impressions: '1.2k', ctr: '8.4%', status: 'Optimal' },
  { term: 'yoga mat reviews', intent: 'Research', matchScore: 42, impressions: '450', ctr: '1.2%', status: 'Mismatched' },
  { term: 'best thick yoga mat', intent: 'Transactional', matchScore: 88, impressions: '820', ctr: '12.4%', status: 'Optimal' },
  { term: 'how to clean yoga mat', intent: 'Informational', matchScore: 12, impressions: '2.4k', ctr: '0.4%', status: 'Low Relevance' },
];

export default function GoogleAdsPage() {
  return (
    <Shell>
      <div className="space-y-8">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white mb-2 flex items-center gap-3">
              <Search className="w-8 h-8 text-amber-500" />
              Google Intent Center
            </h1>
            <p className="text-zinc-500 text-sm italic">Developer Token: Verified | Profile: 882-739-1029</p>
          </div>
          <div className="flex gap-3">
             <button className="flex items-center gap-2 px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-sm font-semibold rounded-xl border border-zinc-800 transition-all">
              <RefreshCw className="w-4 h-4" />
              Keyword/Intent Refresh
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-amber-600/25 active:scale-95">
              <Target className="w-4 h-4 fill-white" />
              Optimization Plan
            </button>
          </div>
        </div>

        {/* Sync Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
           {[
             { label: 'Active Keywords', value: '1,204', icon: Search, color: 'text-amber-400' },
             { label: 'Avg Intent Match', value: '64%', icon: Target, color: 'text-red-400' },
             { label: 'CTR Efficiency', value: '4.8%', icon: TrendingUp, color: 'text-emerald-400' },
             { label: 'Synced Campaigns', value: '8', icon: BarChart3, color: 'text-blue-400' }
           ].map((stat, i) => (
             <div key={i} className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800/50 flex flex-col gap-3">
               <div className={`p-2 rounded-lg bg-zinc-800 border border-zinc-700/50 w-fit ${stat.color}`}>
                 <stat.icon className="w-4 h-4" />
               </div>
               <div>
                  <div className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">{stat.label}</div>
                  <div className="text-xl font-bold text-white tracking-tight">{stat.value}</div>
               </div>
             </div>
           ))}
        </div>

        {/* Keywords Table */}
        <div className="bg-zinc-900 border border-zinc-800/50 rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-zinc-800/50 flex items-center justify-between">
            <h2 className="font-semibold text-white">Search Term & Landing Page Alignment</h2>
            <div className="flex gap-4">
              <button className="p-2 bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-500 hover:text-white transition-colors">
                <Filter className="w-4 h-4" />
              </button>
              <button className="p-2 bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-500 hover:text-white transition-colors">
                <Table className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <table className="w-full text-left">
             <thead className="bg-zinc-950 border-b border-zinc-800/50">
               <tr>
                 <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest leading-none">Term / Keyword</th>
                 <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest leading-none">Intent Category</th>
                 <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest leading-none text-center">Match Score</th>
                 <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest leading-none text-right">Metrics (30d)</th>
                 <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest leading-none text-center">Status</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-zinc-800/50">
               {keywords.map((kw, idx) => (
                 <tr key={idx} className="group hover:bg-zinc-800/30 transition-all">
                   <td className="px-6 py-5">
                      <div className="text-sm font-semibold text-white group-hover:text-amber-400 transition-colors leading-tight mb-0.5">{kw.term}</div>
                      <div className="text-[10px] text-zinc-600 italic">Campaign: "Alpha Prospecting"</div>
                   </td>
                   <td className="px-6 py-5">
                      <span className="text-xs font-medium text-zinc-400 px-2 py-1 bg-zinc-800 rounded-lg border border-zinc-700/50">
                        {kw.intent}
                      </span>
                   </td>
                   <td className="px-6 py-5">
                     <div className="flex justify-center flex-col items-center gap-1.5">
                       <div className="w-24 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                         <div className={`h-full transition-all duration-1000 ${
                            kw.matchScore >= 80 ? 'bg-emerald-500' : 
                            kw.matchScore >= 50 ? 'bg-amber-500' : 'bg-red-500'
                         }`} style={{ width: `${kw.matchScore}%` }} />
                       </div>
                       <span className="text-[10px] font-bold text-zinc-500">{kw.matchScore}%</span>
                     </div>
                   </td>
                   <td className="px-6 py-5 text-right flex flex-col justify-end">
                      <div className="text-xs font-semibold text-zinc-300 tabular-nums">{kw.impressions} imps</div>
                      <div className="text-[10px] text-zinc-600 font-bold tracking-tight">{kw.ctr} CTR</div>
                   </td>
                   <td className="px-6 py-5">
                      <div className="flex justify-center">
                        <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                          kw.status === 'Optimal' ? 'bg-emerald-400/10 text-emerald-400 border border-emerald-400/20 shadow-sm shadow-emerald-400/5' : 
                          kw.status === 'Mismatched' ? 'bg-red-400/10 text-red-400 border border-red-400/20' : 
                          'bg-amber-400/10 text-amber-400 border border-amber-400/20'
                        }`}>
                          {kw.status}
                        </span>
                      </div>
                   </td>
                 </tr>
               ))}
             </tbody>
          </table>
        </div>

        {/* Integration Architecture */}
        <div className="p-8 rounded-2xl bg-[#0a0a0b] border border-zinc-800/50 relative overflow-hidden group">
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="md:col-span-2 space-y-6">
              <h3 className="text-2xl font-bold tracking-tight text-white leading-tight">Headless Google Ads <span className="text-amber-500">OAuth 2.0</span> Strategy</h3>
              <p className="text-zinc-400 leading-relaxed text-sm">
                Our Google connection architecture utilizes the <code className="text-amber-400">GoogleAdsClient</code> with first-class support for Developer Tokens and Manager (MCC) accounts. We implement automatic offline access refresh to ensure 24/7 analysis of keyword performance vs landing page relevance.
              </p>
              <div className="flex gap-4">
                 <div className="px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                       <Zap className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div className="text-left">
                       <div className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Client Status</div>
                       <div className="text-xs text-white font-bold">READY (v15)</div>
                    </div>
                 </div>
                 <div className="px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                       <ShieldCheck className="w-4 h-4 text-blue-400" />
                    </div>
                    <div className="text-left">
                       <div className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Encryption</div>
                       <div className="text-xs text-white font-bold">AES-256 STORED</div>
                    </div>
                 </div>
              </div>
            </div>
            
            <div className="flex flex-col justify-center">
               <div className="p-6 rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700 shadow-2xl space-y-4">
                  <div className="p-2 bg-amber-400 rounded-lg w-fit">
                    <Search className="w-5 h-5 text-zinc-950" />
                  </div>
                  <div className="font-bold text-white text-lg leading-tight">Wait! High Wasted Spend Detected</div>
                  <p className="text-[11px] text-zinc-400 leading-normal">
                    4 search terms are driving high traffic but have a <b>&lt;12%</b> intent match on your "All Products" page.
                  </p>
                  <button className="w-full py-2 bg-white text-black font-bold text-xs rounded-lg hover:bg-zinc-200 transition-all uppercase tracking-wider">
                    Solve Intent Gaps
                  </button>
               </div>
            </div>
          </div>
          <div className="absolute right-[-50px] bottom-[-50px] w-64 h-64 bg-amber-500/5 rounded-full blur-[100px] pointer-events-none group-hover:bg-amber-500/10 transition-colors duration-1000" />
        </div>
      </div>
    </Shell>
  );
}

function ShieldCheck(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
