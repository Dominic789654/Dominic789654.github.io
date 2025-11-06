import React from 'react';
import { SectionTitle } from './SectionTitle';
import { PublicationCard } from './PublicationCard';

export const Publications: React.FC = () => {
  const [isFullListExpanded, setIsFullListExpanded] = React.useState(false);

  const selectedPublications = [
    {
      id: 6,
      title: "ChunkKV: Semantic-Preserving KV Cache Compression for Efficient Long-Context LLM Inference",
      authors: "Xiang Liu*, Zhenheng Tang*, Peijie Dong, Zeyu Li, Bo Li, Xuming Hu, Xiaowen Chu",
      venue: "NeurIPS 2025",
      links: {
        paper: "https://arxiv.org/abs/2502.00299"
      }
    },
    {
      id: 7,
      title: "Can LLMs Maintain Fundamental Abilities under KV Cache Compression?",
      authors: "Xiang Liu, Zhenheng Tang, Hong Chen, Peijie Dong, Zeyu Li, Xiuze Zhou, Bo Li, Xuming Hu, Xiaowen Chu",
      venue: "arXiv preprint",
      links: {
        paper: "https://arxiv.org/abs/2502.01941"
      }
    },
    {
      id: 5,
      title: "FlowKV: Enhancing Multi-Turn Conversational Coherence in LLMs via Isolated Key-Value Cache Management",
      authors: "Xiang Liu*, Hong Chen*, Xuming Hu, Xiaowen Chu",
      venue: "NeurIPS 2025 Multi-Turn Interactions in Large Language Models Workshop",
      links: {
        paper: "https://arxiv.org/abs/2505.15347"
      }
    },
    {
      id: 1,
      title: "Can Compressed LLMs Truly Act? An Empirical Evaluation of Agentic Capabilities in LLM Compression",
      authors: "Peijie Dong*, Zhenheng Tang*, Xiang Liu, Lujun Li, Xiaowen Chu, Bo Li",
      venue: "ICML 2025",
      links: {
        paper: "https://arxiv.org/abs/2505.19433",
        code: "https://github.com/pprp/ACBench"
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
      id: 3,
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
      id: 4,
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
      id: 8,
      title: "DiffAdapt: Difficulty-Adaptive Reasoning for Token-Efficient LLM Inference",
      authors: "Xiang Liu, Xuming Hu, Xiaowen Chu, Eunsol Choi",
      venue: "arXiv preprint",
      links: {
        paper: "https://arxiv.org/pdf/2510.19669"
      }
    },
    {
      id: 9,
      title: "Reasoning Language Model Inference Serving Unveiled: An Empirical Study",
      authors: "Qi Li*, Junpan Wu*, Xiang Liu*, Yuxin Wang, Zeyu Li, Zhenheng Tang, Yuhan Chen, Shaohuai Shi, Xiaowen Chu",
      venue: "arXiv preprint",
      links: {
        paper: "https://arxiv.org/pdf/2510.18672"
      }
    },
    {
      id: 7,
      title: "Can LLMs Maintain Fundamental Abilities under KV Cache Compression?",
      authors: "Xiang Liu, Zhenheng Tang, Hong Chen, Peijie Dong, Zeyu Li, Xiuze Zhou, Bo Li, Xuming Hu, Xiaowen Chu",
      venue: "arXiv preprint",
      links: {
        paper: "https://arxiv.org/abs/2502.01941"
      }
    }
  ];

  const fullPublications = [
    {
      id: 32,
      title: "DiffAdapt: Difficulty-Adaptive Reasoning for Token-Efficient LLM Inference",
      authors: "Xiang Liu, Xuming Hu, Xiaowen Chu†, Eunsol Choi†",
      venue: "arXiv preprint",
      links: {
        paper: "https://arxiv.org/pdf/2510.19669"
      }
    },
    {
      id: 33,
      title: "Reasoning Language Model Inference Serving Unveiled: An Empirical Study",
      authors: "Qi Li*, Junpan Wu*, Xiang Liu*, Yuxin Wang, Zeyu Li, Zhenheng Tang, Yuhan Chen, Shaohuai Shi, Xiaowen Chu†",
      venue: "arXiv preprint",
      links: {
        paper: "https://arxiv.org/pdf/2510.18672"
      }
    },
    {
      id: 34,
      title: "An Improved Autoregressive Evaluation Paradigm for Large Language Models",
      authors: "Jipeng Zhang, Rui Pan, Yuzheng Hu, Kashun Shum, Guanyu Yao, Xiang Liu, Renjie Pi, Hanze Dong, Shizhe Diao, Yong Lin, Han Zhao, Tong Zhang",
      venue: "ACM Transactions on Intelligent Systems and Technology, 2025",
      links: {
        paper: "https://dl.acm.org/doi/pdf/10.1145/3763000"
      }
    },
    {
      id: 8,
      title: "City-VLM: Towards Multidomain Perception Scene Understanding via Multimodal Incomplete Learning",
      authors: "Penglei Sun*, Yaoxian Song*, Xiangru Zhu, Xiang Liu, Qiang Wang, Yue Liu, Changqun Xia, Tiefeng Li, Yang Yang, Xiaowen Chu",
      venue: "ACM-MM 2025",
      links: {
        paper: "https://arxiv.org/pdf/2507.12795"
      }
    },
    {
      id: 9,
      title: "AnTKV: Anchor Token-Aware Sub-Bit Vector Quantization for KV Cache in Large Language Models",
      authors: "Zeyu Li, Chuanfu Xiao, Yang Wang, Xiang Liu, Zhenheng Tang, Baotong Lu, Mao Yang, Xinyu Chen, Xiaowen Chu",
      venue: "arXiv preprint",
      links: {
        paper: "https://arxiv.org/pdf/2506.19505"
      }
    },
    {
      id: 10,
      title: "Can Compressed LLMs Truly Act? An Empirical Evaluation of Agentic Capabilities in LLM Compression",
      authors: "Peijie Dong*, Zhenheng Tang*, Xiang Liu, Lujun Li, Xiaowen Chu, Bo Li",
      venue: "ICML 2025",
      links: {
        paper: "https://arxiv.org/abs/2505.19433",
        code: "https://github.com/pprp/ACBench"
      }
    },
    {
      id: 11,
      title: "SSR: Speculative Parallel Scaling Reasoning in Test-time",
      authors: "Yuanlin Chu, Bo Wang, Xiang Liu, Hong Chen, Aiwei Liu, Xuming Hu",
      venue: "arXiv preprint",
      links: {
        paper: "https://arxiv.org/pdf/2505.15340"
      }
    },
    {
      id: 12,
      title: "FlowKV: Enhancing Multi-Turn Conversational Coherence in LLMs via Isolated Key-Value Cache Management",
      authors: "Xiang Liu*, Hong Chen*, Xuming Hu, Xiaowen Chu",
      venue: "NeurIPS 2025 Multi-Turn Interactions in Large Language Models Workshop",
      links: {
        paper: "https://arxiv.org/abs/2505.15347"
      }
    },
    {
      id: 13,
      title: "CAFES: A Collaborative Multi-Agent Framework for Multi-Granular Multimodal Essay Scoring",
      authors: "Jiamin Su, Yibo Yan, Zhuoran Gao, Han Zhang, Xiang Liu, Xuming Hu",
      venue: "arXiv preprint",
      links: {
        paper: "https://arxiv.org/pdf/2505.13965"
      }
    },
    {
      id: 14,
      title: "The Lottery LLM Hypothesis, Rethinking What Abilities Should LLM Compression Preserve?",
      authors: "Zhenheng Tang, Xiang Liu, Qian Wang, Peijie Dong, Bingsheng He, Xiaowen Chu, Bo Li",
      venue: "ICLR 2025 Blog Track",
      links: {
        paper: "https://arxiv.org/pdf/2502.17535"
      }
    },
    {
      id: 15,
      title: "Perovskite-llm: Knowledge-enhanced large language models for perovskite solar cell research",
      authors: "Xiang Liu*, Penglei Sun*, Shuyan Chen, Longhan Zhang, Peijie Dong, Huajie You, Yongqi Zhang, Chang Yan, Xiaowen Chu, Tong-yi Zhang",
      venue: "EMNLP 2025 Findings",
      links: {
        paper: "https://arxiv.org/pdf/2502.12669"
      }
    },
    {
      id: 16,
      title: "EssayJudge: A Multi-Granular Benchmark for Assessing Automated Essay Scoring Capabilities of Multimodal Large Language Models",
      authors: "Jiamin Su, Yibo Yan, Fangteng Fu, Han Zhang, Jingheng Ye, Xiang Liu, Jiahao Huo, Huiyu Zhou, Xuming Hu",
      venue: "ACL 2025 Findings",
      links: {
        paper: "https://arxiv.org/pdf/2502.11916"
      }
    },
    {
      id: 17,
      title: "Mediator: Memory-efficient llm merging with less parameter conflicts and uncertainty based routing",
      authors: "Kunfeng Lai*, Zhenheng Tang*, Xinglin Pan, Peijie Dong, Xiang Liu, Haolan Chen, Li Shen, Bo Li, Xiaowen Chu",
      venue: "arXiv preprint",
      links: {
        paper: "https://arxiv.org/pdf/2502.04411"
      }
    },
    {
      id: 18,
      title: "Can LLMs Maintain Fundamental Abilities under KV Cache Compression?",
      authors: "Xiang Liu, Zhenheng Tang, Hong Chen, Peijie Dong, Zeyu Li, Xiuze Zhou, Bo Li, Xuming Hu, Xiaowen Chu",
      venue: "arXiv preprint",
      links: {
        paper: "https://arxiv.org/abs/2502.01941"
      }
    },
    {
      id: 19,
      title: "ChunkKV: Semantic-Preserving KV Cache Compression for Efficient Long-Context LLM Inference",
      authors: "Xiang Liu*, Zhenheng Tang*, Peijie Dong, Zeyu Li, Bo Li, Xuming Hu, Xiaowen Chu",
      venue: "NeurIPS 2025",
      links: {
        paper: "https://arxiv.org/abs/2502.00299"
      }
    },
    {
      id: 20,
      title: "OracleKV: Oracle Guidance for Question-Independent KV Cache Compression",
      authors: "Yuanbing Zhu*, Zhenheng Tang*, Xiang Liu, Ang Li, Bo Li, Xiaowen Chu, Bo Han",
      venue: "ICML 2025 Workshop on Long-Context Foundation Models Oral",
      links: {
        paper: "https://openreview.net/pdf?id=KHM2YOGgX9"
      }
    },
    {
      id: 21,
      title: "Should We Really Edit Language Models? On the Evaluation of Edited Language Models",
      authors: "Qi Li*, Xiang Liu*, Zhenheng Tang, Peijie Dong, Zeyu Li, Xinglin Pan, Xiaowen Chu",
      venue: "NeurIPS 2024",
      links: {
        paper: "https://proceedings.neurips.cc/paper_files/paper/2024/file/370fa2e691f57eb319bc263a07dad4a5-Paper-Conference.pdf"
      }
    },
    {
      id: 22,
      title: "LPZero: Language Model Zero-cost Proxy Search from Zero",
      authors: "Peijie Dong, Lujun Li, Xiang Liu, Zhenheng Tang, Xuebo Liu, Qiang Wang, Xiaowen Chu",
      venue: "EMNLP 2024 Findings",
      links: {
        paper: "https://arxiv.org/pdf/2410.04808"
      }
    },
    {
      id: 23,
      title: "LongGenBench: Long-context Generation Benchmark",
      authors: "Xiang Liu, Peijie Dong, Xuming Hu, Xiaowen Chu",
      venue: "EMNLP Findings 2024",
      links: {
        paper: "https://arxiv.org/abs/2410.04199",
        code: "https://github.com/Dominic789654/LongGenBench"
      }
    },
    {
      id: 24,
      title: "3D Question Answering for City Scene Understanding",
      authors: "Penglei Sun*, Yaoxian Song*, Xiang Liu, Xiaofei Yang, Qiang Wang, Tiefeng Li, Yang Yang, Xiaowen Chu",
      venue: "ACM-MM 2024",
      links: {
        paper: "https://dl.acm.org/doi/pdf/10.1145/3664647.3681022"
      }
    },
    {
      id: 25,
      title: "Pruner-Zero: Evolving Symbolic Pruning Metric from scratch for Large Language Models",
      authors: "Peijie Dong*, Lujun Li*, Zhenheng Tang, Xiang Liu, Xinglin Pan, Qiang Wang, Xiaowen Chu",
      venue: "ICML 2024",
      links: {
        paper: "https://arxiv.org/pdf/2406.02924"
      }
    },
    {
      id: 26,
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
      id: 27,
      title: "ParZC: Parametric Zero-Cost Proxies for Efficient NAS",
      authors: "Peijie Dong*, Lujun Li*, Xinglin Pan, Zimian Wei, Xiang Liu, Qiang Wang, Xiaowen Chu",
      venue: "AAAI 2024. Oral Award",
      links: {
        paper: "https://arxiv.org/abs/2402.02105"
      }
    },
    {
      id: 28,
      title: "Discovering Sparsity Allocation for Layer-wise Pruning of Large Language Models",
      authors: "Lujun Li*, Peijie Dong*, Zhenheng Tang, Xiang Liu, Qiang Wang, Wenhan Luo, Wei Xue, Qifeng Liu, Xiaowen Chu, Yike Guo",
      venue: "NeurIPS 2024",
      links: {
        paper: "https://proceedings.neurips.cc/paper_files/paper/2024/file/ff997469ac66cf893c4183efeb22212a-Paper-Conference.pdf"
      }
    },
    {
      id: 29,
      title: "Plum: Prompt learning using metaheuristic",
      authors: "Rui Pan*, Shuo Xing*, Shizhe Diao, Wenhe Sun, Xiang Liu, Kashun Shum, Renjie Pi, Jipeng Zhang, Tong Zhang",
      venue: "ACL 2024 Findings",
      links: {
        paper: "https://arxiv.org/pdf/2311.08364"
      }
    },
    {
      id: 30,
      title: "Dissecting the Runtime Performance of the Training, Fine-tuning, and Inference of Large Language Models",
      authors: "Longteng Zhang*, Xiang Liu*, Zeyu Li, Xinglin Pan, Peijie Dong, Ruibo Fan, Rui Guo, Xin Wang, Qiong Luo, Shaohuai Shi, Xiaowen Chu",
      venue: "arXiv preprint",
      links: {
        paper: "https://arxiv.org/pdf/2311.03687"
      }
    },
    {
      id: 31,
      title: "Active prompting with chain-of-thought for large language models",
      authors: "Shizhe Diao*, Pengcheng Wang*, Yong Lin, Rui Pan, Xiang Liu, Tong Zhang",
      venue: "ACL 2025",
      links: {
        paper: "https://arxiv.org/pdf/2302.12246"
      }
    },
  ];

  const conferenceCounts = [...fullPublications].reduce((acc, pub) => {
    const venue = pub.venue.split(" ")[0];
    if (venue) {
      acc[venue] = (acc[venue] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

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

      <section id="full-publications" className="py-8">
        <div 
          className="flex items-center justify-between cursor-pointer" 
          onClick={() => setIsFullListExpanded(!isFullListExpanded)}
        >
          <SectionTitle icon="📚" title="Full Publication List" />
          <button className="text-lg font-bold">
            {isFullListExpanded ? '−' : '+'}
          </button>
        </div>
        {isFullListExpanded && (
          <>
            <div className="my-4 p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Publication Stats</h3>
              <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2">
                {Object.entries(conferenceCounts)
                  .sort(([, a], [, b]) => b - a)
                  .map(([conf, count]) => (
                    <span key={conf} className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {conf}: {count}
                    </span>
                  ))}
              </div>
            </div>
            <div className="mt-6 space-y-6">
              {fullPublications.map(pub => (
                <PublicationCard key={pub.id} publication={pub} />
              ))}
            </div>
          </>
        )}
      </section>
    </>
  );
};