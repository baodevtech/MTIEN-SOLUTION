'use client';

import { useState, useCallback, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown, ArrowRight, Phone, Mail, Sparkles, Smartphone, Cloud, PenTool, Megaphone, Store, Users, CreditCard, Newspaper, MonitorPlay, Search, ShoppingCart } from 'lucide-react';
import { useGlobal } from '@/lib/theme-context';
import { useSiteSettings } from '@/lib/settings-context';

// Icon map for dynamic icon resolution from theme
const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>> = {
  Store, Users, CreditCard, Newspaper, Smartphone, Cloud, PenTool, Megaphone, MonitorPlay, Search, ShoppingCart, Phone, Mail, Sparkles, Menu,
};

function getIcon(name: string) {
  return iconMap[name] || null;
}

interface SubLink {
  href: string;
  label: string;
  desc: string;
  icon: string;
}

interface MenuItem {
  href: string;
  label: string;
  icon: string;
  isHot: boolean;
  openNewTab: boolean;
  hasDropdown: boolean;
  subLinks: SubLink[];
}

// Parse sub-items from textarea format: "href|label|desc|icon" per line
function parseSubItems(raw: string): SubLink[] {
  if (!raw || typeof raw !== 'string') return [];
  return raw.split('\n').filter(Boolean).map(line => {
    const parts = line.split('|');
    return {
      href: parts[0]?.trim() || '#',
      label: parts[1]?.trim() || '',
      desc: parts[2]?.trim() || '',
      icon: parts[3]?.trim() || '',
    };
  }).filter(s => s.label);
}

function parseMenuItems(raw: unknown): MenuItem[] {
  if (!Array.isArray(raw) || raw.length === 0) return [];
  return raw.map((item: Record<string, unknown>) => {
    const subItems = parseSubItems(String(item.subItems || ''));
    return {
      href: String(item.href || '#'),
      label: String(item.label || ''),
      icon: String(item.icon || ''),
      isHot: Boolean(item.isHot),
      openNewTab: Boolean(item.openNewTab),
      hasDropdown: subItems.length > 0,
      subLinks: subItems,
    };
  }).filter(m => m.label);
}

