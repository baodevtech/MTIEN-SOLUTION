'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';

const mainLinks = [
  { href: '#', label: 'Giải pháp', hasDropdown: true },
  { href: '#', label: 'Khách hàng', hasDropdown: false },
  { href: '#', label: 'Enterprise', hasDropdown: false },
  { href: '#', label: 'Thêm', hasDropdown: true },
  { href: '#', label: 'Công cụ tính thuế', hasDropdown: false, isHot: true },
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
                  <Link
                    key={idx}
                    href={link.href}
                    className="text-[15px] font-medium text-gray-700 hover:text-[#0066FF] flex items-center gap-1 transition-colors"
                  >
                    {link.label}
                    {link.hasDropdown && <ChevronDown size={16} className="text-gray-400" />}
                    {link.isHot && (
                      <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded ml-1">HOT</span>
                    )}
                  </Link>
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
                <Link
                  key={idx}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
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
