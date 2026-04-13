import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount)
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('vi-VN').format(num)
}

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(date))
}

export function formatDateTime(date: string): string {
  return new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date))
}

export function formatRelativeTime(date: string): string {
  const now = new Date()
  const d = new Date(date)
  const diff = now.getTime() - d.getTime()
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (minutes < 1) return 'Vừa xong'
  if (minutes < 60) return `${minutes} phút trước`
  if (hours < 24) return `${hours} giờ trước`
  if (days < 7) return `${days} ngày trước`
  return formatDate(date)
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str
  return str.slice(0, length) + '...'
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export function getStatusColor(status: string): { bg: string; text: string; dot: string } {
  const statusMap: Record<string, { bg: string; text: string; dot: string }> = {
    published: { bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500' },
    active: { bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500' },
    completed: { bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500' },
    delivered: { bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500' },
    paid: { bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500' },
    draft: { bg: 'bg-slate-50', text: 'text-slate-600', dot: 'bg-slate-400' },
    inactive: { bg: 'bg-slate-50', text: 'text-slate-600', dot: 'bg-slate-400' },
    pending: { bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500' },
    processing: { bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500' },
    confirmed: { bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500' },
    'in-progress': { bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500' },
    shipped: { bg: 'bg-indigo-50', text: 'text-indigo-700', dot: 'bg-indigo-500' },
    scheduled: { bg: 'bg-purple-50', text: 'text-purple-700', dot: 'bg-purple-500' },
    new: { bg: 'bg-sky-50', text: 'text-sky-700', dot: 'bg-sky-500' },
    read: { bg: 'bg-slate-50', text: 'text-slate-600', dot: 'bg-slate-400' },
    replied: { bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500' },
    archived: { bg: 'bg-gray-50', text: 'text-gray-500', dot: 'bg-gray-400' },
    cancelled: { bg: 'bg-red-50', text: 'text-red-700', dot: 'bg-red-500' },
    refunded: { bg: 'bg-orange-50', text: 'text-orange-700', dot: 'bg-orange-500' },
    failed: { bg: 'bg-red-50', text: 'text-red-700', dot: 'bg-red-500' },
    outOfStock: { bg: 'bg-red-50', text: 'text-red-700', dot: 'bg-red-500' },
    suspended: { bg: 'bg-red-50', text: 'text-red-700', dot: 'bg-red-500' },
  }
  return statusMap[status] || { bg: 'bg-gray-50', text: 'text-gray-600', dot: 'bg-gray-400' }
}

export function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    published: 'Đã xuất bản',
    active: 'Hoạt động',
    completed: 'Hoàn thành',
    delivered: 'Đã giao',
    paid: 'Đã thanh toán',
    draft: 'Nháp',
    inactive: 'Không hoạt động',
    pending: 'Chờ xử lý',
    processing: 'Đang xử lý',
    confirmed: 'Đã xác nhận',
    'in-progress': 'Đang thực hiện',
    shipped: 'Đang giao',
    scheduled: 'Đã lên lịch',
    new: 'Mới',
    read: 'Đã đọc',
    replied: 'Đã trả lời',
    archived: 'Lưu trữ',
    cancelled: 'Đã hủy',
    refunded: 'Đã hoàn tiền',
    failed: 'Thất bại',
    outOfStock: 'Hết hàng',
    suspended: 'Tạm khóa',
    planned: 'Kế hoạch',
  }
  return labels[status] || status
}
