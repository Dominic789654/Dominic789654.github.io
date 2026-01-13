import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 dark:text-gray-100 text-gray-800 font-sans transition-colors duration-300">
      {children}
    </div>
  );
};