import React from 'react';
import { motion, useInView } from 'framer-motion';
import { SectionTitle } from './SectionTitle';
import macaronFig from '../assets/images/papers/macaron.png';
import semanticIntegrityFig from '../assets/images/papers/semantic-integrity.png';
import mdnFig from '../assets/images/papers/mdn.png';
import diffadaptFig from '../assets/images/papers/diffadapt.png';
import reasoningServingFig from '../assets/images/papers/reasoning-serving.png';

interface FeaturedPaper {
  id: string;
  title: string;
  venue: string;
  oneliner: string;
  figure: string;
  link: string;
}

const featured: FeaturedPaper[] = [
  {
    id: 'macaron-v1',
    title: 'Macaron v1 (Preview): A Personal Agent for Everyday Life',
    venue: 'Macaron AI · 2026',
    oneliner:
      'Built during my internship at Macaron AI Mind Lab. Macaron v1 is a personal agent for everyday life, achieving state-of-the-art results across agentic benchmarks including Macaron Livingbench, A2UI Bench, VitaBench, and PinchBench.',
    figure: macaronFig,
    link: 'https://macaron.im/mindlab/research/macaron-v1-preview',
  },
  {
    id: 'semantic-integrity',
    title: 'Semantic Integrity Matters: Benchmarking and Preserving High-Density Reasoning in KV Cache Compression',
    venue: 'ICML 2026',
    oneliner:
      'KV cache compression can silently damage dense reasoning traces. We benchmark semantic integrity and study how to preserve reasoning-critical context under compression.',
    figure: semanticIntegrityFig,
    link: 'https://arxiv.org/abs/2502.01941',
  },
  {
    id: 'mdn',
    title: 'MDN: Parallelizing Stepwise Momentum for Delta Linear Attention',
    venue: 'ICML 2026',
    oneliner:
      'Delta linear attention is bottlenecked by stepwise momentum. MDN parallelizes the recurrence so long-context sequence modeling can keep momentum without serial decoding costs.',
    figure: mdnFig,
    link: 'https://arxiv.org/abs/2605.05838',
  },
  {
    id: 'diffadapt',
    title: 'DiffAdapt: Difficulty-Adaptive Reasoning for Token-Efficient LLM Inference',
    venue: 'ICLR 2026',
    oneliner:
      'Reasoning models overthink easy questions and underthink hard ones — a U-shaped entropy curve we visualise across difficulty. DiffAdapt adapts compute per-difficulty, cutting tokens without losing accuracy.',
    figure: diffadaptFig,
    link: 'https://arxiv.org/abs/2510.19669',
  },
  {
    id: 'reasoning-serving',
    title: 'Reasoning Language Model Inference Serving Unveiled: An Empirical Study',
    venue: 'ICLR 2026',
    oneliner:
      'Reasoning workloads shift inference bottlenecks through longer traces, bursty token budgets, and scheduler pressure. This study maps where serving systems spend time.',
    figure: reasoningServingFig,
    link: 'https://arxiv.org/pdf/2510.18672',
  },
];

const PaperCard: React.FC<{ paper: FeaturedPaper; index: number }> = ({ paper, index }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.a
      ref={ref}
      href={paper.link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.55, delay: index * 0.12, ease: 'easeOut' }}
      className="no-underline group block border border-rule dark:border-[#4A443C] bg-paper dark:bg-[#2A2520] overflow-hidden transition-all duration-300 hover:border-accent/40 dark:hover:border-[#E89B7A]/40"
    >
      <div className="aspect-[16/7] overflow-hidden bg-white dark:bg-[#F7F3EA] border-b border-rule dark:border-[#4A443C]">
        <img
          src={paper.figure}
          alt={`${paper.title} — figure`}
          loading="lazy"
          className="h-full w-full object-contain p-4 transition-transform duration-500 group-hover:scale-[1.015]"
        />
      </div>
      <div className="p-5 md:p-6">
        <p className="font-mono text-xs tracking-widest uppercase text-accent dark:text-[#E89B7A]">
          {paper.venue}
        </p>
        <h3 className="mt-2 font-serif text-lg md:text-xl font-medium text-ink dark:text-[#E8E4DC] leading-snug group-hover:text-accent dark:group-hover:text-[#E89B7A] transition-colors">
          {paper.title}
        </h3>
        <p className="mt-3 font-serif text-[15px] leading-relaxed text-ink-2 dark:text-[#D5D0C6]">
          {paper.oneliner}
        </p>
      </div>
    </motion.a>
  );
};

export const FeaturedPapers: React.FC = () => {
  return (
    <section id="featured" className="py-8">
      <SectionTitle icon="✦" title="Featured Papers" />
      <div className="grid gap-6 md:gap-7">
        {featured.slice(0, 3).map((paper, idx) => (
          <PaperCard key={paper.id} paper={paper} index={idx} />
        ))}
      </div>
    </section>
  );
};
