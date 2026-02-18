import React from "react";
import { SectionTitle } from "./SectionTitle";
import { Trophy } from "lucide-react";

export const Awards: React.FC = () => {
  const awards = [
    {
      id: 1,
      title: "NeurIPS 2025 Travel Award",
      description: "2025",
    },
    {
      id: 2,
      title: "HKUST Overseas Research Award",
      description: "2025",
    },
    {
      id: 3,
      title: "HKUST(GZ) Info Hub & DSA Thrust Research Travel Grant",
      description: "2024, 2025, 2026",
    },
    {
      id: 4,
      title: "AAAI 2024 Oral Award",
      description:
        "Paper: ParZC: Parametric Zero-Cost Proxies for Efficient NAS",
    },
    {
      id: 5,
      title: "NeurIPS 2024 Top Reviewer",
      description: "Selected as top reviewer for both main and D&B tracks",
    },
    {
      id: 6,
      title: "OpenAI’s Researcher Access Program ",
      description: "2024",
    },
  ];

  return (
    <section id="awards" className="py-8">
      <SectionTitle icon="🏆" title="Awards & Honors" />
      <div className="mt-6 space-y-4">
        {awards.map((award) => (
          <div
            key={award.id}
            className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 flex items-start gap-4"
          >
            <div className="text-yellow-500">
              <Trophy size={24} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {award.title}
              </h3>
              <p className="mt-1 text-gray-600">{award.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
