// ============================================================
// MTIEN SOLUTION - Theme Schema Definitions
// Defines all editable fields for every page & section
// ============================================================

import type { PageSchema, SectionSchema, GlobalThemeSchema } from '@/types/theme'

// ===================== GLOBAL THEME =====================

export const globalThemeSchema: GlobalThemeSchema = {
  colors: {
    id: 'colors',
    name: 'Bảng màu',
    icon: 'Palette',
    fields: [
      { key: 'primaryBlue', label: 'Màu chính (Primary)', type: 'color', defaultValue: '#0066FF' },
      { key: 'primaryTeal', label: 'Màu phụ (Teal)', type: 'color', defaultValue: '#00D68F' },
      { key: 'accentOrange', label: 'Màu nhấn (Orange)', type: 'color', defaultValue: '#FF8C00' },
      { key: 'darkNavy', label: 'Màu chữ tối', type: 'color', defaultValue: '#0F172A' },
      { key: 'lightBg', label: 'Nền sáng chính', type: 'color', defaultValue: '#F8FAFC' },
      { key: 'lightBg2', label: 'Nền sáng phụ', type: 'color', defaultValue: '#FBFBFC' },
      { key: 'cardBg', label: 'Nền thẻ (Card)', type: 'color', defaultValue: '#FFFFFF' },
      { key: 'cardOpacity', label: 'Độ trong suốt thẻ (%)', type: 'slider', defaultValue: 80, min: 0, max: 100 },
      { key: 'borderColor', label: 'Màu viền', type: 'color', defaultValue: '#E2E8F0' },
      { key: 'gradientFrom', label: 'Gradient từ', type: 'color', defaultValue: '#0066FF' },
      { key: 'gradientTo', label: 'Gradient đến', type: 'color', defaultValue: '#00D68F' },
    ],
  },
  typography: {
    id: 'typography',
    name: 'Kiểu chữ',
    icon: 'Type',
    fields: [
      { key: 'fontPrimary', label: 'Font chính', type: 'select', defaultValue: 'Manrope', options: [
        { label: 'Manrope', value: 'Manrope' }, { label: 'Inter', value: 'Inter' },
        { label: 'Roboto', value: 'Roboto' }, { label: 'Open Sans', value: 'Open Sans' },
        { label: 'Montserrat', value: 'Montserrat' }, { label: 'Poppins', value: 'Poppins' },
      ]},
      { key: 'fontSecondary', label: 'Font phụ', type: 'select', defaultValue: 'Noto Sans', options: [
        { label: 'Noto Sans', value: 'Noto Sans' }, { label: 'Source Sans Pro', value: 'Source Sans Pro' },
        { label: 'Lato', value: 'Lato' }, { label: 'Nunito', value: 'Nunito' },
      ]},
      { key: 'baseFontSize', label: 'Cỡ chữ cơ sở (px)', type: 'number', defaultValue: 16, min: 12, max: 24 },
      { key: 'headingWeight', label: 'Độ đậm tiêu đề', type: 'select', defaultValue: '800', options: [
        { label: 'Medium (500)', value: '500' }, { label: 'Semibold (600)', value: '600' },
        { label: 'Bold (700)', value: '700' }, { label: 'Extrabold (800)', value: '800' },
        { label: 'Black (900)', value: '900' },
      ]},
      { key: 'bodyWeight', label: 'Độ đậm body', type: 'select', defaultValue: '400', options: [
        { label: 'Light (300)', value: '300' }, { label: 'Normal (400)', value: '400' },
        { label: 'Medium (500)', value: '500' },
      ]},
      { key: 'lineHeight', label: 'Chiều cao dòng', type: 'slider', defaultValue: 1.6, min: 1.2, max: 2.0, step: 0.1 },
      { key: 'letterSpacing', label: 'Khoảng cách chữ (em)', type: 'slider', defaultValue: 0, min: -0.05, max: 0.1, step: 0.005 },
    ],
  },
  navbar: {
    id: 'navbar',
    name: 'Thanh điều hướng',
    icon: 'Menu',
    fields: [
      { key: 'showTopBanner', label: 'Hiện banner trên cùng', type: 'toggle', defaultValue: true },
      { key: 'bannerText', label: 'Nội dung banner', type: 'text', defaultValue: 'Hotline: 0123 456 789 | Email: contact@mtiensolution.vn' },
      { key: 'bannerBgFrom', label: 'Màu nền banner (từ)', type: 'color', defaultValue: '#001440' },
      { key: 'bannerBgTo', label: 'Màu nền banner (đến)', type: 'color', defaultValue: '#002f90' },
      { key: 'topbarPhone', label: 'Số điện thoại topbar', type: 'text', defaultValue: '1800 6750' },
      { key: 'topbarEmail', label: 'Email topbar', type: 'text', defaultValue: 'support@mtiensolution.vn' },
      { key: 'topbarBadge', label: 'Badge topbar', type: 'text', defaultValue: 'GIẢI PHÁP CHUYỂN ĐỔI SỐ' },
      { key: 'topbarSlogan', label: 'Slogan topbar', type: 'text', defaultValue: 'Đồng hành cùng doanh nghiệp phát triển bền vững' },
      { key: 'topbarCtaText', label: 'Nút CTA topbar', type: 'text', defaultValue: 'Khám phá ngay' },
      { key: 'topbarCtaLink', label: 'Link CTA topbar', type: 'link', defaultValue: '#' },
      { key: 'logoText', label: 'Tên logo', type: 'text', defaultValue: 'MTIEN' },
      { key: 'logoSubtext', label: 'Phụ đề logo', type: 'text', defaultValue: 'Solution' },
      { key: 'logoImage', label: 'Ảnh logo (thay chữ)', type: 'image', defaultValue: '' },
      { key: 'logoWidth', label: 'Chiều rộng Logo tối đa (px)', type: 'number', defaultValue: 120, min: 20, max: 400 },
      { key: 'logoHeight', label: 'Chiều cao Logo tối đa (px)', type: 'number', defaultValue: 48, min: 20, max: 200 },
      { key: 'navBgColor', label: 'Màu nền navbar', type: 'color', defaultValue: '#FFFFFF' },
      { key: 'navTextColor', label: 'Màu chữ navbar', type: 'color', defaultValue: '#1A1A1A' },
      { key: 'navStyle', label: 'Kiểu navbar', type: 'select', defaultValue: 'sticky', options: [
        { label: 'Cố định (Sticky)', value: 'sticky' },
        { label: 'Tĩnh', value: 'static' },
        { label: 'Ẩn khi cuộn', value: 'hide-on-scroll' },
      ]},
      { key: 'showCart', label: 'Hiện giỏ hàng', type: 'toggle', defaultValue: true },
      { key: 'showSearch', label: 'Hiện tìm kiếm', type: 'toggle', defaultValue: true },
      { key: 'ctaButton', label: 'Nút CTA', type: 'text', defaultValue: 'Liên hệ ngay' },
      { key: 'ctaButtonLink', label: 'Link nút CTA', type: 'link', defaultValue: '/contact' },
      { key: 'ctaButtonColor', label: 'Màu nút CTA', type: 'color', defaultValue: '#0066FF' },
      { key: 'menuItems', label: 'Menu chính', type: 'repeater', fields: [
        { key: 'label', label: 'Tên hiển thị', type: 'text', defaultValue: 'Trang chủ' },
        { key: 'href', label: 'Đường dẫn', type: 'link', defaultValue: '/' },
        { key: 'icon', label: 'Icon', type: 'icon', defaultValue: '' },
        { key: 'isHot', label: 'Gắn badge HOT', type: 'toggle', defaultValue: false },
        { key: 'openNewTab', label: 'Mở tab mới', type: 'toggle', defaultValue: false },
        { key: 'subItems', label: 'Menu con (JSON)', type: 'textarea', defaultValue: '', description: 'Mỗi dòng: href|label|desc|icon. VD: /dich-vu/phan-mem|Phần mềm|Phát triển App/Web|Smartphone' },
      ], defaultValue: [
        { label: 'Trang chủ', href: '/', icon: 'Store', isHot: false, openNewTab: false, subItems: '' },
        { label: 'Giải pháp & Dịch vụ', href: '#', icon: '', isHot: false, openNewTab: false, subItems: '/dich-vu/phan-mem|Phần mềm & Ứng dụng|Phát triển App/Web App chất lượng cao|Smartphone\n/dich-vu/cloud-server|Hạ tầng Cloud & Server|Máy chủ mạnh mẽ, bảo mật đa tầng|Cloud\n/dich-vu/marketing-design|Thiết kế UX/UI & Branding|Sáng tạo nhận diện thương hiệu độc bản|PenTool\n/dich-vu/marketing|Tiếp thị Digital Marketing|Giải pháp tăng trưởng doanh thu đa kênh|Megaphone' },
        { label: 'Cửa hàng', href: '/shop', icon: 'Store', isHot: true, openNewTab: false, subItems: '' },
        { label: 'Đối tác', href: '#', icon: 'Users', isHot: false, openNewTab: false, subItems: '' },
        { label: 'Bảng giá', href: '#', icon: 'CreditCard', isHot: false, openNewTab: false, subItems: '' },
        { label: 'Tin tức', href: '/blog', icon: 'Newspaper', isHot: false, openNewTab: false, subItems: '' },
      ]},
      { key: 'rightMenuItems', label: 'Menu phải (trước CTA)', type: 'repeater', fields: [
        { key: 'label', label: 'Tên hiển thị', type: 'text', defaultValue: 'Khách hàng' },
        { key: 'href', label: 'Đường dẫn', type: 'link', defaultValue: '#' },
      ], defaultValue: [
        { label: 'Khách hàng', href: '#' },
      ]},
    ],
  },
  footer: {
    id: 'footer',
    name: 'Chân trang',
    icon: 'PanelBottom',
    fields: [
      { key: 'showCTA', label: 'Hiện CTA trên footer', type: 'toggle', defaultValue: true },
      { key: 'ctaTitle', label: 'Tiêu đề CTA', type: 'text', defaultValue: 'Bắt đầu miễn phí ngay hôm nay' },
      { key: 'ctaDescription', label: 'Mô tả CTA', type: 'textarea', defaultValue: 'Tạo website và bắt đầu bán hàng trong vòng 5 phút' },
      { key: 'ctaButtonPrimary', label: 'Nút chính', type: 'text', defaultValue: 'Dùng thử miễn phí' },
      { key: 'ctaButtonPrimaryLink', label: 'Link nút chính', type: 'link', defaultValue: '#' },
      { key: 'ctaButtonSecondary', label: 'Nút phụ', type: 'text', defaultValue: 'Nhận tư vấn' },
      { key: 'ctaButtonSecondaryLink', label: 'Link nút phụ', type: 'link', defaultValue: 'tel:18006750' },
      { key: 'footerBg', label: 'Màu nền footer', type: 'color', defaultValue: '#FFFFFF' },
      { key: 'footerTextColor', label: 'Màu chữ footer', type: 'color', defaultValue: '#64748B' },
      { key: 'companyDesc', label: 'Mô tả công ty', type: 'textarea', defaultValue: 'MTIEN Solution - Giải pháp công nghệ toàn diện cho mọi doanh nghiệp.' },
      { key: 'copyrightText', label: 'Bản quyền', type: 'text', defaultValue: '© 2025 MTIEN Solution. Bảo lưu mọi quyền.' },
      { key: 'facebookUrl', label: 'Facebook', type: 'link', defaultValue: '' },
      { key: 'youtubeUrl', label: 'YouTube', type: 'link', defaultValue: '' },
      { key: 'instagramUrl', label: 'Instagram', type: 'link', defaultValue: '' },
      { key: 'zaloUrl', label: 'Zalo', type: 'link', defaultValue: '' },
      { key: 'hotline', label: 'Hotline', type: 'text', defaultValue: '1800 6750' },
      { key: 'hotlineLabel', label: 'Label hotline', type: 'text', defaultValue: 'Hotline miễn phí' },
      { key: 'supportEmail', label: 'Email hỗ trợ', type: 'text', defaultValue: 'support@mtiensolution.vn' },
      { key: 'supportEmailLabel', label: 'Label email', type: 'text', defaultValue: 'Email Hỗ trợ' },
      { key: 'footerColumns', label: 'Cột link footer', type: 'repeater', fields: [
        { key: 'title', label: 'Tiêu đề cột', type: 'text', defaultValue: 'Liên kết' },
        { key: 'links', label: 'Danh sách link (mỗi dòng: href|label)', type: 'textarea', defaultValue: '' },
      ], defaultValue: [
        { title: 'Bán hàng', links: '#|Quản lý bán hàng\n#|Bán hàng đa kênh\n#|Thiết kế Website\n#|Quản lý Fanpage\n#|Tạo App bán hàng' },
        { title: 'Dịch vụ', links: '#|Cloud Server & VPS\n#|Email Doanh nghiệp\n#|Digital Marketing\n#|Đăng ký Tên miền\n#|Hóa đơn điện tử' },
      ]},
      { key: 'locations', label: 'Văn phòng', type: 'repeater', fields: [
        { key: 'city', label: 'Thành phố', type: 'text', defaultValue: '' },
        { key: 'type', label: 'Loại VP', type: 'text', defaultValue: '' },
        { key: 'address', label: 'Địa chỉ', type: 'text', defaultValue: '' },
      ], defaultValue: [
        { city: 'Hà Nội', type: 'Trụ sở chính', address: 'Tầng 6, Ladeco Building, 266 Đội Cấn' },
        { city: 'Hồ Chí Minh', type: 'Chi nhánh Nam', address: 'Tầng 5, Tòa nhà Lữ Gia, P.15, Q.11' },
        { city: 'Đà Nẵng', type: 'Chi nhánh Trung', address: '83 Xô Viết Nghệ Tĩnh, Khuê Trung' },
      ]},
      { key: 'bottomLinks', label: 'Link cuối trang', type: 'repeater', fields: [
        { key: 'label', label: 'Tên', type: 'text', defaultValue: '' },
        { key: 'href', label: 'Link', type: 'link', defaultValue: '#' },
      ], defaultValue: [
        { label: 'Điều khoản', href: '#' },
        { label: 'Bảo mật', href: '#' },
        { label: 'Sitemap', href: '/sitemap.xml' },
      ]},
      { key: 'certifications', label: 'Chứng nhận', type: 'repeater', fields: [
        { key: 'label', label: 'Tên', type: 'text', defaultValue: '' },
        { key: 'icon', label: 'Icon', type: 'icon', defaultValue: '' },
        { key: 'color', label: 'Màu icon', type: 'color', defaultValue: '' },
      ], defaultValue: [
        { label: 'ISO 9001:2015', icon: '', color: '#22c55e' },
        { label: 'Chứng nhận NCSC', icon: 'ShieldCheck', color: '#3b82f6' },
        { label: 'Bảo mật Quốc tế', icon: 'Globe', color: '#14b8a6' },
      ]},
    ],
  },
  seo: {
    id: 'seo',
    name: 'SEO mặc định',
    icon: 'Search',
    fields: [
      { key: 'defaultTitle', label: 'Tiêu đề mặc định', type: 'text', defaultValue: 'MTIEN Solution - Giải pháp công nghệ toàn diện' },
      { key: 'titleTemplate', label: 'Template tiêu đề', type: 'text', defaultValue: '%s | MTIEN Solution', description: '%s = tên trang' },
      { key: 'defaultDescription', label: 'Mô tả mặc định', type: 'textarea', defaultValue: 'MTIEN Solution cung cấp giải pháp phần mềm, marketing số, thiết kế thương hiệu và cloud server cho doanh nghiệp Việt Nam.' },
      { key: 'ogImage', label: 'Ảnh OG mặc định', type: 'image', defaultValue: '' },
    ],
  },
}

