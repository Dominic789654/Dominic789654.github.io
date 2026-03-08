import React from 'react';
import { SectionTitle } from './SectionTitle';
import { UNIFIED_CARD_CLASS } from './cardStyles';

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
      date: 'Mar 2026',
      content: 'Our survey LLM Agent Memory: A Survey from a Unified Representation–Management Perspective was released on Preprints.',
      isNew: true
    },
    {
      id: 2,
      date: 'Feb 2026',
      content: 'From Literature to Lab: Closed-Loop Advancement of Perovskite Solar Cells via Domain Knowledge Guided LLM was released on arXiv.',
      isNew: true
    },
    {
      id: 3,
      date: 'Jan 2026',
      content: 'Two papers accepted by ICLR 2026: DiffAdapt and Reasoning Language Model Inference Serving Unveiled! 🎉',
      isNew: true
    },
    {
      id: 4,
      date: 'Jan 2026',
      content: 'SONIC: Segmented Optimized Nexus for Information Compression in Key-Value Caching was released on arXiv.',
      isNew: true
    },
    {
      id: 5,
      date: 'Nov 2025',
      content: 'Beyond Single Embeddings: Capturing Diverse Targets with Multi-Query Retrieval was released on arXiv.',
      isNew: true
    },
    {
      id: 6,
      date: 'Sep 2025',
      content: 'ChunkKV was accepted by NeurIPS 2025.',
      isNew: true
    },
    {
      id: 7,
      date: 'Aug 2025',
      content: 'Perovskite-LLM was accepted by EMNLP 2025 Findings.',
      isNew: false
    },
  ];

  return (
    <section id="news" className="py-8">
      <SectionTitle icon="🌱" title="What's New" />
      <div className="mt-4 space-y-4">
        {newsItems.map(item => (
          <div key={item.id} className={`${UNIFIED_CARD_CLASS} p-5`}>
            {item.isNew && (
              <span className="inline-block bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded mr-2">
                New!
              </span>
            )}
            <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">{item.date}</span>
            <p className="mt-1 text-slate-700 dark:text-slate-200">{item.content}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
