import { NextRequest, NextResponse } from 'next/server'

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': process.env.ADMIN_ORIGIN || 'http://localhost:3001',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

function corsResponse(data: unknown, status = 200) {
  return NextResponse.json(data, { status, headers: CORS_HEADERS })
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS })
}

// Mock posts store (replace with database)
const posts = [
  { id: '1', title: 'Xu hướng phát triển phần mềm 2025', slug: 'xu-huong-phat-trien-phan-mem-2025', excerpt: 'Khám phá những xu hướng công nghệ phần mềm nổi bật nhất năm 2025...', content: '<p>Nội dung bài viết...</p>', featuredImage: 'https://picsum.photos/800/400?random=1', category: 'Công nghệ', tags: ['phần mềm', 'xu hướng', '2025'], status: 'published', author: { id: '1', name: 'Nguyễn Minh Tiến', avatar: 'https://i.pravatar.cc/150?img=11' }, views: 1250, publishedAt: '2025-07-10T08:00:00Z', createdAt: '2025-07-08T10:00:00Z', updatedAt: '2025-07-10T08:00:00Z' },
  { id: '2', title: 'Cloud Server vs VPS: Lựa chọn nào cho doanh nghiệp?', slug: 'cloud-server-vs-vps', excerpt: 'So sánh chi tiết giữa Cloud Server và VPS truyền thống...', content: '<p>Nội dung bài viết...</p>', featuredImage: 'https://picsum.photos/800/400?random=2', category: 'Cloud', tags: ['cloud', 'VPS', 'server'], status: 'published', author: { id: '2', name: 'Trần Văn Bình', avatar: 'https://i.pravatar.cc/150?img=12' }, views: 890, publishedAt: '2025-07-08T10:00:00Z', createdAt: '2025-07-06T14:00:00Z', updatedAt: '2025-07-08T10:00:00Z' },
  { id: '3', title: 'Marketing số cho doanh nghiệp B2B', slug: 'marketing-so-cho-doanh-nghiep-b2b', excerpt: 'Chiến lược marketing số hiệu quả dành riêng cho doanh nghiệp B2B...', content: '<p>Nội dung bài viết...</p>', featuredImage: 'https://picsum.photos/800/400?random=3', category: 'Marketing', tags: ['marketing', 'B2B', 'digital'], status: 'draft', author: { id: '1', name: 'Nguyễn Minh Tiến', avatar: 'https://i.pravatar.cc/150?img=11' }, views: 0, publishedAt: null, createdAt: '2025-07-12T09:00:00Z', updatedAt: '2025-07-12T09:00:00Z' },
  { id: '4', title: 'Thiết kế UX/UI: Nguyên tắc vàng', slug: 'thiet-ke-ux-ui-nguyen-tac-vang', excerpt: 'Những nguyên tắc thiết kế UX/UI được các chuyên gia hàng đầu áp dụng...', content: '<p>Nội dung bài viết...</p>', featuredImage: 'https://picsum.photos/800/400?random=4', category: 'Thiết kế', tags: ['UX', 'UI', 'design'], status: 'published', author: { id: '3', name: 'Lê Thị Hương', avatar: 'https://i.pravatar.cc/150?img=5' }, views: 2100, publishedAt: '2025-07-05T08:00:00Z', createdAt: '2025-07-03T16:00:00Z', updatedAt: '2025-07-05T08:00:00Z' },
  { id: '5', title: 'Bảo mật website: Checklist đầy đủ 2025', slug: 'bao-mat-website-checklist-2025', excerpt: 'Danh sách kiểm tra bảo mật website đầy đủ cho năm 2025...', content: '<p>Nội dung bài viết...</p>', featuredImage: 'https://picsum.photos/800/400?random=5', category: 'Bảo mật', tags: ['security', 'website', 'checklist'], status: 'scheduled', author: { id: '2', name: 'Trần Văn Bình', avatar: 'https://i.pravatar.cc/150?img=12' }, views: 0, publishedAt: '2025-07-20T08:00:00Z', createdAt: '2025-07-14T11:00:00Z', updatedAt: '2025-07-14T11:00:00Z' },
]

// GET /api/admin/posts
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const status = searchParams.get('status')
  const category = searchParams.get('category')
  const search = searchParams.get('search')
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '10')

  let filtered = [...posts]

  if (status && status !== 'all') {
    filtered = filtered.filter((p) => p.status === status)
  }
  if (category) {
    filtered = filtered.filter((p) => p.category === category)
  }
  if (search) {
    const q = search.toLowerCase()
    filtered = filtered.filter((p) => p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q))
  }

  const total = filtered.length
  const start = (page - 1) * limit
  const data = filtered.slice(start, start + limit)

  return corsResponse({
    success: true,
    data,
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
  })
}

// POST /api/admin/posts
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const newPost = {
      id: String(posts.length + 1),
      ...body,
      views: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    posts.push(newPost)
    return corsResponse({ success: true, data: newPost }, 201)
  } catch {
    return corsResponse({ success: false, message: 'Invalid request body' }, 400)
  }
}
