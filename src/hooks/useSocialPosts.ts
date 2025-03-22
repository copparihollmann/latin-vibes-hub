import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useEffect } from 'react';

// Instagram hooks
export interface InstagramPost {
  id: string;
  permalink: string;
  media_url: string;
  caption: string;
  timestamp: string;
}

const fetchInstagramPosts = async (): Promise<InstagramPost[]> => {
  // Try to fetch from edge function first
  try {
    const { data, error } = await supabase.functions.invoke('fetch-instagram-posts');
    if (!error && data?.posts) {
      return data.posts.map((post: any) => ({
        id: post.id,
        permalink: post.permalink,
        media_url: post.media_url,
        caption: post.caption,
        timestamp: post.timestamp
      }));
    }
  } catch (err) {
    console.error('Edge function error:', err);
    // Fall back to dummy data if edge function fails
  }

  // Fallback to placeholder data
  return [
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
};

export const useInstagramPosts = (limit?: number, startIndex = 0) => {
  const { toast } = useToast();
  
  const { data: allPosts, isLoading, error } = useQuery({
    queryKey: ['instagramPosts'],
    queryFn: fetchInstagramPosts,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
  });
  
  const posts = allPosts && allPosts.length > 0
    ? startIndex > 0
      ? [allPosts[startIndex % allPosts.length]]
      : limit
        ? allPosts.slice(0, limit)
        : allPosts
    : [];
  
  // Show error toast if API request fails
  useEffect(() => {
    if (error) {
      toast({
        title: "Error loading Instagram posts",
        description: "Please check back later",
        variant: "destructive",
      });
    }
  }, [error, toast]);

  return {
    posts,
    isLoading,
    error,
    isEmpty: posts.length === 0 && !isLoading
  };
};

// LinkedIn hooks
export interface LinkedInPost {
  id: string;
  url: string;
  title: string;
  summary: string;
  publishedDate: string;
}

const fetchLinkedInPosts = async (): Promise<LinkedInPost[]> => {
  // Try to fetch from edge function first
  try {
    const { data, error } = await supabase.functions.invoke('fetch-linkedin-posts');
    if (!error && data?.posts) {
      return data.posts.map((post: any) => ({
        id: post.id,
        url: post.url,
        title: post.title,
        summary: post.summary,
        publishedDate: post.published_date
      }));
    }
  } catch (err) {
    console.error('Edge function error:', err);
    // Fall back to dummy data if edge function fails
  }

  // Fallback to placeholder data
  return [
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
};

export const useLinkedInPosts = (limit?: number, startIndex = 0) => {
  const { toast } = useToast();
  
  const { data: allPosts, isLoading, error } = useQuery({
    queryKey: ['linkedinPosts'],
    queryFn: fetchLinkedInPosts,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
  });
  
  const posts = allPosts && allPosts.length > 0
    ? startIndex > 0
      ? [allPosts[startIndex % allPosts.length]]
      : limit
        ? allPosts.slice(0, limit)
        : allPosts
    : [];
  
  // Show error toast if API request fails
  useEffect(() => {
    if (error) {
      toast({
        title: "Error loading LinkedIn posts",
        description: "Please check back later",
        variant: "destructive",
      });
    }
  }, [error, toast]);

  return {
    posts,
    isLoading,
    error,
    isEmpty: posts.length === 0 && !isLoading
  };
};
