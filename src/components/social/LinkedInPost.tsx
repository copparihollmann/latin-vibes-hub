
import React from 'react';
import { Calendar, ExternalLink } from 'lucide-react';

interface LinkedInPostProps {
  post: {
    id: string;
    url: string;
    title: string;
    summary: string;
    publishedDate: string;
  };
}

const LinkedInPost = ({ post }: LinkedInPostProps) => {
  return (
    <a 
      key={post.id}
      href={post.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group bg-white rounded-lg shadow-md hover:shadow-lg p-6 transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full"
    >
      <h3 className="text-xl font-display font-bold mb-3 group-hover:text-latum-blue transition-colors duration-300">{post.title}</h3>
      <p className="text-gray-700 mb-4 flex-grow">{post.summary}</p>
      
      <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
        <div className="flex items-center">
          <Calendar size={14} className="mr-1" />
          <span>{new Date(post.publishedDate).toLocaleDateString()}</span>
        </div>
        
        <div className="flex items-center text-latum-blue">
          <span className="mr-1">Read more</span>
          <ExternalLink size={14} />
        </div>
      </div>
    </a>
  );
};

export default LinkedInPost;
