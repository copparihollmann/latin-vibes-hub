
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Calendar, User, ArrowRight } from 'lucide-react';

const Blog = () => {
  const { t, language } = useLanguage();
  
  // Sample blog posts
  const blogPosts = [
    {
      id: 1,
      title: language === 'en' ? 'Celebrating Latin American Heritage Month at TUM' : 'Celebrando el Mes de la Herencia Latinoamericana en TUM',
      excerpt: language === 'en'
        ? 'A recap of the various events and activities organized during Latin American Heritage Month on campus.'
        : 'Un resumen de los diversos eventos y actividades organizados durante el Mes de la Herencia Latinoamericana en el campus.',
      author: 'Sofia Rodriguez',
      date: 'May 15, 2024',
      category: language === 'en' ? 'Events' : 'Eventos',
      image: null
    },
    {
      id: 2,
      title: language === 'en' ? 'Navigating Academic Life as an International Student' : 'Navegando la Vida Académica como Estudiante Internacional',
      excerpt: language === 'en'
        ? 'Tips and resources for Latin American students adjusting to the German university system and academic expectations.'
        : 'Consejos y recursos para estudiantes latinoamericanos que se adaptan al sistema universitario alemán y a las expectativas académicas.',
      author: 'Carlos Mendoza',
      date: 'April 28, 2024',
      category: language === 'en' ? 'Student Life' : 'Vida Estudiantil',
      image: null
    },
    {
      id: 3,
      title: language === 'en' ? 'Latin American Cuisine: A Taste of Home in Munich' : 'Cocina Latinoamericana: Un Sabor de Casa en Múnich',
      excerpt: language === 'en'
        ? 'Discover Latin American restaurants, grocery stores, and recipes to satisfy your cravings for authentic flavors.'
        : 'Descubre restaurantes latinoamericanos, tiendas de comestibles y recetas para satisfacer tus antojos de sabores auténticos.',
      author: 'Valentina Silva',
      date: 'April 10, 2024',
      category: language === 'en' ? 'Culture' : 'Cultura',
      image: null
    },
    {
      id: 4,
      title: language === 'en' ? 'Interview: Latin American Researchers Making an Impact' : 'Entrevista: Investigadores Latinoamericanos Causando Impacto',
      excerpt: language === 'en'
        ? 'Highlighting the work and achievements of Latin American researchers and academics at TUM.'
        : 'Destacando el trabajo y los logros de investigadores y académicos latinoamericanos en TUM.',
      author: 'Mateo Herrera',
      date: 'March 22, 2024',
      category: language === 'en' ? 'Academics' : 'Académicos',
      image: null
    },
    {
      id: 5,
      title: language === 'en' ? 'Finding Community: Student Stories' : 'Encontrando Comunidad: Historias de Estudiantes',
      excerpt: language === 'en'
        ? 'Personal accounts from Latin American students about their journey to finding belonging at TUM.'
        : 'Relatos personales de estudiantes latinoamericanos sobre su camino para encontrar pertenencia en TUM.',
      author: 'Luciana Vargas',
      date: 'March 5, 2024',
      category: language === 'en' ? 'Community' : 'Comunidad',
      image: null
    },
    {
      id: 6,
      title: language === 'en' ? 'Language Learning Resources for Spanish and Portuguese Speakers' : 'Recursos para Aprender Idiomas para Hablantes de Español y Portugués',
      excerpt: language === 'en'
        ? 'A comprehensive guide to language learning tools, classes, and practice groups for Latin American students learning German.'
        : 'Una guía completa de herramientas para aprender idiomas, clases y grupos de práctica para estudiantes latinoamericanos que aprenden alemán.',
      author: 'Gabriel Torres',
      date: 'February 18, 2024',
      category: language === 'en' ? 'Resources' : 'Recursos',
      image: null
    }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-latum-blue text-white py-20 md:py-32">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 animate-fade-in">
              LATUM Blog
            </h1>
            <p className="text-xl md:text-2xl animate-fade-in" style={{ animationDelay: '100ms' }}>
              {language === 'en'
                ? 'Insights, stories, and resources for the Latin American community at TUM'
                : 'Perspectivas, historias y recursos para la comunidad latinoamericana en TUM'}
            </p>
          </div>
        </div>
      </section>
      
      {/* Blog Posts Grid */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <article 
                key={post.id}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="h-48 bg-latum-blue/80 flex items-center justify-center">
                  <span className="text-white text-lg font-medium">LATUM</span>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="text-sm font-medium px-2 py-1 bg-latum-secondary rounded-full">
                      {post.category}
                    </span>
                  </div>
                  
                  <h2 className="text-xl font-display font-bold mb-3 line-clamp-2">
                    {post.title}
                  </h2>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
                    <div className="flex items-center text-sm text-gray-500">
                      <User size={14} className="mr-1" />
                      <span>{post.author}</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar size={14} className="mr-1" />
                      <span>{post.date}</span>
                    </div>
                  </div>
                  
                  <a href={`/blog/${post.id}`} className="mt-4 inline-flex items-center text-latum-blue font-medium hover:underline">
                    {language === 'en' ? 'Read more' : 'Leer más'}
                    <ArrowRight size={16} className="ml-1" />
                  </a>
                </div>
              </article>
            ))}
          </div>
          
          {/* Newsletter Section */}
          <div className="mt-20 bg-gray-50 rounded-xl p-8 md:p-12">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-display font-bold mb-4 text-center">
                {language === 'en' ? 'Subscribe to Our Newsletter' : 'Suscríbete a Nuestro Boletín'}
              </h2>
              <p className="text-gray-700 text-center mb-6">
                {language === 'en'
                  ? 'Get the latest blog posts, event announcements, and news delivered to your inbox.'
                  : 'Recibe las últimas publicaciones del blog, anuncios de eventos y noticias en tu bandeja de entrada.'}
              </p>
              
              <form className="max-w-lg mx-auto">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    placeholder={language === 'en' ? 'Your email address' : 'Tu dirección de correo electrónico'}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-latum-blue"
                    required
                  />
                  <button type="submit" className="btn-primary whitespace-nowrap">
                    {language === 'en' ? 'Subscribe' : 'Suscribirse'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
