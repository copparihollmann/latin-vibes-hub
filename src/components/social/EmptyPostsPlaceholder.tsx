
import React from 'react';
import { Instagram, Linkedin } from 'lucide-react';

interface EmptyPostsPlaceholderProps {
  type?: 'instagram' | 'linkedin';
}

const EmptyPostsPlaceholder = ({ type }: EmptyPostsPlaceholderProps) => {
  const Icon = type === 'linkedin' ? Linkedin : Instagram;
  const platform = type === 'linkedin' ? 'LinkedIn' : 'Instagram';
  
  return (
    <div className="w-full h-full">
      <div className="rounded-lg overflow-hidden bg-white p-6 h-full flex flex-col items-center justify-center text-center">
        <Icon className="w-10 h-10 text-gray-400 mb-4" />
        <p className="text-gray-500 font-medium">No {platform} posts available</p>
        <p className="text-gray-400 text-sm mt-2">Check back later for updates</p>
      </div>
    </div>
  );
};

export default EmptyPostsPlaceholder;
