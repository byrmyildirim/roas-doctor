'use client';
import React from 'react';
import Shell from '@/components/layout/Shell';
import { 
  Search, 
  RefreshCw, 
  TrendingUp, 
  BarChart3, 
  Table,
  Filter,
  Zap,
  Target
} from 'lucide-react';
import { useLanguage } from '@/components/layout/LanguageProvider';

const keywords = [
  { term: 'sustainable yoga mat', intent: 'High Commercial', matchScore: 94, impressions: '1.2k', ctr: '8.4%', status: 'Optimal' },
  { term: 'yoga mat reviews', intent: 'Research', matchScore: 42, impressions: '450', ctr: '1.2%', status: 'Mismatched' },
  { term: 'best thick yoga mat', intent: 'Transactional', matchScore: 88, impressions: '820', ctr: '12.4%', status: 'Optimal' },
  { term: 'how to clean yoga mat', intent: 'Informational', matchScore: 12, impressions: '2.4k', ctr: '0.4%', status: 'Low Relevance' },
];

export default function GoogleAdsPage() {
  const { t } = useLanguage();

  return (
    <Shell>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 mb-2 flex items-center gap-3">
              <Search className="w-8 h-8 text-amber-500" />
              {t('google_ads')}
            </h1>
            <p className="text-zinc-500 text-sm italic">Developer Token: Verified | Profile: 882-739-1029</p>
          </div>
          <div className="flex gap-3">
             <button className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-zinc-50 text-zinc-600 text-sm font-semibold rounded-xl border border-zinc-200 transition-all shadow-sm">
              <RefreshCw className="w-4 h-4" />
              {t('trigger_audit')}
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-amber-600/25 active:scale-95">
              <Target className="w-4 h-4 fill-white" />
              {t('launch_primary')}
            </button>
          </div>
        </div>

        {/* Sync Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
           {[
             { label: 'Active Keywords', value: '1,204', icon: Search, color: 'text-amber-600', bg: 'bg-amber-50' },
             { label: 'Avg Intent Match', value: '64%', icon: Target, color: 'text-red-600', bg: 'bg-red-50' },
             { label: 'CTR Efficiency', value: '4.8%', icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
             { label: 'Synced Campaigns', value: '8', icon: BarChart3, color: 'text-blue-600', bg: 'bg-blue-50' }
           ].map((stat, i) => (
             <div key={i} className="p-6 rounded-2xl bg-white border border-zinc-200 flex flex-col gap-3 shadow-sm">
               <div className={`p-2 rounded-lg border border-transparent w-fit ${stat.bg} ${stat.color}`}>
                 <stat.icon className="w-4 h-4" />
               </div>
               <div>
                  <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest leading-none mb-1">{stat.label}</div>
                  <div className="text-xl font-bold text-zinc-900 tracking-tight">{stat.value}</div>
               </div>
             </div>
           ))}
        </div>

        {/* Keywords Table */}
        <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="p-6 border-b border-zinc-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <h2 className="font-semibold text-zinc-900">{t('google_intent')}</h2>
            <div className="flex gap-2">
              <button className="p-2 bg-zinc-50 border border-zinc-200 rounded-lg text-zinc-500 hover:text-zinc-900 transition-colors">
                <Filter className="w-4 h-4" />
              </button>
              <button className="p-2 bg-zinc-50 border border-zinc-200 rounded-lg text-zinc-500 hover:text-zinc-900 transition-colors">
                <Table className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead className="bg-zinc-50 border-b border-zinc-200">
                 <tr>
                   <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest leading-none">Term / Keyword</th>
                   <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest leading-none">Intent Category</th>
                   <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest leading-none text-center">Match Score</th>
                   <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest leading-none text-right">Metrics (30d)</th>
                   <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest leading-none text-center">Status</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-zinc-100">
                 {keywords.map((kw, idx) => (
                   <tr key={idx} className="group hover:bg-zinc-50/50 transition-all">
                     <td className="px-6 py-5">
                        <div className="text-sm font-semibold text-zinc-900 group-hover:text-amber-600 transition-colors leading-tight mb-0.5">{kw.term}</div>
                        <div className="text-[10px] text-zinc-400 italic">Campaign: "Alpha Prospecting"</div>
                     </td>
                     <td className="px-6 py-5">
                        <span className="text-xs font-medium text-zinc-600 px-2 py-1 bg-zinc-100 rounded-lg border border-zinc-200">
                          {kw.intent}
                        </span>
                     </td>
                     <td className="px-6 py-5">
                       <div className="flex justify-center flex-col items-center gap-1.5">
                         <div className="w-24 h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                           <div className={`h-full transition-all duration-1000 ${
                              kw.matchScore >= 80 ? 'bg-emerald-500' : 
                              kw.matchScore >= 50 ? 'bg-amber-500' : 'bg-red-500'
                           }`} style={{ width: `${kw.matchScore}%` }} />
                         </div>
                         <span className="text-[10px] font-bold text-zinc-400">{kw.matchScore}%</span>
                       </div>
                     </td>
                     <td className="px-6 py-5 text-right">
                        <div className="text-xs font-semibold text-zinc-700 tabular-nums">{kw.impressions} imps</div>
                        <div className="text-[10px] text-zinc-400 font-bold tracking-tight">{kw.ctr} CTR</div>
                     </td>
                     <td className="px-6 py-5">
                        <div className="flex justify-center">
                          <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                            kw.status === 'Optimal' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 
                            kw.status === 'Mismatched' ? 'bg-red-50 text-red-600 border border-red-100' : 
                            'bg-amber-50 text-amber-600 border border-amber-100'
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
        </div>

        {/* Info Section */}
        <div className="p-8 rounded-2xl bg-zinc-50 border border-zinc-200 relative overflow-hidden group">
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <h3 className="text-xl font-bold tracking-tight text-zinc-900 leading-tight">Google Ads <span className="text-amber-600">OAuth 2.0</span> Strategy</h3>
              <p className="text-zinc-600 leading-relaxed text-sm">
                Our Google connection architecture utilizes the GoogleAdsClient with support for Developer Tokens. We implement automatic offline access refresh for 24/7 analysis.
              </p>
              <div className="flex gap-4">
                 <div className="px-4 py-3 rounded-xl bg-white border border-zinc-200 flex items-center gap-3">
                    <Zap className="w-4 h-4 text-emerald-500" />
                    <div>
                       <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Status</div>
                       <div className="text-xs text-zinc-900 font-bold">READY (v15)</div>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
}
