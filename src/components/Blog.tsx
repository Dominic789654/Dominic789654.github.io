import React from "react";
import { SectionTitle } from "./SectionTitle";

interface PostLink {
  label: string;
  href: string;
  external?: boolean;
  lang?: string;
}

interface BlogPost {
  id: string;
  date: string;
  title: string;
  dek: string;
  links: PostLink[];
}

const posts: BlogPost[] = [
  {
    id: "cross-harness-memory",
    date: "Nov 2026",
    title: "换了模型，不该重新认识我",
    dek: "Personal context should survive a change of model, tool, account, or machine. A design note on evidence and handoff, not a new memory algorithm.",
    links: [
      {
        label: "中文",
        href: "blog/cross-harness-memory.zh.html",
        lang: "zh-Hans",
      },
    ],
  },
  {
    id: "diffadapt-decisions",
    date: "Nov 2026",
    title: "The Free Lunch in Decision APIs: One Prefill, Two Uses",
    dek: "If chat already pays for prefill, can a decision come almost for free? A proposal for sharing computation inside the serving engine.",
    links: [
      {
        label: "English",
        href: "blog/serving-diffadapt-via-decision-apis.html",
        lang: "en",
      },
      {
        label: "中文",
        href: "blog/serving-diffadapt-via-decision-apis.zh.html",
        lang: "zh-Hans",
      },
    ],
  },
  {
    id: "energy-to-token",
    date: "May 2026",
    title:
      "Position: LLM Inference Should Be Evaluated as Energy-to-Token Production",
    dek: "Project page for the energy-to-token position paper.",
    links: [
      {
        label: "Project page",
        href: "https://dominic789654.github.io/energy-to-token/",
        external: true,
      },
    ],
  },
];

export const Blog: React.FC = () => {
  React.useEffect(() => {
    // The fragment can arrive before React has mounted the target section.
    if (window.location.hash !== "#blog") return;
    const frame = window.requestAnimationFrame(() => {
      document.getElementById("blog")?.scrollIntoView({ behavior: "instant" });
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <section id="blog" className="py-8">
      <SectionTitle icon="📝" title="Blog" />
      <p className="font-serif text-lg leading-relaxed text-ink-2 dark:text-[#D5D0C6]">
        Research notes and project pages. Notes are sketches, not papers.
      </p>
      <ul className="mt-4 border-t border-rule dark:border-[#4A443C]">
        {posts.map((post) => {
          const primary = post.links[0];
          return (
            <li
              key={post.id}
              className="grid grid-cols-1 sm:grid-cols-[96px_1fr] gap-x-5 gap-y-2 py-6 border-b border-rule-2 dark:border-[#3A3530] items-start"
            >
              <span className="pt-1 font-mono text-xs tracking-wide text-ink-3 dark:text-[#B8B2A6] uppercase whitespace-nowrap">
                {post.date}
              </span>
              <div>
                {post.id === "diffadapt-decisions" && (
                  <a href={primary.href} className="block mb-4"><img src="blog/figures/shared-prefill.png" alt="One prefill, two uses: shared model state supplies both a validated decision readout and chat continuation." width={1672} height={941} loading="lazy" className="w-full h-auto border border-rule dark:border-[#4A443C]" /></a>
                )}
                <a
                  href={primary.href}
                  lang={primary.lang}
                  target={primary.external ? "_blank" : undefined}
                  rel={primary.external ? "noopener noreferrer" : undefined}
                  className="font-serif text-lg leading-snug text-ink dark:text-[#E8E4DC]"
                >
                  {post.title}
                </a>
                <p className="mt-1 font-serif leading-relaxed text-ink-2 dark:text-[#D5D0C6]">
                  {post.dek}
                </p>
                <p className="mt-2 font-mono text-xs tracking-wide text-ink-3 dark:text-[#B8B2A6]">
                  {post.links.map((link, index) => (
                    <React.Fragment key={link.href}>
                      {index > 0 && <span aria-hidden="true"> · </span>}
                      <a
                        href={link.href}
                        lang={link.lang}
                        target={link.external ? "_blank" : undefined}
                        rel={link.external ? "noopener noreferrer" : undefined}
                      >
                        {link.label}
                      </a>
                    </React.Fragment>
                  ))}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
