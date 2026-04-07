import React from 'react';
import Shell from '@/components/layout/Shell';
import { 
  Megaphone, 
  Settings, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink,
  Table,
  Filter,
  BarChart3,
  Search,
  Sparkles
} from 'lucide-react';

const accounts = [
  { id: 'act_1029384756', name: 'Roas Doctor Main Store', currency: 'USD', status: 'Connected', spend: '$12,450.00' },
  { id: 'act_9876543210', name: 'Agency Test Account', currency: 'EUR', status: 'Disconnected', spend: '$0.00' },
  { id: 'act_5544332211', name: 'Wholesale Division', currency: 'GBP', status: 'Not Imported', spend: '$420.00' },
];

export default function MetaAdsPage() {
  return (
    <Shell>
      <div className="space-y-8">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white mb-2 flex items-center gap-3">
              <Megaphone className="w-8 h-8 text-blue-500" />
              Meta Ads Center
            </h1>
            <p className="text-zinc-500 text-sm italic">Status: Connected to Meta Marketing API</p>
          </div>
          <div className="flex gap-3">
             <button className="flex items-center gap-2 px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-sm font-semibold rounded-xl border border-zinc-800 transition-all">
              <RefreshCw className="w-4 h-4" />
              Force Full Account Sync
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-blue-600/25 active:scale-95">
              <Settings className="w-4 h-4 fill-white" />
              Connection Settings
            </button>
          </div>
        </div>

        {/* Sync Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           {[
             { label: 'Synced Campaigns', value: '42', icon: BarChart3, color: 'text-blue-400' },
             { label: 'Ads Analyzed', value: '148', icon: Megaphone, color: 'text-indigo-400' },
             { label: 'Last Sync Result', value: 'Success', icon: CheckCircle2, color: 'text-emerald-400' }
           ].map((stat, i) => (
             <div key={i} className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800/50 flex items-center gap-4">
               <div className={`p-3 rounded-xl bg-zinc-800 border border-zinc-700/50 ${stat.color}`}>
                 <stat.icon className="w-5 h-5" />
               </div>
               <div>
                  <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest">{stat.label}</div>
                  <div className="text-xl font-bold text-white tracking-tight">{stat.value}</div>
               </div>
             </div>
           ))}
        </div>

        {/* Ad Accounts Table */}
        <div className="bg-zinc-900 border border-zinc-800/50 rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-zinc-800/50 flex items-center justify-between">
            <h2 className="font-semibold text-white">Managed Ad Accounts</h2>
            <div className="flex gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                <input 
                  placeholder="Filter accounts..." 
                  className="bg-zinc-950 border border-zinc-800 rounded-lg pl-10 pr-4 py-1.5 text-xs text-zinc-300 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-zinc-800"
                />
              </div>
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
                 <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest leading-none">Account Name</th>
                 <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest leading-none">ID</th>
                 <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest leading-none text-center">Status</th>
                 <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest leading-none text-right">30d Spend</th>
                 <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest leading-none text-right">Actions</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-zinc-800/50">
               {accounts.map((acct) => (
                 <tr key={acct.id} className="group hover:bg-zinc-800/30 transition-all">
                   <td className="px-6 py-5">
                      <div className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors leading-tight mb-0.5">{acct.name}</div>
                      <div className="text-[10px] text-zinc-600 font-mono italic">Marketing API v18.0</div>
                   </td>
                   <td className="px-6 py-5 text-xs text-zinc-500 font-mono">{acct.id}</td>
                   <td className="px-6 py-5">
                      <div className="flex justify-center">
                        <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                          acct.status === 'Connected' ? 'bg-emerald-400/10 text-emerald-400 border border-emerald-400/20 shadow-sm shadow-emerald-400/5' : 
                          acct.status === 'Disconnected' ? 'bg-red-400/10 text-red-400 border border-red-400/20' : 
                          'bg-zinc-800 text-zinc-500 border border-zinc-700'
                        }`}>
                          <div className={`w-1.5 h-1.5 rounded-full ${
                             acct.status === 'Connected' ? 'bg-emerald-400 animate-pulse' : 
                             acct.status === 'Disconnected' ? 'bg-red-400' : 'bg-zinc-600'
                          }`} />
                          {acct.status}
                        </span>
                      </div>
                   </td>
                   <td className="px-6 py-5 text-right font-semibold text-zinc-300 tabular-nums">{acct.spend}</td>
                   <td className="px-6 py-5 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="p-2 bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-500 hover:text-white transition-colors group/btn">
                          <RefreshCw className="w-4 h-4 group-hover/btn:rotate-180 transition-transform duration-500" />
                        </button>
                         <button className="p-2 bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-500 hover:text-blue-500 transition-colors">
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      </div>
                   </td>
                 </tr>
               ))}
             </tbody>
          </table>
          
          <div className="p-6 bg-zinc-950/50 border-t border-zinc-800/50 text-center">
             <button className="text-xs font-bold text-zinc-500 hover:text-white transition-colors uppercase tracking-widest flex items-center gap-2 mx-auto">
               <RefreshCw className="w-3 h-3" />
               Refresh Account List
             </button>
          </div>
        </div>

        {/* Integration Note */}
        <div className="p-8 rounded-2xl bg-gradient-to-br from-zinc-900 to-[#0a0a0b] border border-zinc-800/50 mt-12 relative overflow-hidden group">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
            <div className="space-y-6">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center -rotate-6 shadow-xl shadow-white/5">
                <img src="https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg" className="w-8 h-8" alt="Meta" />
              </div>
              <h3 className="text-2xl font-bold tracking-tight text-white leading-tight">Secure Multi-Tenant <br /> <span className="text-blue-500">Facebook & Instagram</span> Sync</h3>
              <p className="text-zinc-400 leading-relaxed text-sm">
                Our integration uses persistent Long-Lived User Tokens (60 days) with automatic background refreshing. We sync ads across all Meta placements including Reels, Feed, and Shop.
              </p>
              <div className="flex gap-8">
                <div className="space-y-1">
                  <div className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Read Permissions</div>
                  <div className="text-xs text-emerald-400 font-bold flex items-center gap-1.5 leading-none h-4">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    ADS_READ
                  </div>
                  <div className="text-xs text-emerald-400 font-bold flex items-center gap-1.5 leading-none h-4">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    BUSINESS_MANAGEMENT
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Architecture</div>
                  <div className="text-xs text-zinc-300 font-bold flex items-center gap-1.5 underline decoration-zinc-700 underline-offset-4">
                    Background Job Queue
                  </div>
                  <div className="text-xs text-zinc-300 font-bold flex items-center gap-1.5 underline decoration-zinc-700 underline-offset-4">
                    Hourly Refresh Rate
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-1 rounded-3xl bg-zinc-800/20 border border-zinc-800/50 backdrop-blur-sm shadow-2xl relative">
              <div className="p-1.5 rounded-[calc(1.5rem-4px)] bg-[#0a0a0b] border border-zinc-800/50 overflow-hidden">
                 <div className="p-4 border-b border-zinc-800/50 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                       <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/40" />
                       <div className="w-2.5 h-2.5 rounded-full bg-amber-500/20 border border-amber-500/40" />
                       <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/20 border border-emerald-500/40" />
                    </div>
                    <div className="text-[10px] text-zinc-700 font-bold uppercase tracking-widest">Metadata Inspector</div>
                 </div>
                 <div className="p-4 font-mono text-[11px] text-zinc-500 space-y-1.5">
                    <div className="text-emerald-400">{"{"}</div>
                    <div className="pl-4">"ad_id": "82791823712",</div>
                    <div className="pl-4">"creative": {"{"}</div>
                    <div className="pl-8 text-indigo-400">"body": "Get 20% off your first Yoga Mat today!",</div>
                    <div className="pl-8 text-amber-400">"call_to_action_type": "SHOP_NOW",</div>
                    <div className="pl-8 text-blue-400">"image_url": "https://cdn.fb.com/c/88..."</div>
                    <div className="pl-4">{"}"}</div>
                    <div className="text-emerald-400">{"}"}</div>
                 </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
          <Sparkles className="absolute -right-12 -top-12 w-48 h-48 text-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 rotate-45" />
        </div>
      </div>
    </Shell>
  );
}
