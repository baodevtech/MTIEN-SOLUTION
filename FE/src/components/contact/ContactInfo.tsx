'use client';

import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import Image from 'next/image';
import { useThemeValue } from '@/lib/theme-context';

const ADMIN_URL = process.env.NEXT_PUBLIC_ADMIN_API_URL || '';

function getImageUrl(src: string | null) {
  if (!src) return null;
  return src.startsWith('http') ? src : `${ADMIN_URL}${src}`;
}

export default function ContactInfo() {
  const address = useThemeValue('contact', 'info', 'address', 'Tầng 12, Tòa nhà Tech, 123 Đường Công Nghệ, Quận 1 TP.HCM') as string;
  const hotline = useThemeValue('contact', 'info', 'hotline', '0123 456 789') as string;
  const support = useThemeValue('contact', 'info', 'support', '0987 654 321') as string;
  const email = useThemeValue('contact', 'info', 'email', 'contact@mtiensolution.vn') as string;
  const emailHR = useThemeValue('contact', 'info', 'emailHR', 'hr@mtiensolution.vn') as string;
  const hoursWeekday = useThemeValue('contact', 'info', 'hoursWeekday', '08:00 - 17:30') as string;
  const hoursSaturday = useThemeValue('contact', 'info', 'hoursSaturday', '08:00 - 12:00') as string;
  const mapUrl = useThemeValue('contact', 'info', 'mapUrl', '') as string;
  const mapImage = useThemeValue('contact', 'info', 'mapImage', '') as string;

  const mapImageUrl = getImageUrl(mapImage || null);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h2 className="text-3xl font-bold text-slate-900 mb-8">Thông Tin Liên Hệ</h2>

      <div className="space-y-8 mb-12">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0">
            <MapPin className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">Trụ sở chính</h3>
            <p className="text-slate-600 leading-relaxed">{address}</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center shrink-0">
            <Phone className="w-6 h-6 text-orange-500" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">Điện thoại</h3>
            <p className="text-slate-600 leading-relaxed">
              Hotline: {hotline}
              <br />
              Hỗ trợ kỹ thuật: {support}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center shrink-0">
            <Mail className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">Email</h3>
            <p className="text-slate-600 leading-relaxed">
              Tư vấn: {email}
              <br />
              Tuyển dụng: {emailHR}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center shrink-0">
            <Clock className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">Giờ làm việc</h3>
            <p className="text-slate-600 leading-relaxed">
              Thứ 2 - Thứ 6: {hoursWeekday}
              <br />
              Thứ 7: {hoursSaturday}
            </p>
          </div>
        </div>
      </div>

      {/* Bản đồ */}
      <div className="w-full h-64 bg-slate-200 rounded-3xl overflow-hidden relative shadow-inner">
        {mapImageUrl ? (
          mapUrl ? (
            <a href={mapUrl} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
              <Image src={mapImageUrl} alt="Bản đồ" fill className="object-cover" />
            </a>
          ) : (
            <Image src={mapImageUrl} alt="Bản đồ" fill className="object-cover" />
          )
        ) : mapUrl ? (
          <iframe src={mapUrl} className="w-full h-full border-0" allowFullScreen loading="lazy" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center flex-col text-slate-400">
            <MapPin className="w-10 h-10 mb-2 opacity-50" />
            <span className="font-medium">Bản đồ Google Maps</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
