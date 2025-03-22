
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

  // Latin American-inspired vector shapes
  const renderLatinShapes = () => {
    return (
      <>
        {/* Geometric patterns inspired by Latin American textiles */}
        <svg 
          className="absolute w-64 h-64 top-20 left-10 opacity-30 pointer-events-none"
          style={{ 
            transform: `translate(${(mousePosition.x - 0.5) * -35}px, ${(mousePosition.y - 0.5) * -35}px) rotate(${mousePosition.x * 10}deg)`,
            transition: 'transform 0.3s ease-out'
          }}
          viewBox="0 0 100 100"
        >
          <path d="M10,10 L90,10 L90,90 L10,90 Z" fill="none" stroke="#FF9E00" strokeWidth="2" />
          <path d="M30,30 L70,30 L70,70 L30,70 Z" fill="none" stroke="#FF9E00" strokeWidth="2" />
          <path d="M10,10 L30,30 M90,10 L70,30 M90,90 L70,70 M10,90 L30,70" stroke="#FF9E00" strokeWidth="2" />
        </svg>
        
        {/* Aztec-inspired sun */}
        <svg 
          className="absolute w-80 h-80 bottom-20 right-10 opacity-25 pointer-events-none"
          style={{ 
            transform: `translate(${(mousePosition.x - 0.5) * 20}px, ${(mousePosition.y - 0.5) * 20}px) rotate(${mousePosition.y * 15}deg)`,
            transition: 'transform 0.3s ease-out' 
          }}
          viewBox="0 0 200 200"
        >
          <circle cx="100" cy="100" r="50" fill="none" stroke="#FF6347" strokeWidth="2" />
          <circle cx="100" cy="100" r="40" fill="none" stroke="#FF6347" strokeWidth="2" />
          {Array.from({ length: 12 }).map((_, i) => (
            <line 
              key={i}
              x1="100" 
              y1="50" 
              x2="100" 
              y2="30" 
              stroke="#FF6347" 
              strokeWidth="2"
              transform={`rotate(${i * 30} 100 100)`}
            />
          ))}
          {Array.from({ length: 8 }).map((_, i) => (
            <line 
              key={i}
              x1="100" 
              y1="140" 
              x2="100" 
              y2="160" 
              stroke="#FF6347" 
              strokeWidth="2"
              transform={`rotate(${i * 45} 100 100)`}
            />
          ))}
        </svg>
        
        {/* Colorful triangles inspired by traditional patterns */}
        <div 
          className="absolute w-56 h-56 top-1/2 left-1/4 pointer-events-none"
          style={{ 
            transform: `translate(${(mousePosition.x - 0.5) * -25}px, ${(mousePosition.y - 0.5) * -25}px)`,
            transition: 'transform 0.3s ease-out' 
          }}
        >
          <svg viewBox="0 0 100 100">
            <polygon points="50,10 10,90 90,90" fill="none" stroke="#5CE1E6" strokeWidth="2" />
            <polygon points="50,20 20,80 80,80" fill="none" stroke="#8B5CF6" strokeWidth="2" />
            <polygon points="50,30 30,70 70,70" fill="none" stroke="#D946EF" strokeWidth="2" />
          </svg>
        </div>
        
        {/* Vibrant waves pattern */}
        <svg 
          className="absolute w-full h-64 bottom-0 left-0 opacity-20 pointer-events-none"
          style={{ 
            transform: `translateY(${(mousePosition.y - 0.5) * 15}px)`,
            transition: 'transform 0.3s ease-out' 
          }}
          preserveAspectRatio="none"
          viewBox="0 0 1440 320"
        >
          <path 
            d="M0,192L48,186.7C96,181,192,171,288,181.3C384,192,480,224,576,234.7C672,245,768,235,864,202.7C960,171,1056,117,1152,112C1248,107,1344,149,1392,170.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" 
            fill="#0078B3" 
            fillOpacity="0.2"
          />
          <path 
            d="M0,224L48,229.3C96,235,192,245,288,245.3C384,245,480,235,576,224C672,213,768,203,864,208C960,213,1056,235,1152,234.7C1248,235,1344,213,1392,202.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" 
            fill="#F97316" 
            fillOpacity="0.15"
          />
        </svg>
        
        {/* Zigzag patterns inspired by woven textiles */}
        <svg 
          className="absolute w-64 h-64 top-20 right-20 opacity-20 pointer-events-none"
          style={{ 
            transform: `translate(${(mousePosition.x - 0.5) * 30}px, ${(mousePosition.y - 0.5) * 30}px)`,
            transition: 'transform 0.3s ease-out' 
          }}
          viewBox="0 0 100 100"
        >
          <polyline points="10,30 20,10 30,30 40,10 50,30 60,10 70,30 80,10 90,30" fill="none" stroke="#F97316" strokeWidth="2" />
          <polyline points="10,50 20,30 30,50 40,30 50,50 60,30 70,50 80,30 90,50" fill="none" stroke="#F97316" strokeWidth="2" />
          <polyline points="10,70 20,50 30,70 40,50 50,70 60,50 70,70 80,50 90,70" fill="none" stroke="#F97316" strokeWidth="2" />
          <polyline points="10,90 20,70 30,90 40,70 50,90 60,70 70,90 80,70 90,90" fill="none" stroke="#F97316" strokeWidth="2" />
        </svg>
      </>
    );
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
      
      {/* Latin American-inspired vector shapes */}
      {renderLatinShapes()}
      
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
