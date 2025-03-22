
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const LogoLink: React.FC = () => {
  return (
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
  );
};

export default LogoLink;
