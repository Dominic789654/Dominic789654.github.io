import React from 'react';
import { SectionTitle } from './SectionTitle';

export const Research: React.FC = () => {
  return (
    <section id="research" className="py-8">
      <SectionTitle icon="🌋" title="Research Interests" />
      <div className="mt-4 font-serif text-lg text-ink-2 dark:text-[#D5D0C6] leading-relaxed">
        <p>
          My research focuses on natural language processing and machine
          learning, especially efficient LLM inference, long-context modeling,
          retrieval, and agentic systems. I aim to build language models that
          are reliable, efficient, and useful in everyday workflows.
        </p>
      </div>
    </section>
  );
};
