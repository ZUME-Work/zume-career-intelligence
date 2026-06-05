import Link from 'next/link'

export default function HomePage() {
  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-size: 17px; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .f1 { animation: fadeUp 0.5s ease both; }
        .f2 { animation: fadeUp 0.5s 0.1s ease both; }
        .f3 { animation: fadeUp 0.5s 0.2s ease both; }
        .f4 { animation: fadeUp 0.5s 0.3s ease both; }
        .card-hover { transition: transform 0.2s; }
        .card-hover:hover { transform: translateY(-3px); }
        @media (max-width: 640px) {
          .nav { padding: 14px 16px !important; }
          .hero { padding: 56px 20px 48px !important; }
          .hero h1 { font-size: 2.2rem !important; }
          .hero p { font-size: 17px !important; }
          .section { padding: 48px 20px !important; }
          .grid3 { grid-template-columns: 1fr !important; }
          .grid4 { grid-template-columns: 1fr 1fr !important; }
          .btn-row { flex-direction: column !important; }
          .btn-row a { text-align: center !important; }
        }
      `}</style>

      <main style={{ fontFamily: 'system-ui, -apple-system, sans-serif', background: '#fff', minHeight: '100vh', color: '#111' }}>

        {/* Nav */}
        <nav style={{ borderBottom: '1px solid #eee', position: 'sticky', top: 0, background: '#fff', zIndex: 100 }}>
          <div className="nav" style={{ maxWidth: 860, margin: '0 auto', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontWeight: 800, fontSize: 17, color: '#111', letterSpacing: '-0.3px' }}>
              ZUME <span style={{ color: '#4F46E5', fontWeight: 500 }}>Datalab</span>
            </div>
            <Link href="/archetype" style={{ background: '#111', color: '#fff', padding: '9px 20px', borderRadius: 10, textDecoration: 'none', fontSize: 14, fontWeight: 600 }}>
              ฉันเป็นสายไหน?
            </Link>
          </div>
        </nav>

        {/* Hero */}
        <section className="hero" style={{ maxWidth: 680, margin: '0 auto', padding: '80px 24px 64px', textAlign: 'center' }}>
          <h1 className="f1" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.2rem)', fontWeight: 800, color: '#111', lineHeight: 1.2, marginBottom: 20, letterSpacing: '-0.5px' }}>
            คุณเป็นคนทำงาน<br />ด้าน Data สายไหน?
          </h1>
          <p className="f2" style={{ fontSize: 18, color: '#555', lineHeight: 1.8, marginBottom: 36, maxWidth: 460, margin: '0 auto 36px' }}>
            ค้นหาสไตล์การทำงานของคุณ<br />แล้วทดสอบว่าแข็งแกร่งแค่ไหน
          </p>
          <div className="f3 btn-row" style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/archetype" style={{ background: '#4F46E5', color: '#fff', padding: '14px 32px', borderRadius: 12, textDecoration: 'none', fontSize: 16, fontWeight: 700, display: 'inline-block' }}>
              ค้นหาสไตล์ของฉัน
            </Link>
            <Link href="#skills" style={{ background: '#F4F4F5', color: '#333', padding: '14px 32px', borderRadius: 12, textDecoration: 'none', fontSize: 16, fontWeight: 600, display: 'inline-block' }}>
              ทดสอบทักษะ
            </Link>
          </div>
          <p className="f4" style={{ fontSize: 14, color: '#aaa', marginTop: 20 }}>ฟรี ไม่ต้องสมัครสมาชิก</p>
        </section>

        {/* Archetype Section */}
        <section className="section" style={{ background: '#F9F9F9', padding: '64px 24px' }}>
          <div style={{ maxWidth: 860, margin: '0 auto' }}>
            <div style={{ maxWidth: 520, marginBottom: 40 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#4F46E5', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 12 }}>Data Archetype</div>
              <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2rem)', fontWeight: 800, color: '#111', marginBottom: 12, lineHeight: 1.3 }}>
                คนทำงาน Data มีหลายแบบ<br />แบบไหนคือคุณ?
              </h2>
              <p style={{ fontSize: 17, color: '#666', lineHeight: 1.8 }}>
                ตอบ 15 คำถาม แล้วรู้เลยว่าคุณถนัดด้านไหน จุดแข็งคืออะไร และควรพัฒนาอะไรต่อ
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 12, marginBottom: 32 }}>
              {[
                { emoji: '🦊', name: 'นักสืบข้อมูล', bg: '#FEF9EE', border: '#F59E0B' },
                { emoji: '🦅', name: 'นักออกแบบระบบ', bg: '#EFF6FF', border: '#3B82F6' },
                { emoji: '🦋', name: 'นักเล่าเรื่อง', bg: '#FDF2F8', border: '#EC4899' },
                { emoji: '🦫', name: 'นักสร้าง', bg: '#F0FDF4', border: '#10B981' },
                { emoji: '🦉', name: 'นักทดสอบ', bg: '#F5F3FF', border: '#8B5CF6' },
                { emoji: '🐆', name: 'นักกลยุทธ์', bg: '#FFF1F2', border: '#EF4444' },
              ].map((a) => (
                <div key={a.name} className="card-hover" style={{ background: a.bg, borderRadius: 14, padding: '20px 12px', textAlign: 'center', border: `1px solid ${a.border}33` }}>
                  <div style={{ fontSize: 32, marginBottom: 8 }}>{a.emoji}</div>
                  <div style={{ fontSize: 13, color: '#333', fontWeight: 600, lineHeight: 1.4 }}>{a.name}</div>
                </div>
              ))}
            </div>
            <Link href="/archetype" style={{ display: 'inline-block', background: '#111', color: '#fff', padding: '14px 32px', borderRadius: 12, textDecoration: 'none', fontSize: 16, fontWeight: 700 }}>
              เริ่มค้นหาเลย →
            </Link>
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="section" style={{ padding: '64px 24px' }}>
          <div style={{ maxWidth: 860, margin: '0 auto' }}>
            <div style={{ marginBottom: 40 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#4F46E5', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 12 }}>ทดสอบทักษะ</div>
              <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2rem)', fontWeight: 800, color: '#111', marginBottom: 12, lineHeight: 1.3 }}>
                รู้ว่าตัวเองเก่งแค่ไหน
              </h2>
              <p style={{ fontSize: 17, color: '#666', lineHeight: 1.8 }}>
                ทำข้อสอบ 10 ข้อ แล้วเปรียบเทียบกับคนอื่นในสาย
              </p>
            </div>
            <div className="grid4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
              {[
                { skill: 'sql', icon: '🗄️', label: 'SQL', desc: 'การดึงและจัดการข้อมูล', bg: '#EEF2FF', accent: '#4F46E5' },
                { skill: 'excel', icon: '📊', label: 'Excel', desc: 'สูตร ตาราง และการวิเคราะห์', bg: '#F0FDF4', accent: '#16A34A' },
                { skill: 'tableau', icon: '📈', label: 'Tableau', desc: 'การสร้างกราฟและแดชบอร์ด', bg: '#FFF7ED', accent: '#EA580C' },
                { skill: 'numerical', icon: '🧮', label: 'ตัวเลข', desc: 'เปอร์เซ็นต์ อัตราส่วน และการคำนวณ', bg: '#FDF4FF', accent: '#9333EA' },
              ].map((s) => (
                <Link key={s.skill} href={'/assessment/' + s.skill} className="card-hover" style={{ background: s.bg, borderRadius: 14, padding: '22px 16px', border: `1px solid ${s.accent}22`, textDecoration: 'none', display: 'block' }}>
                  <div style={{ fontSize: 28, marginBottom: 10 }}>{s.icon}</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: '#111', marginBottom: 6 }}>{s.label}</div>
                  <div style={{ fontSize: 13, color: '#666', lineHeight: 1.5 }}>{s.desc}</div>
                  <div style={{ marginTop: 14, fontSize: 13, fontWeight: 600, color: s.accent }}>เริ่มทดสอบ →</div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* For who */}
        <section className="section" style={{ background: '#F9F9F9', padding: '64px 24px' }}>
          <div style={{ maxWidth: 860, margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2rem)', fontWeight: 800, color: '#111', marginBottom: 40, textAlign: 'center' }}>
              เหมาะกับใครบ้าง?
            </h2>
            <div className="grid3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              {[
                { icon: '🎓', title: 'นักเรียน นักศึกษา', desc: 'เตรียมตัวหางานในสาย Data รู้ว่าต้องฝึกอะไรก่อน' },
                { icon: '🔄', title: 'คนที่อยากเปลี่ยนสาย', desc: 'เช็คว่าตัวเองพร้อมแค่ไหน และยังขาดทักษะด้านไหน' },
                { icon: '💼', title: 'คนทำงาน Data อยู่แล้ว', desc: 'วัดว่าตัวเองอยู่ระดับไหนเมื่อเทียบกับคนอื่น' },
              ].map((c, i) => (
                <div key={i} style={{ background: '#fff', borderRadius: 14, padding: '28px 22px', border: '1px solid #eee' }}>
                  <div style={{ fontSize: 32, marginBottom: 14 }}>{c.icon}</div>
                  <div style={{ fontSize: 17, fontWeight: 700, color: '#111', marginBottom: 10 }}>{c.title}</div>
                  <div style={{ fontSize: 15, color: '#666', lineHeight: 1.7 }}>{c.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ background: '#111', padding: '64px 24px', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2rem)', fontWeight: 800, color: '#fff', marginBottom: 12 }}>
            เริ่มได้เลย ใช้เวลาแค่ 10 นาที
          </h2>
          <p style={{ fontSize: 17, color: '#888', marginBottom: 32 }}>ฟรี ไม่ต้องสมัครสมาชิก</p>
          <div className="btn-row" style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/archetype" style={{ background: '#4F46E5', color: '#fff', padding: '14px 32px', borderRadius: 12, textDecoration: 'none', fontSize: 16, fontWeight: 700, display: 'inline-block' }}>
              ค้นหาสไตล์ของฉัน
            </Link>
            <Link href="/assessment/sql" style={{ background: 'transparent', color: '#fff', padding: '14px 32px', borderRadius: 12, textDecoration: 'none', fontSize: 16, fontWeight: 600, border: '1px solid #444', display: 'inline-block' }}>
              ทดสอบทักษะ SQL
            </Link>
          </div>
        </section>

        <footer style={{ padding: '24px', textAlign: 'center', borderTop: '1px solid #eee' }}>
          <div style={{ fontSize: 13, color: '#ccc' }}>© 2026 ZUME Datalab · All rights reserved</div>
        </footer>

      </main>
    </>
  )
}
