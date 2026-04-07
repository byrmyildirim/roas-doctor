'use client';
import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Sparkles, ArrowRight, Activity, Zap, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/components/layout/LanguageProvider';
import { LanguageSelector } from '@/components/layout/LanguageSelector';
import { ThemeToggle } from '@/components/layout/ThemeToggle';

export default function Home() {
  const { t } = useLanguage();
  const router = useRouter();

  useEffect(() => {
    // Eğer URL'de shop parametresi varsa (Shopify içinden geliniyorsa) 
    // kullanıcıyı direkt dashboard'a veya auth akışına yönlendirebiliriz.
    const params = new URLSearchParams(window.location.search);
    if (params.get('shop') || params.get('host')) {
      router.push(`/dashboard${window.location.search}`);
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0b] text-zinc-900 dark:text-white flex flex-col font-sans selection:bg-blue-500/30 overflow-hidden relative transition-colors duration-300">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[120px]" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 dark:opacity-20 brightness-100 contrast-150 mix-blend-overlay" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      {/* Navigation */}
      <nav className="w-full max-w-7xl mx-auto px-6 py-6 flex justify-between items-center z-10 relative">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-xl shadow-blue-500/20">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight">{t('app_name')}</span>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <LanguageSelector />
          <Link href="/onboarding" className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors">
            {t('sign_in')}
          </Link>
          <Link 
            href="/onboarding" 
            className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black text-sm font-bold rounded-full hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all shadow-xl shadow-black/10 dark:shadow-white/10 active:scale-95"
          >
            {t('get_started')}
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 flex flex-col justify-center items-center text-center z-10 pt-20 pb-32 relative">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          {t('phase_1')}
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter max-w-4xl mb-8 leading-[1.1]">
          {t('landing_title_1')}<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400">
            {t('landing_title_2')}
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mb-12 leading-relaxed">
          {t('landing_subtitle')}
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 mb-20">
          <Link 
            href="/onboarding"
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl text-white font-bold text-lg flex items-center justify-center gap-3 hover:opacity-90 transition-all active:scale-95 shadow-2xl shadow-blue-600/25 group"
          >
            {t('start_free_audit')}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link 
            href="/dashboard"
            className="w-full sm:w-auto px-8 py-4 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-zinc-900 dark:text-white font-bold text-lg flex items-center justify-center gap-3 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-all active:scale-95"
          >
            {t('view_demo')}
          </Link>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
          {[
            { icon: Zap, title: t('feature_1_title'), desc: t('feature_1_desc') },
            { icon: Activity, title: t('feature_2_title'), desc: t('feature_2_desc') },
            { icon: CheckCircle2, title: t('feature_3_title'), desc: t('feature_3_desc') }
          ].map((feat, idx) => (
            <div key={idx} className="p-6 rounded-3xl bg-zinc-50/80 dark:bg-zinc-900/50 border border-zinc-200/50 dark:border-zinc-800/50 text-left backdrop-blur-xl hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center mb-4 text-blue-600 dark:text-blue-400">
                <feat.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-black dark:text-white mb-2">{feat.title}</h3>
              <p className="text-zinc-600 dark:text-zinc-500 text-sm leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
