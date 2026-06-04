import Link from 'next/link'

export default function HomePage() {
  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50%       { transform: scale(1.04); }
        }
        .fade1 { animation: fadeUp 0.6s ease both; }
        .fade2 { animation: fadeUp 0.6s ease 0.15s both; }
        .fade3 { animation: fadeUp 0.6s ease 0.3s both; }
        .fade4 { animation: fadeUp 0.6s ease 0.45s both; }
        .skill-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0,0,0,0.10); }
        .skill-card { transition: transform 0.2s, box-shadow 0.2s; }
        .cta-btn:hover { background: #152d4a !important; }
        .cta-btn { transition: background 0.2s; }
      `}</style>

      <main style={{ fontFamily: 'system-ui, sans-serif', background: '#fff', minHeight: '100vh' }}>

        {/* Nav */}
        <nav style={{ padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #F0F0F0' }}>
          <div style={{ fontWeight: 700, fontSize: 18, color: '#1B3A5C', letterSpacing: '-0.5px' }}>
            ZUME <span style={{ color: '#4F46E5', fontWeight: 400 }}>Datalab</span>
          </div>
          <Link href="/assessment/sql" style={{ background: '#1B3A5C', color: '#fff', padding: '8px 20px', borderRadius: 8, textDecoration: 'none', fontSize: 13, fontWeight: 600 }}>
            Start Free Test →
          </Link>
        </nav>

        {/* Hero */}
        <section style={{ maxWidth: 760, margin: '0 auto', padding: '80px 24px 60px', textAlign: 'center' }}>
          <div className="fade1" style={{ display: 'inline-block', background: '#EEF2FF', color: '#4F46E5', fontSize: 12, fontWeight: 600, padding: '6px 14px', borderRadius: 20, marginBottom: 24, letterSpacing: 0.5 }}>
            FREE BENCHMARK ASSESSMENT
          </div>
          <h1 className="fade2" style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 800, color: '#0F1A2B', lineHeight: 1.15, marginBottom: 20, letterSpacing: '-1px' }}>
            ทักษะ Data ของคุณ<br />
            <span style={{ color: '#4F46E5' }}>อยู่ระดับไหน?</span>
          </h1>
          <p className="fade3" style={{ fontSize: 17, color: '#666', lineHeight: 1.7, marginBottom: 36, maxWidth: 520, margin: '0 auto 36px' }}>
            ทดสอบ SQL, Excel, Tableau และ Analytical Reasoning<br />
            เปรียบเทียบกับ Data Professionals หลายพันคนในไทย
          </p>
          <div className="fade4" style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/assessment/sql" className="cta-btn" style={{ background: '#1B3A5C', color: '#fff', padding: '14px 32px', borderRadius: 10, textDecoration: 'none', fontSize: 15, fontWeight: 700, display: 'inline-block' }}>
              เริ่มทดสอบฟรี →
            </Link>
            <a href="#skills" style={{ background: '#F5F5F5', color: '#444', padding: '14px 32px', borderRadius: 10, textDecoration: 'none', fontSize: 15, fontWeight: 600, display: 'inline-block' }}>
              ดู Skill ที่ทดสอบได้
            </a>
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', gap: 40, justifyContent: 'center', marginTop: 56, flexWrap: 'wrap' }}>
            {[
              { num: '4', label: 'Skills ที่ทดสอบ' },
              { num: '10', label: 'ข้อต่อ Assessment' },
              { num: 'Free', label: 'ไม่มีค่าใช้จ่าย' },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 28, fontWeight: 800, color: '#1B3A5C' }}>{s.num}</div>
                <div style={{ fontSize: 13, color: '#999', marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Who is this for */}
        <section style={{ background: '#F8F9FA', padding: '60px 24px' }}>
          <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0F1A2B', marginBottom: 36 }}>เหมาะกับใคร?</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20 }}>
              {[
                { icon: '💼', title: 'Data Professional', desc: 'วัด skill จริงๆ เทียบกับตลาด เพื่อขอขึ้นเงินเดือนหรือ negotiate offer' },
                { icon: '🔄', title: 'Career Changer', desc: 'เช็คว่าพร้อมแล้วแค่ไหน และต้องเติมทักษะด้านไหนก่อน switch สาย' },
                { icon: '🎓', title: 'นักเรียน / นักศึกษา', desc: 'เตรียมตัวสัมภาษณ์งาน รู้จุดอ่อนและ focus การ practice ได้ตรงจุด' },
              ].map((c, i) => (
                <div key={i} style={{ background: '#fff', borderRadius: 14, padding: '28px 24px', textAlign: 'left', border: '1px solid #EBEBEB' }}>
                  <div style={{ fontSize: 32, marginBottom: 12 }}>{c.icon}</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#0F1A2B', marginBottom: 8 }}>{c.title}</div>
                  <div style={{ fontSize: 13, color: '#777', lineHeight: 1.6 }}>{c.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills */}
        <section id="skills" style={{ padding: '60px 24px' }}>
          <div style={{ maxWidth: 760, margin: '0 auto' }}>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0F1A2B', marginBottom: 8, textAlign: 'center' }}>เลือก Skill ที่จะทดสอบ</h2>
            <p style={{ fontSize: 14, color: '#999', textAlign: 'center', marginBottom: 36 }}>10 ข้อ · ~5 นาที · ฟรี</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16 }}>
              {[
                { skill: 'sql',       icon: '🗄️', label: 'SQL',       desc: 'Joins, Window Functions, Aggregation', color: '#EEF2FF', accent: '#4F46E5' },
                { skill: 'excel',     icon: '📊', label: 'Excel',     desc: 'VLOOKUP, Pivot, Power Query',          color: '#F0FDF4', accent: '#16A34A' },
                { skill: 'tableau',   icon: '📈', label: 'Tableau',   desc: 'Charts, Calculated Fields, LOD',       color: '#FFF7ED', accent: '#EA580C' },
                { skill: 'numerical', icon: '🧮', label: 'Numerical', desc: 'Percentages, Ratios, Data Reasoning',  color: '#FDF4FF', accent: '#9333EA' },
              ].map((s) => (
                <Link key={s.skill} href={`/assessment/${s.skill}`} className="skill-card" style={{ background: s.color, borderRadius: 14, padding: '24px 20px', textDecoration: 'none', display: 'block', border: `1px solid ${s.accent}22` }}>
                  <div style={{ fontSize: 28, marginBottom: 10 }}>{s.icon}</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#0F1A2B', marginBottom: 6 }}>{s.label}</div>
                  <div style={{ fontSize: 12, color: '#777', lineHeight: 1.5 }}>{s.desc}</div>
                  <div style={{ marginTop: 16, fontSize: 12, fontWeight: 600, color: s.accent }}>Start Test →</div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section style={{ background: '#1B3A5C', padding: '60px 24px', textAlign: 'center' }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: '#fff', marginBottom: 12 }}>พร้อมวัดระดับทักษะแล้วหรือยัง?</h2>
          <p style={{ fontSize: 15, color: '#94A3B8', marginBottom: 32 }}>ใช้เวลาแค่ 5 นาที · ฟรี · ไม่ต้อง login</p>
          <Link href="/assessment/sql" className="cta-btn" style={{ background: '#4F46E5', color: '#fff', padding: '14px 36px', borderRadius: 10, textDecoration: 'none', fontSize: 15, fontWeight: 700, display: 'inline-block', animation: 'pulse 2s ease infinite' }}>
            เริ่มทดสอบเลย →
          </Link>
        </section>

        {/* Footer */}
        <footer style={{ padding: '24px', textAlign: 'center', borderTop: '1px solid #F0F0F0' }}>
          <div style={{ fontSize: 12, color: '#bbb' }}>© 2026 ZUME Datalab · All rights reserved</div>
        </footer>

      </main>
    </>
  )
}