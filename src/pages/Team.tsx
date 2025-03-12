
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/components/ui/use-toast';
import { fetchTeamMembersFromSheet, TeamMember } from '@/utils/googleSheetsUtil';

const Team = () => {
  const { t } = useLanguage();
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const loadTeamMembers = async () => {
      try {
        const members = await fetchTeamMembersFromSheet();
        setTeamMembers(members);
        setLoading(false);
      } catch (error) {
        console.error('Failed to load team members:', error);
        toast({
          title: "Error loading team data",
          description: "Please try again later",
          variant: "destructive",
        });
        setLoading(false);
      }
    };

    loadTeamMembers();
  }, [toast]);

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
            <h2 className="text-3xl font-display font-bold mb-6 text-center animate-fade-in-up">
              Leadership Team
            </h2>
            <p className="text-lg text-gray-700 text-center animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              Our diverse team brings together perspectives from across Latin America to create an inclusive and vibrant community.
            </p>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="bg-white rounded-xl overflow-hidden shadow-md">
                  <Skeleton className="h-64 w-full" />
                  <div className="p-6">
                    <Skeleton className="h-4 w-1/4 mb-2" />
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2 mb-4" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-500 transform hover:-translate-y-2 animate-fade-in-up"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="h-64 bg-latum-blue/80 flex items-center justify-center overflow-hidden relative group">
                    {member.image ? (
                      <img 
                        src={member.image} 
                        alt={member.name} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center text-latum-blue text-xl font-bold transform transition-transform duration-500 group-hover:scale-110">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </div>
                    )}
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
          )}
          
          {/* Join the Team CTA */}
          <div className="mt-20 bg-gray-50 rounded-xl p-8 md:p-12 text-center">
            <h3 className="text-2xl font-display font-bold mb-4 animate-fade-in-up">Want to Join Our Team?</h3>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-6 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              We're always looking for passionate individuals to help grow our community and create impactful events.
            </p>
            <a 
              href="/contact" 
              className="btn-primary inline-block transform transition duration-300 hover:scale-105 animate-fade-in-up" 
              style={{ animationDelay: '200ms' }}
            >
              Get in Touch
            </a>
          </div>
        </div>
      </section>
      
      {/* Volunteers Section */}
      <section className="py-16 bg-latum-blue/10">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-display font-bold mb-6 animate-fade-in-up">Our Volunteers</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            LATUM e.V. is powered by dedicated volunteers who contribute their time and talents to creating a vibrant Latin American community at TUM.
          </p>
          <a 
            href="/contact" 
            className="btn-outline inline-block transform transition duration-300 hover:scale-105 animate-fade-in-up" 
            style={{ animationDelay: '200ms' }}
          >
            Become a Volunteer
          </a>
        </div>
      </section>
    </div>
  );
};

export default Team;
