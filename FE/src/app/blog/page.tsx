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

      {/* Hero Header */}
      <div className="bg-slate-50 pt-28 md:pt-36 pb-10 md:pb-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-2 md:mb-4 tracking-tight">
              MTIEN <span className="text-blue-600">Insights</span>
            </h1>
            <p className="text-sm md:text-lg text-slate-600 leading-relaxed">
              Góc nhìn chuyên sâu, xu hướng công nghệ và kinh nghiệm thực chiến từ đội ngũ chuyên gia.
            </p>
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