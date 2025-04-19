import React from 'react';
import { FileText, Code, BookOpen } from 'lucide-react';

interface Publication {
  id: number;
  title: string;
  authors: string;
  venue: string;
  links: {
    paper?: string;
    code?: string;
    blog?: string;
  };
}

interface PublicationCardProps {
  publication: Publication;
}

export const PublicationCard: React.FC<PublicationCardProps> = ({ publication }) => {
  const highlightOwnName = (authors: string) => {
    return authors.replace('Xiang Liu', '<strong>Xiang Liu</strong>');
  };

  return (
    <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 transition-all hover:shadow-md duration-300">
      <h3 className="text-xl font-semibold text-blue-800">{publication.title}</h3>
      <p 
        className="mt-2 text-gray-700"
        dangerouslySetInnerHTML={{ __html: highlightOwnName(publication.authors) }}
      />
      <p className="mt-1 text-gray-600 font-medium">{publication.venue}</p>
      
      <div className="mt-4 flex flex-wrap gap-3">
        {publication.links.paper && (
          <a 
            href={publication.links.paper} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full hover:bg-blue-200 transition-colors"
          >
            <FileText size={16} />
            Paper
          </a>
        )}
        
        {publication.links.code && (
          <a 
            href={publication.links.code} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full hover:bg-gray-200 transition-colors"
          >
            <Code size={16} />
            Code
          </a>
        )}
        
        {publication.links.blog && (
          <a 
            href={publication.links.blog} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full hover:bg-green-200 transition-colors"
          >
            <BookOpen size={16} />
            Blog
          </a>
        )}
      </div>
    </div>
  );
};