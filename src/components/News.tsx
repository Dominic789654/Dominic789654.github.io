import React from "react";
import { motion, useInView } from "framer-motion";
import { SectionTitle } from "./SectionTitle";

interface NewsItem {
  id: number;
  date: string;
  content: string;
  isNew: boolean;
}

export const News: React.FC = () => {
  const containerRef = React.useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const newsItems: NewsItem[] = [
    {
      id: 1,
      date: "May 2026",
      content:
        "Two papers accepted by ICML 2026: Semantic Integrity Matters and MDN! See you in Seoul! 🎉",
      isNew: true,
    },
    {
      id: 2,
      date: "Jan 2026",
      content:
        "Two papers accepted by ICLR 2026: DiffAdapt and Reasoning Language Model Inference Serving Unveiled! 🎉",
      isNew: true,
    },
    {
      id: 3,
      date: "Sep 2025",
      content: "ChunkKV was accepted by NeurIPS 2025.",
      isNew: false,
    },
    {
      id: 4,
      date: "Aug 2025",
      content: "Perovskite-LLM was accepted by EMNLP 2025 Findings.",
      isNew: false,
    },
  ];

  return (
    <section id="news" className="py-8">
      <SectionTitle icon="📰" title="What's New" />
      <div ref={containerRef} className="mt-4">
        <ul className="border-t border-rule dark:border-[#4A443C]">
          {newsItems.map((item, idx) => (
            <motion.li
              key={item.id}
              initial={{ opacity: 0, x: 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
              transition={{ duration: 0.4, delay: idx * 0.06 }}
              className="grid grid-cols-[96px_1fr] gap-5 py-3 border-b border-rule-2 dark:border-[#3A3530] items-baseline"
            >
              <span className="font-mono text-xs tracking-wide text-ink-3 dark:text-[#B8B2A6] uppercase whitespace-nowrap">
                {item.date}
              </span>
              <div>
                {item.isNew && (
                  <motion.span
                    animate={{ opacity: [0.8, 1, 0.8] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="inline-block bg-accent dark:bg-[#D4A27F] text-white dark:text-[#1C1915] text-xs font-semibold px-2 py-0.5 rounded mr-2"
                  >
                    New!
                  </motion.span>
                )}
                <span className="font-serif text-ink-2 dark:text-[#D5D0C6] leading-relaxed">
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
