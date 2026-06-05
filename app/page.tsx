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
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        @keyframes shimmer {
          0% { box-shadow: 0 4px 20px rgba(79,70,229,0.2); }
          50% { box-shadow: 0 8px 32px rgba(79,70,229,0.4); }
          100% { box-shadow: 0 4px 20px rgba(79,70,229,0.2); }
        }
        .f1 { animation: fadeUp 0.6s ease both; }
        .f2 { animation: fadeUp 0.6s 0.12s ease both; }
        .f3 { animation: fadeUp 0.6s 0.24s ease both; }
        .f4 { animation: fadeUp 0.6s 0.36s ease both; }
        .btn-primary {
          display: inline-block;
          background: #4F46E5;
          color: #fff;
          padding: 15px 34px;
          borderRadius: 12px;
          textDecoration: none;
          fontSize: 16px;
          fontWeight: 700;
          box-shadow: 0 4px 20px rgba(79,70,229,0.3), 0 1px 3px rgba(0,0,0,0.1);
          transition: transform 0.18s ease, box-shadow 0.18s ease;
          animation: shimmer 3s ease infinite;
          position: relative;
          top: 0;
        }
        .btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 32px rgba(79,70,229,0.45), 0 2px 8px rgba(0,0,0,0.12);
          animation: none;
        }
        .btn-primary:active { transform: translateY(0px); box-shadow: 0 2px 8px rgba(79,70,229,0.3); }
        .btn-secondary {
          display: inline-block;
          background: #fff;
          color: #333;
          padding: 15px 34px;
          borderRadius: 12px;
          textDecoration: none;
          fontSize: 16px;
          fontWeight: 600;
          border: 1.5px solid #E5E7EB;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
          transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s;
        }
        .btn-secondary:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.1);
          border-color: #D1D5DB;
        }
        .btn-secondary:active { transform: translateY(0px); }
        .btn-dark {
          display: inline-block;
          background: #111;
          color: #fff;
          padding: 15px 34px;
          borderRadius: 12px;
          textDecoration: none;
          fontSize: 16px;
          fontWeight: 700;
          box-shadow: 0 4px 16px rgba(0,0,0,0.2);
          transition: transform 0.18s ease, box-shadow 0.18s ease;
        }
        .btn-dark:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 28px rgba(0,0,0,0.3);
        }
        .btn-dark:active { transform: translateY(0px); }
        .btn-outline {
          display: inline-block;
          background: transparent;
          color: #fff;
          padding: 15px 34px;
          borderRadius: 12px;
          textDecoration: none;
          fontSize: 16px;
          fontWeight: 600;
          border: 1.5px solid #444;
          transition: transform 0.18s ease, border-color 0.18s, background 0.18s;
        }
        .btn-outline:hover {
          transform: translateY(-3px);
          border-color: #888;
          background: rgba(255,255,255,0.05);
        }
        .skill-card {
          display: block;
          text-decoration: none;
          border-radius: 14px;
          padding: 22px 16px;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          box-shadow: 0 1px 4px rgba(0,0,0,0.06);
        }
        .skill-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 28px rgba(0,0,0,0.1);
        }
        .arch-card {
          border-radius: 14px;
          padding: 20px 12px;
          text-align: center;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          box-shadow: 0 1px 4px rgba(0,0,0,0.05);
          animation: float ease-in-out infinite;
        }
        .arch-card:hover {
          transform: translateY(-6px) !important;
          box-shadow: 0 12px 28px rgba(0,0,0,0.1);
          animation: none;
        }
        .who-card {
          background: #fff;
          border-radius: 14px;
          padding: 28px 22px;
          border: 1px solid #eee;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          box-shadow: 0 1px 4px rgba(0,0,0,0.04);
        }
        .who-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 24px rgba(0,0,0,0.08);
          border-color: #ddd;
        }
        @media (max-width: 640px) {
          .nav { padding: 14px 16px !important; }
          .hero { padding: 56px 20px 48px !important; }
          .hero h1 { font-size: 2.1rem !important; }
          .section { padding: 48px 20px !important; }
          .grid3 { grid-template-columns: 1fr !important; }
          .grid4 { grid-template-columns: 1fr 1fr !important; }
          .btn-row { flex-direction: column !important; align-items: stretch !important; }
          .btn-row a { text-align: center !important; }
        }
      `}</style>

      <main style={{ fontFamily: 'system-ui, -apple-system, sans-serif', background: '#fff', minHeight: '100vh', color: '#111' }}>

        {/* Nav */}
        <nav style={{ borderBottom: '1px solid #eee', position: 'sticky', top: 0, background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(8px)', zIndex: 100 }}>
          <div className="nav" style={{ maxWidth: 860, margin: '0 auto', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontWeight: 800, fontSize: 17, color: '#111' }}>
              ZUME <span style={{ color: '#4F46E5', fontWeight: 500 }}>Datalab</span>
            </div>
            <Link href="/archetype" className="btn-primary" style={{ padding: '9px 20px', fontSize: 14, animation: 'none', boxShadow: '0 2px 10px rgba(79,70,229,0.25)' }}>
              ฉันเป็นสายไหน?
            </Link>
          </div>
        </nav>

        {/* Hero */}
        <section className="hero" style={{ maxWidth: 680, margin: '0 auto', padding: '88px 24px 72px', textAlign: 'center' }}>
          <h1 className="f1" style={{ fontSize: 'clamp(2.1rem, 5vw, 3.2rem)', fontWeight: 800, color: '#111', lineHeight: 1.2, marginBottom: 20, letterSpacing: '-0.5px' }}>
            คุณเป็นคนทำงาน<br />ด้าน Data สายไหน?
          </h1>
          <p className="f2" style={{ fontSize: 18, color: '#666', lineHeight: 1.8, marginBottom: 36, maxWidth: 440, margin: '0 auto 40px' }}>
            ค้นหาสไตล์การทำงานของคุณ แล้วทดสอบว่าแข็งแกร่งแค่ไหน
          </p>
          <div className="f3 btn-row" style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/archetype" className="btn-primary">ค้นหาสไตล์ของฉัน</Link>
            <Link href="#skills" className="btn-secondary">ทดสอบทักษะ</Link>
          </div>
          <p className="f4" style={{ fontSize: 14, color: '#bbb', marginTop: 20 }}>ฟรี · ไม่ต้องสมัครสมาชิก</p>
        </section>

        {/* Archetype Section */}
        <section className="section" style={{ background: '#F9F9F9', padding: '72px 24px' }}>
          <div style={{ maxWidth: 860, margin: '0 auto' }}>
            <div style={{ maxWidth: 520, marginBottom: 44 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#4F46E5', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 12 }}>Data Archetype</div>
              <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.1rem)', fontWeight: 800, color: '#111', marginBottom: 14, lineHeight: 1.3 }}>
                คนทำงาน Data มีหลายแบบ<br />แบบไหนคือคุณ?
              </h2>
              <p style={{ fontSize: 17, color: '#666', lineHeight: 1.8 }}>
                ตอบ 15 คำถามสั้นๆ แล้วรู้เลยว่าคุณถนัดด้านไหน จุดแข็งคืออะไร และควรพัฒนาต่อยังไง
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 14, marginBottom: 36 }}>
              {[
                { emoji: '🦊', name: 'นักสืบข้อมูล', bg: '#FEF9EE', border: '#F59E0B', delay: '0s' },
                { emoji: '🦅', name: 'นักออกแบบระบบ', bg: '#EFF6FF', border: '#3B82F6', delay: '0.3s' },
                { emoji: '🦋', name: 'นักเล่าเรื่อง', bg: '#FDF2F8', border: '#EC4899', delay: '0.6s' },
                { emoji: '🦫', name: 'นักสร้าง', bg: '#F0FDF4', border: '#10B981', delay: '0.9s' },
                { emoji: '🦉', name: 'นักทดสอบ', bg: '#F5F3FF', border: '#8B5CF6', delay: '1.2s' },
                { emoji: '🐆', name: 'นักกลยุทธ์', bg: '#FFF1F2', border: '#EF4444', delay: '1.5s' },
              ].map((a) => (
                <div key={a.name} className="arch-card" style={{ background: a.bg, border: `1px solid ${a.border}33`, animationDuration: '3s', animationDelay: a.delay }}>
                  <div style={{ fontSize: 34, marginBottom: 10 }}>{a.emoji}</div>
                  <div style={{ fontSize: 13, color: '#333', fontWeight: 600, lineHeight: 1.4 }}>{a.name}</div>
                </div>
              ))}
            </div>
            <Link href="/archetype" className="btn-dark">เริ่มค้นหาเลย →</Link>
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="section" style={{ padding: '72px 24px' }}>
          <div style={{ maxWidth: 860, margin: '0 auto' }}>
            <div style={{ marginBottom: 44 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#4F46E5', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 12 }}>ทดสอบทักษะ</div>
              <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.1rem)', fontWeight: 800, color: '#111', marginBottom: 14, lineHeight: 1.3 }}>
                รู้ว่าตัวเองเก่งแค่ไหน
              </h2>
              <p style={{ fontSize: 17, color: '#666', lineHeight: 1.8 }}>
                ทำข้อสอบ 10 ข้อ แล้วดูว่าอยู่ Top กี่ % เมื่อเทียบกับคนอื่นในสาย
              </p>
            </div>
            <div className="grid4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
              {[
                { skill: 'sql', icon: '🗄️', label: 'SQL', desc: 'การดึงและจัดการข้อมูล', bg: '#EEF2FF', accent: '#4F46E5' },
                { skill: 'excel', icon: '📊', label: 'Excel', desc: 'สูตร ตาราง และการวิเคราะห์', bg: '#F0FDF4', accent: '#16A34A' },
                { skill: 'tableau', icon: '📈', label: 'Tableau', desc: 'การสร้างกราฟและแดชบอร์ด', bg: '#FFF7ED', accent: '#EA580C' },
                { skill: 'numerical', icon: '🧮', label: 'ตัวเลข', desc: 'เปอร์เซ็นต์ อัตราส่วน การคำนวณ', bg: '#FDF4FF', accent: '#9333EA' },
              ].map((s) => (
                <Link key={s.skill} href={'/assessment/' + s.skill} className="skill-card" style={{ background: s.bg, border: `1px solid ${s.accent}22` }}>
                  <div style={{ fontSize: 30, marginBottom: 10 }}>{s.icon}</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: '#111', marginBottom: 6 }}>{s.label}</div>
                  <div style={{ fontSize: 13, color: '#666', lineHeight: 1.5 }}>{s.desc}</div>
                  <div style={{ marginTop: 14, fontSize: 13, fontWeight: 600, color: s.accent }}>เริ่มทดสอบ →</div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* For who */}
        <section className="section" style={{ background: '#F9F9F9', padding: '72px 24px' }}>
          <div style={{ maxWidth: 860, margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.1rem)', fontWeight: 800, color: '#111', marginBottom: 44, textAlign: 'center' }}>
              เหมาะกับใครบ้าง?
            </h2>
            <div className="grid3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              {[
                { icon: '🎓', title: 'นักเรียน นักศึกษา', desc: 'เตรียมตัวหางานในสาย Data รู้ว่าต้องฝึกอะไรก่อน' },
                { icon: '🔄', title: 'คนที่อยากเปลี่ยนสาย', desc: 'เช็คว่าตัวเองพร้อมแค่ไหน และยังขาดทักษะด้านไหน' },
                { icon: '💼', title: 'คนทำงาน Data อยู่แล้ว', desc: 'วัดว่าตัวเองอยู่ระดับไหนเมื่อเทียบกับคนอื่น' },
              ].map((c, i) => (
                <div key={i} className="who-card">
                  <div style={{ fontSize: 34, marginBottom: 14 }}>{c.icon}</div>
                  <div style={{ fontSize: 17, fontWeight: 700, color: '#111', marginBottom: 10 }}>{c.title}</div>
                  <div style={{ fontSize: 15, color: '#666', lineHeight: 1.7 }}>{c.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ background: '#111', padding: '72px 24px', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.1rem)', fontWeight: 800, color: '#fff', marginBottom: 12 }}>
            เริ่มได้เลย ใช้เวลาแค่ 10 นาที
          </h2>
          <p style={{ fontSize: 17, color: '#777', marginBottom: 36 }}>ฟรี · ไม่ต้องสมัครสมาชิก</p>
          <div className="btn-row" style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/archetype" className="btn-primary">ค้นหาสไตล์ของฉัน</Link>
            <Link href="/assessment/sql" className="btn-outline">ทดสอบทักษะ SQL</Link>
          </div>
        </section>

        <footer style={{ padding: '24px', textAlign: 'center', borderTop: '1px solid #1a1a1a', background: '#111' }}>
          <div style={{ fontSize: 13, color: '#444' }}>© 2026 ZUME Datalab · All rights reserved</div>
        </footer>

      </main>
    </>
  )
}
