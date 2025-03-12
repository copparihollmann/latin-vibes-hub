
import React, { createContext, useState, useContext, ReactNode } from 'react';

type LanguageContextType = {
  language: 'en' | 'es';
  setLanguage: (lang: 'en' | 'es') => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translations dictionary
const translations = {
  en: {
    // Navigation
    'nav.about': 'About',
    'nav.team': 'Team',
    'nav.events': 'Events',
    'nav.faq': 'FAQ',
    'nav.blog': 'Blog',
    'nav.contact': 'Contact',
    
    // Home Page
    'home.hero.title': 'Latin Americans at TUM',
    'home.hero.subtitle': 'Bridging cultural gaps and fostering an inclusive environment at TUM',
    'home.hero.cta': 'Learn More',
    'home.mission.title': 'Our Mission',
    'home.mission.text': 'We aim to create a vibrant community for Latin American students and those interested in Latin American culture at the Technical University of Munich.',
    
    // About 
    'about.title': 'About LATUM',
    'about.description': 'A non-profit student initiative for Latin American students and people interested in Latin American culture',
    
    // Contact
    'contact.title': 'Get in Touch',
    'contact.email': 'Email',
    'contact.social': 'Social',
    'contact.newsletter': 'Stay in Touch',
    'contact.newsletter.placeholder': 'Enter your email address',
    'contact.newsletter.button': 'Submit',
    'contact.collaborations': 'Always open for collaborations!',
    
    // Footer
    'footer.copyright': 'Copyright © 2024 LATUM e.V.',
    'footer.legal': 'Legal Stuff',
  },
  es: {
    // Navigation
    'nav.about': 'Nosotros',
    'nav.team': 'Equipo',
    'nav.events': 'Eventos',
    'nav.faq': 'Preguntas',
    'nav.blog': 'Blog',
    'nav.contact': 'Contacto',
    
    // Home Page
    'home.hero.title': 'Latinoamericanos en TUM',
    'home.hero.subtitle': 'Conectando culturas y fomentando un ambiente inclusivo en TUM',
    'home.hero.cta': 'Conocer Más',
    'home.mission.title': 'Nuestra Misión',
    'home.mission.text': 'Buscamos crear una comunidad vibrante para estudiantes latinoamericanos y aquellos interesados en la cultura latinoamericana en la Universidad Técnica de Múnich.',
    
    // About
    'about.title': 'Sobre LATUM',
    'about.description': 'Una iniciativa estudiantil sin fines de lucro para estudiantes latinoamericanos y personas interesadas en la cultura latinoamericana',
    
    // Contact
    'contact.title': 'Contáctanos',
    'contact.email': 'Correo',
    'contact.social': 'Redes Sociales',
    'contact.newsletter': 'Mantente Conectado',
    'contact.newsletter.placeholder': 'Ingresa tu correo electrónico',
    'contact.newsletter.button': 'Enviar',
    'contact.collaborations': '¡Siempre abiertos a colaboraciones!',
    
    // Footer
    'footer.copyright': 'Copyright © 2024 LATUM e.V.',
    'footer.legal': 'Información Legal',
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'en' | 'es'>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
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
