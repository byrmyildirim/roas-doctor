'use client';
import React from 'react';
import Shell from '@/components/layout/Shell';
import { 
  ClipboardCheck, 
  Search, 
  Filter, 
  ArrowUpRight, 
  Activity, 
  CheckCircle2, 
  AlertCircle, 
  Megaphone, 
  Search as SearchIcon,
  ShoppingBag
} from 'lucide-react';
import { useLanguage } from '@/components/layout/LanguageProvider';

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
  const { t } = useLanguage();

  return (
    <Shell>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 mb-2 flex items-center gap-3">
              <ClipboardCheck className="w-8 h-8 text-blue-600" />
              {t('audit_hub')}
            </h1>
            <p className="text-zinc-500 text-sm">Managing 148 matched ad-to-page pairs.</p>
          </div>
          <div className="flex gap-3">
             <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-blue-600/25 active:scale-95">
              <Activity className="w-4 h-4" />
              {t('trigger_audit')}
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-2xl bg-white border border-zinc-200 shadow-sm">
           <div className="flex-1 relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input 
                placeholder="Search audits..." 
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl pl-10 pr-4 py-2 text-sm text-zinc-700 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-zinc-400"
              />
           </div>
           <select className="bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2 text-xs text-zinc-600 font-semibold focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all w-full sm:w-auto">
              <option>All Sources</option>
              <option>Meta Ads</option>
              <option>Google Ads</option>
           </select>
        </div>

        {/* Audit list */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           {audits.map((audit) => (
             <div key={audit.id} className="group p-6 rounded-2xl bg-white border border-zinc-200 hover:border-blue-300 hover:bg-zinc-50/50 transition-all duration-300 relative overflow-hidden shadow-sm">
                <div className="flex items-start justify-between mb-6">
                   <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        audit.source === 'Meta' ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-600'
                      }`}>
                        {audit.source === 'Meta' ? <Megaphone className="w-4 h-4" /> : <SearchIcon className="w-4 h-4" />}
                      </div>
                      <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{audit.source} Alignment</div>
                   </div>
                   <div className={`flex items-center gap-1.5 text-xs font-bold ${
                      audit.score >= 80 ? 'text-emerald-600' : audit.score >= 50 ? 'text-amber-600' : 'text-red-600'
                   }`}>
                      {audit.score}% MATCH
                   </div>
                </div>

                <div className="space-y-4 mb-6">
                   <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded bg-zinc-50 flex items-center justify-center flex-shrink-0">
                         <Megaphone className="w-3.5 h-3.5 text-zinc-400" />
                      </div>
                      <div className="flex-1 overflow-hidden">
                         <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest leading-none mb-1">Ad Hook / Keyword</div>
                         <div className="text-sm font-semibold text-zinc-900 truncate">{audit.adName}</div>
                      </div>
                   </div>

                   <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded bg-zinc-50 flex items-center justify-center flex-shrink-0">
                         <ShoppingBag className="w-3.5 h-3.5 text-zinc-400" />
                      </div>
                      <div className="flex-1 overflow-hidden">
                         <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest leading-none mb-1">Landing Page Target</div>
                         <div className="text-xs text-blue-600 font-mono truncate">{audit.page}</div>
                      </div>
                   </div>
                </div>

                <div className="mb-6">
                   <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-3">Alignment Signals</div>
                   <div className="flex flex-wrap gap-2">
                      {audit.matches.length > 0 ? audit.matches.map((m, i) => (
                        <div key={i} className="flex items-center gap-1.5 px-2 py-1 rounded bg-emerald-50 border border-emerald-100 text-[10px] font-bold text-emerald-600">
                           <CheckCircle2 className="w-3 h-3" />
                           {m}
                        </div>
                      )) : (
                        <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-red-50 border border-red-100 text-[10px] font-bold text-red-600">
                           <AlertCircle className="w-3 h-3" />
                           No Convergence
                        </div>
                      )}
                   </div>
                </div>

                <div className="pt-6 border-t border-zinc-100 flex justify-between items-center">
                   <div className="flex items-center gap-2">
                      <div className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                         audit.status === 'Optimal' ? 'bg-emerald-50 text-emerald-600' : 
                         audit.status === 'Weak Alignment' ? 'bg-amber-50 text-amber-600' : 'bg-red-50 text-red-600'
                      }`}>
                         {audit.status}
                      </div>
                      <span className="text-[10px] text-zinc-400 font-bold">{audit.findings} Findings</span>
                   </div>
                   <button className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-500 transition-colors">
                      Deep Audit
                      <ArrowUpRight className="w-3.5 h-3.5" />
                   </button>
                </div>
             </div>
           ))}
        </div>
      </div>
    </Shell>
  );
}
