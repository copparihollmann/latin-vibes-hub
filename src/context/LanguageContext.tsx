
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import en from '../locales/en';
import es from '../locales/es';

type LanguageContextType = {
  language: 'en' | 'es';
  setLanguage: (lang: 'en' | 'es') => void;
  t: (key: string) => string;
  isTranslatablePage: boolean;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// List of pages that should be translatable
const translatablePages = ['/', '/about', '/faq', '/contact', '/events', '/blog'];

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'en' | 'es'>('en');
  const location = useLocation();
  
  // Check if current page should be translatable
  const isTranslatablePage = translatablePages.includes(location.pathname);

  // Function to get nested values from translation objects using dot notation
  const t = (key: string): string => {
    try {
      // Split the key by dots to access nested properties
      const keys = key.split('.');
      // Start with the full translations object
      let result: any = language === 'en' ? en : es;
      
      // Navigate through the nested structure
      for (const k of keys) {
        if (result && result[k] !== undefined) {
          result = result[k];
        } else {
          console.warn(`Translation key not found: ${key}`);
          return key; // Return the key if translation not found
        }
      }
      
      // Return the found value if it's a string
      if (typeof result === 'string') {
        return result;
      } else {
        console.warn(`Translation for key ${key} is not a string:`, result);
        return key;
      }
    } catch (error) {
      console.error(`Error retrieving translation for key: ${key}`, error);
      return key;
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isTranslatablePage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
