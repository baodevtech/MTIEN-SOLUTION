import type { MetadataRoute } from 'next';
import { getSettings } from '@/lib/theme-fetcher';

const BASE_URL = process.env.APP_URL || 'https://mtiensolution.vn';
const ADMIN_API_URL = process.env.ADMIN_API_URL || 'http://localhost:3001';
const API_KEY = process.env.REVALIDATION_SECRET || '';

interface SitemapPost {
  slug: string;
  updatedAt: string;
}

async function fetchAllBlogSlugs(): Promise<SitemapPost[]> {
  try {
    const res = await fetch(`${ADMIN_API_URL}/api/public/posts?page=1&limit=100`, {
      headers: { 'x-api-key': API_KEY },
      next: { tags: ['posts', 'pages'] },
    });
    if (!res.ok) return [];
    const json = await res.json();
    return (json.data || []).map((p: { slug: string; updatedAt: string }) => ({
      slug: p.slug,
      updatedAt: p.updatedAt,
    }));
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [settings, blogPosts] = await Promise.all([
    getSettings(),
    fetchAllBlogSlugs(),
  ]);
  
  const shopHidden = settings?.general?.shopMaintenance === true;

  const routes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/services`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/projects`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.6 },
    { url: `${BASE_URL}/dich-vu/phan-mem`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/dich-vu/cloud-server`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/dich-vu/marketing-design`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/dich-vu/marketing`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  ];

  // Dynamic blog post URLs for Google indexing
  for (const post of blogPosts) {
    routes.push({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt),
      changeFrequency: 'weekly',
      priority: 0.7,
    });
  }

  if (!shopHidden) {
    routes.push({ url: `${BASE_URL}/shop`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 });
  }

  return routes;
}
