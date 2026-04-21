import { NextRequest } from 'next/server'
import nodemailer from 'nodemailer'
import { prisma } from '@/lib/prisma'
import { corsResponse, corsOptions } from '@/lib/cors'
import { logActivity } from '@/lib/activity-log'

export const dynamic = 'force-dynamic'

export async function OPTIONS() {
  return corsOptions()
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, to, name, subject, message } = body

    if (!id || !to || !message?.trim()) {
      return corsResponse({ success: false, message: 'Thiếu thông tin bắt buộc (id, to, message)' }, 400)
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) {
      return corsResponse({ success: false, message: 'Địa chỉ email không hợp lệ' }, 400)
    }

    // Load SMTP config
    const setting = await prisma.setting.findUnique({ where: { key: 'email' } })
    if (!setting?.value) {
      return corsResponse({ success: false, message: 'Chưa cấu hình SMTP. Vui lòng vào Cài đặt > Email (SMTP)' }, 400)
    }

    const cfg = setting.value as {
      smtpHost: string; smtpPort: string; smtpUser: string; smtpPassword: string
      encryption: string; fromName: string; fromEmail: string
    }

    if (!cfg.smtpHost || !cfg.smtpUser || !cfg.smtpPassword) {
      return corsResponse({ success: false, message: 'Cấu hình SMTP chưa đầy đủ' }, 400)
    }

    const port = parseInt(cfg.smtpPort, 10) || 587
    const secure = cfg.encryption === 'SSL'

    const transporter = nodemailer.createTransport({
      host: cfg.smtpHost,
      port,
      secure,
      auth: { user: cfg.smtpUser, pass: cfg.smtpPassword },
      ...(cfg.encryption === 'TLS' && { requireTLS: true }),
    })

    await transporter.sendMail({
      from: `"${cfg.fromName}" <${cfg.fromEmail}>`,
      to,
      subject: `Re: ${subject || 'Liên hệ từ website'}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:32px;border:1px solid #e2e8f0;border-radius:12px">
          <p style="color:#475569;margin-bottom:8px">Xin chào <strong>${name || to}</strong>,</p>
          <div style="background:#f8fafc;border-left:4px solid #3b82f6;padding:16px;border-radius:0 8px 8px 0;margin:16px 0">
            <p style="color:#1e293b;white-space:pre-wrap;margin:0">${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
          </div>
          <hr style="border:none;border-top:1px solid #e2e8f0;margin:24px 0" />
          <p style="font-size:12px;color:#94a3b8">Email này được gửi từ hệ thống MTIEN Solution CRM</p>
        </div>
      `,
    })

    // Update contact status to replied
    await prisma.contact.update({ where: { id }, data: { status: 'replied' } })

    await logActivity({
      action: 'contact.reply', module: 'contact', status: 'success',
      message: `Đã trả lời liên hệ từ ${to}`, detail: { id, to, subject }
    })

    return corsResponse({ success: true, message: `Đã gửi trả lời tới ${to}` })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Gửi email thất bại'
    return corsResponse({ success: false, message }, 500)
  }
}
