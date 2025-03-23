
import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Mail, Instagram, Linkedin, ExternalLink, Copy, Check, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const Contact = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleCopyEmail = () => {
    navigator.clipboard.writeText('info.latum@gmail.com');
    setCopied(true);
    
    toast({
      title: t('contact.form.success'),
      duration: 2000,
    });
    
    setTimeout(() => setCopied(false), 2000);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast({
        title: t('contact.form.validation'),
        duration: 3000,
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Call the Supabase Edge Function to send the email
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: formData
      });
      
      if (error) throw error;
      
      toast({
        title: t('contact.form.success'),
        description: t('contact.form.success_description'),
        duration: 5000,
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Error sending contact form:', error);
      toast({
        title: t('contact.form.error'),
        description: t('contact.form.error_description'),
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
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
      
      {/* Contact Form Section */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-10 animate-fade-in">
              <div>
                <h2 className="text-3xl font-display font-bold mb-6">
                  {t('contact.connect.title')}
                </h2>
                <p className="text-lg text-gray-700 mb-8">
                  {t('contact.connect.description')}
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-6">
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
              </div>
              
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-display font-bold mb-4">
                  {t('contact.social')}
                </h3>
                <div className="flex items-center space-x-6">
                  <a 
                    href="https://www.linkedin.com/company/latum/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-800 hover:text-latum-blue transition-colors"
                  >
                    <Linkedin size={20} className="mr-2" />
                    <span>LinkedIn</span>
                  </a>
                  <a 
                    href="https://www.instagram.com/latum.club/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-800 hover:text-latum-blue transition-colors"
                  >
                    <Instagram size={20} className="mr-2" />
                    <span>Instagram</span>
                  </a>
                  <a 
                    href="https://linktr.ee/LA.TUM" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-800 hover:text-latum-blue transition-colors"
                  >
                    <ExternalLink size={20} className="mr-2" />
                    <span>LinkTree</span>
                  </a>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="animate-fade-in" style={{ animationDelay: '200ms' }}>
              <div className="bg-white rounded-xl shadow-md p-8">
                <h2 className="text-2xl font-display font-bold mb-6">
                  {t('contact.form.title')}
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        {t('contact.form.name')}
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-latum-blue"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        {t('contact.form.email')}
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-latum-blue"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      {t('contact.form.subject')}
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-latum-blue"
                      required
                    >
                      <option value="" disabled>
                        {t('contact.form.subject_placeholder')}
                      </option>
                      <option value="membership">
                        {t('contact.form.subject_options.membership')}
                      </option>
                      <option value="event">
                        {t('contact.form.subject_options.event')}
                      </option>
                      <option value="partnership">
                        {t('contact.form.subject_options.partnership')}
                      </option>
                      <option value="volunteer">
                        {t('contact.form.subject_options.volunteer')}
                      </option>
                      <option value="other">
                        {t('contact.form.subject_options.other')}
                      </option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      {t('contact.form.message')}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-latum-blue"
                      required
                    ></textarea>
                  </div>
                  
                  <button 
                    type="submit" 
                    className="btn-primary w-full flex justify-center items-center"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {t('contact.form.sending')}
                      </>
                    ) : (
                      t('contact.form.button')
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Location Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-display font-bold mb-6">
            {t('contact.location.title')}
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8">
            {t('contact.location.description')}
          </p>
          
          <div className="bg-white rounded-xl shadow-md h-64 md:h-96 flex items-center justify-center">
            <span className="text-gray-500 text-lg">Map placeholder</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
