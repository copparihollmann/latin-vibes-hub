
import React, { useState, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';

interface InstagramPost {
  id: string;
  permalink: string;
  media_url: string;
  caption: string;
  timestamp: string;
}

interface InstagramFeedProps {
  limit?: number;
  startIndex?: number;
}

const InstagramFeed = ({ limit, startIndex = 0 }: InstagramFeedProps) => {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchInstagramPosts = async () => {
      try {
        // In a real implementation, this would fetch from Instagram Graph API
        // For now, we'll use placeholder data
        setTimeout(() => {
          // Placeholder data for demonstration
          const dummyPosts: InstagramPost[] = [
            {
              id: '1',
              permalink: 'https://www.instagram.com/p/placeholder1/',
              media_url: 'https://via.placeholder.com/500x500/0078B3/FFFFFF?text=LATUM+Event',
              caption: 'Join us for our upcoming Latin American Cultural Festival! 🎉 #LATUM #LatinAmerican #Munich',
              timestamp: '2023-05-30T12:00:00+0000'
            },
            {
              id: '2',
              permalink: 'https://www.instagram.com/p/placeholder2/',
              media_url: 'https://via.placeholder.com/500x500/0078B3/FFFFFF?text=Spanish+Workshop',
              caption: 'Spanish Language Workshop this Friday! All levels welcome. #SpanishClass #LATUM',
              timestamp: '2023-05-25T15:30:00+0000'
            },
            {
              id: '3',
              permalink: 'https://www.instagram.com/p/placeholder3/',
              media_url: 'https://via.placeholder.com/500x500/0078B3/FFFFFF?text=Salsa+Night',
              caption: 'Last night\'s salsa dancing event was a huge success! Thanks to everyone who joined! #SalsaDancing #LatinNight',
              timestamp: '2023-05-20T22:00:00+0000'
            },
            {
              id: '4',
              permalink: 'https://www.instagram.com/p/placeholder4/',
              media_url: 'https://via.placeholder.com/500x500/0078B3/FFFFFF?text=Film+Festival',
              caption: 'Latin American Film Festival coming next month! Stay tuned for the full program. #FilmFestival #LatinCinema',
              timestamp: '2023-05-15T14:00:00+0000'
            },
            {
              id: '5',
              permalink: 'https://www.instagram.com/p/placeholder5/',
              media_url: 'https://via.placeholder.com/500x500/0078B3/FFFFFF?text=Networking+Event',
              caption: 'Networking night with Latin American professionals in Munich. Great conversations and connections! #Networking #LatinAmericans',
              timestamp: '2023-05-10T18:30:00+0000'
            },
            {
              id: '6',
              permalink: 'https://www.instagram.com/p/placeholder6/',
              media_url: 'https://via.placeholder.com/500x500/0078B3/FFFFFF?text=Study+Group',
              caption: 'Our weekly study group is helping many students excel in their courses. Join us every Wednesday! #StudyGroup #AcademicSuccess',
              timestamp: '2023-05-05T16:00:00+0000'
            },
            {
              id: '7',
              permalink: 'https://www.instagram.com/p/placeholder7/',
              media_url: 'https://via.placeholder.com/500x500/0078B3/FFFFFF?text=Cultural+Exchange',
              caption: 'Cultural exchange day at TUM was a blast! Thanks to all participants for sharing their traditions. #CulturalExchange #Diversity',
              timestamp: '2023-04-28T14:00:00+0000'
            },
            {
              id: '8',
              permalink: 'https://www.instagram.com/p/placeholder8/',
              media_url: 'https://via.placeholder.com/500x500/0078B3/FFFFFF?text=Welcome+Party',
              caption: 'Welcome party for new Latin American students at TUM. So happy to see our community growing! #WelcomeParty #NewStudents',
              timestamp: '2023-04-20T20:00:00+0000'
            }
          ];
          
          let selectedPosts = [...dummyPosts];
          
          // If used in a carousel, we select based on startIndex
          if (startIndex > 0) {
            selectedPosts = [dummyPosts[startIndex % dummyPosts.length]];
          } 
          // Otherwise apply the regular limit
          else if (limit) {
            selectedPosts = dummyPosts.slice(0, limit);
          }
          
          setPosts(selectedPosts);
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error('Error fetching Instagram posts:', error);
        toast({
          title: "Error loading Instagram posts",
          description: "Please check back later",
          variant: "destructive",
        });
        setLoading(false);
      }
    };

    fetchInstagramPosts();
  }, [toast, limit, startIndex]);

  if (loading) {
    // Show appropriate loading skeletons based on usage context
    if (startIndex > 0) {
      // Single post skeleton for carousel
      return (
        <div className="w-full h-full">
          <div className="rounded-lg overflow-hidden h-full">
            <Skeleton className="h-72 w-full" />
            <div className="p-4">
              <Skeleton className="h-4 w-3/4 mb-2" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3 mt-2" />
            </div>
          </div>
        </div>
      );
    }
    
    // Multiple posts skeleton for grid layout
    return (
      <>
        {Array.from({ length: limit || 3 }).map((_, i) => (
          <div key={i} className="w-full">
            <div className="rounded-lg overflow-hidden">
              <Skeleton className="h-72 w-full" />
              <div className="p-4">
                <Skeleton className="h-4 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3 mt-2" />
              </div>
            </div>
          </div>
        ))}
      </>
    );
  }

  // Handle different display modes based on usage context
  if (startIndex > 0) {
    // Single post display for carousel
    return (
      <>
        {posts.map((post) => (
          <a 
            key={post.id}
            href={post.permalink}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col"
          >
            <div className="relative aspect-square overflow-hidden">
              <img 
                src={post.media_url} 
                alt="Instagram post" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-4 text-white">
                  <p className="text-sm">{new Date(post.timestamp).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
            <div className="p-4 flex-grow">
              <p className="text-gray-700 line-clamp-3 text-sm">{post.caption}</p>
            </div>
          </a>
        ))}
      </>
    );
  }

  // Default display for grid layout
  return (
    <>
      {posts.map((post) => (
        <a 
          key={post.id}
          href={post.permalink}
          target="_blank"
          rel="noopener noreferrer"
          className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full"
        >
          <div className="relative aspect-square overflow-hidden">
            <img 
              src={post.media_url} 
              alt="Instagram post" 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
              <div className="p-4 text-white">
                <p className="text-sm">{new Date(post.timestamp).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
          <div className="p-4 flex-grow">
            <p className="text-gray-700 line-clamp-3 text-sm">{post.caption}</p>
          </div>
        </a>
      ))}
    </>
  );
};

export default InstagramFeed;
