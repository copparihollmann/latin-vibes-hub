
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Calendar, MapPin, Clock } from 'lucide-react';

const Events = () => {
  const { t } = useLanguage();

  // Sample events data
  const upcomingEvents = [
    {
      id: 1,
      title: 'Latin American Cultural Festival',
      date: 'June 15, 2024',
      time: '12:00 PM - 8:00 PM',
      location: 'TUM Main Campus',
      description: 'A day-long celebration of Latin American cultures featuring food, music, dance, and art from across the region.',
      image: null
    },
    {
      id: 2,
      title: 'Spanish Language Exchange',
      date: 'June 22, 2024',
      time: '6:00 PM - 8:00 PM',
      location: 'TUM International Lounge',
      description: 'Practice your Spanish in a relaxed environment with native speakers and fellow learners.',
      image: null
    },
    {
      id: 3,
      title: 'Latin American Film Night',
      date: 'July 5, 2024',
      time: '7:00 PM - 10:00 PM',
      location: 'TUM Media Center',
      description: 'Screening of award-winning films from Latin America followed by discussion.',
      image: null
    }
  ];

  const pastEvents = [
    {
      id: 4,
      title: 'Networking Mixer',
      date: 'May 10, 2024',
      location: 'TUM Business School',
      description: 'Connecting Latin American students with professionals from industry.',
      image: null
    },
    {
      id: 5,
      title: 'Salsa Dance Workshop',
      date: 'April 25, 2024',
      location: 'TUM Sports Center',
      description: 'Learn the basics of salsa dancing with professional instructors.',
      image: null
    },
    {
      id: 6,
      title: 'Latin American Research Symposium',
      date: 'March 15, 2024',
      location: 'TUM Science Building',
      description: 'Showcase of research projects focused on Latin American development, environment, and innovation.',
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
              Events
            </h1>
            <p className="text-xl md:text-2xl animate-fade-in" style={{ animationDelay: '100ms' }}>
              Connect, learn, and celebrate Latin American culture through our diverse events
            </p>
          </div>
        </div>
      </section>
      
      {/* Upcoming Events */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <h2 className="text-3xl font-display font-bold mb-12">Upcoming Events</h2>
          
          <div className="space-y-10">
            {upcomingEvents.map((event, index) => (
              <div 
                key={event.id} 
                className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="md:col-span-1 h-48 md:h-full bg-latum-blue/80 flex items-center justify-center">
                  <div className="text-white font-display text-2xl font-bold">LATUM</div>
                </div>
                
                <div className="md:col-span-2 p-6">
                  <h3 className="text-2xl font-display font-bold mb-3">{event.title}</h3>
                  
                  <div className="flex flex-wrap gap-4 mb-4">
                    <div className="flex items-center text-gray-600">
                      <Calendar size={16} className="mr-2" />
                      <span>{event.date}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-600">
                      <Clock size={16} className="mr-2" />
                      <span>{event.time}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-600">
                      <MapPin size={16} className="mr-2" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-6">{event.description}</p>
                  
                  <div className="flex space-x-4">
                    <button className="btn-primary">Register</button>
                    <button className="btn-outline">Learn More</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Past Events */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl font-display font-bold mb-12">Past Events</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pastEvents.map((event, index) => (
              <div 
                key={event.id}
                className="bg-white rounded-xl overflow-hidden shadow-md animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="h-40 bg-latum-blue/70 flex items-center justify-center">
                  <div className="text-white font-display text-xl font-bold">LATUM</div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center mb-2">
                    <Calendar size={16} className="mr-2 text-latum-blue" />
                    <span className="text-sm text-gray-600">{event.date}</span>
                  </div>
                  
                  <h3 className="text-xl font-display font-bold mb-2">{event.title}</h3>
                  <p className="text-gray-600 mb-4">{event.description}</p>
                  
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin size={14} className="mr-1" />
                    <span>{event.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Event Proposal Section */}
      <section className="py-16">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-display font-bold mb-6">Have an Event Idea?</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8">
            We welcome proposals for events that celebrate Latin American culture, foster community, or provide academic support.
          </p>
          <a href="/contact" className="btn-primary">
            Submit a Proposal
          </a>
        </div>
      </section>
    </div>
  );
};

export default Events;
