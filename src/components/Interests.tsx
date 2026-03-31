import React from 'react';
import { motion, useInView } from 'framer-motion';
import { SectionTitle } from './SectionTitle';
import { UNIFIED_CARD_CLASS } from './cardStyles';

export const Interests: React.FC = () => {
  const containerRef = React.useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const interests = [
    { id: 1, emoji: "🏸", name: "Badminton" },
    { id: 2, emoji: "🏋️‍♂️", name: "Workout" },
    { id: 3, emoji: "🏃‍♂️", name: "Running" }
  ];

  return (
    <section id="interests" className="py-8">
      <SectionTitle icon="🤗" title="Personal Interests" />
      <div ref={containerRef} className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
        {interests.map((interest, idx) => (
          <motion.div
            key={interest.id}
            initial={{ opacity: 0, scale: 0.6, rotate: -15 }}
            animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0.6, rotate: -15 }}
            transition={{ 
              duration: 0.4, 
              delay: idx * 0.08,
              type: "spring",
              stiffness: 100
            }}
            className={`${UNIFIED_CARD_CLASS} flex items-center gap-3 p-4 group`}
          >
            <motion.span
              animate={isInView ? { rotate: [0, 10, -10, 0] } : { rotate: 0 }}
              transition={{ duration: 2, repeat: Infinity, delay: idx * 0.2 }}
              className="text-2xl"
            >
              {interest.emoji}
            </motion.span>
            <span className="font-medium text-slate-700 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {interest.name}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
