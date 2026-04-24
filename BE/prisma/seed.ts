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


  // ─── Categories ────────────────────────────────
  const categoryData = [
    { name: 'Phần mềm', slug: 'phan-mem', type: 'product', icon: 'Shield', desc: 'Phần mềm các loại' },
    { name: 'Cloud', slug: 'cloud', type: 'product', icon: 'Cloud', desc: 'Dịch vụ cloud server' },
    { name: 'Marketing', slug: 'marketing', type: 'product', icon: 'TrendingUp', desc: 'Dịch vụ marketing' },
    { name: 'Thiết kế', slug: 'thiet-ke', type: 'product', icon: 'PenTool', desc: 'Thiết kế website, đồ họa' },
    { name: 'Công nghệ', slug: 'cong-nghe', type: 'post', icon: 'Cpu', desc: 'Xu hướng công nghệ' },
    { name: 'Bảo mật', slug: 'bao-mat', type: 'post', icon: 'Lock', desc: 'Bảo mật, an ninh mạng' },
  ]
  const categories = {};
  for (const c of categoryData) {
    const cat = await prisma.category.upsert({
      where: { slug: c.slug },
      update: {},
      create: c,
    });
    categories[c.name] = cat;
  }
  console.log('✅ Categories seeded');

  // ─── Tags ──────────────────────────────────────
  const tagNames = [
    'phần mềm', 'quản lý kho', 'WMS', 'cloud', 'server', 'hosting',
    'marketing', 'digital', 'SEO', 'website', 'thiết kế', 'responsive',
    for (const c of categoryData) {
      const cat = await prisma.Category.upsert({
  ];
  const tags = {};
  for (const t of tagNames) {
    const slug = t.toLowerCase().replace(/\s+/g, '-');
    const tag = await prisma.tag.upsert({
      where: { slug },
      update: {},
      create: { name: t, slug, type: 'product' },
    });
    tags[t] = tag;
  }
  console.log('✅ Tags seeded');

  // ─── Products ────────────────────────────────────
  const products = [
    {
    for (const t of tagNames) {
      const tag = await prisma.Tag.upsert({
      description: 'Giải pháp quản lý kho hàng thông minh, tối ưu quy trình nhập xuất tồn',
      price: 3500000,
      comparePrice: 5000000,
      categoryId: categories['Phần mềm'].id,
      status: 'active',
      stock: 999,
      sku: 'WMS-001',
      image: 'https://picsum.photos/600/400?random=1',
      tags: { connect: ['phần mềm', 'quản lý kho', 'WMS'].map(t => ({ id: tags[t].id })) },
      featured: true,
    },
    {
      name: 'Cloud Server Enterprise',
      slug: 'cloud-server-enterprise',
      description: 'Máy chủ đám mây hiệu suất cao, uptime 99.9%',
      price: 3000000,
      comparePrice: 4500000,
      categoryId: categories['Cloud'].id,
      status: 'active',
      stock: 999,
      sku: 'CLD-001',
      image: 'https://picsum.photos/600/400?random=2',
      tags: { connect: ['cloud', 'server', 'hosting'].map(t => ({ id: tags[t].id })) },
      featured: true,
    },
    {
      name: 'Gói Marketing Toàn Diện',
      slug: 'goi-marketing-toan-dien',
      description: 'Chiến lược marketing số 360° cho doanh nghiệp',
      price: 15000000,
      comparePrice: 20000000,
      categoryId: categories['Marketing'].id,
      status: 'active',
      stock: 50,
      sku: 'MKT-001',
      image: 'https://picsum.photos/600/400?random=3',
      tags: { connect: ['marketing', 'digital', 'SEO'].map(t => ({ id: tags[t].id })) },
      featured: false,
    },
    {
      name: 'Thiết kế Website Premium',
      slug: 'thiet-ke-website-premium',
      description: 'Website chuyên nghiệp, responsive, chuẩn SEO',
      price: 25000000,
      comparePrice: 35000000,
      categoryId: categories['Thiết kế'].id,
      status: 'active',
      stock: 30,
      sku: 'WEB-001',
      image: 'https://picsum.photos/600/400?random=4',
      tags: { connect: ['website', 'thiết kế', 'responsive'].map(t => ({ id: tags[t].id })) },
      featured: true,
    },
  ];
  for (const p of products) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {},
      create: p,
    });
  }
  console.log('✅ Products seeded');


  // ─── Posts ───────────────────────────────────────
  const posts = [
    {
      title: 'Xu hướng công nghệ 2025: AI và Tự động hóa',
      slug: 'xu-huong-cong-nghe-2025-ai-va-tu-dong-hoa',
      excerpt: 'Khám phá những xu hướng công nghệ nổi bật nhất năm 2025 và cách doanh nghiệp có thể tận dụng.',
      content: '<p>Năm 2025 đánh dấu bước ngoặt quan trọng trong lĩnh vực AI...</p>',
      coverImage: 'https://picsum.photos/800/400?random=10',
      categoryId: categories['Công nghệ']?.id,
      tags: { connect: ['AI', 'tự động hóa', '2025'].map(t => ({ id: tags[t].id })) },
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
      categoryId: categories['Cloud']?.id,
      tags: { connect: ['cloud', 'SME', 'hướng dẫn'].map(t => ({ id: tags[t].id })) },
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
      categoryId: categories['Marketing']?.id,
      tags: { connect: ['marketing', 'ROI', 'chiến lược'].map(t => ({ id: tags[t].id })) },
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
      categoryId: categories['Thiết kế']?.id,
      tags: { connect: ['UX', 'UI', 'e-commerce'].map(t => ({ id: tags[t].id })) },
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
      categoryId: categories['Bảo mật']?.id,
      tags: { connect: ['bảo mật', 'cybersecurity', 'doanh nghiệp'].map(t => ({ id: tags[t].id })) },
      author: 'Nguyễn Minh Tiến',
      status: 'published',
      views: 670,
      publishedAt: new Date('2025-07-05T14:00:00Z'),
    },
  ];
  for (const p of posts) {
    await prisma.post.upsert({
      where: { slug: p.slug },
      update: {},
      create: p,
    });
  }
  console.log('✅ Posts seeded');

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

  // ─── Services ────────────────────────────────────
  const services = [
    {
      title: 'Phát triển Phần mềm & Ứng dụng',
      slug: 'phan-mem',
      description: 'Thiết kế và phát triển phần mềm, ứng dụng web, mobile app theo yêu cầu.',
      shortDesc: 'Custom software development',
      icon: 'Code',
      features: ['Web Application', 'Mobile App', 'API Development', 'ERP/CRM'],
      pricing: [
        { name: 'Starter', price: '15.000.000₫', features: ['Landing page', '5 trang', 'Responsive'], popular: false },
        { name: 'Business', price: '45.000.000₫', features: ['Web app đầy đủ', 'Admin panel', 'API integration'], popular: true },
      ],
      status: 'active',
      order: 1,
    },
    {
      title: 'Hạ tầng Cloud & Server',
      slug: 'cloud-server',
      description: 'Giải pháp cloud computing, VPS, dedicated server với uptime 99.99%.',
      shortDesc: 'Cloud infrastructure solutions',
      icon: 'Cloud',
      features: ['Cloud VPS', 'Dedicated Server', 'CDN', 'Backup & Recovery'],
      pricing: [
        { name: 'Cloud Basic', price: '500.000₫/tháng', features: ['2 vCPU', '4GB RAM', '80GB SSD'], popular: false },
        { name: 'Cloud Pro', price: '1.500.000₫/tháng', features: ['8 vCPU', '16GB RAM', '200GB SSD'], popular: true },
      ],
      status: 'active',
      order: 2,
    },
    {
      title: 'Marketing số & Quảng cáo',
      slug: 'marketing',
      description: 'Chiến lược marketing toàn diện, SEO, Google Ads, Facebook Ads.',
      shortDesc: 'Digital marketing solutions',
      icon: 'BarChart',
      features: ['SEO/SEM', 'Social Media Marketing', 'Google Ads', 'Content Marketing'],
      pricing: [
        { name: 'Basic', price: '5.000.000₫/tháng', features: ['SEO On-page', '2 bài viết/tuần', 'Báo cáo hàng tháng'], popular: false },
        { name: 'Premium', price: '15.000.000₫/tháng', features: ['SEO toàn diện', 'Google Ads', 'Facebook Ads', 'Content strategy'], popular: true },
      ],
      status: 'active',
      order: 3,
    },
    {
      title: 'Thiết kế Thương hiệu & Sáng tạo',
      slug: 'marketing-design',
      description: 'Thiết kế bộ nhận diện thương hiệu, video, đồ hoạ chuyên nghiệp.',
      shortDesc: 'Brand design & creative',
      icon: 'Palette',
      features: ['Logo & Branding', 'UI/UX Design', 'Video Production', 'Print Design'],
      pricing: [
        { name: 'Logo Package', price: '8.000.000₫', features: ['3 concepts', 'Brand guide', 'File nguồn'], popular: false },
        { name: 'Full Branding', price: '35.000.000₫', features: ['Full identity', 'Stationery', 'Brand guide', 'Social templates'], popular: true },
      ],
      status: 'active',
      order: 4,
    },
  ]
  for (const s of services) {
    await prisma.service.upsert({
      where: { slug: s.slug },
      update: {},
      create: s,
    })
  }
  console.log('✅ Services seeded')

  // ─── Projects ────────────────────────────────────
  const projects = [
    {
      title: 'Hệ thống ERP cho Tập đoàn ABC',
      slug: 'erp-tap-doan-abc',
      client: 'Tập đoàn ABC',
      description: 'Phát triển hệ thống ERP quản lý toàn diện cho tập đoàn sản xuất với 500+ nhân viên.',
      images: ['https://picsum.photos/800/600?random=40', 'https://picsum.photos/800/600?random=41'],
      technologies: ['Next.js', 'Node.js', 'PostgreSQL', 'Docker'],
      category: 'Phần mềm',
      status: 'completed',
      featured: true,
      url: 'https://abc-corp.vn',
      completedAt: new Date('2025-06-15T00:00:00Z'),
    },
    {
      title: 'Website thương mại điện tử GreenShop',
      slug: 'website-greenshop',
      client: 'GreenShop JSC',
      description: 'Thiết kế và phát triển website bán hàng online với hơn 10,000 sản phẩm.',
      images: ['https://picsum.photos/800/600?random=42'],
      technologies: ['React', 'Node.js', 'MongoDB', 'AWS'],
      category: 'Website',
      status: 'completed',
      featured: true,
      url: 'https://greenshop.vn',
      completedAt: new Date('2025-04-20T00:00:00Z'),
    },
    {
      title: 'Chiến dịch Digital Marketing StartupIO',
      slug: 'digital-marketing-startupio',
      client: 'StartupIO',
      description: 'Triển khai chiến dịch marketing số toàn diện, tăng 300% lưu lượng truy cập trong 6 tháng.',
      images: ['https://picsum.photos/800/600?random=43'],
      technologies: ['Google Ads', 'Facebook Ads', 'SEO', 'Analytics'],
      category: 'Marketing',
      status: 'in-progress',
      featured: false,
    },
    {
      title: 'Cloud Migration cho Medical Center',
      slug: 'cloud-migration-medical-center',
      client: 'Medical Center',
      description: 'Di chuyển toàn bộ hạ tầng IT lên cloud, đảm bảo uptime 99.99% cho hệ thống y tế.',
      images: ['https://picsum.photos/800/600?random=44'],
      technologies: ['AWS', 'Docker', 'Kubernetes', 'Terraform'],
      category: 'Cloud',
      status: 'planned',
      featured: false,
    },
  ]
  for (const p of projects) {
    await prisma.project.upsert({
      where: { slug: p.slug },
      update: {},
      create: p,
    })
  }
  console.log('✅ Projects seeded')

  // ─── Pages ───────────────────────────────────────
  const pages = [
    {
      title: 'Trang chủ',
      slug: 'home',
      content: '',
      template: 'home',
      status: 'published',
      seo: { metaTitle: 'MTIEN Solution - Giải pháp công nghệ toàn diện', metaDescription: 'MTIEN Solution cung cấp dịch vụ phần mềm, cloud, marketing số cho doanh nghiệp.', keywords: ['MTIEN', 'giải pháp công nghệ'] },
      order: 1,
    },
    {
      title: 'Giới thiệu',
      slug: 'about',
      content: '<p>MTIEN Solution được thành lập năm 2020 với sứ mệnh mang công nghệ đến gần hơn với doanh nghiệp Việt Nam.</p>',
      template: 'default',
      status: 'published',
      seo: { metaTitle: 'Giới thiệu - MTIEN Solution', metaDescription: 'Tìm hiểu về MTIEN Solution và đội ngũ chuyên gia công nghệ.', keywords: ['giới thiệu', 'MTIEN'] },
      order: 2,
    },
    {
      title: 'Dịch vụ',
      slug: 'services',
      content: '',
      template: 'services',
      status: 'published',
      seo: { metaTitle: 'Dịch vụ - MTIEN Solution', metaDescription: 'Các dịch vụ phần mềm, cloud server, marketing số và thiết kế thương hiệu.', keywords: ['dịch vụ', 'phần mềm', 'cloud'] },
      order: 3,
    },
    {
      title: 'Dự án',
      slug: 'projects',
      content: '',
      template: 'default',
      status: 'published',
      seo: { metaTitle: 'Dự án - MTIEN Solution', metaDescription: 'Portfolio các dự án đã thực hiện.', keywords: ['dự án', 'portfolio'] },
      order: 4,
    },
    {
      title: 'Blog',
      slug: 'blog',
      content: '',
      template: 'blog',
      status: 'published',
      seo: { metaTitle: 'Blog - MTIEN Solution', metaDescription: 'Tin tức và bài viết về công nghệ.', keywords: ['blog', 'tin tức'] },
      order: 5,
    },
    {
      title: 'Liên hệ',
      slug: 'contact',
      content: '',
      template: 'contact',
      status: 'published',
      seo: { metaTitle: 'Liên hệ - MTIEN Solution', metaDescription: 'Liên hệ với MTIEN Solution để được tư vấn.', keywords: ['liên hệ', 'tư vấn'] },
      order: 6,
    },
    {
      title: 'Cửa hàng',
      slug: 'shop',
      content: '',
      template: 'shop',
      status: 'published',
      seo: { metaTitle: 'Cửa hàng - MTIEN Solution', metaDescription: 'Sản phẩm và giải pháp công nghệ.', keywords: ['cửa hàng', 'sản phẩm'] },
      order: 7,
    },
    {
      title: 'Chính sách bảo mật',
      slug: 'privacy-policy',
      content: '<p>Chính sách bảo mật thông tin cá nhân của MTIEN Solution...</p>',
      template: 'default',
      status: 'published',
      seo: { metaTitle: 'Chính sách bảo mật', metaDescription: 'Chính sách bảo mật thông tin.', keywords: [] },
      order: 8,
    },
  ]
  for (const p of pages) {
    await prisma.page.upsert({
      where: { slug: p.slug },
      update: {},
      create: p,
    })
  }
  console.log('✅ Pages seeded')

  // ─── Analytics ───────────────────────────────────
  const analyticsData: { date: Date; metric: string; value: number; path?: string; source?: string }[] = []
  const metrics = ['pageView', 'visitor', 'session']
  const sources = ['Google', 'Facebook', 'Direct', 'Zalo', 'Other']
  const paths = ['/', '/about', '/services', '/blog', '/contact', '/shop', '/projects']

  for (let i = 30; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    date.setHours(0, 0, 0, 0)

    for (const source of sources) {
      const baseVisitors = source === 'Google' ? 400 : source === 'Direct' ? 280 : source === 'Facebook' ? 180 : source === 'Zalo' ? 80 : 40
      analyticsData.push({
        date,
        metric: 'visitor',
        value: baseVisitors + Math.floor(Math.random() * 100),
        source,
      })
    }

    for (const path of paths) {
      const baseViews = path === '/' ? 500 : path === '/services' ? 200 : 80
      analyticsData.push({
        date,
        metric: 'pageView',
        value: baseViews + Math.floor(Math.random() * 80),
        path,
      })
    }
  }

  await prisma.analytics.createMany({ data: analyticsData })
  console.log('✅ Analytics seeded')

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
