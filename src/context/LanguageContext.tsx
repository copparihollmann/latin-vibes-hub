
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

type LanguageContextType = {
  language: 'en' | 'es';
  setLanguage: (lang: 'en' | 'es') => void;
  t: (key: string) => string;
  isTranslatablePage: boolean;
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
    'nav.alumni': 'Alumni',
    
    // Home Page
    'home.hero.title': 'Latin Americans at TUM',
    'home.hero.subtitle': 'Bridging cultural gaps and fostering an inclusive environment at TUM',
    'home.hero.cta': 'Learn More',
    'home.mission.title': 'Our Mission',
    'home.mission.text': 'We aim to create a vibrant community for Latin American students and those interested in Latin American culture at the Technical University of Munich.',
    
    // About 
    'about.title': 'About LATUM',
    'about.description': 'A non-profit student initiative for Latin American students and people interested in Latin American culture',
    'about.founders.title': 'The Vision Behind LATUM',
    'about.founders.description': 'Our four co-founders established LATUM in 2023 with the goal of creating a supportive community for Latin American students and promoting cultural exchange at TUM.',
    
    // FAQ
    'faq.title': 'Frequently Asked Questions',
    'faq.description': 'Find answers to common questions about LATUM e.V.',
    'faq.more_questions': 'Still have questions?',
    'faq.contact_us': 'Contact Us',
    
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
    'nav.alumni': 'Exalumnos',
    
    // Home Page
    'home.hero.title': 'Latinoamericanos en TUM',
    'home.hero.subtitle': 'Conectando culturas y fomentando un ambiente inclusivo en TUM',
    'home.hero.cta': 'Conocer Más',
    'home.mission.title': 'Nuestra Misión',
    'home.mission.text': 'Buscamos crear una comunidad vibrante para estudiantes latinoamericanos y aquellos interesados en la cultura latinoamericana en la Universidad Técnica de Múnich.',
    
    // About
    'about.title': 'Sobre LATUM',
    'about.description': 'Una iniciativa estudiantil sin fines de lucro para estudiantes latinoamericanos y personas interesadas en la cultura latinoamericana',
    'about.founders.title': 'La Visión Detrás de LATUM',
    'about.founders.description': 'Nuestros cuatro co-fundadores establecieron LATUM en 2023 con el objetivo de crear una comunidad de apoyo para estudiantes latinoamericanos y promover el intercambio cultural en TUM.',
    
    // FAQ
    'faq.title': 'Preguntas Frecuentes',
    'faq.description': 'Encuentra respuestas a preguntas comunes sobre LATUM e.V.',
    'faq.more_questions': '¿Todavía tienes preguntas?',
    'faq.contact_us': 'Contáctanos',
    
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

// List of pages that should be translatable
const translatablePages = ['/', '/about', '/faq'];

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'en' | 'es'>('en');
  const location = useLocation();
  
  // Check if current page should be translatable
  const isTranslatablePage = translatablePages.includes(location.pathname);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
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
