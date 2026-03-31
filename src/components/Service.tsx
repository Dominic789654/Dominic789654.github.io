import React from 'react';
import { motion, useInView } from 'framer-motion';
import { SectionTitle } from './SectionTitle';
import { MessageSquare } from 'lucide-react';
import { UNIFIED_CARD_CLASS } from './cardStyles';

export const Service: React.FC = () => {
  const containerRef = React.useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const services = [
    {
      id: 1,
      title: "Conference Reviewer",
      items: "ICLR 2025-2026, ICML 2025-2026, ACL 2024-2026, NeurIPS 2024-2025, EMNLP 2023-2025, AAAI 2026"
    },
    {
      id: 2,
      title: "Journal Reviewer",
      items: "TMLR, Neural Networks"
    }
  ];

  return (
    <section id="service" className="py-8">
      <SectionTitle icon="💬" title="Academic Service" />
      <div ref={containerRef} className="mt-6 space-y-4">
        {services.map((service, idx) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className={`${UNIFIED_CARD_CLASS} flex items-start gap-4 p-5 group`}
          >
            <motion.div
              initial={{ scale: 0, rotate: -90 }}
              animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -90 }}
              transition={{ duration: 0.5, delay: idx * 0.1 + 0.15 }}
              className="text-blue-500 flex-shrink-0"
            >
              <MessageSquare size={24} />
            </motion.div>
            <div className="flex-1">
              <motion.h3
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 + 0.2 }}
                className="text-lg font-semibold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
              >
                {service.title}
              </motion.h3>
              <motion.p
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 + 0.25 }}
                className="mt-1 text-slate-600 dark:text-slate-300"
              >
                {service.items}
              </motion.p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
