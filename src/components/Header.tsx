
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import LanguageToggle from './LanguageToggle';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header: React.FC = () => {
  const { t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: t('nav.about'), href: '/about' },
    { name: t('nav.team'), href: '/team' },
    { name: t('nav.events'), href: '/events' },
    { name: t('nav.faq'), href: '/faq' },
    { name: t('nav.blog'), href: '/blog' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Animations
  const mobileMenuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.07,
        delayChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.2
      }
    }
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container-custom flex items-center justify-between">
        {/* Logo with animation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/230788b3-b7d2-4f9f-9dca-604ecf712a4e.png" 
              alt="LATUM Logo" 
              className="h-12 w-auto transition-all duration-300 hover:scale-105"
            />
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <motion.nav 
          className="hidden md:flex items-center space-x-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          {navigation.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + (i * 0.05), duration: 0.5 }}
            >
              <Link
                to={item.href}
                className={`nav-link ${location.pathname === item.href ? 'active' : ''}`}
              >
                {item.name}
              </Link>
            </motion.div>
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

        {/* Mobile Menu Toggle */}
        <motion.div 
          className="flex items-center md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <LanguageToggle />
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="ml-4 text-gray-800 hover:text-latum-blue transition-colors p-2 rounded-full hover:bg-gray-100"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </motion.div>
      </div>

      {/* Mobile Navigation Menu with enhanced animation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="fixed inset-0 bg-white z-40 pt-24 pb-6 px-6 flex flex-col md:hidden"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <nav className="flex flex-col space-y-6">
              {navigation.map((item, i) => (
                <motion.div
                  key={item.name}
                  variants={navItemVariants}
                  custom={i}
                >
                  <Link
                    to={item.href}
                    className={`text-xl font-medium relative group ${
                      location.pathname === item.href ? 'text-latum-blue' : 'text-gray-800'
                    }`}
                  >
                    <span>{item.name}</span>
                    <span className={`absolute left-0 bottom-0 h-0.5 bg-latum-blue transform origin-left ${
                      location.pathname === item.href ? 'w-full' : 'w-0 group-hover:w-full'
                    } transition-all duration-300`}></span>
                  </Link>
                </motion.div>
              ))}
              <motion.div variants={navItemVariants}>
                <Link
                  to="/contact"
                  className="btn-primary w-full text-center mt-4 inline-block relative overflow-hidden group"
                >
                  <span className="relative z-10">{t('nav.contact')}</span>
                  <span className="absolute inset-0 bg-latum-accent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
                </Link>
              </motion.div>
            </nav>
            <motion.div 
              className="mt-auto pt-8 border-t border-gray-200"
              variants={navItemVariants}
            >
              <p className="text-sm text-gray-500">© 2024 LATUM e.V.</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
