import React, { Suspense } from 'react';
import { Metadata } from 'next';
import BlogListClient from '@/components/blog/BlogListClient';
import type { BlogListResponse } from '@/types';

const ADMIN_API_URL = process.env.ADMIN_API_URL || 'http://localhost:3001';
const API_KEY = process.env.REVALIDATION_SECRET || '';
const BASE_URL = process.env.APP_URL || 'https://mtiensolution.vn';
const POSTS_PER_PAGE = 5;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Blog - Kiến Thức & Giải Pháp Công Nghệ | MTIEN Solution',
    description: 'Cập nhật xu hướng công nghệ, giải pháp phần mềm, cloud server và marketing số từ đội ngũ chuyên gia MTIEN Solution. Chia sẻ kinh nghiệm thực chiến từ đội ngũ kỹ sư.',
    alternates: { canonical: `${BASE_URL}/blog` },
    openGraph: {
      title: 'Blog - Kiến Thức & Giải Pháp Công Nghệ | MTIEN Solution',
      description: 'Cập nhật xu hướng công nghệ, giải pháp phần mềm, cloud server và marketing số.',
      url: `${BASE_URL}/blog`,
      siteName: 'MTIEN Solution',
      type: 'website',
      locale: 'vi_VN',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Blog - MTIEN Solution',
      description: 'Kiến thức công nghệ & giải pháp số cho doanh nghiệp.',
    },
  };
}

async function fetchBlogData(params: {
  page: number;
  category?: string;
  tag?: string;
  search?: string;
}): Promise<BlogListResponse | null> {
  try {
    const sp = new URLSearchParams();
    sp.set('page', String(params.page));
    sp.set('limit', String(POSTS_PER_PAGE));
    if (params.category) sp.set('category', params.category);
    if (params.tag) sp.set('tag', params.tag);
    if (params.search) sp.set('search', params.search);

    const res = await fetch(`${ADMIN_API_URL}/api/public/posts?${sp.toString()}`, {
      headers: { 'x-api-key': API_KEY },
      next: { tags: ['posts'] },
    });

    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function BlogPage({ searchParams }: Props) {
  const params = await searchParams;
  const category = typeof params.category === 'string' ? params.category : '';
  const tag = typeof params.tag === 'string' ? params.tag : '';
  const search = typeof params.search === 'string' ? params.search : '';

  const blogData = await fetchBlogData({ page: 1, category, tag, search });

  const posts = blogData?.data || [];
  const categories = blogData?.categories || [];
  const tags = blogData?.tags || [];
  const pagination = blogData?.pagination || {
    page: 1,
    limit: POSTS_PER_PAGE,
    total: 0,
    totalPages: 0,
    hasNextPage: false,
  };

  const categoryNames = categories.map((c) => c.name);

  // JSON-LD CollectionPage + ItemList schema
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Blog - Kiến Thức & Giải Pháp Công Nghệ | MTIEN Solution',
    description: 'Cập nhật xu hướng công nghệ, giải pháp phần mềm, cloud server và marketing số từ đội ngũ chuyên gia MTIEN Solution.',
    url: `${BASE_URL}/blog`,
    publisher: {
      '@type': 'Organization',
      name: 'MTIEN Solution',
      url: BASE_URL,
    },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: posts.length,
      itemListElement: posts.slice(0, 10).map((post, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `${BASE_URL}/blog/${post.slug}`,
        name: post.title,
      })),
    },
  };

  return (
    <div className="bg-white min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Tech Newsletter / Substack Profile Header */}
      <div className="bg-white pt-24 md:pt-32 pb-8 md:pb-12 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-10">
            
            {/* Left: Brand & Newsletter */}
            <div className="w-full lg:w-3/5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-md shrink-0">
                  M.
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">MTIEN Insights</h1>
                  <div className="text-sm text-slate-500 font-medium font-mono tracking-widest mt-0.5">TECH-DIGEST @ 2026</div>
                </div>
              </div>
              <p className="text-slate-600 text-base md:text-lg mb-6 max-w-xl leading-relaxed">
                Bản tin xuất bản hàng tuần về kiến trúc phần mềm, xu hướng Cloud và các Case study triển khai hệ thống giải pháp số thực chiến.
              </p>
              
              {/* Form Inline (Dummy form) để tăng tính thực dụng UI */}
              <div className="flex flex-col sm:flex-row gap-2 max-w-md">
                <input 
                  type="email" 
                  placeholder="Nhập email của bạn..." 
                  className="flex-1 bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
                />
                <button className="bg-slate-900 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-slate-800 transition-colors whitespace-nowrap shadow-sm">
                  Đăng ký nhận bài
                </button>
              </div>
              <p className="text-[11px] text-slate-400 mt-2.5 font-medium">✨ Tham gia cùng hơn 2,000+ Engineers & CEO khác hàng tháng.</p>
            </div>
            
            {/* Right: Trending Topics Sidebar-style */}
            <div className="w-full lg:w-2/5 lg:pl-10 lg:border-l border-slate-100 flex flex-col gap-4">
              <div className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest">Đang được quan tâm</div>
              
              <div className="flex flex-col gap-4">
                <div className="group cursor-pointer">
                  <div className="text-blue-600 text-[10px] font-bold uppercase tracking-wider mb-1">#SystemDesign</div>
                  <h3 className="text-slate-800 font-semibold group-hover:text-blue-600 transition-colors text-sm md:text-base leading-snug">Thiết kế hệ thống chịu tải cao (High Availability) cho doanh nghiệp TMĐT</h3>
                </div>
                
                <div className="w-full h-px bg-slate-100"></div>
                
                <div className="group cursor-pointer">
                  <div className="text-amber-600 text-[10px] font-bold uppercase tracking-wider mb-1">#DevOps</div>
                  <h3 className="text-slate-800 font-semibold group-hover:text-blue-600 transition-colors text-sm md:text-base leading-snug">Tối ưu chi phí vận hành AWS Cloud cho dòng quy mô SME</h3>
                </div>
                
                <div className="w-full h-px bg-slate-100"></div>
                
                <div className="group cursor-pointer">
                  <div className="text-emerald-600 text-[10px] font-bold uppercase tracking-wider mb-1">#Management</div>
                  <h3 className="text-slate-800 font-semibold group-hover:text-blue-600 transition-colors text-sm md:text-base leading-snug">Case Study đắt giá: Chuyển đổi số thành công trong 6 tháng</h3>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <Suspense fallback={null}>
          <BlogListClient
            initialPosts={posts}
            initialPageInfo={{
              hasNextPage: pagination.hasNextPage,
              endCursor: String(pagination.page + 1),
            }}
            categories={categoryNames}
            tags={tags}
          />
        </Suspense>
      </div>
    </div>
  );
}