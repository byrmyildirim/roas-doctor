'use client';
import React from 'react';
import { useLanguage } from './LanguageProvider';

export function LanguageSelector() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 rounded-lg p-1">
      <button
        onClick={() => setLang('en')}
        className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
          lang === 'en' ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-zinc-300'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLang('tr')}
        className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
          lang === 'tr' ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-zinc-300'
        }`}
      >
        TR
      </button>
    </div>
  );
}
