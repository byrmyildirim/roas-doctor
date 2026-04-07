'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { dictionaries, Language } from '@/lib/i18n';

type LanguageContextType = {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: keyof typeof dictionaries['en']) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>('en');

  useEffect(() => {
    // Tarayıcıdan daha önce seçilmiş dil varsa al
    const storedLang = localStorage.getItem('app_lang') as Language;
    if (storedLang && (storedLang === 'en' || storedLang === 'tr')) {
      setLangState(storedLang);
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('app_lang', newLang);
  };

  const t = (key: keyof typeof dictionaries['en']) => {
    return dictionaries[lang][key] || dictionaries['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
