import React from 'react';
import { motion } from 'framer-motion';

interface SectionTitleProps {
  icon: string;
  title: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ icon, title }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      className="flex items-center gap-3 mb-6 pb-4 border-b border-rule"
    >
      <span className="text-2xl">{icon}</span>
      <h2 className="font-serif text-2xl md:text-3xl font-normal text-ink tracking-tight">
        {title}
      </h2>
    </motion.div>
  );
};
