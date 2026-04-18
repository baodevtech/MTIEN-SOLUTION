import Image from 'next/image';
import Link from 'next/link';
import { Clock, User } from 'lucide-react';
import type { BlogPost } from '@/types';

const ADMIN_URL = process.env.NEXT_PUBLIC_ADMIN_API_URL || '';

function getImageUrl(src: string | null) {
  if (!src) return null;
  return src.startsWith('http') ? src : `${ADMIN_URL}${src}`;
}

export default function PostGrid({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-5xl mb-4">📝</div>
        <p className="text-slate-500 text-lg font-medium">Không tìm thấy bài viết nào.</p>
        <p className="text-slate-400 text-sm mt-2">Hãy thử tìm kiếm với từ khóa khác hoặc chọn danh mục khác.</p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {posts.map((post, index) => {
        const readTime = Math.max(1, Math.ceil((post.content?.length || 0) / 1500));
        const imageUrl = getImageUrl(post.coverImage);

        return (
          <article
            key={post.id}
            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-100 group flex flex-col animate-fade-in-up"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <Link href={`/blog/${post.slug}`} className="relative h-52 overflow-hidden block">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading={index < 2 ? 'eager' : 'lazy'}
                  className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300" />
              )}
              {post.category && (
                <span className="absolute top-4 left-4 bg-white/90 px-3 py-1 rounded-full text-xs font-bold text-blue-600 uppercase tracking-wider">
                  {post.category}
                </span>
              )}
            </Link>

            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-lg font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h3>
              {post.excerpt && (
                <p className="text-slate-600 mb-4 line-clamp-2 leading-relaxed text-sm flex-1">
                  {post.excerpt}
                </p>
              )}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs text-slate-500 font-medium">
                {post.author && (
                  <div className="flex items-center gap-1.5">
                    <User size={14} className="text-orange-500" /> {post.author}
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Clock size={14} /> {readTime}p
                  </span>
                  {post.publishedAt && (
                    <time dateTime={post.publishedAt}>{new Date(post.publishedAt).toLocaleDateString('vi-VN')}</time>
                  )}
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
