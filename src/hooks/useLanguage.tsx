import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { Language, getCurrentLanguage, setLanguage, t } from '@/lib/i18n';

interface LanguageContextType {
  language: Language;
  changeLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    const savedLang = getCurrentLanguage();
    setLanguageState(savedLang);
    
    // Update document lang attribute
    document.documentElement.lang = savedLang;
  }, []);

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    setLanguageState(lang);
    document.documentElement.lang = lang;
  };

  const translate = (key: string) => t(key, language);

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t: translate }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}