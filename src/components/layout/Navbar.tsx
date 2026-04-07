'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown, ArrowRight, ShoppingBag } from 'lucide-react';

const mainLinks = [
  { href: '/', label: 'Trang chủ', hasDropdown: false, isHot: false },
  {
    href: '#',
    label: 'Dịch vụ',
    hasDropdown: true,
    isHot: false,
    subLinks: [
      { href: '/dich-vu/phan-mem', label: 'Phần mềm & App' },
      { href: '/dich-vu/cloud-server', label: 'Cloud & Server' },
      { href: '/dich-vu/marketing-design', label: 'Design UX/UI' },
      { href: '/dich-vu/marketing', label: 'Digital Marketing' },
    ],
  },
  { href: '/shop', label: 'Shop', hasDropdown: false, isHot: true },
  { href: '#', label: 'Khách hàng', hasDropdown: false, isHot: false },
  { href: '#', label: 'Bảng giá', hasDropdown: false, isHot: false },
  { href: '#', label: 'Tin tức', hasDropdown: false, isHot: false },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = useCallback(() => setIsOpen((prev) => !prev), []);
  const closeMenu = useCallback(() => setIsOpen(false), []);

  return (
    <header className="w-full z-50 flex flex-col" role="banner">
      {/* Top Banner — compact on mobile */}
      <div className="bg-[#001A5F] text-white text-[11px] md:text-sm py-2 md:py-2 px-4 md:px-4 flex justify-center items-center gap-1.5 md:gap-2 relative">
        <span className="font-bold text-orange-400 truncate">🎁 GIẢI PHÁP KÊ KHAI THUẾ</span>
        <span className="hidden md:inline">An tâm tuân thủ, phát triển bền vững</span>
        <Link href="#" className="text-[#00D68F] flex items-center gap-0.5 ml-1 shrink-0 text-[11px] md:text-sm" aria-label="Xem thêm về giải pháp kê khai thuế">
          Xem thêm <ArrowRight size={12} aria-hidden="true" />
        </Link>
        <button className="absolute right-2 md:right-4 text-white/70" aria-label="Đóng banner">
          <X size={16} aria-hidden="true" />
        </button>
      </div>

      {/* Main Navbar — compact on mobile */}
      <nav className="bg-white border-b border-gray-100" aria-label="Điều hướng chính">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-12 md:h-20 items-center">
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center" aria-label="MTIEN SOLUTION - Trang chủ">
                <span className="font-bold text-xl md:text-3xl text-[#0066FF] tracking-tighter">
                  MTIEN SOLUTION
                </span>
              </Link>

              {/* Desktop Menu */}
              <div className="hidden lg:flex items-center space-x-6" role="menubar">
                {mainLinks.map((link, idx) => (
                  <div key={idx} className="relative group" role="none">
                    <Link
                      href={link.href}
                      className="text-[15px] font-medium text-gray-700 hover:text-[#0066FF] flex items-center gap-1 transition-colors py-4"
                      role="menuitem"
                      aria-haspopup={link.hasDropdown ? 'true' : undefined}
                      aria-expanded={link.hasDropdown ? 'false' : undefined}
                    >
                      {link.label}
                      {link.hasDropdown && (
                        <ChevronDown size={16} className="text-gray-400 group-hover:rotate-180 transition-transform duration-200" aria-hidden="true" />
                      )}
                      {link.isHot && (
                        <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded ml-1">HOT</span>
                      )}
                    </Link>

                    {link.hasDropdown && link.subLinks && (
                      <div className="absolute top-full left-0 w-48 bg-white shadow-lg rounded-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50" role="menu" aria-label={`${link.label} submenu`}>
                        <div className="py-2">
                          {link.subLinks.map((subLink, subIdx) => (
                            <Link key={subIdx} href={subLink.href} className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-[#0066FF] transition-colors" role="menuitem">
                              {subLink.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Right Actions */}
            <div className="hidden lg:flex items-center space-x-6">
              <Link href="#" className="text-[15px] font-medium text-gray-700 hover:text-[#0066FF]">Đăng nhập</Link>
              <Link href="#" className="bg-[#00D68F] hover:bg-[#00c280] text-white px-6 py-2.5 rounded-full font-medium transition-colors">Đăng ký</Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <Link href="#" className="text-[13px] font-bold text-[#0066FF] px-3 py-1.5 border border-[#0066FF] rounded-full">Đăng ký</Link>
              <button
                onClick={toggleMenu}
                className="text-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-md p-1"
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
                aria-label={isOpen ? 'Đóng menu' : 'Mở menu'}
              >
                {isOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu — CSS transition, no motion */}
      {isOpen && (
        <div
          id="mobile-menu"
          className="lg:hidden bg-white border-b border-gray-100 overflow-hidden"
          role="navigation"
          aria-label="Menu di động"
        >
          <div className="px-5 pt-2 pb-4 space-y-0.5">
            {mainLinks.map((link, idx) => (
              <div key={idx}>
                <Link
                  href={link.href}
                  onClick={() => !link.hasDropdown && closeMenu()}
                  className="block px-4 py-3 rounded-lg text-[15px] font-medium text-gray-700 active:bg-gray-50"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      {link.label}
                      {link.isHot && <span className="bg-red-500 text-white text-[9px] font-bold px-1 py-0.5 rounded">HOT</span>}
                    </div>
                    {link.hasDropdown && <ChevronDown size={14} aria-hidden="true" />}
                  </div>
                </Link>
                {link.hasDropdown && link.subLinks && (
                  <div className="pl-8 pr-4 py-2 space-y-1 bg-gray-50 rounded-lg">
                    {link.subLinks.map((subLink, subIdx) => (
                      <Link key={subIdx} href={subLink.href} onClick={closeMenu} className="block py-2 text-[13px] text-gray-600 active:text-[#0066FF]">
                        {subLink.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-3 flex gap-2">
              <Link href="#" onClick={closeMenu} className="flex-1 text-center border border-gray-300 text-gray-700 px-4 py-2.5 rounded-lg font-medium text-[14px]">Đăng nhập</Link>
              <Link href="#" onClick={closeMenu} className="flex-1 text-center bg-[#00D68F] text-white px-4 py-2.5 rounded-lg font-medium text-[14px]">Đăng ký</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
