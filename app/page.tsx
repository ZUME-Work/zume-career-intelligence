import Link from 'next/link'

export default function HomePage() {
  return (
    <>
      <style>{`
        * { box-sizing:border-box; margin:0; padding:0; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
        .f1{animation:fadeUp 0.5s ease both}
        .f2{animation:fadeUp 0.5s 0.1s ease both}
        .f3{animation:fadeUp 0.5s 0.2s ease both}
        .f4{animation:fadeUp 0.5s 0.3s ease both}
        .btn-main {
          display:inline-block; background:#4F46E5; color:#fff;
          padding:16px 40px; border-radius:14px; text-decoration:none;
          font-size:17px; font-weight:700; width:100%; text-align:center;
          box-shadow:0 4px 20px rgba(79,70,229,0.3);
          transition:transform 0.18s, box-shadow 0.18s;
        }
        .btn-main:hover { transform:translateY(-3px); box-shadow:0 10px 32px rgba(79,70,229,0.4); }
        .btn-main:active { transform:translateY(0); }
        .btn-ghost {
          display:inline-block; background:transparent; color:#4F46E5;
          padding:16px 40px; border-radius:14px; text-decoration:none;
          font-size:17px; font-weight:600; width:100%; text-align:center;
          border:1.5px solid #C7D2FE;
          transition:transform 0.18s, background 0.18s;
        }
        .btn-ghost:hover { transform:translateY(-3px); background:#EEF2FF; }
        .skill-card {
          display:block; text-decoration:none; border-radius:16px; padding:22px 18px;
          box-shadow:0 1px 6px rgba(0,0,0,0.06);
          transition:transform 0.2s, box-shadow 0.2s;
        }
        .skill-card:hover { transform:translateY(-5px); box-shadow:0 12px 28px rgba(0,0,0,0.1); }
        .arch-pill {
          border-radius:12px; padding:16px 10px; text-align:center;
          box-shadow:0 1px 4px rgba(0,0,0,0.05);
          transition:transform 0.2s, box-shadow 0.2s;
          animation:float ease-in-out infinite;
        }
        .arch-pill:hover { transform:translateY(-5px) !important; box-shadow:0 10px 20px rgba(0,0,0,0.1); animation:none; }
        .who-card {
          background:#fff; border-radius:16px; padding:26px 20px;
          border:1px solid #eee;
          box-shadow:0 1px 4px rgba(0,0,0,0.04);
          transition:transform 0.2s, box-shadow 0.2s;
        }
        .who-card:hover { transform:translateY(-4px); box-shadow:0 10px 24px rgba(0,0,0,0.08); }
        .contact-btn {
          display:flex; align-items:center; gap:8px;
          background:#F0FDF4; color:#16A34A;
          padding:8px 16px; border-radius:20px; text-decoration:none;
          font-size:13px; font-weight:600; border:1px solid #BBF7D0;
          transition:transform 0.15s, box-shadow 0.15s;
        }
        .contact-btn:hover { transform:translateY(-1px); box-shadow:0 4px 12px rgba(22,163,74,0.2); }

        /* Mobile */
        @media(max-width:768px) {
          .hero { padding:52px 20px 44px !important; }
          .hero h1 { font-size:2rem !important; }
          .hero p { font-size:16px !important; }
          .section { padding:44px 20px !important; }
          .inner { max-width:100% !important; }
          .arch-section { flex-direction:column !important; gap:32px !important; }
          .arch-grid { grid-template-columns:repeat(3,1fr) !important; }
          .skill-grid { grid-template-columns:1fr 1fr !important; }
          .who-grid { grid-template-columns:1fr !important; }
          .cta-section { padding:48px 20px !important; }
          .nav-inner { padding:14px 20px !important; }
        }
        @media(max-width:400px) {
          .arch-grid { grid-template-columns:repeat(2,1fr) !important; }
          .skill-grid { grid-template-columns:1fr !important; }
        }
      `}</style>

      <main style={{ fontFamily:'system-ui,-apple-system,sans-serif', background:'#fff', minHeight:'100vh', color:'#111' }}>

        {/* Nav */}
        <nav style={{ borderBottom:'1px solid #f0f0f0', position:'sticky', top:0, background:'rgba(255,255,255,0.96)', backdropFilter:'blur(8px)', zIndex:100 }}>
          <div className="nav-inner" style={{ maxWidth:1100, margin:'0 auto', padding:'14px 40px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <div style={{ fontWeight:800, fontSize:17, color:'#111', letterSpacing:'-0.3px' }}>
              ZUME <span style={{ color:'#4F46E5', fontWeight:500 }}>Datalab</span>
            </div>
            <a href="https://www.facebook.com/ZUMEDatalab" target="_blank" rel="noopener noreferrer" className="contact-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              ติดต่อเรา
            </a>
          </div>
        </nav>

        {/* Hero */}
        <section className="hero" style={{ maxWidth:1100, margin:'0 auto', padding:'80px 40px 72px' }}>
          <div style={{ maxWidth:540 }}>
            <h1 className="f1" style={{ fontSize:'clamp(2rem,4vw,3rem)', fontWeight:800, color:'#111', lineHeight:1.2, marginBottom:18, letterSpacing:'-0.5px' }}>
              คุณเป็นคนทำงาน<br />ด้าน Data สายไหน?
            </h1>
            <p className="f2" style={{ fontSize:18, color:'#666', lineHeight:1.8, marginBottom:36, maxWidth:420 }}>
              ค้นหาสไตล์การทำงานของคุณ แล้วทดสอบว่าแข็งแกร่งแค่ไหน
            </p>
            <div className="f3" style={{ maxWidth:320, display:'flex', flexDirection:'column', gap:12 }}>
              <Link href="/archetype" className="btn-main">ค้นหาสไตล์ของฉัน →</Link>
              <Link href="#skills" className="btn-ghost">ทดสอบทักษะ</Link>
            </div>
            <p className="f4" style={{ fontSize:13, color:'#ccc', marginTop:16 }}>ฟรี · ไม่ต้องสมัครสมาชิก</p>
          </div>
        </section>

        {/* Archetype */}
        <section className="section" style={{ background:'#F9F9F9', padding:'72px 40px' }}>
          <div className="arch-section" style={{ maxWidth:1100, margin:'0 auto', display:'flex', gap:56, alignItems:'center' }}>
            <div style={{ flex:'0 0 420px', maxWidth:420 }}>
              <div style={{ fontSize:12, fontWeight:700, color:'#4F46E5', letterSpacing:1, textTransform:'uppercase', marginBottom:12 }}>Data Archetype</div>
              <h2 style={{ fontSize:'clamp(1.5rem,3vw,1.9rem)', fontWeight:800, color:'#111', marginBottom:14, lineHeight:1.3 }}>
                คนทำงาน Data มีหลายแบบ<br />แบบไหนคือคุณ?
              </h2>
              <p style={{ fontSize:16, color:'#666', lineHeight:1.8, marginBottom:28 }}>
                ตอบ 15 คำถามสั้นๆ แล้วรู้เลยว่าคุณถนัดด้านไหน จุดแข็งคืออะไร และควรพัฒนาต่อยังไง
              </p>
            </div>
            <div style={{ flex:1 }}>
              <div className="arch-grid" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12 }}>
                {[
                  { emoji:'🦊', name:'นักสืบข้อมูล', bg:'#FEF9EE', border:'#F59E0B', delay:'0s' },
                  { emoji:'🦅', name:'นักออกแบบระบบ', bg:'#EFF6FF', border:'#3B82F6', delay:'0.5s' },
                  { emoji:'🦋', name:'นักเล่าเรื่อง', bg:'#FDF2F8', border:'#EC4899', delay:'1s' },
                  { emoji:'🦫', name:'นักสร้าง', bg:'#F0FDF4', border:'#10B981', delay:'1.5s' },
                  { emoji:'🦉', name:'นักทดสอบ', bg:'#F5F3FF', border:'#8B5CF6', delay:'2s' },
                  { emoji:'🐆', name:'นักกลยุทธ์', bg:'#FFF1F2', border:'#EF4444', delay:'2.5s' },
                ].map((a) => (
                  <div key={a.name} className="arch-pill" style={{ background:a.bg, border:`1px solid ${a.border}33`, animationDuration:'3.5s', animationDelay:a.delay }}>
                    <div style={{ fontSize:28, marginBottom:8 }}>{a.emoji}</div>
                    <div style={{ fontSize:12, color:'#444', fontWeight:600, lineHeight:1.4 }}>{a.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="section" style={{ padding:'72px 40px' }}>
          <div style={{ maxWidth:1100, margin:'0 auto' }}>
            <div style={{ marginBottom:36 }}>
              <div style={{ fontSize:12, fontWeight:700, color:'#4F46E5', letterSpacing:1, textTransform:'uppercase', marginBottom:12 }}>ทดสอบทักษะ</div>
              <h2 style={{ fontSize:'clamp(1.5rem,3vw,1.9rem)', fontWeight:800, color:'#111', marginBottom:12, lineHeight:1.3 }}>
                รู้ว่าตัวเองเก่งแค่ไหน
              </h2>
              <p style={{ fontSize:16, color:'#666', lineHeight:1.8 }}>
                ทำข้อสอบ 10 ข้อ แล้วดูว่าอยู่ Top กี่ % เมื่อเทียบกับคนอื่น
              </p>
            </div>
            <div className="skill-grid" style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:14 }}>
              {[
                { skill:'sql', icon:'🗄️', label:'SQL', desc:'การดึงและจัดการข้อมูล', bg:'#EEF2FF', accent:'#4F46E5' },
                { skill:'excel', icon:'📊', label:'Excel', desc:'สูตร ตาราง และการวิเคราะห์', bg:'#F0FDF4', accent:'#16A34A' },
                { skill:'tableau', icon:'📈', label:'Tableau', desc:'การสร้างกราฟและแดชบอร์ด', bg:'#FFF7ED', accent:'#EA580C' },
                { skill:'numerical', icon:'🧮', label:'ตัวเลข', desc:'เปอร์เซ็นต์ อัตราส่วน การคำนวณ', bg:'#FDF4FF', accent:'#9333EA' },
              ].map((s) => (
                <Link key={s.skill} href={'/assessment/'+s.skill} className="skill-card" style={{ background:s.bg, border:`1px solid ${s.accent}22` }}>
                  <div style={{ fontSize:28, marginBottom:10 }}>{s.icon}</div>
                  <div style={{ fontSize:16, fontWeight:700, color:'#111', marginBottom:6 }}>{s.label}</div>
                  <div style={{ fontSize:13, color:'#666', lineHeight:1.5 }}>{s.desc}</div>
                  <div style={{ marginTop:14, fontSize:13, fontWeight:600, color:s.accent }}>เริ่มทดสอบ →</div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* For who */}
        <section className="section" style={{ background:'#F9F9F9', padding:'72px 40px' }}>
          <div style={{ maxWidth:1100, margin:'0 auto' }}>
            <h2 style={{ fontSize:'clamp(1.5rem,3vw,1.9rem)', fontWeight:800, color:'#111', marginBottom:36, textAlign:'center' }}>เหมาะกับใครบ้าง?</h2>
            <div className="who-grid" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16 }}>
              {[
                { icon:'🎓', title:'นักเรียน นักศึกษา', desc:'เตรียมตัวหางานในสาย Data รู้ว่าต้องฝึกอะไรก่อน' },
                { icon:'🔄', title:'คนที่อยากเปลี่ยนสาย', desc:'เช็คว่าตัวเองพร้อมแค่ไหน และยังขาดทักษะด้านไหน' },
                { icon:'💼', title:'คนทำงาน Data อยู่แล้ว', desc:'วัดว่าตัวเองอยู่ระดับไหนเมื่อเทียบกับคนอื่น' },
              ].map((c,i) => (
                <div key={i} className="who-card">
                  <div style={{ fontSize:32, marginBottom:14 }}>{c.icon}</div>
                  <div style={{ fontSize:17, fontWeight:700, color:'#111', marginBottom:10 }}>{c.title}</div>
                  <div style={{ fontSize:15, color:'#666', lineHeight:1.7 }}>{c.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer style={{ padding:'24px 40px', textAlign:'center', background:'#111', borderTop:'1px solid #1a1a1a' }}>
          <div style={{ fontSize:13, color:'#444' }}>© 2026 ZUME Datalab · All rights reserved</div>
        </footer>

      </main>
    </>
  )
}
