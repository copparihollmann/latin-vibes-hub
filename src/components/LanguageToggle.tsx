
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Globe } from 'lucide-react';

const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'es' : 'en');
  };

  return (
    <button 
      onClick={toggleLanguage}
      className="flex items-center space-x-1 text-sm font-medium transition-colors duration-200 hover:text-latum-blue"
      aria-label={language === 'en' ? 'Switch to Spanish' : 'Switch to English'}
    >
      <Globe size={16} />
      <span>{language === 'en' ? 'EN' : 'ES'}</span>
    </button>
  );
};

export default LanguageToggle;
