'use client';
import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
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
  ArrowUpRight,
  History,
  Loader2
} from 'lucide-react';
import { useLanguage } from '@/components/layout/LanguageProvider';

interface DashboardStats {
  overallScore: number;
  metaScore: number;
  googleScore: number;
  shopifyStoreCount: number;
  productsCount: number;
  lastSync: string;
}

export default function DashboardClient({ stats }: { stats: DashboardStats }) {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const shop = searchParams.get('shop');
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSyncShopify = async () => {
    if (!shop) return;
    setIsSyncing(true);
    try {
      const res = await fetch(`/api/sync/shopify?shop=${shop}`, { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        alert(`${data.count} ürün başarıyla senkronize edildi!`);
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSyncing(false);
    }
  };

  const handleConnectMeta = () => {
    window.location.href = '/api/auth/meta';
  };

  const handleConnectGoogle = () => {
    window.location.href = '/api/auth/google';
  };

  return (
    <Shell>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 mb-1">{t('account_overview')}</h1>
            <p className="text-zinc-500 text-sm">{t('last_sync')} {stats.lastSync}.</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={handleSyncShopify}
              disabled={isSyncing}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-blue-600/25 active:scale-95 disabled:opacity-50"
            >
              {isSyncing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4 fill-white" />}
              {t('trigger_audit')}
            </button>
          </div>
        </div>

        {/* Top Tier Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            label={t('overall_match')} 
            value={`${stats.overallScore}/100`} 
            icon={Activity} 
            trend={{ value: 12, direction: 'up' }}
            color="bg-blue-600"
            description="Combined alignment across all platforms."
          />
          <StatCard 
            label={t('meta_alignment')} 
            value={`${stats.metaScore}%`} 
            icon={Megaphone} 
            trend={{ value: 4, direction: 'up' }}
            color="bg-indigo-600"
            description="Ad-to-landing page promise match."
          />
          <StatCard 
            label={t('google_intent')} 
            value={`${stats.googleScore}%`} 
            icon={Search} 
            trend={{ value: 8, direction: 'down' }}
            color="bg-amber-600"
            description="Keyword to page relevance score."
          />
          <StatCard 
            label={t('store_readiness')} 
            value={`${stats.productsCount} Products`} 
            icon={ShoppingBag} 
            trend={{ value: 2, direction: 'up' }}
            color="bg-emerald-600"
            description={`${stats.shopifyStoreCount} Stores Connected.`}
          />
        </div>

        {/* Main Grid: Priorities vs Recent Syncs */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Priority Insights */}
          <div className="lg:col-span-2 space-y-6">
            <div className="p-6 rounded-2xl bg-white border border-zinc-200 shadow-sm">
              <h2 className="text-lg font-semibold text-zinc-900 mb-4 flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500" />
                {t('critical_opportunities')}
              </h2>
              <div className="space-y-4">
                {[
                  {
                    title: 'Check out mismatch: "Free Shipping" missing on Product Pages',
                    source: 'Shopify / Meta',
                    impact: 'High',
                    severity: 'Critical',
                    icon: AlertCircle,
                    iconColor: 'text-red-500',
                  },
                  {
                    title: 'Google Search: "Sustainable Yoga Mat" landing on "All Products" list',
                    source: 'Google Ads',
                    impact: 'Medium',
                    severity: 'High',
                    icon: AlertCircle,
                    iconColor: 'text-amber-500',
                  },
                  {
                    title: 'Meta Hook: "Get 20% Off" not mentioned above the fold on LP',
                    source: 'Meta Ads',
                    impact: 'High',
                    severity: 'Critical',
                    icon: AlertCircle,
                    iconColor: 'text-red-500',
                  }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-zinc-50 border border-zinc-200 hover:border-zinc-300 transition-colors group cursor-pointer shadow-sm">
                    <div className={`mt-1 ${item.iconColor}`}>
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-semibold text-zinc-900 group-hover:text-blue-600 transition-colors">{item.title}</span>
                        <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-blue-600 transition-colors" />
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{item.source}</span>
                        <div className="w-1 h-1 rounded-full bg-zinc-300" />
                        <span className="text-xs text-zinc-500">Impact: {item.impact}</span>
                        <div className="w-1 h-1 rounded-full bg-zinc-300" />
                        <span className={`text-xs font-medium ${item.severity === 'Critical' ? 'text-red-500' : 'text-amber-500'}`}>{item.severity}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-zinc-200 shadow-sm">
              <h3 className="text-sm font-medium text-zinc-500 mb-4">{t('ad_health')}</h3>
              <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                      <span className="text-sm text-zinc-700 font-medium">Meta Ads</span>
                    </div>
                    <button 
                      onClick={handleConnectMeta}
                      className="px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-500 transition-all shadow-sm">
                      {t('connect_meta')}
                    </button>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-amber-500" />
                      <span className="text-sm text-zinc-700 font-medium">Google Ads</span>
                    </div>
                    <button 
                      onClick={handleConnectGoogle}
                      className="px-3 py-1 bg-amber-600 text-white text-xs font-bold rounded-lg hover:bg-amber-500 transition-all shadow-sm">
                      {t('connect_google')}
                    </button>
                  </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-white border border-zinc-200 shadow-sm">
              <h3 className="text-sm font-medium text-zinc-500 mb-4">{t('recent_activity')}</h3>
              <div className="relative pl-4 border-l border-zinc-200 space-y-6">
                {[
                  { title: 'Google Ads Synced', time: '12 mins ago', icon: Zap, iconBg: 'bg-amber-100', iconColor: 'text-amber-600' },
                  { title: 'Meta Ads Synced', time: '1 hr ago', icon: Activity, iconBg: 'bg-blue-100', iconColor: 'text-blue-600' },
                  { title: 'Shopify Catalog Synced', time: 'Yesterday', icon: ShoppingBag, iconBg: 'bg-emerald-100', iconColor: 'text-emerald-600' }
                ].map((act, idx) => (
                  <div key={idx} className="relative">
                    <div className={`absolute -left-[25px] w-6 h-6 rounded-full ${act.iconBg} flex items-center justify-center border-4 border-white`}>
                      <act.icon className={`w-3 h-3 ${act.iconColor}`} />
                    </div>
                    <div>
                      <p className="text-sm text-zinc-800 font-medium">{act.title}</p>
                      <p className="text-xs text-zinc-500 mt-1">{act.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200 shadow-sm relative overflow-hidden text-center group">
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center mb-4">
                  <History className="w-6 h-6 text-zinc-400" />
                </div>
                <h3 className="text-zinc-900 font-bold mb-2">{t('export_report_title')}</h3>
                <p className="text-zinc-500 text-xs mb-4">{t('export_report_desc')}</p>
                <button className="w-full py-2 bg-blue-600 text-white font-semibold text-sm rounded-xl hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/20">
                  {t('download_pdf')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
}
