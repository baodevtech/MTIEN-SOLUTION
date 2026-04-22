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

  const contactCards = [
    {
      icon: <MapPin className="w-6 h-6 md:w-7 md:h-7 opacity-90" />,
      title: 'Ghé chơi nè 🏡',
      desc: <span className="block mt-1">{address}</span>,
      bg: 'bg-[#FFE8D6]',
      textConfig: 'text-orange-950',
    },
    {
      icon: <Phone className="w-6 h-6 md:w-7 md:h-7 opacity-90" />,
      title: 'Alo liền 📞',
      desc: (
        <span className="flex flex-col gap-1 mt-1">
          <span>Hotline: <strong>{hotline}</strong></span>
          <span>Hỗ trợ: <strong>{support}</strong></span>
        </span>
      ),
      bg: 'bg-[#E3F2FD]',
      textConfig: 'text-blue-950',
    },
    {
      icon: <Mail className="w-6 h-6 md:w-7 md:h-7 opacity-90" />,
      title: 'Gửi thư tay 💌',
      desc: (
        <span className="flex flex-col gap-1 mt-1">
          <span>Tư vấn: <strong>{email}</strong></span>
          <span>HR: <strong>{emailHR}</strong></span>
        </span>
      ),
      bg: 'bg-[#E8F5E9]',
      textConfig: 'text-green-950',
    },
    {
      icon: <Clock className="w-6 h-6 md:w-7 md:h-7 opacity-90" />,
      title: 'Giờ mở cửa ⏰',
      desc: (
        <span className="flex flex-col gap-1 mt-1">
          <span>T2 - T6: {hoursWeekday}</span>
          <span>Thứ 7: {hoursSaturday}</span>
        </span>
      ),
      bg: 'bg-[#FFF3E0]',
      textConfig: 'text-amber-950',
    }
  ];

  return (
    <div className="flex flex-col gap-4 md:gap-5">
      {/* Vertical Bento List */}
      <div className="flex flex-col gap-3 md:gap-4">
        {contactCards.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -15, scale: 0.98 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, margin: '-20px' }}
            transition={{ delay: i * 0.05, type: 'spring', stiffness: 100, damping: 20 }}
            whileHover={{ scale: 1.02 }}
            className={`rounded-[1.5rem] md:rounded-[2rem] flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-5 ${item.bg} p-5 md:p-6 transition-transform duration-300`}
          >
            <div className={`flex-shrink-0 flex items-center justify-center bg-white/50 w-14 h-14 sm:w-16 sm:h-16 rounded-[1rem] sm:rounded-full shadow-sm ${item.textConfig}`}>
              {item.icon}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className={`text-lg md:text-xl font-bold ${item.textConfig} tracking-tight leading-tight mb-1 sm:mb-0`}>
                {item.title}
              </h3>
              <div className={`text-sm md:text-base ${item.textConfig} opacity-85 break-words`}>
                {item.desc}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Map Bento Box */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
        className="w-full h-64 md:h-[22rem] bg-white rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden relative shadow-sm border-2 border-white/50"
      >
        {mapImageUrl ? (
          mapUrl ? (
            <a href={mapUrl} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
              <Image src={mapImageUrl} alt="Bản đồ" fill className="object-cover hover:scale-105 transition-transform duration-700" />
            </a>
          ) : (
            <Image src={mapImageUrl} alt="Bản đồ" fill className="object-cover hover:scale-105 transition-transform duration-700" />
          )
        ) : mapUrl ? (
          <iframe src={mapUrl} className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-500" allowFullScreen loading="lazy" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center flex-col text-zinc-400 bg-zinc-100">
            <MapPin className="w-10 h-10 mb-2 opacity-50" />
            <span className="font-medium">Chưa cấu hình Map</span>
          </div>
        )}
      </motion.div>
    </div>
  );
}
