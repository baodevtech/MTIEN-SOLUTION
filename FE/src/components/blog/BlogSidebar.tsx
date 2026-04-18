'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Search, ChevronRight, TrendingUp, Hash, Clock } from 'lucide-react';
import type { BlogPost, CategoryWithCount } from '@/types';

const ADMIN_URL = process.env.NEXT_PUBLIC_ADMIN_API_URL || '';

function getImageUrl(src: string | null) {
  if (!src) return null;
  return src.startsWith('http') ? src : `${ADMIN_URL}${src}`;
}

interface BlogSidebarProps {
  categories: CategoryWithCount[];
  tags: string[];
  recentPosts: BlogPost[];
}

export default function BlogSidebar({ categories, tags, recentPosts }: BlogSidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const sp = new URLSearchParams();
    if (searchValue) sp.set('search', searchValue);
    const qs = sp.toString();
    router.push(qs ? `/blog?${qs}` : '/blog');
  };

  const handleCategoryClick = (cat: string) => {
    const sp = new URLSearchParams(searchParams.toString());
    sp.set('category', cat);
    sp.delete('page');
    router.push(`/blog?${sp.toString()}`);
  };

  const handleTagClick = (tag: string) => {
    const sp = new URLSearchParams(searchParams.toString());
    sp.set('tag', tag);
    sp.delete('page');
    router.push(`/blog?${sp.toString()}`);
  };

  return (
    <aside className="space-y-8" aria-label="Blog sidebar">
      {/* Search */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm animate-fade-in-up">
        <h3 className="font-bold text-slate-900 text-lg mb-4">Tìm kiếm</h3>
        <form onSubmit={handleSearch} className="relative">
          <label htmlFor="sidebar-search" className="sr-only">Tìm kiếm bài viết</label>
          <input
            id="sidebar-search"
            type="search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Nhập từ khóa..."
            className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
        </form>
      </div>

      {/* Categories */}
      {categories.length > 0 && (
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm animate-fade-in-up" style={{ animationDelay: '50ms' }}>
          <h3 className="font-bold text-slate-900 text-lg mb-4 flex items-center gap-2">
            <TrendingUp size={18} className="text-blue-600" aria-hidden="true" />
            Danh mục
          </h3>
          <ul className="space-y-1">
            {categories.map((cat) => (
              <li key={cat.name}>
                <button
                  onClick={() => handleCategoryClick(cat.name)}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-all group"
                >
                  <span>{cat.name}</span>
                  <span className="flex items-center gap-1 text-xs text-slate-400 group-hover:text-blue-500">
                    {cat.count} <ChevronRight size={14} />
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Popular Tags */}
      {tags.length > 0 && (
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          <h3 className="font-bold text-slate-900 text-lg mb-4 flex items-center gap-2">
            <Hash size={18} className="text-blue-600" aria-hidden="true" />
            Tags phổ biến
          </h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagClick(tag)}
                className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition-all"
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Recent Posts */}
      {recentPosts.length > 0 && (
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm animate-fade-in-up" style={{ animationDelay: '150ms' }}>
          <h3 className="font-bold text-slate-900 text-lg mb-4 flex items-center gap-2">
            <Clock size={18} className="text-blue-600" aria-hidden="true" />
            Bài viết gần đây
          </h3>
          <div className="space-y-4">
            {recentPosts.map((post) => {
              const imageUrl = getImageUrl(post.coverImage);

              return (
                <Link key={post.id} href={`/blog/${post.slug}`} className="flex gap-3 group items-start">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 relative shrink-0">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={post.title}
                        fill
                        sizes="64px"
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-slate-800 line-clamp-2 group-hover:text-blue-600 transition-colors leading-snug">
                      {post.title}
                    </h4>
                    {post.publishedAt && (
                      <time dateTime={post.publishedAt} className="text-xs text-slate-400 mt-1 block">
                        {new Date(post.publishedAt).toLocaleDateString('vi-VN')}
                      </time>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* CTA Box */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-white relative overflow-hidden animate-fade-in-up" style={{ animationDelay: '200ms' }}>
        <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500 rounded-full blur-2xl -mr-10 -mt-10 opacity-50" />
        <h4 className="font-bold text-lg mb-2 relative z-10">Cần tư vấn ngay?</h4>
        <p className="text-slate-300 text-sm mb-4 relative z-10 leading-relaxed">
          Liên hệ đội ngũ chuyên gia để được hỗ trợ giải pháp công nghệ.
        </p>
        <Link
          href="/contact"
          className="block w-full py-3 bg-blue-600 text-white text-sm text-center font-bold uppercase tracking-wider rounded-xl hover:bg-blue-500 transition-colors shadow-lg relative z-10"
        >
          Liên hệ ngay
        </Link>
      </div>
    </aside>
  );
}
