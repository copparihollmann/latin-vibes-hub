
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface LinkedInFeedSkeletonProps {
  isCarousel?: boolean;
  count?: number;
}

const LinkedInFeedSkeleton = ({ isCarousel = false, count = 2 }: LinkedInFeedSkeletonProps) => {
  if (isCarousel) {
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
      {Array.from({ length: count }).map((_, i) => (
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
};

export default LinkedInFeedSkeleton;
