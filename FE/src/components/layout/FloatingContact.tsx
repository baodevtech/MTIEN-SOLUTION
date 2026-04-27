'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Phone, Mail, MessageCircle, MessageSquare, X, Headphones } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FloatingContactProps {
  phone?: string
  email?: string
  zaloUrl?: string
  facebookUrl?: string
  brandName?: string
  brandDesc?: string
  avatar?: string
  tooltipText?: string
  enabled?: boolean
  iconPhone?: string
  iconZalo?: string
  iconMessenger?: string
  iconEmail?: string
}

export default function FloatingContact({
  phone,
  email,
  zaloUrl,
  facebookUrl,
  brandName,
  brandDesc,
  avatar,
  tooltipText,
  enabled,
  iconPhone,
  iconZalo,
  iconMessenger,
  iconEmail
}: FloatingContactProps) {
  const [mounted, setMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
    
    // Hiện tooltip sau 3s
    const timer = setTimeout(() => setShowTooltip(true), 3000)

    // Close menu when clicking outside
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      clearTimeout(timer)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if (isOpen) setShowTooltip(false)
  }, [isOpen])

  if (!mounted || enabled === false) return null

  // Process links
  const defaultPhone = '0961 803 623'
  const displayPhone = phone || defaultPhone
  const telLink = phone ? `tel:${phone.replace(/[^0-9]/g, '')}` : `tel:${defaultPhone.replace(/ /g, '')}`
  const mailLink = email ? `mailto:${email}` : 'mailto:contact@mtiensolution.vn'
  const zaloLink = zaloUrl || 'https://zalo.me/0961803623'
  const fbLink = facebookUrl || 'https://m.me/minhtiensolutions'
  const displayBrandName = brandName || 'MTIEN SOLUTION'
  const displayTooltip = tooltipText || 'Xin chào, tôi có thể giúp gì cho bạn?'
  const displayDesc = brandDesc || 'Đội ngũ tư vấn trực tuyến'

  // Format phone for display (0933.160.011)
  const formattedPhone = displayPhone.replace(/\D/g, '').length === 10 
    ? displayPhone.replace(/\D/g, '').replace(/(\d{4})(\d{3})(\d{3})/, '$1.$2.$3')
    : displayPhone

  const contacts = [
    {
      id: 'call',
      name: 'Gọi điện thoại',
      value: formattedPhone,
      icon: iconPhone ? <img src={iconPhone} alt="Phone" className="w-[18px] h-[18px] object-contain" /> : <Phone size={18} strokeWidth={2.5} className="text-[#34C759]" />,
      href: telLink,
      bg: 'bg-white shadow-[0_2px_8px_rgba(0,0,0,0.05)] border border-black/[0.03]',
      hover: 'group-hover:shadow-[0_4px_12px_rgba(52,199,89,0.15)] group-hover:border-[#34C759]/30',
      brandText: '',
      brandColor: ''
    },
    {
      id: 'zalo',
      name: 'Chat qua Zalo',
      value: 'Nhắn tin hỗ trợ nhanh',
      icon: iconZalo ? <img src={iconZalo} alt="Zalo" className="w-[18px] h-[18px] object-contain" /> : <MessageCircle size={18} strokeWidth={2.5} className="text-[#0068FF]" />,
      brandText: iconZalo ? '' : 'Z',
      brandColor: 'text-[#0068FF]',
      href: zaloLink,
      bg: 'bg-white shadow-[0_2px_8px_rgba(0,0,0,0.05)] border border-black/[0.03]',
      hover: 'group-hover:shadow-[0_4px_12px_rgba(0,104,255,0.15)] group-hover:border-[#0068FF]/30'
    },
    {
      id: 'messenger',
      name: 'Facebook Messenger',
      value: 'Tương tác qua Fanpage',
      icon: iconMessenger ? <img src={iconMessenger} alt="Messenger" className="w-[18px] h-[18px] object-contain" /> : <MessageSquare size={18} strokeWidth={2.5} className="text-[#007AFF]" />,
      href: fbLink,
      bg: 'bg-white shadow-[0_2px_8px_rgba(0,0,0,0.05)] border border-black/[0.03]',
      hover: 'group-hover:shadow-[0_4px_12px_rgba(0,122,255,0.15)] group-hover:border-[#007AFF]/30',
      brandText: '',
      brandColor: ''
    },
    {
      id: 'email',
      name: 'Gửi Email',
      value: email || 'contact@mtiensolution.vn',
      icon: iconEmail ? <img src={iconEmail} alt="Email" className="w-[18px] h-[18px] object-contain" /> : <Mail size={18} strokeWidth={2.5} className="text-[#FF3B30]" />,
      href: mailLink,
      bg: 'bg-white shadow-[0_2px_8px_rgba(0,0,0,0.05)] border border-black/[0.03]',
      hover: 'group-hover:shadow-[0_4px_12px_rgba(255,59,48,0.15)] group-hover:border-[#FF3B30]/30',
      brandText: '',
      brandColor: ''
    }
  ]

  return (
    <div ref={menuRef} className="fixed bottom-6 right-6 z-[99] flex flex-col items-end pointer-events-none font-sans">
      
      {/* Messages Tooltip Apple-like (Mô phỏng iMessage/iOS Notification) */}
      {showTooltip && (
        <div className="pointer-events-auto mb-4 origin-bottom-right transition-all duration-700 ease-out animate-fade-up animate-duration-500">
          <div 
            className="bg-white/80 backdrop-blur-[24px] p-2 pr-3 sm:p-3 sm:pr-4 rounded-[18px] sm:rounded-[24px] rounded-br-[6px] sm:rounded-br-[8px] shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-white/60 relative flex items-center gap-2 sm:gap-3 cursor-pointer hover:bg-white/90 transition-colors" 
            onClick={() => setIsOpen(true)}
          >
            <div className="relative flex-shrink-0">
              {avatar ? (
                <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-gradient-to-b from-gray-50 to-gray-200 flex items-center justify-center border border-white shadow-sm overflow-hidden">
                  <img src={avatar} alt={displayBrandName} className="w-full h-full object-contain" />
                </div>
              ) : (
                <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-gradient-to-b from-gray-50 to-gray-200 flex items-center justify-center text-gray-700 font-semibold border border-white shadow-sm text-[13px] sm:text-[16px]">
                  {displayBrandName.slice(0, 2).toUpperCase()}
                </div>
              )}
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#34C759] border-2 border-white rounded-full"></div>
            </div>
            <div className="pt-0.5">
              <div className="flex items-baseline gap-1.5">
                <p className="text-[12px] sm:text-[14px] font-semibold text-gray-900 leading-tight tracking-tight">{displayBrandName}</p>
                <p className="text-[10px] sm:text-[11px] text-gray-400 tracking-tight" style={{ fontVariantNumeric: 'tabular-nums' }}>{formattedPhone}</p>
              </div>
              <p className="text-[11px] sm:text-[12px] text-gray-500 mt-0.5 tracking-tight">{displayTooltip}</p>
            </div>
          </div>
        </div>
      )}

      {/* Cửa sổ hỗ trợ (Apple iOS/iPadOS Glass Style) */}
      <div 
        className={cn(
          "mb-4 w-[300px] sm:w-[320px] rounded-[32px] shadow-[0_24px_64px_rgba(0,0,0,0.15)] border border-white/60",
          "bg-white/70 backdrop-blur-[48px] overflow-hidden flex flex-col transform transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] origin-bottom-right",
          isOpen ? 'pointer-events-auto scale-100 opacity-100 translate-y-0' : 'pointer-events-none scale-90 opacity-0 translate-y-8 absolute bottom-16'
        )}
      >
        {/* Header: iOS Style */}
        <div className="pt-5 pb-3.5 px-5 relative">
          <div className="absolute inset-0 bg-white/40 border-b border-black/[0.05] pointer-events-none"></div>
          <div className="relative flex items-center justify-between">
            <h3 className="font-bold text-[20px] sm:text-[22px] text-black tracking-tight">Trung tâm hỗ trợ</h3>
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-black/5 rounded-full">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#34C759] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#34C759]"></span>
              </span>
              <span className="text-[10px] sm:text-[11px] font-semibold text-gray-700 uppercase tracking-wide">Trực tuyến</span>
            </div>
          </div>
        </div>

        {/* Brand Representation instead of Multi-agents */}
        <div className="relative bg-white/40">
          <div className="px-3 pb-5 pt-3">
            
            {/* Main Brand Agent */}
            <div className="p-3 pb-1 mb-[10px] mt-1 flex flex-col items-center text-center">
              <div className="relative mb-[14px] inline-block">
                {avatar ? (
                  <div className="relative w-[76px] h-[76px] sm:w-[84px] sm:h-[84px] rounded-full bg-white flex items-center justify-center overflow-hidden ring-[4px] ring-white shadow-[0_8px_20px_rgba(0,0,0,0.08)]">
                    <img src={avatar} alt={displayBrandName} className="w-full h-full object-contain bg-white" />
                  </div>
                ) : (
                  <div className="relative w-[76px] h-[76px] sm:w-[84px] sm:h-[84px] rounded-full bg-gradient-to-tr from-[#9247f0] to-[#603ded] flex items-center justify-center text-[34px] sm:text-[38px] font-bold text-white ring-[4px] ring-white shadow-[0_8px_20px_rgba(0,0,0,0.08)]">
                    {displayBrandName.slice(0, 1).toUpperCase()}
                  </div>
                )}
                {/* Status Dot properly carved out of avatar */}
                <div className="absolute -bottom-1 -right-1 w-[18px] h-[18px] sm:w-[20px] sm:h-[20px] bg-[#34C759] border-[4px] border-white rounded-full z-10 box-content shadow-sm"></div>
              </div>
              <h4 className="font-semibold text-[18px] sm:text-[20px] text-[#0f172a] tracking-tight">{displayBrandName}</h4>
              <p className="text-[13px] sm:text-[13.5px] text-[#475569] mt-1.5 font-medium bg-[#f1f5f9] px-4 py-[6px] rounded-full w-fit mx-auto">{displayDesc}</p>
            </div>

            {/* Contact Action List */}
            <div className="space-y-1 mt-2">
              {contacts.map((contact) => (
                <a 
                  key={contact.id}
                  href={contact.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group p-2.5 rounded-[20px] hover:bg-black/[0.04] transition-all duration-300 flex flex-row items-center gap-3.5 no-underline active:scale-[0.98]"
                >
                  {/* Action Icon */}
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 relative",
                    contact.bg, contact.hover
                  )}>
                    {contact.icon}
                    {contact.brandText && (
                      <span className={cn("absolute text-[10px] font-extrabold mt-[3px] tracking-tight", contact.brandColor)}>{contact.brandText}</span>
                    )}
                  </div>

                  {/* Action Info */}
                  <div className="flex-1 text-left min-w-0 pt-0.5">
                    <h4 className="font-semibold text-[16px] text-black tracking-tight mb-0.5">{contact.name}</h4>
                    <p className="text-[13px] font-medium text-gray-500 truncate tracking-tight">{contact.value}</p>
                  </div>
                  
                  {/* Action Arrow */}
                  <div className="w-8 h-8 rounded-full bg-black/5 text-gray-400 flex items-center justify-center mr-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                  </div>
                </a>
              ))}
            </div>

          </div>
          <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-white/90 to-transparent pointer-events-none rounded-b-[32px]"></div>
        </div>
      </div>

      {/* Tailwind Utility Class for iOS Spring Animation */}
      <style dangerouslySetInnerHTML={{__html: `
        .cubic-bezier-apple {
          transition-timing-function: cubic-bezier(0.32, 0.72, 0, 1);
        }
      `}} />

      {/* FAB - Apple Pill Style */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="pointer-events-auto relative h-[50px] sm:h-[54px] bg-gradient-to-r from-[#007AFF] to-[#5856D6] backdrop-blur-2xl rounded-full shadow-[0_8px_28px_rgba(0,122,255,0.45)] border border-white/20 flex items-center justify-center text-white hover:shadow-[0_10px_36px_rgba(0,122,255,0.6)] hover:scale-105 active:scale-95 transition-all duration-[350ms] ease-out px-4 sm:px-5 gap-2.5 sm:gap-3"
      >
        {isOpen ? (
          <X size={24} strokeWidth={1.5} className="text-white/90" />
        ) : (
          <>
            <Headphones size={22} strokeWidth={1.5} className="text-white" />
            <div className="w-px h-3 sm:h-4 bg-white/30 rounded-full" />
            <span className="text-[13px] sm:text-[14px] font-semibold text-white tracking-tight">Hỗ trợ ngay</span>
          </>
        )}
        
        {/* Red Dot - iOS Notification Style */}
        {!isOpen && (
          <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5 sm:h-4 sm:w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF3B30] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-full w-full bg-[#FF3B30] border-[2px] border-white shadow-sm"></span>
          </span>
        )}
      </button>

    </div>
  )
}