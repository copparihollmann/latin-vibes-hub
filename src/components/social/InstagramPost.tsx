
import React from 'react';

interface InstagramPostProps {
  post: {
    id: string;
    permalink: string;
    media_url: string;
    caption: string;
    timestamp: string;
  };
}

const InstagramPost = ({ post }: InstagramPostProps) => {
  return (
    <a 
      key={post.id}
      href={post.permalink}
      target="_blank"
      rel="noopener noreferrer"
      className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full"
    >
      <div className="relative aspect-square overflow-hidden">
        <img 
          src={post.media_url} 
          alt="Instagram post" 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
          <div className="p-4 text-white">
            <p className="text-sm">{new Date(post.timestamp).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
      <div className="p-4 flex-grow">
        <p className="text-gray-700 line-clamp-3 text-sm">{post.caption}</p>
      </div>
    </a>
  );
};

export default InstagramPost;
