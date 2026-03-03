import React, { useEffect, useState } from 'react';

export const ScrollProgress: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let frameId: number | null = null;

    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };

    const requestUpdate = () => {
      if (frameId !== null) return;
      frameId = requestAnimationFrame(() => {
        frameId = null;
        updateScrollProgress();
      });
    };

    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    requestUpdate();

    return () => {
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      if (frameId !== null) {
        cancelAnimationFrame(frameId);
      }
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-[100]">
      <div
        className="h-full bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-600 transition-all duration-150 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />
      {/* Glow effect */}
      <div
        className="absolute top-0 h-full bg-gradient-to-r from-blue-400 to-cyan-400 blur-[6px] opacity-60 transition-all duration-150 ease-out"
        style={{ width: `${Math.min(scrollProgress + 10, 100)}%` }}
      />
    </div>
  );
};
