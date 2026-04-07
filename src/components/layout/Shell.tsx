'use client';
import React from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Megaphone, 
  Search, 
  ClipboardCheck, 
  Settings, 
  History, 
  Users, 
  CreditCard, 
  LogOut,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { useLanguage } from './LanguageProvider';
import { LanguageSelector } from './LanguageSelector';
import { ThemeToggle } from './ThemeToggle';

export default function Shell({ children }: { children: React.ReactNode }) {
  const { t } = useLanguage();

  const navItems = [
    { name: t('dashboard'), href: '/dashboard', icon: LayoutDashboard },
    { name: t('shopify_store'), href: '/dashboard/shopify', icon: ShoppingBag },
    { name: t('meta_ads'), href: '/dashboard/meta', icon: Megaphone },
    { name: t('google_ads'), href: '/dashboard/google', icon: Search },
    { name: t('audit_hub'), href: '/dashboard/audits', icon: ClipboardCheck },
    { name: t('recommendations'), href: '/dashboard/recommendations', icon: Sparkles },
    { name: t('history'), href: '/dashboard/history', icon: History },
  ];

  const secondaryNavItems = [
    { name: 'Team', href: '/dashboard/team', icon: Users },
    { name: t('billing'), href: '/dashboard/billing', icon: CreditCard },
    { name: t('settings'), href: '/dashboard/settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-white dark:bg-[#0a0a0b] text-zinc-900 dark:text-zinc-100 font-sans selection:bg-blue-500/30 transition-colors duration-300">
      {/* Sidebar */}
      <aside className="w-64 border-r border-zinc-200 dark:border-zinc-800/50 flex flex-col bg-zinc-50 dark:bg-[#0d0d0f] transition-colors">
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-zinc-500 dark:from-white dark:to-zinc-400">
            {t('app_name')}
          </span>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1">
          <div className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider px-2 mb-2">
            Main
          </div>
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="group flex items-center justify-between px-3 py-2 text-sm font-medium rounded-xl transition-all duration-200 hover:bg-zinc-200 dark:hover:bg-zinc-800/50 text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white"
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-4 h-4 transition-colors group-hover:text-blue-500 dark:group-hover:text-blue-400" />
                {item.name}
              </div>
              <ChevronRight className="w-3 h-3 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
            </Link>
          ))}

          <div className="pt-8 text-[10px] font-semibold text-zinc-500 uppercase tracking-wider px-2 mb-2">
            Management
          </div>
          {secondaryNavItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="group flex items-center justify-between px-3 py-2 text-sm font-medium rounded-xl transition-all duration-200 hover:bg-zinc-200 dark:hover:bg-zinc-800/50 text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white"
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-4 h-4 transition-colors group-hover:text-blue-500 dark:group-hover:text-blue-400" />
                {item.name}
              </div>
              <ChevronRight className="w-3 h-3 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-zinc-200 dark:border-zinc-800/50">
          <button className="flex items-center gap-3 px-3 py-2 w-full text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-800/50 rounded-xl transition-all duration-200">
            <LogOut className="w-4 h-4 text-red-500 dark:text-red-400/70" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative bg-grid-black/[0.02] dark:bg-grid-white/[0.02]">
        {/* Top Header */}
        <header className="sticky top-0 z-30 h-16 border-b border-zinc-200 dark:border-zinc-800/50 bg-white/80 dark:bg-[#0a0a0b]/80 backdrop-blur-md flex items-center justify-between px-8">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Workspace /</span>
            <span className="text-sm font-semibold">Roas Doctor</span>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <LanguageSelector />
            <div className="flex -space-x-2">
              <div className="w-7 h-7 rounded-full bg-blue-500 border-2 border-white dark:border-[#0a0a0b] flex items-center justify-center text-[10px] font-bold text-white">JD</div>
              <div className="w-7 h-7 rounded-full bg-emerald-500 border-2 border-white dark:border-[#0a0a0b] flex items-center justify-center text-[10px] font-bold text-white">AA</div>
            </div>
            <div className="h-6 w-px bg-zinc-200 dark:bg-zinc-800/50 mx-2" />
            <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800/30 rounded-lg border border-zinc-200 dark:border-zinc-800/50">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-medium text-zinc-600 dark:text-zinc-300">Live Sync</span>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
