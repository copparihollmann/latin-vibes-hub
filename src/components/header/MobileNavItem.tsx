
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface MobileNavItemProps {
  name: string;
  href: string;
  isActive: boolean;
  onClick: () => void;
}

const MobileNavItem: React.FC<MobileNavItemProps> = ({ 
  name, 
  href, 
  isActive,
  onClick 
}) => {
  return (
    <motion.div variants={{
      hidden: { opacity: 0, y: -10 },
      visible: { opacity: 1, y: 0 }
    }}>
      <Link
        to={href}
        className={`text-xl font-medium relative group ${
          isActive ? 'text-latum-blue' : 'text-gray-800'
        }`}
        onClick={onClick}
      >
        <span>{name}</span>
        <span className={`absolute left-0 bottom-0 h-0.5 bg-latum-blue transform origin-left ${
          isActive ? 'w-full' : 'w-0 group-hover:w-full'
        } transition-all duration-300`}></span>
      </Link>
    </motion.div>
  );
};

export default MobileNavItem;
