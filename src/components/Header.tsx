import React from 'react';
import { Mail, FileText, Twitter, Github, GraduationCap } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-lg">
            <img 
              src="images/profile/avatar.png" 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold">Xiang Liu (刘翔)</h1>
            <p className="text-xl mt-2 text-blue-100">PhD Student in Data Science and Analytics</p>
            <p className="mt-1 text-blue-100">Hong Kong University of Science and Technology (Guangzhou)</p>
            <p className="italic mt-1 text-blue-200">Pronouns: he/him</p>
            
            <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-4">
              <a href="mailto:xliu886@connect.hkust-gz.edu.cn" className="bg-white/10 hover:bg-white/20 transition-colors p-2 rounded-full" title="Email">
                <Mail size={20} />
              </a>
              <a href="https://scholar.google.com/citations?user=VtK5lwUAAAAJ" className="bg-white/10 hover:bg-white/20 transition-colors p-2 rounded-full" title="Google Scholar">
                <GraduationCap size={20} />
              </a>
              <a href="https://twitter.com/Dominicliu12" className="bg-white/10 hover:bg-white/20 transition-colors p-2 rounded-full" title="Twitter">
                <Twitter size={20} />
              </a>
              <a href="https://github.com/Dominic789654" className="bg-white/10 hover:bg-white/20 transition-colors p-2 rounded-full" title="GitHub">
                <Github size={20} />
              </a>
              <a href="cv/Xiang_Liu_Resume.pdf" className="bg-white/10 hover:bg-white/20 transition-colors p-2 rounded-full" title="CV">
                <FileText size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};