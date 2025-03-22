import React, { useMemo } from 'react';
import { useLinkedInPosts } from '@/hooks/useSocialPosts';
import LinkedInPost from '@/components/social/LinkedInPost';
import LinkedInFeedSkeleton from '@/components/social/LinkedInFeedSkeleton';
import EmptyPostsPlaceholder from '@/components/social/EmptyPostsPlaceholder';

interface LinkedInPostsProps {
  limit?: number;
  startIndex?: number;
}

const LinkedInPosts = ({ limit, startIndex = 0 }: LinkedInPostsProps) => {
  const { posts: allPosts, isLoading, error, isEmpty } = useLinkedInPosts();
  
  const posts = useMemo(() => {
    if (!allPosts || allPosts.length === 0) {
      return [];
    }
    
    if (startIndex > 0) {
      return [allPosts[startIndex % allPosts.length]];
    }
    
    return limit ? allPosts.slice(0, limit) : allPosts;
  }, [allPosts, limit, startIndex]);

  if (isLoading) {
    return <LinkedInFeedSkeleton 
      isCarousel={startIndex > 0} 
      count={limit || 2} 
    />;
  }
  
  if (isEmpty || posts.length === 0) {
    return <EmptyPostsPlaceholder />;
  }

  return (
    <>
      {posts.map(post => (
        <LinkedInPost key={post.id} post={post} />
      ))}
    </>
  );
};

export default LinkedInPosts;
