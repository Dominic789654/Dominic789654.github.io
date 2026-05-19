import React, { useEffect, useState } from "react";

interface Section {
  id: string;
  label: string;
}

const sections: Section[] = [
  { id: "about", label: "About" },
  { id: "news", label: "News" },
  { id: "research", label: "Research" },
  { id: "featured", label: "Featured" },
  { id: "publications", label: "Selected" },
  { id: "experience", label: "Experience" },
  { id: "preprints", label: "Preprints" },
  { id: "full-publications", label: "Full List" },
  { id: "awards", label: "Awards" },
  { id: "service", label: "Service" },
  { id: "interests", label: "Interests" },
];

export const TableOfContents: React.FC = () => {
  const [activeId, setActiveId] = useState<string>("about");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-30% 0px -55% 0px" },
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Table of contents"
      className="fixed right-6 top-1/2 -translate-y-1/2 hidden xl:block z-40"
    >
      <ul className="space-y-2.5 font-mono text-[13px] uppercase tracking-wider">
        {sections.map(({ id, label }) => {
          const isActive = activeId === id;
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                className={`group flex items-center gap-2.5 no-underline transition-colors ${
                  isActive
                    ? "text-accent dark:text-[#E89B7A]"
                    : "text-ink-3 dark:text-[#8C8676] hover:text-accent dark:hover:text-[#E89B7A]"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`block h-px transition-all duration-200 ${
                    isActive
                      ? "w-8 bg-accent dark:bg-[#E89B7A]"
                      : "w-4 bg-rule dark:bg-[#4A443C] group-hover:w-6 group-hover:bg-accent/60 dark:group-hover:bg-[#E89B7A]/60"
                  }`}
                />
                <span>{label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
