
import React, { useEffect, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { motion } from 'framer-motion';

const About = () => {
  const { t } = useLanguage();
  const valuesRef = useRef<HTMLDivElement>(null);

  // Parallax and scroll animations
  useEffect(() => {
    const handleScroll = () => {
      if (valuesRef.current) {
        const elements = valuesRef.current.querySelectorAll('.value-item');
        const scrollPosition = window.scrollY;
        const viewportHeight = window.innerHeight;

        elements.forEach((element, index) => {
          const rect = element.getBoundingClientRect();
          if (rect.top < viewportHeight * 0.85) {
            element.classList.add('animate-fade-in-up');
            // Fix TypeScript error by properly casting the element to HTMLElement
            (element as HTMLElement).style.animationDelay = `${index * 100}ms`;
          }
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <div className="pt-16 overflow-hidden">
      {/* Hero Section with Enhanced Animation */}
      <section className="relative bg-gradient-to-br from-latum-blue via-latum-blue to-latum-blue/80 text-white py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-10"></div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white/5 to-transparent"></div>
        
        <div className="container-custom relative z-10">
          <motion.div 
            className="max-w-3xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
              {t('about.title')}
            </h1>
            <motion.p 
              className="text-xl md:text-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.7 }}
            >
              {t('about.description')}
            </motion.p>
          </motion.div>
        </div>
        
        {/* Background Elements */}
        <div className="absolute -bottom-10 -right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute top-10 -left-10 w-64 h-64 bg-latum-accent/10 rounded-full blur-3xl"></div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {/* Sidebar */}
            <div className="md:col-span-1">
              <div className="sticky top-32 space-y-8">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="p-6 rounded-2xl bg-gradient-to-br from-white to-gray-50 shadow-md border border-gray-100"
                >
                  <h3 className="text-2xl font-display font-bold mb-4 text-latum-blue">Our Vision</h3>
                  <p className="text-gray-700">
                    To create a home away from home for Latin American students and foster cultural exchange at TUM.
                  </p>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="p-6 rounded-2xl bg-gradient-to-br from-white to-gray-50 shadow-md border border-gray-100"
                >
                  <h3 className="text-2xl font-display font-bold mb-4 text-latum-blue">Founded</h3>
                  <p className="text-gray-700">2023</p>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="p-6 rounded-2xl bg-gradient-to-br from-white to-gray-50 shadow-md border border-gray-100"
                >
                  <h3 className="text-2xl font-display font-bold mb-4 text-latum-blue">Location</h3>
                  <p className="text-gray-700">Technical University of Munich, Germany</p>
                </motion.div>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="md:col-span-2 space-y-12">
              <motion.div 
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-display font-bold text-latum-blue relative inline-block">
                  Our Story
                  <span className="absolute -bottom-2 left-0 w-full h-1 bg-latum-accent rounded-full"></span>
                </h2>
                <p className="text-lg text-gray-700">
                  LATUM e.V. was founded in 2023 by a group of passionate Latin American students at the Technical University of Munich who recognized the need for a community that could support newcomers and celebrate Latin American culture.
                </p>
                <p className="text-lg text-gray-700">
                  What started as informal gatherings quickly grew into a structured organization with a clear mission: to bridge cultural gaps and foster an inclusive environment at TUM.
                </p>
              </motion.div>
              
              {/* Co-founders Section with Better Styling */}
              <motion.div 
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <h2 className="text-3xl font-display font-bold text-latum-blue relative inline-block">
                  Our Co-founders
                  <span className="absolute -bottom-2 left-0 w-full h-1 bg-latum-accent rounded-full"></span>
                </h2>
                <div className="rounded-xl overflow-hidden shadow-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                    <div className="bg-latum-blue p-8 text-white">
                      <h3 className="text-2xl font-display font-bold mb-4">{t('about.founders.title')}</h3>
                      <p className="mb-4">
                        {t('about.founders.description')}
                      </p>
                      <p className="italic border-l-4 border-white/30 pl-4">
                        "Our vision was to create a space where Latin American students could find community, support and a sense of belonging while studying abroad at TUM."
                      </p>
                    </div>
                    <div className="aspect-auto bg-gradient-to-br from-latum-light to-white overflow-hidden flex items-center justify-center">
                      <div className="w-full h-full p-8 flex items-center justify-center">
                        <div className="relative w-full max-w-sm h-64 bg-latum-blue/10 rounded-lg overflow-hidden group shadow-md transition-all duration-300 hover:shadow-xl">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-latum-blue font-medium">Co-founders Image</span>
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-latum-blue/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                            <div className="p-4 text-white">
                              <p className="font-medium">Founders of LATUM e.V.</p>
                              <p className="text-sm opacity-80">Established 2023</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <h2 className="text-3xl font-display font-bold text-latum-blue relative inline-block">
                  What We Do
                  <span className="absolute -bottom-2 left-0 w-full h-1 bg-latum-accent rounded-full"></span>
                </h2>
                <p className="text-lg text-gray-700">
                  Our activities are centered around three core pillars:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {['Community Building', 'Cultural Exchange', 'Academic Support'].map((title, i) => (
                    <motion.div 
                      key={title}
                      custom={i}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: "-100px" }}
                      variants={fadeInVariants}
                      className="group"
                    >
                      <div className="h-full bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                        <div className="h-3 bg-latum-blue"></div>
                        <div className="p-6">
                          <h3 className="text-xl font-display font-bold mb-3 text-gray-800">{title}</h3>
                          <p className="text-gray-700">
                            {title === 'Community Building' && 
                              'Regular social events, language exchanges, and networking opportunities to connect students.'}
                            {title === 'Cultural Exchange' && 
                              'Workshops, festivals, and presentations that showcase the rich diversity of Latin American cultures.'}
                            {title === 'Academic Support' && 
                              'Mentoring, study groups, and resources to help Latin American students thrive academically.'}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              
              <motion.div 
                className="space-y-6"
                ref={valuesRef}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <h2 className="text-3xl font-display font-bold text-latum-blue relative inline-block">
                  Our Values
                  <span className="absolute -bottom-2 left-0 w-full h-1 bg-latum-accent rounded-full"></span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { name: 'Inclusion', desc: 'Creating a welcoming space for everyone interested in Latin American culture.' },
                    { name: 'Diversity', desc: 'Celebrating the rich variety of cultures, languages, and traditions across Latin America.' },
                    { name: 'Connection', desc: 'Building meaningful relationships and networks that last beyond university.' },
                    { name: 'Support', desc: 'Providing resources and assistance to help students succeed academically and personally.' }
                  ].map((value, i) => (
                    <div key={value.name} className="value-item opacity-0">
                      <HoverCard>
                        <HoverCardTrigger asChild>
                          <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100 transition-all duration-300 hover:shadow-lg hover:border-latum-blue/30 cursor-pointer">
                            <h3 className="text-xl font-display font-bold mb-2 text-latum-blue flex items-center">
                              <span className="inline-block w-3 h-3 bg-latum-accent rounded-full mr-2"></span>
                              {value.name}
                            </h3>
                            <p className="text-gray-700">{value.desc}</p>
                          </div>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-80">
                          <div className="space-y-2">
                            <h4 className="text-lg font-bold">{value.name}</h4>
                            <p className="text-sm">{value.desc}</p>
                            <p className="text-xs text-muted-foreground">A core value that guides our initiatives and community.</p>
                          </div>
                        </HoverCardContent>
                      </HoverCard>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section with better styling */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-latum-blue/10 to-latum-accent/5"></div>
        <div className="absolute inset-0 dot-pattern opacity-10"></div>
        
        <motion.div 
          className="container-custom text-center relative z-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl font-display font-bold mb-6 text-latum-blue">Want to Get Involved?</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8">
            Whether you're from Latin America or simply interested in the culture, we welcome you to join our community.
          </p>
          <a 
            href="/contact" 
            className="btn-primary inline-block relative overflow-hidden group"
          >
            <span className="relative z-10">Contact Us</span>
            <span className="absolute inset-0 bg-latum-accent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
          </a>
        </motion.div>
        
        {/* Background decor */}
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-latum-blue/5 rounded-full transform translate-x-1/2 translate-y-1/2"></div>
        <div className="absolute top-0 left-0 w-48 h-48 bg-latum-accent/5 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
      </section>
    </div>
  );
};

export default About;
