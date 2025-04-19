import React from 'react';
import { SectionTitle } from './SectionTitle';

export const Research: React.FC = () => {
  return (
    <section id="research" className="py-8">
      <SectionTitle icon="🌋" title="Research Interests" />
      <div className="mt-4 text-lg">
        <p>
          My main research focuses on natural language processing and machine learning. 
          I am particularly interested in efficient LLMs and Agent. My goal is to build LLMs that can be a daily human assistant.
        </p>
      </div>
    </section>
  );
};