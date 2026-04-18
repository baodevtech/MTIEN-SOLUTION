import React, { Suspense } from 'react';
import { Metadata } from 'next';
import BlogHeader from '@/components/blog/BlogHeader';
import FeaturedPost from '@/components/blog/FeaturedPost';
import PostGrid from '@/components/blog/PostGrid';
import BlogSidebar from '@/components/blog/BlogSidebar';
import Pagination from '@/components/blog/Pagination';
import Newsletter from '@/components/blog/Newsletter';
import type { BlogListResponse, BlogPost } from '@/types';

const ADMIN_API_URL = process.env.ADMIN_API_URL || 'http://localhost:3001';
const API_KEY = process.env.REVALIDATION_SECRET || '';
const BASE_URL = process.env.APP_URL || 'https://mtiensolution.vn';
const POSTS_PER_PAGE = 12;

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
      next: { revalidate: 60 },
    });

    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

async function fetchRecentPosts(): Promise<BlogPost[]> {
  try {
    const res = await fetch(`${ADMIN_API_URL}/api/public/posts?page=1&limit=5`, {
      headers: { 'x-api-key': API_KEY },
      next: { revalidate: 300 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.data || [];
  } catch {
    return [];
  }
}

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function BlogPage({ searchParams }: Props) {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page) || 1);
  const category = typeof params.category === 'string' ? params.category : '';
  const tag = typeof params.tag === 'string' ? params.tag : '';
  const search = typeof params.search === 'string' ? params.search : '';

  const [blogData, recentPosts] = await Promise.all([
    fetchBlogData({ page, category, tag, search }),
    fetchRecentPosts(),
  ]);

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

  // Show featured post only on first page without filters
  const isFirstPage = page === 1 && !category && !tag && !search;
  const featuredPost = isFirstPage && posts.length > 0 ? posts[0] : null;
  const gridPosts = isFirstPage && posts.length > 1 ? posts.slice(1) : posts;

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
    <div className="bg-slate-50 min-h-screen font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero + Header */}
      <div className="bg-white pt-28 md:pt-36 pb-10 md:pb-14">
        <Suspense fallback={null}>
          <BlogHeader categories={categoryNames} activeCategory={category} tags={tags} activeTag={tag} />
        </Suspense>
      </div>

      {/* Featured Post — only on first unfiltered page */}
      {featuredPost && <FeaturedPost post={featuredPost} />}

      {/* Active filters indicator — desktop only (mobile shows in header filter bar) */}
      {(category || tag || search) && (
        <div className="hidden md:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="text-slate-500">Đang lọc:</span>
            {category && (
              <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full font-medium">
                Danh mục: {category}
              </span>
            )}
            {tag && (
              <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full font-medium">
                Tag: #{tag}
              </span>
            )}
            {search && (
              <span className="px-3 py-1 bg-orange-50 text-orange-700 rounded-full font-medium">
                Tìm: &ldquo;{search}&rdquo;
              </span>
            )}
            <a href="/blog" className="text-blue-600 hover:underline font-medium ml-2">
              Xóa bộ lọc
            </a>
          </div>
        </div>
      )}

      {/* Main Content + Sidebar */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left: Post Grid + Pagination */}
          <section className="lg:w-2/3" aria-label="Danh sách bài viết">
            <PostGrid posts={gridPosts} />
            <Suspense fallback={null}>
              <Pagination pagination={pagination} />
            </Suspense>
          </section>

          {/* Right: Sidebar */}
          <div className="lg:w-1/3">
            <div className="lg:sticky lg:top-28">
              <Suspense fallback={null}>
                <BlogSidebar
                  categories={categories}
                  tags={tags}
                  recentPosts={recentPosts}
                />
              </Suspense>
            </div>
          </div>
        </div>
      </main>

      {/* Newsletter — full width */}
      <div className="mb-20">
        <Newsletter />
      </div>
    </div>
  );
}