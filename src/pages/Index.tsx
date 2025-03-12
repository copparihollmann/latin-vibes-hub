
import React, { useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import HeroSection from '@/components/HeroSection';
import { useToast } from '@/hooks/use-toast';

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
      
      {/* Events Preview Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-display font-bold mb-6">Upcoming Events</h2>
            <p className="text-lg text-gray-700">
              Join us for cultural exchanges, networking, and celebrating Latin American heritage
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div 
                key={item} 
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 animate-fade-in"
                style={{ animationDelay: `${item * 100}ms` }}
              >
                <div className="h-48 bg-latum-blue/80 flex items-center justify-center">
                  <span className="text-white text-lg font-medium">Event Image</span>
                </div>
                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="text-sm font-medium px-2 py-1 bg-latum-secondary rounded-full">
                      {new Date().toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="text-xl font-display font-bold mb-2">Latin American Mixer</h3>
                  <p className="text-gray-600 mb-4">
                    An evening of networking, music, and authentic Latin American cuisine.
                  </p>
                  <a href="/events" className="text-latum-blue font-medium hover:underline">
                    Learn more →
                  </a>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <a href="/events" className="btn-outline">
              View All Events
            </a>
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
