
import React, { useEffect, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { ChevronDown } from 'lucide-react';

const HeroSection: React.FC = () => {
  const { t } = useLanguage();
  const heroRef = useRef<HTMLDivElement>(null);

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

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Color */}
      <div className="absolute inset-0 bg-latum-blue"></div>
      
      {/* Dot Pattern Overlay */}
      <div className="absolute inset-0 dot-pattern opacity-10"></div>
      
      {/* Hero Content */}
      <div 
        ref={heroRef}
        className="container-custom relative z-10 text-white space-y-6 mt-16"
      >
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block px-4 py-1 mb-4 bg-white/10 backdrop-blur-sm rounded-full">
            <span className="text-sm font-accent font-medium">Est. 2023</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 leading-tight">
            {t('home.hero.title')}
          </h1>
          
          <p className="text-xl md:text-2xl font-light max-w-3xl mx-auto">
            {t('home.hero.subtitle')}
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#mission" className="btn-primary">
              {t('home.hero.cta')}
            </a>
          </div>
        </div>
      </div>
      
      {/* Scroll Down Indicator */}
      <button 
        onClick={scrollToContent}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white animate-bounce"
        aria-label="Scroll down"
      >
        <ChevronDown size={32} />
      </button>
    </section>
  );
};

export default HeroSection;
