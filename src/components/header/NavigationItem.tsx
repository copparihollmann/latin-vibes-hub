
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface NavigationItemProps {
  name: string;
  href: string;
  isActive: boolean;
  delay?: number;
}

const NavigationItem: React.FC<NavigationItemProps> = ({ 
  name, 
  href, 
  isActive,
  delay = 0 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + (delay * 0.05), duration: 0.5 }}
    >
      <Link
        to={href}
        className={`nav-link ${isActive ? 'active' : ''}`}
      >
        {name}
      </Link>
    </motion.div>
  );
};

export default NavigationItem;
