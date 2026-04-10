import { NextRequest, NextResponse } from 'next/server'

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': process.env.ADMIN_ORIGIN || 'http://localhost:3001',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

function corsResponse(data: unknown, status = 200) {
  return NextResponse.json(data, { status, headers: CORS_HEADERS })
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS })
}

const mediaItems = [
  { id: '1', filename: 'hero-banner.jpg', originalName: 'hero-banner.jpg', url: 'https://picsum.photos/1200/600?random=20', type: 'image', size: 245000, width: 1200, height: 600, alt: 'Hero banner', folder: 'banners', uploadedBy: 'Nguyễn Minh Tiến', createdAt: '2025-07-10T08:00:00Z' },
  { id: '2', filename: 'product-wms.png', originalName: 'product-wms.png', url: 'https://picsum.photos/800/600?random=21', type: 'image', size: 189000, width: 800, height: 600, alt: 'WMS Product', folder: 'products', uploadedBy: 'Trần Văn Bình', createdAt: '2025-07-09T14:30:00Z' },
  { id: '3', filename: 'blog-tech-2025.jpg', originalName: 'blog-tech-2025.jpg', url: 'https://picsum.photos/800/400?random=22', type: 'image', size: 156000, width: 800, height: 400, alt: 'Tech trends 2025', folder: 'blog', uploadedBy: 'Lê Thị Hương', createdAt: '2025-07-08T10:15:00Z' },
  { id: '4', filename: 'company-profile.pdf', originalName: 'MTIEN-Company-Profile-2025.pdf', url: '/uploads/company-profile.pdf', type: 'document', size: 2450000, alt: '', folder: 'documents', uploadedBy: 'Nguyễn Minh Tiến', createdAt: '2025-07-05T09:00:00Z' },
  { id: '5', filename: 'team-photo.jpg', originalName: 'team-photo-2025.jpg', url: 'https://picsum.photos/1000/667?random=23', type: 'image', size: 340000, width: 1000, height: 667, alt: 'MTIEN Team 2025', folder: 'about', uploadedBy: 'Nguyễn Minh Tiến', createdAt: '2025-07-03T16:45:00Z' },
  { id: '6', filename: 'intro-video.mp4', originalName: 'mtien-intro-2025.mp4', url: '/uploads/intro-video.mp4', type: 'video', size: 15600000, alt: 'MTIEN Introduction Video', folder: 'videos', uploadedBy: 'Trần Văn Bình', createdAt: '2025-07-01T11:00:00Z' },
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get('type')
  const folder = searchParams.get('folder')

  let filtered = [...mediaItems]
  if (type && type !== 'all') {
    filtered = filtered.filter((m) => m.type === type)
  }
  if (folder) {
    filtered = filtered.filter((m) => m.folder === folder)
  }

  return corsResponse({ success: true, data: filtered, total: filtered.length })
}

export async function POST(request: NextRequest) {
  // In production, this would handle file upload (multipart/form-data)
  // For now, return a mock response
  const newMedia = {
    id: String(mediaItems.length + 1),
    filename: 'uploaded-file.jpg',
    originalName: 'uploaded-file.jpg',
    url: 'https://picsum.photos/800/600?random=99',
    type: 'image',
    size: 200000,
    width: 800,
    height: 600,
    alt: '',
    folder: 'uploads',
    uploadedBy: 'Admin',
    createdAt: new Date().toISOString(),
  }
  mediaItems.push(newMedia)
  return corsResponse({ success: true, data: newMedia }, 201)
}