// ===================== HOME PAGE =====================

const homePageSchema: PageSchema = {
  id: 'home',
  name: 'Trang chủ',
  path: '/',
  icon: 'Home',
  sections: [
    {
      id: 'hero',
      name: 'Hero Banner',
      icon: 'Sparkles',
      defaultVisible: true,
      fields: [
        { key: 'badge', label: 'Badge text', type: 'text', defaultValue: '#1 Platform' },
        { key: 'title', label: 'Tiêu đề chính', type: 'text', defaultValue: 'Tạo website đột phá doanh thu' },
        { key: 'titleHighlight', label: 'Phần highlight', type: 'text', defaultValue: 'doanh thu' },
        { key: 'description', label: 'Mô tả', type: 'textarea', defaultValue: 'Nền tảng thương mại điện tử trọn bộ kết hợp tự động hoá Marketing, giúp doanh nghiệp tăng trưởng X3.' },
        { key: 'ctaPrimary', label: 'Nút chính', type: 'text', defaultValue: 'Bắt đầu dùng thử' },
        { key: 'ctaPrimaryLink', label: 'Link nút chính', type: 'link', defaultValue: '/contact' },
        { key: 'ctaSecondary', label: 'Nút phụ', type: 'text', defaultValue: 'Xem demo' },
        { key: 'ctaSecondaryLink', label: 'Link nút phụ', type: 'link', defaultValue: '#demo' },
        { key: 'bgImage', label: 'Ảnh nền', type: 'image', defaultValue: '' },
        { key: 'bgGradientFrom', label: 'Gradient nền từ', type: 'color', defaultValue: '#EBF5FF' },
        { key: 'bgGradientTo', label: 'Gradient nền đến', type: 'color', defaultValue: '#F0F4FF' },
        { key: 'heroImage', label: 'Ảnh minh hoạ hero', type: 'image', defaultValue: '' },
        { key: 'showFloatingCards', label: 'Hiện thẻ nổi', type: 'toggle', defaultValue: true },
        { key: 'floatingCard1Text', label: 'Thẻ nổi 1', type: 'text', defaultValue: '+125% Tăng trưởng' },
        { key: 'floatingCard2Text', label: 'Thẻ nổi 2', type: 'text', defaultValue: '10,000+ Đơn hàng' },
        { key: 'socialProofCount', label: 'Số social proof', type: 'text', defaultValue: '10,000+' },
        { key: 'socialProofLabel', label: 'Nhãn social proof', type: 'text', defaultValue: 'doanh nghiệp' },
        { key: 'supportBadges', label: 'Badges hỗ trợ (mỗi dòng)', type: 'textarea', defaultValue: 'Tối ưu SEO\nResponsive\nSSL 256-bit\nHosting nhanh' },
        { key: 'floatingCard1Title', label: 'Tiêu đề thẻ nổi 1', type: 'text', defaultValue: 'Tốc độ tối đa' },
        { key: 'floatingCard1Desc', label: 'Mô tả thẻ nổi 1', type: 'text', defaultValue: '99/100 Google Insights' },
        { key: 'floatingCard2Title', label: 'Tiêu đề thẻ nổi 2', type: 'text', defaultValue: 'Doanh thu hôm nay' },
        { key: 'floatingCard2Badge', label: 'Badge thẻ nổi 2', type: 'text', defaultValue: '+24.5%' },
        { key: 'floatingCard2Value', label: 'Giá trị thẻ nổi 2', type: 'text', defaultValue: '124.500.000₫' },
      ],
    },
    {
      id: 'stats',
      name: 'Thống kê',
      icon: 'BarChart3',
      defaultVisible: true,
      fields: [
        { key: 'bgColor', label: 'Màu nền', type: 'color', defaultValue: '#FFFFFF' },
        { key: 'stats', label: 'Các chỉ số', type: 'repeater', fields: [
          { key: 'number', label: 'Số', type: 'text', defaultValue: '230,000+' },
          { key: 'label', label: 'Nhãn', type: 'text', defaultValue: 'Khách hàng' },
          { key: 'description', label: 'Mô tả', type: 'text', defaultValue: 'Doanh nghiệp đang sử dụng' },
          { key: 'icon', label: 'Icon', type: 'icon', defaultValue: 'Users' },
        ], defaultValue: [
          { number: '230,000+', label: 'Khách hàng', description: 'Doanh nghiệp đang sử dụng', icon: 'Users' },
          { number: '400+', label: 'Template', description: 'Mẫu giao diện chuyên nghiệp', icon: 'Layout' },
          { number: '50+', label: 'Ngành nghề', description: 'Giải pháp cho mọi lĩnh vực', icon: 'Building2' },
        ]},
      ],
    },
    {
      id: 'appstore',
      name: 'Ứng dụng (App Store)',
      icon: 'Grid3X3',
      defaultVisible: true,
      fields: [
        { key: 'title', label: 'Tiêu đề', type: 'text', defaultValue: 'Hệ sinh thái ứng dụng' },
        { key: 'titleHighlight', label: 'Phần highlight', type: 'text', defaultValue: 'Không giới hạn tính năng.' },
        { key: 'badge', label: 'Badge', type: 'text', defaultValue: 'Hệ sinh thái MTIEN SOLUTION' },
        { key: 'badgeMobile', label: 'Badge mobile', type: 'text', defaultValue: 'Hệ sinh thái' },
        { key: 'titleHighlightMobile', label: 'Highlight mobile', type: 'text', defaultValue: 'Không giới hạn.' },
        { key: 'ctaCount', label: 'CTA count', type: 'text', defaultValue: 'Khám phá 100+' },
        { key: 'ctaLabel', label: 'CTA label', type: 'text', defaultValue: 'Tiện ích tích hợp sẵn' },
        { key: 'footerCta', label: 'Footer CTA', type: 'text', defaultValue: 'Dùng thử' },
        { key: 'description', label: 'Mô tả', type: 'textarea', defaultValue: 'Tất cả công cụ bạn cần trong một nền tảng duy nhất' },
        { key: 'bgColor', label: 'Màu nền', type: 'color', defaultValue: '#F8FAFC' },
        { key: 'apps', label: 'Danh sách app', type: 'repeater', fields: [
          { key: 'name', label: 'Tên', type: 'text' },
          { key: 'desc', label: 'Mô tả ngắn', type: 'text' },
          { key: 'icon', label: 'Icon', type: 'icon' },
          { key: 'color', label: 'Màu', type: 'color' },
        ]},
      ],
    },
    {
      id: 'dashboard',
      name: 'Dashboard Demo',
      icon: 'LayoutDashboard',
      defaultVisible: true,
      fields: [
        { key: 'title', label: 'Tiêu đề', type: 'text', defaultValue: 'Bảng điều khiển thông minh' },
        { key: 'titleHighlight', label: 'Phần highlight', type: 'text', defaultValue: 'Quản trị tinh gọn.' },
        { key: 'badge', label: 'Badge', type: 'text', defaultValue: 'TRÌNH KIẾN TẠO' },
        { key: 'description', label: 'Mô tả', type: 'textarea', defaultValue: 'Quản lý toàn bộ hoạt động kinh doanh từ một nơi' },
        { key: 'ctaText', label: 'Nút CTA', type: 'text', defaultValue: 'Trải nghiệm miễn phí' },
        { key: 'features', label: 'Tính năng stepper', type: 'repeater', fields: [
          { key: 'title', label: 'Tiêu đề', type: 'text' },
          { key: 'desc', label: 'Mô tả', type: 'textarea' },
          { key: 'icon', label: 'Icon', type: 'icon', defaultValue: 'MousePointerClick' },
        ], defaultValue: [
          { title: 'Trình kiến tạo trực quan (No-code)', desc: 'Thao tác kéo thả đơn giản, chỉnh sửa nội dung, hình ảnh trực tiếp.', icon: 'MousePointerClick' },
          { title: 'Dashboard All-in-One', desc: 'Đồng bộ quản lý sản phẩm, đơn hàng, khách hàng.', icon: 'LayoutDashboard' },
          { title: 'Cá nhân hóa thương hiệu', desc: 'Thiết lập nhận diện thương hiệu chỉ với vài click.', icon: 'Palette' },
        ]},
        { key: 'bgColor', label: 'Màu nền', type: 'color', defaultValue: '#FFFFFF' },
        { key: 'image', label: 'Ảnh dashboard', type: 'image', defaultValue: '' },
        { key: 'showThemeSwitcher', label: 'Hiện chọn theme', type: 'toggle', defaultValue: true },
      ],
    },
    {
      id: 'features',
      name: 'Tính năng',
      icon: 'Star',
      defaultVisible: true,
      fields: [
        { key: 'title', label: 'Tiêu đề', type: 'text', defaultValue: 'Tính năng vượt trội' },
        { key: 'description', label: 'Mô tả', type: 'textarea', defaultValue: '' },
        { key: 'ctaText', label: 'Nút CTA', type: 'text', defaultValue: 'Khám phá chi tiết' },
        { key: 'bgColor', label: 'Màu nền', type: 'color', defaultValue: '#FBFBFC' },
        { key: 'tabs', label: 'Các tab', type: 'repeater', fields: [
          { key: 'name', label: 'Tên tab', type: 'text' },
          { key: 'title', label: 'Tiêu đề', type: 'text' },
          { key: 'description', label: 'Mô tả', type: 'textarea' },
          { key: 'image', label: 'Ảnh minh hoạ', type: 'image' },
          { key: 'features', label: 'Tính năng (mỗi dòng)', type: 'textarea' },
        ]},
      ],
    },
    {
      id: 'templates',
      name: 'Template',
      icon: 'Layers',
      defaultVisible: true,
      fields: [
        { key: 'title', label: 'Tiêu đề', type: 'text', defaultValue: 'Kho giao diện chuyên nghiệp' },
        { key: 'badge', label: 'Badge', type: 'text', defaultValue: 'Kho giao diện' },
        { key: 'ctaText', label: 'CTA text', type: 'text', defaultValue: 'Không tìm thấy mẫu phù hợp?' },
        { key: 'description', label: 'Mô tả', type: 'textarea', defaultValue: '400+ mẫu giao diện được thiết kế đẹp mắt' },
        { key: 'bgColor', label: 'Màu nền', type: 'color', defaultValue: '#FFFFFF' },
        { key: 'templates', label: 'Danh sách template', type: 'repeater', fields: [
          { key: 'name', label: 'Tên', type: 'text' },
          { key: 'category', label: 'Danh mục', type: 'text' },
          { key: 'image', label: 'Ảnh preview', type: 'image' },
          { key: 'price', label: 'Giá (0 = miễn phí)', type: 'number' },
        ]},
      ],
    },
    {
      id: 'pricing',
      name: 'Bảng giá',
      icon: 'DollarSign',
      defaultVisible: true,
      fields: [
        { key: 'title', label: 'Tiêu đề', type: 'text', defaultValue: 'Bảng giá minh bạch' },
        { key: 'description', label: 'Mô tả', type: 'textarea', defaultValue: 'Chọn gói phù hợp với quy mô doanh nghiệp' },
        { key: 'bgColor', label: 'Màu nền', type: 'color', defaultValue: '#F8FAFC' },
        { key: 'plans', label: 'Các gói', type: 'repeater', fields: [
          { key: 'name', label: 'Tên gói', type: 'text' },
          { key: 'price', label: 'Giá (VND/tháng)', type: 'number' },
          { key: 'description', label: 'Mô tả', type: 'text' },
          { key: 'features', label: 'Tính năng (mỗi dòng)', type: 'textarea' },
          { key: 'popular', label: 'Phổ biến', type: 'toggle' },
          { key: 'buttonText', label: 'Nút', type: 'text' },
          { key: 'yearlyPrice', label: 'Giá năm (VND/tháng)', type: 'number' },
        ]},
        { key: 'footerText', label: 'Footer text', type: 'text', defaultValue: 'Chi tiết giá thiết kế web tại MTIEN SOLUTION' },
        { key: 'footerLink', label: 'Footer link', type: 'link', defaultValue: '/services' },
      ],
    },
    {
      id: 'industry',
      name: 'Ngành nghề',
      icon: 'Building2',
      defaultVisible: true,
      fields: [
        { key: 'title', label: 'Tiêu đề', type: 'text', defaultValue: 'Giải pháp cho mọi ngành' },
        { key: 'titleHighlight', label: 'Phần highlight', type: 'text', defaultValue: 'Dành riêng cho bạn.' },
        { key: 'badge', label: 'Badge', type: 'text', defaultValue: 'Giao diện đa ngành' },
        { key: 'description', label: 'Mô tả', type: 'textarea', defaultValue: '' },
        { key: 'ctaText', label: 'CTA text', type: 'text', defaultValue: 'Khám phá thư viện +400 giao diện' },
        { key: 'ctaLink', label: 'CTA link', type: 'link', defaultValue: '/projects' },
        { key: 'ctaDescription', label: 'Mô tả CTA', type: 'text', defaultValue: 'Bạn muốn xem thêm nhiều hơn?' },
        { key: 'bgColor', label: 'Màu nền', type: 'color', defaultValue: '#FFFFFF' },
        { key: 'industries', label: 'Ngành', type: 'repeater', fields: [
          { key: 'name', label: 'Tên ngành', type: 'text' },
          { key: 'image', label: 'Ảnh', type: 'image' },
          { key: 'color', label: 'Màu nền', type: 'color' },
        ]},
      ],
    },
    {
      id: 'trust',
      name: 'Khách hàng / Tin tưởng',
      icon: 'Shield',
      defaultVisible: true,
      fields: [
        { key: 'title', label: 'Tiêu đề', type: 'text', defaultValue: 'Được tin dùng bởi hàng nghìn doanh nghiệp' },
        { key: 'description', label: 'Mô tả', type: 'textarea', defaultValue: 'Tự hào là bệ phóng công nghệ cho hơn 230,000+ doanh nghiệp' },
        { key: 'commitmentText', label: 'Cam kết', type: 'text', defaultValue: 'Cam kết đồng hành và hỗ trợ kỹ thuật trọn đời 24/7' },
        { key: 'rating', label: 'Đánh giá', type: 'text', defaultValue: '4.9/5' },
        { key: 'ratingCount', label: 'Số đánh giá', type: 'text', defaultValue: '230,000+' },
        { key: 'bgColor', label: 'Màu nền', type: 'color', defaultValue: '#FBFBFC' },
        { key: 'logos', label: 'Logo khách hàng', type: 'repeater', fields: [
          { key: 'name', label: 'Tên', type: 'text' },
          { key: 'image', label: 'Logo', type: 'image' },
        ]},
      ],
    },
    {
      id: 'faq',
      name: 'Câu hỏi thường gặp',
      icon: 'HelpCircle',
      defaultVisible: true,
      fields: [
        { key: 'title', label: 'Tiêu đề', type: 'text', defaultValue: 'Câu hỏi thường gặp' },
        { key: 'badge', label: 'Badge', type: 'text', defaultValue: 'Trung tâm trợ giúp' },
        { key: 'description', label: 'Mô tả', type: 'textarea', defaultValue: 'Tìm hiểu chi tiết về quy trình triển khai, tính năng nền tảng và chính sách hỗ trợ.' },
        { key: 'hotline', label: 'Hotline', type: 'text', defaultValue: 'Hotline: 1900 xxxx' },
        { key: 'helpTitle', label: 'Tiêu đề hỗ trợ', type: 'text', defaultValue: 'Vẫn cần hỗ trợ thêm?' },
        { key: 'helpDescription', label: 'Mô tả hỗ trợ', type: 'text', defaultValue: 'Đội ngũ chuyên gia sẵn sàng tư vấn 1:1.' },
        { key: 'bgColor', label: 'Màu nền', type: 'color', defaultValue: '#FFFFFF' },
        { key: 'showSearch', label: 'Hiện tìm kiếm', type: 'toggle', defaultValue: true },
        { key: 'showHelpCard', label: 'Hiện thẻ hỗ trợ', type: 'toggle', defaultValue: true },
        { key: 'helpEmail', label: 'Email hỗ trợ', type: 'text', defaultValue: 'support@mtiensolution.vn' },
        { key: 'faqs', label: 'Câu hỏi', type: 'repeater', fields: [
          { key: 'question', label: 'Câu hỏi', type: 'text' },
          { key: 'answer', label: 'Trả lời', type: 'textarea' },
        ]},
      ],
    },
    {
      id: 'cta',
      name: 'CTA (Kêu gọi hành động)',
      icon: 'Megaphone',
      defaultVisible: true,
      fields: [
        { key: 'title', label: 'Tiêu đề', type: 'text', defaultValue: 'Sẵn sàng bắt đầu?' },
        { key: 'titleHighlight', label: 'Phần highlight', type: 'text', defaultValue: 'Ngay hôm nay.' },
        { key: 'description', label: 'Mô tả', type: 'textarea', defaultValue: 'Đăng ký ngay để nhận ưu đãi đặc biệt' },
        { key: 'placeholder', label: 'Placeholder form', type: 'text', defaultValue: 'Tên website của bạn...' },
        { key: 'trustBadge1', label: 'Trust badge 1', type: 'text', defaultValue: 'No credit card' },
        { key: 'trustBadge2', label: 'Trust badge 2', type: 'text', defaultValue: 'Setup in 5 mins' },
        { key: 'bgColor', label: 'Màu nền', type: 'color', defaultValue: '#0066FF' },
        { key: 'textColor', label: 'Màu chữ', type: 'color', defaultValue: '#FFFFFF' },
        { key: 'showEmailForm', label: 'Hiện form email', type: 'toggle', defaultValue: true },
        { key: 'buttonText', label: 'Nút', type: 'text', defaultValue: 'Đăng ký ngay' },
        { key: 'bgImage', label: 'Ảnh nền', type: 'image', defaultValue: '' },
      ],
    },
  ],
}

