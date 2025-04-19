import React from 'react';

interface SectionTitleProps {
  icon: string;
  title: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ icon, title }) => {
  return (
    <h2 className="text-2xl md:text-3xl font-bold border-b pb-2 border-gray-200 flex items-center gap-2">
      <span>{icon}</span> {title}
    </h2>
  );
};