
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import NavigationItem from './NavigationItem';
import LanguageToggle from '../LanguageToggle';

interface NavigationProps {
  navigation: { name: string; href: string }[];
}

const DesktopNavigation: React.FC<NavigationProps> = ({ navigation }) => {
  const { t } = useLanguage();
  const location = useLocation();

  return (
    <motion.nav 
      className="hidden md:flex items-center space-x-8"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.5 }}
    >
      {navigation.map((item, i) => (
        <NavigationItem
          key={item.name}
          name={item.name}
          href={item.href}
          isActive={location.pathname === item.href}
          delay={i}
        />
      ))}
      <LanguageToggle />
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <Link
          to="/contact"
          className="relative overflow-hidden group"
        >
          <span className="btn-primary inline-block relative z-10">
            {t('nav.contact')}
          </span>
          <span className="absolute inset-0 bg-latum-accent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
        </Link>
      </motion.div>
    </motion.nav>
  );
};

export default DesktopNavigation;
