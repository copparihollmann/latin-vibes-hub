
import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ = () => {
  const { t, language } = useLanguage();
  
  // FAQ items
  const faqItems = [
    {
      question: language === 'en' ? 'What is LATUM e.V.?' : '¿Qué es LATUM e.V.?',
      answer: language === 'en' 
        ? 'LATUM e.V. is a non-profit student initiative that brings together Latin American students and those interested in Latin American culture at the Technical University of Munich (TUM).'
        : 'LATUM e.V. es una iniciativa estudiantil sin fines de lucro que reúne a estudiantes latinoamericanos y aquellos interesados en la cultura latinoamericana en la Universidad Técnica de Múnich (TUM).'
    },
    {
      question: language === 'en' ? 'Do I need to be from Latin America to join?' : '¿Necesito ser de Latinoamérica para unirme?',
      answer: language === 'en'
        ? 'Not at all! LATUM welcomes everyone interested in Latin American culture, regardless of nationality. Our community includes students from all over the world.'
        : '¡Para nada! LATUM da la bienvenida a todos los interesados en la cultura latinoamericana, independientemente de su nacionalidad. Nuestra comunidad incluye estudiantes de todo el mundo.'
    },
    {
      question: language === 'en' ? 'How can I become a member?' : '¿Cómo puedo ser miembro?',
      answer: language === 'en'
        ? 'You can become a member by filling out our membership form and paying a small annual fee. The membership provides access to all our events and activities throughout the year.'
        : 'Puedes convertirte en miembro completando nuestro formulario de membresía y pagando una pequeña cuota anual. La membresía proporciona acceso a todos nuestros eventos y actividades durante todo el año.'
    },
    {
      question: language === 'en' ? 'How often do you organize events?' : '¿Con qué frecuencia organizan eventos?',
      answer: language === 'en'
        ? 'We organize various events throughout the academic year, including cultural celebrations, language exchanges, academic support sessions, and social gatherings. We typically host at least one event per month.'
        : 'Organizamos varios eventos durante el año académico, incluyendo celebraciones culturales, intercambios de idiomas, sesiones de apoyo académico y reuniones sociales. Normalmente organizamos al menos un evento al mes.'
    },
    {
      question: language === 'en' ? 'Can I volunteer with LATUM?' : '¿Puedo ser voluntario en LATUM?',
      answer: language === 'en'
        ? 'Absolutely! We always welcome volunteers to help with event planning, marketing, content creation, and more. Volunteering is a great way to gain experience and connect with the community.'
        : '¡Absolutamente! Siempre damos la bienvenida a voluntarios para ayudar con la planificación de eventos, marketing, creación de contenido y más. El voluntariado es una excelente manera de ganar experiencia y conectarse con la comunidad.'
    },
    {
      question: language === 'en' ? 'Does LATUM offer any support for new Latin American students?' : '¿LATUM ofrece algún apoyo para nuevos estudiantes latinoamericanos?',
      answer: language === 'en'
        ? 'Yes, we have a mentorship program that pairs new Latin American students with current students who can help them navigate university life, find housing, and adapt to life in Munich.'
        : 'Sí, tenemos un programa de mentoría que conecta a los nuevos estudiantes latinoamericanos con estudiantes actuales que pueden ayudarlos a navegar la vida universitaria, encontrar alojamiento y adaptarse a la vida en Múnich.'
    },
    {
      question: language === 'en' ? 'How can I stay updated on LATUM activities?' : '¿Cómo puedo mantenerme actualizado sobre las actividades de LATUM?',
      answer: language === 'en'
        ? 'You can follow us on social media, subscribe to our newsletter, or check our website regularly for updates on upcoming events and activities.'
        : 'Puedes seguirnos en las redes sociales, suscribirte a nuestro boletín o consultar nuestro sitio web regularmente para obtener actualizaciones sobre próximos eventos y actividades.'
    },
    {
      question: language === 'en' ? 'Can organizations partner with LATUM?' : '¿Pueden las organizaciones asociarse con LATUM?',
      answer: language === 'en'
        ? 'Yes, we are open to collaborations with other student organizations, university departments, and external organizations that align with our mission of promoting Latin American culture and supporting students.'
        : 'Sí, estamos abiertos a colaboraciones con otras organizaciones estudiantiles, departamentos universitarios y organizaciones externas que se alineen con nuestra misión de promover la cultura latinoamericana y apoyar a los estudiantes.'
    }
  ];
  
  // State to track which FAQ items are expanded
  const [expandedItems, setExpandedItems] = useState<number[]>([0]);
  
  const toggleItem = (index: number) => {
    setExpandedItems(prev => 
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-latum-blue text-white py-20 md:py-32">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 animate-fade-in">
              Frequently Asked Questions
            </h1>
            <p className="text-xl md:text-2xl animate-fade-in" style={{ animationDelay: '100ms' }}>
              Find answers to common questions about LATUM e.V.
            </p>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 md:py-24">
        <div className="container-custom max-w-4xl">
          <div className="space-y-6">
            {faqItems.map((item, index) => (
              <div 
                key={index}
                className="border border-gray-200 rounded-lg overflow-hidden animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <button
                  className="w-full flex items-center justify-between p-6 text-left bg-white hover:bg-gray-50 transition-colors"
                  onClick={() => toggleItem(index)}
                  aria-expanded={expandedItems.includes(index)}
                >
                  <h3 className="text-xl font-display font-bold">{item.question}</h3>
                  {expandedItems.includes(index) ? (
                    <ChevronUp className="flex-shrink-0 text-latum-blue" />
                  ) : (
                    <ChevronDown className="flex-shrink-0" />
                  )}
                </button>
                
                {expandedItems.includes(index) && (
                  <div className="p-6 pt-0 bg-white">
                    <p className="text-gray-700">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* Contact CTA */}
          <div className="mt-16 text-center p-8 bg-gray-50 rounded-xl">
            <h3 className="text-2xl font-display font-bold mb-4">Still have questions?</h3>
            <p className="text-gray-700 mb-6">
              If you couldn't find the information you were looking for, please don't hesitate to reach out to us directly.
            </p>
            <a href="/contact" className="btn-primary">
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
