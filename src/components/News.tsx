import React from 'react';
import { SectionTitle } from './SectionTitle';

interface NewsItem {
  id: number;
  date: string;
  content: string;
  isNew: boolean;
}

export const News: React.FC = () => {
  const newsItems: NewsItem[] = [
    {
      id: 1,
      date: 'Jan 2026',
      content: 'Two papers accepted by ICLR 2026: DiffAdapt and Reasoning Language Model Inference Serving Unveiled! 🎉',
      isNew: true
    },
    {
      id: 2,
      date: 'Oct 2025',
      content: 'FlowKV was accepted by NeurIPS 2025 Multi-Turn Interactions in Large Language Models Workshop',
      isNew: true
    },
    {
      id: 3,
      date: 'Sep 2025',
      content: 'ChunkKV was accepted by NeurIPS 2025 !!',
      isNew: true
    },
    
    {
      id: 4,
      date: 'Aug 2025',
      content: 'One paper accepted by EMNLP 2025 !!',
      isNew: true
    },
  ];

  return (
    <section id="news" className="py-8">
      <SectionTitle icon="🌱" title="What's New" />
      <div className="mt-4 space-y-4">
        {newsItems.map(item => (
          <div key={item.id} className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-blue-500 transition-transform hover:translate-x-1 duration-200">
            {item.isNew && (
              <span className="inline-block bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded mr-2">
                New!
              </span>
            )}
            <span className="text-sm font-semibold text-gray-500">{item.date}</span>
            <p className="mt-1">{item.content}</p>
          </div>
        ))}
      </div>
    </section>
  );
};