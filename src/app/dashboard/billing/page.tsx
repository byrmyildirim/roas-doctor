import React from 'react';
import Shell from '@/components/layout/Shell';
import { 
  CreditCard, 
  CheckCircle2, 
  Zap, 
  ShoppingBag, 
  Megaphone, 
  Search, 
  Lock, 
  Check, 
  ExternalLink 
} from 'lucide-react';

const plans = [
  {
    name: 'Starter',
    price: 'Free',
    description: 'Perfect for small stores starting with paid traffic.',
    features: ['1 Shopify Store', 'Up to 5 Meta Ads', 'Monthly Scan', 'Core CRO Audit'],
    buttonText: 'Current Plan',
    active: true,
  },
  {
    name: 'Pro',
    price: '$79',
    description: 'Advanced alignment for growing e-commerce brands.',
    features: ['3 Shopify Stores', 'Unlimited Meta & Google Ads', 'Daily Auto-Sync', 'Semantic Alignment Engine', 'Team Members (Up to 5)'],
    buttonText: 'Upgrade to Pro',
    active: false,
    recommended: true,
  },
  {
    name: 'Agency',
    price: '$249',
    description: 'White-label reporting for high-volume performance teams.',
    features: ['Unlimited Stores', 'White-label Reports', 'Client Sharing Links', 'API Access', 'Dedicated Account Manager'],
    buttonText: 'Talk to Sales',
    active: false,
  },
];

export default function BillingPage() {
  return (
    <Shell>
      <div className="space-y-12">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white mb-2 flex items-center gap-3">
              <CreditCard className="w-8 h-8 text-indigo-500" />
              Plans & Billing
            </h1>
            <p className="text-zinc-500 text-sm">Manage your subscription and usage limits.</p>
          </div>
          <div className="flex items-center gap-2 p-2 px-3 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-bold text-zinc-400">
             Next Invoice: May 7, 2026
          </div>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {plans.map((plan) => (
             <div key={plan.name} className={`relative p-8 rounded-3xl border transition-all duration-500 flex flex-col ${
                plan.active ? 'bg-zinc-900 border-zinc-800' : 
                plan.recommended ? 'bg-gradient-to-br from-indigo-900/40 to-zinc-900 border-indigo-500 shadow-2xl shadow-indigo-500/10' : 
                'bg-zinc-900/50 border-zinc-800/50 grayscale hover:bg-zinc-900 transition-all'
             }`}>
                {plan.recommended && (
                  <div className="absolute top-0 right-8 -translate-y-1/2 px-3 py-1 bg-indigo-500 text-[10px] font-black text-white uppercase tracking-widest rounded-full shadow-lg">
                    Recommended
                  </div>
                )}
                
                <div className="mb-8">
                  <div className="text-sm font-bold text-zinc-400 mb-1">{plan.name}</div>
                  <div className="flex items-end gap-1 mb-4">
                     <span className="text-4xl font-black text-white italic tracking-tighter">{plan.price}</span>
                     {plan.price !== 'Free' && <span className="text-sm text-zinc-500 font-bold mb-1">/mo</span>}
                  </div>
                  <p className="text-xs text-zinc-500 leading-relaxed font-medium">
                    {plan.description}
                  </p>
                </div>

                <div className="flex-1 space-y-4 mb-10">
                   {plan.features.map((feature, i) => (
                     <div key={i} className="flex items-start gap-2.5">
                        <div className="mt-0.5 p-0.5 rounded-full bg-emerald-400/10 text-emerald-400 border border-emerald-400/10">
                           <Check className="w-2.5 h-2.5" />
                        </div>
                        <span className="text-xs text-zinc-400 font-medium">{feature}</span>
                     </div>
                   ))}
                </div>

                <button className={`w-full py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all active:scale-[0.98] ${
                   plan.active ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed border border-zinc-700' : 
                   plan.recommended ? 'bg-white text-black hover:bg-zinc-200 shadow-xl shadow-white/5' : 
                   'bg-zinc-800 text-white hover:bg-zinc-700'
                }`}>
                   {plan.buttonText}
                </button>
             </div>
           ))}
        </div>

        {/* Usage Stats Area */}
        <div className="p-10 rounded-3xl bg-zinc-900 border border-zinc-800/50 relative overflow-hidden group">
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative z-10">
              <div className="lg:col-span-1 space-y-6">
                <h3 className="text-xl font-bold tracking-tight text-white mb-2">Workspace <br /> <span className="text-indigo-400">Current Usage</span></h3>
                <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-4">
                   <div>
                      <div className="flex justify-between text-[10px] font-bold text-zinc-600 uppercase mb-2">
                         <span>Stores Connected</span>
                         <span>1/1</span>
                      </div>
                      <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-400 w-full" />
                      </div>
                   </div>
                   <div>
                      <div className="flex justify-between text-[10px] font-bold text-zinc-600 uppercase mb-2">
                         <span>Monthly Scans</span>
                         <span>12 / 100</span>
                      </div>
                      <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 w-[12%]" />
                      </div>
                   </div>
                </div>
              </div>

              <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                 {[
                   { label: 'Payment Method', value: 'Visa ending in 4242', icon: CreditCard, color: 'text-zinc-500' },
                   { label: 'Next Invoice', value: '7 May 2026', icon: Zap, color: 'text-amber-400' },
                   { label: 'Billing Email', value: 'billing@roasdoctor.com', icon: Lock, color: 'text-indigo-400' },
                   { label: 'Currency', value: 'USD ($)', icon: ShoppingBag, color: 'text-emerald-400' }
                 ].map((item, idx) => (
                   <div key={idx} className="p-5 rounded-2xl bg-zinc-950/40 border border-zinc-800/50 hover:bg-zinc-950 transition-colors flex items-center gap-4">
                      <div className={`p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 ${item.color}`}>
                        <item.icon className="w-4 h-4" />
                      </div>
                      <div>
                         <div className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest leading-none mb-1">{item.label}</div>
                         <div className="text-xs font-bold text-zinc-300">{item.value}</div>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Note Area */}
        <div className="text-center text-[10px] font-black text-zinc-700 uppercase tracking-widest flex items-center justify-center gap-4 py-8">
           <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3 h-3 text-emerald-500" /> Secure Payments by Stripe</span>
           <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3 h-3 text-emerald-500" /> Cancel Anytime</span>
           <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3 h-3 text-emerald-500" /> No Hidden Fees</span>
        </div>
      </div>
    </Shell>
  );
}