// ===================== ABOUT PAGE =====================

const aboutPageSchema: PageSchema = {
  id: 'about',
  name: 'Giới thiệu',
  path: '/about',
  icon: 'Info',
  sections: [
    {
      id: 'hero',
      name: 'Hero',
      icon: 'Sparkles',
      defaultVisible: true,
      fields: [
        { key: 'badge', label: 'Badge', type: 'text', defaultValue: 'Về chúng tôi' },
        { key: 'badgeColor', label: 'Màu badge (Tailwind class)', type: 'text', defaultValue: 'text-amber-600 bg-amber-50 border-amber-200' },
        { key: 'title', label: 'Tiêu đề', type: 'text', defaultValue: 'Định hình tương lai qua Đổi mới Công nghệ' },
        { key: 'titleHighlight', label: 'Highlight tiêu đề', type: 'text', defaultValue: 'Công nghệ' },
        { key: 'description', label: 'Mô tả', type: 'textarea', defaultValue: 'Từ năm 2016, hệ sinh thái của chúng tôi đã tiên phong trong việc cung cấp giải pháp công nghệ đột phá, giúp hàng nghìn doanh nghiệp Việt Nam chuyển đổi số thành công.' },
        { key: 'bgImage', label: 'Ảnh nền', type: 'image', defaultValue: '' },
      ],
    },
    {
      id: 'visionMission',
      name: 'Tầm nhìn & Sứ mệnh',
      icon: 'Target',
      defaultVisible: true,
      fields: [
        { key: 'title', label: 'Tiêu đề chính', type: 'text', defaultValue: 'Tầm nhìn & Sứ mệnh' },
        { key: 'description', label: 'Mô tả', type: 'textarea', defaultValue: 'Hướng tới một tương lai nơi công nghệ phục vụ con người một cách tối ưu nhất.' },
        { key: 'cards', label: 'Thẻ giá trị', type: 'repeater', fields: [
          { key: 'title', label: 'Tiêu đề', type: 'text' },
          { key: 'desc', label: 'Mô tả', type: 'textarea' },
          { key: 'icon', label: 'Icon (Lucide)', type: 'text', defaultValue: 'Target' },
        ], defaultValue: [
          { title: 'Tầm nhìn 2030', desc: 'Trở thành tập đoàn công nghệ hàng đầu khu vực, tiên phong trong việc ứng dụng AI và chuyển đổi số.', icon: 'Eye' },
          { title: 'Sứ mệnh', desc: 'Mang đến những giải pháp công nghệ tối ưu, giúp doanh nghiệp nâng cao năng lực cạnh tranh.', icon: 'Target' },
          { title: 'Giá trị cốt lõi', desc: 'Sáng tạo - Tận tâm - Trách nhiệm - Đồng hành cùng phát triển.', icon: 'Heart' },
        ]},
      ],
    },
    {
      id: 'statsCapabilities',
      name: 'Năng lực & Thống kê',
      icon: 'BarChart3',
      defaultVisible: true,
      fields: [
        { key: 'badge', label: 'Badge', type: 'text', defaultValue: 'Năng lực' },
        { key: 'title', label: 'Tiêu đề chính', type: 'text', defaultValue: 'Những con số biết nói' },
        { key: 'description', label: 'Mô tả', type: 'textarea', defaultValue: 'Minh chứng cho sự nỗ lực không ngừng nghỉ của toàn bộ đội ngũ.' },
        { key: 'stats', label: 'Chỉ số', type: 'repeater', fields: [
          { key: 'val', label: 'Giá trị', type: 'text' },
          { key: 'title', label: 'Nhãn', type: 'text' },
          { key: 'desc', label: 'Mô tả thêm', type: 'text' },
        ], defaultValue: [
          { val: '500+', title: 'Dự án', desc: 'Hoàn thành xuất sắc' },
          { val: '98%', title: 'Hài lòng', desc: 'Tỷ lệ khách hàng' },
          { val: '50+', title: 'Chuyên gia', desc: 'Kỹ sư giàu kinh nghiệm' },
          { val: '10+', title: 'Năm', desc: 'Đồng hành & phát triển' },
        ]},
      ],
    },
    {
      id: 'timeline',
      name: 'Lịch sử phát triển',
      icon: 'Clock',
      defaultVisible: true,
      fields: [
        { key: 'badge', label: 'Badge', type: 'text', defaultValue: 'Hành trình' },
        { key: 'title', label: 'Tiêu đề', type: 'text', defaultValue: 'Lịch sử phát triển' },
        { key: 'milestones', label: 'Các cột mốc', type: 'repeater', fields: [
          { key: 'year', label: 'Năm', type: 'text' },
          { key: 'title', label: 'Sự kiện', type: 'text' },
          { key: 'desc', label: 'Mô tả chi tiết', type: 'textarea' },
        ], defaultValue: [
          { year: '2016', title: 'Thành lập công ty', desc: 'Khởi đầu với đội ngũ 5 thành viên đam mê công nghệ.' },
          { year: '2018', title: 'Mở rộng quy mô', desc: 'Đạt mốc 100 khách hàng doanh nghiệp đầu tiên.' },
          { year: '2020', title: 'Giải thưởng Top IT', desc: 'Được vinh danh trong top các công ty công nghệ triển vọng.' },
          { year: '2023', title: 'Chuyển đổi số toàn diện', desc: 'Ra mắt hệ sinh thái giải pháp doanh nghiệp thế hệ mới.' },
        ]},
      ],
    },
    {
      id: 'team',
      name: 'Đội ngũ lãnh đạo',
      icon: 'Users',
      defaultVisible: true,
      fields: [
        { key: 'badge', label: 'Badge', type: 'text', defaultValue: 'Đội ngũ' },
        { key: 'title', label: 'Tiêu đề', type: 'text', defaultValue: 'Những người dẫn đường' },
        { key: 'members', label: 'Thành viên', type: 'repeater', fields: [
          { key: 'name', label: 'Họ tên', type: 'text' },
          { key: 'role', label: 'Chức vụ', type: 'text' },
          { key: 'image', label: 'Ảnh đại diện', type: 'image' },
        ], defaultValue: [
          { name: 'Nguyễn Văn A', role: 'Giám đốc Điều hành (CEO)', image: 'https://picsum.photos/seed/ceo/400/400' },
          { name: 'Trần Thị B', role: 'Giám đốc Công nghệ (CTO)', image: 'https://picsum.photos/seed/cto/400/400' },
          { name: 'Lê Văn C', role: 'Giám đốc Sản phẩm (CPO)', image: 'https://picsum.photos/seed/cpo/400/400' },
          { name: 'Phạm Thị D', role: 'Giám đốc Kinh doanh (CSO)', image: 'https://picsum.photos/seed/cso/400/400' },
        ]},
      ],
    },
  ],
}

