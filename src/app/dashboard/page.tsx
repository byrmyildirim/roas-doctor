import React from 'react';
import Shell from '@/components/layout/Shell';
import StatCard from '@/components/dashboard/StatCard';
import { 
  Activity, 
  Megaphone, 
  Search, 
  ShoppingBag, 
  Zap, 
  AlertCircle, 
  CheckCircle2, 
  ArrowUpRight 
} from 'lucide-react';

export default function DashboardPage() {
  return (
    <Shell>
      <div className="space-y-6">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white mb-1">Account Overview</h1>
            <p className="text-zinc-500 text-sm">Last sync was 12 minutes ago.</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-blue-600/25 active:scale-95">
            <Zap className="w-4 h-4 fill-white" />
            Trigger Full Audit
          </button>
        </div>

        {/* Top Tier Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            label="Overall Match Score" 
            value="74/100" 
            icon={Activity} 
            trend={{ value: 12, direction: 'up' }}
            color="bg-blue-600"
            description="Combined alignment across all platforms."
          />
          <StatCard 
            label="Meta Alignment" 
            value="82%" 
            icon={Megaphone} 
            trend={{ value: 4, direction: 'up' }}
            color="bg-indigo-600"
            description="Ad-to-landing page promise match."
          />
          <StatCard 
            label="Google Intent" 
            value="64%" 
            icon={Search} 
            trend={{ value: 8, direction: 'down' }}
            color="bg-amber-600"
            description="Keyword to page relevance score."
          />
          <StatCard 
            label="Store Readiness" 
            value="78%" 
            icon={ShoppingBag} 
            trend={{ value: 2, direction: 'up' }}
            color="bg-emerald-600"
            description="Shopify page conversion health."
          />
        </div>

        {/* Main Grid: Priorities vs Recent Syncs */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Priority Insights */}
          <div className="lg:col-span-2 space-y-6">
            <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800/50">
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                Critical Improvement Opportunities
              </h2>
              <div className="space-y-4">
                {[
                  {
                    title: 'Check out mismatch: "Free Shipping" missing on Product Pages',
                    source: 'Shopify / Meta',
                    impact: 'High',
                    severity: 'Critical',
                    icon: AlertCircle,
                    iconColor: 'text-red-400',
                  },
                  {
                    title: 'Google Search: "Sustainable Yoga Mat" landing on "All Products" list',
                    source: 'Google Ads',
                    impact: 'Medium',
                    severity: 'High',
                    icon: AlertCircle,
                    iconColor: 'text-amber-400',
                  },
                  {
                    title: 'Meta Hook: "Get 20% Off" not mentioned above the fold on LP',
                    source: 'Meta Ads',
                    impact: 'High',
                    severity: 'Critical',
                    icon: AlertCircle,
                    iconColor: 'text-red-400',
                  }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-zinc-800/30 border border-zinc-800/50 hover:border-zinc-700 transition-colors group cursor-pointer">
                    <div className={`mt-1 ${item.iconColor}`}>
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">{item.title}</span>
                        <ArrowUpRight className="w-4 h-4 text-zinc-600 group-hover:text-blue-400 transition-colors" />
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{item.source}</span>
                        <div className="w-1 h-1 rounded-full bg-zinc-700" />
                        <span className="text-xs text-zinc-400">Impact: {item.impact}</span>
                        <div className="w-1 h-1 rounded-full bg-zinc-700" />
                        <span className={`text-xs font-medium ${item.severity === 'Critical' ? 'text-red-400' : 'text-amber-400'}`}>{item.severity}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800/50">
                <h3 className="text-sm font-medium text-zinc-400 mb-4">Ad Account Health</h3>
                <div className="space-y-4">
                   <div className="flex items-center justify-between">
                     <div className="flex items-center gap-3">
                       <div className="w-2 h-2 rounded-full bg-blue-500" />
                       <span className="text-sm text-zinc-300 font-medium">Meta Ads (Roas Dr.)</span>
                     </div>
                     <span className="text-xs text-emerald-400 font-bold">ACTIVE</span>
                   </div>
                   <div className="flex items-center justify-between">
                     <div className="flex items-center gap-3">
                       <div className="w-2 h-2 rounded-full bg-amber-500" />
                       <span className="text-sm text-zinc-300 font-medium">Google Ads (Main)</span>
                     </div>
                     <span className="text-xs text-emerald-400 font-bold">ACTIVE</span>
                   </div>
                   <div className="flex items-center justify-between">
                     <div className="flex items-center gap-3">
                       <div className="w-2 h-2 rounded-full bg-emerald-500" />
                       <span className="text-sm text-zinc-300 font-medium">Shopify Store</span>
                     </div>
                     <span className="text-xs text-emerald-400 font-bold">CONNECTED</span>
                   </div>
                </div>
              </div>

               <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-600/10 to-indigo-600/10 border border-blue-500/20 relative overflow-hidden group">
                <div className="relative z-10">
                  <h3 className="text-sm font-medium text-blue-400 mb-2">Pro Feature: AI Semantic Audit</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                    Enable our Deep Semantic analysis to detect "Mood and Tone" mismatches between your creative and page copy.
                  </p>
                  <button className="text-xs font-bold text-white px-3 py-1.5 bg-blue-600 rounded-lg group-hover:bg-blue-500 transition-all">
                    Upgrade to Pro
                  </button>
                </div>
                <Sparkles className="absolute -right-4 -bottom-4 w-24 h-24 text-blue-500/5 group-hover:text-blue-500/10 transition-all duration-700 rotate-12" />
              </div>
            </div>
          </div>

          {/* Activity Feed */}
          <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800/50">
            <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <History className="w-4 h-4 text-zinc-400" />
              Recent Activity
            </h2>
            <div className="space-y-6 relative before:absolute before:left-[11px] before:top-2 before:bottom-0 before:w-px before:bg-zinc-800">
              {[
                {
                  title: 'Daily Meta Sync Completed',
                  time: '12m ago',
                  status: 'Success',
                  icon: CheckCircle2,
                  color: 'text-emerald-400',
                },
                {
                  title: 'New Google Ad Detected (ID: 882)',
                  time: '2h ago',
                  status: 'Matched',
                  icon: Activity,
                  color: 'text-blue-400',
                },
                {
                  title: 'Page Content Refresh (Yoga Mat LP)',
                  time: '5h ago',
                  status: 'Updated',
                  icon: ShoppingBag,
                  color: 'text-indigo-400',
                },
                {
                  title: 'Sync Error (Meta API timeout)',
                  time: '1d ago',
                  status: 'Retrying',
                  icon: AlertCircle,
                  color: 'text-red-400',
                },
                {
                  title: 'Weekly Roundup Drafted',
                  time: '1d ago',
                  status: 'Ready',
                  icon: Sparkles,
                  color: 'text-zinc-400',
                }
              ].map((item, idx) => (
                <div key={idx} className="relative pl-8">
                   <div className={`absolute left-0 top-0.5 p-1 rounded-full bg-zinc-900 border border-zinc-800 ${item.color}`}>
                     <item.icon className="w-3 h-3" />
                   </div>
                   <div className="text-sm font-medium text-white mb-0.5">{item.title}</div>
                   <div className="flex items-center gap-2">
                     <span className="text-[10px] text-zinc-500 font-medium">{item.time}</span>
                     <div className="w-1 h-1 rounded-full bg-zinc-800" />
                     <span className={`text-[10px] font-bold ${item.color.replace('text-', 'bg-')}/10 ${item.color} px-1.5 py-0.5 rounded uppercase tracking-wider`}>
                       {item.status}
                     </span>
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
