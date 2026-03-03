import React from 'react';
import { SectionTitle } from './SectionTitle';
import { MessageSquare } from 'lucide-react';
import { UNIFIED_CARD_CLASS } from './cardStyles';

export const Service: React.FC = () => {
  const services = [
    {
      id: 1,
      title: "Conference Reviewer",
      items: "ICLR 2025-2026, ICML 2025-2026, ACL 2024-2026, NeurIPS 2024-2025, EMNLP 2023-2025, AAAI 2026"
    },
    {
      id: 2,
      title: "Journal Reviewer",
      items: "TMLR, Neural Networks"
    }
  ];

  return (
    <section id="service" className="py-8">
      <SectionTitle icon="💬" title="Academic Service" />
      <div className="mt-6 space-y-4">
        {services.map(service => (
          <div key={service.id} className={`${UNIFIED_CARD_CLASS} flex items-start gap-4 p-5`}>
            <div className="text-blue-500">
              <MessageSquare size={24} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">{service.title}</h3>
              <p className="mt-1 text-slate-600 dark:text-slate-300">{service.items}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
