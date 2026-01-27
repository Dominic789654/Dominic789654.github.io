import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, FileText, Twitter, Github, GraduationCap, Sun, Moon } from 'lucide-react';
import avatar from '../assets/images/profile/avatar.jpeg';
import cv from '../assets/cv/XiangLiu_resume_2025_12.pdf';
import { ParticlesBackground } from './ParticlesBackground';
import { useTheme } from '../contexts/ThemeContext';

const TYPING_TEXTS = [
  'PhD Student in Data Science and Analytics',
  'Large Language Model Research',
  'Efficient AI & ML Systems',
  'Automated Neural Architecture Search',
];

export const Header: React.FC = () => {
  const [textIndex, setTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const currentText = TYPING_TEXTS[textIndex];
    const timeout = setTimeout(() => {
      setDisplayText(prev => {
        if (!isDeleting) {
          if (prev === currentText) {
            setTimeout(() => setIsDeleting(true), 1500);
            return prev;
          }
          return currentText.slice(0, prev.length + 1);
        } else {
          if (prev === '') {
            setIsDeleting(false);
            setTextIndex(prev => (prev + 1) % TYPING_TEXTS.length);
            return '';
          }
          return currentText.slice(0, prev.length - 1);
        }
      });
    }, isDeleting ? 30 : 80);

    return () => clearTimeout(timeout);
  }, [textIndex, displayText, isDeleting]);

  return (
    <header className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white overflow-hidden">
      <ParticlesBackground />

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
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
            <div className="relative w-44 h-44 rounded-full overflow-hidden border-3 border-white/30 shadow-2xl backdrop-blur-sm">
              <img
                src={avatar}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          <div className="text-center md:text-left flex-1">
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent"
            >
              Xiang Liu (刘翔)
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-5"
            >
              <div className="flex items-center justify-center md:justify-start gap-2 text-xl min-h-[28px]">
                <span className="text-blue-200">{displayText}</span>
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="inline-block w-0.5 h-6 bg-blue-300 ml-1"
                />
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-3 text-blue-200/80 text-lg"
            >
              Hong Kong University of Science and Technology (Guangzhou)
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="mt-2 text-blue-300/60 italic text-sm"
            >
              Pronouns: he/him
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="mt-8 flex flex-wrap justify-center md:justify-start gap-3"
            >
              {[
                { icon: Mail, href: 'mailto:xliu886@connect.hkust-gz.edu.cn', title: 'Email' },
                { icon: GraduationCap, href: 'https://scholar.google.com/citations?user=VtK5lwUAAAAJ', title: 'Google Scholar' },
                { icon: Twitter, href: 'https://twitter.com/Dominicliu12', title: 'Twitter' },
                { icon: Github, href: 'https://github.com/Dominic789654', title: 'GitHub' },
                { icon: FileText, href: cv, title: 'CV' },
              ].map((social, index) => (
                <motion.a
                  key={social.title}
                  href={social.href}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 1.1 + index * 0.1 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/10 backdrop-blur-sm hover:bg-white/20 p-2.5 rounded-full transition-all duration-300 border border-white/10 shadow-lg hover:shadow-blue-500/20"
                  title={social.title}
                >
                  <social.icon size={22} />
                </motion.a>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent dark:from-gray-950 dark:to-transparent pointer-events-none" />

      {/* Theme toggle button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        onClick={toggleTheme}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="absolute top-4 right-4 md:top-6 md:right-6 bg-white/10 hover:bg-white/20 backdrop-blur-sm p-3 rounded-full transition-all duration-300 border border-white/20 shadow-lg"
        title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
      </motion.button>
    </header>
  );
};
