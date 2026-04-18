'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import type { BlogPagination as PaginationType } from '@/types';

export default function Pagination({ pagination }: { pagination: PaginationType }) {
  const searchParams = useSearchParams();
  const { page, totalPages, total } = pagination;

  if (totalPages <= 1) return null;

  const createPageUrl = (p: number) => {
    const sp = new URLSearchParams(searchParams.toString());
    if (p <= 1) {
      sp.delete('page');
    } else {
      sp.set('page', String(p));
    }
    const qs = sp.toString();
    return qs ? `/blog?${qs}` : '/blog';
  };

  // Smart page numbers with ellipsis for large page counts
  const getPages = (): (number | '...')[] => {
    const pages: (number | '...')[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (page > 3) pages.push('...');

      const start = Math.max(2, page - 1);
      const end = Math.min(totalPages - 1, page + 1);
      for (let i = start; i <= end; i++) pages.push(i);

      if (page < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-10 pt-8 border-t border-slate-200">
      <p className="text-sm text-slate-500">
        Trang <span className="font-bold text-slate-700">{page}</span> / {totalPages}
        <span className="ml-1 text-slate-400">({total} bài viết)</span>
      </p>

      <nav className="flex items-center gap-1" aria-label="Phân trang">
        {/* First page */}
        {page > 2 && (
          <Link
            href={createPageUrl(1)}
            className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
            title="Trang đầu"
          >
            <ChevronsLeft size={18} />
          </Link>
        )}

        {/* Previous */}
        {page > 1 && (
          <Link
            href={createPageUrl(page - 1)}
            className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
            title="Trang trước"
          >
            <ChevronLeft size={18} />
          </Link>
        )}

        {/* Page numbers */}
        {getPages().map((p, i) =>
          p === '...' ? (
            <span key={`ellipsis-${i}`} className="px-2 text-slate-400 select-none">…</span>
          ) : (
            <Link
              key={p}
              href={createPageUrl(p)}
              className={`min-w-[36px] h-9 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                p === page
                  ? 'bg-blue-600 text-white shadow-sm pointer-events-none'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {p}
            </Link>
          )
        )}

        {/* Next */}
        {page < totalPages && (
          <Link
            href={createPageUrl(page + 1)}
            className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
            title="Trang sau"
          >
            <ChevronRight size={18} />
          </Link>
        )}

        {/* Last page */}
        {page < totalPages - 1 && (
          <Link
            href={createPageUrl(totalPages)}
            className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
            title="Trang cuối"
          >
            <ChevronsRight size={18} />
          </Link>
        )}
      </nav>
    </div>
  );
}
