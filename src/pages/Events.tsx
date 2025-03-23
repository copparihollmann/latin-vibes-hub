
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Instagram, Linkedin, Calendar, ExternalLink } from 'lucide-react';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from '@/components/ui/carousel';
import InstagramFeed from '@/components/InstagramFeed';
import LinkedInPosts from '@/components/LinkedInPosts';

const Events = () => {
  const { t, language } = useLanguage();
  
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-latum-blue text-white py-20 md:py-32">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 animate-fade-in">
              {t('events.title')}
            </h1>
            <p className="text-xl md:text-2xl animate-fade-in" style={{ animationDelay: '100ms' }}>
              {t('events.subtitle')}
            </p>
          </div>
        </div>
      </section>
      
      {/* Instagram Follow Alert - NEW */}
      <section className="py-8 bg-latum-accent/10">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-6 rounded-xl border-2 border-latum-accent/30 bg-white">
            <div className="flex items-center gap-4">
              <div className="bg-latum-blue text-white p-3 rounded-full">
                <Calendar size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-latum-blue">{t('events.stayUpdated.title')}</h3>
                <p className="text-gray-700">{t('events.stayUpdated.description')}</p>
              </div>
            </div>
            <a 
              href="https://www.instagram.com/latum.club/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-latum-blue text-white px-6 py-3 rounded-md font-medium hover:bg-latum-blue/90 transition-all duration-300 whitespace-nowrap"
            >
              <Instagram size={20} />
              <span>{t('events.stayUpdated.button')}</span>
            </a>
          </div>
        </div>
      </section>
      
      {/* Instagram Feed Section with Carousel */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12">
            <h2 className="text-3xl font-display font-bold">{t('events.latest.title')}</h2>
            <a 
              href="https://www.instagram.com/latum.club/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-latum-blue font-medium transition-all duration-300 hover:opacity-80 mt-4 md:mt-0"
            >
              <Instagram size={20} />
              <span>{t('events.latest.followLink')}</span>
            </a>
          </div>
          
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-mx-2 md:-mx-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <CarouselItem key={index} className="px-2 md:px-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                  <InstagramFeed limit={1} startIndex={index} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-8 gap-4">
              <CarouselPrevious className="static mx-0" />
              <CarouselNext className="static mx-0" />
            </div>
          </Carousel>
        </div>
      </section>
      
      {/* LinkedIn Posts with Carousel */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12">
            <h2 className="text-3xl font-display font-bold">{t('events.activities.title')}</h2>
            <a 
              href="https://www.linkedin.com/company/latum/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-latum-blue font-medium transition-all duration-300 hover:opacity-80 mt-4 md:mt-0"
            >
              <Linkedin size={20} />
              <span>{t('events.activities.followLink')}</span>
            </a>
          </div>
          
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-mx-2 md:-mx-4">
              {Array.from({ length: 6 }).map((_, index) => (
                <CarouselItem key={index} className="px-2 md:px-4 md:basis-1/2 lg:basis-1/3">
                  <LinkedInPosts limit={1} startIndex={index} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-8 gap-4">
              <CarouselPrevious className="static mx-0" />
              <CarouselNext className="static mx-0" />
            </div>
          </Carousel>
        </div>
      </section>
      
      {/* Event Proposal Section */}
      <section className="py-16">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-display font-bold mb-6 animate-fade-in-up">{t('events.proposal.title')}</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            {t('events.proposal.description')}
          </p>
          <a 
            href="/contact" 
            className="btn-primary inline-block transform transition duration-300 hover:scale-105 animate-fade-in-up" 
            style={{ animationDelay: '200ms' }}
          >
            {t('events.proposal.button')}
          </a>
        </div>
      </section>
    </div>
  );
};

export default Events;
