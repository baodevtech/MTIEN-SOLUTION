// ==================== CORE TYPES ====================

export interface SEOData {
  metaTitle: string
  metaDescription: string
  ogImage: string
  keywords: string[]
  canonical: string
  noIndex: boolean
}

// ==================== USERS ====================

export type UserRole = 'admin' | 'editor' | 'author' | 'viewer'
export type UserStatus = 'active' | 'inactive' | 'suspended'

export interface User {
  id: string
  name: string
  email: string
  avatar: string | null
  role: UserRole
  status: UserStatus
  phone: string
  lastLogin: string | null
  createdAt: string
  updatedAt: string
}

// ==================== POSTS ====================

export type PostStatus = 'draft' | 'published' | 'scheduled' | 'archived'

export interface Post {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  featuredImage: string | null
  category: string
  tags: string[]
  status: PostStatus
  author: Pick<User, 'id' | 'name' | 'avatar'>
  seo: SEOData
  views: number
  publishedAt: string | null
  createdAt: string
  updatedAt: string
}

// ==================== PRODUCTS ====================

export type ProductStatus = 'active' | 'draft' | 'outOfStock'
export type ProductCategory = 'laptop' | 'pc' | 'linhkien' | 'ngoaivi' | 'phanmem' | 'mang'

export interface ProductSpec {
  label: string
  value: string
}

export interface Product {
  id: string
  name: string
  slug: string
  description: string
  shortDesc: string
  price: number
  oldPrice: number | null
  category: ProductCategory
  brand: string
  sku: string
  stock: number
  status: ProductStatus
  images: string[]
  specs: ProductSpec[]
  badge: string | null
  rating: number
  reviewCount: number
  sold: number
  warranty: string
  createdAt: string
  updatedAt: string
}

// ==================== ORDERS ====================

export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded'
export type PaymentStatus = 'paid' | 'pending' | 'failed' | 'refunded'
export type PaymentMethod = 'cod' | 'bank_transfer' | 'momo' | 'vnpay' | 'credit_card'

export interface OrderItem {
  productId: string
  name: string
  image: string
  price: number
  quantity: number
  total: number
}

export interface Order {
  id: string
  orderNumber: string
  customer: {
    name: string
    email: string
    phone: string
  }
  items: OrderItem[]
  subtotal: number
  shippingFee: number
  discount: number
  total: number
  status: OrderStatus
  paymentMethod: PaymentMethod
  paymentStatus: PaymentStatus
  shippingAddress: string
  notes: string
  createdAt: string
  updatedAt: string
}

// ==================== SERVICES ====================

export type ServiceStatus = 'active' | 'draft'

export interface ServicePricing {
  name: string
  price: string
  features: string[]
  popular: boolean
}

export interface Service {
  id: string
  title: string
  slug: string
  description: string
  shortDesc: string
  icon: string
  features: string[]
  pricing: ServicePricing[]
  status: ServiceStatus
  order: number
  createdAt: string
  updatedAt: string
}

// ==================== PROJECTS ====================

export type ProjectStatus = 'completed' | 'in-progress' | 'planned'

export interface Project {
  id: string
  title: string
  slug: string
  client: string
  description: string
  images: string[]
  technologies: string[]
  category: string
  status: ProjectStatus
  featured: boolean
  url: string
  completedAt: string | null
  createdAt: string
  updatedAt: string
}

// ==================== CONTACTS ====================

export type ContactStatus = 'new' | 'read' | 'replied' | 'archived'

export interface Contact {
  id: string
  name: string
  email: string
  phone: string
  company: string
  subject: string
  message: string
  status: ContactStatus
  assignedTo: string | null
  repliedAt: string | null
  createdAt: string
}

// ==================== MEDIA ====================

export type MediaType = 'image' | 'video' | 'document' | 'other'

export interface MediaItem {
  id: string
  filename: string
  originalName: string
  url: string
  type: MediaType
  mimeType: string
  size: number
  width?: number
  height?: number
  alt: string
  folder: string
  uploadedBy: Pick<User, 'id' | 'name'>
  createdAt: string
}

// ==================== SITE PAGES ====================

export type PageStatus = 'published' | 'draft'

export interface SitePage {
  id: string
  title: string
  slug: string
  content: string
  template: string
  status: PageStatus
  seo: SEOData
  order: number
  parentId: string | null
  updatedAt: string
  createdAt: string
}

// ==================== SETTINGS ====================

export interface SiteSettings {
  general: {
    siteName: string
    siteDescription: string
    siteUrl: string
    logo: string
    favicon: string
    language: string
    timezone: string
  }
  company: {
    name: string
    phone: string
    hotline: string
    email: string
    address: string
    taxId: string
    established: string
  }
  social: {
    facebook: string
    youtube: string
    instagram: string
    linkedin: string
    tiktok: string
    zalo: string
  }
  email: {
    smtpHost: string
    smtpPort: number
    smtpUser: string
    smtpPassword: string
    fromName: string
    fromEmail: string
  }
  seo: {
    defaultTitle: string
    titleTemplate: string
    defaultDescription: string
    defaultKeywords: string[]
    ogImage: string
    googleAnalyticsId: string
    googleSearchConsoleId: string
    facebookPixelId: string
  }
}

// ==================== DASHBOARD ====================

export interface DashboardStats {
  totalRevenue: number
  revenueChange: number
  totalOrders: number
  ordersChange: number
  totalVisitors: number
  visitorsChange: number
  totalProducts: number
  productsChange: number
  totalPosts: number
  newContacts: number
  recentOrders: Order[]
  recentPosts: Post[]
  revenueChart: { date: string; revenue: number; orders: number }[]
  topProducts: { name: string; sold: number; revenue: number }[]
  trafficSources: { source: string; visitors: number; percentage: number }[]
}

// ==================== API RESPONSE ====================

export interface ApiResponse<T> {
  data: T
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

// ==================== NAV ====================

export interface NavItem {
  label: string
  href: string
  icon: string
  badge?: number
  children?: NavItem[]
}

export interface NavGroup {
  title: string
  items: NavItem[]
}
