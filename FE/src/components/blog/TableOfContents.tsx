'use client';

import React, { useEffect, useState } from 'react';

interface TocItem {
  id: string;
  text: string;
  level: string;
}

export const TableOfContents = ({ toc }: { toc: TocItem[] }) => {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -40% 0px' }
    );

    toc.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [toc]);

  if (toc.length === 0) return null;

  return (
    <div className="bg-slate-50 p-6 rounded-2xl border border-gray-200">
      <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
        Mục lục
      </h4>
      <nav className="space-y-1 max-h-[60vh] overflow-y-auto custom-scrollbar pr-2">
        {toc.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
              setActiveId(item.id);
            }}
            className={`
              block py-2 text-sm transition-all border-l-2 pl-3
              ${item.level === 'h3' ? 'ml-3' : ''}
              ${activeId === item.id
                ? 'border-blue-600 text-blue-700 font-bold bg-blue-50 rounded-r-lg'
                : 'border-transparent text-slate-600 hover:text-blue-600 hover:border-blue-200'
              }
            `}
          >
            {item.text}
          </a>
        ))}
      </nav>
    </div>
  );
};
