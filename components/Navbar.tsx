'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';

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
      { href: '/dich-vu/marketing-design', label: 'Marketing & Thiết kế' },
      { href: '/dich-vu/thiet-bi-it', label: 'Thiết bị IT' },
    ]
  },
  { href: '#', label: 'Khách hàng', hasDropdown: false, isHot: false },
  { href: '#', label: 'Bảng giá', hasDropdown: false, isHot: false },
  { href: '#', label: 'Tin tức', hasDropdown: false, isHot: false },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full z-50 flex flex-col">
      {/* Top Banner */}
      <div className="bg-[#001A5F] text-white text-xs md:text-sm py-2 px-4 flex justify-center items-center gap-2 relative">
        <span className="font-bold text-orange-400">🎁 TRỌN BỘ GIẢI PHÁP KÊ KHAI THUẾ ĐÚNG</span>
        <span className="hidden md:inline">An tâm tuân thủ, phát triển bền vững</span>
        <Link href="#" className="text-[#00D68F] hover:underline flex items-center gap-1 ml-2">
          Xem thêm <ArrowRight size={14} />
        </Link>
        <button className="absolute right-4 text-white/70 hover:text-white">
          <X size={16} />
        </button>
      </div>

      {/* Main Navbar */}
      <nav className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 md:h-20 items-center">
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center">
                {/* MTIEN SOLUTION Logo Placeholder */}
                <span className="font-bold text-3xl text-[#0066FF] tracking-tighter">MTIEN SOLUTION</span>
              </Link>
              
              {/* Desktop Main Menu */}
              <div className="hidden lg:flex items-center space-x-6">
                {mainLinks.map((link, idx) => (
                  <div key={idx} className="relative group">
                    <Link
                      href={link.href}
                      className="text-[15px] font-medium text-gray-700 hover:text-[#0066FF] flex items-center gap-1 transition-colors py-4"
                    >
                      {link.label}
                      {link.hasDropdown && <ChevronDown size={16} className="text-gray-400 group-hover:rotate-180 transition-transform duration-200" />}
                      {link.isHot && (
                        <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded ml-1">HOT</span>
                      )}
                    </Link>
                    
                    {/* Dropdown Menu */}
                    {link.hasDropdown && link.subLinks && (
                      <div className="absolute top-full left-0 w-48 bg-white shadow-lg rounded-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50">
                        <div className="py-2">
                          {link.subLinks.map((subLink, subIdx) => (
                            <Link
                              key={subIdx}
                              href={subLink.href}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-[#0066FF] transition-colors"
                            >
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
              <Link href="#" className="text-[15px] font-medium text-gray-700 hover:text-[#0066FF]">
                Đăng nhập
              </Link>
              <Link href="#" className="bg-[#00D68F] hover:bg-[#00c280] text-white px-6 py-2.5 rounded-full font-medium transition-colors">
                Đăng ký
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-600 hover:text-[#0066FF] focus:outline-none"
              >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-gray-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2 shadow-xl">
              {mainLinks.map((link, idx) => (
                <div key={idx}>
                  <Link
                    href={link.href}
                    onClick={() => !link.hasDropdown && setIsOpen(false)}
                    className="block px-4 py-3 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-[#0066FF]"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {link.label}
                        {link.isHot && (
                          <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">HOT</span>
                        )}
                      </div>
                      {link.hasDropdown && <ChevronDown size={16} />}
                    </div>
                  </Link>
                  {/* Mobile Dropdown */}
                  {link.hasDropdown && link.subLinks && (
                    <div className="pl-8 pr-4 py-2 space-y-2 bg-gray-50 rounded-lg mt-1">
                      {link.subLinks.map((subLink, subIdx) => (
                        <Link
                          key={subIdx}
                          href={subLink.href}
                          onClick={() => setIsOpen(false)}
                          className="block py-2 text-sm text-gray-600 hover:text-[#0066FF]"
                        >
                          {subLink.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-4 space-y-3">
                <Link
                  href="#"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center border border-gray-300 text-gray-700 px-4 py-3 rounded-lg font-medium"
                >
                  Đăng nhập
                </Link>
                <Link
                  href="#"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center bg-[#00D68F] text-white px-4 py-3 rounded-lg font-medium"
                >
                  Đăng ký
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
