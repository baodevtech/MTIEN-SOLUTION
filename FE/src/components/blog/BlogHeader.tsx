'use client';

import { Search } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

interface BlogHeaderProps {
  categories: string[];
  activeCategory: string;
}

export default function BlogHeader({ categories, activeCategory }: BlogHeaderProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(searchParams.get('search') || '');

  const createUrl = (params: Record<string, string>) => {
    const sp = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v) sp.set(k, v);
    });
    const qs = sp.toString();
    return qs ? `/blog?${qs}` : '/blog';
  };

  const handleCategoryClick = (cat: string) => {
    const isAll = cat === 'Tất cả';
    router.push(createUrl({
      category: isAll ? '' : cat,
      search: searchParams.get('search') || '',
    }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(createUrl({
      category: searchParams.get('category') || '',
      search: searchValue,
    }));
  };

  const allCategories = ['Tất cả', ...categories];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6">
        <div className="max-w-2xl animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
            MTIEN <span className="text-blue-600">Insights</span>
          </h1>
          <p className="text-lg text-slate-600">
            Góc nhìn chuyên sâu, xu hướng công nghệ và kinh nghiệm thực chiến từ đội ngũ chuyên gia.
          </p>
        </div>

        <form
          onSubmit={handleSearch}
          className="w-full md:w-auto relative animate-fade-in-up"
          style={{ animationDelay: '100ms' }}
        >
          <label htmlFor="blog-search" className="sr-only">Tìm kiếm bài viết</label>
          <input
            id="blog-search"
            type="search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Tìm kiếm bài viết..."
            className="w-full md:w-80 pl-12 pr-4 py-3 rounded-full border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} aria-hidden="true" />
        </form>
      </div>

      <nav
        aria-label="Danh mục bài viết"
        className="flex overflow-x-auto gap-3 mt-10 pb-2 scrollbar-hide animate-fade-in-up"
        style={{ animationDelay: '150ms' }}
      >
        {allCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryClick(cat)}
            className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-colors ${
              (cat === 'Tất cả' && !activeCategory) || cat === activeCategory
                ? 'bg-slate-900 text-white'
                : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </nav>
    </section>
  );
}
