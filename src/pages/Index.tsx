
import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import HeroSection from '@/components/HeroSection';
import { useToast } from '@/hooks/use-toast';
import { Instagram, Linkedin, ExternalLink, MessageCircle } from 'lucide-react';

const Index = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [scrollY, setScrollY] = useState(0);
  const missionRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const communityRef = useRef<HTMLDivElement>(null);
  const activitiesRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Welcome toast for demonstration
    toast({
      title: 'Welcome to LATUM',
      description: 'Connecting Latin American students and culture enthusiasts at TUM',
      duration: 5000,
    });
  }, [toast]);

  // Handle parallax effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate parallax transformations
  const getMissionTransform = () => {
    if (!missionRef.current) return {};
    const rect = missionRef.current.getBoundingClientRect();
    const offsetFromTop = rect.top + window.scrollY;
    const offsetY = (scrollY - offsetFromTop + window.innerHeight) * 0.1;
    return {
      transform: `translateY(${Math.min(Math.max(-20, offsetY), 20)}px)`,
    };
  };

  const getSocialTransform = () => {
    if (!socialRef.current) return {};
    const rect = socialRef.current.getBoundingClientRect();
    const offsetFromTop = rect.top + window.scrollY;
    const offsetY = (scrollY - offsetFromTop + window.innerHeight) * 0.05;
    return {
      transform: `translateY(${Math.min(Math.max(-15, offsetY), 15)}px)`,
    };
  };

  const getCommunityTransform = () => {
    if (!communityRef.current) return {};
    const rect = communityRef.current.getBoundingClientRect();
    const offsetFromTop = rect.top + window.scrollY;
    const offsetY = (scrollY - offsetFromTop + window.innerHeight) * 0.08;
    return {
      transform: `translateY(${Math.min(Math.max(-25, offsetY), 25)}px)`,
    };
  };

  const getActivitiesTransform = () => {
    if (!activitiesRef.current) return {};
    const rect = activitiesRef.current.getBoundingClientRect();
    const offsetFromTop = rect.top + window.scrollY;
    const offsetY = (scrollY - offsetFromTop + window.innerHeight) * 0.06;
    return {
      transform: `translateY(${Math.min(Math.max(-18, offsetY), 18)}px)`,
    };
  };

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Mission Section with Parallax */}
      <section id="mission" className="section-padding bg-white relative" ref={missionRef}>
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in" style={getMissionTransform()}>
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
            
            <div 
              className="relative rounded-lg overflow-hidden h-[500px] shadow-xl animate-fade-in" 
              style={{ 
                animationDelay: '200ms',
                transform: `translateY(${scrollY * 0.04}px)` 
              }}
            >
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

      {/* Activities Section with Parallax */}
      <section className="section-padding bg-gray-50 relative" ref={activitiesRef}>
        <div className="container-custom relative z-10" style={getActivitiesTransform()}>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-display font-bold mb-6">What We Do</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              LATUM organizes a wide variety of events and activities to connect Latin American students and culture enthusiasts at TUM.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Speaker Series",
                description: "Engaging talks from Latin American professionals and academics sharing their expertise and experiences."
              },
              {
                title: "Cultural Events",
                description: "Celebrations of Latin American traditions, music, dance, and food throughout the year."
              },
              {
                title: "Sports Activities",
                description: "Regular sports meetups and tournaments to stay active and build connections through friendly competition."
              },
              {
                title: "Latin American Parties",
                description: "Vibrant club events and parties showcasing the diverse and energetic nightlife of Latin America."
              },
              {
                title: "Book Clubs",
                description: "Discussions about Latin American literature, from classic novels to contemporary works."
              },
              {
                title: "Mentoring Programs",
                description: "Support for new students through guidance from experienced peers familiar with both TUM and Latin American backgrounds."
              }
            ].map((activity, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-display font-bold mb-3 text-latum-blue">{activity.title}</h3>
                <p className="text-gray-700">{activity.description}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-xl mb-6">Discover all our activities and stay updated with our events!</p>
            <a 
              href="https://linktr.ee/LA.TUM" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-primary bg-latum-blue inline-flex items-center"
            >
              <ExternalLink className="mr-2" size={20} />
              Visit our LinkTree
            </a>
          </div>
        </div>
      </section>
      
      {/* WhatsApp Community Highlight */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="bg-latum-accent/10 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 space-y-4">
              <h3 className="text-3xl font-display font-bold text-latum-blue">Join Our WhatsApp Community</h3>
              <p className="text-lg">
                Connect with our super active WhatsApp community where members share events, opportunities, and build friendships! The link to join is available on our LinkTree.
              </p>
              <a 
                href="https://linktr.ee/LA.TUM" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center text-latum-blue font-medium hover:underline"
              >
                <MessageCircle className="mr-2" size={20} />
                Join via our LinkTree
              </a>
            </div>
            <div className="flex-shrink-0 bg-white p-5 rounded-full shadow-lg">
              <MessageCircle size={100} className="text-latum-blue" />
            </div>
          </div>
        </div>
      </section>
      
      {/* Social Media Links Section with Parallax */}
      <section className="section-padding bg-gray-50 relative" ref={socialRef}>
        <div 
          className="absolute inset-0 bg-gray-50 z-0"
          style={{ transform: `translateY(${scrollY * 0.02}px)` }}
        ></div>
        <div className="container-custom relative z-10" style={getSocialTransform()}>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-display font-bold mb-8">Follow Our Social Media</h2>
            <p className="text-xl mb-10">
              Keep up with our latest events, activities, and announcements by following us on social media.
            </p>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
              <a 
                href="https://www.instagram.com/latum.club/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-latum-blue bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 w-full md:w-auto"
              >
                <Instagram size={36} />
                <div className="text-left">
                  <h3 className="text-xl font-bold">Instagram</h3>
                  <p className="text-gray-600">Follow our events and activities</p>
                </div>
                <ExternalLink className="ml-auto" size={20} />
              </a>
              
              <a 
                href="https://www.linkedin.com/company/latum/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-latum-blue bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 w-full md:w-auto"
              >
                <Linkedin size={36} />
                <div className="text-left">
                  <h3 className="text-xl font-bold">LinkedIn</h3>
                  <p className="text-gray-600">Connect with our professional network</p>
                </div>
                <ExternalLink className="ml-auto" size={20} />
              </a>
            </div>

            <div className="mt-8">
              <a 
                href="https://linktr.ee/LA.TUM" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 text-white bg-latum-blue p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 max-w-md mx-auto"
              >
                <ExternalLink size={36} />
                <div className="text-left">
                  <h3 className="text-xl font-bold">LinkTree</h3>
                  <p className="text-white/90">All our important links in one place</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* Community Highlight Section with Parallax */}
      <section className="section-padding bg-latum-blue text-white relative overflow-hidden" ref={communityRef}>
        <div 
          className="absolute -bottom-10 -right-10 w-96 h-96 rounded-full bg-latum-accent/20 z-0"
          style={{ transform: `translate(${scrollY * 0.05}px, ${scrollY * -0.03}px)` }}
        ></div>
        <div 
          className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-white/10 z-0"
          style={{ transform: `translate(${scrollY * -0.04}px, ${scrollY * 0.02}px)` }}
        ></div>
        <div className="container-custom relative z-10" style={getCommunityTransform()}>
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
