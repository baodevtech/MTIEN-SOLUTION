'use client';

import { Search, Tag, SlidersHorizontal, X } from 'lucide-react';
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
  const [showFilter, setShowFilter] = useState(false);

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
    setShowFilter(false);
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
    setShowFilter(false);
  };

  const allCategories = ['Tất cả', ...categories];
  const hasActiveFilter = activeCategory || activeTag;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 md:mb-16">
      {/* Desktop: Title + Search */}
      <div className="hidden md:flex flex-col gap-6 animate-fade-in-up">
        <div className="max-w-2xl">
          <h1 className="text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
            MTIEN <span className="text-blue-600">Insights</span>
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            Góc nhìn chuyên sâu, xu hướng công nghệ và kinh nghiệm thực chiến từ đội ngũ chuyên gia.
          </p>
        </div>
        <form onSubmit={handleSearch} className="relative w-full max-w-md animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          <label htmlFor="blog-search-desktop" className="sr-only">Tìm kiếm bài viết</label>
          <input
            id="blog-search-desktop"
            type="search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Tìm kiếm bài viết..."
            className="w-full pl-12 pr-4 py-3 rounded-full border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm bg-slate-50 focus:bg-white transition-colors"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} aria-hidden="true" />
        </form>
      </div>

      {/* Desktop: Category pills */}
      <nav
        aria-label="Danh mục bài viết"
        className="hidden md:flex overflow-x-auto gap-3 mt-10 pb-2 scrollbar-hide animate-fade-in-up"
        style={{ animationDelay: '150ms' }}
      >
        {allCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryClick(cat)}
            className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-colors shrink-0 ${
              (cat === 'Tất cả' && !activeCategory) || cat === activeCategory
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </nav>

      {/* ══════ Mobile: Compact filter bar ══════ */}
      <div className="md:hidden">
        {/* Mobile title */}
        <h1 className="text-2xl font-extrabold text-slate-900 mb-4 tracking-tight">
          MTIEN <span className="text-blue-600">Insights</span>
        </h1>

        {/* Filter button */}
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => setShowFilter(!showFilter)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              showFilter || hasActiveFilter
                ? 'bg-slate-900 text-white'
                : 'bg-white text-slate-700 border border-slate-200 shadow-sm'
            }`}
          >
            <SlidersHorizontal size={16} />
            Bộ lọc
            {hasActiveFilter && (
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            )}
          </button>

          {/* Active filter chips */}
          {activeCategory && (
            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold">
              {activeCategory}
              <button onClick={() => handleCategoryClick('Tất cả')} className="hover:text-blue-900"><X size={12} /></button>
            </span>
          )}
          {activeTag && (
            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-xs font-semibold">
              #{activeTag}
              <button onClick={() => handleTagClick(activeTag)} className="hover:text-green-900"><X size={12} /></button>
            </span>
          )}
        </div>

        {/* Filter panel — slide down */}
        {showFilter && (
          <div className="bg-white border border-slate-200 rounded-2xl p-4 mb-4 shadow-lg animate-fade-in-up space-y-4">
            {/* Search inside filter */}
            <form onSubmit={handleSearch} className="relative">
              <label htmlFor="blog-search-mobile" className="sr-only">Tìm kiếm</label>
              <input
                id="blog-search-mobile"
                type="search"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Tìm kiếm bài viết..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            </form>

            {/* Category grid */}
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Danh mục</p>
              <div className="flex flex-wrap gap-2">
                {allCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleCategoryClick(cat)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      (cat === 'Tất cả' && !activeCategory) || cat === activeCategory
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-50 text-slate-600 border border-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Tags row — visible on both mobile & desktop */}
      {tags.length > 0 && (
        <div
          className="flex items-center gap-2 md:gap-2.5 mt-2 md:mt-4 overflow-x-auto pb-1 scrollbar-hide animate-fade-in-up -mx-4 px-4 sm:mx-0 sm:px-0"
          style={{ animationDelay: '200ms' }}
        >
          <Tag size={14} className="text-slate-400 shrink-0" aria-hidden="true" />
          <span className="text-[10px] md:text-xs font-semibold text-slate-400 uppercase tracking-wider shrink-0">Tags</span>
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
