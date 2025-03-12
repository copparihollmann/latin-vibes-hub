
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

const About = () => {
  const { t } = useLanguage();

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-latum-blue text-white py-20 md:py-32">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 animate-fade-in">
              {t('about.title')}
            </h1>
            <p className="text-xl md:text-2xl animate-fade-in" style={{ animationDelay: '100ms' }}>
              {t('about.description')}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {/* Sidebar */}
            <div className="md:col-span-1">
              <div className="sticky top-32 space-y-8">
                <div>
                  <h3 className="text-2xl font-display font-bold mb-4">Our Vision</h3>
                  <p className="text-gray-700">
                    To create a home away from home for Latin American students and foster cultural exchange at TUM.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-2xl font-display font-bold mb-4">Founded</h3>
                  <p className="text-gray-700">2023</p>
                </div>
                
                <div>
                  <h3 className="text-2xl font-display font-bold mb-4">Location</h3>
                  <p className="text-gray-700">Technical University of Munich, Germany</p>
                </div>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="md:col-span-2 space-y-12">
              <div className="space-y-6">
                <h2 className="text-3xl font-display font-bold">Our Story</h2>
                <p className="text-lg text-gray-700">
                  LATUM e.V. was founded in 2023 by a group of passionate Latin American students at the Technical University of Munich who recognized the need for a community that could support newcomers and celebrate Latin American culture.
                </p>
                <p className="text-lg text-gray-700">
                  What started as informal gatherings quickly grew into a structured organization with a clear mission: to bridge cultural gaps and foster an inclusive environment at TUM.
                </p>
              </div>
              
              <div className="space-y-6">
                <h2 className="text-3xl font-display font-bold">What We Do</h2>
                <p className="text-lg text-gray-700">
                  Our activities are centered around three core pillars:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-xl font-display font-bold mb-3">Community Building</h3>
                    <p className="text-gray-700">
                      Regular social events, language exchanges, and networking opportunities to connect students.
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-xl font-display font-bold mb-3">Cultural Exchange</h3>
                    <p className="text-gray-700">
                      Workshops, festivals, and presentations that showcase the rich diversity of Latin American cultures.
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-xl font-display font-bold mb-3">Academic Support</h3>
                    <p className="text-gray-700">
                      Mentoring, study groups, and resources to help Latin American students thrive academically.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <h2 className="text-3xl font-display font-bold">Our Values</h2>
                <ul className="space-y-4 text-lg text-gray-700">
                  <li className="flex items-start">
                    <span className="text-latum-blue font-bold mr-2">•</span>
                    <span><strong>Inclusion:</strong> Creating a welcoming space for everyone interested in Latin American culture.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-latum-blue font-bold mr-2">•</span>
                    <span><strong>Diversity:</strong> Celebrating the rich variety of cultures, languages, and traditions across Latin America.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-latum-blue font-bold mr-2">•</span>
                    <span><strong>Connection:</strong> Building meaningful relationships and networks that last beyond university.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-latum-blue font-bold mr-2">•</span>
                    <span><strong>Support:</strong> Providing resources and assistance to help students succeed academically and personally.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-latum-blue/10 py-16">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-display font-bold mb-6">Want to Get Involved?</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8">
            Whether you're from Latin America or simply interested in the culture, we welcome you to join our community.
          </p>
          <a href="/contact" className="btn-primary">
            Contact Us
          </a>
        </div>
      </section>
    </div>
  );
};

export default About;
