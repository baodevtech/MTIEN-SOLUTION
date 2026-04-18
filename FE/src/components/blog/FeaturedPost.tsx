import Image from 'next/image';
import Link from 'next/link';
import { Clock, User, Calendar } from 'lucide-react';
import type { BlogPost } from '@/types';

const ADMIN_URL = process.env.NEXT_PUBLIC_ADMIN_API_URL || '';

function getImageUrl(src: string | null) {
  if (!src) return null;
  return src.startsWith('http') ? src : `${ADMIN_URL}${src}`;
}

export default function FeaturedPost({ post }: { post?: BlogPost | null }) {
  if (!post) return null;

  const readTime = Math.max(1, Math.ceil((post.content?.length || 0) / 1500));
  const imageUrl = getImageUrl(post.coverImage);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
      <article className="animate-fade-in-up">
        <Link
          href={`/blog/${post.slug}`}
          className="block bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-100 group cursor-pointer"
        >
          <div className="relative h-[400px] md:h-[500px] overflow-hidden">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={post.title}
                fill
                priority
                fetchPriority="high"
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-blue-600 to-indigo-700" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-80" />

            <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 text-white">
              {post.category && (
                <span className="px-4 py-1.5 bg-orange-500 text-white rounded-full text-xs font-bold uppercase tracking-wider mb-6 inline-block shadow-lg">
                  {post.category}
                </span>
              )}
              <h2 className="text-3xl md:text-5xl font-bold mb-4 leading-tight max-w-4xl group-hover:text-blue-200 transition-colors">
                {post.title}
              </h2>
              {post.excerpt && (
                <p className="text-slate-300 text-lg mb-6 max-w-3xl hidden md:block leading-relaxed">
                  {post.excerpt}
                </p>
              )}
              <div className="flex items-center gap-6 text-sm text-slate-300 font-medium">
                {post.author && (
                  <div className="flex items-center gap-2">
                    <User size={16} /> {post.author}
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Clock size={16} /> {readTime} phút đọc
                </div>
                {post.publishedAt && (
                  <div className="hidden sm:flex items-center gap-2">
                    <Calendar size={16} />
                    <time dateTime={post.publishedAt}>{new Date(post.publishedAt).toLocaleDateString('vi-VN')}</time>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Link>
      </article>
    </section>
  );
}
