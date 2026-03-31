import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FileText, Code, BookOpen, ExternalLink } from 'lucide-react';
import { prepare, layout } from '@chenglou/pretext';

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
      const titleFont = '700 20px Inter, -apple-system, sans-serif';
      const bodyFont = '400 14px Inter, -apple-system, sans-serif';
      const lineHeight = 24;

      const titlePrepared = prepare(title, titleFont);
      const authorsPrepared = prepare(authors, bodyFont);
      const venuePrepared = prepare(venue, bodyFont);

      const { lineCount: titleLines } = layout(titlePrepared, width, lineHeight);
      const { lineCount: authorsLines } = layout(authorsPrepared, width, lineHeight);
      const { lineCount: venueLines } = layout(venuePrepared, width, lineHeight);

      // Title (20px * 1.35 leading) + authors + venue + links + padding
      const totalHeight =
        titleLines * 28 +
        authorsLines * 22 +
        venueLines * 28 +
        60 + // links area
        56;  // card padding top/bottom

      setMinHeight(totalHeight);
    } catch {
      // pretext may throw in SSR or unusual fonts; silently ignore
    }
  }, [title, authors, venue]);

  return { containerRef, minHeight };
}

// Typewriter hook: types out text char by char after trigger
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

export const PublicationCard: React.FC<PublicationCardProps> = ({ publication, index = 0 }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: '-60px' });
  const [animPhase, setAnimPhase] = useState(0);
  // 0 = idle, 1 = typing title, 2 = show authors, 3 = show venue, 4 = show links

  const { containerRef, minHeight } = useTextMeasure(
    publication.title,
    publication.authors,
    publication.venue,
  );

  const typedTitle = useTypewriter(publication.title, animPhase >= 1);

  // Advance phases
  useEffect(() => {
    if (!isInView) return;
    // Stagger start based on index
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
          <strong key={`author-${idx}`} className="text-blue-600 dark:text-blue-400">
            {part}
          </strong>
        );
      }
      return <React.Fragment key={`author-${idx}`}>{part}</React.Fragment>;
    });
  };

  const linkVariants = {
    paper: {
      bg: 'bg-blue-50 dark:bg-blue-950/40',
      bgHover: 'hover:bg-blue-100 dark:hover:bg-blue-900/60',
      text: 'text-blue-700 dark:text-blue-300',
      border: 'border-blue-200 dark:border-blue-800',
    },
    code: {
      bg: 'bg-gray-50 dark:bg-slate-800',
      bgHover: 'hover:bg-gray-100 dark:hover:bg-slate-700',
      text: 'text-gray-700 dark:text-gray-300',
      border: 'border-gray-200 dark:border-slate-700',
    },
    blog: {
      bg: 'bg-green-50 dark:bg-green-950/40',
      bgHover: 'hover:bg-green-100 dark:hover:bg-green-900/60',
      text: 'text-green-700 dark:text-green-300',
      border: 'border-green-200 dark:border-green-800',
    },
  };

  return (
    <div ref={cardRef}>
      <motion.div
        whileHover={{ y: -4, boxShadow: '0 12px 24px -8px rgba(30, 58, 138, 0.15)' }}
        style={{ minHeight: minHeight ?? undefined }}
        className="group relative bg-gradient-to-br from-white to-slate-50/50 dark:from-slate-900 dark:to-slate-800/50 p-5 rounded-xl border border-gray-100/80 dark:border-slate-700/50 shadow-sm hover:shadow-lg dark:hover:shadow-blue-950/30 transition-all duration-300 overflow-hidden"
      >
        {/* Subtle terminal scanline overlay that fades out after animation */}
        {animPhase < 4 && (
          <div
            className="pointer-events-none absolute inset-0 rounded-xl"
            style={{
              background:
                'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(59,130,246,' +
                (document.documentElement.classList.contains('dark') ? '0.08' : '0.025') +
                ') 3px, rgba(59,130,246,' +
                (document.documentElement.classList.contains('dark') ? '0.08' : '0.025') +
                ') 4px)',
            }}
          />
        )}

        {/* Accent bar */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: animPhase >= 1 ? '40px' : 0 }}
          transition={{ duration: 0.5 }}
          className="h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mb-4"
        />

        {/* Title — typewriter */}
        <div ref={containerRef}>
          <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors leading-snug min-h-[28px]">
            {typedTitle}
            {animPhase === 1 && typedTitle !== publication.title && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="inline-block w-0.5 h-5 bg-blue-500 dark:bg-blue-400 ml-0.5 align-middle"
              />
            )}
          </h3>
        </div>

        {/* Authors — slide in */}
        <motion.p
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: animPhase >= 2 ? 1 : 0, x: animPhase >= 2 ? 0 : -8 }}
          transition={{ duration: 0.3 }}
          className="mt-2.5 text-gray-600 dark:text-gray-400 text-sm leading-relaxed"
        >
          {renderAuthors(publication.authors)}
        </motion.p>

        {/* Venue — slide in */}
        <motion.p
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: animPhase >= 3 ? 1 : 0, x: animPhase >= 3 ? 0 : -8 }}
          transition={{ duration: 0.3 }}
          className="mt-2 text-blue-900/70 dark:text-blue-300/80 font-medium text-sm bg-blue-50/50 dark:bg-blue-950/30 inline-block px-2.5 py-1 rounded-full"
        >
          {publication.venue}
        </motion.p>

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
              className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border ${linkVariants.paper.bg} ${linkVariants.paper.bgHover} ${linkVariants.paper.text} ${linkVariants.paper.border} transition-all`}
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
              className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border ${linkVariants.code.bg} ${linkVariants.code.bgHover} ${linkVariants.code.text} ${linkVariants.code.border} transition-all`}
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
              className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border ${linkVariants.blog.bg} ${linkVariants.blog.bgHover} ${linkVariants.blog.text} ${linkVariants.blog.border} transition-all`}
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
