'use client';
import React from 'react';
import Shell from '@/components/layout/Shell';
import { 
  CreditCard, 
  CheckCircle2, 
  Zap, 
  ShoppingBag, 
} from 'lucide-center';
import { useLanguage } from '@/components/layout/LanguageProvider';

export default function BillingPage() {
  const { t } = useLanguage();

  return (
    <Shell>
      <div className="space-y-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 mb-2 flex items-center gap-3">
              <CreditCard className="w-8 h-8 text-blue-600" />
              {t('billing')}
            </h1>
            <p className="text-zinc-500 text-sm">Your workspace plan and usage for Roas Doctor.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="p-8 rounded-3xl border border-blue-200 bg-blue-50/50 flex flex-col items-center text-center shadow-lg shadow-blue-500/5">
              <div className="w-16 h-16 rounded-2xl bg-white border border-blue-100 flex items-center justify-center mb-6 shadow-sm">
                <Zap className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-zinc-900 mb-2">Lifetime Personal Plan</h2>
              <p className="text-zinc-500 text-sm max-w-xs mb-8 leading-relaxed">
                You are currently on a custom lifetime plan for your personal store. All premium features are unlocked.
              </p>
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                 <span className="px-3 py-1 bg-white border border-blue-100 rounded-lg text-xs font-bold text-blue-600">Unlimited Scans</span>
                 <span className="px-3 py-1 bg-white border border-blue-100 rounded-lg text-xs font-bold text-blue-600">Real-time Sync</span>
                 <span className="px-3 py-1 bg-white border border-blue-100 rounded-lg text-xs font-bold text-blue-600">Full Audits</span>
              </div>
              <div className="w-full h-1.5 bg-zinc-200 rounded-full overflow-hidden mb-2">
                 <div className="h-full bg-blue-600 w-full" />
              </div>
              <div className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">
                 100% Managed by Workspace Owner
              </div>
           </div>

           <div className="p-8 rounded-3xl border border-zinc-200 bg-white shadow-sm space-y-6">
              <h3 className="text-lg font-bold text-zinc-900">Workspace Usage</h3>
              <div className="space-y-4">
                 {[
                   { label: 'Shopify Store', value: 'Connected', icon: ShoppingBag, color: 'text-emerald-600' },
                   { label: 'Billing Cycle', value: 'None (Lifetime)', icon: CheckCircle2, color: 'text-blue-600' }
                 ].map((item, idx) => (
                   <div key={idx} className="flex items-center gap-4 p-4 rounded-xl bg-zinc-50 border border-zinc-100">
                      <item.icon className={`w-5 h-5 ${item.color}`} />
                      <div>
                         <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest leading-none mb-1">{item.label}</div>
                         <div className="text-sm font-bold text-zinc-900">{item.value}</div>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </Shell>
  );
}
