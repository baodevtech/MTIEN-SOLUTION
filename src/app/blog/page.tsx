import BlogHeader from '@/components/blog/BlogHeader';
import FeaturedPost from '@/components/blog/FeaturedPost';
import PostGrid from '@/components/blog/PostGrid';
import Newsletter from '@/components/blog/Newsletter';

/**
 * Blog Page - Trang tin tuc & kien thuc cong nghe
 *
 * Cau truc sections:
 * 1. BlogHeader - Tieu de, thanh tim kiem va bo loc danh muc
 * 2. FeaturedPost - Bai viet noi bat (ghim)
 * 3. PostGrid - Luoi bai viet (2 cot)
 * 4. Newsletter - Form dang ky nhan ban tin
 */
export default function Blog() {
  return (
    <div className="pt-20 pb-24 bg-slate-50 min-h-screen">
      {/* 1. Header & Tim kiem */}
      <BlogHeader />

      {/* 2. Bai viet noi bat */}
      <FeaturedPost />

      {/* 3. Danh sach bai viet */}
      <PostGrid />

      {/* 4. Dang ky nhan ban tin */}
      <Newsletter />
    </div>
  );
}
