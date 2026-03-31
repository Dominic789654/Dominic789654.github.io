import React from 'react';
import { motion, useInView } from 'framer-motion';
import { SectionTitle } from './SectionTitle';

interface ExperienceItem {
  id: number;
  organization: string;
  period: string;
  description: string;
}

export const Experience: React.FC = () => {
  const containerRef = React.useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const experiences: ExperienceItem[] = [
    {
      id: 1,
      organization: "NYU Center for Data Science",
      period: "07/2025–01/2026",
      description: "Visiting Student, supervised by Prof. Eunsol Choi"
    },
    {
      id: 2,
      organization: "HKUST(GZ)",
      period: "09/2023–Present",
      description: "Ph.D. student, supervised by Prof. Xiaowen Chu and Prof. Xuming HU"
    },
    {
      id: 3,
      organization: "HKUST",
      period: "12/2022–08/2023",
      description: "Research Intern, supervised by Prof. Tong Zhang"
    },
    {
      id: 4,
      organization: "Baidu Research Cognitive Computing Lab",
      period: "12/2021–06/2022",
      description: "Research Intern, supervised by Mingming Sun"
    }
  ];

  const teachingExperiences: ExperienceItem[] = [
    {
      id: 1,
      organization: "HKUST(GZ)",
      period: "Fall 2024",
      description: "TA - AIAA 5088 Natural Language Processing and Its Applications"
    },
    {
      id: 2,
      organization: "HKUST(GZ)",
      period: "Summer 2024",
      description: "TA - RBCC Red Bird Challenge Camp"
    }
  ];

  const ExperienceItemComponent: React.FC<{ item: ExperienceItem; index: number; isTeaching: boolean }> = ({ item, index, isTeaching }) => {
    return (
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="relative pl-8 pb-4 border-l-2 border-blue-300 dark:border-blue-700 group"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 + 0.15 }}
          className="absolute left-[-8px] top-0 w-4 h-4 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full shadow-lg"
        />
        <motion.h3
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
          className="text-xl font-semibold text-gray-800 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
        >
          {item.organization}
        </motion.h3>
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 + 0.25 }}
          className="mt-1 text-gray-500 dark:text-gray-400 font-mono text-sm"
        >
          {item.period}
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
          className="mt-2 text-gray-700 dark:text-gray-300"
        >
          {item.description}
        </motion.p>
      </motion.div>
    );
  };

  return (
    <section id="experience" className="py-8">
      <SectionTitle icon="🔬" title="Research Experience" />
      <div ref={containerRef} className="mt-6 space-y-8">
        {experiences.map((exp, idx) => (
          <ExperienceItemComponent key={exp.id} item={exp} index={idx} isTeaching={false} />
        ))}
      </div>

      <div className="mt-12">
        <SectionTitle icon="👨‍🏫" title="Teaching Experience" />
        <div className="mt-6 space-y-8">
          {teachingExperiences.map((exp, idx) => (
            <ExperienceItemComponent key={exp.id} item={exp} index={idx} isTeaching={true} />
          ))}
        </div>
      </div>
    </section>
  );
};
