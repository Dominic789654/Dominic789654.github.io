import React, { useEffect, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const currentDay = new Date().getDate();
  const mapRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const container = mapRef.current;
    if (!container) {
      return;
    }

    let script: HTMLScriptElement | null = null;
    const bg = theme === 'dark' ? '1c1915' : 'f0eee6';

    const loadMap = () => {
      if (script) return;
      script = document.createElement('script');
      script.type = 'text/javascript';
      script.id = 'clustrmaps';
      script.src = `https://cdn.clustrmaps.com/map_v2.js?cl=${bg}&w=300&t=tt&d=UJZt2W83hovI9mJNzIeO45d5vP1-62SJ5ajCQKOaJNE`;
      script.async = true;
      container.innerHTML = '';
      container.appendChild(script);
    };

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            loadMap();
            observer.disconnect();
          }
        },
        { rootMargin: '200px' },
      );
      observer.observe(container);

      return () => {
        observer.disconnect();
        if (script && container.contains(script)) {
          container.removeChild(script);
        }
      };
    }

    loadMap();

    return () => {
      if (script && container.contains(script)) {
        container.removeChild(script);
      }
    };
  }, [theme]);

  return (
    <footer className="border-t border-rule dark:border-[#4A443C] bg-paper-2 dark:bg-[#1C1915] py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-ink-2 dark:text-[#D5D0C6]">© {currentYear} Xiang Liu. All rights reserved.</p>
            <p className="font-mono text-xs mt-1 text-ink-4 dark:text-[#9A958B]">
              Last updated: {currentYear}/{currentMonth + 1}/{currentDay}
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <div ref={mapRef} className="clustrmaps-container" />
        </div>

        <div className="mt-6 pt-6 border-t border-rule dark:border-[#4A443C] text-center font-mono text-xs text-ink-4 dark:text-[#9A958B]">
          <p>Built with React and Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
};
