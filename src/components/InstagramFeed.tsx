
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
}

const InstagramFeed = ({ limit }: InstagramFeedProps) => {
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
            }
          ];
          
          // Apply limit if provided
          const limitedPosts = limit ? dummyPosts.slice(0, limit) : dummyPosts;
          setPosts(limitedPosts);
          setLoading(false);
        }, 1500);

        // In production, you would implement Instagram Graph API
        // Note: For actual implementation, you'd need a server or edge function
        // to securely handle Instagram API tokens
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
  }, [toast, limit]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: limit || 4 }).map((_, index) => (
          <div key={index} className="rounded-lg overflow-hidden">
            <Skeleton className="h-80 w-full" />
            <div className="p-4">
              <Skeleton className="h-4 w-3/4 mb-2" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3 mt-2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  const gridCols = limit === 3 ? "grid-cols-1 md:grid-cols-3" : 
                 limit === 2 ? "grid-cols-1 md:grid-cols-2" : 
                 "grid-cols-1 md:grid-cols-2 lg:grid-cols-4";

  return (
    <div className={`grid ${gridCols} gap-6`}>
      {posts.map((post, index) => (
        <a 
          key={post.id}
          href={post.permalink}
          target="_blank"
          rel="noopener noreferrer"
          className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-500 transform hover:-translate-y-2 animate-fade-in-up"
          style={{ animationDelay: `${index * 150}ms` }}
        >
          <div className="relative h-80 overflow-hidden">
            <img 
              src={post.media_url} 
              alt="Instagram post" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
              <div className="p-4 text-white">
                <p className="text-sm">{new Date(post.timestamp).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
          <div className="p-4">
            <p className="text-gray-700 line-clamp-3 text-sm">{post.caption}</p>
          </div>
        </a>
      ))}
    </div>
  );
};

export default InstagramFeed;