const defaultMenuItems: MenuItem[] = [
  { href: '/', label: 'Trang chủ', icon: 'Store', hasDropdown: false, isHot: false, openNewTab: false, subLinks: [] },
  {
    href: '#', label: 'Giải pháp & Dịch vụ', icon: '', hasDropdown: true, isHot: false, openNewTab: false,
    subLinks: [
      { href: '/dich-vu/phan-mem', label: 'Phần mềm & Ứng dụng', desc: 'Phát triển App/Web App chất lượng cao', icon: 'Smartphone' },
      { href: '/dich-vu/cloud-server', label: 'Hạ tầng Cloud & Server', desc: 'Máy chủ mạnh mẽ, bảo mật đa tầng', icon: 'Cloud' },
      { href: '/dich-vu/marketing-design', label: 'Thiết kế UX/UI & Branding', desc: 'Sáng tạo nhận diện thương hiệu độc bản', icon: 'PenTool' },
      { href: '/dich-vu/marketing', label: 'Tiếp thị Digital Marketing', desc: 'Giải pháp tăng trưởng doanh thu đa kênh', icon: 'Megaphone' },
    ],
  },
  { href: '/shop', label: 'Cửa hàng', icon: 'Store', hasDropdown: false, isHot: true, openNewTab: false, subLinks: [] },
  { href: '#', label: 'Đối tác', icon: 'Users', hasDropdown: false, isHot: false, openNewTab: false, subLinks: [] },
  { href: '#', label: 'Bảng giá', icon: 'CreditCard', hasDropdown: false, isHot: false, openNewTab: false, subLinks: [] },
  { href: '/blog', label: 'Tin tức', icon: 'Newspaper', hasDropdown: false, isHot: false, openNewTab: false, subLinks: [] },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Site settings
  const siteSettings = useSiteSettings();

  // Theme values with fallbacks
  const logoText = useGlobal('navbar', 'logoText', 'MTIEN') as string;
  const logoSubtext = useGlobal('navbar', 'logoSubtext', 'Solution') as string;
  const logoImage = useGlobal('navbar', 'logoImage', '') as string;
  const ctaButton = useGlobal('navbar', 'ctaButton', 'Nhận báo giá') as string;
  const ctaButtonLink = useGlobal('navbar', 'ctaButtonLink', '#') as string;
  const showTopBanner = useGlobal('navbar', 'showTopBanner', true) as boolean;
  
  // Topbar fields
  const topbarPhone = useGlobal('navbar', 'topbarPhone', '1800 6750') as string;
  const topbarEmail = useGlobal('navbar', 'topbarEmail', 'support@mtiensolution.vn') as string;
  const topbarBadge = useGlobal('navbar', 'topbarBadge', 'GIẢI PHÁP CHUYỂN ĐỔI SỐ') as string;
  const topbarSlogan = useGlobal('navbar', 'topbarSlogan', 'Đồng hành cùng doanh nghiệp phát triển bền vững') as string;
  const topbarCtaText = useGlobal('navbar', 'topbarCtaText', 'Khám phá ngay') as string;
  const topbarCtaLink = useGlobal('navbar', 'topbarCtaLink', '#') as string;

  // Menu items from theme
  const rawMenuItems = useGlobal('navbar', 'menuItems', null);
  const mainLinks = useMemo(() => {
    const parsed = parseMenuItems(rawMenuItems);
    let items = parsed.length > 0 ? parsed : defaultMenuItems;
    // Hide shop links when shop maintenance is on
    if (siteSettings.shopMaintenance) {
      items = items.filter(item => item.href !== '/shop' && !item.href.startsWith('/shop/'));
    }
    return items;
  }, [rawMenuItems, siteSettings.shopMaintenance]);

  // Right menu items
  const rawRightMenu = useGlobal('navbar', 'rightMenuItems', null) as Array<Record<string, unknown>> | null;
  const rightMenuItems = useMemo(() => {
    if (!Array.isArray(rawRightMenu) || rawRightMenu.length === 0) {
      return [{ label: 'Khách hàng', href: '#' }];
    }
    return rawRightMenu.map(item => ({
      label: String(item.label || ''),
      href: String(item.href || '#'),
    })).filter(m => m.label);
  }, [rawRightMenu]);

  const toggleMenu = useCallback(() => setIsOpen((prev) => !prev), []);
  const closeMenu = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={`w-full z-50 flex flex-col fixed top-0 left-0 right-0 transition-all duration-500 ease-out ${scrolled ? 'shadow-[0_8px_30px_rgb(0,0,0,0.06)] backdrop-blur-xl bg-white/80' : 'bg-white'}`} role="banner">
        {/* Top Banner — Refined & Softer */}
        {showTopBanner && (
        <div className={`transition-all duration-500 overflow-hidden ${scrolled ? 'h-0 opacity-0' : 'h-10 opacity-100'}`}>
          <div className="bg-gradient-to-r from-[#001440] via-[#002f90] to-[#001440] text-blue-50 text-[12px] h-full flex justify-center items-center px-4 relative">
            <div className="flex items-center gap-4 max-w-7xl mx-auto w-full justify-between lg:justify-center">
              <div className="hidden lg:flex items-center gap-5 text-blue-100/90 font-medium">
                <a href={`tel:${topbarPhone.replace(/\s/g, '')}`} className="flex items-center gap-1.5 hover:text-white transition-colors group">
                  <Phone size={13} className="group-hover:scale-110 transition-transform" /> Hỗ trợ: <span className="font-bold tracking-wide">{topbarPhone}</span>
                </a>
                <div className="w-1 h-1 rounded-full bg-blue-400/50"></div>
                <a href={`mailto:${topbarEmail}`} className="flex items-center gap-1.5 hover:text-white transition-colors group">
                  <Mail size={13} className="group-hover:scale-110 transition-transform" /> {topbarEmail}
                </a>
              </div>
              
              <div className="flex items-center justify-center flex-1 gap-2.5 md:gap-3">
                <span className="flex bg-white/10 px-2.5 py-1 rounded-full text-[10px] items-center gap-1 backdrop-blur-md border border-white/20 font-bold tracking-widest text-white shadow-sm">
                  <Sparkles size={11} className="text-yellow-400 animate-pulse" /> {topbarBadge}
                </span>
                <span className="font-medium truncate max-w-[200px] sm:max-w-max hidden md:block text-blue-50">{topbarSlogan}</span>
                <Link href={topbarCtaLink} className="text-yellow-400 hover:text-yellow-300 flex items-center gap-1 ml-1 md:ml-3 font-semibold shrink-0 group transition-all" aria-label="Xem thêm ưu đãi">
                  {topbarCtaText}
                  <div className="bg-white/10 rounded-full p-0.5 group-hover:bg-white/20 transition-colors">
                    <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
        )}

        {/* Main Navbar */}
        <nav className={`border-b border-gray-100/50 transition-all duration-500 ${scrolled ? 'py-1 min-h-[64px]' : 'py-2 md:py-3'}`} aria-label="Điều hướng chính">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-14 md:h-[68px]">
              {/* Left Logo */}
              <div className="flex items-center">
                <Link href="/" className="flex items-center gap-2.5 group" aria-label="MTIEN SOLUTION - Trang chủ">
                  {logoImage ? (
                    <img src={logoImage.startsWith('http') ? logoImage : `${process.env.NEXT_PUBLIC_ADMIN_API_URL || ''}${logoImage}`} alt={`${logoText} ${logoSubtext}`} className="h-10 md:h-12 w-auto object-contain" />
                  ) : (
                    <>
                      <div className="relative w-[38px] h-[38px] md:w-11 md:h-11">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#0066FF] to-[#00D68F] rounded-2xl opacity-20 blur group-hover:opacity-40 transition-opacity duration-500"></div>
                        <div className="relative w-full h-full bg-gradient-to-br from-[#0066FF] to-[#00D68F] rounded-2xl flex items-center justify-center text-white font-extrabold text-xl shadow-lg border border-white/20">
                          M
                        </div>
                      </div>
                      <div className="hidden sm:flex flex-col justify-center">
                        <span className="font-extrabold text-xl text-gray-900 tracking-tight leading-none">
                          {logoText}<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0066FF] to-[#0052CC]">{logoSubtext.toUpperCase()}</span>
                        </span>
                        <span className="text-[10px] text-gray-500 font-medium tracking-widest uppercase mt-0.5">Technology Group</span>
                      </div>
                    </>
                  )}
                </Link>
              </div>

              {/* Desktop Menu */}
              <div className="hidden lg:flex items-center gap-1.5" role="menubar">
                {mainLinks.map((link, idx) => (
                  <div key={idx} className="relative group px-1" role="none">
                    <Link
                      href={link.href}
                      className="text-[14px] font-semibold text-gray-600 hover:text-[#0066FF] flex items-center gap-1.5 transition-all py-2.5 px-3.5 rounded-xl hover:bg-blue-50/60"
                      role="menuitem"
                      aria-haspopup={link.hasDropdown ? 'true' : undefined}
                      aria-expanded={link.hasDropdown ? 'false' : undefined}
                    >
                      {link.label}
                      {link.hasDropdown && (
                        <ChevronDown size={14} className="text-gray-400 group-hover:text-[#0066FF] group-hover:-rotate-180 transition-transform duration-300" aria-hidden="true" />
                      )}
                      {link.isHot && (
                        <span className="absolute -top-1 right-0 flex h-4 items-center">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-60"></span>
                          <span className="relative inline-flex rounded-full px-1.5 py-0.5 text-[9px] font-extrabold bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-sm">HOT</span>
                        </span>
                      )}
                    </Link>

                    {/* Mega Menu Dropdown */}
                    {link.hasDropdown && link.subLinks && link.subLinks.length > 0 && (
                      <div className="absolute top-[120%] left-1/2 -translate-x-1/2 w-[700px] bg-white/95 backdrop-blur-2xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] rounded-[24px] border border-gray-100/80 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:top-full transition-all duration-400 z-50 overflow-hidden transform scale-[0.98] group-hover:scale-100 origin-top" role="menu">
                        <div className="p-6 grid grid-cols-2 gap-3 relative">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-[50px] pointer-events-none"></div>
                          {link.subLinks.map((subLink, subIdx) => {
                            const Icon = getIcon(subLink.icon);
                            return (
                              <Link key={subIdx} href={subLink.href} className="flex p-4 rounded-2xl hover:bg-gray-50 transition-all duration-300 group/item items-start gap-4" role="menuitem">
                                <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center shrink-0 group-hover/item:border-[#0066FF]/20 group-hover/item:bg-blue-50/50 transition-colors">
                                  {Icon ? <Icon className="w-6 h-6 text-[#0066FF] group-hover/item:scale-110 transition-transform duration-300" strokeWidth={1.5} /> : <Sparkles className="w-6 h-6 text-[#0066FF]" strokeWidth={1.5} />}
                                </div>
                                <div>
                                  <p className="text-[15px] font-bold text-gray-900 group-hover/item:text-[#0066FF] mb-1 leading-tight flex items-center gap-1">
                                    {subLink.label}
                                  </p>
                                  <p className="text-[13px] text-gray-500 leading-snug">{subLink.desc}</p>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                        <div className="bg-gradient-to-r from-gray-50 to-blue-50/30 px-8 py-5 border-t border-gray-100/60 flex justify-between items-center group/cta">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-[#0066FF]">
                              <MonitorPlay size={20} strokeWidth={2} />
                            </div>
                            <div>
                              <p className="text-[14px] text-gray-900 font-bold">Bạn chưa biết chọn giải pháp nào?</p>
                              <p className="text-[12px] text-gray-500">Nhận tư vấn 1-1 miễn phí từ chuyên gia</p>
                            </div>
                          </div>
                          <Link href="/contact" className="text-sm font-bold text-white bg-gray-900 hover:bg-[#0066FF] px-5 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-md group-hover/cta:shadow-xl">
                            Tư vấn ngay <ArrowRight size={14} className="group-hover/cta:translate-x-1 transition-transform" />
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Right Actions */}
              <div className="hidden lg:flex items-center gap-4">
                {rightMenuItems.map((item, idx) => (
                  <Link key={idx} href={item.href} className="text-[14px] font-bold text-gray-600 hover:text-[#0066FF] transition-colors px-3 py-2 rounded-xl hover:bg-gray-50/80">{item.label}</Link>
                ))}
                <div className="w-px h-6 bg-gray-200"></div>
                <Link href={ctaButtonLink} className="relative group overflow-hidden bg-gray-900 text-white px-6 py-2.5 rounded-[14px] font-bold transition-all shadow-[0_4px_14px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_20px_rgba(0,102,255,0.3)] hover:-translate-y-0.5 hover:bg-[#0066FF]">
                  <span className="relative z-10 flex items-center gap-2">
                    {ctaButton} <Sparkles size={14} />
                  </span>
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-out"></div>
                </Link>
              </div>

              {/* Mobile Right Actions (Search & Hamburger) */}
              <div className="flex items-center gap-1.5 sm:gap-2 lg:hidden">
                {/* Search Button */}
                <button className="hidden sm:flex w-9 h-9 sm:w-10 sm:h-10 items-center justify-center text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-[12px] transition-colors border border-gray-100/80 focus:outline-none focus:ring-2 focus:ring-[#0066FF]/20" aria-label="Tìm kiếm">
                  <Search size={18} strokeWidth={2.5} />
                </button>

                {/* Cart Button — hidden when shop maintenance is on */}
                {!siteSettings.shopMaintenance && (
                <Link href="/cart" className="relative w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-[12px] transition-colors border border-gray-100/80 focus:outline-none focus:ring-2 focus:ring-[#0066FF]/20" aria-label="Giỏ hàng">
                  <ShoppingCart size={18} strokeWidth={2.5} />
                  <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-extrabold w-4 h-4 md:w-4.5 md:h-4.5 flex items-center justify-center rounded-full shadow-sm border border-white">2</span>
                </Link>
                )}
                
                {/* CTA Button (Tư vấn) */}
                <Link href={`tel:${topbarPhone.replace(/\s/g, '')}`} className="text-[13px] font-bold text-white bg-gray-900 hover:bg-[#0066FF] px-3.5 py-[9px] rounded-[14px] shadow-sm transition-all flex items-center gap-1.5 focus:ring-2 focus:ring-[#0066FF]/20 ml-1">
                  <span>Tư vấn</span>
                </Link>

                {/* Mobile Menu Hamburger Button */}
                <button
                  onClick={toggleMenu}
                  className="relative text-gray-700 bg-white hover:bg-gray-50 rounded-[14px] p-2 w-10 h-10 transition-colors focus:ring-2 focus:ring-[#0066FF]/20 border border-gray-200/60 items-center justify-center flex ml-1 shadow-sm"
                  aria-expanded={isOpen}
                  aria-controls="mobile-menu"
                  aria-label={isOpen ? 'Đóng menu' : 'Mở menu'}
                >
                  <div className="flex flex-col justify-center items-center w-5 h-4 relative">
                    <span className={`absolute h-[2.5px] rounded-full w-full bg-gray-800 transition-all duration-300 ease-in-out ${isOpen ? 'rotate-45 top-1.5' : 'top-0'}`}></span>
                    <span className={`absolute h-[2.5px] rounded-full w-full bg-gray-800 transition-all duration-300 ease-in-out top-1.5 ${isOpen ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'}`}></span>
                    <span className={`absolute h-[2.5px] rounded-full w-full bg-gray-800 transition-all duration-300 ease-in-out ${isOpen ? '-rotate-45 top-1.5' : 'top-3'}`}></span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Mobile Menu Overlay */}
        <div className={`fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-40 transition-all duration-400 lg:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={closeMenu}></div>
        
        {/* Mobile Menu Drawer */}
        <div
          id="mobile-menu"
          className={`fixed top-0 right-0 h-[100dvh] w-[88%] max-w-[360px] bg-white z-50 flex flex-col shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden rounded-l-[32px] overflow-hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
          role="navigation"
          aria-label="Menu di động"
        >
          <div className="flex justify-between items-center p-6 border-b border-gray-100/50 bg-gray-50/50">
            <Link href="/" className="flex items-center gap-2.5" onClick={closeMenu}>
               <div className="w-9 h-9 bg-gradient-to-br from-[#0066FF] to-[#00D68F] rounded-xl flex items-center justify-center text-white font-extrabold text-lg shadow-md border border-white/20">M</div>
               <span className="font-extrabold text-xl text-gray-900 tracking-tight">MTIEN</span>
            </Link>
            <button onClick={closeMenu} className="p-2.5 bg-white shadow-sm border border-gray-100 rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors" aria-label="Đóng menu">
              <X size={18} strokeWidth={2.5} />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto py-5 px-4 space-y-1.5 custom-scrollbar bg-white">
            {mainLinks.map((link, idx) => {
              const LinkIcon = getIcon(link.icon);
              return (
                <div key={idx} className="bg-white rounded-2xl">
                  <Link
                    href={link.href}
                    onClick={() => !link.hasDropdown && closeMenu()}
                    className="flex items-center justify-between p-4 text-[15px] font-bold text-gray-800 hover:bg-blue-50/50 hover:text-[#0066FF] rounded-2xl transition-all border border-transparent hover:border-blue-100"
                    {...(link.openNewTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    <div className="flex items-center gap-3">
                      {LinkIcon && <LinkIcon size={18} className="text-gray-400 group-hover:text-[#0066FF]" />}
                      {link.label}
                      {link.isHot && <span className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full shadow-sm shadow-red-500/20">HOT</span>}
                    </div>
                    {link.hasDropdown && <ChevronDown size={16} className="text-gray-400" aria-hidden="true" />}
                  </Link>
                  {link.hasDropdown && link.subLinks && link.subLinks.length > 0 && (
                    <div className="px-3 pb-3 space-y-1.5 mt-[-4px]">
                      <div className="border-l-2 border-gray-100/80 ml-5 pl-4 py-2 space-y-4">
                        {link.subLinks.map((subLink, subIdx) => {
                          const SubIcon = getIcon(subLink.icon);
                          return (
                            <Link key={subIdx} href={subLink.href} onClick={closeMenu} className="flex items-start gap-3 group">
                              {SubIcon ? <div className="mt-0.5 w-6 h-6 rounded-md bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-blue-50 group-hover:text-[#0066FF] transition-colors"><SubIcon size={12} /></div> : <div className="mt-0.5 w-6 h-6 rounded-md bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-blue-50 group-hover:text-[#0066FF] transition-colors"><Sparkles size={12} /></div>}
                              <div>
                                <p className="text-[14px] font-semibold text-gray-700 group-hover:text-[#0066FF] transition-colors leading-tight">{subLink.label}</p>
                                <p className="text-[12px] text-gray-600 mt-0.5 leading-snug">{subLink.desc}</p>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="p-6 border-t border-gray-100 bg-gray-50/50 space-y-3">
            <Link href="/login" onClick={closeMenu} className="block w-full text-center py-3.5 text-[15px] font-bold text-gray-700 bg-white border border-gray-200/80 rounded-2xl shadow-sm hover:bg-gray-50 transition-colors">
              Đăng nhập tài khoản
            </Link>
            <Link href="/contact" onClick={closeMenu} className="flex items-center justify-center gap-2 w-full py-3.5 text-[15px] font-bold text-white bg-gray-900 hover:bg-[#0066FF] rounded-2xl shadow-md transition-colors">
              Bắt đầu miễn phí <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </header>
      {/* Spacer to prevent content jump when header is fixed */}
      <div className="h-[96px] md:h-[108px] w-full shrink-0"></div>
    </>
  );
}
