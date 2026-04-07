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

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Shopify Store', href: '/dashboard/shopify', icon: ShoppingBag },
  { name: 'Meta Ads', href: '/dashboard/meta', icon: Megaphone },
  { name: 'Google Ads', href: '/dashboard/google', icon: Search },
  { name: 'Audit Hub', href: '/dashboard/audits', icon: ClipboardCheck },
  { name: 'Recommendations', href: '/dashboard/recommendations', icon: Sparkles },
  { name: 'History', href: '/dashboard/history', icon: History },
];

const secondaryNavItems = [
  { name: 'Team', href: '/dashboard/team', icon: Users },
  { name: 'Billing', href: '/dashboard/billing', icon: CreditCard },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export default function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-[#0a0a0b] text-zinc-100 font-sans selection:bg-blue-500/30">
      {/* Sidebar */}
      <aside className="w-64 border-r border-zinc-800/50 flex flex-col bg-[#0d0d0f]">
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">
            AdStore Match
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
              className="group flex items-center justify-between px-3 py-2 text-sm font-medium rounded-xl transition-all duration-200 hover:bg-zinc-800/50 text-zinc-400 hover:text-white"
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-4 h-4 transition-colors group-hover:text-blue-400" />
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
              className="group flex items-center justify-between px-3 py-2 text-sm font-medium rounded-xl transition-all duration-200 hover:bg-zinc-800/50 text-zinc-400 hover:text-white"
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-4 h-4 transition-colors group-hover:text-blue-400" />
                {item.name}
              </div>
              <ChevronRight className="w-3 h-3 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-zinc-800/50">
          <button className="flex items-center gap-3 px-3 py-2 w-full text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-800/50 rounded-xl transition-all duration-200">
            <LogOut className="w-4 h-4 text-red-400/70" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative bg-grid-white/[0.02]">
        {/* Top Header */}
        <header className="sticky top-0 z-30 h-16 border-b border-zinc-800/50 bg-[#0a0a0b]/80 backdrop-blur-md flex items-center justify-between px-8">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-zinc-400">Workspace /</span>
            <span className="text-sm font-semibold">Roas Doctor</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex -space-x-2">
              <div className="w-7 h-7 rounded-full bg-blue-500 border-2 border-[#0a0a0b] flex items-center justify-center text-[10px] font-bold">JD</div>
              <div className="w-7 h-7 rounded-full bg-emerald-500 border-2 border-[#0a0a0b] flex items-center justify-center text-[10px] font-bold">AA</div>
            </div>
            <div className="h-6 w-px bg-zinc-800/50 mx-2" />
            <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800/30 rounded-lg border border-zinc-800/50">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-medium text-zinc-300">Live Sync</span>
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
