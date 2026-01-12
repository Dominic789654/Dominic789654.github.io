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
      className="flex items-center gap-3 mb-6"
    >
      <motion.div
        className="text-2xl bg-gradient-to-br from-blue-600 to-cyan-500 bg-clip-text"
      >
        {icon}
      </motion.div>
      <div className="flex-1">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-800">
          {title}
        </h2>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: '60px' }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mt-2"
        />
      </div>
    </motion.div>
  );
};
