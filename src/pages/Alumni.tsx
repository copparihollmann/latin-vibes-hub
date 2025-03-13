
import React, { useState, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { fetchAlumniFromSheet, AlumniMember } from '@/utils/googleSheetsUtil';
import { GraduationCap, Calendar } from 'lucide-react';

const Alumni = () => {
  const [alumni, setAlumni] = useState<AlumniMember[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const loadAlumni = async () => {
      try {
        const members = await fetchAlumniFromSheet();
        setAlumni(members);
        setLoading(false);
      } catch (error) {
        console.error('Failed to load alumni:', error);
        toast({
          title: "Error loading alumni data",
          description: "Please try again later",
          variant: "destructive",
        });
        setLoading(false);
      }
    };

    loadAlumni();
  }, [toast]);

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-latum-blue text-white py-20 md:py-32">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 animate-fade-in">
              Our Alumni
            </h1>
            <p className="text-xl md:text-2xl animate-fade-in" style={{ animationDelay: '100ms' }}>
              Celebrating the past members who helped shape LATUM e.V.
            </p>
          </div>
        </div>
      </section>

      {/* Alumni Grid */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-display font-bold mb-6 text-center animate-fade-in-up">
              Former Team Members
            </h2>
            <p className="text-lg text-gray-700 text-center animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              These individuals have played crucial roles in building and shaping our organization. Their contributions continue to impact our community today.
            </p>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="bg-white rounded-xl overflow-hidden shadow-md">
                  <Skeleton className="h-64 w-full" />
                  <div className="p-6">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2 mb-4" />
                    <Skeleton className="h-4 w-1/4" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {alumni.map((member, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-500 transform hover:-translate-y-2 animate-fade-in-up"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="h-64 bg-latum-blue/20 flex items-center justify-center overflow-hidden relative group">
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
                    <h3 className="text-xl font-display font-bold">{member.name}</h3>
                    <div className="flex items-center space-x-2 mt-2 mb-3">
                      <GraduationCap size={16} className="text-latum-blue" />
                      <span className="text-gray-700">{member.position}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar size={14} className="mr-1" />
                      <span>{member.year}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Legacy Section */}
          <div className="mt-20 bg-gray-50 rounded-xl p-8 md:p-12 text-center">
            <h3 className="text-2xl font-display font-bold mb-4 animate-fade-in-up">Our Growing Legacy</h3>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-6 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              LATUM continues to grow and evolve thanks to the foundation laid by our alumni. Their passion and dedication set the standard for our organization today.
            </p>
            <a 
              href="/team" 
              className="btn-primary inline-block transform transition duration-300 hover:scale-105 animate-fade-in-up" 
              style={{ animationDelay: '200ms' }}
            >
              Meet Our Current Team
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Alumni;
