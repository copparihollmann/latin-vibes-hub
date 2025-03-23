
import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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

  // Smoother animations with framer-motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-latum-blue text-white py-20 md:py-32">
        <div className="container-custom">
          <div className="max-w-3xl">
            <motion.h1 
              className="text-5xl md:text-6xl font-display font-bold mb-6"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {t('faq.title')}
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            >
              {t('faq.description')}
            </motion.p>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 md:py-24">
        <div className="container-custom max-w-4xl">
          <motion.div 
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {t('faq.items', { returnObjects: true }).map((item: any, index: number) => (
              <motion.div 
                key={index}
                className="border border-gray-200 rounded-lg overflow-hidden"
                variants={itemVariants}
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
                
                <AnimatePresence>
                  {expandedItems.includes(index) && (
                    <motion.div 
                      className="p-6 pt-0 bg-white"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <p className="text-gray-700">{item.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Contact CTA */}
          <motion.div 
            className="mt-16 text-center p-8 bg-gray-50 rounded-xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
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
