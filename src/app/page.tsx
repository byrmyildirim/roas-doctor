import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, Activity, Zap, CheckCircle2 } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white flex flex-col font-sans selection:bg-blue-500/30 overflow-hidden relative">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[120px]" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      {/* Navigation */}
      <nav className="w-full max-w-7xl mx-auto px-6 py-6 flex justify-between items-center z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-xl shadow-blue-500/20">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight">AdStore Match</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/onboarding" className="text-sm font-semibold text-zinc-400 hover:text-white transition-colors">
            Sign In
          </Link>
          <Link 
            href="/onboarding" 
            className="px-4 py-2 bg-white text-black text-sm font-bold rounded-full hover:bg-zinc-200 transition-all shadow-xl shadow-white/10 active:scale-95"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 flex flex-col justify-center items-center text-center z-10 pt-20 pb-32">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          Phase 1 Launched
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter max-w-4xl mb-8 leading-[1.1]">
          Stop guessing.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
            Audit your traffic alignment instantly.
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mb-12 leading-relaxed">
          The first multi-tenant engine strictly dedicated to analyzing the convergence of your Meta Ads, Google Ads, and Shopify storefront. Find the bottlenecks killing your ROAS.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 mb-20">
          <Link 
            href="/onboarding"
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl text-white font-bold text-lg flex items-center justify-center gap-3 hover:opacity-90 transition-all active:scale-95 shadow-2xl shadow-blue-600/25 group"
          >
            Start Free Audit
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link 
            href="/dashboard"
            className="w-full sm:w-auto px-8 py-4 bg-zinc-900 border border-zinc-800 rounded-2xl text-white font-bold text-lg flex items-center justify-center gap-3 hover:bg-zinc-800 transition-all active:scale-95"
          >
            View Demo Dashboard
          </Link>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
          {[
            { icon: Zap, title: 'Instant Semantic Matching', desc: 'Detect promise-mismatches between ad hooks and landing pages.' },
            { icon: Activity, title: 'Real-time Webhook Sync', desc: 'Catalog updates sync in real-time, zero manual tracking required.' },
            { icon: CheckCircle2, title: 'Prioritized Actions', desc: 'Get AI-driven implementation plans sorted by revenue impact.' }
          ].map((feat, idx) => (
            <div key={idx} className="p-6 rounded-3xl bg-zinc-900/50 border border-zinc-800/50 text-left backdrop-blur-xl hover:bg-zinc-900 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-center mb-4 text-blue-400">
                <feat.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{feat.title}</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
