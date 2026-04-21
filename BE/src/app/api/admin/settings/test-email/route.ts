import { NextRequest } from 'next/server'
import nodemailer from 'nodemailer'
import { prisma } from '@/lib/prisma'
import { corsResponse, corsOptions } from '@/lib/cors'

export const dynamic = 'force-dynamic'

export async function OPTIONS() {
  return corsOptions()
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const to: string = body.to

    if (!to || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) {
      return corsResponse({ success: false, message: 'Địa chỉ email không hợp lệ' }, 400)
    }

    // Load SMTP config from DB
    const setting = await prisma.setting.findUnique({ where: { key: 'email' } })
    if (!setting?.value) {
      return corsResponse({ success: false, message: 'Chưa cấu hình SMTP' }, 400)
    }

    const cfg = setting.value as {
      smtpHost: string
      smtpPort: string
      smtpUser: string
      smtpPassword: string
      encryption: string
      fromName: string
      fromEmail: string
    }

    if (!cfg.smtpHost || !cfg.smtpPort || !cfg.smtpUser || !cfg.smtpPassword) {
      return corsResponse({ success: false, message: 'Thiếu thông tin SMTP (host, port, user, password)' }, 400)
    }

    const port = parseInt(cfg.smtpPort, 10)
    const secure = cfg.encryption === 'SSL'

    const transporter = nodemailer.createTransport({
      host: cfg.smtpHost,
      port,
      secure,
      auth: {
        user: cfg.smtpUser,
        pass: cfg.smtpPassword,
      },
      ...(cfg.encryption === 'TLS' && { requireTLS: true }),
    })

    await transporter.verify()

    await transporter.sendMail({
      from: `"${cfg.fromName}" <${cfg.fromEmail}>`,
      to,
      subject: '[MTIEN] Test Email - Cấu hình SMTP hoạt động',
      html: `
        <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px;border:1px solid #e2e8f0;border-radius:12px">
          <h2 style="color:#1e293b;margin-bottom:8px">✅ Cấu hình SMTP thành công!</h2>
          <p style="color:#475569;margin-bottom:16px">Email này xác nhận rằng cấu hình SMTP của hệ thống <strong>MTIEN Solution</strong> đang hoạt động đúng.</p>
          <table style="width:100%;border-collapse:collapse;font-size:13px;color:#334155">
            <tr><td style="padding:6px 0;color:#64748b">SMTP Host</td><td style="padding:6px 0;font-family:monospace">${cfg.smtpHost}</td></tr>
            <tr><td style="padding:6px 0;color:#64748b">Port</td><td style="padding:6px 0;font-family:monospace">${cfg.smtpPort}</td></tr>
            <tr><td style="padding:6px 0;color:#64748b">Mã hoá</td><td style="padding:6px 0;font-family:monospace">${cfg.encryption}</td></tr>
            <tr><td style="padding:6px 0;color:#64748b">Người gửi</td><td style="padding:6px 0;font-family:monospace">${cfg.fromName} &lt;${cfg.fromEmail}&gt;</td></tr>
          </table>
          <hr style="border:none;border-top:1px solid #e2e8f0;margin:20px 0" />
          <p style="font-size:12px;color:#94a3b8">Gửi lúc ${new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })} (ICT)</p>
        </div>
      `,
    })

    return corsResponse({ success: true, message: `Email test đã gửi tới ${to}` })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Gửi email thất bại'
    return corsResponse({ success: false, message }, 500)
  }
}
