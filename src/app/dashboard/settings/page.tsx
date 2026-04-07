'use client';
import React, { useState } from 'react';
import Shell from '@/components/layout/Shell';
import { 
  Settings as SettingsIcon, 
  Shield, 
  Globe, 
  Database, 
  Bell, 
  User,
  ExternalLink,
  Save,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { useLanguage } from '@/components/layout/LanguageProvider';

import { useSearchParams } from 'next/navigation';

export default function SettingsPage() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const [success, setSuccess] = useState(false);
  const errorParam = searchParams.get('error');

  const handleSave = () => {
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <Shell>
      <div className="space-y-8">
        {errorParam === 'meta_id_missing' && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-3 animate-bounce">
             <AlertTriangle className="w-5 h-5 text-red-600" />
             <div className="text-sm font-semibold text-red-900">
                {t('app_name')} Hatası: Meta Reklamlarını bağlamak için META_CLIENT_ID yapılandırılmalıdır.
             </div>
          </div>
        )}
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 mb-2 flex items-center gap-3">
            <SettingsIcon className="w-8 h-8 text-blue-600" />
            {t('settings')}
          </h1>
          <p className="text-zinc-500 text-sm">Configure your Roas Doctor workspace and API integrations.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar Nav */}
          <div className="lg:col-span-1 space-y-2">
            {[
              { label: 'General', icon: Globe, active: true },
              { label: 'Integrations', icon: Database, active: false },
              { label: 'Account', icon: User, active: false },
              { label: 'Security', icon: Shield, active: false },
              { label: 'Notifications', icon: Bell, active: false }
            ].map((item, idx) => (
              <button 
                key={idx}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  item.active ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'bg-white border border-zinc-200 text-zinc-600 hover:bg-zinc-50'
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}
          </div>

          {/* Settings Form */}
          <div className="lg:col-span-2 space-y-6">
             <div className="p-8 rounded-3xl bg-white border border-zinc-200 shadow-sm space-y-8">
                <div>
                   <h3 className="text-lg font-bold text-zinc-900 mb-6 flex items-center gap-2">
                      <Globe className="w-5 h-5 text-blue-600" />
                      Workspace Configuration
                   </h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                         <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest leading-none">Market Domain</label>
                         <input 
                           defaultValue="roas-doctor.myshopify.com"
                           className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm text-zinc-900 focus:outline-none focus:ring-1 focus:ring-blue-500"
                         />
                      </div>
                      <div className="space-y-2">
                         <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest leading-none">Primary Currency</label>
                         <input 
                           defaultValue="USD ($)"
                           className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm text-zinc-900 focus:outline-none focus:ring-1 focus:ring-blue-500"
                         />
                      </div>
                   </div>
                </div>

                <div className="pt-8 border-t border-zinc-100">
                   <h3 className="text-lg font-bold text-zinc-900 mb-4 flex items-center gap-2">
                      <Database className="w-5 h-5 text-amber-500" />
                      {t('integration_credentials')}
                   </h3>
                   <p className="text-xs text-zinc-500 mb-6 bg-amber-50 p-4 rounded-xl border border-amber-100 flex items-start gap-3 italic">
                      <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                      Güvenlik nedeniyle <b>Client ID</b> ve <b>Secret</b> gibi hassas anahtarlar doğrudan <code className="bg-amber-100 px-1 rounded">.env</code> dosyası veya Railway Dashboard üzerinden girilmelidir. Buradan değiştirilemezler.
                   </p>
                   
                   <div className="space-y-4">
                      {[
                        { label: 'Meta App ID', env: 'META_CLIENT_ID' },
                        { label: 'Google Dev Token', env: 'GOOGLE_DEVELOPER_TOKEN' },
                        { label: 'Shopify App Client ID', env: 'SHOPIFY_CLIENT_ID' }
                      ].map((cred, i) => {
                         const isSet = cred.env === 'SHOPIFY_CLIENT_ID' || false; // Mock for UI
                         return (
                          <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-zinc-50 border border-zinc-200">
                             <div className="text-sm font-bold text-zinc-900">{cred.label}</div>
                             <div className="flex items-center gap-4">
                                <span className={`px-2 py-1 rounded text-[10px] font-black uppercase tracking-wider ${isSet ? 'bg-emerald-50 text-emerald-500' : 'bg-red-50 text-red-500'}`}>
                                   {isSet ? 'BAĞLI' : 'EKSİK'}
                                </span>
                             </div>
                          </div>
                         );
                      })}
                   </div>
                </div>

                <div className="pt-8 flex justify-end gap-3">
                   <button className="px-6 py-3 bg-zinc-100 hover:bg-zinc-200 text-zinc-600 text-xs font-black uppercase tracking-widest rounded-xl transition-all">
                      Cancel
                   </button>
                   <button 
                    onClick={handleSave}
                    className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white text-xs font-black uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-blue-500/25 flex items-center gap-2">
                      {success ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                      {success ? 'Saved!' : 'Save Settings'}
                   </button>
                </div>
             </div>
          </div>
        </div>
      </div>
    </Shell>
  );
}
