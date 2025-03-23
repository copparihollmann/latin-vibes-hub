import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

// Shape configuration for geometric elements
const shapes = [
  // Circles in different blue tones
  { type: 'circle', size: 180, x: '15%', y: '20%', color: 'rgba(0, 100, 179, 0.2)', delay: 0.1, speed: 0.05, parallaxIntensity: -0.1 },
  { type: 'circle', size: 120, x: '85%', y: '25%', color: 'rgba(0, 120, 179, 0.15)', delay: 0.2, speed: 0.04, parallaxIntensity: 0.12 },
  { type: 'circle', size: 90, x: '75%', y: '65%', color: 'rgba(0, 90, 179, 0.1)', delay: 0.3, speed: 0.06, parallaxIntensity: -0.08 },
  { type: 'circle', size: 60, x: '25%', y: '75%', color: 'rgba(0, 140, 200, 0.2)', delay: 0.4, speed: 0.03, parallaxIntensity: 0.15 },
  { type: 'circle', size: 200, x: '90%', y: '90%', color: 'rgba(0, 110, 179, 0.1)', delay: 0.5, speed: 0.02, parallaxIntensity: -0.05 },
  { type: 'circle', size: 150, x: '5%', y: '40%', color: 'rgba(100, 180, 255, 0.1)', delay: 0.6, speed: 0.05, parallaxIntensity: 0.07 },
  
  // Lighter blue circles
  { type: 'circle', size: 100, x: '40%', y: '85%', color: 'rgba(150, 200, 255, 0.1)', delay: 0.7, speed: 0.04, parallaxIntensity: -0.11 },
  { type: 'circle', size: 70, x: '60%', y: '15%', color: 'rgba(200, 230, 255, 0.15)', delay: 0.8, speed: 0.03, parallaxIntensity: 0.09 },
  
  // Squares and rectangles
  { type: 'square', size: 80, x: '30%', y: '30%', color: 'rgba(0, 120, 200, 0.1)', delay: 0.9, speed: 0.04, rotation: 45, parallaxIntensity: -0.13 },
  { type: 'square', size: 120, x: '70%', y: '80%', color: 'rgba(0, 100, 160, 0.08)', delay: 1.0, speed: 0.05, rotation: 30, parallaxIntensity: 0.06 },
  { type: 'rectangle', width: 150, height: 100, x: '80%', y: '40%', color: 'rgba(0, 80, 150, 0.05)', delay: 1.1, speed: 0.03, rotation: 15, parallaxIntensity: -0.07 },
  { type: 'rectangle', width: 120, height: 60, x: '20%', y: '60%', color: 'rgba(50, 150, 220, 0.07)', delay: 1.2, speed: 0.04, rotation: 60, parallaxIntensity: 0.14 },
  
  // Triangles
  { type: 'triangle', size: 100, x: '55%', y: '35%', color: 'rgba(0, 100, 190, 0.08)', delay: 1.3, speed: 0.05, rotation: 0, parallaxIntensity: -0.12 },
  { type: 'triangle', size: 80, x: '15%', y: '85%', color: 'rgba(70, 160, 230, 0.06)', delay: 1.4, speed: 0.04, rotation: 180, parallaxIntensity: 0.08 },
  
  // Additional circles in varying sizes and blues
  { type: 'circle', size: 40, x: '45%', y: '20%', color: 'rgba(100, 170, 230, 0.12)', delay: 1.5, speed: 0.06, parallaxIntensity: -0.09 },
  { type: 'circle', size: 25, x: '85%', y: '65%', color: 'rgba(150, 210, 255, 0.15)', delay: 1.6, speed: 0.05, parallaxIntensity: 0.11 },
  { type: 'circle', size: 35, x: '35%', y: '70%', color: 'rgba(120, 190, 250, 0.1)', delay: 1.7, speed: 0.04, parallaxIntensity: -0.06 },
  { type: 'circle', size: 50, x: '65%', y: '45%', color: 'rgba(80, 160, 240, 0.09)', delay: 1.8, speed: 0.05, parallaxIntensity: 0.13 },
  
  // Small decorative elements
  { type: 'circle', size: 15, x: '25%', y: '25%', color: 'rgba(200, 230, 255, 0.2)', delay: 1.9, speed: 0.07, parallaxIntensity: -0.15 },
  { type: 'circle', size: 20, x: '75%', y: '55%', color: 'rgba(180, 220, 255, 0.18)', delay: 2.0, speed: 0.08, parallaxIntensity: 0.1 },
  { type: 'circle', size: 12, x: '50%', y: '80%', color: 'rgba(220, 240, 255, 0.25)', delay: 2.1, speed: 0.06, parallaxIntensity: -0.14 },
  { type: 'square', size: 18, x: '38%', y: '42%', color: 'rgba(160, 210, 250, 0.15)', delay: 2.2, speed: 0.07, rotation: 20, parallaxIntensity: 0.08 },
  { type: 'square', size: 25, x: '62%', y: '28%', color: 'rgba(140, 200, 250, 0.12)', delay: 2.3, speed: 0.05, rotation: 10, parallaxIntensity: -0.11 },
];

