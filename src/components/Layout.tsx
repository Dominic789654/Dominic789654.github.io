import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-paper dark:bg-[#1C1915] text-ink dark:text-[#E8E4DC] font-sans transition-colors duration-300">
      {children}
    </div>
  );
};
