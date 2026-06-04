import Link from 'next/link'

export default function HomePage() {
  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.03); } }
        .fade1 { animation: fadeUp 0.6s ease both; }
        .fade2 { animation: fadeUp 0.6s ease 0.12s both; }
        .fade3 { animation: fadeUp 0.6s ease 0.24s both; }
        .fade4 { animation: fadeUp 0.6s ease 0.36s both; }
        .hero-card:hover { transform: translateY(-4px); box-shadow: 0 16px 40px rgba(0,0,0,0.12); }
        .hero-card { transition: transform 0.2s, box-shadow 0.2s; }
        .skill-card { transition: transform 0.2s, box-shadow 0.2s; display: block; text-decoration: none; }
        .skill-card:hover { transform: translateY(-3px); }
        @media (max-width: 640px) {
          .nav-inner { padding: 14px 16px !important; }
          .hero { padding: 48px 16px 40px !important; }
          .hero h1 { font-size: 1.9rem !important; }
          .section-pad { padding: 40px 16px !important; }
          .grid-2 { grid-template-columns: 1fr !important; }
          .grid-4 { grid-template-columns: 1fr 1fr !important; }
          .cta-row { flex-direction: column !important; }
        }
      `}</style>

      <main style={{ fontFamily: 'system-ui, -apple-system, sans-serif', background: '#fff', minHeight: '100vh', color: '#0F1A2B' }}>

        <nav style={{ borderBottom: '1px solid #F0F0F0', position: 'sticky', top: 0, background: '#fff', zIndex: 100 }}>
          <div className="nav-inner" style={{ maxWidth: 900, margin: '0 auto', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontWeight: 800, fontSize: 18, color: '#1B3A5C' }}>
              ZUME <span style={{ color: '#4F46E5', fontWeight: 400 }}>Datalab</span>
            </div>
            <Link href="/archetype" style={{ background: '#1B3A5C', color: '#fff', padding: '8px 18px', borderRadius: 8, textDecoration: 'none', fontSize: 13, fontWeight: 600 }}>
              ค้นหา Data Archetype →
            </Link>
          </div>
        </nav>

        <section className="hero" style={{ maxWidth: 760, margin: '0 auto', padding: '72px 24px 56px', textAlign: 'center' }}>
          <div className="fade1" style={{ display: 'inline-block', background: '#EEF2FF', color: '#4F46E5', fontSize: 11, fontWeight: 700, padding: '6px 14px', borderRadius: 20, marginBottom: 20, letterSpacing: 1, textTransform: 'uppercase' }}>
            สำหรับคนทำงานด้าน Data
          </div>
          <h1 className="fade2" style={{ fontSize: 'clamp(1.9rem, 5vw, 3rem)', fontWeight: 800, color: '#0F1A2B', lineHeight: 1.2, marginBottom: 16, letterSpacing: '-0.5px' }}>
            รู้จักตัวเองก่อน<br />
            <span style={{ color: '#4F46E5' }}>แล้วค่อยพัฒนา</span>
          </h1>
          <p className="fade3" style={{ fontSize: 16, color: '#666', lineHeight: 1.8, marginBottom: 32, maxWidth: 480, margin: '0 auto 32px' }}>
            ค้นหา Data Archetype ของคุณ แล้วทดสอบ skill จริงๆ<br />เพื่อรู้ว่าต้องพัฒนาอะไรต่อ
          </p>
          <div className="fade4 cta-row" style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/archetype" style={{ background: '#1B3A5C', color: '#fff', padding: '14px 28px', borderRadius: 10, textDecoration: 'none', fontSize: 15, fontWeight: 700, animation: 'pulse 2.5s ease infinite', display: 'inline-block' }}>
              🦊 ฉันเป็น Data สายไหน?
            </Link>
            <Link href="#skills" style={{ background: '#F5F5F5', color: '#444', padding: '14px 28px', borderRadius: 10, textDecoration: 'none', fontSize: 15, fontWeight: 600, display: 'inline-block' }}>
              ทดสอบ Skill เลย
            </Link>
          </div>
        </section>

        {/* Archetype Feature */}
        <section className="section-pad" style={{ background: '#0F1A2B', padding: '64px 24px' }}>
          <div style={{ maxWidth: 860, margin: '0 auto', textAlign: 'center' }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, color: '#4F46E5', textTransform: 'uppercase', marginBottom: 12 }}>New Feature</div>
            <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: 800, color: '#fff', marginBottom: 12 }}>
              ค้นหา Data Archetype ของคุณ
            </h2>
            <p style={{ fontSize: 15, color: '#94A3B8', marginBottom: 40, maxWidth: 480, margin: '0 auto 40px', lineHeight: 1.8 }}>
              สำรวจรูปแบบการทำงาน จุดแข็ง และแนวทางการเติบโตของคุณในสาย Data ผ่าน 15 คำถามจากสถานการณ์การทำงานจริง
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 12, marginBottom: 36 }}>
              {[
                { emoji: '🦊', name: 'Detective', color: '#F59E0B', flexWrap: 'wrap' },
                { emoji: '🦅', name: 'Architect', color: '#3B82F6', flexWrap: 'wrap' },
                { emoji: '🦋', name: 'Storyteller', color: '#EC4899', flexWrap: 'wrap' },
                { emoji: '🦫', name: 'Engineer', color: '#10B981', flexWrap: 'wrap' },
                { emoji: '🦉', name: 'Scientist', color: '#8B5CF6', flexWrap: 'wrap' },
                { emoji: '🐆', name: 'Strategist', color: '#EF4444', flexWrap: 'wrap' },
              ].map((a) => (
                <div key={a.name} style={{ background: '#1E293B', borderRadius: 12, padding: '16px 8px', textAlign: 'center', border: `0.5px solid ${a.color}33` }}>
                  <div style={{ fontSize: 28, marginBottom: 6 }}>{a.emoji}</div>
                  <div style={{ fontSize: 11, color: a.color, fontWeight: 600 }}>{a.name}</div>
                </div>
              ))}
            </div>
            <Link href="/archetype" style={{ display: 'inline-block', background: '#4F46E5', color: '#fff', padding: '14px 32px', borderRadius: 10, textDecoration: 'none', fontWeight: 700, fontSize: 15 }}>
              เริ่มค้นหา Archetype ฟรี →
            </Link>
          </div>
        </section>

        {/* Data Career Landscape */}
<section
  className="section-pad"
  style={{
    background: '#F8FAFC',
    padding: '64px 24px',
    borderTop: '1px solid #EEF2F7',
    borderBottom: '1px solid #EEF2F7'
  }}
>
  <div style={{ maxWidth: 860, margin: '0 auto' }}>
    <div
      style={{
        textAlign: 'center',
        marginBottom: 40
      }}
    >
      <div
        style={{
          display: 'inline-block',
          background: '#E0F2FE',
          color: '#0369A1',
          fontSize: 11,
          fontWeight: 700,
          padding: '6px 12px',
          borderRadius: 20,
          marginBottom: 12,
          textTransform: 'uppercase',
          letterSpacing: 1
        }}
      >
        Career Intelligence
      </div>

      <h2
        style={{
          fontSize: 28,
          fontWeight: 800,
          color: '#0F172A',
          marginBottom: 12
        }}
      >
        Data Career Landscape
      </h2>

      <p
        style={{
          color: '#64748B',
          fontSize: 15,
          lineHeight: 1.8
        }}
      >
        เข้าใจทักษะสำคัญ เส้นทางการเติบโต และสิ่งที่ตลาดคาดหวังจากคนสาย Data
      </p>
    </div>

    <div
      className="grid-2"
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 20
      }}
    >
      <div
        style={{
          background: '#fff',
          padding: 24,
          borderRadius: 16,
          border: '1px solid #E2E8F0'
        }}
      >
        <div
          style={{
            fontWeight: 700,
            fontSize: 16,
            marginBottom: 16
          }}
        >
           Core Skills
        </div>

        {[
          'SQL',
          'Python',
          'Tableau / Power BI',
          'Experiment Design',
          'Data Storytelling'
        ].map((skill) => (
          <div
            key={skill}
            style={{
              padding: '10px 0',
              borderBottom: '1px solid #F1F5F9'
            }}
          >
            {skill}
          </div>
        ))}
      </div>

      <div
        style={{
          background: '#fff',
          padding: 24,
          borderRadius: 16,
          border: '1px solid #E2E8F0'
        }}
      >
        <div
          style={{
            fontWeight: 700,
            fontSize: 16,
            marginBottom: 16
          }}
        >
           Typical Career Path
        </div>

        {[
          'Junior Data Analyst',
          'Data Analyst',
          'Senior Data Analyst',
          'Analytics Manager',
          'Head of Analytics'
        ].map((role) => (
          <div
            key={role}
            style={{
              padding: '10px 0',
              borderBottom: '1px solid #F1F5F9'
            }}
          >
            {role}
          </div>
        ))}
      </div>
    </div>

    <div
      style={{
        marginTop: 24,
        background: '#0F172A',
        color: '#fff',
        padding: 24,
        borderRadius: 16,
        textAlign: 'center'
      }}
    >
      <div
        style={{
          fontSize: 13,
          color: '#94A3B8',
          marginBottom: 8
        }}
      >
        Coming Soon
      </div>

      <div
        style={{
          fontSize: 22,
          fontWeight: 700,
          marginBottom: 8
        }}
      >
        Personalized Skill Gap Analysis
      </div>

      <div
        style={{
          color: '#CBD5E1',
          fontSize: 14,
          lineHeight: 1.7
        }}
      >
        หลังทำ Assessment คุณจะเห็นจุดแข็ง จุดอ่อน
        และลำดับความสำคัญของทักษะที่ควรพัฒนาต่อ
      </div>
    </div>
  </div>
</section>

        {/* Skills */}
        <section id="skills" className="section-pad" style={{ padding: '64px 24px' }}>
          <div style={{ maxWidth: 860, margin: '0 auto' }}>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0F1A2B', marginBottom: 8, textAlign: 'center' }}>ทดสอบ Skill จริงๆ</h2>
            <p style={{ fontSize: 14, color: '#999', textAlign: 'center', marginBottom: 36 }}>10 ข้อ · ~5 นาที · เห็น percentile ทันที</p>
            <div className="grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
              {[
                { skill: 'sql', icon: '🗄️', label: 'SQL', desc: 'Joins · Window Functions · Aggregation', color: '#EEF2FF', accent: '#4F46E5' },
                { skill: 'excel', icon: '📊', label: 'Excel', desc: 'VLOOKUP · Pivot · Power Query', color: '#F0FDF4', accent: '#16A34A' },
                { skill: 'tableau', icon: '📈', label: 'Tableau', desc: 'Charts · LOD · Calculated Fields', color: '#FFF7ED', accent: '#EA580C' },
                { skill: 'numerical', icon: '🧮', label: 'Numerical', desc: 'Percentages · Ratios · CAGR', color: '#FDF4FF', accent: '#9333EA' },
              ].map((s) => (
                <Link key={s.skill} href={'/assessment/' + s.skill} className="skill-card" style={{ background: s.color, borderRadius: 14, padding: '22px 18px', border: '1px solid ' + s.accent + '22' }}>
                  <div style={{ fontSize: 28, marginBottom: 10 }}>{s.icon}</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#0F1A2B', marginBottom: 6 }}>{s.label}</div>
                  <div style={{ fontSize: 12, color: '#777', lineHeight: 1.5 }}>{s.desc}</div>
                  <div style={{ marginTop: 14, fontSize: 12, fontWeight: 600, color: s.accent }}>Start Test →</div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Who is this for */}
        <section className="section-pad" style={{ background: '#F8F9FA', padding: '64px 24px' }}>
          <div style={{ maxWidth: 860, margin: '0 auto' }}>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0F1A2B', marginBottom: 36, textAlign: 'center' }}>เหมาะกับใคร?</h2>
            <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              {[
                { icon: '💼', title: 'Data Professional', desc: 'วัด skill เทียบกับตลาด เพื่อ negotiate salary หรือ plan career growth' },
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

        <section style={{ background: '#1B3A5C', padding: '64px 24px', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(1.4rem, 4vw, 1.8rem)', fontWeight: 800, color: '#fff', marginBottom: 12 }}>พร้อมเริ่มแล้วหรือยัง?</h2>
          <p style={{ fontSize: 15, color: '#94A3B8', marginBottom: 32 }}>ฟรี · ไม่ต้อง login · ใช้เวลา 10 นาที</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/archetype" style={{ background: '#4F46E5', color: '#fff', padding: '14px 28px', borderRadius: 10, textDecoration: 'none', fontSize: 15, fontWeight: 700, display: 'inline-block' }}>
              🦊 ค้นหา Archetype
            </Link>
            <Link href="/assessment/sql" style={{ background: 'transparent', color: '#fff', padding: '14px 28px', borderRadius: 10, textDecoration: 'none', fontSize: 15, fontWeight: 600, border: '1px solid #ffffff44', display: 'inline-block' }}>
              ทดสอบ Skill
            </Link>
          </div>
        </section>

        <footer style={{ padding: '24px', textAlign: 'center', borderTop: '1px solid #F0F0F0' }}>
          <div style={{ fontSize: 12, color: '#bbb' }}>© 2026 ZUME Datalab · All rights reserved</div>
        </footer>

      </main>
    </>
  )
}
