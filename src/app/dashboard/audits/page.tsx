import React from 'react';
import Shell from '@/components/layout/Shell';
import { 
  ClipboardCheck, 
  Search, 
  Filter, 
  Table, 
  ArrowUpRight, 
  Activity, 
  Zap, 
  CheckCircle2, 
  AlertCircle, 
  Megaphone, 
  Search as SearchIcon,
  ShoppingBag
} from 'lucide-react';

const audits = [
  { 
    id: 'aud_1', 
    source: 'Meta', 
    adName: 'Summer Sale: Pro Mats', 
    page: '/yoga-mat-pro', 
    score: 92, 
    status: 'Optimal', 
    findings: 1,
    matches: ['Headline', 'CTA', 'Discount Offer']
  },
  { 
    id: 'aud_2', 
    source: 'Google', 
    adName: 'Keyword: "thick yoga mat"', 
    page: '/products/extra-thick', 
    score: 48, 
    status: 'Weak Alignment', 
    findings: 3,
    matches: ['CTA']
  },
  { 
    id: 'aud_3', 
    source: 'Meta', 
    adName: 'Remar: Cart Abandon (Yoga)', 
    page: '/checkout', 
    score: 82, 
    status: 'Optimal', 
    findings: 0,
    matches: ['Trust Badges', 'Price']
  },
  { 
    id: 'aud_4', 
    source: 'Google', 
    adName: 'Keyword: "eco block"', 
    page: '/collections/all', 
    score: 22, 
    status: 'Critical Mismatch', 
    findings: 5,
    matches: []
  },
];

export default function AuditHubPage() {
  return (
    <Shell>
      <div className="space-y-8">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white mb-2 flex items-center gap-3">
              <ClipboardCheck className="w-8 h-8 text-indigo-500" />
              Audit Alignment Hub
            </h1>
            <p className="text-zinc-500 text-sm">Managing 148 matched ad-to-page pairs.</p>
          </div>
          <div className="flex gap-3">
             <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-blue-600/25 active:scale-95">
              <Activity className="w-4 h-4" />
              Analyze New Matches
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-900 border border-zinc-800/50">
           <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
              <input 
                placeholder="Search audits by ad name or page handle..." 
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-4 py-2 text-sm text-zinc-300 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-zinc-700"
              />
           </div>
           <select className="bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2 text-xs text-zinc-400 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all">
              <option>All Sources</option>
              <option>Meta Ads</option>
              <option>Google Ads</option>
           </select>
           <select className="bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2 text-xs text-zinc-400 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all">
              <option>Any Score</option>
              <option>Critical (&lt;40%)</option>
              <option>Weak (40-70%)</option>
              <option>Optimal (&gt;70%)</option>
           </select>
        </div>

        {/* Audit list - Grid of detailed cards for better visualization of alignment */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           {audits.map((audit) => (
             <div key={audit.id} className="group p-6 rounded-2xl bg-zinc-900 border border-zinc-800/50 hover:border-indigo-500/30 hover:bg-zinc-800/30 transition-all duration-300 relative overflow-hidden">
                <div className="flex items-start justify-between mb-6">
                   <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        audit.source === 'Meta' ? 'bg-blue-600/10 text-blue-500' : 'bg-amber-600/10 text-amber-500'
                      }`}>
                        {audit.source === 'Meta' ? <Megaphone className="w-4 h-4" /> : <SearchIcon className="w-4 h-4" />}
                      </div>
                      <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{audit.source} Alignment</div>
                   </div>
                   <div className={`flex items-center gap-1.5 text-xs font-bold ${
                      audit.score >= 80 ? 'text-emerald-400' : audit.score >= 50 ? 'text-amber-400' : 'text-red-400'
                   }`}>
                      {audit.score}% MATCH
                   </div>
                </div>

                <div className="space-y-4 mb-6">
                   <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded bg-zinc-800 flex items-center justify-center flex-shrink-0">
                         <Megaphone className="w-4 h-4 text-zinc-600" />
                      </div>
                      <div className="flex-1 overflow-hidden">
                         <div className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest leading-none mb-1">Ad Hook / Keyword</div>
                         <div className="text-sm font-semibold text-white truncate">{audit.adName}</div>
                      </div>
                   </div>

                   <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded bg-zinc-800 flex items-center justify-center flex-shrink-0">
                         <ShoppingBag className="w-4 h-4 text-zinc-600" />
                      </div>
                      <div className="flex-1 overflow-hidden">
                         <div className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest leading-none mb-1">Landing Page Target</div>
                         <div className="text-xs text-indigo-400 font-mono truncate">{audit.page}</div>
                      </div>
                   </div>
                </div>

                <div className="mb-6">
                   <div className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-3">Alignment Signals</div>
                   <div className="flex flex-wrap gap-2">
                      {audit.matches.length > 0 ? audit.matches.map((m, i) => (
                        <div key={i} className="flex items-center gap-1.5 px-2 py-1 rounded bg-emerald-400/5 border border-emerald-400/10 text-[10px] font-bold text-emerald-500">
                           <CheckCircle2 className="w-3 h-3" />
                           {m}
                        </div>
                      )) : (
                        <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-red-400/5 border border-red-400/10 text-[10px] font-bold text-red-500">
                           <AlertCircle className="w-3 h-3" />
                           No Convergence Detected
                        </div>
                      )}
                   </div>
                </div>

                <div className="pt-6 border-t border-zinc-800/50 flex justify-between items-center">
                   <div className="flex items-center gap-2">
                      <div className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                         audit.status === 'Optimal' ? 'bg-emerald-400/10 text-emerald-400' : 
                         audit.status === 'Weak Alignment' ? 'bg-amber-400/10 text-amber-400' : 'bg-red-400/10 text-red-400'
                      }`}>
                         {audit.status}
                      </div>
                      <span className="text-[10px] text-zinc-500 font-bold">{audit.findings} Findings</span>
                   </div>
                   <button className="flex items-center gap-1 text-xs font-bold text-white hover:text-indigo-400 transition-colors">
                      View Deep Audit
                      <ArrowUpRight className="w-3.5 h-3.5" />
                   </button>
                </div>

                <div className={`absolute bottom-0 left-0 h-1 w-full opacity-20 ${
                    audit.score >= 80 ? 'bg-emerald-500' : audit.score >= 50 ? 'bg-amber-500' : 'bg-red-500'
                }`} />
             </div>
           ))}
        </div>
      </div>
    </Shell>
  );
}
