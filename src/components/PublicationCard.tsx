import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FileText, Code, BookOpen, ExternalLink } from 'lucide-react';
import { prepare, layout } from '@chenglou/pretext';
import { useCitations, getCitationCountForPaper } from '../contexts/CitationContext';

interface Publication {
  id: number;
  title: string;
  authors: string;
  venue: string;
  links: {
    paper?: string;
    code?: string;
    blog?: string;
  };
}

interface PublicationCardProps {
  publication: Publication;
  index?: number;
}

// Hook: use pretext to measure text line count and calculate stable min-height
function useTextMeasure(title: string, authors: string, venue: string) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [minHeight, setMinHeight] = useState<number | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const width = el.clientWidth || 600;
    if (width === 0) return;

    try {
      const titleFont = '500 20px Newsreader, Georgia, serif';
      const bodyFont = '400 14px Inter Tight, -apple-system, sans-serif';
      const lineHeight = 24;

      const titlePrepared = prepare(title, titleFont);
      const authorsPrepared = prepare(authors, bodyFont);
      const venuePrepared = prepare(venue, bodyFont);

      const { lineCount: titleLines } = layout(titlePrepared, width, lineHeight);
      const { lineCount: authorsLines } = layout(authorsPrepared, width, lineHeight);
      const { lineCount: venueLines } = layout(venuePrepared, width, lineHeight);

      const totalHeight =
        titleLines * 28 +
        authorsLines * 22 +
        venueLines * 28 +
        60 +
        56;

      setMinHeight(totalHeight);
    } catch {
      // pretext may throw in SSR or unusual fonts; silently ignore
    }
  }, [title, authors, venue]);

  return { containerRef, minHeight };
}

// Typewriter hook
function useTypewriter(text: string, started: boolean, speed = 18) {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    if (!started) {
      setDisplayed('');
      return;
    }
    if (displayed === text) return;

    const timer = setTimeout(() => {
      setDisplayed(text.slice(0, displayed.length + 1));
    }, speed);

    return () => clearTimeout(timer);
  }, [started, displayed, text, speed]);

  return displayed;
}

