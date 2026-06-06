import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ZUME Datalab — ค้นหาสไตล์ Data ของคุณ',
  description: 'ทดสอบทักษะ SQL, Excel, Tableau และค้นหา Data Archetype ของคุณ ฟรี ไม่ต้องสมัครสมาชิก',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  )
}
