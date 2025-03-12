
import React, { useState, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/components/ui/use-toast';
import { Calendar, Clock, ExternalLink } from 'lucide-react';

interface LinkedInPost {
  id: string;
  url: string;
  title: string;
  summary: string;
  publishedDate: string;
}

const LinkedInPosts = () => {
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
            }
          ];
          
          setPosts(dummyPosts);
          setLoading(false);
        }, 1500);

        // In production, you would implement LinkedIn API
        // Note: For actual implementation, you'd need a server or edge function
        // to securely handle LinkedIn API tokens
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
  }, [toast]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="rounded-lg overflow-hidden bg-white p-6">
            <Skeleton className="h-6 w-3/4 mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-2/3 mb-4" />
            <div className="flex items-center gap-4 mt-4">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {posts.map((post, index) => (
        <a 
          key={post.id}
          href={post.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group bg-white rounded-lg shadow-md hover:shadow-lg p-6 transition-all duration-500 transform hover:-translate-y-2 animate-fade-in-up"
          style={{ animationDelay: `${index * 150}ms` }}
        >
          <h3 className="text-xl font-display font-bold mb-3 group-hover:text-latum-blue transition-colors duration-300">{post.title}</h3>
          <p className="text-gray-700 mb-4">{post.summary}</p>
          
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
    </div>
  );
};

export default LinkedInPosts;
