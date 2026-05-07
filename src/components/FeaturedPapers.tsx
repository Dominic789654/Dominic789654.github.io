import React from 'react';
import { motion, useInView } from 'framer-motion';
import { SectionTitle } from './SectionTitle';
import chunkkvFig from '../assets/images/papers/chunkkv.png';
import longgenFig from '../assets/images/papers/longgenbench.png';
import diffadaptFig from '../assets/images/papers/diffadapt.png';

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
    id: 'chunkkv',
    title: 'ChunkKV: Semantic-Preserving KV Cache Compression for Efficient Long-Context LLM Inference',
    venue: 'NeurIPS 2025',
    oneliner:
      'Token-level eviction throws away semantic locality. ChunkKV groups related tokens into chunks and keeps only the most informative ones — preserving meaning that single-token methods destroy.',
    figure: chunkkvFig,
    link: 'https://arxiv.org/abs/2502.00299',
  },
  {
    id: 'longgenbench',
    title: 'LongGenBench: Long-context Generation Benchmark',
    venue: 'EMNLP Findings 2024',
    oneliner:
      'Long-context evaluations focused on retrieval — but real applications generate long answers. LongGenBench is the first benchmark targeting long-context generation, exposing a gap mainstream LLMs hide.',
    figure: longgenFig,
    link: 'https://arxiv.org/abs/2410.04199',
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
      <div className="overflow-hidden bg-paper-2 dark:bg-[#262220] border-b border-rule dark:border-[#4A443C]">
        <img
          src={paper.figure}
          alt={`${paper.title} — figure`}
          loading="lazy"
          className="w-full h-auto block transition-transform duration-500 group-hover:scale-[1.015]"
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
        {featured.map((paper, idx) => (
          <PaperCard key={paper.id} paper={paper} index={idx} />
        ))}
      </div>
    </section>
  );
};
