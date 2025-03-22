
import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

const HeroSection: React.FC = () => {
  const { t } = useLanguage();
  const heroRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // Parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrollValue = window.scrollY;
        const opacity = Math.max(1 - scrollValue / 700, 0);
        const translateY = scrollValue * 0.3;
        
        heroRef.current.style.opacity = opacity.toString();
        heroRef.current.style.transform = `translateY(${translateY}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mouse move effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const { clientX, clientY } = e;
        const { left, top, width, height } = heroRef.current.getBoundingClientRect();
        
        const x = (clientX - left) / width;
        const y = (clientY - top) / height;
        
        setMousePosition({ x, y });
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  // Animation variants for framer-motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Layer */}
      <div className="absolute inset-0 bg-gradient-to-br from-latum-blue via-latum-blue to-latum-blue/80"></div>
      
      {/* Animated Background Elements */}
      <div 
        className="absolute inset-0 dot-pattern opacity-10"
        style={{
          transform: `translate(${(mousePosition.x - 0.5) * -10}px, ${(mousePosition.y - 0.5) * -10}px)`
        }}
      ></div>
      
      {/* Gradient Orbs */}
      <div 
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-latum-accent/20 filter blur-3xl"
        style={{ 
          transform: `translate(${(mousePosition.x - 0.5) * -30}px, ${(mousePosition.y - 0.5) * -30}px)`,
          opacity: 0.4
        }}
      ></div>
      <div 
        className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-white/10 filter blur-3xl"
        style={{ 
          transform: `translate(${(mousePosition.x - 0.5) * 20}px, ${(mousePosition.y - 0.5) * 20}px)`,
          opacity: 0.3
        }}
      ></div>
      
      {/* Hero Content */}
      <motion.div 
        ref={heroRef}
        className="container-custom relative z-10 text-white space-y-6 mt-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div 
            variants={itemVariants}
            className="inline-block px-4 py-1 mb-4 bg-white/10 backdrop-blur-sm rounded-full"
          >
            <span className="text-sm font-accent font-medium">Est. 2023</span>
          </motion.div>
          
          <motion.h1 
            variants={itemVariants}
            className="text-5xl md:text-7xl font-display font-bold mb-6 leading-tight"
          >
            {t('home.hero.title')}
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-xl md:text-2xl font-light max-w-3xl mx-auto"
          >
            {t('home.hero.subtitle')}
          </motion.p>
          
          <motion.div 
            variants={itemVariants}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a 
              href="#mission" 
              className="relative overflow-hidden group inline-block"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <span className="btn-primary inline-block relative z-10">
                {t('home.hero.cta')}
              </span>
              <span className="absolute inset-0 bg-latum-accent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
            </a>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Spotlight Effect */}
      {isHovering && (
        <div 
          className="spotlight" 
          style={{
            left: `${mousePosition.x * 100}%`,
            top: `${mousePosition.y * 100}%`,
          }}
        ></div>
      )}
      
      {/* Scroll Down Indicator - Centered properly */}
      <motion.div 
        className="absolute left-0 right-0 bottom-10 mx-auto flex justify-center items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <button 
          onClick={scrollToContent}
          className="flex flex-col items-center text-white"
          aria-label="Scroll down"
        >
          <span className="text-sm font-medium mb-2 opacity-80">Discover More</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="flex justify-center"
          >
            <ChevronDown size={28} />
          </motion.div>
        </button>
      </motion.div>
    </section>
  );
};

export default HeroSection;