export const PublicationCard: React.FC<PublicationCardProps> = ({
  publication,
  index = 0,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-60px" });
  const [animPhase, setAnimPhase] = useState(0);

  const { containerRef, minHeight } = useTextMeasure(
    publication.title,
    publication.authors,
    publication.venue,
  );

  const typedTitle = useTypewriter(publication.title, animPhase >= 1);
  const { paperCitations } = useCitations();
  const citationCount = getCitationCountForPaper(paperCitations, publication.title);

  useEffect(() => {
    if (!isInView) return;
    const startDelay = index * 80;
    const t0 = setTimeout(() => setAnimPhase(1), startDelay);
    return () => clearTimeout(t0);
  }, [isInView, index]);

  useEffect(() => {
    if (animPhase !== 1) return;
    if (typedTitle === publication.title) {
      const t = setTimeout(() => setAnimPhase(2), 120);
      return () => clearTimeout(t);
    }
  }, [animPhase, typedTitle, publication.title]);

  useEffect(() => {
    if (animPhase !== 2) return;
    const t = setTimeout(() => setAnimPhase(3), 200);
    return () => clearTimeout(t);
  }, [animPhase]);

  useEffect(() => {
    if (animPhase !== 3) return;
    const t = setTimeout(() => setAnimPhase(4), 180);
    return () => clearTimeout(t);
  }, [animPhase]);

  const renderAuthors = (authors: string) => {
    return authors.split(/(Xiang Liu)/g).map((part, idx) => {
      if (part === 'Xiang Liu') {
        return (
          <strong key={`author-${idx}`} className="text-accent dark:text-[#E89B7A] font-semibold">
            {part}
          </strong>
        );
      }
      return <React.Fragment key={`author-${idx}`}>{part}</React.Fragment>;
    });
  };

  const linkVariants = {
    paper: {
      bg: 'bg-paper-2 dark:bg-[#262220]',
      bgHover: 'hover:bg-accent hover:text-white dark:hover:bg-[#E89B7A] dark:hover:text-[#1C1915]',
      text: 'text-accent dark:text-[#E89B7A]',
      border: 'border-accent/20 dark:border-[#E89B7A]/30',
    },
    code: {
      bg: 'bg-paper-2 dark:bg-[#262220]',
      bgHover: 'hover:bg-ink-3 hover:text-white dark:hover:bg-[#B8B2A6] dark:hover:text-[#1C1915]',
      text: 'text-ink-2 dark:text-[#D5D0C6]',
      border: 'border-rule dark:border-[#4A443C]',
    },
    blog: {
      bg: 'bg-paper-2 dark:bg-[#262220]',
      bgHover: 'hover:bg-accent hover:text-white dark:hover:bg-[#E89B7A] dark:hover:text-[#1C1915]',
      text: 'text-accent dark:text-[#E89B7A]',
      border: 'border-accent/20 dark:border-[#E89B7A]/30',
    },
  };

  return (
    <div ref={cardRef}>
      <motion.div
        whileHover={{ y: -2 }}
        style={{ minHeight: minHeight ?? undefined }}
        className="group relative border border-rule dark:border-[#4A443C] bg-paper dark:bg-[#2A2520] p-5 transition-all duration-300 overflow-hidden"
      >
        {/* Accent bar */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: animPhase >= 1 ? "40px" : 0 }}
          transition={{ duration: 0.5 }}
          className="h-1 bg-accent dark:bg-[#E89B7A] mb-4"
        />

        {/* Title — typewriter */}
        <div ref={containerRef}>
          <h3 className="font-serif text-xl font-medium text-ink dark:text-[#E8E4DC] group-hover:text-accent dark:group-hover:text-[#E89B7A] transition-colors leading-snug min-h-[28px]">
            {typedTitle}
            {animPhase === 1 && typedTitle !== publication.title && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="inline-block w-0.5 h-5 bg-accent dark:bg-[#E89B7A] ml-0.5 align-middle"
              />
            )}
          </h3>
        </div>

        {/* Authors — slide in */}
        <motion.p
          initial={{ opacity: 0, x: -8 }}
          animate={{
            opacity: animPhase >= 2 ? 1 : 0,
            x: animPhase >= 2 ? 0 : -8,
          }}
          transition={{ duration: 0.3 }}
          className="mt-2.5 text-ink-3 dark:text-[#B8B2A6] text-sm leading-relaxed"
        >
          {renderAuthors(publication.authors)}
        </motion.p>

        {/* Venue — slide in */}
        <motion.div
          initial={{ opacity: 0, x: -8 }}
          animate={{
            opacity: animPhase >= 3 ? 1 : 0,
            x: animPhase >= 3 ? 0 : -8,
          }}
          transition={{ duration: 0.3 }}
          className="mt-2 flex items-center gap-2"
        >
          <span className="font-mono text-xs text-accent dark:text-[#E89B7A] bg-accent-soft dark:bg-[#E89B7A]/12 inline-block px-2.5 py-1 rounded">
            {publication.venue}
          </span>
          {citationCount !== undefined && citationCount > 0 && (
            <span className="font-mono text-xs text-ink-4 dark:text-[#9A958B]">
              {citationCount} citation{citationCount !== 1 ? "s" : ""}
            </span>
          )}
        </motion.div>

        {/* Links — fade in */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: animPhase >= 4 ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          className="mt-4 flex flex-wrap gap-2.5"
        >
          {publication.links.paper && (
            <motion.a
              href={publication.links.paper}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className={`no-underline inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 border border-b-0 ${linkVariants.paper.bg} ${linkVariants.paper.bgHover} ${linkVariants.paper.text} ${linkVariants.paper.border} transition-all`}
              style={{ borderBottom: '1px solid' }}
            >
              <FileText size={14} />
              Paper
              <ExternalLink size={11} className="opacity-60" />
            </motion.a>
          )}

          {publication.links.code && (
            <motion.a
              href={publication.links.code}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className={`no-underline inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 border border-b-0 ${linkVariants.code.bg} ${linkVariants.code.bgHover} ${linkVariants.code.text} ${linkVariants.code.border} transition-all`}
              style={{ borderBottom: '1px solid' }}
            >
              <Code size={14} />
              Code
              <ExternalLink size={11} className="opacity-60" />
            </motion.a>
          )}

          {publication.links.blog && (
            <motion.a
              href={publication.links.blog}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className={`no-underline inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 border border-b-0 ${linkVariants.blog.bg} ${linkVariants.blog.bgHover} ${linkVariants.blog.text} ${linkVariants.blog.border} transition-all`}
              style={{ borderBottom: '1px solid' }}
            >
              <BookOpen size={14} />
              Blog
              <ExternalLink size={11} className="opacity-60" />
            </motion.a>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};
