import React from 'react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-800 text-gray-300 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p>© {currentYear} Xiang Liu. All rights reserved.</p>
            <p className="text-sm mt-1 text-gray-400">
              Last updated: April {currentYear}
            </p>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-700 text-center text-sm text-gray-400">
          <p>Built with React and Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
};