import React from 'react';
import Shell from '@/components/layout/Shell';
import { 
  ShoppingBag, 
  Package, 
  Layout, 
  ExternalLink, 
  RefreshCw, 
  CheckCircle2, 
  Settings, 
  Zap, 
  Search, 
  Filter, 
  Table 
} from 'lucide-react';

const products = [
  { id: '827391', title: 'Sustainable Pro Yoga Mat', price: '$84.00', status: 'In Stock', handle: 'yoga-mat-pro', auditScore: 92 },
  { id: '827392', title: 'Recycled Rubber Blocks', price: '$22.00', status: 'In Stock', handle: 'rubber-blocks', auditScore: 45 },
  { id: '827393', title: 'Organic Cotton Strap', price: '$18.00', status: 'Draft', handle: 'cotton-strap', auditScore: 0 },
];

export default function ShopifyPage() {
  return (
    <Shell>
      <div className="space-y-8">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white mb-2 flex items-center gap-3">
              <ShoppingBag className="w-8 h-8 text-[#95BF47]" />
              Store Dashboard
            </h1>
            <p className="text-zinc-500 text-sm">Status: Synchronized via GraphQL Admin API</p>
          </div>
          <div className="flex gap-3">
             <button className="flex items-center gap-2 px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-sm font-semibold rounded-xl border border-zinc-800 transition-all">
              <RefreshCw className="w-4 h-4" />
              Re-sync Products
            </button>
             <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-emerald-600/25">
              <Zap className="w-4 h-4 fill-white" />
              Scan All Pages
            </button>
          </div>
        </div>

        {/* Catalog Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           {[
             { label: 'Synced Products', value: '154', icon: Package, color: 'text-emerald-400' },
             { label: 'Collections', value: '18', icon: Layout, color: 'text-blue-400' },
             { label: 'Connected Apps', value: '3', icon: ShoppingBag, color: 'text-indigo-400' }
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

        {/* Products Table */}
        <div className="bg-zinc-900 border border-zinc-800/50 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-zinc-800/50 flex items-center justify-between bg-zinc-900/50 backdrop-blur-sm sticky top-0 z-10">
            <h2 className="font-semibold text-white">Product Catalog & Page Health</h2>
            <div className="flex gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                <input 
                  placeholder="Find product..." 
                  className="bg-zinc-950 border border-zinc-800 rounded-lg pl-10 pr-4 py-1.5 text-xs text-zinc-300 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all placeholder:text-zinc-800"
                />
              </div>
              <button className="p-2 bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-500 hover:text-white transition-colors">
                <Filter className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <table className="w-full text-left">
             <thead className="bg-zinc-950 border-b border-zinc-800/50">
               <tr>
                 <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest leading-none">Product</th>
                 <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest leading-none">Handle</th>
                 <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest leading-none text-center">Audit Score</th>
                 <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest leading-none text-right">Price</th>
                 <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest leading-none text-right">Shopify</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-zinc-800/50">
               {products.map((product) => (
                 <tr key={product.id} className="group hover:bg-zinc-800/30 transition-all">
                   <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-zinc-800 border border-zinc-700/50 flex-shrink-0" />
                        <div>
                          <div className="text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors leading-tight mb-0.5">{product.title}</div>
                          <div className="text-[10px] text-zinc-600 font-mono italic">ID: gid://shopify/Product/{product.id}</div>
                        </div>
                      </div>
                   </td>
                   <td className="px-6 py-5 text-xs text-zinc-500 font-mono">/{product.handle}</td>
                   <td className="px-6 py-5 text-center">
                      <div className="flex justify-center">
                        <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center text-xs font-bold ${
                          product.auditScore >= 80 ? 'border-emerald-500/30 text-emerald-400 bg-emerald-400/5' : 
                          product.auditScore >= 50 ? 'border-amber-500/30 text-amber-500 bg-amber-500/5' : 
                          'border-red-500/30 text-red-400 bg-red-400/5'
                        }`}>
                          {product.auditScore === 0 ? 'N/A' : `${product.auditScore}%`}
                        </div>
                      </div>
                   </td>
                   <td className="px-6 py-5 text-right font-semibold text-zinc-300 tabular-nums">{product.price}</td>
                   <td className="px-6 py-5 text-right">
                      <button className="p-2 bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-500 hover:text-emerald-500 transition-colors">
                        <ExternalLink className="w-4 h-4" />
                      </button>
                   </td>
                 </tr>
               ))}
             </tbody>
          </table>
        </div>

        {/* Architecture Note */}
        <div className="p-8 rounded-2xl bg-[#0a0a0b] border border-zinc-800/50 relative overflow-hidden group">
          <div className="relative z-10 space-y-6">
            <h3 className="text-xl font-bold tracking-tight text-white mb-4">Production-Grade <span className="text-[#95BF47]">Event-Driven</span> Synchronization</h3>
            <p className="text-zinc-400 max-w-2xl text-sm leading-relaxed mb-6">
              Unlike static scapers, AdStore Match Audit Pro uses Shopify Webhooks (Mandatory GDOR/Webhook architecture) to keep results updated in real-time. We subscribe to <code className="text-emerald-400 bg-emerald-400/5 px-1.5 py-0.5 rounded">products/update</code> and <code className="text-emerald-400 bg-emerald-400/5 px-1.5 py-0.5 rounded">themes/publish</code> to ensure every ad alignment audit is based on current store state.
            </p>
            <div className="flex gap-4">
               <div className="px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800">
                  <div className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-1">Webhook Secret</div>
                  <div className="text-xs text-white font-mono">shpat_88273...9281</div>
               </div>
               <div className="px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800">
                  <div className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-1">API Version</div>
                  <div className="text-xs text-white font-mono">2026-01 (LATEST)</div>
               </div>
            </div>
          </div>
          <div className="absolute right-[-100px] top-[-100px] w-80 h-80 bg-[#95BF47]/5 rounded-full blur-[100px] pointer-events-none group-hover:bg-[#95BF47]/10 transition-colors duration-1000" />
        </div>
      </div>
    </Shell>
  );
}
