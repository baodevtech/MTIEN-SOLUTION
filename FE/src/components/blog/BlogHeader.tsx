'use client';

import { Search, Tag } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

interface BlogHeaderProps {
  categories: string[];
  activeCategory: string;
  tags?: string[];
  activeTag?: string;
}

export default function BlogHeader({ categories, activeCategory, tags = [], activeTag = '' }: BlogHeaderProps) {
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

  const handleTagClick = (t: string) => {
    const isActive = t === activeTag;
    router.push(createUrl({
      tag: isActive ? '' : t,
      category: searchParams.get('category') || '',
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
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 md:mb-16">
      {/* Title + Search — stacked on mobile */}
      <div className="flex flex-col gap-4 md:gap-6 mb-8 md:mb-0 animate-fade-in-up">
        <div className="max-w-2xl">
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-2 md:mb-4 tracking-tight">
            MTIEN <span className="text-blue-600">Insights</span>
          </h1>
          <p className="text-sm md:text-lg text-slate-600 leading-relaxed">
            Góc nhìn chuyên sâu, xu hướng công nghệ và kinh nghiệm thực chiến từ đội ngũ chuyên gia.
          </p>
        </div>

        <form
          onSubmit={handleSearch}
          className="relative w-full md:max-w-md animate-fade-in-up"
          style={{ animationDelay: '100ms' }}
        >
          <label htmlFor="blog-search" className="sr-only">Tìm kiếm bài viết</label>
          <input
            id="blog-search"
            type="search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Tìm kiếm bài viết..."
            className="w-full pl-11 md:pl-12 pr-4 py-2.5 md:py-3 rounded-full border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm text-sm md:text-base bg-slate-50 focus:bg-white transition-colors"
          />
          <Search className="absolute left-3.5 md:left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} aria-hidden="true" />
        </form>
      </div>

      {/* Category pills — horizontal scroll on mobile */}
      <nav
        aria-label="Danh mục bài viết"
        className="flex overflow-x-auto gap-2 md:gap-3 mt-6 md:mt-10 pb-2 scrollbar-hide animate-fade-in-up -mx-4 px-4 sm:mx-0 sm:px-0"
        style={{ animationDelay: '150ms' }}
      >
        {allCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryClick(cat)}
            className={`whitespace-nowrap px-4 md:px-5 py-2 rounded-full text-xs md:text-sm font-medium transition-colors shrink-0 ${
              (cat === 'Tất cả' && !activeCategory) || cat === activeCategory
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </nav>

      {/* Tags row */}
      {tags.length > 0 && (
        <div
          className="flex items-center gap-2 md:gap-2.5 mt-4 overflow-x-auto pb-1 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 animate-fade-in-up"
          style={{ animationDelay: '200ms' }}
        >
          <Tag size={14} className="text-slate-400 shrink-0" aria-hidden="true" />
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider shrink-0">Tags</span>
          {tags.slice(0, 15).map((t) => (
            <button
              key={t}
              onClick={() => handleTagClick(t)}
              className={`whitespace-nowrap text-xs md:text-sm font-medium transition-colors shrink-0 ${
                t === activeTag
                  ? 'text-blue-600 font-bold'
                  : 'text-slate-500 hover:text-blue-600'
              }`}
            >
              #{t}
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
