import Link from 'next/link'

export default function HomePage() {
  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50%       { transform: scale(1.03); }
        }
        .fade1 { animation: fadeUp 0.6s ease both; }
        .fade2 { animation: fadeUp 0.6s ease 0.12s both; }
        .fade3 { animation: fadeUp 0.6s ease 0.24s both; }
        .fade4 { animation: fadeUp 0.6s ease 0.36s both; }
        .skill-card { transition: transform 0.2s, box-shadow 0.2s; display: block; text-decoration: none; }
        .skill-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0,0,0,0.10); }
        .cta-main { transition: background 0.2s; animation: pulse 2.5s ease infinite; }
        .cta-main:hover { background: #152d4a !important; }
        @media (max-width: 640px) {
          .nav-inner { padding: 14px 16px !important; }
          .hero { padding: 56px 20px 48px !important; }
          .hero h1 { font-size: 2rem !important; }
          .hero p { font-size: 15px !important; }
          .stats-row { gap: 24px !important; }
          .section-pad { padding: 48px 16px !important; }
          .grid-2 { grid-template-columns: 1fr !important; }
          .grid-4 { grid-template-columns: 1fr 1fr !important; }
          .cta-row { flex-direction: column !important; align-items: stretch !important; }
          .cta-row a { text-align: center !important; }
          .banner-pad { padding: 48px 20px !important; }
        }
      `}</style>

      <main style={{ fontFamily: 'system-ui, -apple-system, sans-serif', background: '#fff', minHeight: '100vh', color: '#0F1A2B' }}>

        {/* Nav */}
        <nav style={{ borderBottom: '1px solid #F0F0F0', position: 'sticky', top: 0, background: '#fff', zIndex: 100 }}>
          <div className="nav-inner" style={{ maxWidth: 900, margin: '0 auto', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontWeight: 800, fontSize: 18, color: '#1B3A5C', letterSpacing: '-0.5px' }}>
              ZUME <span style={{ color: '#4F46E5', fontWeight: 400 }}>Datalab</span>
            </div>
            <Link href="/assessment/sql" style={{ background: '#1B3A5C', color: '#fff', padding: '8px 18px', borderRadius: 8, textDecoration: 'none', fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap' }}>
              เริ่มทดสอบ →
            </Link>
          </div>
        </nav>

        {/* Hero */}
        <section className="hero" style={{ maxWidth: 760, margin: '0 auto', padding: '80px 24px 64px', textAlign: 'center' }}>
          <div className="fade1" style={{ display: 'inline-block', background: '#EEF2FF', color: '#4F46E5', fontSize: 11, fontWeight: 700, padding: '6px 14px', borderRadius: 20, marginBottom: 24, letterSpacing: 1, textTransform: 'uppercase' }}>
            Free Benchmark Assessment
          </div>
          <h1 className="fade2" style={{ fontSize: 'clamp(2rem, 6vw, 3.2rem)', fontWeight: 800, color: '#0F1A2B', lineHeight: 1.15, marginBottom: 20, letterSpacing: '-1px' }}>
            ทักษะ Data ของคุณ<br />
            <span style={{ color: '#4F46E5' }}>อยู่ระดับไหน?</span>
          </h1>
          <p className="fade3" style={{ fontSize: 17, color: '#555', lineHeight: 1.8, marginBottom: 36, maxWidth: 500, margin: '0 auto 36px' }}>
            ทดสอบ SQL, Excel, Tableau และ Analytical Reasoning<br />
            เปรียบเทียบกับ Data Professionals ในไทย — ฟรี ไม่ต้อง login
          </p>
          <div className="fade4 cta-row" style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/assessment/sql" className="cta-main" style={{ background: '#1B3A5C', color: '#fff', padding: '14px 32px', borderRadius: 10, textDecoration: 'none', fontSize: 15, fontWeight: 700 }}>
              เริ่มทดสอบฟรี →
            </Link>
            <a href="#skills" style={{ background: '#F5F5F5', color: '#444', padding: '14px 32px', borderRadius: 10, textDecoration: 'none', fontSize: 15, fontWeight: 600 }}>
              ดู Skills ทั้งหมด
            </a>
          </div>

          {/* Stats */}
          <div className="stats-row" style={{ display: 'flex', gap: 48, justifyContent: 'center', marginTop: 56, flexWrap: 'wrap' }}>
            {[
              { num: '4',     label: 'Skills ที่ทดสอบ' },
              { num: '10',    label: 'ข้อต่อ Assessment' },
              { num: '~5 min', label: 'ใช้เวลาทำ' },
              { num: 'Free',  label: 'ไม่มีค่าใช้จ่าย' },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 26, fontWeight: 800, color: '#1B3A5C' }}>{s.num}</div>
                <div style={{ fontSize: 12, color: '#999', marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Who is this for */}
        <section className="section-pad" style={{ background: '#F8F9FA', padding: '64px 24px' }}>
          <div style={{ maxWidth: 860, margin: '0 auto' }}>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0F1A2B', marginBottom: 8, textAlign: 'center' }}>เหมาะกับใคร?</h2>
            <p style={{ fontSize: 14, color: '#999', textAlign: 'center', marginBottom: 36 }}>ไม่ว่าจะอยู่ stage ไหนของ career</p>
            <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              {[
                { icon: '💼', title: 'Data Professional', desc: 'วัด skill จริงๆ เทียบกับตลาด เพื่อ negotiate salary หรือ plan career growth' },
                { icon: '🔄', title: 'Career Changer', desc: 'เช็คว่าพร้อมแค่ไหน และต้องเติมทักษะด้านไหนก่อน switch สาย' },
                { icon: '🎓', title: 'นักศึกษา', desc: 'เตรียมตัวสัมภาษณ์งาน รู้จุดอ่อนและ focus การ practice ได้ตรงจุด' },
              ].map((c, i) => (
                <div key={i} style={{ background: '#fff', borderRadius: 14, padding: '24px 20px', border: '1px solid #EBEBEB' }}>
                  <div style={{ fontSize: 30, marginBottom: 12 }}>{c.icon}</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#0F1A2B', marginBottom: 8 }}>{c.title}</div>
                  <div style={{ fontSize: 13, color: '#777', lineHeight: 1.6 }}>{c.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="section-pad" style={{ padding: '64px 24px' }}>
          <div style={{ maxWidth: 860, margin: '0 auto' }}>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0F1A2B', marginBottom: 8, textAlign: 'center' }}>เลือก Skill ที่จะทดสอบ</h2>
            <p style={{ fontSize: 14, color: '#999', textAlign: 'center', marginBottom: 36 }}>10 ข้อ · ~5 นาที · ดู percentile ได้ทันที</p>
            <div className="grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
              {[
                { skill: 'sql',       icon: '🗄️', label: 'SQL',       desc: 'Joins · Window Functions · Aggregation', color: '#EEF2FF', accent: '#4F46E5' },
                { skill: 'excel',     icon: '📊', label: 'Excel',     desc: 'VLOOKUP · Pivot · Power Query',          color: '#F0FDF4', accent: '#16A34A' },
                { skill: 'tableau',   icon: '📈', label: 'Tableau',   desc: 'Charts · LOD · Calculated Fields',       color: '#FFF7ED', accent: '#EA580C' },
                { skill: 'numerical', icon: '🧮', label: 'Numerical', desc: 'Percentages · Ratios · CAGR',            color: '#FDF4FF', accent: '#9333EA' },
              ].map((s) => (
                <Link key={s.skill} href={`/assessment/${s.skill}`} className="skill-card" style={{ background: s.color, borderRadius: 14, padding: '22px 18px', border: `1px solid ${s.accent}22` }}>
                  <div style={{ fontSize: 28, marginBottom: 10 }}>{s.icon}</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#0F1A2B', marginBottom: 6 }}>{s.label}</div>
                  <div style={{ fontSize: 12, color: '#777', lineHeight: 1.5 }}>{s.desc}</div>
                  <div style={{ marginTop: 14, fontSize: 12, fontWeight: 600, color: s.accent }}>Start Test →</div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="section-pad" style={{ background: '#F8F9FA', padding: '64px 24px' }}>
          <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>ทำยังไง?</h2>
            <p style={{ fontSize: 14, color: '#999', marginBottom: 40 }}>3 ขั้นตอน ใช้เวลาไม่ถึง 10 นาที</p>
            <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
              {[
                { step: '1', title: 'เลือก Skill', desc: 'เลือก SQL, Excel, Tableau หรือ Numerical' },
                { step: '2', title: 'ทำข้อสอบ 10 ข้อ', desc: 'Multiple choice · มี timer · ทำใน ~5 นาที' },
                { step: '3', title: 'ดู Percentile', desc: 'กรอก email ฟรี เพื่อดูว่าอยู่ Top กี่ % ของ Data Professionals' },
              ].map((s, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#1B3A5C', color: '#fff', fontSize: 18, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>{s.step}</div>
                  <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 8 }}>{s.title}</div>
                  <div style={{ fontSize: 13, color: '#777', lineHeight: 1.6 }}>{s.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="banner-pad" style={{ background: '#1B3A5C', padding: '64px 24px', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(1.4rem, 4vw, 1.8rem)', fontWeight: 800, color: '#fff', marginBottom: 12 }}>
            พร้อมวัดระดับทักษะแล้วหรือยัง?
          </h2>
          <p style={{ fontSize: 15, color: '#94A3B8', marginBottom: 32 }}>ใช้เวลาแค่ 5 นาที · ฟรี · ไม่ต้อง login</p>
          <Link href="/assessment/sql" className="cta-main" style={{ background: '#4F46E5', color: '#fff', padding: '14px 36px', borderRadius: 10, textDecoration: 'none', fontSize: 15, fontWeight: 700, display: 'inline-block' }}>
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