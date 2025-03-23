
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface LogoLinkProps {
  variant?: 'blue' | 'white';
}

const LogoLink: React.FC<LogoLinkProps> = ({ variant = 'white' }) => {
  const logoSrc = variant === 'white' 
    ? '/lovable-uploads/4e71b068-b82d-4ed1-9db6-55ed87c301e0.png' // Blue logo for white backgrounds
    : '/lovable-uploads/39741899-8c2b-417e-8421-5aa51256d8e3.png'; // White elements logo for blue backgrounds
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Link to="/" className="flex items-center">
        <img 
          src={logoSrc} 
          alt="LATUM Logo" 
          className="h-12 w-auto transition-all duration-300 hover:scale-105"
        />
      </Link>
    </motion.div>
  );
};

export default LogoLink;
