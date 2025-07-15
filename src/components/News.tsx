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
      date: 'July 2025 - Jan 2026',
      content: 'Visiting Student at NYU with Prof. Eunsol Choi</a>',
      isNew: true
    },
    {
      id: 1,
      date: 'May 2025',
      content: 'One paper accepted by ICML 2025 !!',
      isNew: true
    },
    {
      id: 2,
      date: 'January 2025',
      content: 'One paper accepted by AAAI 2024 Oral !!',
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