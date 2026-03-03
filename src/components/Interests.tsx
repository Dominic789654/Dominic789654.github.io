import React from 'react';
import { SectionTitle } from './SectionTitle';
import { UNIFIED_CARD_CLASS } from './cardStyles';

export const Interests: React.FC = () => {
  const interests = [
    { id: 1, emoji: "🏸", name: "Badminton" },
    { id: 2, emoji: "🏋️‍♂️", name: "Workout" },
    { id: 3, emoji: "🏃‍♂️", name: "Running" }
  ];

  return (
    <section id="interests" className="py-8">
      <SectionTitle icon="🤗" title="Personal Interests" />
      <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
        {interests.map(interest => (
          <div 
            key={interest.id} 
            className={`${UNIFIED_CARD_CLASS} flex items-center gap-3 p-4`}
          >
            <span className="text-2xl">{interest.emoji}</span>
            <span className="font-medium text-slate-700 dark:text-slate-200">{interest.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
};
