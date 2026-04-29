import React from 'react';
import { motion, useInView } from 'framer-motion';
import { SectionTitle } from './SectionTitle';

interface NewsItem {
  id: number;
  date: string;
  content: string;
  isNew: boolean;
}

export const News: React.FC = () => {
  const containerRef = React.useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

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
      <SectionTitle icon="📰" title="What's New" />
      <div ref={containerRef} className="mt-4">
        <ul className="border-t border-rule">
          {newsItems.map((item, idx) => (
            <motion.li
              key={item.id}
              initial={{ opacity: 0, x: 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
              transition={{ duration: 0.4, delay: idx * 0.06 }}
              className="grid grid-cols-[96px_1fr] gap-5 py-3 border-b border-rule-2 items-baseline"
            >
              <span className="font-mono text-xs tracking-wide text-ink-3 uppercase whitespace-nowrap">
                {item.date}
              </span>
              <div>
                {item.isNew && (
                  <motion.span
                    animate={{ opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="inline-block bg-accent text-white text-xs font-semibold px-2 py-0.5 rounded mr-2"
                  >
                    New!
                  </motion.span>
                )}
                <span className="font-serif text-ink-2 leading-relaxed">
                  {item.content}
                </span>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
};
