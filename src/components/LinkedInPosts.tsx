
import React, { useState, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/components/ui/use-toast';
import { Calendar, ExternalLink } from 'lucide-react';

interface LinkedInPost {
  id: string;
  url: string;
  title: string;
  summary: string;
  publishedDate: string;
}

interface LinkedInPostsProps {
  limit?: number;
  startIndex?: number;
}

const LinkedInPosts = ({ limit, startIndex = 0 }: LinkedInPostsProps) => {
  const [posts, setPosts] = useState<LinkedInPost[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchLinkedInPosts = async () => {
      try {
        // In a real implementation, this would fetch from LinkedIn API
        // For now, we'll use placeholder data
        setTimeout(() => {
          // Placeholder data for demonstration
          const dummyPosts: LinkedInPost[] = [
            {
              id: '1',
              url: 'https://www.linkedin.com/company/latum-ev/posts/',
              title: 'New Partnership Announcement',
              summary: 'We\'re excited to announce our new partnership with TUM International Office to better support Latin American students.',
              publishedDate: '2023-06-01T09:00:00+0000'
            },
            {
              id: '2',
              url: 'https://www.linkedin.com/company/latum-ev/posts/',
              title: 'Successful Networking Event',
              summary: 'Thank you to all the professionals and students who attended our Latin American Professionals networking night!',
              publishedDate: '2023-05-27T14:00:00+0000'
            },
            {
              id: '3',
              url: 'https://www.linkedin.com/company/latum-ev/posts/',
              title: 'LATUM Scholarship Program',
              summary: 'Learn about our new scholarship program designed to support Latin American students pursuing engineering degrees at TUM.',
              publishedDate: '2023-05-20T10:30:00+0000'
            },
            {
              id: '4',
              url: 'https://www.linkedin.com/company/latum-ev/posts/',
              title: 'Community Growth Milestone',
              summary: 'LATUM has reached 500 members! Thank you to our amazing community for your continued support and engagement.',
              publishedDate: '2023-05-15T16:45:00+0000'
            },
            {
              id: '5',
              url: 'https://www.linkedin.com/company/latum-ev/posts/',
              title: 'Research Collaboration Opportunity',
              summary: 'We\'re facilitating connections between Latin American researchers and TUM faculty. Join our upcoming virtual meetup.',
              publishedDate: '2023-05-10T11:15:00+0000'
            },
            {
              id: '6',
              url: 'https://www.linkedin.com/company/latum-ev/posts/',
              title: 'Career Workshop Success',
              summary: 'Our resume and interview preparation workshop helped over 50 students prepare for their job search. More events coming soon!',
              publishedDate: '2023-05-05T13:30:00+0000'
            }
          ];
          
          // Apply startIndex and limit if provided
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
        console.error('Error fetching LinkedIn posts:', error);
        toast({
          title: "Error loading LinkedIn posts",
          description: "Please check back later",
          variant: "destructive",
        });
        setLoading(false);
      }
    };

    fetchLinkedInPosts();
  }, [toast, limit, startIndex]);

  if (loading) {
    // Show appropriate loading skeletons based on usage context
    if (startIndex > 0) {
      // Single post skeleton for carousel
      return (
        <div className="w-full h-full">
          <div className="rounded-lg overflow-hidden bg-white p-6 h-full">
            <Skeleton className="h-6 w-3/4 mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-2/3 mb-4" />
            <div className="flex items-center gap-4 mt-4">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        </div>
      );
    }
    
    // Multiple posts skeleton for grid layout
    return (
      <>
        {Array.from({ length: limit || 2 }).map((_, i) => (
          <div key={i} className="w-full">
            <div className="rounded-lg overflow-hidden bg-white p-6">
              <Skeleton className="h-6 w-3/4 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3 mb-4" />
              <div className="flex items-center gap-4 mt-4">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-24" />
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
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-white rounded-lg shadow-md hover:shadow-lg p-6 transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full"
          >
            <h3 className="text-xl font-display font-bold mb-3 group-hover:text-latum-blue transition-colors duration-300">{post.title}</h3>
            <p className="text-gray-700 mb-4 flex-grow">{post.summary}</p>
            
            <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
              <div className="flex items-center">
                <Calendar size={14} className="mr-1" />
                <span>{new Date(post.publishedDate).toLocaleDateString()}</span>
              </div>
              
              <div className="flex items-center text-latum-blue">
                <span className="mr-1">Read more</span>
                <ExternalLink size={14} />
              </div>
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
          href={post.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group bg-white rounded-lg shadow-md hover:shadow-lg p-6 transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full"
        >
          <h3 className="text-xl font-display font-bold mb-3 group-hover:text-latum-blue transition-colors duration-300">{post.title}</h3>
          <p className="text-gray-700 mb-4 flex-grow">{post.summary}</p>
          
          <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
            <div className="flex items-center">
              <Calendar size={14} className="mr-1" />
              <span>{new Date(post.publishedDate).toLocaleDateString()}</span>
            </div>
            
            <div className="flex items-center text-latum-blue">
              <span className="mr-1">Read more</span>
              <ExternalLink size={14} />
            </div>
          </div>
        </a>
      ))}
    </>
  );
};

export default LinkedInPosts;
