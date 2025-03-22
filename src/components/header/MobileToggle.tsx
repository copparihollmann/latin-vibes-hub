
import React from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import LanguageToggle from '../LanguageToggle';

interface MobileToggleProps {
  isOpen: boolean;
  onToggle: () => void;
}

const MobileToggle: React.FC<MobileToggleProps> = ({ isOpen, onToggle }) => {
  return (
    <motion.div 
      className="flex items-center md:hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      <LanguageToggle />
      <button
        onClick={onToggle}
        className="ml-4 text-gray-800 hover:text-latum-blue transition-colors p-2 rounded-full hover:bg-gray-100"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    </motion.div>
  );
};

export default MobileToggle;
