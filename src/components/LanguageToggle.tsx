
import React, { memo } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Globe } from 'lucide-react';
import { motion } from 'framer-motion';

const LanguageToggle: React.FC = () => {
  const { language, setLanguage, isTranslatablePage } = useLanguage();

  if (!isTranslatablePage) {
    return null;
  }

  return (
    <motion.button 
      onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
      className="flex items-center space-x-1 text-sm font-medium transition-colors duration-200 hover:text-latum-blue"
      aria-label={language === 'en' ? 'Switch to Spanish' : 'Switch to English'}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <Globe size={16} />
      <motion.span
        key={language}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -5 }}
        transition={{ duration: 0.2 }}
      >
        {language === 'en' ? 'EN' : 'ES'}
      </motion.span>
    </motion.button>
  );
};

export default memo(LanguageToggle);
