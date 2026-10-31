import React from 'react';
import { SectionTitle } from './SectionTitle';

export const Research: React.FC = () => {
  return (
    <section id="research" className="py-8">
      <SectionTitle icon="🌋" title="Research Interests" />
      <div className="mt-4 font-serif text-lg text-ink-2 dark:text-[#D5D0C6] leading-relaxed">
        <ul className="space-y-3 list-disc pl-5">
          <li>
            <strong className="font-medium text-ink dark:text-[#E8E4DC]">Efficient inference:</strong>{" "}
            long-context modeling, KV-cache compression, and memory-efficient
            serving for language and multimodal models.
          </li>
          <li>
            <strong className="font-medium text-ink dark:text-[#E8E4DC]">Reasoning and tool use:</strong>{" "}
            adaptive test-time compute, token-efficient reasoning, and reliable
            multi-turn tool calling.
          </li>
          <li>
            <strong className="font-medium text-ink dark:text-[#E8E4DC]">Agent memory:</strong>{" "}
            online memory, retrieval, and continual learning for agents that
            improve through interaction.
          </li>
        </ul>
      </div>
    </section>
  );
};
