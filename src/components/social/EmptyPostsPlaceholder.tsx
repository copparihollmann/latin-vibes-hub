
import React from 'react';

const EmptyPostsPlaceholder = () => {
  return (
    <div className="w-full h-full">
      <div className="rounded-lg overflow-hidden bg-white p-6 h-full">
        <p className="text-gray-500 text-center">No posts available</p>
      </div>
    </div>
  );
};

export default EmptyPostsPlaceholder;
