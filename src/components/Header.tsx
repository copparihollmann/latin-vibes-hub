
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import LanguageToggle from './LanguageToggle';
import { Menu, X } from 'lucide-react';

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

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container-custom flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img 
            src="/lovable-uploads/230788b3-b7d2-4f9f-9dca-604ecf712a4e.png" 
            alt="LATUM Logo" 
            className="h-12 w-auto transition-transform duration-300 hover:scale-105"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`nav-link ${location.pathname === item.href ? 'active' : ''}`}
            >
              {item.name}
            </Link>
          ))}
          <LanguageToggle />
          <Link
            to="/contact"
            className="btn-primary"
          >
            {t('nav.contact')}
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center md:hidden">
          <LanguageToggle />
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="ml-4 text-gray-800 hover:text-latum-blue transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-white z-40 pt-24 pb-6 px-6 flex flex-col md:hidden animate-fade-in">
          <nav className="flex flex-col space-y-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-xl font-medium ${
                  location.pathname === item.href ? 'text-latum-blue' : 'text-gray-800'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/contact"
              className="btn-primary w-full text-center mt-4"
            >
              {t('nav.contact')}
            </Link>
          </nav>
          <div className="mt-auto pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500">© 2024 LATUM e.V.</p>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
