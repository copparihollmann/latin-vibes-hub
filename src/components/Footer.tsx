
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { Instagram, Linkedin, ExternalLink, Copy, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('info.latum@gmail.com');
    setCopied(true);
    
    toast({
      title: 'Email copied to clipboard',
      duration: 2000,
    });
    
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle the newsletter subscription
    toast({
      title: 'Thank you for subscribing!',
      description: 'We\'ll keep you updated with our latest news and events.',
      duration: 3000,
    });
    setEmail('');
  };

  return (
    <footer className="bg-latum-dark text-white">
      <div className="container-custom pt-16 pb-8">
        <div className="relative overflow-hidden">
          {/* Dot Pattern */}
          <div className="absolute top-0 right-0 w-1/3 h-full dot-pattern opacity-30"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
            {/* Left Column */}
            <div className="space-y-8 animate-fade-in">
              <h2 className="text-4xl font-display font-bold">{t('contact.collaborations')}</h2>
              
              <div className="space-y-2">
                <h3 className="text-sm font-accent text-gray-400">{t('contact.email')}</h3>
                <div className="flex items-center space-x-2">
                  <span className="text-xl">info.latum@gmail.com</span>
                  <button 
                    onClick={handleCopyEmail}
                    className="p-1.5 rounded-full hover:bg-white/10 transition-colors"
                    aria-label="Copy email to clipboard"
                  >
                    {copied ? <Check size={18} /> : <Copy size={18} />}
                  </button>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-accent text-gray-400">{t('contact.social')}</h3>
                <div className="flex items-center space-x-4">
                  <a 
                    href="https://www.linkedin.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 rounded-full hover:bg-white/10 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={20} />
                  </a>
                  <a 
                    href="https://www.instagram.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 rounded-full hover:bg-white/10 transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram size={20} />
                  </a>
                  <a 
                    href="https://linktr.ee" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 rounded-full hover:bg-white/10 transition-colors"
                    aria-label="LinkTree"
                  >
                    <ExternalLink size={20} />
                  </a>
                </div>
              </div>
            </div>
            
            {/* Right Column */}
            <div className="space-y-8 animate-fade-in" style={{ animationDelay: '200ms' }}>
              <h3 className="text-2xl font-display">{t('contact.newsletter')}</h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex">
                  <input 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('contact.newsletter.placeholder')}
                    className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-l-md text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                    required
                  />
                  <button 
                    type="submit" 
                    className="bg-white text-latum-dark px-6 py-3 font-medium rounded-r-md hover:bg-gray-100 transition-colors"
                  >
                    {t('contact.newsletter.button')}
                  </button>
                </div>
              </form>
            </div>
          </div>
          
          {/* Bottom Section */}
          <div className="mt-16 pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400 mb-4 md:mb-0">
              {t('footer.copyright')} | <Link to="/legal" className="hover:underline">{t('footer.legal')}</Link>
            </p>
            
            <p className="text-sm text-gray-400">
              Made with ♥ in Munich
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
