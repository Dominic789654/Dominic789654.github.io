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
    id: "diffadapt-decisions",
    date: "Oct 2026",
    title: "Serving DiffAdapt via Decision APIs",
    dek: "Draft research note. A DiffAdapt Easy / Normal / Hard controller as a serving signal on decision APIs. No new experiments.",
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
              className="grid grid-cols-[96px_1fr] gap-x-5 gap-y-1 py-4 border-b border-rule-2 dark:border-[#3A3530] items-start"
            >
              <span className="pt-1 font-mono text-xs tracking-wide text-ink-3 dark:text-[#B8B2A6] uppercase whitespace-nowrap">
                {post.date}
              </span>
              <div>
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
