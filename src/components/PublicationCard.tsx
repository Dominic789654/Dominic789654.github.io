import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Code, BookOpen, ExternalLink } from 'lucide-react';

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
  index?: number;
}

export const PublicationCard: React.FC<PublicationCardProps> = ({ publication, index = 0 }) => {
  const highlightOwnName = (authors: string) => {
    return authors.replace(/Xiang Liu/g, '\u003cstrong class="text-blue-600"\u003eXiang Liu\u003c/strong\u003e');
  };

  const linkVariants = {
    paper: { bg: 'bg-blue-50', bgHover: 'hover:bg-blue-100', text: 'text-blue-700', border: 'border-blue-200' },
    code: { bg: 'bg-gray-50', bgHover: 'hover:bg-gray-100', text: 'text-gray-700', border: 'border-gray-200' },
    blog: { bg: 'bg-green-50', bgHover: 'hover:bg-green-100', text: 'text-green-700', border: 'border-green-200' },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -4, boxShadow: '0 12px 24px -8px rgba(30, 58, 138, 0.15)' }}
      className="group bg-gradient-to-br from-white to-slate-50/50 p-5 rounded-xl border border-gray-100/80 shadow-sm hover:shadow-lg transition-all duration-300"
    >
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: '40px' }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 + index * 0.05 }}
        className="h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mb-4"
      />

      <h3 className="text-xl font-semibold text-slate-800 group-hover:text-blue-700 transition-colors leading-snug">
        {publication.title}
      </h3>

      <p
        className="mt-2.5 text-gray-600 text-sm leading-relaxed"
        dangerouslySetInnerHTML={{ __html: highlightOwnName(publication.authors) }}
      />

      <p className="mt-2 text-blue-900/70 font-medium text-sm bg-blue-50/50 inline-block px-2.5 py-1 rounded-full">
        {publication.venue}
      </p>

      <div className="mt-4 flex flex-wrap gap-2.5">
        {publication.links.paper && (
          <motion.a
            href={publication.links.paper}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border ${linkVariants.paper.bg} ${linkVariants.paper.bgHover} ${linkVariants.paper.text} ${linkVariants.paper.border} transition-all`}
          >
            <FileText size={14} />
            Paper
            <ExternalLink size={11} className="opacity-60" />
          </motion.a>
        )}

        {publication.links.code && (
          <motion.a
            href={publication.links.code}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border ${linkVariants.code.bg} ${linkVariants.code.bgHover} ${linkVariants.code.text} ${linkVariants.code.border} transition-all`}
          >
            <Code size={14} />
            Code
            <ExternalLink size={11} className="opacity-60" />
          </motion.a>
        )}

        {publication.links.blog && (
          <motion.a
            href={publication.links.blog}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border ${linkVariants.blog.bg} ${linkVariants.blog.bgHover} ${linkVariants.blog.text} ${linkVariants.blog.border} transition-all`}
          >
            <BookOpen size={14} />
            Blog
            <ExternalLink size={11} className="opacity-60" />
          </motion.a>
        )}
      </div>
    </motion.div>
  );
};
