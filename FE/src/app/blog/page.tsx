import BlogHeader from '@/components/blog/BlogHeader';
import FeaturedPost from '@/components/blog/FeaturedPost';
import PostGrid from '@/components/blog/PostGrid';
import Newsletter from '@/components/blog/Newsletter';
import { ThemedPage } from '@/components/theme/ThemedPage';

export default function Blog() {
  return (
    <div className="pt-20 pb-24 bg-slate-50 min-h-screen">
      <ThemedPage
        pageId="blog"
        sections={{
          header: <BlogHeader />,
          featured: <FeaturedPost />,
          grid: <PostGrid />,
          newsletter: <Newsletter />,
        }}
      />
    </div>
  );
}
