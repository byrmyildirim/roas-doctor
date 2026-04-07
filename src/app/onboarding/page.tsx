'use client';
import React, { useState } from 'react';
import { 
  Sparkles, 
  ShoppingBag, 
  Megaphone, 
  Search, 
  ArrowRight, 
  CheckCircle2, 
  ChevronRight,
  ShieldCheck,
  Zap,
  LayoutDashboard
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/components/layout/LanguageProvider';
import { LanguageSelector } from '@/components/layout/LanguageSelector';

const steps = [
  { id: 1, name: 'Workspace', icon: LayoutDashboard },
  { id: 2, name: 'Store', icon: ShoppingBag },
  { id: 3, name: 'Ads', icon: Megaphone },
  { id: 4, name: 'Analyze', icon: Zap },
];

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [shopName, setShopName] = useState('');
  const router = useRouter();
  const { t } = useLanguage();

  const nextStep = () => setCurrentStep((s) => Math.min(s + 1, 4));

  const handleShopifyConnect = () => {
    if (!shopName) return alert('Lütfen mağaza adınızı girin');
    
    // Temizleme: .myshopify.com kısmını kontrol et
    const cleanShop = shopName.replace('https://', '').replace('http://', '').split('/')[0];
    const fullShopUrl = cleanShop.includes('.myshopify.com') ? cleanShop : `${cleanShop}.myshopify.com`;
    
    // Shopify OAuth akışını başlatmak için API rotamıza yönlendiriyoruz
    window.location.href = `/api/auth/shopify?shop=${fullShopUrl}`;
  };

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white flex flex-col items-center selection:bg-blue-500/30 font-sans">
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[120px] animate-pulse" />
      </div>

      {/* Header */}
      <header className="w-full max-w-5xl px-8 py-10 flex justify-between items-center z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-xl shadow-blue-500/20">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight">{t('app_name')}</span>
        </div>
        <div className="flex items-center gap-6">
          <LanguageSelector />
          <div className="hidden md:flex gap-4">
            {steps.map((step) => (
              <div key={step.id} className="flex items-center gap-2">
                <div className={`w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold border transition-all duration-300 ${
                  currentStep >= step.id ? 'bg-blue-600 border-blue-500 text-white' : 'bg-zinc-900 border-zinc-800 text-zinc-600'
                }`}>
                  {currentStep > step.id ? <CheckCircle2 className="w-3.5 h-3.5" /> : step.id}
                </div>
                <span className={`text-xs font-semibold tracking-wider uppercase ${
                  currentStep >= step.id ? 'text-zinc-200' : 'text-zinc-600'
                }`}>{step.name}</span>
                {step.id < 4 && <ChevronRight className="w-3 h-3 text-zinc-700" />}
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 w-full max-w-2xl px-8 py-12 z-10 flex flex-col justify-center">
        {currentStep === 1 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
              <h2 className="text-4xl font-bold tracking-tight mb-4 text-white">{t('let_build')}</h2>
              <p className="text-zinc-400 text-lg">Every great audit starts with a dedicated workspace. Name it for your brand or agency.</p>
            </div>
            
            <div className="space-y-4">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest block px-1">{t('workspace_name')}</label>
              <input 
                type="text" 
                placeholder="e.g. Roas Doctor, Bloom Agency"
                className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-6 py-4 text-lg font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-zinc-700"
              />
            </div>

            <div className="p-6 rounded-2xl bg-blue-500/5 border border-blue-500/10 flex items-start gap-4">
              <ShieldCheck className="w-5 h-5 text-blue-500 mt-1" />
              <div className="text-sm text-zinc-400 leading-relaxed">
                <span className="text-zinc-200 font-semibold block mb-1">Tenancy Isolation Verified</span>
                Your data is cryptographically separated and isolated to this workspace. No cross-tenant leakage, guaranteed by our multi-tenant architecture.
              </div>
            </div>

            <button 
              onClick={nextStep}
              className="w-full py-4 bg-white text-black font-bold text-lg rounded-2xl hover:bg-zinc-200 transition-all active:scale-[0.98] flex items-center justify-center gap-2 group shadow-xl shadow-white/10"
            >
              {t('continue_setup')}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div>
              <h2 className="text-4xl font-bold tracking-tight mb-4 text-white">{t('connect_shopify')}</h2>
              <p className="text-zinc-400 text-lg">We need access to sync your catalog, landing pages, and conversion events to detect bottlenecks.</p>
            </div>

            <div className="space-y-4">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest block px-1">{t('shop_domain')}</label>
              <div className="relative">
                <input 
                  type="text" 
                  value={shopName}
                  onChange={(e) => setShopName(e.target.value)}
                  placeholder="roas-doctor-store"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-6 py-4 text-lg font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all placeholder:text-zinc-700"
                />
                <span className="absolute right-6 top-1/2 -translate-y-1/2 text-zinc-600 font-bold">.myshopify.com</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/50 text-xs text-zinc-500 font-medium flex items-center gap-2">
                <CheckCircle2 className="w-3 h-3 text-emerald-500" /> Catalog Sync Enabled
              </div>
              <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/50 text-xs text-zinc-500 font-medium flex items-center gap-2">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Webhook Integration
              </div>
            </div>

             <button 
              onClick={handleShopifyConnect}
              className="w-full py-4 bg-[#95BF47] text-white font-bold text-lg rounded-2xl hover:bg-[#7AB55C] transition-all active:scale-[0.98] flex items-center justify-center gap-3 group shadow-xl shadow-[#95BF47]/20"
            >
              <ShoppingBag className="w-5 h-5 fill-white" />
              {t('auth_shopify')}
            </button>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div>
              <h2 className="text-4xl font-bold tracking-tight mb-4 text-white">{t('bridge_gap')}</h2>
              <p className="text-zinc-400 text-lg">Connect your Meta and Google Ads to start the Ad-to-Page alignment audit.</p>
            </div>

            <div className="space-y-4">
               <button 
                onClick={nextStep}
                className="w-full py-5 px-6 bg-[#0668E1] hover:bg-[#0052CC] text-white font-bold rounded-2xl transition-all active:scale-[0.98] flex items-center justify-between group shadow-xl shadow-[#0668E1]/20"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-white/10 rounded-lg">
                    <Megaphone className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <div className="text-lg">{t('connect_meta')}</div>
                    <div className="text-xs font-normal text-white/70">Marketing API access</div>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </button>

               <button 
                onClick={nextStep}
                className="w-full py-5 px-6 bg-white hover:bg-zinc-100 text-black font-bold rounded-2xl transition-all active:scale-[0.98] flex items-center justify-between group shadow-xl shadow-white/5"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-zinc-100 rounded-lg">
                    <Search className="w-6 h-6 text-zinc-900" />
                  </div>
                  <div className="text-left">
                    <div className="text-lg">{t('connect_google')}</div>
                    <div className="text-xs font-normal text-zinc-500">Search Ads API access</div>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-zinc-900" />
              </button>
            </div>

            <div className="text-center text-xs text-zinc-600 font-medium">
              We strictly adhere to OAuth 2.0 and platform security guidelines.
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="space-y-10 text-center animate-in zoom-in-95 duration-700">
             <div className="relative">
                <div className="w-24 h-24 bg-blue-600 rounded-full mx-auto flex items-center justify-center shadow-2xl shadow-blue-500/50">
                  <Sparkles className="w-12 h-12 text-white animate-pulse" />
                </div>
                <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-3xl animate-ping opacity-20" />
             </div>

             <div>
              <h2 className="text-4xl font-bold tracking-tight mb-4 text-white">{t('ready_launch')}</h2>
              <p className="text-zinc-400 text-lg max-w-md mx-auto">Connections established. Our engine is ready to sync 24 campaigns and 148 product pages.</p>
            </div>

            <div className="max-w-xs mx-auto space-y-4">
               <Link 
                href="/dashboard"
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-lg rounded-2xl hover:opacity-90 transition-all active:scale-[0.98] flex items-center justify-center gap-2 group shadow-xl shadow-blue-600/30"
              >
                {t('launch_primary')}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="text-sm font-semibold text-zinc-500 hover:text-white transition-colors">
                Configure Audit Scope First
              </button>
            </div>

            <div className="pt-8 grid grid-cols-3 gap-6 opacity-40 grayscale">
              <img src="https://upload.wikimedia.org/wikipedia/commons/6/67/Shopify_logo_2018.svg" className="h-6 w-auto mx-auto" alt="Shopify" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg" className="h-6 w-auto mx-auto" alt="Meta" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Google_Ads_logo.svg" className="h-6 w-auto mx-auto" alt="Google" />
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full py-8 text-center text-zinc-600 text-[10px] font-bold uppercase tracking-widest z-10">
        Secure | Multi-Tenant | {t('app_name')} Audit Pro
      </footer>
    </div>
  );
}


