
import React, { useEffect, useRef, CSSProperties } from 'react';

interface ParallaxElementProps {
  speed: number;
  className?: string;
  children: React.ReactNode;
  style?: CSSProperties;
}

export const ParallaxElement: React.FC<ParallaxElementProps> = ({ 
  speed, 
  className = '',
  children,
  style = {}
}) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!elementRef.current) return;
      const scrollPosition = window.scrollY;
      const translateY = scrollPosition * speed;
      elementRef.current.style.transform = `translateY(${translateY}px)`;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div ref={elementRef} className={`will-change-transform ${className}`} style={style}>
      {children}
    </div>
  );
};

interface ParallaxSectionProps {
  children: React.ReactNode;
  className?: string;
  overlayOpacity?: number;
  backgroundImage?: string;
}

const ParallaxSection: React.FC<ParallaxSectionProps> = ({
  children,
  className = '',
  overlayOpacity = 0.3,
  backgroundImage
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const { top, height } = sectionRef.current.getBoundingClientRect();
      const scrollPosition = window.scrollY;
      const offset = top + scrollPosition;
      const windowHeight = window.innerHeight;
      
      // Only apply parallax effect when the section is in view
      if (
        scrollPosition + windowHeight >= offset &&
        scrollPosition <= offset + height
      ) {
        const yPos = -(scrollPosition - offset) * 0.5;
        if (sectionRef.current.querySelector('.parallax-bg')) {
          const bgElement = sectionRef.current.querySelector('.parallax-bg') as HTMLElement;
          bgElement.style.transform = `translate3d(0, ${yPos}px, 0)`;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial positioning
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      ref={sectionRef} 
      className={`relative overflow-hidden ${className}`}
    >
      {backgroundImage && (
        <div 
          className="parallax-bg absolute inset-0 h-[120%] -top-[10%] w-full bg-cover bg-center will-change-transform"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        ></div>
      )}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-latum-blue/0 via-latum-blue/20 to-latum-blue/40"
        style={{ opacity: overlayOpacity }}
      ></div>
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default ParallaxSection;
