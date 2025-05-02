import React, { useEffect, useRef } from 'react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const mapRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // 创建脚本元素
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.id = 'clustrmaps';
    script.src = '//cdn.clustrmaps.com/map_v2.js?cl=ffffff&w=300&t=tt&d=UJZt2W83hovI9mJNzIeO45d5vP1-62SJ5ajCQKOaJNE';
    script.async = true;
    
    // 清除旧脚本(如果有)并添加新脚本
    if (mapRef.current) {
      mapRef.current.innerHTML = '';
      mapRef.current.appendChild(script);
    }
    
    // 清理函数
    return () => {
      if (mapRef.current && mapRef.current.contains(script)) {
        mapRef.current.removeChild(script);
      }
    };
  }, []);
  
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
        
        {/* 添加地图容器 */}
        <div className="mt-6 flex justify-center">
          <div ref={mapRef} className="clustrmaps-container"></div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-700 text-center text-sm text-gray-400">
          <p>Built with React and Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
};