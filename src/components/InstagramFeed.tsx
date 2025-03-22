
import React from 'react';
import { useInstagramPosts } from '@/hooks/useSocialPosts';
import InstagramPost from '@/components/social/InstagramPost';
import InstagramFeedSkeleton from '@/components/social/InstagramFeedSkeleton';
import EmptyPostsPlaceholder from '@/components/social/EmptyPostsPlaceholder';

interface InstagramFeedProps {
  limit?: number;
  startIndex?: number;
}

const InstagramFeed = ({ limit, startIndex = 0 }: InstagramFeedProps) => {
  const { posts, isLoading, isEmpty } = useInstagramPosts(limit, startIndex);

  if (isEmpty) {
    return <EmptyPostsPlaceholder />;
  }

  if (isLoading) {
    return <InstagramFeedSkeleton 
      isCarousel={startIndex > 0} 
      count={limit || 3} 
    />;
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
