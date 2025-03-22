import React, { useMemo } from 'react';
import { useInstagramPosts } from '@/hooks/useSocialPosts';
import InstagramPost from '@/components/social/InstagramPost';
import InstagramFeedSkeleton from '@/components/social/InstagramFeedSkeleton';
import EmptyPostsPlaceholder from '@/components/social/EmptyPostsPlaceholder';

interface InstagramFeedProps {
  limit?: number;
  startIndex?: number;
}

const InstagramFeed = ({ limit, startIndex = 0 }: InstagramFeedProps) => {
  const { posts: allPosts, isLoading, error, isEmpty } = useInstagramPosts();
  
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
    return <InstagramFeedSkeleton 
      isCarousel={startIndex > 0} 
      count={limit || 3} 
    />;
  }
  
  if (isEmpty || posts.length === 0) {
    return <EmptyPostsPlaceholder />;
  }

  return (
    <>
      {posts.map(post => (
        <InstagramPost key={post.id} post={post} />
      ))}
    </>
  );
};

export default InstagramFeed;
