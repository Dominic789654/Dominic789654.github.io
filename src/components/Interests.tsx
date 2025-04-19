import React from 'react';
import { SectionTitle } from './SectionTitle';

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
            className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-center gap-3 transition-transform hover:translate-y-[-2px] duration-200"
          >
            <span className="text-2xl">{interest.emoji}</span>
            <span className="font-medium">{interest.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
};