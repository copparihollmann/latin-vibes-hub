
import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion } from 'framer-motion';

const FAQ = () => {
  const { t } = useLanguage();
  
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
              {t('faq.title')}
            </h1>
            <p className="text-xl md:text-2xl animate-fade-in" style={{ animationDelay: '100ms' }}>
              {t('faq.description')}
            </p>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 md:py-24">
        <div className="container-custom max-w-4xl">
          <div className="space-y-6">
            {t('faq.items', { returnObjects: true }).map((item: any, index: number) => (
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
          <motion.div 
            className="mt-16 text-center p-8 bg-gray-50 rounded-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-display font-bold mb-4">{t('faq.more.title')}</h3>
            <p className="text-gray-700 mb-6">
              {t('faq.more.description')}
            </p>
            <a href="/contact" className="btn-primary">
              {t('faq.more.button')}
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
