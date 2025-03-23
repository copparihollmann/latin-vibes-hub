
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useLanguage } from '@/context/LanguageContext';

const NotFound = () => {
  const location = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="container-custom text-center max-w-3xl py-20">
        <div className="w-24 h-24 bg-latum-blue rounded-full flex items-center justify-center mx-auto mb-8">
          <span className="text-white text-4xl font-bold">404</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
          {t('notFound.title')}
        </h1>
        
        <p className="text-xl text-gray-700 mb-8">
          {t('notFound.description')}
        </p>
        
        <a href="/" className="btn-primary inline-block">
          {t('notFound.button')}
        </a>
      </div>
    </div>
  );
};

export default NotFound;
