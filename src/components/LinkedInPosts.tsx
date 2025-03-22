
import React from 'react';
import { useLinkedInPosts } from '@/hooks/useSocialPosts';
import LinkedInPost from '@/components/social/LinkedInPost';
import LinkedInFeedSkeleton from '@/components/social/LinkedInFeedSkeleton';
import EmptyPostsPlaceholder from '@/components/social/EmptyPostsPlaceholder';

interface LinkedInPostsProps {
  limit?: number;
  startIndex?: number;
}

const LinkedInPosts = ({ limit, startIndex = 0 }: LinkedInPostsProps) => {
  const { posts, isLoading, isEmpty } = useLinkedInPosts(limit, startIndex);

  if (isEmpty) {
    return <EmptyPostsPlaceholder />;
  }

  if (isLoading) {
    return <LinkedInFeedSkeleton 
      isCarousel={startIndex > 0} 
      count={limit || 2} 
    />;
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
