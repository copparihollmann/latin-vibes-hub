
import React, { useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import HeroSection from '@/components/HeroSection';
import { useToast } from '@/hooks/use-toast';
import InstagramFeed from '@/components/InstagramFeed';
import LinkedInPosts from '@/components/LinkedInPosts';
import { Instagram, Linkedin } from 'lucide-react';

const Index = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  
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
      
      {/* Mission Section */}
      <section id="mission" className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="inline-block px-3 py-1 rounded-full bg-latum-blue/10 text-latum-blue text-sm font-medium">
                {t('home.mission.title')}
              </div>
              
              <h2 className="text-4xl md:text-5xl font-display font-bold">
                Connecting cultures, creating community
              </h2>
              
              <p className="text-lg text-gray-700">
                {t('home.mission.text')}
              </p>
              
              <div>
                <a href="/about" className="btn-primary">
                  Discover Our Story
                </a>
              </div>
            </div>
            
            <div className="relative rounded-lg overflow-hidden h-[500px] shadow-xl animate-fade-in" style={{ animationDelay: '200ms' }}>
              <div className="absolute inset-0 dot-pattern opacity-10 z-10"></div>
              <div className="bg-latum-blue h-full w-full flex items-center justify-center">
                <img 
                  src="/lovable-uploads/230788b3-b7d2-4f9f-9dca-604ecf712a4e.png" 
                  alt="LATUM Logo" 
                  className="w-64 h-64"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Social Media Feed Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
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
      
      {/* Community Highlight Section */}
      <section className="section-padding bg-latum-blue text-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-display font-bold mb-8">Join Our Community</h2>
            <p className="text-xl mb-10">
              LATUM e.V. brings together students from across Latin America and those interested in Latin American culture to create a vibrant, supportive community at TUM.
            </p>
            <a href="/contact" className="btn-primary bg-white text-latum-blue hover:bg-gray-100">
              Get Involved
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
