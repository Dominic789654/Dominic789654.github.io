import React from "react";
import { SectionTitle } from "./SectionTitle";

export const About: React.FC = () => {
  return (
    <section id="about" className="py-8">
      <SectionTitle icon="👋" title="About Me" />
      <div className="mt-4 text-lg leading-relaxed">
        <p>
          I study efficient and reliable large language models, with a focus on
          token-efficient reasoning, long-context inference, evaluation,
          retrieval, and agentic systems.
        </p>
        <p className="mt-4">
          I am a PhD student in Data Science and Analytics (DSA) Thrust at the
          Hong Kong University of Science and Technology (Guangzhou), advised
          by{" "}
          <a
            href="https://sites.google.com/view/chuxiaowen"
            className="text-blue-600 hover:underline"
          >
            Prof. Xiaowen Chu
          </a>{" "}
          and{" "}
          <a
            href="https://xuminghu.github.io/"
            className="text-blue-600 hover:underline"
          >
            Prof. Xuming HU
          </a>
          . I was also a visiting student at NYU Center for Data Science,
          working with{" "}
          <a
            href="https://eunsol.github.io/"
            className="text-blue-600 hover:underline"
          >
            Prof. Eunsol Choi
          </a>
          , and previously a research intern at HKUST, working with{" "}
          <a
            href="https://tongzhang-ml.org/"
            className="text-blue-600 hover:underline"
          >
            Prof. Tong Zhang
          </a>
          .
        </p>
        <p className="mt-4">
          Before HKUST(GZ), I received an M.S. in Computer Science from HKU and
          a B.S. in Computer Science from GMU.
        </p>
        <p className="mt-4 text-blue-600 dark:text-blue-400 font-medium">
          I am actively seeking LLM research internship opportunities for
          Summer/Fall 2026.
        </p>
      </div>
    </section>
  );
};
