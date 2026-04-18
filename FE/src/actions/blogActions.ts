'use server';

import type { BlogPost, BlogListResponse } from '@/types';

const ADMIN_API_URL = process.env.ADMIN_API_URL || 'http://localhost:3001';
const API_KEY = process.env.REVALIDATION_SECRET || '';
const POSTS_PER_PAGE = 5;

export async function fetchMorePostsAction(
  limit: number = POSTS_PER_PAGE,
  currentPage: string, // page number as string, "" = page 1
  category?: string,
  search?: string,
  tag?: string
): Promise<{
  posts: BlogPost[];
  pageInfo: { hasNextPage: boolean; endCursor: string };
}> {
  try {
    const page = currentPage ? parseInt(currentPage) : 1;
    const sp = new URLSearchParams();
    sp.set('page', String(page));
    sp.set('limit', String(limit));
    if (category && category !== 'All' && category !== 'Tất cả') sp.set('category', category);
    if (tag) sp.set('tag', tag);
    if (search) sp.set('search', search);

    const res = await fetch(`${ADMIN_API_URL}/api/public/posts?${sp.toString()}`, {
      headers: { 'x-api-key': API_KEY },
      cache: 'no-store',
    });

    if (!res.ok) {
      return { posts: [], pageInfo: { hasNextPage: false, endCursor: '' } };
    }

    const data: BlogListResponse = await res.json();
    const pagination = data.pagination;

    return {
      posts: data.data || [],
      pageInfo: {
        hasNextPage: pagination.hasNextPage,
        endCursor: String(pagination.page + 1), // next page number
      },
    };
  } catch {
    return { posts: [], pageInfo: { hasNextPage: false, endCursor: '' } };
  }
}
