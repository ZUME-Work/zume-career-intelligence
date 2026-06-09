import Link from 'next/link'

const ANIMALS = {
  fox:       'https://d8j0ntlcm91z4.cloudfront.net/user_3Et6nR8Yefq3LxvEYXJM7qntcjL/hf_20260609_062721_92e91c71-dd7e-43f7-9a31-04e9cc758262.png',
  eagle:     'https://d8j0ntlcm91z4.cloudfront.net/user_3Et6nR8Yefq3LxvEYXJM7qntcjL/hf_20260609_062916_9567f017-65c7-48fe-b2cc-eecc8ac12df4.png',
  butterfly: 'https://d8j0ntlcm91z4.cloudfront.net/user_3Et6nR8Yefq3LxvEYXJM7qntcjL/hf_20260609_063125_03a654e2-0f0b-4cac-9375-e0ebb94485f9.png',
  beaver:    'https://d8j0ntlcm91z4.cloudfront.net/user_3Et6nR8Yefq3LxvEYXJM7qntcjL/hf_20260609_063512_e28707fd-c89e-4a41-b508-6b3c6dac8a53.png',
  owl:       'https://d8j0ntlcm91z4.cloudfront.net/user_3Et6nR8Yefq3LxvEYXJM7qntcjL/hf_20260609_063739_ecf2a873-eec1-42cc-bfbc-50256ffa3527.png',
  leopard:   'https://d8j0ntlcm91z4.cloudfront.net/user_3Et6nR8Yefq3LxvEYXJM7qntcjL/hf_20260609_063822_56fec52c-976a-45c8-be73-88acc72e0713.png',
}

const ARCHETYPES = [
  { key:'fox',       badge:'The Detective',  name:'นักสืบข้อมูล',       desc:'ขุดหาความจริงที่ซ่อนอยู่ในข้อมูล ไม่หยุดจนกว่าจะเจอคำตอบที่ใช่',          pos:'center 8%' },
  { key:'eagle',     badge:'The Architect',  name:'นักออกแบบระบบ',      desc:'มองเห็นภาพรวมที่คนอื่นมองข้าม ชอบวางโครงสร้างให้แข็งแกร่ง',              pos:'center 8%' },
  { key:'butterfly', badge:'The Storyteller',name:'นักเล่าเรื่อง',       desc:'แปลงตัวเลขซับซ้อนให้เป็นเรื่องราวที่ทุกคนเข้าใจและจำได้',                 pos:'center 8%' },
  { key:'beaver',    badge:'The Engineer',   name:'นักสร้างระบบ',       desc:'สร้างระบบที่ทำงานได้เองอัตโนมัติ เชื่อถือได้ตลอด 24 ชั่วโมง',             pos:'center 8%' },
  { key:'owl',       badge:'The Scientist',  name:'นักทดสอบสมมติฐาน',  desc:'ไม่เชื่ออะไรง่ายๆ ต้องพิสูจน์และตรวจสอบก่อนสรุปเสมอ',                    pos:'65% 8%'    },
  { key:'leopard',   badge:'The Strategist', name:'นักกลยุทธ์',         desc:'เชื่อมข้อมูลกับธุรกิจได้เก่ง มองทุกอย่างผ่านเลนส์ผลลัพธ์จริง',           pos:'center 8%' },
]

const PARADE = [...ARCHETYPES, ...ARCHETYPES]

const SKILLS = [
  { skill:'sql',       icon:'🗄️', name:'SQL',     desc:'ดึงและจัดการข้อมูล Joins, Aggregations, Window Functions' },
  { skill:'excel',     icon:'📊', name:'Excel',   desc:'สูตร ตาราง Pivot วิเคราะห์ข้อมูลในงานจริง' },
  { skill:'tableau',   icon:'📈', name:'Tableau', desc:'กราฟ Dashboard และ LOD Calculations' },
  { skill:'numerical', icon:'🧮', name:'Numerical',desc:'เปอร์เซ็นต์ อัตราส่วน การคำนวณทางธุรกิจ' },
]

