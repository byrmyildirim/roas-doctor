'use client';
import React from 'react';
import Shell from '@/components/layout/Shell';
import { 
  Megaphone, 
  Settings, 
  RefreshCw, 
  CheckCircle2, 
  BarChart3, 
  Search,
} from 'lucide-react';
import { useLanguage } from '@/components/layout/LanguageProvider';

const accounts = [
  { id: 'act_1029384756', name: 'Roas Doctor Main Store', currency: 'USD', status: 'Connected', spend: '$12,450.00' },
  { id: 'act_9876543210', name: 'Agency Test Account', currency: 'EUR', status: 'Disconnected', spend: '$0.00' },
  { id: 'act_5544332211', name: 'Wholesale Division', currency: 'GBP', status: 'Not Imported', spend: '$420.00' },
];

export default function MetaAdsPage() {
  const { t } = useLanguage();

  const handleConnect = () => {
    window.location.href = '/api/auth/meta';
  };

  return (
    <Shell>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 mb-2 flex items-center gap-3">
              <Megaphone className="w-8 h-8 text-blue-600" />
              {t('meta_ads')}
            </h1>
            <p className="text-zinc-500 text-sm italic">Status: Connected to Meta Marketing API</p>
          </div>
          <div className="flex gap-3">
             <button 
               onClick={handleConnect}
               className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-zinc-50 text-zinc-600 text-sm font-semibold rounded-xl border border-zinc-200 transition-all shadow-sm">
              <RefreshCw className="w-4 h-4" />
              {t('trigger_audit')}
            </button>
            <button 
              onClick={handleConnect}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-blue-600/25 active:scale-95">
              <Settings className="w-4 h-4 fill-white" />
              {t('connect_meta')}
            </button>
          </div>
        </div>

        {/* Sync Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           {[
             { label: 'Synced Campaigns', value: '42', icon: BarChart3, color: 'text-blue-600', bg: 'bg-blue-50' },
             { label: 'Ads Analyzed', value: '148', icon: Megaphone, color: 'text-indigo-600', bg: 'bg-indigo-50' },
             { label: 'Last Sync Result', value: 'Success', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' }
           ].map((stat, i) => (
             <div key={i} className="p-6 rounded-2xl bg-white border border-zinc-200 flex items-center gap-4 shadow-sm">
               <div className={`p-3 rounded-xl border border-transparent ${stat.bg} ${stat.color}`}>
                 <stat.icon className="w-5 h-5" />
               </div>
               <div>
                  <div className="text-xs font-bold text-zinc-400 uppercase tracking-widest">{stat.label}</div>
                  <div className="text-xl font-bold text-zinc-900 tracking-tight">{stat.value}</div>
               </div>
             </div>
           ))}
        </div>

        {/* Ad Accounts Table */}
        <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="p-6 border-b border-zinc-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <h2 className="font-semibold text-zinc-900">Managed Ad Accounts</h2>
            <div className="flex gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <input 
                  placeholder="Filter accounts..." 
                  className="bg-zinc-50 border border-zinc-200 rounded-lg pl-10 pr-4 py-1.5 text-xs text-zinc-700 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-zinc-400"
                />
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead className="bg-zinc-50 border-b border-zinc-200">
                 <tr>
                   <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest leading-none">Account Name</th>
                   <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest leading-none">ID</th>
                   <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest leading-none text-center">Status</th>
                   <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest leading-none text-right">30d Spend</th>
                   <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest leading-none text-right">Actions</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-zinc-100">
                 {accounts.map((acct) => (
                   <tr key={acct.id} className="group hover:bg-zinc-50/50 transition-all">
                     <td className="px-6 py-5">
                        <div className="text-sm font-semibold text-zinc-900 group-hover:text-blue-600 transition-colors leading-tight mb-0.5">{acct.name}</div>
                        <div className="text-[10px] text-zinc-400 font-mono italic">Marketing API v18.0</div>
                     </td>
                     <td className="px-6 py-5 text-xs text-zinc-500 font-mono">{acct.id}</td>
                     <td className="px-6 py-5">
                        <div className="flex justify-center">
                          <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                            acct.status === 'Connected' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 
                            acct.status === 'Disconnected' ? 'bg-red-50 text-red-600 border border-red-100' : 
                            'bg-zinc-100 text-zinc-500 border border-zinc-200'
                          }`}>
                            <div className={`w-1.5 h-1.5 rounded-full ${
                               acct.status === 'Connected' ? 'bg-emerald-500 animate-pulse' : 
                               acct.status === 'Disconnected' ? 'bg-red-500' : 'bg-zinc-400'
                            }`} />
                            {acct.status}
                          </span>
                        </div>
                     </td>
                     <td className="px-6 py-5 text-right font-semibold text-zinc-700 tabular-nums">{acct.spend}</td>
                     <td className="px-6 py-5 text-right">
                        <div className="flex justify-end gap-2">
                          <button className="p-2 bg-zinc-50 border border-zinc-200 rounded-lg text-zinc-400 hover:text-blue-600 transition-colors">
                            <RefreshCw className="w-4 h-4" />
                          </button>
                        </div>
                     </td>
                   </tr>
                 ))}
               </tbody>
            </table>
          </div>
        </div>

        {/* Info Note */}
        <div className="p-8 rounded-2xl bg-zinc-50 border border-zinc-200 mt-12 relative overflow-hidden group">
           <div className="space-y-4">
              <h3 className="text-xl font-bold tracking-tight text-zinc-900 leading-tight">Meta Ads <span className="text-blue-600">Sync</span> System</h3>
              <p className="text-zinc-600 leading-relaxed text-sm max-w-2xl">
                Our integration uses persistent tokens to sync ads across all Meta placements. This ensures your analysis is always up to date with your latest creative changes.
              </p>
           </div>
        </div>
      </div>
    </Shell>
  );
}
