import React from 'react';
import { SectionTitle } from './SectionTitle';

interface ExperienceItem {
  id: number;
  organization: string;
  period: string;
  description: string;
}

export const Experience: React.FC = () => {
  const experiences: ExperienceItem[] = [
    {
      id: 1,
      organization: "HKUST(GZ)",
      period: "09/2023–Present",
      description: "Ph.D. student, supervised by Prof. Xiaowen Chu and Prof. Xuming HU"
    },
    {
      id: 2,
      organization: "HKUST",
      period: "12/2022–08/2023",
      description: "Research Intern, supervised by Prof. Tong Zhang"
    },
    {
      id: 3,
      organization: "Baidu Research Cognitive Computing Lab",
      period: "12/2021–06/2022",
      description: "Research Intern, supervised by Mingming Sun"
    }
  ];

  return (
    <section id="experience" className="py-8">
      <SectionTitle icon="🔬" title="Research Experience" />
      <div className="mt-6 space-y-8">
        {experiences.map(exp => (
          <div key={exp.id} className="relative pl-8 pb-4 border-l-2 border-blue-300 group">
            <div className="absolute left-[-8px] top-0 w-4 h-4 bg-blue-500 rounded-full"></div>
            <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
              {exp.organization}
            </h3>
            <p className="mt-1 text-gray-500 font-mono">{exp.period}</p>
            <p className="mt-2 text-gray-700">{exp.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};