// ===================== CONTACT PAGE =====================

const contactPageSchema: PageSchema = {
  id: 'contact',
  name: 'Liên hệ',
  path: '/contact',
  icon: 'Phone',
  sections: [
    {
      id: 'header',
      name: 'Header',
      icon: 'Type',
      defaultVisible: true,
      fields: [
        { key: 'title', label: 'Tiêu đề', type: 'text', defaultValue: 'Sẵn sàng hợp tác cùng MTIEN' },
        { key: 'description', label: 'Mô tả', type: 'textarea', defaultValue: 'Liên hệ với chúng tôi để được tư vấn giải pháp phù hợp' },
        { key: 'bgColor', label: 'Màu nền', type: 'color', defaultValue: '#F8FAFC' },
        { key: 'bgImage', label: 'Ảnh nền', type: 'image', defaultValue: '' },
      ],
    },
    {
      id: 'info',
      name: 'Thông tin liên hệ',
      icon: 'MapPin',
      defaultVisible: true,
      fields: [
        { key: 'address', label: 'Địa chỉ', type: 'textarea', defaultValue: 'Tầng 12, Tòa nhà Tech, 123 Đường Công Nghệ, Quận 1 TP.HCM' },
        { key: 'hotline', label: 'Hotline', type: 'text', defaultValue: '0123 456 789' },
        { key: 'support', label: 'Support', type: 'text', defaultValue: '0987 654 321' },
        { key: 'email', label: 'Email chính', type: 'text', defaultValue: 'contact@mtiensolution.vn' },
        { key: 'emailHR', label: 'Email tuyển dụng', type: 'text', defaultValue: 'hr@mtiensolution.vn' },
        { key: 'hoursWeekday', label: 'Giờ làm việc (T2-T6)', type: 'text', defaultValue: '08:00 - 17:30' },
        { key: 'hoursSaturday', label: 'Giờ thứ 7', type: 'text', defaultValue: '08:00 - 12:00' },
        { key: 'mapUrl', label: 'Google Maps URL', type: 'link', defaultValue: '' },
        { key: 'mapImage', label: 'Ảnh bản đồ (thay iframe)', type: 'image', defaultValue: '' },
      ],
    },
    {
      id: 'form',
      name: 'Form liên hệ',
      icon: 'FileText',
      defaultVisible: true,
      fields: [
        { key: 'title', label: 'Tiêu đề form', type: 'text', defaultValue: 'Gửi yêu cầu tư vấn' },
        { key: 'buttonText', label: 'Nút gửi', type: 'text', defaultValue: 'Gửi tin nhắn' },
        { key: 'successMessage', label: 'Thông báo thành công', type: 'text', defaultValue: 'Chúng tôi đã nhận tin nhắn. Sẽ phản hồi trong 24h!' },
        { key: 'showCompanyField', label: 'Hiện trường công ty', type: 'toggle', defaultValue: true },
        { key: 'showPhoneField', label: 'Hiện trường SĐT', type: 'toggle', defaultValue: true },
        { key: 'showServiceField', label: 'Hiện chọn dịch vụ', type: 'toggle', defaultValue: true },
      ],
    },
  ],
}

