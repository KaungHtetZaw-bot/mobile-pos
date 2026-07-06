import { createContext, useContext, useState } from 'react';
import type{ ReactNode } from 'react';
import { en } from './locales/en';
import type{ Translations } from './locales/en';
import { my } from './locales/my';

type Language = 'en' | 'my';

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (path: string, replacements?: Record<string, string>) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const translations: Record<Language, Translations> = { en, my };

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('mobilepulse_lang');
    return (saved === 'my' || saved === 'en') ? saved : 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('mobilepulse_lang', lang);
  };

  const t = (path: string, replacements?: Record<string, string>): string => {
    const keys = path.split('.');
    let current: any = translations[language];
    
    for (const key of keys) {
      if (current && current[key] !== undefined) {
        current = current[key];
      } else {
        // Fallback to English if key doesn't exist in active language
        let fallback: any = translations['en'];
        for (const fKey of keys) {
          if (fallback && fallback[fKey] !== undefined) {
            fallback = fallback[fKey];
          } else {
            fallback = null;
            break;
          }
        }
        if (typeof fallback === 'string') {
          current = fallback;
          break;
        }
        return path;
      }
    }

    if (typeof current === 'string') {
      let result = current;
      if (replacements) {
        Object.entries(replacements).forEach(([key, val]) => {
          result = result.replace(`{${key}}`, val);
        });
      }
      return result;
    }

    return path;
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}
