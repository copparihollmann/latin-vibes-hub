
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface InstagramFeedSkeletonProps {
  isCarousel?: boolean;
  count?: number;
}

const InstagramFeedSkeleton = ({ isCarousel = false, count = 3 }: InstagramFeedSkeletonProps) => {
  if (isCarousel) {
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
      {Array.from({ length: count }).map((_, i) => (
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
};

export default InstagramFeedSkeleton;
