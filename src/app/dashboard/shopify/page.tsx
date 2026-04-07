'use client';
import React from 'react';
import Shell from '@/components/layout/Shell';
import { 
  ShoppingBag, 
  Package, 
  Layout, 
  ExternalLink, 
  RefreshCw, 
  Settings, 
  Zap, 
  Search, 
  Filter 
} from 'lucide-react';
import { useLanguage } from '@/components/layout/LanguageProvider';

const products = [
  { id: '827391', title: 'Sustainable Pro Yoga Mat', price: '$84.00', status: 'In Stock', handle: 'yoga-mat-pro', auditScore: 92 },
  { id: '827392', title: 'Recycled Rubber Blocks', price: '$22.00', status: 'In Stock', handle: 'rubber-blocks', auditScore: 45 },
  { id: '827393', title: 'Organic Cotton Strap', price: '$18.00', status: 'Draft', handle: 'cotton-strap', auditScore: 0 },
];

export default function ShopifyPage() {
  const { t } = useLanguage();

  return (
    <Shell>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 mb-2 flex items-center gap-3">
              <ShoppingBag className="w-8 h-8 text-[#95BF47]" />
              {t('shopify_store')}
            </h1>
            <p className="text-zinc-500 text-sm italic">Status: Synchronized via GraphQL Admin API</p>
          </div>
          <div className="flex gap-3">
             <button className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-zinc-50 text-zinc-600 text-sm font-semibold rounded-xl border border-zinc-200 transition-all shadow-sm">
              <RefreshCw className="w-4 h-4" />
              {t('trigger_audit')}
            </button>
             <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-emerald-600/25 active:scale-95">
              <Zap className="w-4 h-4 fill-white" />
              {t('launch_primary')}
            </button>
          </div>
        </div>

        {/* Catalog Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           {[
             { label: 'Synced Products', value: '154', icon: Package, color: 'text-emerald-600', bg: 'bg-emerald-50' },
             { label: 'Collections', value: '18', icon: Layout, color: 'text-blue-600', bg: 'bg-blue-50' },
             { label: 'Connected Apps', value: '3', icon: ShoppingBag, color: 'text-indigo-600', bg: 'bg-indigo-50' }
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

        {/* Products Table */}
        <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="p-6 border-b border-zinc-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <h2 className="font-semibold text-zinc-900">Product Catalog & Health</h2>
            <div className="flex gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <input 
                  placeholder="Find product..." 
                  className="bg-zinc-50 border border-zinc-200 rounded-lg pl-10 pr-4 py-1.5 text-xs text-zinc-700 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all placeholder:text-zinc-400"
                />
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead className="bg-zinc-50 border-b border-zinc-200">
                 <tr>
                   <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest leading-none">Product</th>
                   <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest leading-none">Handle</th>
                   <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest leading-none text-center">Audit Score</th>
                   <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest leading-none text-right">Price</th>
                   <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest leading-none text-right">Actions</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-zinc-100">
                 {products.map((product) => (
                   <tr key={product.id} className="group hover:bg-zinc-50/50 transition-all">
                     <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg bg-zinc-100 border border-zinc-200 flex-shrink-0" />
                          <div>
                            <div className="text-sm font-semibold text-zinc-900 group-hover:text-emerald-600 transition-colors leading-tight mb-0.5">{product.title}</div>
                            <div className="text-[10px] text-zinc-400 font-mono italic">ID: {product.id}</div>
                          </div>
                        </div>
                     </td>
                     <td className="px-6 py-5 text-xs text-zinc-500 font-mono">/{product.handle}</td>
                     <td className="px-6 py-5 text-center">
                        <div className="flex justify-center">
                          <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-xs font-bold ${
                            product.auditScore >= 80 ? 'border-emerald-100 text-emerald-600 bg-emerald-50' : 
                            product.auditScore >= 50 ? 'border-amber-100 text-amber-600 bg-amber-50' : 
                            'border-red-100 text-red-600 bg-red-50'
                          }`}>
                            {product.auditScore === 0 ? 'N/A' : `${product.auditScore}%`}
                          </div>
                        </div>
                     </td>
                     <td className="px-6 py-5 text-right font-semibold text-zinc-700 tabular-nums">{product.price}</td>
                     <td className="px-6 py-5 text-right">
                        <button className="p-2 bg-zinc-50 border border-zinc-200 rounded-lg text-zinc-400 hover:text-emerald-600 transition-colors">
                          <ExternalLink className="w-4 h-4" />
                        </button>
                     </td>
                   </tr>
                 ))}
               </tbody>
            </table>
          </div>
        </div>
      </div>
    </Shell>
  );
}
