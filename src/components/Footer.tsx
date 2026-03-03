import React, { useEffect, useRef } from 'react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const currentDay = new Date().getDate();
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mapRef.current;
    if (!container) {
      return;
    }

    let script: HTMLScriptElement | null = null;

    const loadMap = () => {
      if (script) return;
      script = document.createElement('script');
      script.type = 'text/javascript';
      script.id = 'clustrmaps';
      script.src =
        'https://cdn.clustrmaps.com/map_v2.js?cl=ffffff&w=300&t=tt&d=UJZt2W83hovI9mJNzIeO45d5vP1-62SJ5ajCQKOaJNE';
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
  }, []);

  return (
    <footer className="bg-gray-800 text-gray-300 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p>© {currentYear} Xiang Liu. All rights reserved.</p>
            <p className="text-sm mt-1 text-gray-400">
              Last updated: {currentYear}/{currentMonth + 1}/{currentDay}
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <div ref={mapRef} className="clustrmaps-container" />
        </div>

        <div className="mt-6 pt-6 border-t border-gray-700 text-center text-sm text-gray-400">
          <p>Built with React and Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
};
