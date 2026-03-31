import React from "react";
import { motion, useInView } from "framer-motion";
import { SectionTitle } from "./SectionTitle";
import { Trophy } from "lucide-react";
import { UNIFIED_CARD_CLASS } from "./cardStyles";

export const Awards: React.FC = () => {
  const containerRef = React.useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const awards = [
    {
      id: 1,
      title: "NeurIPS 2025 Travel Award",
      description: "2025",
    },
    {
      id: 2,
      title: "HKUST Overseas Research Award",
      description: "2025",
    },
    {
      id: 3,
      title: "HKUST(GZ) Info Hub & DSA Thrust Research Travel Grant",
      description: "2024, 2025, 2026",
    },
    {
      id: 4,
      title: "AAAI 2024 Oral Award",
      description:
        "Paper: ParZC: Parametric Zero-Cost Proxies for Efficient NAS",
    },
    {
      id: 5,
      title: "NeurIPS 2024 Top Reviewer",
      description: "Selected as top reviewer for both main and D&B tracks",
    },
    {
      id: 6,
      title: "OpenAI's Researcher Access Program ",
      description: "2024",
    },
  ];

  return (
    <section id="awards" className="py-8">
      <SectionTitle icon="🏆" title="Awards & Honors" />
      <div ref={containerRef} className="mt-6 space-y-4">
        {awards.map((award, idx) => (
          <motion.div
            key={award.id}
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.4, delay: idx * 0.08 }}
            className={`${UNIFIED_CARD_CLASS} flex items-start gap-4 p-5 group`}
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
              transition={{ duration: 0.5, delay: idx * 0.08 + 0.15 }}
              className="text-yellow-500 flex-shrink-0"
            >
              <Trophy size={24} />
            </motion.div>
            <div className="flex-1">
              <motion.h3
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.08 + 0.2 }}
                className="text-lg font-semibold text-slate-800 dark:text-slate-100 group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors"
              >
                {award.title}
              </motion.h3>
              <motion.p
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.08 + 0.25 }}
                className="mt-1 text-slate-600 dark:text-slate-300"
              >
                {award.description}
              </motion.p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
