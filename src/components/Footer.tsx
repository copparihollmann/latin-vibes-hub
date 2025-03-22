
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { Instagram, Linkedin, ExternalLink, Copy, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [copied, setCopied] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const footerRef = React.useRef<HTMLElement>(null);

  // Mouse tracking for interactive elements
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (footerRef.current) {
        const { left, top, width, height } = footerRef.current.getBoundingClientRect();
        const x = (e.clientX - left) / width;
        const y = (e.clientY - top) / height;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <footer className="bg-latum-dark text-white" ref={footerRef}>
      <div className="container-custom pt-16 pb-8">
        <div className="relative overflow-hidden">
          {/* Interactive Background Elements */}
          <div 
            className="absolute top-0 right-0 w-1/3 h-full dot-pattern opacity-30"
            style={{ 
              transform: `translate(${(mousePosition.x - 0.5) * -10}px, ${(mousePosition.y - 0.5) * -10}px)` 
            }}
          ></div>
          
          <div 
            className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full bg-latum-blue/10 filter blur-3xl"
            style={{ 
              transform: `translate(${(mousePosition.x - 0.5) * 20}px, ${(mousePosition.y - 0.5) * 20}px)` 
            }}
          ></div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Left Column */}
            <motion.div className="space-y-8" variants={itemVariants}>
              <h2 className="text-4xl font-display font-bold relative inline-block">
                {t('contact.collaborations')}
                <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-latum-accent rounded-full"></span>
              </h2>
              
              <div className="space-y-2">
                <h3 className="text-sm font-accent text-gray-400">{t('contact.email')}</h3>
                <div className="flex items-center space-x-2 group">
                  <span className="text-xl group-hover:text-latum-accent transition-colors duration-300">info.latum@gmail.com</span>
                  <button 
                    onClick={handleCopyEmail}
                    className="p-1.5 rounded-full hover:bg-white/10 transition-colors duration-300"
                    aria-label="Copy email to clipboard"
                  >
                    {copied ? <Check size={18} /> : <Copy size={18} />}
                  </button>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-accent text-gray-400">{t('contact.social')}</h3>
                <div className="flex items-center space-x-4">
                  {[
                    { icon: <Linkedin size={20} />, href: "https://www.linkedin.com/company/latum/", label: "LinkedIn" },
                    { icon: <Instagram size={20} />, href: "https://www.instagram.com/latum.club/", label: "Instagram" },
                    { icon: <ExternalLink size={20} />, href: "https://linktr.ee/LA.TUM", label: "LinkTree" }
                  ].map((social, i) => (
                    <motion.a 
                      key={social.label}
                      href={social.href} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2 rounded-full hover:bg-white/10 transition-all duration-300 hover:scale-110"
                      aria-label={social.label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + (i * 0.1) }}
                      whileHover={{ 
                        scale: 1.1,
                        backgroundColor: "rgba(255, 255, 255, 0.1)" 
                      }}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
            
            {/* Right Column */}
            <motion.div className="space-y-8" variants={itemVariants}>
              <h3 className="text-2xl font-display relative inline-block">
                {t('contact.newsletter')}
                <span className="absolute -bottom-2 left-0 w-1/2 h-0.5 bg-latum-accent/70 rounded-full"></span>
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex overflow-hidden rounded-md shadow-lg">
                  <input 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('contact.newsletter.placeholder')}
                    className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-l-md text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-300"
                    required
                  />
                  <button 
                    type="submit" 
                    className="bg-white text-latum-dark px-6 py-3 font-medium rounded-r-md hover:bg-gray-100 transition-all duration-300 overflow-hidden relative group"
                  >
                    <span className="relative z-10">{t('contact.newsletter.button')}</span>
                    <span className="absolute inset-0 bg-latum-accent scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-300"></span>
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
          
          {/* Bottom Section */}
          <motion.div 
            className="mt-16 pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <p className="text-sm text-gray-400 mb-4 md:mb-0">
              {t('footer.copyright')} | <Link to="/legal" className="hover:underline hover:text-white transition-colors duration-300">{t('footer.legal')}</Link>
            </p>
            
            <motion.p 
              className="text-sm text-gray-400 flex items-center"
              whileHover={{ scale: 1.05, color: "#ffffff" }}
            >
              Made with <span className="text-latum-accent px-1">♥</span> in Munich
            </motion.p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
