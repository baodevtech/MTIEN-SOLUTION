export default async function MaintenancePage({ searchParams }: { searchParams: Promise<{ type?: string }> }) {
  const params = await searchParams
  const isShop = params.type === 'shop'

  const title = isShop ? 'Cửa hàng tạm đóng' : 'Đang bảo trì hệ thống'
  const description = isShop
    ? 'Trang cửa hàng đang tạm thời đóng để nâng cấp. Vui lòng quay lại sau.'
    : 'Website đang được nâng cấp và bảo trì. Chúng tôi sẽ quay lại sớm nhất có thể.'
  const statusText = isShop ? 'Cửa hàng đang tạm ngưng hoạt động' : 'Đang trong quá trình cập nhật'
  const pageTitle = isShop ? 'Cửa hàng tạm đóng - MTIEN SOLUTION' : 'Đang bảo trì - MTIEN SOLUTION'
  const gradient = isShop
    ? 'linear-gradient(135deg, #1a0a00 0%, #7c2d12 50%, #1a0a00 100%)'
    : 'linear-gradient(135deg, #001440 0%, #002f90 50%, #001440 100%)'
  const accentColor = isShop ? '#FB923C' : '#60A5FA'
  const textColor = isShop ? 'rgba(254, 215, 170, 0.9)' : 'rgba(191, 219, 254, 0.9)'
  const statusBadgeColor = isShop ? '#FBBF24' : '#FBBF24'
  const statusTextColor = isShop ? '#FDBA74' : '#93C5FD'
  const footerColor = isShop ? 'rgba(253, 186, 116, 0.6)' : 'rgba(147, 197, 253, 0.6)'

  return (
    <html lang="vi">
      <head>
        <title>{pageTitle}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex, nofollow" />
      </head>
      <body style={{ margin: 0, fontFamily: 'system-ui, -apple-system, sans-serif', background: gradient, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', padding: '40px', maxWidth: '520px' }}>
          {/* Icon */}
          <div style={{ marginBottom: '24px' }}>
            {isShop ? (
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none" style={{ margin: '0 auto' }}>
                <circle cx="40" cy="40" r="38" stroke="rgba(255,255,255,0.15)" strokeWidth="4" />
                <path d="M26 32h28l-3 20H29L26 32z" stroke={accentColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                <path d="M26 32l-4-8" stroke={accentColor} strokeWidth="3" strokeLinecap="round" />
                <circle cx="33" cy="58" r="3" fill={accentColor} />
                <circle cx="49" cy="58" r="3" fill={accentColor} />
                <path d="M34 42h12M40 42v8" stroke={accentColor} strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none" style={{ margin: '0 auto' }}>
                <circle cx="40" cy="40" r="38" stroke="rgba(255,255,255,0.15)" strokeWidth="4" />
                <path d="M40 20v20l14 8" stroke={accentColor} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="40" cy="40" r="3" fill={accentColor} />
              </svg>
            )}
          </div>

          <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#fff', marginBottom: '12px', letterSpacing: '-0.5px' }}>
            {title}
          </h1>
          <p style={{ fontSize: '16px', color: textColor, lineHeight: 1.6, marginBottom: '32px' }}>
            {description}
            <br />Xin lỗi vì sự bất tiện này.
          </p>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '12px', padding: '12px 20px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: statusBadgeColor, animation: 'pulse 2s infinite' }} />
            <span style={{ fontSize: '14px', color: statusTextColor, fontWeight: 600 }}>{statusText}</span>
          </div>

          {isShop && (
            <div style={{ marginTop: '24px' }}>
              <a href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: accentColor, fontSize: '14px', fontWeight: 600, textDecoration: 'none', background: 'rgba(255,255,255,0.08)', padding: '10px 20px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)' }}>
                ← Quay về trang chủ
              </a>
            </div>
          )}

          <div style={{ marginTop: '40px', fontSize: '13px', color: footerColor }}>
            &copy; {new Date().getFullYear()} MTIEN SOLUTION
          </div>

          <style dangerouslySetInnerHTML={{ __html: `
            @keyframes pulse {
              0%, 100% { opacity: 1; transform: scale(1); }
              50% { opacity: 0.5; transform: scale(0.8); }
            }
          `}} />
        </div>
      </body>
    </html>
  )
}
