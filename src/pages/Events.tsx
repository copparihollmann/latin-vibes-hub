
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Instagram, Linkedin } from 'lucide-react';
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
  const { t } = useLanguage();

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-latum-blue text-white py-20 md:py-32">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 animate-fade-in">
              Events
            </h1>
            <p className="text-xl md:text-2xl animate-fade-in" style={{ animationDelay: '100ms' }}>
              Connect, learn, and celebrate Latin American culture through our diverse events
            </p>
          </div>
        </div>
      </section>
      
      {/* Instagram Feed Section with Carousel */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12">
            <h2 className="text-3xl font-display font-bold">Latest Events</h2>
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
          
          <div className="relative px-12">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent>
                {Array.from({ length: 8 }).map((_, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                    <div className="p-1">
                      <InstagramFeed limit={1} startIndex={index} />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute left-0 top-1/2" />
              <CarouselNext className="absolute right-0 top-1/2" />
            </Carousel>
          </div>
        </div>
      </section>
      
      {/* LinkedIn Posts with Carousel */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12">
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
          
          <div className="relative px-12">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent>
                {Array.from({ length: 6 }).map((_, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-1">
                      <LinkedInPosts limit={1} startIndex={index} />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute left-0 top-1/2" />
              <CarouselNext className="absolute right-0 top-1/2" />
            </Carousel>
          </div>
        </div>
      </section>
      
      {/* Event Proposal Section */}
      <section className="py-16">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-display font-bold mb-6 animate-fade-in-up">Have an Event Idea?</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            We welcome proposals for events that celebrate Latin American culture, foster community, or provide academic support.
          </p>
          <a 
            href="/contact" 
            className="btn-primary inline-block transform transition duration-300 hover:scale-105 animate-fade-in-up" 
            style={{ animationDelay: '200ms' }}
          >
            Submit a Proposal
          </a>
        </div>
      </section>
    </div>
  );
};

export default Events;