// Floating elements with independent animation
const floatingElements = [
  { type: 'circle', size: 60, x: '30%', y: '20%', color: 'rgba(0, 120, 179, 0.1)', speed: 3, parallaxIntensity: 0.18 },
  { type: 'circle', size: 40, x: '70%', y: '75%', color: 'rgba(100, 180, 255, 0.1)', speed: 5, parallaxIntensity: -0.2 },
  { type: 'square', size: 50, x: '20%', y: '60%', color: 'rgba(0, 100, 179, 0.08)', speed: 4, rotation: 45, parallaxIntensity: 0.16 },
  { type: 'square', size: 30, x: '85%', y: '30%', color: 'rgba(150, 200, 255, 0.08)', speed: 6, rotation: 30, parallaxIntensity: -0.17 },
];

// Gradients for more interest
const gradientOrbs = [
  { x: '25%', y: '30%', width: 300, height: 300, colors: 'rgba(0, 120, 179, 0.2), rgba(100, 180, 255, 0.05)', parallaxIntensity: 0.1 },
  { x: '75%', y: '70%', width: 400, height: 400, colors: 'rgba(50, 150, 220, 0.15), rgba(150, 210, 255, 0.03)', parallaxIntensity: -0.08 },
];

const HeroSection: React.FC = () => {
  const { t } = useLanguage();
  const heroRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [animatedShapes, setAnimatedShapes] = useState(shapes);
  const textRef = useRef<HTMLDivElement>(null);

  // Parallax effect on scroll - modified for smoother text animations
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrollValue = window.scrollY;
        setScrollY(scrollValue);
        
        // Apply opacity change more gradually
        const opacity = Math.max(1 - scrollValue / 900, 0);
        const translateY = scrollValue * 0.3;
        
        heroRef.current.style.opacity = opacity.toString();
        heroRef.current.style.transform = `translateY(${translateY}px)`;
        
        // Apply smoother transitions to the text container
        if (textRef.current) {
          // Use CSS transform for better performance
          textRef.current.style.transition = 'transform 0.05s linear';
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
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

  // Subtle automatic animation for shapes
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedShapes(prevShapes => 
        prevShapes.map(shape => ({
          ...shape,
          autoX: Math.sin(Date.now() / 2000 * shape.speed) * 2,
          autoY: Math.cos(Date.now() / 2000 * shape.speed) * 2
        }))
      );
    }, 50);
    
    return () => clearInterval(interval);
  }, []);

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  // Animation variants for framer-motion - modified for smoother animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
        ease: "easeInOut"
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        duration: 0.5, 
        ease: "easeOut",
        // Prevent re-animation during scroll
        stiffness: 100,
        damping: 15
      }
    }
  };

  // Render a geometric shape based on its type with parallax effect
  const renderShape = (shape: any, index: number) => {
    const offsetX = ((mousePosition.x - 0.5) * -shape.speed * 50) + (shape.autoX || 0);
    const offsetY = ((mousePosition.y - 0.5) * -shape.speed * 50) + (shape.autoY || 0);
    
    // Apply parallax effect based on scroll position
    const parallaxX = scrollY * (shape.parallaxIntensity || 0);
    const parallaxY = scrollY * (shape.parallaxIntensity * 0.7 || 0);
    
    const rotation = shape.rotation ? 
      shape.rotation + ((mousePosition.x - 0.5) * 5) : 
      ((mousePosition.x - 0.5) * 5);
    
    const shapeStyle = {
      position: 'absolute',
      left: `calc(${shape.x} + ${offsetX + parallaxX}px)`,
      top: `calc(${shape.y} + ${offsetY + parallaxY}px)`,
      background: shape.color,
      transition: 'transform 0.5s ease-out',
      transform: `rotate(${rotation}deg)`,
      animation: `float ${5 + index % 3}s ease-in-out infinite alternate-reverse`,
      zIndex: 1,
    } as React.CSSProperties;
    
    if (shape.type === 'circle') {
      return (
        <div 
          key={index}
          style={{
            ...shapeStyle,
            width: `${shape.size}px`,
            height: `${shape.size}px`,
            borderRadius: '50%',
          }}
        />
      );
    } else if (shape.type === 'square') {
      return (
        <div 
          key={index}
          style={{
            ...shapeStyle,
            width: `${shape.size}px`,
            height: `${shape.size}px`,
          }}
        />
      );
    } else if (shape.type === 'rectangle') {
      return (
        <div 
          key={index}
          style={{
            ...shapeStyle,
            width: `${shape.width}px`,
            height: `${shape.height}px`,
          }}
        />
      );
    } else if (shape.type === 'triangle') {
      return (
        <div 
          key={index}
          style={{
            ...shapeStyle,
            width: 0,
            height: 0,
            backgroundColor: 'transparent',
            borderLeft: `${shape.size / 2}px solid transparent`,
            borderRight: `${shape.size / 2}px solid transparent`,
            borderBottom: `${shape.size}px solid ${shape.color}`,
          }}
        />
      );
    }
    return null;
  };

  // Render gradient orbs with parallax effect
  const renderGradientOrb = (orb: any, index: number) => {
    const offsetX = (mousePosition.x - 0.5) * -30;
    const offsetY = (mousePosition.y - 0.5) * -30;
    
    // Apply parallax effect based on scroll position
    const parallaxX = scrollY * (orb.parallaxIntensity || 0);
    const parallaxY = scrollY * (orb.parallaxIntensity * 1.2 || 0);
    
    return (
      <div 
        key={`orb-${index}`}
        className="absolute rounded-full filter blur-3xl"
        style={{
          left: `calc(${orb.x} + ${offsetX + parallaxX}px)`,
          top: `calc(${orb.y} + ${offsetY + parallaxY}px)`,
          width: `${orb.width}px`,
          height: `${orb.height}px`,
          background: `radial-gradient(circle, ${orb.colors})`,
          opacity: 0.4,
          transition: 'transform 0.8s ease-out',
        }}
      />
    );
  };

  // Render elements that float independently with parallax effect
  const renderFloatingElement = (element: any, index: number) => {
    const delay = index * 0.5;
    
    // Apply parallax effect based on scroll position
    const parallaxX = scrollY * (element.parallaxIntensity || 0);
    const parallaxY = scrollY * (element.parallaxIntensity * 0.9 || 0);
    
    const floatingStyle = {
      position: 'absolute',
      left: `calc(${element.x} + ${parallaxX}px)`,
      top: `calc(${element.y} + ${parallaxY}px)`,
      background: element.color,
      width: `${element.size}px`,
      height: `${element.size}px`,
      animation: `float ${element.speed}s ease-in-out ${delay}s infinite alternate`,
      zIndex: 1,
    } as React.CSSProperties;
    
    if (element.type === 'circle') {
      return (
        <div 
          key={`float-${index}`}
          style={{
            ...floatingStyle,
            borderRadius: '50%',
          }}
        />
      );
    } else if (element.type === 'square') {
      return (
        <div 
          key={`float-${index}`}
          style={{
            ...floatingStyle,
            transform: `rotate(${element.rotation}deg)`,
          }}
        />
      );
    }
    return null;
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-16 md:py-0">
      {/* Background Layer */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-latum-blue via-latum-blue to-latum-blue/80"
        style={{ transform: `translateY(${scrollY * 0.1}px)` }}
      ></div>
      
      {/* Dot Pattern */}
      <div 
        className="absolute inset-0 dot-pattern opacity-10"
        style={{
          transform: `translate(${(mousePosition.x - 0.5) * -10}px, ${(mousePosition.y - 0.5) * -10 + scrollY * 0.05}px)`
        }}
      ></div>
      
      {/* Gradient Orbs */}
      {gradientOrbs.map(renderGradientOrb)}
      
      {/* Geometric Shapes */}
      {animatedShapes.map(renderShape)}
      
      {/* Floating Elements */}
      {floatingElements.map(renderFloatingElement)}
      
      {/* Hero Content - added ref to control text animation */}
      <motion.div 
        ref={heroRef}
        className="container-custom relative z-10 text-white space-y-6 px-4 md:px-6 lg:px-8 will-change-transform"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div ref={textRef} className="max-w-4xl mx-auto text-center will-change-transform">
          <motion.div variants={itemVariants} className="flex justify-center mb-4 md:mb-6">
            <img
              src="/lovable-uploads/39741899-8c2b-417e-8421-5aa51256d8e3.png"
              alt="LATUM Logo"
              className="w-32 h-32 md:w-48 md:h-48 object-contain"
            />
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="inline-block px-3 py-1 mb-3 md:px-4 md:py-1 md:mb-4 bg-white/10 backdrop-blur-sm rounded-full"
          >
            <span className="text-xs md:text-sm font-accent font-medium">Est. 2023</span>
          </motion.div>
          
          <motion.h1 
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-display font-bold mb-3 md:mb-6 leading-tight will-change-transform"
          >
            {t('home.hero.title')}
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-lg sm:text-xl md:text-2xl font-light max-w-3xl mx-auto will-change-transform mb-4 md:mb-0"
          >
            {t('home.hero.subtitle')}
          </motion.p>
          
          <motion.div 
            variants={itemVariants}
            className="mt-6 md:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a 
              href="#mission" 
              className="relative overflow-hidden group inline-block"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <span className={cn(
                "btn-primary inline-block relative z-10",
                isHovering ? "bg-latum-accent text-white" : ""
              )}>
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
      
      {/* Scroll Down Indicator */}
      <motion.div 
        className="absolute left-0 right-0 bottom-6 md:bottom-10 mx-auto flex justify-center items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        style={{ transform: `translateY(${scrollY * 0.2}px)` }}
      >
        <button 
          onClick={scrollToContent}
          className="flex flex-col items-center text-white"
          aria-label="Scroll down"
        >
          <span className="text-xs md:text-sm font-medium mb-1 md:mb-2 opacity-80">Discover More</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="flex justify-center"
          >
            <ChevronDown size={24} className="md:w-7 md:h-7" />
          </motion.div>
        </button>
      </motion.div>
    </section>
  );
};

export default HeroSection;
