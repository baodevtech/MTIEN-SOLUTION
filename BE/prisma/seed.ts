import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { hashSync } from 'bcryptjs'

const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  throw new Error('DATABASE_URL is required for seeding')
}

const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('🌱 Seeding database...')

  // ─── Users ───────────────────────────────────────
  await prisma.user.upsert({
    where: { email: 'admin@mtiensolution.vn' },
    update: {},
    create: {
      name: 'Nguyễn Minh Tiến',
      email: 'admin@mtiensolution.vn',
      password: hashSync('admin123', 10),
      role: 'admin',
      avatar: 'https://i.pravatar.cc/150?img=11',
    },
  })
  console.log('✅ Users seeded')

  // ─── Products ────────────────────────────────────
  const products = [
    {
      name: 'Phần mềm Quản lý Kho MTIEN WMS',
      slug: 'phan-mem-quan-ly-kho-mtien-wms',
      description: 'Giải pháp quản lý kho hàng thông minh, tối ưu quy trình nhập xuất tồn',
      price: 3500000,
      comparePrice: 5000000,
      category: 'Phần mềm',
      status: 'active',
      stock: 999,
      sku: 'WMS-001',
      image: 'https://picsum.photos/600/400?random=1',
      tags: ['phần mềm', 'quản lý kho', 'WMS'],
      featured: true,
    },
    {
      name: 'Cloud Server Enterprise',
      slug: 'cloud-server-enterprise',
      description: 'Máy chủ đám mây hiệu suất cao, uptime 99.9%',
      price: 3000000,
      comparePrice: 4500000,
      category: 'Cloud',
      status: 'active',
      stock: 999,
      sku: 'CLD-001',
      image: 'https://picsum.photos/600/400?random=2',
      tags: ['cloud', 'server', 'hosting'],
      featured: true,
    },
    {
      name: 'Gói Marketing Toàn Diện',
      slug: 'goi-marketing-toan-dien',
      description: 'Chiến lược marketing số 360° cho doanh nghiệp',
      price: 15000000,
      comparePrice: 20000000,
      category: 'Marketing',
      status: 'active',
      stock: 50,
      sku: 'MKT-001',
      image: 'https://picsum.photos/600/400?random=3',
      tags: ['marketing', 'digital', 'SEO'],
      featured: false,
    },
    {
      name: 'Thiết kế Website Premium',
      slug: 'thiet-ke-website-premium',
      description: 'Website chuyên nghiệp, responsive, chuẩn SEO',
      price: 25000000,
      comparePrice: 35000000,
      category: 'Thiết kế',
      status: 'active',
      stock: 30,
      sku: 'WEB-001',
      image: 'https://picsum.photos/600/400?random=4',
      tags: ['website', 'thiết kế', 'responsive'],
      featured: true,
    },
  ]
  for (const p of products) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {},
      create: p,
    })
  }
  console.log('✅ Products seeded')

  // ─── Posts ───────────────────────────────────────
  const posts = [
    {
      title: 'Xu hướng công nghệ 2025: AI và Tự động hóa',
      slug: 'xu-huong-cong-nghe-2025-ai-va-tu-dong-hoa',
      excerpt: 'Khám phá những xu hướng công nghệ nổi bật nhất năm 2025 và cách doanh nghiệp có thể tận dụng.',
      content: '<p>Năm 2025 đánh dấu bước ngoặt quan trọng trong lĩnh vực AI...</p>',
      coverImage: 'https://picsum.photos/800/400?random=10',
      category: 'Công nghệ',
      tags: ['AI', 'tự động hóa', '2025'],
      author: 'Nguyễn Minh Tiến',
      status: 'published',
      views: 1250,
      publishedAt: new Date('2025-07-15T08:00:00Z'),
    },
    {
      title: 'Hướng dẫn triển khai Cloud Server cho SME',
      slug: 'huong-dan-trien-khai-cloud-server-cho-sme',
      excerpt: 'Bài viết chi tiết về cách lựa chọn và triển khai cloud server phù hợp cho doanh nghiệp vừa và nhỏ.',
      content: '<p>Cloud computing đã thay đổi cách doanh nghiệp vận hành...</p>',
      coverImage: 'https://picsum.photos/800/400?random=11',
      category: 'Cloud',
      tags: ['cloud', 'SME', 'hướng dẫn'],
      author: 'Trần Văn Bình',
      status: 'published',
      views: 890,
      publishedAt: new Date('2025-07-12T10:00:00Z'),
    },
    {
      title: 'Digital Marketing: Chiến lược tối ưu ROI 2025',
      slug: 'digital-marketing-chien-luoc-toi-uu-roi-2025',
      excerpt: 'Phân tích các chiến lược marketing số giúp tối đa hóa ROI cho doanh nghiệp Việt Nam.',
      content: '<p>Marketing số năm 2025 yêu cầu sự kết hợp giữa data-driven và creative...</p>',
      coverImage: 'https://picsum.photos/800/400?random=12',
      category: 'Marketing',
      tags: ['marketing', 'ROI', 'chiến lược'],
      author: 'Lê Thị Hương',
      status: 'published',
      views: 2100,
      publishedAt: new Date('2025-07-10T09:00:00Z'),
    },
    {
      title: 'UX/UI Design Trends cho Website thương mại điện tử',
      slug: 'ux-ui-design-trends-cho-website-thuong-mai-dien-tu',
      excerpt: 'Top 10 xu hướng thiết kế UX/UI cho e-commerce website giúp tăng tỷ lệ chuyển đổi.',
      content: '<p>Thiết kế UX/UI tốt có thể tăng conversion rate lên 200%...</p>',
      coverImage: 'https://picsum.photos/800/400?random=13',
      category: 'Thiết kế',
      tags: ['UX', 'UI', 'e-commerce'],
      author: 'Phạm Thanh Tùng',
      status: 'draft',
      views: 0,
    },
    {
      title: 'Bảo mật mạng cho doanh nghiệp: Những điều cần biết',
      slug: 'bao-mat-mang-cho-doanh-nghiep-nhung-dieu-can-biet',
      excerpt: 'Tổng hợp các giải pháp bảo mật mạng quan trọng mà mọi doanh nghiệp cần triển khai.',
      content: '<p>An ninh mạng là mối quan tâm hàng đầu của doanh nghiệp...</p>',
      coverImage: 'https://picsum.photos/800/400?random=14',
      category: 'Bảo mật',
      tags: ['bảo mật', 'cybersecurity', 'doanh nghiệp'],
      author: 'Nguyễn Minh Tiến',
      status: 'published',
      views: 670,
      publishedAt: new Date('2025-07-05T14:00:00Z'),
    },
  ]
  for (const p of posts) {
    await prisma.post.upsert({
      where: { slug: p.slug },
      update: {},
      create: p,
    })
  }
  console.log('✅ Posts seeded')

  // ─── Contacts ────────────────────────────────────
  const contacts = [
    { name: 'Phạm Minh Đức', email: 'duc.pm@techcorp.vn', phone: '0901 234 567', company: 'TechCorp Việt Nam', subject: 'Báo giá phần mềm quản lý', message: 'Chào MTIEN Solution, công ty chúng tôi đang cần triển khai phần mềm quản lý kho hàng cho chuỗi 15 cửa hàng. Xin cho báo giá chi tiết và timeline triển khai.', status: 'new', createdAt: new Date('2025-07-15T09:30:00Z') },
    { name: 'Trần Thị Mai', email: 'mai.tt@greenlife.com', phone: '0912 345 678', company: 'GreenLife JSC', subject: 'Tư vấn Cloud Server', message: 'Tôi muốn tìm hiểu về giải pháp Cloud Server cho doanh nghiệp. Hiện tại chúng tôi đang dùng VPS nhưng muốn nâng cấp.', status: 'read', createdAt: new Date('2025-07-14T14:15:00Z') },
    { name: 'Lê Hoàng Nam', email: 'nam.lh@startup.io', phone: '0923 456 789', company: 'StartupIO', subject: 'Hợp tác Marketing', message: 'Chúng tôi là startup trong lĩnh vực EdTech, cần đối tác marketing số để phát triển thương hiệu và tăng trưởng khách hàng.', status: 'replied', createdAt: new Date('2025-07-13T11:00:00Z') },
    { name: 'Nguyễn Văn Hùng', email: 'hung.nv@factory.vn', phone: '0934 567 890', company: 'Nhà máy ABC', subject: 'Thiết kế website công ty', message: 'Chúng tôi cần thiết kế lại website công ty theo chuẩn quốc tế, có đa ngôn ngữ (Việt - Anh - Nhật).', status: 'new', createdAt: new Date('2025-07-15T07:45:00Z') },
    { name: 'Võ Thị Lan', email: 'lan.vt@medical.vn', phone: '0945 678 901', company: 'Medical Center', subject: 'Phần mềm quản lý phòng khám', message: 'Cần tư vấn giải pháp phần mềm quản lý phòng khám đa khoa. Yêu cầu: quản lý bệnh nhân, lịch hẹn, kê toa thuốc, thanh toán.', status: 'archived', createdAt: new Date('2025-07-10T16:30:00Z') },
  ]
  for (const c of contacts) {
    await prisma.contact.create({ data: c })
  }
  console.log('✅ Contacts seeded')

  // ─── Orders ──────────────────────────────────────
  const allProducts = await prisma.product.findMany()
  const productMap = Object.fromEntries(allProducts.map((p) => [p.slug, p.id]))

  const orders = [
    {
      orderNumber: 'ORD-2025-0156',
      customerName: 'Công ty ABC',
      customerEmail: 'order@abc.vn',
      customerPhone: '0901 111 222',
      customerAddress: '456 Lê Lợi, Q1, TP.HCM',
      total: 3500000,
      status: 'delivered',
      paymentMethod: 'Chuyển khoản',
      paymentStatus: 'paid',
      createdAt: new Date('2025-07-14T09:00:00Z'),
      items: {
        create: [{ productId: productMap['phan-mem-quan-ly-kho-mtien-wms'], name: 'Phần mềm Quản lý Kho MTIEN WMS', price: 3500000, quantity: 1, image: 'https://picsum.photos/100/100?random=30' }],
      },
    },
    {
      orderNumber: 'ORD-2025-0155',
      customerName: 'Trần Minh Khoa',
      customerEmail: 'khoa@email.com',
      customerPhone: '0912 222 333',
      customerAddress: '789 Nguyễn Huệ, Q1, TP.HCM',
      total: 6000000,
      status: 'processing',
      paymentMethod: 'Thẻ tín dụng',
      paymentStatus: 'paid',
      notes: 'Yêu cầu setup nhanh',
      createdAt: new Date('2025-07-13T14:30:00Z'),
      items: {
        create: [{ productId: productMap['cloud-server-enterprise'], name: 'Cloud Server Enterprise', price: 3000000, quantity: 2, image: 'https://picsum.photos/100/100?random=31' }],
      },
    },
    {
      orderNumber: 'ORD-2025-0154',
      customerName: 'Lê Thị Hồng',
      customerEmail: 'hong.lt@corp.vn',
      customerPhone: '0923 333 444',
      customerAddress: '321 Trần Hưng Đạo, Q5, TP.HCM',
      total: 15000000,
      status: 'pending',
      paymentMethod: 'Chuyển khoản',
      paymentStatus: 'pending',
      createdAt: new Date('2025-07-15T11:00:00Z'),
      items: {
        create: [{ productId: productMap['goi-marketing-toan-dien'], name: 'Gói Marketing Toàn Diện', price: 15000000, quantity: 1, image: 'https://picsum.photos/100/100?random=32' }],
      },
    },
    {
      orderNumber: 'ORD-2025-0153',
      customerName: 'Phạm Văn Tú',
      customerEmail: 'tu.pv@tech.vn',
      customerPhone: '0934 444 555',
      customerAddress: '567 Võ Văn Tần, Q3, TP.HCM',
      total: 28500000,
      status: 'shipped',
      paymentMethod: 'Chuyển khoản',
      paymentStatus: 'paid',
      notes: 'Giao gấp',
      createdAt: new Date('2025-07-12T08:00:00Z'),
      items: {
        create: [
          { productId: productMap['thiet-ke-website-premium'], name: 'Thiết kế Website Premium', price: 25000000, quantity: 1, image: 'https://picsum.photos/100/100?random=33' },
          { productId: productMap['phan-mem-quan-ly-kho-mtien-wms'], name: 'Phần mềm Quản lý Kho', price: 3500000, quantity: 1, image: 'https://picsum.photos/100/100?random=34' },
        ],
      },
    },
    {
      orderNumber: 'ORD-2025-0152',
      customerName: 'Nguyễn Thị Lan',
      customerEmail: 'lan.nt@shop.vn',
      customerPhone: '0945 555 666',
      customerAddress: '890 Cách Mạng Tháng 8, Q10, TP.HCM',
      total: 3000000,
      status: 'cancelled',
      paymentMethod: 'COD',
      paymentStatus: 'failed',
      notes: 'Khách huỷ do đổi nhu cầu',
      createdAt: new Date('2025-07-11T15:00:00Z'),
      items: {
        create: [{ productId: productMap['cloud-server-enterprise'], name: 'Cloud Server Enterprise', price: 3000000, quantity: 1, image: 'https://picsum.photos/100/100?random=35' }],
      },
    },
  ]
  for (const o of orders) {
    await prisma.order.upsert({
      where: { orderNumber: o.orderNumber },
      update: {},
      create: o,
    })
  }
  console.log('✅ Orders seeded')

  // ─── Media ───────────────────────────────────────
  const mediaItems = [
    { filename: 'hero-banner.jpg', originalName: 'hero-banner.jpg', url: 'https://picsum.photos/1200/600?random=20', type: 'image', size: 245000, width: 1200, height: 600, alt: 'Hero banner', folder: 'banners', uploadedBy: 'Nguyễn Minh Tiến', createdAt: new Date('2025-07-10T08:00:00Z') },
    { filename: 'product-wms.png', originalName: 'product-wms.png', url: 'https://picsum.photos/800/600?random=21', type: 'image', size: 189000, width: 800, height: 600, alt: 'WMS Product', folder: 'products', uploadedBy: 'Trần Văn Bình', createdAt: new Date('2025-07-09T14:30:00Z') },
    { filename: 'blog-tech-2025.jpg', originalName: 'blog-tech-2025.jpg', url: 'https://picsum.photos/800/400?random=22', type: 'image', size: 156000, width: 800, height: 400, alt: 'Tech trends 2025', folder: 'blog', uploadedBy: 'Lê Thị Hương', createdAt: new Date('2025-07-08T10:15:00Z') },
    { filename: 'company-profile.pdf', originalName: 'MTIEN-Company-Profile-2025.pdf', url: '/uploads/company-profile.pdf', type: 'document', size: 2450000, alt: '', folder: 'documents', uploadedBy: 'Nguyễn Minh Tiến', createdAt: new Date('2025-07-05T09:00:00Z') },
    { filename: 'team-photo.jpg', originalName: 'team-photo-2025.jpg', url: 'https://picsum.photos/1000/667?random=23', type: 'image', size: 340000, width: 1000, height: 667, alt: 'MTIEN Team 2025', folder: 'about', uploadedBy: 'Nguyễn Minh Tiến', createdAt: new Date('2025-07-03T16:45:00Z') },
    { filename: 'intro-video.mp4', originalName: 'mtien-intro-2025.mp4', url: '/uploads/intro-video.mp4', type: 'video', size: 15600000, alt: 'MTIEN Introduction Video', folder: 'videos', uploadedBy: 'Trần Văn Bình', createdAt: new Date('2025-07-01T11:00:00Z') },
  ]
  for (const m of mediaItems) {
    await prisma.media.create({ data: m })
  }
  console.log('✅ Media seeded')

  // ─── Settings ────────────────────────────────────
  const settingsData = {
    general: {
      siteName: 'MTIEN Solution',
      siteDescription: 'Giải pháp công nghệ toàn diện cho doanh nghiệp Việt Nam',
      siteUrl: 'https://mtiensolution.vn',
      logo: '/logo.svg',
      favicon: '/favicon.ico',
      language: 'vi',
      timezone: 'Asia/Ho_Chi_Minh',
    },
    company: {
      name: 'Công ty TNHH MTIEN Solution',
      phone: '0901 234 567',
      email: 'contact@mtiensolution.vn',
      address: '123 Nguyễn Văn Linh, Quận 7, TP.HCM',
      taxId: '0123456789',
    },
    social: {
      facebook: 'https://facebook.com/mtiensolution',
      youtube: 'https://youtube.com/@mtiensolution',
      instagram: '',
      linkedin: 'https://linkedin.com/company/mtiensolution',
      tiktok: '',
    },
    seo: {
      defaultTitle: 'MTIEN Solution - Giải pháp công nghệ toàn diện',
      titleTemplate: '%s | MTIEN Solution',
      defaultDescription: 'MTIEN Solution cung cấp giải pháp phần mềm, marketing số, thiết kế thương hiệu và cloud server.',
      defaultKeywords: ['phần mềm', 'marketing', 'thiết kế', 'cloud server', 'MTIEN Solution'],
      ogImage: '/og-default.jpg',
      googleAnalyticsId: '',
      googleSearchConsoleId: '',
    },
  }
  for (const [key, value] of Object.entries(settingsData)) {
    await prisma.setting.upsert({
      where: { key },
      update: { value: value as object },
      create: { key, value: value as object },
    })
  }
  console.log('✅ Settings seeded')

  console.log('🎉 Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
