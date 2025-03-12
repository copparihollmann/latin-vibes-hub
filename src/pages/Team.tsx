
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

const Team = () => {
  const { t } = useLanguage();

  // Sample team members data
  const teamMembers = [
    {
      name: 'Sofia Rodriguez',
      role: 'President',
      country: 'Mexico',
      bio: 'Ph.D. candidate in Computer Science with a passion for creating inclusive communities.',
      image: null
    },
    {
      name: 'Carlos Mendoza',
      role: 'Vice President',
      country: 'Colombia',
      bio: 'Studying Mechanical Engineering and working to connect Latin American students across Munich.',
      image: null
    },
    {
      name: 'Valentina Silva',
      role: 'Events Coordinator',
      country: 'Brazil',
      bio: 'Master\'s student in Business Administration with experience in organizing cultural events.',
      image: null
    },
    {
      name: 'Gabriel Torres',
      role: 'Treasurer',
      country: 'Argentina',
      bio: 'Economics student with a background in financial management for student organizations.',
      image: null
    },
    {
      name: 'Luciana Vargas',
      role: 'Communications Director',
      country: 'Peru',
      bio: 'Studying Media Communications and passionate about telling stories that bridge cultures.',
      image: null
    },
    {
      name: 'Mateo Herrera',
      role: 'Academic Coordinator',
      country: 'Chile',
      bio: 'Ph.D. student in Physics focused on creating support systems for international students.',
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
              Our Team
            </h1>
            <p className="text-xl md:text-2xl animate-fade-in" style={{ animationDelay: '100ms' }}>
              Meet the dedicated individuals behind LATUM e.V.
            </p>
          </div>
        </div>
      </section>

      {/* Team Members Grid */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-display font-bold mb-6 text-center">
              Leadership Team
            </h2>
            <p className="text-lg text-gray-700 text-center">
              Our diverse team brings together perspectives from across Latin America to create an inclusive and vibrant community.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="h-64 bg-latum-blue/80 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center text-latum-blue text-xl font-bold">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-sm font-medium px-2 py-1 bg-latum-secondary rounded-full">
                      {member.country}
                    </span>
                  </div>
                  <h3 className="text-xl font-display font-bold">{member.name}</h3>
                  <p className="text-latum-blue font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Join the Team CTA */}
          <div className="mt-20 bg-gray-50 rounded-xl p-8 md:p-12 text-center">
            <h3 className="text-2xl font-display font-bold mb-4">Want to Join Our Team?</h3>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-6">
              We're always looking for passionate individuals to help grow our community and create impactful events.
            </p>
            <a href="/contact" className="btn-primary">
              Get in Touch
            </a>
          </div>
        </div>
      </section>
      
      {/* Volunteers Section */}
      <section className="py-16 bg-latum-blue/10">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-display font-bold mb-6">Our Volunteers</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8">
            LATUM e.V. is powered by dedicated volunteers who contribute their time and talents to creating a vibrant Latin American community at TUM.
          </p>
          <a href="/contact" className="btn-outline">
            Become a Volunteer
          </a>
        </div>
      </section>
    </div>
  );
};

export default Team;
