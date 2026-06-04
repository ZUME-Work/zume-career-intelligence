import Link from 'next/link'

export default function HomePage() {
  return (
    <main style={{ fontFamily: 'system-ui, sans-serif', background: '#fff', minHeight: '100vh' }}>
      <nav style={{ padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #F0F0F0' }}>
        <div style={{ fontWeight: 700, fontSize: 18, color: '#1B3A5C' }}>
          ZUME <span style={{ color: '#4F46E5', fontWeight: 400 }}>Datalab</span>
        </div>
        <Link href="/assessment/sql" style={{ background: '#1B3A5C', color: '#fff', padding: '8px 20px', borderRadius: 8, textDecoration: 'none', fontSize: 13, fontWeight: 600 }}>
          Start Free Test →
        </Link>
      </nav>
      <section style={{ maxWidth: 760, margin: '0 auto', padding: '80px 24px 60px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 800, color: '#0F1A2B', lineHeight: 1.15, marginBottom: 20 }}>
          ทักษะ Data ของคุณ<br /><span style={{ color: '#4F46E5' }}>อยู่ระดับไหน?</span>
        </h1>
        <p style={{ fontSize: 17, color: '#666', lineHeight: 1.7, marginBottom: 36 }}>
          ทดสอบ SQL, Excel, Tableau และ Analytical Reasoning<br />เปรียบเทียบกับ Data Professionals หลายพันคนในไทย
        </p>
        <Link href="/assessment/sql" style={{ background: '#1B3A5C', color: '#fff', padding: '14px 32px', borderRadius: 10, textDecoration: 'none', fontSize: 15, fontWeight: 700, display: 'inline-block' }}>
          เริ่มทดสอบฟรี →
        </Link>
      </section>
      <section style={{ background: '#F8F9FA', padding: '60px 24px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0F1A2B', marginBottom: 36, textAlign: 'center' }}>เลือก Skill ที่จะทดสอบ</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16 }}>
            {([
              { skill: 'sql', icon: '🗄️', label: 'SQL', desc: 'Joins, Window Functions, Aggregation', color: '#EEF2FF', accent: '#4F46E5' },
              { skill: 'excel', icon: '📊', label: 'Excel', desc: 'VLOOKUP, Pivot, Power Query', color: '#F0FDF4', accent: '#16A34A' },
              { skill: 'tableau', icon: '📈', label: 'Tableau', desc: 'Charts, Calculated Fields, LOD', color: '#FFF7ED', accent: '#EA580C' },
              { skill: 'numerical', icon: '🧮', label: 'Numerical', desc: 'Percentages, Ratios, Data Reasoning', color: '#FDF4FF', accent: '#9333EA' },
            ] as const).map((s) => (
              <Link key={s.skill} href={'/assessment/' + s.skill} style={{ background: s.color, borderRadius: 14, padding: '24px 20px', textDecoration: 'none', display: 'block', border: '1px solid ' + s.accent + '22' }}>
                <div style={{ fontSize: 28, marginBottom: 10 }}>{s.icon}</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#0F1A2B', marginBottom: 6 }}>{s.label}</div>
                <div style={{ fontSize: 12, color: '#777', lineHeight: 1.5 }}>{s.desc}</div>
                <div style={{ marginTop: 16, fontSize: 12, fontWeight: 600, color: s.accent }}>Start Test →</div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <footer style={{ padding: '24px', textAlign: 'center', borderTop: '1px solid #F0F0F0' }}>
        <div style={{ fontSize: 12, color: '#bbb' }}>© 2026 ZUME Datalab · All rights reserved</div>
      </footer>
    </main>
  )
}