// ===================== BLOG PAGE =====================

const blogPageSchema: PageSchema = {
  id: 'blog',
  name: 'Blog',
  path: '/blog',
  icon: 'FileText',
  sections: [
    {
      id: 'header',
      name: 'Header',
      icon: 'Type',
      defaultVisible: true,
      fields: [
        { key: 'title', label: 'Tiêu đề', type: 'text', defaultValue: 'TechNova Insights' },
        { key: 'description', label: 'Mô tả', type: 'textarea', defaultValue: 'Cập nhật tin tức, kiến thức và xu hướng công nghệ mới nhất' },
        { key: 'bgColor', label: 'Màu nền', type: 'color', defaultValue: '#FFFFFF' },
        { key: 'showSearch', label: 'Hiện tìm kiếm', type: 'toggle', defaultValue: true },
        { key: 'categories', label: 'Danh mục filter', type: 'repeater', fields: [
          { key: 'name', label: 'Tên', type: 'text' },
        ], defaultValue: [
          { name: 'Tất cả' }, { name: 'Phần mềm' }, { name: 'Cloud' },
          { name: 'Thiết kế UI/UX' }, { name: 'Phần cứng' }, { name: 'Bảo mật' },
        ]},
      ],
    },
    {
      id: 'featured',
      name: 'Bài viết nổi bật',
      icon: 'Star',
      defaultVisible: true,
      fields: [
        { key: 'showFeatured', label: 'Hiện bài nổi bật', type: 'toggle', defaultValue: true },
        { key: 'bgGradient', label: 'Gradient nền', type: 'toggle', defaultValue: true },
      ],
    },
    {
      id: 'grid',
      name: 'Lưới bài viết',
      icon: 'Grid3X3',
      defaultVisible: true,
      fields: [
        { key: 'columns', label: 'Số cột', type: 'select', defaultValue: '3', options: [
          { label: '2 cột', value: '2' }, { label: '3 cột', value: '3' }, { label: '4 cột', value: '4' },
        ]},
        { key: 'showPagination', label: 'Hiện phân trang', type: 'toggle', defaultValue: true },
        { key: 'postsPerPage', label: 'Bài/trang', type: 'number', defaultValue: 9, min: 3, max: 24 },
        { key: 'showCategory', label: 'Hiện danh mục', type: 'toggle', defaultValue: true },
        { key: 'showDate', label: 'Hiện ngày', type: 'toggle', defaultValue: true },
        { key: 'showAuthor', label: 'Hiện tác giả', type: 'toggle', defaultValue: true },
      ],
    },
    {
      id: 'newsletter',
      name: 'Đăng ký nhận tin',
      icon: 'Mail',
      defaultVisible: true,
      fields: [
        { key: 'title', label: 'Tiêu đề', type: 'text', defaultValue: 'Đăng ký nhận tin' },
        { key: 'description', label: 'Mô tả', type: 'textarea', defaultValue: 'Nhận bài viết mới nhất qua email' },
        { key: 'buttonText', label: 'Nút đăng ký', type: 'text', defaultValue: 'Đăng ký' },
        { key: 'bgColor', label: 'Màu nền', type: 'color', defaultValue: '#0066FF' },
      ],
    },
  ],
}

// ===================== SERVICES PAGE =====================

