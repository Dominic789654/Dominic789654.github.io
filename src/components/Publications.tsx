import React from 'react';
import { SectionTitle } from './SectionTitle';
import { PublicationCard } from './PublicationCard';

export const Publications: React.FC = () => {
  const selectedPublications = [
    {
      id: 1,
      title: "Can Compressed LLMs Truly Act? An Empirical Evaluation of Agentic Capabilities in LLM Compression",
      authors: "Peijie Dong*, Zhenheng Tang*, Xiang Liu, Lujun Li, Xiaowen Chu, Bo Li",
      venue: "ICML 2025",
      links: {
        paper: "https://arxiv.org/abs/2505.19433",
        code:"https://github.com/pprp/ACBench"
      }
    },
    {
      id: 2,
      title: "ParZC: Parametric Zero-Cost Proxies for Efficient NAS",
      authors: "Peijie Dong*, Lujun Li*, Xinglin Pan, Zimian Wei, Xiang Liu, Qiang Wang, Xiaowen Chu",
      venue: "AAAI 2024. Oral Award.",
      links: {
        paper: "https://arxiv.org/abs/2402.02105"
      }
    },
    {
      id: 2,
      title: "LISA: Layerwise Importance Sampling for Memory-Efficient Large Language Model Fine-Tuning",
      authors: "Rui Pan*, Xiang Liu*, Shizhe Diao, Renjie Pi, Jipeng Zhang, Chi Han, Tong Zhang",
      venue: "NeurIPS 2024",
      links: {
        paper: "https://arxiv.org/abs/2403.17919",
        code: "https://github.com/OptimalScale/LMFlow",
        blog: "https://www.jiqizhixin.com/articles/2024-04-01-13"
      }
    },
    {
      id: 3,
      title: "LongGenBench: Long-context Generation Benchmark",
      authors: "Xiang Liu, Peijie Dong, Xuming Hu, Xiaowen Chu",
      venue: "EMNLP Findings 2024",
      links: {
        paper: "https://arxiv.org/abs/2410.04199",
        code: "https://github.com/Dominic789654/LongGenBench"
      }
    }
  ];

  const preprints = [
    {
      id: 4,
      title: "FlowKV: Enhancing Multi-Turn Conversational Coherence in LLMs via Isolated Key-Value Cache Management",
      authors: "Xiang Liu*, Hong Chen*, Xuming Hu, Xiaowen Chu",
      venue: "arXiv preprint",
      links: {
        paper: "https://arxiv.org/abs/2505.15347"
      }
    },
    {
      id: 5,
      title: "ChunkKV: Semantic-Preserving KV Cache Compression for Efficient Long-Context LLM Inference",
      authors: "Xiang Liu*, Zhenheng Tang*, Peijie Dong, Zeyu Li, Bo Li, Xuming Hu, Xiaowen Chu",
      venue: "arXiv preprint",
      links: {
        paper: "https://arxiv.org/abs/2502.00299"
      }
    },
    {
      id: 6,
      title: "Can LLMs Maintain Fundamental Abilities under KV Cache Compression?",
      authors: "Xiang Liu, Zhenheng Tang, Hong Chen, Peijie Dong, Zeyu Li, Xiuze Zhou, Bo Li, Xuming Hu, Xiaowen Chu",
      venue: "arXiv preprint",
      links: {
        paper: "https://arxiv.org/abs/2502.01941"
      }
    }
  ];

  return (
    <>
      <section id="publications" className="py-8">
        <SectionTitle icon="📜" title="Selected Publications" />
        <div className="mt-6 space-y-6">
          {selectedPublications.map(pub => (
            <PublicationCard key={pub.id} publication={pub} />
          ))}
        </div>
      </section>
      
      <section id="preprints" className="py-8">
        <SectionTitle icon="📝" title="Preprints" />
        <div className="mt-6 space-y-6">
          {preprints.map(pub => (
            <PublicationCard key={pub.id} publication={pub} />
          ))}
        </div>
      </section>
    </>
  );
};