export default function HomePage() {
  return (
    <>
      <style>{`
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        :root{
          --ink:#111318;--ink2:#3D4451;--ink3:#6B7280;--ink4:#9CA3AF;
          --blue:#2563EB;--blue-lt:#DBEAFE;
          --warm:#FAFAF8;--white:#FFFFFF;--border:#E5E7EB;--border2:#F3F4F6;
          --red:#EF4444;
        }
        html{font-family:'Inter',-apple-system,sans-serif;background:var(--white);color:var(--ink);-webkit-font-smoothing:antialiased}
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

        .nav{position:sticky;top:0;z-index:200;height:58px;background:rgba(255,255,255,0.9);backdrop-filter:blur(16px);border-bottom:1px solid var(--border);display:flex;align-items:center}
        .nav-inner{width:100%;max-width:1120px;margin:0 auto;padding:0 28px;display:flex;justify-content:space-between;align-items:center}
        .logo{font-size:16px;font-weight:800;color:var(--ink);text-decoration:none;letter-spacing:-0.4px}
        .logo-dot{color:var(--blue)}
        .fb-btn{display:inline-flex;align-items:center;gap:7px;font-size:13px;font-weight:500;color:var(--ink2);text-decoration:none;padding:7px 14px;border:1px solid var(--border);border-radius:8px;background:var(--white);transition:border-color .15s,box-shadow .15s}
        .fb-btn:hover{border-color:#94A3B8;box-shadow:0 2px 8px rgba(0,0,0,.06)}
        .fb-btn svg{width:14px;height:14px;fill:#1877F2;flex-shrink:0}

        .hero{background:var(--warm);border-bottom:1px solid var(--border);padding:80px 28px 0;overflow:hidden}
        .hero-inner{max-width:1120px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:flex-end}
        .hero-text{padding-bottom:72px}
        .hero-eyebrow{display:inline-flex;align-items:center;gap:8px;font-size:12px;font-weight:600;color:var(--blue);letter-spacing:.08em;text-transform:uppercase;margin-bottom:20px}
        .hero-eyebrow span{display:inline-block;width:24px;height:1.5px;background:var(--blue);border-radius:2px}
        .hero-h1{font-size:clamp(36px,4.5vw,58px);font-weight:800;line-height:1.06;letter-spacing:-2px;color:var(--ink);margin-bottom:20px}
        .hero-h1 em{font-style:normal;color:var(--blue)}
        .hero-body{font-size:17px;line-height:1.75;color:var(--ink2);max-width:440px;margin-bottom:36px}
        .hero-actions{display:flex;gap:10px;flex-wrap:wrap;align-items:center}
        .btn-primary{display:inline-flex;align-items:center;gap:6px;background:var(--ink);color:#fff;font-size:14px;font-weight:600;padding:13px 24px;border-radius:10px;text-decoration:none;box-shadow:0 1px 3px rgba(0,0,0,.18),0 4px 12px rgba(0,0,0,.1);transition:transform .15s,box-shadow .15s}
        .btn-primary:hover{transform:translateY(-2px);box-shadow:0 2px 6px rgba(0,0,0,.2),0 8px 24px rgba(0,0,0,.12)}
        .btn-outline{display:inline-flex;align-items:center;gap:6px;background:transparent;color:var(--ink2);font-size:14px;font-weight:500;padding:13px 20px;border-radius:10px;text-decoration:none;border:1px solid var(--border);transition:border-color .15s,color .15s,transform .15s}
        .btn-outline:hover{border-color:#94A3B8;color:var(--ink);transform:translateY(-2px)}
        .hero-note{margin-top:14px;font-size:12px;color:var(--ink4);display:flex;align-items:center;gap:10px}
        .free-pill{display:inline-flex;align-items:center;background:var(--red);color:#fff;font-size:11px;font-weight:700;padding:2px 8px;border-radius:20px}
        .hero-visual{display:flex;align-items:flex-end;justify-content:center}
        .hero-animal-wrap{width:min(380px,90%);aspect-ratio:1/1;overflow:hidden;border-radius:50%}
        .hero-animal-img{width:100%;height:115%;object-fit:cover;object-position:center 5%;mix-blend-mode:multiply;animation:heroFloat 4s ease-in-out infinite}
        @keyframes heroFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}

        .parade-wrap{border-top:1px solid var(--border);border-bottom:1px solid var(--border);background:var(--white);overflow:hidden;height:100px;display:flex;align-items:center}
        .parade-label{flex-shrink:0;padding:0 24px 0 28px;font-size:11px;font-weight:600;color:var(--ink4);letter-spacing:.1em;text-transform:uppercase;border-right:1px solid var(--border);white-space:nowrap;height:100%;display:flex;align-items:center}
        .parade-track{overflow:hidden;flex:1}
        .parade-inner{display:flex;align-items:center;animation:marquee 22s linear infinite;width:max-content}
        .parade-inner:hover{animation-play-state:paused}
        .parade-item{display:flex;flex-direction:column;align-items:center;gap:6px;padding:0 28px;transition:transform .2s}
        .parade-item:hover{transform:translateY(-5px) scale(1.12)}
        .parade-item img{width:60px;height:60px;object-fit:cover;border-radius:50%;mix-blend-mode:multiply}
        .parade-name{font-size:10px;font-weight:600;color:var(--ink4);letter-spacing:.04em;white-space:nowrap}
        @keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}

        .section{max-width:1120px;margin:0 auto;padding:80px 28px}
        .section-eyebrow{font-size:11px;font-weight:600;color:var(--blue);letter-spacing:.12em;text-transform:uppercase;margin-bottom:10px}
        .section-title{font-size:clamp(24px,3vw,34px);font-weight:700;color:var(--ink);letter-spacing:-0.8px;line-height:1.15;margin-bottom:10px}
        .section-sub{font-size:15px;color:var(--ink3);line-height:1.7;max-width:480px;margin-bottom:48px}

        .arch-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
        .arch-card{background:var(--white);border:1px solid var(--border);border-radius:16px;padding:28px 24px 24px;transition:border-color .18s,box-shadow .18s,transform .18s}
        .arch-card:hover{border-color:#94A3B8;box-shadow:0 8px 32px rgba(0,0,0,.08);transform:translateY(-3px)}
        .arch-img-wrap{width:80px;height:80px;margin-bottom:14px;border-radius:50%;overflow:hidden;background:var(--warm)}
        .arch-img-wrap img{width:100%;height:110%;object-fit:cover;mix-blend-mode:multiply;transition:transform .3s}
        .arch-card:hover .arch-img-wrap img{transform:scale(1.1)}
        .arch-badge{display:inline-block;font-size:10px;font-weight:600;color:var(--blue);letter-spacing:.08em;text-transform:uppercase;background:var(--blue-lt);padding:3px 8px;border-radius:4px;margin-bottom:8px}
        .arch-name{font-size:16px;font-weight:700;color:var(--ink);margin-bottom:6px}
        .arch-desc{font-size:13px;color:var(--ink3);line-height:1.6}

        .skills-bg{background:var(--warm);border-top:1px solid var(--border);border-bottom:1px solid var(--border)}
        .skills-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}
        .skill-card{background:var(--white);border:1px solid var(--border);border-radius:14px;padding:24px 20px;text-decoration:none;display:flex;flex-direction:column;gap:6px;transition:border-color .18s,box-shadow .18s,transform .18s}
        .skill-card:hover{border-color:var(--blue);box-shadow:0 6px 24px rgba(37,99,235,.1);transform:translateY(-3px)}
        .skill-icon{font-size:24px;line-height:1;margin-bottom:4px}
        .skill-name{font-size:15px;font-weight:700;color:var(--ink)}
        .skill-desc{font-size:12px;color:var(--ink3);line-height:1.55;flex:1}
        .skill-cta{font-size:12px;font-weight:600;color:var(--blue);margin-top:8px}

        .who-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
        .who-card{padding:28px 0 0;border-top:2px solid var(--border2);transition:border-color .18s}
        .who-card:hover{border-color:var(--blue)}
        .who-num{font-size:11px;font-weight:700;color:var(--blue);letter-spacing:.1em;margin-bottom:12px}
        .who-title{font-size:16px;font-weight:700;color:var(--ink);margin-bottom:8px}
        .who-desc{font-size:14px;color:var(--ink3);line-height:1.7}

        .cta-band{background:var(--ink);padding:64px 28px;text-align:center}
        .cta-band-inner{max-width:540px;margin:0 auto}
        .cta-band h2{font-size:clamp(24px,3.5vw,36px);font-weight:700;color:#fff;letter-spacing:-1px;margin-bottom:12px}
        .cta-band p{font-size:15px;color:#9CA3AF;line-height:1.7;margin-bottom:32px}
        .btn-white{display:inline-flex;align-items:center;gap:6px;background:#fff;color:var(--ink);font-size:14px;font-weight:700;padding:14px 28px;border-radius:10px;text-decoration:none;box-shadow:0 4px 16px rgba(0,0,0,.25);transition:transform .15s,box-shadow .15s}
        .btn-white:hover{transform:translateY(-2px);box-shadow:0 8px 28px rgba(0,0,0,.32)}

        footer{border-top:1px solid var(--border);padding:20px 28px}
        .footer-inner{max-width:1120px;margin:0 auto;display:flex;justify-content:space-between;align-items:center}
        .footer-copy{font-size:12px;color:var(--ink4)}
        .footer-link{font-size:12px;color:var(--ink4);text-decoration:none;transition:color .15s}
        .footer-link:hover{color:var(--ink3)}

        @media(max-width:900px){
          .hero-inner{grid-template-columns:1fr}
          .hero-visual{display:none}
          .hero-text{padding-bottom:56px}
          .arch-grid{grid-template-columns:repeat(2,1fr)}
          .skills-grid{grid-template-columns:repeat(2,1fr)}
          .who-grid{grid-template-columns:1fr}
        }
        @media(max-width:540px){
          .arch-grid{grid-template-columns:1fr}
          .parade-label{display:none}
          .hero-h1{letter-spacing:-1.2px}
        }
      `}</style>

      <nav className="nav">
        <div className="nav-inner">
          <Link href="/" className="logo">ZUME<span className="logo-dot">.</span>Datalab</Link>
          <a href="https://www.facebook.com/profile.php?id=61581811456373" target="_blank" rel="noopener noreferrer" className="fb-btn">
            <svg viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            ZUME Datalab
          </a>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-inner">
          <div className="hero-text">
            <div className="hero-eyebrow"><span></span>Data Career Intelligence</div>
            <h1 className="hero-h1">คุณเป็น<br /><em>Data</em> สายไหน?</h1>
            <p className="hero-body">ค้นหาสไตล์การทำงานของคุณ วัดทักษะจริง และดูว่าตัวเองอยู่ระดับไหนเมื่อเทียบกับ Data Professionals ในไทย</p>
            <div className="hero-actions">
              <Link href="/archetype" className="btn-primary">ค้นหา Archetype ของฉัน →</Link>
              <a href="#skills" className="btn-outline">ทดสอบทักษะ</a>
            </div>
            <div className="hero-note">
              <span className="free-pill">ฟรี</span>
              <span>ไม่ต้องสมัครสมาชิก</span>
              <span>ใช้เวลา 5–10 นาที</span>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-animal-wrap">
              <img className="hero-animal-img" src={ANIMALS.fox} alt="Fox Detective" />
            </div>
          </div>
        </div>
      </section>

      <div className="parade-wrap">
        <div className="parade-label">6 Archetypes</div>
        <div className="parade-track">
          <div className="parade-inner">
            {PARADE.map((a, i) => (
              <div key={i} className="parade-item">
                <img src={ANIMALS[a.key as keyof typeof ANIMALS]} alt={a.name} style={{ objectPosition: a.pos }} />
                <span className="parade-name">{a.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="section">
        <div className="section-eyebrow">Data Archetype</div>
        <div className="section-title">คนทำงาน Data มีหลายแบบ</div>
        <p className="section-sub">ตอบ 15 คำถาม รู้เลยว่าคุณเป็นสายไหน จุดแข็งคืออะไร และควรพัฒนาต่อยังไง</p>
        <div className="arch-grid">
          {ARCHETYPES.map((a) => (
            <div key={a.key} className="arch-card">
              <div className="arch-img-wrap">
                <img src={ANIMALS[a.key as keyof typeof ANIMALS]} alt={a.name} style={{ objectPosition: a.pos }} />
              </div>
              <div className="arch-badge">{a.badge}</div>
              <div className="arch-name">{a.name}</div>
              <div className="arch-desc">{a.desc}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop:'36px' }}>
          <Link href="/archetype" className="btn-primary">เริ่มค้นหา Archetype ของคุณ →</Link>
        </div>
      </section>

      <div className="skills-bg">
        <section className="section" id="skills">
          <div className="section-eyebrow">Skill Benchmark</div>
          <div className="section-title">วัดระดับทักษะจริง</div>
          <p className="section-sub">ข้อสอบ 10 ข้อต่อวิชา เสร็จใน 5 นาที ดูได้เลยว่าอยู่ Top กี่ %</p>
          <div className="skills-grid">
            {SKILLS.map((s) => (
              <Link key={s.skill} href={`/assessment/${s.skill}`} className="skill-card">
                <div className="skill-icon">{s.icon}</div>
                <div className="skill-name">{s.name}</div>
                <div className="skill-desc">{s.desc}</div>
                <div className="skill-cta">เริ่มทดสอบ →</div>
              </Link>
            ))}
          </div>
        </section>
      </div>

      <section className="section">
        <div className="section-eyebrow">เหมาะกับใคร</div>
        <div className="section-title">สำหรับทุกช่วงของ Career</div>
        <p className="section-sub">ไม่ว่าจะอยู่ stage ไหน เราช่วยให้รู้ว่าตัวเองอยู่ตรงไหน</p>
        <div className="who-grid">
          {[
            { num:'นักเรียน / นักศึกษา', title:'เพิ่งเริ่มต้น', desc:'เช็คว่าความรู้ที่มีพร้อมสู้กับตลาดแรงงานแค่ไหน รู้ก่อนว่าต้องฝึกอะไรเพิ่ม ไม่เสียเวลาเรียนผิดทาง' },
            { num:'คนอยากเปลี่ยนสาย', title:'อยากมาสาย Data', desc:'รู้ว่ายังขาดทักษะด้านไหน และต้องเติมอะไรก่อน เพิ่มโอกาส เพิ่มรายได้ได้จริง' },
            { num:'คนทำงาน Data อยู่แล้ว', title:'อยากรู้ว่าตัวเองอยู่ level ไหน', desc:'วัดระดับเทียบกับคนในสายเดียวกัน รู้ว่าความรู้ที่มีพาไปได้ไกลแค่ไหน' },
          ].map((w, i) => (
            <div key={i} className="who-card">
              <div className="who-num">{w.num}</div>
              <div className="who-title">{w.title}</div>
              <div className="who-desc">{w.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="cta-band">
        <div className="cta-band-inner">
          <h2>เริ่มได้เลย ฟรี ไม่มีเงื่อนไข</h2>
          <p>ไม่ต้องสมัครสมาชิก ไม่ต้องใส่บัตรเครดิต ใช้เวลาแค่ 5 นาทีก็รู้ผลแล้ว</p>
          <Link href="/archetype" className="btn-white">ค้นหา Data Archetype ของฉัน →</Link>
        </div>
      </div>

      <footer>
        <div className="footer-inner">
          <span className="footer-copy">© 2026 ZUME Datalab</span>
          <a href="https://www.facebook.com/profile.php?id=61581811456373" target="_blank" rel="noopener noreferrer" className="footer-link">Facebook Page</a>
        </div>
      </footer>
    </>
  )
}