const servicesPageSchema: PageSchema = {
  id: 'services',
  name: 'Dịch vụ',
  path: '/services',
  icon: 'Briefcase',
  sections: [
    {
      id: 'hero',
      name: 'Hero',
      icon: 'Sparkles',
      defaultVisible: true,
      fields: [
        { key: 'title', label: 'Tiêu đề', type: 'text', defaultValue: 'Giải pháp công nghệ toàn diện' },
        { key: 'description', label: 'Mô tả', type: 'textarea', defaultValue: 'Nâng tầm doanh nghiệp với các giải pháp số hoá chuyên sâu' },
        { key: 'bgColor', label: 'Màu nền', type: 'color', defaultValue: '#0F172A' },
        { key: 'bgImage', label: 'Ảnh nền', type: 'image', defaultValue: '' },
      ],
    },
    {
      id: 'grid',
      name: 'Lưới dịch vụ',
      icon: 'Grid3X3',
      defaultVisible: true,
      fields: [
        { key: 'services', label: 'Dịch vụ', type: 'repeater', fields: [
          { key: 'title', label: 'Tên dịch vụ', type: 'text' },
          { key: 'description', label: 'Mô tả', type: 'textarea' },
          { key: 'icon', label: 'Icon', type: 'icon' },
          { key: 'link', label: 'Link chi tiết', type: 'link' },
          { key: 'color', label: 'Màu', type: 'color' },
          { key: 'image', label: 'Ảnh minh hoạ', type: 'image' },
        ]},
      ],
    },
    {
      id: 'showcase',
      name: 'Showcase',
      icon: 'Monitor',
      defaultVisible: true,
      fields: [
        { key: 'title', label: 'Tiêu đề', type: 'text', defaultValue: 'Dashboard quản lý' },
        { key: 'description', label: 'Mô tả', type: 'textarea', defaultValue: '' },
        { key: 'image', label: 'Ảnh showcase', type: 'image', defaultValue: '' },
        { key: 'badges', label: 'Badges nổi', type: 'repeater', fields: [
          { key: 'text', label: 'Text', type: 'text' },
          { key: 'icon', label: 'Icon', type: 'icon' },
        ]},
      ],
    },
    {
      id: 'cta',
      name: 'CTA',
      icon: 'Megaphone',
      defaultVisible: true,
      fields: [
        { key: 'title', label: 'Tiêu đề', type: 'text', defaultValue: 'Sẵn sàng bắt đầu?' },
        { key: 'description', label: 'Mô tả', type: 'textarea', defaultValue: '' },
        { key: 'buttonText', label: 'Nút', type: 'text', defaultValue: 'Liên hệ tư vấn' },
        { key: 'buttonLink', label: 'Link', type: 'link', defaultValue: '/contact' },
      ],
    },
  ],
}

// ===================== PROJECTS PAGE =====================

const projectsPageSchema: PageSchema = {
  id: 'projects',
  name: 'Dự án',
  path: '/projects',
  icon: 'FolderKanban',
  sections: [
    {
      id: 'header',
      name: 'Header',
      icon: 'Type',
      defaultVisible: true,
      fields: [
        { key: 'title', label: 'Tiêu đề', type: 'text', defaultValue: 'Dự án tiêu biểu' },
        { key: 'description', label: 'Mô tả', type: 'textarea', defaultValue: 'Khám phá các dự án nổi bật chúng tôi đã thực hiện' },
        { key: 'bgColor', label: 'Màu nền', type: 'color', defaultValue: '#F8FAFC' },
      ],
    },
    {
      id: 'featured',
      name: 'Dự án nổi bật',
      icon: 'Star',
      defaultVisible: true,
      fields: [
        { key: 'showFeatured', label: 'Hiện dự án nổi bật', type: 'toggle', defaultValue: true },
      ],
    },
    {
      id: 'grid',
      name: 'Lưới dự án',
      icon: 'Grid3X3',
      defaultVisible: true,
      fields: [
        { key: 'columns', label: 'Số cột', type: 'select', defaultValue: '3', options: [
          { label: '2 cột', value: '2' }, { label: '3 cột', value: '3' },
        ]},
        { key: 'showFilters', label: 'Hiện bộ lọc', type: 'toggle', defaultValue: true },
        { key: 'showTechnology', label: 'Hiện công nghệ', type: 'toggle', defaultValue: true },
      ],
    },
    {
      id: 'cta',
      name: 'CTA',
      icon: 'Megaphone',
      defaultVisible: true,
      fields: [
        { key: 'title', label: 'Tiêu đề', type: 'text', defaultValue: 'Có dự án cần thực hiện?' },
        { key: 'buttonText', label: 'Nút', type: 'text', defaultValue: 'Liên hệ ngay' },
        { key: 'bgColor', label: 'Màu nền', type: 'color', defaultValue: '#0066FF' },
      ],
    },
  ],
}

// ===================== CLOUD SERVER PAGE =====================

const cloudServerPageSchema: PageSchema = {
  id: 'cloud-server',
  name: 'Cloud Server',
  path: '/dich-vu/cloud-server',
  icon: 'Cloud',
  sections: [
    {
      id: 'hero',
      name: 'Hero',
      icon: 'Sparkles',
      defaultVisible: true,
      fields: [
        { key: 'title', label: 'Tiêu đề', type: 'text', defaultValue: 'Kiến tạo sức mạnh, Công nghệ cốt lõi' },
        { key: 'description', label: 'Mô tả', type: 'textarea', defaultValue: '' },
        { key: 'bgColor', label: 'Màu nền', type: 'color', defaultValue: '#0F172A' },
        { key: 'bgImage', label: 'Ảnh nền', type: 'image', defaultValue: '' },
        { key: 'metrics', label: 'Chỉ số', type: 'repeater', fields: [
          { key: 'value', label: 'Giá trị', type: 'text' },
          { key: 'label', label: 'Nhãn', type: 'text' },
        ], defaultValue: [
          { value: '99.99%', label: 'Uptime SLA' },
          { value: '< 30s', label: 'Deploy time' },
          { value: 'Anti-DDoS', label: 'Security' },
          { value: '24/7', label: 'Local Support' },
        ]},
      ],
    },
    {
      id: 'trust', name: 'Đối tác & Chứng nhận', icon: 'Shield', defaultVisible: true,
      fields: [
        { key: 'title', label: 'Tiêu đề', type: 'text', defaultValue: 'Được tin tưởng bởi doanh nghiệp lớn' },
        { key: 'logos', label: 'Logo đối tác', type: 'repeater', fields: [
          { key: 'name', label: 'Tên', type: 'text' },
          { key: 'image', label: 'Logo', type: 'image' },
        ]},
      ],
    },
    {
      id: 'features', name: 'Tính năng', icon: 'Zap', defaultVisible: true,
      fields: [
        { key: 'title', label: 'Tiêu đề', type: 'text', defaultValue: 'Tính năng vượt trội' },
        { key: 'features', label: 'Tính năng', type: 'repeater', fields: [
          { key: 'title', label: 'Tiêu đề', type: 'text' },
          { key: 'description', label: 'Mô tả', type: 'textarea' },
          { key: 'icon', label: 'Icon', type: 'icon' },
        ]},
      ],
    },
    {
      id: 'controlPanel', name: 'Bảng điều khiển', icon: 'LayoutDashboard', defaultVisible: true,
      fields: [
        { key: 'title', label: 'Tiêu đề', type: 'text', defaultValue: 'Quản lý trực quan' },
        { key: 'description', label: 'Mô tả', type: 'textarea', defaultValue: '' },
        { key: 'image', label: 'Ảnh giao diện', type: 'image', defaultValue: '' },
        { key: 'features', label: 'Tính năng', type: 'repeater', fields: [
          { key: 'title', label: 'Tên', type: 'text' },
          { key: 'description', label: 'Mô tả', type: 'textarea' },
        ]},
      ],
    },
    {
      id: 'specs', name: 'Thông số phần cứng', icon: 'Cpu', defaultVisible: true,
      fields: [
        { key: 'title', label: 'Tiêu đề', type: 'text', defaultValue: 'Phần cứng mạnh mẽ' },
        { key: 'specs', label: 'Thông số', type: 'repeater', fields: [
          { key: 'label', label: 'Nhãn', type: 'text' },
          { key: 'value', label: 'Giá trị', type: 'text' },
        ]},
      ],
    },
    {
      id: 'network', name: 'Mô hình mạng', icon: 'Network', defaultVisible: true,
      fields: [
        { key: 'title', label: 'Tiêu đề', type: 'text', defaultValue: 'Hạ tầng mạng Tier-3' },
        { key: 'description', label: 'Mô tả', type: 'textarea', defaultValue: '' },
        { key: 'image', label: 'Sơ đồ mạng', type: 'image', defaultValue: '' },
        { key: 'highlights', label: 'Điểm nổi bật', type: 'repeater', fields: [
          { key: 'title', label: 'Tiêu đề', type: 'text' },
          { key: 'value', label: 'Giá trị', type: 'text' },
        ]},
      ],
    },
    {
      id: 'migration', name: 'Di chuyển & Hỗ trợ', icon: 'ArrowRightLeft', defaultVisible: true,
      fields: [
        { key: 'title', label: 'Tiêu đề', type: 'text', defaultValue: 'Hỗ trợ di chuyển 24/7' },
        { key: 'description', label: 'Mô tả', type: 'textarea', defaultValue: '' },
        { key: 'features', label: 'Dịch vụ', type: 'repeater', fields: [
          { key: 'title', label: 'Tên', type: 'text' },
          { key: 'description', label: 'Mô tả', type: 'textarea' },
          { key: 'icon', label: 'Icon', type: 'icon' },
        ]},
      ],
    },
    {
      id: 'pricing', name: 'Bảng giá', icon: 'DollarSign', defaultVisible: true,
      fields: [
        { key: 'title', label: 'Tiêu đề', type: 'text', defaultValue: 'Bảng giá Cloud Server' },
        { key: 'plans', label: 'Gói', type: 'repeater', fields: [
          { key: 'name', label: 'Tên gói', type: 'text' },
          { key: 'cpu', label: 'CPU', type: 'text' },
          { key: 'ram', label: 'RAM', type: 'text' },
          { key: 'storage', label: 'Storage', type: 'text' },
          { key: 'bandwidth', label: 'Bandwidth', type: 'text' },
          { key: 'price', label: 'Giá/tháng', type: 'number' },
          { key: 'popular', label: 'Phổ biến', type: 'toggle' },
        ]},
      ],
    },
  ],
}

