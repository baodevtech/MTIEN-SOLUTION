import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Calendar, Clock, Facebook, Twitter, Linkedin, Share2, Tag, ChevronRight, Eye } from 'lucide-react';
import { TableOfContents } from '@/components/blog/TableOfContents';
import type { BlogDetailResponse, BlogPost } from '@/types';

const ADMIN_API_URL = process.env.ADMIN_API_URL || 'http://localhost:3001';
const PUBLIC_ADMIN_API = process.env.NEXT_PUBLIC_ADMIN_API_URL || 'http://localhost:3001';
const API_KEY = process.env.REVALIDATION_SECRET || '';
const BASE_URL = process.env.APP_URL || 'https://mtiensolution.vn';

interface Props {
  params: Promise<{ slug: string }>;
}

// Helper: Create heading IDs
const slugify = (str: string) => {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[đĐ]/g, "d")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
};

// Helper: Process HTML content for TOC + SEO optimizations
const processContentWithTOC = (htmlContent: string) => {
  const regex = /<(h[2-3])>(.*?)<\/\1>/g;
  const toc: { id: string; text: string; level: string }[] = [];
  
  let processedContent = htmlContent.replace(regex, (match, tag, text) => {
    const cleanText = text.replace(/<[^>]+>/g, '');
    const id = slugify(cleanText);
    toc.push({ id, text: cleanText, level: tag });
    return `<${tag} id="${id}" class="scroll-mt-24 md:scroll-mt-32">${text}</${tag}>`;
  });

  // Add loading="lazy" and decoding="async" to all content images for PageSpeed
  processedContent = processedContent.replace(
    /<img(?!.*loading=)(.*?)>/g,
    '<img$1 loading="lazy" decoding="async">'
  );

  return { processedContent, toc };
};

function formatDate(dateStr: string | null) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('vi-VN', {
    day: '2-digit', month: '2-digit', year: 'numeric',
  });
}

function getImageUrl(src: string | null) {
  if (!src) return '';
  return src.startsWith('http') ? src : `${PUBLIC_ADMIN_API}${src}`;
}

