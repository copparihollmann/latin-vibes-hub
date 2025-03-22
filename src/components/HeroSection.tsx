
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

  // Render multiple blue-toned geometric shapes
  const renderGeometricShapes = () => {
    return (
      <>
        {/* Circular patterns */}
        <svg 
          className="absolute w-64 h-64 top-0 left-0 opacity-20 pointer-events-none"
          style={{ 
            transform: `translate(${(mousePosition.x - 0.5) * -15}px, ${(mousePosition.y - 0.5) * -15}px) rotate(${mousePosition.x * 5}deg)`,
            transition: 'transform 0.3s ease-out'
          }}
          viewBox="0 0 100 100"
        >
          <circle cx="50" cy="50" r="45" fill="none" stroke="#D3E4FD" strokeWidth="2" />
          <circle cx="50" cy="50" r="35" fill="none" stroke="#A5C5F2" strokeWidth="1.5" />
          <circle cx="50" cy="50" r="25" fill="none" stroke="#7BA8E8" strokeWidth="1" />
        </svg>
        
        {/* Blue square patterns top right */}
        <svg 
          className="absolute w-48 h-48 top-10 right-20 opacity-15 pointer-events-none"
          style={{ 
            transform: `translate(${(mousePosition.x - 0.5) * 20}px, ${(mousePosition.y - 0.5) * 20}px) rotate(${mousePosition.y * 10}deg)`,
            transition: 'transform 0.4s ease-out' 
          }}
          viewBox="0 0 100 100"
        >
          <rect x="20" y="20" width="60" height="60" fill="none" stroke="#0078B3" strokeWidth="1" />
          <rect x="30" y="30" width="40" height="40" fill="none" stroke="#0078B3" strokeWidth="1" />
          <rect x="40" y="40" width="20" height="20" fill="none" stroke="#0078B3" strokeWidth="1" />
        </svg>
        
        {/* Triangular patterns left side */}
        <svg 
          className="absolute w-56 h-56 top-80 left-10 opacity-20 pointer-events-none"
          style={{ 
            transform: `translate(${(mousePosition.x - 0.5) * -25}px, ${(mousePosition.y - 0.5) * -25}px)`,
            transition: 'transform 0.3s ease-out' 
          }}
          viewBox="0 0 100 100"
        >
          <polygon points="50,10 10,90 90,90" fill="none" stroke="#5CA2E0" strokeWidth="1.5" />
          <polygon points="50,20 20,80 80,80" fill="none" stroke="#8BB8EA" strokeWidth="1.5" />
          <polygon points="50,30 30,70 70,70" fill="none" stroke="#B4D0F5" strokeWidth="1.5" />
        </svg>
        
        {/* Hexagonal pattern bottom center */}
        <svg 
          className="absolute w-64 h-64 bottom-20 left-1/3 opacity-20 pointer-events-none"
          style={{ 
            transform: `translate(${(mousePosition.x - 0.5) * 20}px, ${(mousePosition.y - 0.5) * 20}px) rotate(${mousePosition.x * 8}deg)`,
            transition: 'transform 0.3s ease-out' 
          }}
          viewBox="0 0 100 100"
        >
          <polygon points="50,10 90,30 90,70 50,90 10,70 10,30" fill="none" stroke="#6D9FE0" strokeWidth="1.5" />
          <polygon points="50,20 80,35 80,65 50,80 20,65 20,35" fill="none" stroke="#8BB8EA" strokeWidth="1.5" />
          <polygon points="50,30 70,40 70,60 50,70 30,60 30,40" fill="none" stroke="#A5C5F2" strokeWidth="1.5" />
        </svg>
        
        {/* Dotted grid pattern top center */}
        <svg 
          className="absolute w-72 h-72 top-10 left-1/3 opacity-15 pointer-events-none"
          style={{ 
            transform: `translate(${(mousePosition.x - 0.5) * 15}px, ${(mousePosition.y - 0.5) * 15}px)`,
            transition: 'transform 0.3s ease-out' 
          }}
          viewBox="0 0 100 100"
        >
          {Array.from({ length: 10 }).map((_, rowIndex) => (
            Array.from({ length: 10 }).map((_, colIndex) => (
              <circle 
                key={`${rowIndex}-${colIndex}`}
                cx={10 + rowIndex * 10} 
                cy={10 + colIndex * 10} 
                r="1" 
                fill="#D3E4FD" 
              />
            ))
          ))}
        </svg>
        
        {/* Wave pattern bottom */}
        <svg 
          className="absolute w-full h-48 bottom-0 left-0 opacity-20 pointer-events-none"
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
            fillOpacity="0.1"
          />
          <path 
            d="M0,224L48,229.3C96,235,192,245,288,245.3C384,245,480,235,576,224C672,213,768,203,864,208C960,213,1056,235,1152,234.7C1248,235,1344,213,1392,202.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" 
            fill="#5CA2E0" 
            fillOpacity="0.1"
          />
        </svg>
        
        {/* Floating circles top right */}
        <div className="absolute top-20 right-1/4 opacity-20 pointer-events-none">
          {Array.from({ length: 8 }).map((_, i) => (
            <div 
              key={`circle-${i}`}
              className="absolute rounded-full border border-blue-300"
              style={{
                width: `${20 + i * 5}px`,
                height: `${20 + i * 5}px`,
                left: `${i * 10}px`,
                top: `${i * 10}px`,
                transform: `translate(${(mousePosition.x - 0.5) * (10 + i * 2)}px, ${(mousePosition.y - 0.5) * (10 + i * 2)}px)`,
                transition: 'transform 0.3s ease-out'
              }}
            />
          ))}
        </div>
        
        {/* Diagonal lines pattern right side */}
        <svg 
          className="absolute w-64 h-96 bottom-40 right-10 opacity-15 pointer-events-none"
          style={{ 
            transform: `translate(${(mousePosition.x - 0.5) * 25}px, ${(mousePosition.y - 0.5) * 25}px)`,
            transition: 'transform 0.3s ease-out' 
          }}
          viewBox="0 0 100 150"
        >
          {Array.from({ length: 10 }).map((_, i) => (
            <line 
              key={`line-${i}`}
              x1="0" 
              y1={15 * i} 
              x2="100" 
              y2={15 * i + 50} 
              stroke="#8BB8EA" 
              strokeWidth="1" 
              opacity="0.5"
            />
          ))}
        </svg>
        
        {/* Cross patterns bottom left */}
        <svg 
          className="absolute w-56 h-56 bottom-20 left-10 opacity-20 pointer-events-none"
          style={{ 
            transform: `translate(${(mousePosition.x - 0.5) * -20}px, ${(mousePosition.y - 0.5) * -20}px) rotate(${mousePosition.y * 10}deg)`,
            transition: 'transform 0.3s ease-out' 
          }}
          viewBox="0 0 100 100"
        >
          {Array.from({ length: 10 }).map((_, i) => (
            <g key={`cross-${i}`}>
              <line 
                x1={10 * i} 
                y1="0" 
                x2={10 * i} 
                y2="100" 
                stroke="#A5C5F2" 
                strokeWidth="0.5" 
              />
              <line 
                x1="0" 
                y1={10 * i} 
                x2="100" 
                y2={10 * i} 
                stroke="#A5C5F2" 
                strokeWidth="0.5" 
              />
            </g>
          ))}
        </svg>
        
        {/* Concentric rhombus middle right */}
        <svg 
          className="absolute w-80 h-80 top-1/3 right-5 opacity-15 pointer-events-none"
          style={{ 
            transform: `translate(${(mousePosition.x - 0.5) * 30}px, ${(mousePosition.y - 0.5) * 30}px) rotate(${mousePosition.x * 15}deg)`,
            transition: 'transform 0.4s ease-out' 
          }}
          viewBox="0 0 100 100"
        >
          <polygon points="50,10 90,50 50,90 10,50" fill="none" stroke="#0078B3" strokeWidth="1" />
          <polygon points="50,20 80,50 50,80 20,50" fill="none" stroke="#5CA2E0" strokeWidth="1" />
          <polygon points="50,30 70,50 50,70 30,50" fill="none" stroke="#A5C5F2" strokeWidth="1" />
        </svg>
        
        {/* Small dots scatter pattern */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 30 }).map((_, i) => (
            <div 
              key={`dot-${i}`}
              className="absolute rounded-full bg-blue-200"
              style={{
                width: `${2 + Math.random() * 3}px`,
                height: `${2 + Math.random() * 3}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: 0.2 + Math.random() * 0.3,
                transform: `translate(${(mousePosition.x - 0.5) * (15 + i % 10)}px, ${(mousePosition.y - 0.5) * (15 + i % 10)}px)`,
                transition: `transform ${0.3 + Math.random() * 0.3}s ease-out`
              }}
            />
          ))}
        </div>
        
        {/* Zigzag pattern left middle */}
        <svg 
          className="absolute w-64 h-64 top-1/3 left-20 opacity-20 pointer-events-none"
          style={{ 
            transform: `translate(${(mousePosition.x - 0.5) * -25}px, ${(mousePosition.y - 0.5) * -25}px) rotate(${mousePosition.y * 5}deg)`,
            transition: 'transform 0.3s ease-out' 
          }}
          viewBox="0 0 100 100"
        >
          <polyline 
            points="10,30 20,10 30,30 40,10 50,30 60,10 70,30 80,10 90,30" 
            fill="none" 
            stroke="#6D9FE0" 
            strokeWidth="1" 
          />
          <polyline 
            points="10,50 20,30 30,50 40,30 50,50 60,30 70,50 80,30 90,50" 
            fill="none" 
            stroke="#6D9FE0" 
            strokeWidth="1" 
          />
          <polyline 
            points="10,70 20,50 30,70 40,50 50,70 60,50 70,70 80,50 90,70" 
            fill="none" 
            stroke="#6D9FE0" 
            strokeWidth="1" 
          />
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
      
      {/* Add more gradient orbs */}
      <div 
        className="absolute top-1/3 right-1/3 w-80 h-80 rounded-full bg-blue-300/10 filter blur-3xl"
        style={{ 
          transform: `translate(${(mousePosition.x - 0.5) * 25}px, ${(mousePosition.y - 0.5) * 25}px)`,
          opacity: 0.25
        }}
      ></div>
      <div 
        className="absolute bottom-1/3 left-1/3 w-72 h-72 rounded-full bg-blue-100/15 filter blur-3xl"
        style={{ 
          transform: `translate(${(mousePosition.x - 0.5) * -25}px, ${(mousePosition.y - 0.5) * -25}px)`,
          opacity: 0.2
        }}
      ></div>
      
      {/* Geometric shapes */}
      {renderGeometricShapes()}
      
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
