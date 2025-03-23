
import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Mail, Instagram, Linkedin, ExternalLink, Copy, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  
  const handleCopyEmail = () => {
    navigator.clipboard.writeText('info.latum@gmail.com');
    setCopied(true);
    
    toast({
      title: t('contact.email_copied'),
      duration: 2000,
    });
    
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-latum-blue text-white py-20 md:py-32">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 animate-fade-in">
              {t('contact.title')}
            </h1>
            <p className="text-xl md:text-2xl animate-fade-in" style={{ animationDelay: '100ms' }}>
              {t('contact.subtitle')}
            </p>
          </div>
        </div>
      </section>
      
      {/* Contact Info Section */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto space-y-10 animate-fade-in">
            <div>
              <h2 className="text-3xl font-display font-bold mb-6">
                {t('contact.connect.title')}
              </h2>
              <p className="text-lg text-gray-700 mb-8">
                {t('contact.connect.description')}
              </p>
            </div>
            
            {/* Contact Methods */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Email */}
              <div className="bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-display font-bold mb-4">
                  {t('contact.email')}
                </h3>
                <div className="flex items-center space-x-2">
                  <Mail className="text-latum-blue" size={20} />
                  <span className="text-lg">info.latum@gmail.com</span>
                  <button 
                    onClick={handleCopyEmail}
                    className="p-1.5 rounded-full hover:bg-gray-200 transition-colors"
                    aria-label="Copy email to clipboard"
                  >
                    {copied ? <Check size={18} /> : <Copy size={18} />}
                  </button>
                </div>
                <p className="mt-4 text-gray-600">
                  {t('contact.email_description')}
                </p>
              </div>
              
              {/* WhatsApp */}
              <div className="bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-display font-bold mb-4">
                  {t('contact.whatsapp.title')}
                </h3>
                <p className="text-gray-600 mb-4">
                  {t('contact.whatsapp.description')}
                </p>
                <a 
                  href="https://linktr.ee/LA.TUM" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-latum-blue hover:underline"
                >
                  <span>{t('contact.whatsapp.button')}</span>
                  <ExternalLink size={16} className="ml-1" />
                </a>
              </div>
            </div>
            
            {/* Social Media Section */}
            <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-display font-bold mb-4">
                {t('contact.social')}
              </h3>
              <p className="text-gray-600 mb-6">
                {t('contact.social_description')}
              </p>
              <div className="flex flex-wrap items-center gap-6">
                <a 
                  href="https://www.instagram.com/latum.club/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-800 hover:text-latum-blue transition-colors"
                >
                  <Instagram size={24} className="mr-2" />
                  <span className="font-medium">Instagram</span>
                </a>
                <a 
                  href="https://www.linkedin.com/company/latum/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-800 hover:text-latum-blue transition-colors"
                >
                  <Linkedin size={24} className="mr-2" />
                  <span className="font-medium">LinkedIn</span>
                </a>
                <a 
                  href="https://linktr.ee/LA.TUM" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-800 hover:text-latum-blue transition-colors"
                >
                  <ExternalLink size={24} className="mr-2" />
                  <span className="font-medium">LinkTree</span>
                </a>
              </div>
            </div>
            
            {/* Info for Prospective Members */}
            <div className="bg-latum-blue/10 rounded-xl p-6 border border-latum-blue/20">
              <h3 className="text-xl font-display font-bold mb-4 text-latum-blue">
                {t('contact.join.title')}
              </h3>
              <p className="text-gray-700 mb-4">
                {t('contact.join.description')}
              </p>
              <a 
                href="https://www.instagram.com/latum.club/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-latum-blue hover:underline"
              >
                <span>{t('contact.join.button')}</span>
                <ExternalLink size={16} className="ml-1" />
              </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* Community Location Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-display font-bold mb-6">
            {t('contact.location.title')}
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8">
            {t('contact.location.description')}
          </p>
        </div>
      </section>
    </div>
  );
};

export default Contact;