async function fetchPostBySlug(slug: string): Promise<BlogDetailResponse | null> {
  try {
    const res = await fetch(`${ADMIN_API_URL}/api/public/posts/${slug}`, {
      headers: { 'x-api-key': API_KEY },
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const result = await fetchPostBySlug(slug);
  
  if (!result?.data) {
    return { title: 'Không tìm thấy bài viết' };
  }
  
  const post = result.data;
  const metaTitle = post.seoTitle || post.title;
  const metaDesc = post.seoDescription || post.excerpt || `Đọc bài viết ${post.title} từ MTIEN Solution - Giải pháp công nghệ số cho doanh nghiệp.`;
  const metaImage = post.ogImage || post.coverImage;
  const canonical = post.canonicalUrl || `${BASE_URL}/blog/${slug}`;
  return {
    title: `${metaTitle} | MTIEN Solution`,
    description: metaDesc,
    alternates: { canonical },
    ...(post.noIndex && { robots: { index: false, follow: true } }),
    ...(post.seoKeywords?.length && { keywords: post.seoKeywords.join(', ') }),
    openGraph: {
      title: metaTitle,
      description: metaDesc || undefined,
      url: `${BASE_URL}/blog/${slug}`,
      siteName: 'MTIEN Solution',
      type: 'article',
      locale: 'vi_VN',
      publishedTime: post.publishedAt || undefined,
      modifiedTime: post.updatedAt,
      authors: post.author ? [post.author] : undefined,
      tags: post.tags?.length ? post.tags : undefined,
      images: metaImage ? [{ url: getImageUrl(metaImage), width: 1200, height: 630, alt: metaTitle }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDesc || undefined,
      images: metaImage ? [getImageUrl(metaImage)] : [],
    },
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const result = await fetchPostBySlug(slug);

  if (!result?.data) notFound();

  const post = result.data;
  const relatedPosts = result.relatedPosts || [];

  const content = post.content || '';
  const { processedContent, toc } = processContentWithTOC(content);

  const wordCount = content.replace(/<[^>]+>/g, '').split(/\s+/g).filter(Boolean).length;
  const readTime = `${Math.max(1, Math.ceil(wordCount / 200))} phút đọc`;

  // JSON-LD Article schema for rich Google results
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt || '',
    image: post.coverImage ? getImageUrl(post.coverImage) : undefined,
    datePublished: post.publishedAt || post.createdAt,
    dateModified: post.updatedAt,
    author: {
      '@type': 'Person',
      name: post.author || 'Admin',
    },
    publisher: {
      '@type': 'Organization',
      name: 'MTIEN Solution',
      url: BASE_URL,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${BASE_URL}/blog/${slug}`,
    },
    wordCount,
    ...(post.category && { articleSection: post.category }),
    ...(post.tags?.length && { keywords: post.tags.join(', ') }),
  };

  // BreadcrumbList schema
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Trang chủ', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${BASE_URL}/blog` },
      ...(post.category ? [{ '@type': 'ListItem', position: 3, name: post.category, item: `${BASE_URL}/blog?category=${encodeURIComponent(post.category)}` }] : []),
      { '@type': 'ListItem', position: post.category ? 4 : 3, name: post.title },
    ],
  };

  return (
    <div className="bg-white min-h-screen font-sans pb-16 md:pb-20 scroll-smooth">
      {/* JSON-LD Schemas */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      
      <header className="relative overflow-hidden pt-20 md:pt-32 pb-6 md:pb-14 px-4 sm:px-6 lg:px-8">
           {/* Solid monochrome background */}
           <div className="absolute inset-0 bg-slate-900" />
           
           {/* Bottom fade */}
           <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
           <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />

           <div className="relative z-10 max-w-7xl mx-auto">
               <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 md:gap-2 text-[10px] md:text-xs text-slate-400 mb-4 md:mb-6 uppercase tracking-wider font-medium">
                  <Link href="/" className="hover:text-white transition-colors">Trang chủ</Link>
                  <ChevronRight size={12} className="text-slate-600" aria-hidden="true" />
                  <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
                  {post.category && (
                    <>
                      <ChevronRight size={12} className="text-slate-600" aria-hidden="true" />
                      <Link href={`/blog?category=${encodeURIComponent(post.category)}`} className="text-white/80 hover:text-white transition-colors">
                          {post.category}
                      </Link>
                    </>
                  )}
               </nav>

               <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-5 md:mb-6 leading-snug md:leading-tight max-w-4xl">
                  {post.title}
               </h1>
               
               {/* Metadata — lightweight pills */}
               <div className="flex flex-wrap items-center gap-3 md:gap-4 text-xs md:text-sm text-slate-300">
                   <div className="flex items-center gap-2 md:gap-3">
                       <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-white/15 shadow-sm overflow-hidden bg-white/10 shrink-0 flex items-center justify-center text-white font-bold text-sm">
                           {post.author ? post.author.charAt(0).toUpperCase() : 'A'}
                       </div>
                       <div>
                           <p className="font-bold text-white leading-tight">{post.author || 'Admin'}</p>
                           <p className="text-[10px] md:text-xs text-slate-500">Tác giả</p>
                       </div>
                   </div>
                   
                   <div className="hidden md:block w-px h-6 bg-white/15" aria-hidden="true"></div>
                   
                   <div className="flex items-center gap-1.5 md:gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                       <Calendar size={14} className="text-slate-400 md:w-4 md:h-4" aria-hidden="true" /> 
                       <time dateTime={post.publishedAt || post.createdAt}>{formatDate(post.publishedAt || post.createdAt)}</time>
                   </div>
                   
                   <div className="flex items-center gap-1.5 md:gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                       <Clock size={14} className="text-slate-400 md:w-4 md:h-4" aria-hidden="true" /> 
                       <span>{readTime}</span>
                   </div>

                   <div className="flex items-center gap-1.5 md:gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                       <Eye size={14} className="text-slate-400 md:w-4 md:h-4" aria-hidden="true" /> 
                       <span>{post.views} lượt xem</span>
                   </div>
               </div>
           </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="flex flex-col lg:flex-row gap-10 md:gap-12">
              
              {/* LEFT: Article content */}
              <main className="lg:w-3/4">
                  {/* Cover Image */}
                  {post.coverImage && (
                    <div className="rounded-xl md:rounded-2xl overflow-hidden shadow-sm mb-6 md:mb-10 aspect-[16/9] bg-slate-100 relative">
                        <Image 
                            src={getImageUrl(post.coverImage)}
                            alt={post.title} 
                            fill
                            priority
                            fetchPriority="high"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 900px"
                            quality={60}
                            className="object-cover" 
                        />
                    </div>
                  )}

                  {/* Mobile TOC */}
                  <div className="block lg:hidden mb-8">
                      <TableOfContents toc={toc} />
                  </div>

                  {/* Prose content */}
                  <article 
                      itemScope
                      itemType="https://schema.org/Article"
                      className="prose prose-base md:prose-lg prose-slate max-w-none 
                      prose-headings:font-bold prose-headings:text-slate-900 prose-headings:mt-8 md:prose-headings:mt-10 prose-headings:mb-4
                      prose-p:text-slate-600 prose-p:leading-relaxed md:prose-p:leading-8 prose-p:mb-5 md:prose-p:mb-6
                      prose-a:text-[#0066FF] prose-a:font-semibold prose-a:no-underline hover:prose-a:underline
                      prose-img:rounded-lg md:prose-img:rounded-xl prose-img:shadow-sm md:prose-img:shadow-md prose-img:border prose-img:border-gray-100 prose-img:my-6 md:prose-img:my-8
                      prose-blockquote:border-l-4 prose-blockquote:border-[#0066FF] prose-blockquote:bg-blue-50 prose-blockquote:py-3 md:prose-blockquote:py-4 prose-blockquote:px-4 md:prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:italic prose-blockquote:text-slate-700
                      prose-strong:text-slate-800 prose-li:text-slate-600
                      prose-h2:text-xl md:prose-h2:text-2xl prose-h3:text-lg md:prose-h3:text-xl"
                      dangerouslySetInnerHTML={{ __html: processedContent }}
                  />

                  {/* Tags & Share */}
                  <footer className="mt-10 md:mt-12 pt-6 md:pt-8 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5 md:gap-6">
                      {/* Tags */}
                      <div className="flex flex-wrap items-center gap-2">
                          <Tag size={16} className="text-slate-400 mr-1 md:w-[18px] md:h-[18px]" />
                          {post.tags && post.tags.length > 0 ? (
                              post.tags.map((tag, index) => (
                                <Link 
                                    key={index} 
                                    href={`/blog?tag=${encodeURIComponent(tag)}`}
                                    className="px-2.5 py-1 bg-gray-100 text-slate-600 text-xs md:text-sm font-medium rounded hover:bg-amber-50 hover:text-amber-600 transition-colors"
                                >
                                    #{tag}
                                </Link>
                              ))
                          ) : post.category ? (
                              <Link href={`/blog?category=${encodeURIComponent(post.category)}`} className="px-2.5 py-1 bg-gray-100 text-slate-600 text-xs md:text-sm font-medium rounded hover:bg-amber-50 hover:text-amber-600">
                                  {post.category}
                              </Link>
                          ) : null}
                      </div>
                      
                      {/* Share Buttons */}
                      <div className="flex items-center gap-2.5 md:gap-3 w-full sm:w-auto pt-4 sm:pt-0 border-t sm:border-0 border-gray-50">
                          <span className="text-xs md:text-sm font-bold text-slate-500 mr-1 md:mr-2">Chia sẻ:</span>
                          <button aria-label="Share on Facebook" className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100 transition-colors"><Facebook size={14} className="md:w-4 md:h-4"/></button>
                          <button aria-label="Share on Twitter" className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-sky-50 text-sky-500 flex items-center justify-center hover:bg-sky-100 transition-colors"><Twitter size={14} className="md:w-4 md:h-4"/></button>
                          <button aria-label="Share on LinkedIn" className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center hover:bg-indigo-100 transition-colors"><Linkedin size={14} className="md:w-4 md:h-4"/></button>
                          <button aria-label="Copy Link" className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-gray-200 transition-colors"><Share2 size={14} className="md:w-4 md:h-4"/></button>
                      </div>
                  </footer>
              </main>

              {/* RIGHT: Sidebar */}
              <aside className="lg:w-1/4 space-y-6 md:space-y-8">
                  {/* Author Box */}
                  <div className="bg-slate-50 lg:bg-white p-5 md:p-6 rounded-xl md:rounded-2xl border border-gray-100 shadow-sm text-center">
                      <div className="w-16 h-16 md:w-20 md:h-20 rounded-full mx-auto mb-3 md:mb-4 border-2 border-amber-100 overflow-hidden bg-gray-100 flex items-center justify-center text-slate-600 font-bold text-2xl">
                          {post.author ? post.author.charAt(0).toUpperCase() : 'A'}
                      </div>
                      <h3 className="font-bold text-slate-900 text-base md:text-lg">{post.author || 'Admin'}</h3>
                      <p className="text-[10px] md:text-xs text-amber-600 font-bold uppercase tracking-widest mb-2 md:mb-3 mt-1">Tác giả</p>
                  </div>

                  <div className="lg:sticky lg:top-32 space-y-6 md:space-y-8">
                      <div className="hidden lg:block">
                          <TableOfContents toc={toc} />
                      </div>

                      {/* CTA Box */}
                      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl md:rounded-2xl p-5 md:p-6 text-white relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-20 h-20 bg-amber-500 rounded-full blur-2xl -mr-10 -mt-10 opacity-50"></div>
                          <h4 className="font-bold text-base md:text-lg mb-1.5 md:mb-2 relative z-10">Cần tư vấn ngay?</h4>
                          <p className="text-slate-300 text-xs md:text-sm mb-4 relative z-10 leading-relaxed">Liên hệ đội ngũ chuyên gia để được hỗ trợ giải pháp công nghệ.</p>
                          <Link href="/contact" className="block w-full py-2.5 md:py-3 bg-amber-500 text-slate-900 text-sm text-center font-bold uppercase tracking-wider rounded-lg hover:bg-amber-400 transition-colors shadow-lg relative z-10">
                              Liên hệ ngay
                          </Link>
                      </div>
                  </div>
              </aside>

          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
              <section className="mt-12 md:mt-20 pt-10 md:pt-12 border-t border-gray-100">
                  <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-6 md:mb-8 border-l-4 border-amber-500 pl-3 md:pl-4">Bài viết liên quan</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                      {relatedPosts.map((p: BlogPost) => (
                          <Link key={p.id} href={`/blog/${p.slug}`} className="group flex flex-row md:flex-col gap-3 md:gap-0 bg-white md:bg-gray-50 p-3 md:p-0 rounded-xl border border-gray-100 hover:border-amber-200 hover:shadow-md transition-all overflow-hidden">
                              <div className="w-20 h-20 md:w-full md:h-48 rounded-lg md:rounded-t-xl md:rounded-b-none overflow-hidden shrink-0 bg-slate-200 relative">
                                  {p.coverImage && (
                                    <Image 
                                        src={getImageUrl(p.coverImage)}
                                        alt={p.title} 
                                        fill
                                        sizes="(max-width: 768px) 80px, 33vw"
                                        className="object-cover transition-transform duration-500 group-hover:scale-110" 
                                    />
                                  )}
                              </div>
                              <div className="flex-1 min-w-0 md:p-4">
                                  {p.category && (
                                    <p className="text-[10px] md:text-xs font-bold text-amber-600 uppercase mb-1 truncate">{p.category}</p>
                                  )}
                                  <h4 className="font-bold text-sm md:text-base text-slate-900 group-hover:text-amber-600 transition-colors line-clamp-2 leading-snug">{p.title}</h4>
                                  <time dateTime={p.publishedAt || p.createdAt} className="text-[10px] md:text-xs text-slate-500 mt-1.5 md:mt-2 block">{formatDate(p.publishedAt || p.createdAt)}</time>
                              </div>
                          </Link>
                      ))}
                  </div>
              </section>
          )}
      </div>
    </div>
  );
}