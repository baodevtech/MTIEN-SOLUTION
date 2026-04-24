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

      {/* Neo-brutalist Floating Island Header */}
      <div className="bg-[#f4f4f0] bg-[radial-gradient(#d1d5db_1px,transparent_1px)] [background-size:20px_20px] pt-12 md:pt-16 pb-12 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
          
          {/* The Brutal "Island" Box */}
          <div className="bg-white border-[3px] md:border-4 border-black shadow-[8px_8px_0_rgba(0,0,0,1)] rounded-2xl p-6 md:p-8 lg:p-10 flex flex-col md:flex-row items-center justify-between gap-8 hover:shadow-[12px_12px_0_rgba(0,0,0,1)] hover:-translate-y-1 transition-all duration-300">
            
            {/* Left Content */}
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-300 border-2 border-black text-black text-xs font-black uppercase tracking-widest shadow-[2px_2px_0_rgba(0,0,0,1)] mb-6 transform -rotate-1 hover:rotate-0 transition-transform cursor-pointer">
                Tài nguyên học tập cực chất
              </div>
              
              <h1 className="text-4xl md:text-5xl font-black text-black tracking-tighter mb-5 uppercase leading-[1.1] drop-shadow-[2px_2px_0_#ccc]">
                MTIEN <span className="px-3 border-[3px] border-black rounded-lg text-black -rotate-3 inline-block bg-amber-300 shadow-[4px_4px_0_rgba(0,0,0,1)]">Insights</span>
              </h1>
              
              <p className="text-black text-sm md:text-base leading-relaxed max-w-lg mx-auto md:mx-0 font-bold border-l-4 border-blue-500 pl-4">
                Chia sẻ kiến thức lập trình, phân tích chuyên sâu về kiến trúc hệ thống và những bài học xương máu trong phát triển phần mềm.
              </p>
            </div>

             {/* Right Floating Avatars / Contributors */}
            <div className="flex flex-col items-center shrink-0 mt-4 md:mt-0">
              <span className="text-[10px] uppercase font-black text-black tracking-widest mb-3 py-1 px-2 border-2 border-black bg-blue-100 shadow-[2px_2px_0_rgba(0,0,0,1)] -rotate-2">Đóng góp bởi chuyên gia</span>
              <div className="flex -space-x-3 md:-space-x-4 cursor-pointer hover:space-x-2 transition-all duration-300">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border-[3px] border-black bg-blue-400 flex items-center justify-center text-black font-black shadow-[2px_2px_0_rgba(0,0,0,1)] hover:-translate-y-2 transition-transform">AI</div>
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border-[3px] border-black bg-amber-400 flex items-center justify-center text-black font-black shadow-[2px_2px_0_rgba(0,0,0,1)] z-10 hover:-translate-y-2 transition-transform">PM</div>
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border-[3px] border-black bg-emerald-400 flex items-center justify-center text-black font-black shadow-[2px_2px_0_rgba(0,0,0,1)] z-20 hover:-translate-y-2 transition-transform">DE</div>
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border-[3px] border-black bg-white text-black flex items-center justify-center text-base md:text-lg font-black shadow-[2px_2px_0_rgba(0,0,0,1)] z-30 hover:-translate-y-2 transition-transform">+9</div>
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