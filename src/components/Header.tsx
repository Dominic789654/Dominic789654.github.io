import React from "react";
import { motion } from "framer-motion";
import {
  Mail,
  FileText,
  Twitter,
  Github,
  GraduationCap,
  Sun,
  Moon,
} from "lucide-react";
import avatar from "../assets/images/profile/avatar.jpeg";
import cv from "../assets/cv/XiangLiu_resume_2026_02.pdf";
import { useTheme } from "../contexts/ThemeContext";
import { useCitations } from "../contexts/CitationContext";

const HIGHLIGHTS = [
  {
    title: "ICLR 2026",
    description:
      "Two accepted papers on token-efficient reasoning and LLM serving.",
  },
  {
    title: "NYU CDS",
    description:
      "Visiting student working with Prof. Eunsol Choi on retrieval and reasoning.",
  },
  {
    title: "Recognition",
    description:
      "NeurIPS Top Reviewer, Travel Award, and HKUST Overseas Research Award.",
  },
];

export const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { citations, hIndex } = useCitations();

  return (
    <header className="relative bg-paper dark:bg-[#1C1915] border-b border-rule dark:border-[#4A443C] overflow-hidden">
      <div className="relative max-w-4xl mx-auto py-16 px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row items-center md:items-start gap-10"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="w-44 h-44 overflow-hidden border border-rule dark:border-[#4A443C]">
              <img
                src={avatar}
                alt="Profile"
                className="w-full h-full object-cover"
                style={{ filter: "sepia(0.18) saturate(0.85) contrast(1.02)" }}
              />
            </div>
          </motion.div>

          <div className="text-center md:text-left flex-1">
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="font-serif text-4xl md:text-5xl font-normal text-ink dark:text-[#E8E4DC] tracking-tight"
            >
              Xiang Liu (刘翔)
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-3 flex items-center justify-center md:justify-start gap-3"
            >
              <p className="font-serif text-ink-3 dark:text-[#B8B2A6] text-lg">
                Hong Kong University of Science and Technology (Guangzhou)
              </p>
              <a
                href="https://scholar.google.com/citations?user=VtK5lwUAAAAJ"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-accent-soft dark:bg-[#E89B7A]/12 border border-accent/20 dark:border-[#E89B7A]/30 text-xs font-mono text-accent dark:text-[#E89B7A] transition-all duration-300 hover:bg-accent hover:text-white dark:hover:bg-[#E89B7A] dark:hover:text-[#1C1915] no-underline"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 24a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm0-24L0 9.5l4.838 3.94A8 8 0 0 1 12 9a8 8 0 0 1 7.162 4.44L24 9.5z" />
                </svg>
                <span>{citations ?? "..."}</span>
                <span className="text-accent/60 dark:text-[#E89B7A]/60">citations</span>
                {hIndex !== null && (
                  <>
                    <span className="text-accent/30 dark:text-[#E89B7A]/40 mx-0.5">·</span>
                    <span className="text-accent/70 dark:text-[#E89B7A]/80">H-index {hIndex}</span>
                  </>
                )}
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-2 font-mono text-xs text-ink-4 dark:text-[#9A958B] italic"
            >
              Pronouns: he/him
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-5 max-w-2xl font-serif text-sm md:text-base leading-7 text-ink-2 dark:text-[#D5D0C6]"
            >
              I work on efficient and reliable large language models, especially
              token-efficient inference, long-context evaluation, retrieval, and
              agentic workflows.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.85 }}
              className="mt-6 flex flex-wrap justify-center md:justify-start gap-3"
            >
              {[
                {
                  icon: Mail,
                  href: "mailto:xliu886@connect.hkust-gz.edu.cn",
                  title: "Email",
                },
                {
                  icon: GraduationCap,
                  href: "https://scholar.google.com/citations?user=VtK5lwUAAAAJ",
                  title: "Google Scholar",
                },
                {
                  icon: Twitter,
                  href: "https://twitter.com/Dominicliu12",
                  title: "Twitter",
                },
                {
                  icon: Github,
                  href: "https://github.com/Dominic789654",
                  title: "GitHub",
                },
                { icon: FileText, href: cv, title: "CV" },
              ].map((social, index) => (
                <motion.a
                  key={social.title}
                  href={social.href}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.95 + index * 0.1 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="no-underline bg-paper-2 dark:bg-[#262220] border border-rule dark:border-[#4A443C] p-2.5 text-ink-3 dark:text-[#B8B2A6] hover:text-accent dark:hover:text-[#E89B7A] hover:border-accent/30 dark:hover:border-[#E89B7A]/30 transition-all duration-300"
                  title={social.title}
                >
                  <social.icon size={22} />
                </motion.a>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="mt-8 grid gap-3 md:grid-cols-3"
            >
              {HIGHLIGHTS.map((highlight) => (
                <div
                  key={highlight.title}
                  className="border border-rule dark:border-[#4A443C] bg-paper dark:bg-[#2A2520] p-4 text-left"
                >
                  <p className="font-mono text-xs font-medium tracking-wide text-accent dark:text-[#E89B7A]">
                    {highlight.title}
                  </p>
                  <p className="mt-2 font-serif text-sm leading-6 text-ink-2 dark:text-[#D5D0C6]">
                    {highlight.description}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-paper dark:from-[#1C1915] to-transparent pointer-events-none" />

      {/* Theme toggle button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        onClick={toggleTheme}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="absolute top-4 right-4 md:top-6 md:right-6 bg-paper-2 dark:bg-[#262220] border border-rule dark:border-[#4A443C] p-3 text-ink-3 dark:text-[#B8B2A6] hover:text-accent dark:hover:text-[#E89B7A] transition-all duration-300"
        title={
          theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
        }
      >
        {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
      </motion.button>
    </header>
  );
};
