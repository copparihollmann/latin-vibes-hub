
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import MobileNavItem from './MobileNavItem';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navigation: { name: string; href: string }[];
  paddingTop: string;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ 
  isOpen, 
  onClose, 
  navigation,
  paddingTop
}) => {
  const { t } = useLanguage();
  const location = useLocation();

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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 top-0 bg-white z-40 pt-24 pb-6 px-6 flex flex-col md:hidden overflow-auto"
          variants={mobileMenuVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          style={{ paddingTop }}
        >
          <div className="sticky top-6 right-6 flex justify-end">
            <button
              onClick={onClose}
              className="text-gray-800 hover:text-latum-blue transition-colors p-2 rounded-full hover:bg-gray-100"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>
          
          <nav className="flex flex-col space-y-6 mt-4">
            {navigation.map((item) => (
              <MobileNavItem
                key={item.name}
                name={item.name}
                href={item.href}
                isActive={location.pathname === item.href}
                onClick={onClose}
              />
            ))}
            <motion.div variants={{
              hidden: { opacity: 0, y: -10 },
              visible: { opacity: 1, y: 0 }
            }}>
              <Link
                to="/contact"
                className="btn-primary w-full text-center mt-4 inline-block relative overflow-hidden group"
                onClick={onClose}
              >
                <span className="relative z-10">{t('nav.contact')}</span>
                <span className="absolute inset-0 bg-latum-accent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
              </Link>
            </motion.div>
          </nav>
          <motion.div 
            className="mt-auto pt-8 border-t border-gray-200"
            variants={{
              hidden: { opacity: 0, y: -10 },
              visible: { opacity: 1, y: 0 }
            }}
          >
            <p className="text-sm text-gray-500">© 2024 LATUM e.V.</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