// ===================== MARKETING PAGE =====================

const marketingPageSchema: PageSchema = {
  id: 'marketing',
  name: 'Marketing số',
  path: '/dich-vu/marketing',
  icon: 'Megaphone',
  sections: [
    {
      id: 'hero', name: 'Hero', icon: 'Sparkles', defaultVisible: true,
      fields: [
        { key: 'title', label: 'Tiêu đề', type: 'text', defaultValue: 'Marketing dựa trên Những Con Số Thực Tế' },
        { key: 'description', label: 'Mô tả', type: 'textarea', defaultValue: '' },
        { key: 'bgColor', label: 'Màu nền', type: 'color', defaultValue: '#0A0A0A' },
        { key: 'bgImage', label: 'Ảnh nền', type: 'image', defaultValue: '' },
      ],
    },
    {
      id: 'vision', name: 'Tầm nhìn & Vấn đề', icon: 'Target', defaultVisible: true,
      fields: [
        { key: 'title', label: 'Tiêu đề', type: 'text', defaultValue: '' },
        { key: 'description', label: 'Mô tả', type: 'textarea', defaultValue: '' },
      ],
    },
    {
      id: 'coreValues', name: 'Giá trị cốt lõi', icon: 'Heart', defaultVisible: true,
      fields: [
        { key: 'title', label: 'Tiêu đề', type: 'text', defaultValue: 'DNA Tăng Trưởng' },
        { key: 'values', label: 'Giá trị', type: 'repeater', fields: [
          { key: 'title', label: 'Tiêu đề', type: 'text' },
          { key: 'description', label: 'Mô tả', type: 'textarea' },
          { key: 'icon', label: 'Icon', type: 'icon' },
        ]},
      ],
    },
    {
      id: 'services', name: 'Dịch vụ', icon: 'Layers', defaultVisible: true,
      fields: [
        { key: 'title', label: 'Tiêu đề', type: 'text', defaultValue: '' },
        { key: 'services', label: 'Dịch vụ', type: 'repeater', fields: [
          { key: 'title', label: 'Tên', type: 'text' },
          { key: 'description', label: 'Mô tả', type: 'textarea' },
          { key: 'icon', label: 'Icon', type: 'icon' },
          { key: 'features', label: 'Tính năng', type: 'textarea' },
        ]},
      ],
    },
    {
      id: 'funnel', name: 'Mô hình AARRR', icon: 'Filter', defaultVisible: true,
      fields: [
        { key: 'title', label: 'Tiêu đề', type: 'text', defaultValue: 'Mô hình Phễu AARRR' },
        { key: 'description', label: 'Mô tả', type: 'textarea', defaultValue: '' },
        { key: 'stages', label: 'Giai đoạn', type: 'repeater', fields: [
          { key: 'name', label: 'Tên', type: 'text' },
          { key: 'description', label: 'Mô tả', type: 'textarea' },
          { key: 'color', label: 'Màu', type: 'color' },
        ]},
      ],
    },
    {
      id: 'techProcess', name: 'Công nghệ & Quy trình', icon: 'Settings', defaultVisible: true,
      fields: [
        { key: 'title', label: 'Tiêu đề', type: 'text', defaultValue: 'Công nghệ Tracking hiện đại' },
        { key: 'description', label: 'Mô tả', type: 'textarea', defaultValue: '' },
        { key: 'tools', label: 'Công cụ', type: 'repeater', fields: [
          { key: 'name', label: 'Tên', type: 'text' },
          { key: 'icon', label: 'Icon', type: 'icon' },
        ]},
        { key: 'steps', label: 'Bước quy trình', type: 'repeater', fields: [
          { key: 'number', label: 'Số', type: 'text' },
          { key: 'title', label: 'Tiêu đề', type: 'text' },
          { key: 'description', label: 'Mô tả', type: 'textarea' },
        ]},
      ],
    },
    {
      id: 'socialProof', name: 'Chỉ số & Đánh giá', icon: 'ThumbsUp', defaultVisible: true,
      fields: [
        { key: 'title', label: 'Tiêu đề', type: 'text', defaultValue: 'Kết quả thực tế' },
        { key: 'stats', label: 'Chỉ số', type: 'repeater', fields: [
          { key: 'number', label: 'Số', type: 'text' },
          { key: 'label', label: 'Nhãn', type: 'text' },
        ]},
        { key: 'testimonials', label: 'Đánh giá', type: 'repeater', fields: [
          { key: 'name', label: 'Tên', type: 'text' },
          { key: 'company', label: 'Công ty', type: 'text' },
          { key: 'content', label: 'Nội dung', type: 'textarea' },
          { key: 'avatar', label: 'Ảnh', type: 'image' },
        ]},
      ],
    },
    {
      id: 'pricing', name: 'Bảng giá', icon: 'DollarSign', defaultVisible: true,
      fields: [
        { key: 'title', label: 'Tiêu đề', type: 'text', defaultValue: 'Giải pháp phù hợp mọi quy mô' },
        { key: 'plans', label: 'Gói dịch vụ', type: 'repeater', fields: [
          { key: 'name', label: 'Tên gói', type: 'text' },
          { key: 'price', label: 'Giá', type: 'number' },
          { key: 'features', label: 'Tính năng', type: 'textarea' },
          { key: 'popular', label: 'Phổ biến', type: 'toggle' },
        ]},
      ],
    },
    {
      id: 'cta', name: 'CTA', icon: 'Megaphone', defaultVisible: true,
      fields: [
        { key: 'title', label: 'Tiêu đề', type: 'text', defaultValue: '' },
        { key: 'buttonText', label: 'Nút', type: 'text', defaultValue: 'Nhận tư vấn miễn phí' },
        { key: 'bgColor', label: 'Màu nền', type: 'color', defaultValue: '#0066FF' },
      ],
    },
  ],
}

// ===================== DESIGN PAGE =====================

const designPageSchema: PageSchema = {
  id: 'design',
  name: 'Thiết kế UX/UI',
  path: '/dich-vu/marketing-design',
  icon: 'PenTool',
  sections: [
    {
      id: 'hero', name: 'Hero', icon: 'Sparkles', defaultVisible: true,
      fields: [
        { key: 'title', label: 'Tiêu đề', type: 'text', defaultValue: 'Giao diện Đẹp. Trải nghiệm Hoàn hảo' },
        { key: 'description', label: 'Mô tả', type: 'textarea', defaultValue: '' },
        { key: 'bgColor', label: 'Màu nền', type: 'color', defaultValue: '#FAFAFC' },
        { key: 'bgImage', label: 'Ảnh nền', type: 'image', defaultValue: '' },
      ],
    },
    {
      id: 'vision', name: 'Tại sao Design quan trọng', icon: 'Eye', defaultVisible: true,
      fields: [
        { key: 'title', label: 'Tiêu đề', type: 'text', defaultValue: '' },
        { key: 'description', label: 'Mô tả', type: 'textarea', defaultValue: '' },
      ],
    },
    {
      id: 'coreValues', name: 'Triết lý thiết kế', icon: 'Heart', defaultVisible: true,
      fields: [
        { key: 'title', label: 'Tiêu đề', type: 'text', defaultValue: '' },
        { key: 'values', label: 'Giá trị', type: 'repeater', fields: [
          { key: 'title', label: 'Tiêu đề', type: 'text' },
          { key: 'description', label: 'Mô tả', type: 'textarea' },
          { key: 'icon', label: 'Icon', type: 'icon' },
          { key: 'color', label: 'Màu', type: 'color' },
        ]},
      ],
    },
    {
      id: 'serviceWeb', name: 'Thiết kế Web & App', icon: 'Monitor', defaultVisible: true,
      fields: [
        { key: 'title', label: 'Tiêu đề', type: 'text', defaultValue: '' },
        { key: 'features', label: 'Tính năng', type: 'repeater', fields: [
          { key: 'title', label: 'Tiêu đề', type: 'text' },
          { key: 'description', label: 'Mô tả', type: 'textarea' },
        ]},
      ],
    },
    {
      id: 'serviceBrand', name: 'Thương hiệu', icon: 'Palette', defaultVisible: true,
      fields: [
        { key: 'title', label: 'Tiêu đề', type: 'text', defaultValue: '' },
        { key: 'features', label: 'Dịch vụ', type: 'repeater', fields: [
          { key: 'title', label: 'Tiêu đề', type: 'text' },
          { key: 'description', label: 'Mô tả', type: 'textarea' },
        ]},
      ],
    },
    {
      id: 'designSystem', name: 'Design System', icon: 'Component', defaultVisible: true,
      fields: [
        { key: 'title', label: 'Tiêu đề', type: 'text', defaultValue: 'Design System & Dev Handoff' },
        { key: 'description', label: 'Mô tả', type: 'textarea', defaultValue: '' },
        { key: 'features', label: 'Tính năng', type: 'repeater', fields: [
          { key: 'title', label: 'Tiêu đề', type: 'text' },
          { key: 'description', label: 'Mô tả', type: 'textarea' },
          { key: 'icon', label: 'Icon', type: 'icon' },
        ]},
      ],
    },
    {
      id: 'process', name: 'Quy trình', icon: 'GitBranch', defaultVisible: true,
      fields: [
        { key: 'title', label: 'Tiêu đề', type: 'text', defaultValue: '' },
        { key: 'steps', label: 'Bước', type: 'repeater', fields: [
          { key: 'number', label: 'Số', type: 'text' },
          { key: 'title', label: 'Tiêu đề', type: 'text' },
          { key: 'description', label: 'Mô tả', type: 'textarea' },
        ]},
      ],
    },
    {
      id: 'testimonials', name: 'Đánh giá đối tác', icon: 'MessageSquare', defaultVisible: true,
      fields: [
        { key: 'title', label: 'Tiêu đề', type: 'text', defaultValue: 'Đối tác nói gì' },
        { key: 'reviews', label: 'Đánh giá', type: 'repeater', fields: [
          { key: 'name', label: 'Tên', type: 'text' },
          { key: 'company', label: 'Công ty', type: 'text' },
          { key: 'content', label: 'Nội dung', type: 'textarea' },
          { key: 'avatar', label: 'Ảnh', type: 'image' },
          { key: 'rating', label: 'Đánh giá (1-5)', type: 'number', min: 1, max: 5 },
        ]},
      ],
    },
    {
      id: 'pricing', name: 'Bảng giá', icon: 'DollarSign', defaultVisible: true,
      fields: [
        { key: 'title', label: 'Tiêu đề', type: 'text', defaultValue: '' },
        { key: 'plans', label: 'Gói', type: 'repeater', fields: [
          { key: 'name', label: 'Tên gói', type: 'text' },
          { key: 'price', label: 'Giá', type: 'number' },
          { key: 'features', label: 'Tính năng', type: 'textarea' },
          { key: 'popular', label: 'Phổ biến', type: 'toggle' },
        ]},
      ],
    },
  ],
}

