export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content?: string | null
  coverImage: string | null
  category: string | null
  tags: string[]
  author: string | null
  status: string
  views: number
  publishedAt: string | null
  createdAt: string
  updatedAt: string
  // SEO fields
  seoTitle?: string | null
  seoDescription?: string | null
  seoKeywords?: string[]
  focusKeyword?: string | null
  canonicalUrl?: string | null
  ogImage?: string | null
  noIndex?: boolean
  seoScore?: number
}

export interface BlogPagination {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNextPage: boolean
}

export interface CategoryWithCount {
  name: string
  count: number
}

export interface BlogListResponse {
  success: boolean
  data: BlogPost[]
  categories: CategoryWithCount[]
  tags: string[]
  pagination: BlogPagination
}

export interface BlogDetailResponse {
  success: boolean
  data: BlogPost
  relatedPosts: BlogPost[]
}
