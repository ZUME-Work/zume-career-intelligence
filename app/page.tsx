import Link from 'next/link'

export default function HomePage() {
  return (
    <>
      <style>{`
        * { box-sizing:border-box; margin:0; padding:0; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        @keyframes pulseShadow { 0%,100%{box-shadow:0 4px 20px rgba(79,70,229,0.25)} 50%{box-shadow:0 8px 32px rgba(79,70,229,0.45)} }
        .f1{animation:fadeUp 0.5s ease both}
        .f2{animation:fadeUp 0.5s 0.1s ease both}
        .f3{animation:fadeUp 0.5s 0.2s ease both}
        .f4{animation:fadeUp 0.5s 0.3s ease both}
        .logo-link {
          fontWeight:800; fontSize:17px; color:#111; text-decoration:none;
          text-shadow: 0 2px 8px rgba(0,0,0,0.12);
          transition:text-shadow 0.2s;
        }
        .logo-link:hover { text-shadow:0 4px 16px rgba(0,0,0,0.2); }
        .btn-main {
          display:block; background:#4F46E5; color:#fff; text-align:center;
          padding:17px 24px; border-radius:14px; text-decoration:none;
          font-size:17px; font-weight:700;
          box-shadow:0 6px 24px rgba(79,70,229,0.35), 0 2px 8px rgba(79,70,229,0.2);
          animation:pulseShadow 2.5s ease infinite;
          transition:transform 0.18s;
        }
        .btn-main:hover { transform:translateY(-3px); animation:none; box-shadow:0 12px 32px rgba(79,70,229,0.45); }
        .btn-main:active { transform:translateY(0); }
        .btn-ghost {
          display:block; background:#fff; color:#4F46E5; text-align:center;
          padding:17px 24px; border-radius:14px; text-decoration:none;
          font-size:17px; font-weight:600; border:1.5px solid #C7D2FE;
          box-shadow:0 2px 8px rgba(79,70,229,0.08);
          transition:transform 0.18s, box-shadow 0.18s;
        }
        .btn-ghost:hover { transform:translateY(-3px); box-shadow:0 8px 20px rgba(79,70,229,0.15); }
        .skill-card {
          display:block; text-decoration:none; border-radius:16px; padding:20px 16px;
          box-shadow:0 2px 12px rgba(0,0,0,0.07);
          transition:transform 0.2s, box-shadow 0.2s;
        }
        .skill-card:hover { transform:translateY(-5px); box-shadow:0 12px 28px rgba(0,0,0,0.12); }
        .who-card {
          background:#fff; border-radius:16px; padding:24px 20px;
          box-shadow:0 2px 12px rgba(0,0,0,0.06);
          transition:transform 0.2s, box-shadow 0.2s;
        }
        .who-card:hover { transform:translateY(-4px); box-shadow:0 10px 24px rgba(0,0,0,0.1); }
        .contact-btn {
          display:flex; align-items:center; gap:7px;
          background:#fff; color:#16A34A;
          padding:8px 14px; border-radius:20px; text-decoration:none;
          font-size:13px; font-weight:600;
          box-shadow:0 2px 8px rgba(22,163,74,0.15);
          transition:transform 0.15s, box-shadow 0.15s;
        }
        .contact-btn:hover { transform:translateY(-1px); box-shadow:0 4px 14px rgba(22,163,74,0.25); }
        .free-badge {
          display:inline-block; background:#EF4444; color:#fff;
          font-size:13px; font-weight:700; padding:4px 12px;
          border-radius:20px; margin-top:12px;
          box-shadow:0 2px 8px rgba(239,68,68,0.3);
        }
        .wrap { width:100%; max-width:480px; margin:0 auto; padding:0 20px; }
        .section { padding:48px 0; }
        .skill-grid { display:grid; grid-template-columns:1fr 1fr; gap:12px; }
        .who-grid { display:grid; grid-template-columns:1fr; gap:14px; }
        @media(min-width:640px) {
          .wrap { max-width:600px; padding:0 32px; }
          .section { padding:64px 0; }
          .who-grid { grid-template-columns:repeat(3,1fr); }
        }
        @media(min-width:960px) {
          .wrap { max-width:880px; }
          .skill-grid { grid-template-columns:repeat(4,1fr); gap:16px; }
        }
      `}</style>

      <main style={{ fontFamily:'system-ui,-apple-system,sans-serif', background:'#F8F9FA', minHeight:'100vh', color:'#111' }}>

        <nav style={{ background:'#fff', boxShadow:'0 1px 0 rgba(0,0,0,0.06)', position:'sticky', top:0, zIndex:100 }}>
          <div style={{ maxWidth:880, margin:'0 auto', padding:'14px 20px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <Link href="/" className="logo-link">
              ZUME <span style={{ color:'#4F46E5', fontWeight:500 }}>Datalab</span>
            </Link>
            <a href="https://www.facebook.com/profile.php?id=61581811456373" target="_blank" rel="noopener noreferrer" className="contact-btn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              ZUME Datalab
            </a>
          </div>
        </nav>

        <section style={{ background:'#fff', boxShadow:'0 1px 0 rgba(0,0,0,0.04)' }}>
          <div className="wrap section" style={{ textAlign:'center' }}>
            <div className="f1" style={{ fontSize:12, fontWeight:700, color:'#4F46E5', letterSpacing:1.5, textTransform:'uppercase', marginBottom:16 }}>ZUME Datalab</div>
            <h1 className="f2" style={{ fontSize:'clamp(1.9rem,6vw,2.8rem)', fontWeight:800, color:'#111', lineHeight:1.2, marginBottom:16, letterSpacing:'-0.3px' }}>
              คุณเป็นคนทำงาน<br />ด้าน Data สายไหน?
            </h1>
            <p className="f3" style={{ fontSize:17, color:'#666', lineHeight:1.8, marginBottom:32 }}>
              ตอบ 15 คำถามสั้นๆ<br />รู้เลยว่าถนัดด้านไหน และควรพัฒนาต่อยังไง
            </p>
            <div className="f4" style={{ display:'flex', flexDirection:'column', gap:12, maxWidth:320, margin:'0 auto' }}>
              <Link href="/archetype" className="btn-main">ค้นหาสไตล์ของฉัน →</Link>
              <Link href="#skills" className="btn-ghost">ทดสอบทักษะ</Link>
            </div>
            <div className="f4">
              <span className="free-badge">ฟรี ไม่ต้องสมัครสมาชิก</span>
            </div>
          </div>
        </section>

        <section id="skills" style={{ background:'#F8F9FA' }}>
          <div className="wrap section">
            <div style={{ marginBottom:28, textAlign:'center' }}>
              <h2 style={{ fontSize:'clamp(1.4rem,5vw,1.8rem)', fontWeight:800, color:'#111', marginBottom:10 }}>ทดสอบทักษะ</h2>
              <p style={{ fontSize:15, color:'#666', lineHeight:1.7 }}>ข้อสอบ 10 ข้อ ดูได้เลยว่าอยู่ Top กี่ %</p>
            </div>
            <div className="skill-grid">
              {[
                { skill:'sql',       icon:'🗄️', label:'SQL',    desc:'ดึงและจัดการข้อมูล',     bg:'#fff', accent:'#4F46E5' },
                { skill:'excel',     icon:'📊', label:'Excel',  desc:'สูตร ตาราง วิเคราะห์',   bg:'#fff', accent:'#16A34A' },
                { skill:'tableau',   icon:'📈', label:'Tableau', desc:'กราฟและแดชบอร์ด',       bg:'#fff', accent:'#EA580C' },
                { skill:'numerical', icon:'🧮', label:'ตัวเลข', desc:'เปอร์เซ็นต์ อัตราส่วน', bg:'#fff', accent:'#9333EA' },
              ].map((s) => (
                <Link key={s.skill} href={'/assessment/'+s.skill} className="skill-card" style={{ background:s.bg, borderTop:`3px solid ${s.accent}` }}>
                  <div style={{ fontSize:26, marginBottom:10 }}>{s.icon}</div>
                  <div style={{ fontSize:15, fontWeight:700, color:'#111', marginBottom:4 }}>{s.label}</div>
                  <div style={{ fontSize:12, color:'#666', lineHeight:1.5, marginBottom:12 }}>{s.desc}</div>
                  <div style={{ fontSize:13, fontWeight:600, color:s.accent }}>เริ่มทดสอบ →</div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section style={{ background:'#fff' }}>
          <div className="wrap section">
            <h2 style={{ fontSize:'clamp(1.4rem,5vw,1.8rem)', fontWeight:800, color:'#111', marginBottom:28, textAlign:'center' }}>เหมาะกับใครบ้าง?</h2>
            <div className="who-grid">
              {[
                { icon:'🎓', title:'นักเรียน นักศึกษา', desc:'เช็คความรู้ว่ามีครบไหม และพร้อมสู้กับคนอื่นในตลาดแรงงานแค่ไหน' },
                { icon:'🔄', title:'คนที่อยากเปลี่ยนสาย', desc:'เพิ่มโอกาส เพิ่มรายได้ รู้ว่ายังขาดทักษะด้านไหน' },
                { icon:'💼', title:'คนทำงาน Data อยู่แล้ว', desc:'ความรู้ที่มีไปได้ไกลกว่าที่เป็นอยู่หรือไม่' },
              ].map((c,i) => (
                <div key={i} className="who-card">
                  <div style={{ fontSize:30, marginBottom:12 }}>{c.icon}</div>
                  <div style={{ fontSize:16, fontWeight:700, color:'#111', marginBottom:8 }}>{c.title}</div>
                  <div style={{ fontSize:14, color:'#666', lineHeight:1.7 }}>{c.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer style={{ padding:'20px', textAlign:'center', background:'#111', boxShadow:'inset 0 1px 0 rgba(255,255,255,0.05)' }}>
          <div style={{ fontSize:12, color:'#444' }}>© 2026 ZUME Datalab · All rights reserved</div>
        </footer>

      </main>
    </>
  )
}
