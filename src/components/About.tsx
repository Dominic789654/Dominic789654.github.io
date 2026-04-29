import React from "react";
import { motion, useInView } from "framer-motion";
import { SectionTitle } from "./SectionTitle";

export const About: React.FC = () => {
  const containerRef = React.useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const paragraphs = [
    {
      id: 1,
      content: (
        <>
          I study efficient and reliable large language models, with a focus on
          token-efficient reasoning, long-context inference, evaluation,
          retrieval, and agentic systems.
        </>
      ),
    },
    {
      id: 2,
      content: (
        <>
          I am a PhD student in Data Science and Analytics (DSA) Thrust at the
          Hong Kong University of Science and Technology (Guangzhou), advised
          by{" "}
          <a href="https://sites.google.com/view/chuxiaowen">
            Prof. Xiaowen Chu
          </a>{" "}
          and{" "}
          <a href="https://xuminghu.github.io/">
            Prof. Xuming HU
          </a>
          . I was also a visiting student at NYU Center for Data Science,
          working with{" "}
          <a href="https://eunsol.github.io/">
            Prof. Eunsol Choi
          </a>
          , and previously a research intern at HKUST, working with{" "}
          <a href="https://tongzhang-ml.org/">
            Prof. Tong Zhang
          </a>
          .
        </>
      ),
    },
    {
      id: 3,
      content: (
        <>
          Before HKUST(GZ), I received an M.S. in Computer Science from HKU and
          a B.S. in Computer Science from GMU.
        </>
      ),
    },
  ];

  const highlightContent = (
    <>
      I am actively seeking LLM research internship opportunities for
      Summer/Fall 2026.
    </>
  );

  return (
    <section id="about" className="py-8">
      <SectionTitle icon="👋" title="About Me" />
      <div ref={containerRef} className="mt-4 font-serif text-lg leading-relaxed space-y-4 text-ink-2 dark:text-[#C4BFB5]">
        {paragraphs.map((para, idx) => (
          <motion.p
            key={para.id}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: idx * 0.12 }}
          >
            {para.content}
          </motion.p>
        ))}

        {/* Highlight with pulse */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.36 }}
          className="mt-4 text-accent dark:text-[#D4847C] font-medium px-4 py-3 border border-accent/20 dark:border-[#B85C5C]/30 bg-accent-soft dark:bg-[#B85C5C]/10"
        >
          <motion.span
            animate={isInView ? { opacity: [0.6, 1, 0.6] } : { opacity: 0.6 }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            {highlightContent}
          </motion.span>
        </motion.p>
      </div>
    </section>
  );
};
