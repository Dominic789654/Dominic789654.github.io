import React from "react";
import { motion, useInView } from "framer-motion";
import { SectionTitle } from "./SectionTitle";

interface NewsItem {
  id: number;
  date: string;
  content: React.ReactNode;
  isNew: boolean;
}

export const News: React.FC = () => {
  const containerRef = React.useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const newsItems: NewsItem[] = [
    {
      id: -8,
      date: "2026",
      content: (
        <>
          δ-mem was accepted to NeurIPS 2026. Read the{` `}
          <a
            href="https://arxiv.org/abs/2605.12357"
            target="_blank"
            rel="noopener noreferrer"
          >
            paper
          </a>
          .
        </>
      ),
      isNew: true,
    },
    {
      id: -7,
      date: "2026",
      content:
        "The LLM Agent Memory survey was accepted to AACL-IJCNLP 2026.",
      isNew: true,
    },
    {
      id: -6,
      date: "Oct 2026",
      content: (
        <>
          NestedKV was accepted to EMNLP 2026 (main conference, poster). Read the{` `}
          <a
            href="https://aclanthology.org/2026.emnlp-main.462/"
            target="_blank"
            rel="noopener noreferrer"
          >
            paper
          </a>
          .
        </>
      ),
      isNew: true,
    },
    {
      id: -5,
      date: "Oct 2026",
      content: (
        <>
          CondenseVLM was accepted to EMNLP 2026 (main conference, poster). Read the{` `}
          <a
            href="https://aclanthology.org/2026.emnlp-main.771/"
            target="_blank"
            rel="noopener noreferrer"
          >
            paper
          </a>
          .
        </>
      ),
      isNew: true,
    },
    {
      id: -4,
      date: "Oct 2026",
      content: (
        <>
          EVOQUANT was accepted to FinNLP 2026 (EMNLP workshop, poster). Read the{` `}
          <a
            href="https://aclanthology.org/2026.finnlp-1.60/"
            target="_blank"
            rel="noopener noreferrer"
          >
            paper
          </a>
          .
        </>
      ),
      isNew: true,
    },
    {
      id: -2,
      date: "Jul 2026",
      content: "Started as an Algorithm Research Intern at UniPat.",
      isNew: true,
    },
    {
      id: -1,
      date: "Jun 2026",
      content: (
        <>
          Macaron v1 (Preview) is out from Macaron AI&apos;s Mind Lab! Read the{` `}
          <a
            href="https://macaron.im/mindlab/research/macaron-v1-preview"
            target="_blank"
            rel="noopener noreferrer"
          >
            technical report
          </a>{` `}
          🥐
        </>
      ),
      isNew: true,
    },
    {
      id: 0,
      date: "May 2026",
      content: (
        <>
          New position paper on arXiv: Energy-to-Token — rethinking how we
          evaluate LLM inference. Visit the{` `}
          <a
            href="https://dominic789654.github.io/energy-to-token/"
            target="_blank"
            rel="noopener noreferrer"
          >
            project page
          </a>{` `}
          ⚡
        </>
      ),
      isNew: true,
    },
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
      isNew: false,
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
                    className="inline-block bg-accent dark:bg-[#E89B7A] text-white dark:text-[#1C1915] text-xs font-semibold px-2 py-0.5 rounded mr-2"
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
