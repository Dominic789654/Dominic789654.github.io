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
  const FRONT_COUNT = 5;
  const [showEarlier, setShowEarlier] = React.useState(false);
  const containerRef = React.useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const newsItems: NewsItem[] = [
    {
      id: -12,
      date: "Oct 2026",
      content: (
        <>
          Opened a <a href="#blog">Blog</a>, starting with a research note on
          Serving DiffAdapt via Decision APIs ({""}
          <a href="blog/serving-diffadapt-via-decision-apis.html">English</a>
          {" · "}
          <a href="blog/serving-diffadapt-via-decision-apis.zh.html" lang="zh-Hans">中文</a>
          ).
        </>
      ),
      isNew: true,
    },
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
      id: -6,
      date: "Oct 2026",
      content: (
        <>
          <a
            href="https://aclanthology.org/2026.emnlp-main.462/"
            target="_blank"
            rel="noopener noreferrer"
          >
            NestedKV
          </a>
          {` and `}
          <a
            href="https://aclanthology.org/2026.emnlp-main.771/"
            target="_blank"
            rel="noopener noreferrer"
          >
            CondenseVLM
          </a>
          {` were accepted to EMNLP 2026 (main conference, poster).`}
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
      id: -9,
      date: "Oct 2026",
      content: "NAACL 2027 Area Chair (ARR Oct).",
      isNew: true,
    },
    {
      id: -10,
      date: "Aug 2026",
      content: (
        <>
          The full Macaron-V1 technical report is now on{` `}
          <a
            href="https://arxiv.org/abs/2608.09819"
            target="_blank"
            rel="noopener noreferrer"
          >
            arXiv
          </a>
          , following the June Preview.
        </>
      ),
      isNew: false,
    },
    {
      id: -2,
      date: "Jul 2026",
      content:
        "Started as an Algorithm Research Intern at UniPat. Research internship at Mind Lab / Macaron AI ended.",
      isNew: true,
    },
    {
      id: -11,
      date: "Jul 2026",
      content: (
        <>
          Probing the Plasticity and Correlation of LLM Value Systems appeared
          in{` `}
          <a
            href="https://aclanthology.org/2026.findings-acl.1715/"
            target="_blank"
            rel="noopener noreferrer"
          >
            ACL 2026 Findings
          </a>
          ; CAFES appeared at the{` `}
          <a
            href="https://aclanthology.org/2026.alvr-main.10/"
            target="_blank"
            rel="noopener noreferrer"
          >
            ALVR 2026 workshop
          </a>
          .
        </>
      ),
      isNew: false,
    },
    {
      id: -7,
      date: "2026",
      content: (
        <>
          The LLM Agent Memory survey was accepted to AACL-IJCNLP 2026. Read the{` `}
          <a
            href="https://www.preprints.org/manuscript/202603.0359/v2"
            target="_blank"
            rel="noopener noreferrer"
          >
            preprint
          </a>
          .
        </>
      ),
      isNew: false,
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
      isNew: false,
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
      isNew: false,
    },
    {
      id: 1,
      date: "May 2026",
      content:
        "Two papers accepted by ICML 2026: Semantic Integrity Matters and MDN! See you in Seoul! 🎉",
      isNew: false,
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
          {(showEarlier ? newsItems : newsItems.slice(0, FRONT_COUNT)).map((item, idx) => (
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
        {newsItems.length > FRONT_COUNT && (
          <button
            type="button"
            onClick={() => setShowEarlier((open) => !open)}
            aria-expanded={showEarlier}
            className="mt-4 font-mono text-xs text-accent dark:text-[#E89B7A] border-b border-dotted border-accent/40 dark:border-[#E89B7A]/40 hover:border-accent dark:hover:border-[#E89B7A]"
          >
            {showEarlier
              ? "− Show fewer"
              : `+ ${newsItems.length - FRONT_COUNT} earlier`}
          </button>
        )}
      </div>
    </section>
  );
};
