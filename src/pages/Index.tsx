
import React, { useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import HeroSection from '@/components/HeroSection';
import { useToast } from '@/hooks/use-toast';
import InstagramFeed from '@/components/InstagramFeed';
import LinkedInPosts from '@/components/LinkedInPosts';
import { Instagram, Linkedin, Users, MapPin, Mountain, TreePalm, Flower, Globe } from 'lucide-react';
import ParallaxSection, { ParallaxElement } from '@/components/ParallaxSection';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  useEffect(() => {
    // Welcome toast for demonstration
    toast({
      title: 'Welcome to LATUM',
      description: 'Connecting Latin American students and culture enthusiasts at TUM',
      duration: 5000,
    });
  }, [toast]);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Mission Section with Parallax */}
      <ParallaxSection 
        className="py-16 md:py-24 bg-gradient-to-b from-white to-blue-50"
        overlayOpacity={0.1}
      >
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <ParallaxElement speed={isMobile ? 0 : -0.2} className="space-y-6 md:space-y-8 z-10">
              <div className="inline-block px-3 py-1 rounded-full bg-latum-blue/10 text-latum-blue text-sm font-medium">
                {t('home.mission.title')}
              </div>
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold">
                Connecting cultures, creating community
              </h2>
              
              <p className="text-base md:text-lg text-gray-700">
                {t('home.mission.text')}
              </p>
              
              <div>
                <a href="/about" className="btn-primary">
                  Discover Our Story
                </a>
              </div>
            </ParallaxElement>
            
            <ParallaxElement speed={isMobile ? 0 : 0.1} className="relative">
              <div className="relative rounded-lg overflow-hidden h-[350px] md:h-[500px] shadow-xl">
                <div className="bg-gradient-to-br from-latum-blue/90 to-latum-blue/70 h-full w-full flex items-center justify-center">
                  {/* Latin American Themed Decorative Elements */}
                  <ParallaxElement speed={isMobile ? 0 : -0.05} className="absolute top-10 left-10">
                    <div className="text-white/80">
                      <Flower size={48} />
                    </div>
                  </ParallaxElement>
                  
                  <ParallaxElement speed={isMobile ? 0 : 0.08} className="absolute bottom-10 right-10">
                    <div className="text-white/80">
                      <TreePalm size={48} />
                    </div>
                  </ParallaxElement>
                  
                  <ParallaxElement speed={isMobile ? 0 : -0.1} className="absolute top-1/4 right-1/4">
                    <div className="text-white/60">
                      <Mountain size={32} />
                    </div>
                  </ParallaxElement>
                  
                  {/* Map silhouette */}
                  <Globe size={128} className="text-white/80" />
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-20 h-20 bg-latum-accent/10 rounded-full"></div>
              <div className="absolute -bottom-5 -left-5 w-12 h-12 bg-latum-blue/20 rounded-full"></div>
            </ParallaxElement>
          </div>
        </div>
      </ParallaxSection>
      
      {/* Social Media Feed Section */}
      <section className="py-16 md:py-24 bg-gray-50 relative overflow-hidden">
        {/* Parallax decorative elements */}
        <ParallaxElement speed={isMobile ? 0 : -0.15} className="absolute top-20 left-10 w-32 h-32 rounded-full bg-latum-blue/5 opacity-70">
          <div className="w-full h-full flex items-center justify-center text-latum-blue/30">
            <Flower size={32} />
          </div>
        </ParallaxElement>
        
        <ParallaxElement speed={isMobile ? 0 : 0.1} className="absolute bottom-40 right-5 w-24 h-24 rounded-full bg-latum-accent/5 opacity-70">
          <div className="w-full h-full flex items-center justify-center text-latum-accent/30">
            <TreePalm size={24} />
          </div>
        </ParallaxElement>
        
        <ParallaxElement speed={isMobile ? 0 : 0.2} className="absolute top-1/2 left-1/2 w-40 h-40 rounded-full bg-latum-blue/5 opacity-50">
          <div className="w-full h-full flex items-center justify-center text-latum-blue/20">
            <Mountain size={36} />
          </div>
        </ParallaxElement>
        
        <div className="container-custom relative z-10">
          {/* Instagram Feed */}
          <div className="mb-16">
            <div className="flex flex-col md:flex-row items-center justify-between mb-8">
              <h2 className="text-3xl font-display font-bold">Latest Instagram Posts</h2>
              <a 
                href="https://www.instagram.com/latum_ev/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-latum-blue font-medium transition-all duration-300 hover:opacity-80 mt-4 md:mt-0"
              >
                <Instagram size={20} />
                <span>Follow us on Instagram</span>
              </a>
            </div>
            
            {/* Instagram feed grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <InstagramFeed limit={3} />
            </div>
          </div>
          
          {/* LinkedIn Posts */}
          <div>
            <div className="flex flex-col md:flex-row items-center justify-between mb-8">
              <h2 className="text-3xl font-display font-bold">Latest Activities</h2>
              <a 
                href="https://www.linkedin.com/company/latum-ev/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-latum-blue font-medium transition-all duration-300 hover:opacity-80 mt-4 md:mt-0"
              >
                <Linkedin size={20} />
                <span>Connect on LinkedIn</span>
              </a>
            </div>
            
            {/* LinkedIn posts grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <LinkedInPosts limit={2} />
            </div>
          </div>
        </div>
      </section>
      
      {/* Community Highlight Section with Parallax */}
      <ParallaxSection 
        className="py-20 md:py-24 text-white"
        backgroundImage="https://images.unsplash.com/photo-1526392060635-9d6019884377?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        overlayOpacity={0.8}
      >
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <ParallaxElement speed={isMobile ? 0 : -0.1}>
              <h2 className="text-4xl font-display font-bold mb-8">Join Our Community</h2>
              <p className="text-xl mb-10">
                LATUM e.V. brings together students from across Latin America and those interested in Latin American culture to create a vibrant, supportive community at TUM.
              </p>
              <a href="/contact" className="btn-primary bg-white text-latum-blue hover:bg-gray-100">
                Get Involved
              </a>
            </ParallaxElement>
          </div>
        </div>
      </ParallaxSection>
    </div>
  );
};

export default Index;