// ===================== SOFTWARE PAGE =====================

const softwarePageSchema: PageSchema = {
  id: 'software',
  name: 'Phần mềm',
  path: '/dich-vu/phan-mem',
  icon: 'Code',
  sections: [
    {
      id: 'breadcrumb', name: 'Breadcrumb', icon: 'Navigation', defaultVisible: true,
      fields: [
        { key: 'showBreadcrumb', label: 'Hiện breadcrumb', type: 'toggle', defaultValue: true },
        { key: 'bgColor', label: 'Màu nền', type: 'color', defaultValue: '#FFFFFF' },
        { key: 'title', label: 'Tiêu đề trang', type: 'text', defaultValue: 'Phát triển phần mềm' },
        { key: 'description', label: 'Mô tả', type: 'textarea', defaultValue: '' },
      ],
    },
    {
      id: 'features', name: 'Tính năng chính', icon: 'Zap', defaultVisible: true,
      fields: [
        { key: 'title', label: 'Tiêu đề', type: 'text', defaultValue: '' },
        { key: 'cards', label: 'Thẻ', type: 'repeater', fields: [
          { key: 'number', label: 'Số', type: 'text' },
          { key: 'label', label: 'Nhãn', type: 'text' },
          { key: 'description', label: 'Mô tả', type: 'textarea' },
          { key: 'image', label: 'Ảnh', type: 'image' },
        ]},
      ],
    },
    {
      id: 'ecosystem', name: 'Hệ sinh thái', icon: 'Globe', defaultVisible: true,
      fields: [
        { key: 'title', label: 'Tiêu đề', type: 'text', defaultValue: '' },
        { key: 'description', label: 'Mô tả', type: 'textarea', defaultValue: '' },
        { key: 'tabs', label: 'Tab', type: 'repeater', fields: [
          { key: 'name', label: 'Tên', type: 'text' },
          { key: 'products', label: 'Sản phẩm', type: 'textarea' },
        ]},
      ],
    },
    {
      id: 'marquee', name: 'Marquee Banner', icon: 'ArrowRight', defaultVisible: true,
      fields: [
        { key: 'showMarquee', label: 'Hiện marquee', type: 'toggle', defaultValue: true },
        { key: 'speed', label: 'Tốc độ (giây)', type: 'number', defaultValue: 30, min: 5, max: 120 },
        { key: 'bgColor', label: 'Màu nền', type: 'color', defaultValue: '#F8FAFC' },
        { key: 'items', label: 'Nội dung', type: 'repeater', fields: [
          { key: 'text', label: 'Text', type: 'text' },
          { key: 'icon', label: 'Icon', type: 'icon' },
        ]},
      ],
    },
    {
      id: 'process', name: 'Quy trình phát triển', icon: 'GitBranch', defaultVisible: true,
      fields: [
        { key: 'title', label: 'Tiêu đề', type: 'text', defaultValue: '' },
        { key: 'steps', label: 'Bước', type: 'repeater', fields: [
          { key: 'number', label: 'Số', type: 'text' },
          { key: 'title', label: 'Tiêu đề', type: 'text' },
          { key: 'description', label: 'Mô tả', type: 'textarea' },
        ]},
      ],
    },
    {
      id: 'pricing', name: 'Bảng giá', icon: 'DollarSign', defaultVisible: true,
      fields: [
        { key: 'title', label: 'Tiêu đề', type: 'text', defaultValue: '' },
        { key: 'plans', label: 'Gói', type: 'repeater', fields: [
          { key: 'name', label: 'Tên', type: 'text' },
          { key: 'price', label: 'Giá', type: 'number' },
          { key: 'features', label: 'Tính năng', type: 'textarea' },
          { key: 'popular', label: 'Phổ biến', type: 'toggle' },
        ]},
      ],
    },
    {
      id: 'faq', name: 'FAQ', icon: 'HelpCircle', defaultVisible: true,
      fields: [
        { key: 'title', label: 'Tiêu đề', type: 'text', defaultValue: '' },
        { key: 'items', label: 'Câu hỏi', type: 'repeater', fields: [
          { key: 'question', label: 'Câu hỏi', type: 'text' },
          { key: 'answer', label: 'Trả lời', type: 'textarea' },
        ]},
      ],
    },
  ],
}

// ===================== SHOP PAGE =====================

const shopPageSchema: PageSchema = {
  id: 'shop',
  name: 'Cửa hàng',
  path: '/shop',
  icon: 'ShoppingBag',
  sections: [
    {
      id: 'header', name: 'Header', icon: 'Type', defaultVisible: true,
      fields: [
        { key: 'title', label: 'Tiêu đề', type: 'text', defaultValue: 'Shop Máy Tính & Linh Kiện' },
        { key: 'description', label: 'Mô tả', type: 'textarea', defaultValue: '' },
        { key: 'bgColor', label: 'Màu nền', type: 'color', defaultValue: '#F8FAFC' },
        { key: 'bannerImage', label: 'Banner chính', type: 'image', defaultValue: '' },
        { key: 'showCategories', label: 'Hiện danh mục', type: 'toggle', defaultValue: true },
        { key: 'showFilters', label: 'Hiện bộ lọc', type: 'toggle', defaultValue: true },
        { key: 'productsPerPage', label: 'Sản phẩm/trang', type: 'number', defaultValue: 12, min: 6, max: 48 },
        { key: 'gridColumns', label: 'Số cột', type: 'select', defaultValue: '4', options: [
          { label: '3 cột', value: '3' }, { label: '4 cột', value: '4' }, { label: '5 cột', value: '5' },
        ]},
      ],
    },
  ],
}

// ===================== EXPORT ALL SCHEMAS =====================

export const allPageSchemas: PageSchema[] = [
  homePageSchema,
  aboutPageSchema,
  blogPageSchema,
  contactPageSchema,
  servicesPageSchema,
  projectsPageSchema,
  cloudServerPageSchema,
  marketingPageSchema,
  designPageSchema,
  softwarePageSchema,
  shopPageSchema,
]

// Generate default values from schema
export function generateDefaultValues(schemas: PageSchema[]): Record<string, Record<string, { visible: boolean; order: number; values: Record<string, unknown> }>> {
  const result: Record<string, Record<string, { visible: boolean; order: number; values: Record<string, unknown> }>> = {}

  for (const page of schemas) {
    result[page.id] = {}
    page.sections.forEach((section, idx) => {
      const values: Record<string, unknown> = {}
      for (const field of section.fields) {
        values[field.key] = field.defaultValue ?? ''
      }
      result[page.id][section.id] = {
        visible: section.defaultVisible ?? true,
        order: idx,
        values,
      }
    })
  }

  return result
}

export function generateGlobalDefaults(): Record<string, Record<string, unknown>> {
  const result: Record<string, Record<string, unknown>> = {}
  for (const [key, schema] of Object.entries(globalThemeSchema)) {
    result[key] = {}
    for (const field of schema.fields) {
      result[key][field.key] = field.defaultValue ?? ''
    }
  }
  return result
}
