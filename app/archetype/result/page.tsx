'use client'
import { useSearchParams } from 'next/navigation'
import { Suspense, useRef, useState } from 'react'
import { archetypeInfo, type ArchetypeKey } from '@/lib/archetypeQuestions'
import Link from 'next/link'
import ResultBanner from './ResultBanner'

const ANIMALS: Record<string,string> = {
  detective:  'https://d8j0ntlcm91z4.cloudfront.net/user_3Et6nR8Yefq3LxvEYXJM7qntcjL/hf_20260609_062721_92e91c71-dd7e-43f7-9a31-04e9cc758262.png',
  architect:  'https://d8j0ntlcm91z4.cloudfront.net/user_3Et6nR8Yefq3LxvEYXJM7qntcjL/hf_20260609_062916_9567f017-65c7-48fe-b2cc-eecc8ac12df4.png',
  storyteller:'https://d8j0ntlcm91z4.cloudfront.net/user_3Et6nR8Yefq3LxvEYXJM7qntcjL/hf_20260609_063125_03a654e2-0f0b-4cac-9375-e0ebb94485f9.png',
  engineer:   'https://d8j0ntlcm91z4.cloudfront.net/user_3Et6nR8Yefq3LxvEYXJM7qntcjL/hf_20260609_063512_e28707fd-c89e-4a41-b508-6b3c6dac8a53.png',
  scientist:  'https://d8j0ntlcm91z4.cloudfront.net/user_3Et6nR8Yefq3LxvEYXJM7qntcjL/hf_20260609_063739_ecf2a873-eec1-42cc-bfbc-50256ffa3527.png',
  strategist: 'https://d8j0ntlcm91z4.cloudfront.net/user_3Et6nR8Yefq3LxvEYXJM7qntcjL/hf_20260609_063822_56fec52c-976a-45c8-be73-88acc72e0713.png',
}

const ANIMAL_POS: Record<string,string> = {
  detective:'center 8%', architect:'center 8%', storyteller:'center 8%',
  engineer:'center 8%', scientist:'65% 8%', strategist:'center 8%',
}

const CSS = `
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{font-family:-apple-system,'Inter',sans-serif;-webkit-font-smoothing:antialiased;background:#FAFAF8;color:#111}
.nav{position:sticky;top:0;z-index:100;background:rgba(253,252,251,0.95);backdrop-filter:blur(12px);border-bottom:1px solid #EDE9E3;height:52px;display:flex;align-items:center}
.nav-inner{width:100%;max-width:600px;margin:0 auto;padding:0 20px;display:flex;justify-content:space-between;align-items:center}
.logo{font-size:15px;font-weight:800;color:#111;text-decoration:none;letter-spacing:-.3px}
.logo-dot{color:#2563EB}
.nav-r{font-size:13px;color:#B8B0A5;text-decoration:none;transition:color .15s}
.nav-r:hover{color:#6B6560}
.main{max-width:560px;margin:0 auto;padding:28px 20px 80px}
@keyframes fu{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
.f1{animation:fu .4s ease both}
.f2{animation:fu .4s .08s ease both}
.f3{animation:fu .4s .16s ease both}
.f4{animation:fu .4s .24s ease both}
.f5{animation:fu .4s .3s ease both}

.hero-row{display:flex;align-items:center;gap:20px;margin-bottom:20px}
.hero-img{width:88px;height:88px;border-radius:50%;overflow:hidden;background:#F4F1EC;flex-shrink:0}
.hero-img img{width:100%;height:110%;object-fit:cover;mix-blend-mode:multiply}
.hero-right{}
.hero-badge{font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;padding:3px 8px;border-radius:4px;display:inline-block;margin-bottom:6px}
.hero-name{font-size:28px;font-weight:800;color:#111;letter-spacing:-.8px;line-height:1.1;margin-bottom:4px}
.hero-tagline{font-size:13px;font-weight:600;padding:4px 10px;border-radius:20px;display:inline-block}

.hero-desc{font-size:15px;color:#4B5563;line-height:1.8;margin-bottom:20px}

.divider{height:1px;background:#EDE9E3;margin:20px 0}

.section-label{font-size:10px;font-weight:700;color:#C4BBB0;letter-spacing:.12em;text-transform:uppercase;margin-bottom:12px}
.strengths{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:20px}
.strength-item{display:flex;align-items:center;gap:9px;background:#F4F1EC;border-radius:9px;padding:11px 13px}
.s-dot{width:5px;height:5px;border-radius:50%;flex-shrink:0}
.s-txt{font-size:13px;color:#374151}

.blindspot{background:#FFFBEB;border:1px solid #FDE68A;border-radius:10px;padding:14px 16px;margin-bottom:20px}
.blindspot-lbl{font-size:10px;font-weight:700;color:#D97706;letter-spacing:.1em;text-transform:uppercase;margin-bottom:5px}
.blindspot-txt{font-size:14px;color:#4B5563;line-height:1.7}

.careers{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:20px}
.career-item{border-radius:9px;padding:10px 8px;text-align:center;font-size:12px;font-weight:600;border:1px solid}

.others-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:8px;margin-bottom:24px}
.other-card{border:1px solid #EDE9E3;border-radius:10px;padding:10px 4px;text-align:center;background:#fff;transition:border-color .15s,transform .15s;cursor:default}
.other-card:hover{border-color:#CCC7BF;transform:translateY(-2px)}
.other-img{width:40px;height:40px;border-radius:50%;overflow:hidden;background:#F4F1EC;margin:0 auto 5px}
.other-img img{width:100%;height:110%;object-fit:cover;mix-blend-mode:multiply}
.other-name{font-size:10px;font-weight:600;color:#9CA3AF;line-height:1.3}

.actions{display:flex;flex-direction:column;gap:8px}
.btn-primary{display:flex;align-items:center;justify-content:center;gap:6px;background:#111;color:#fff;font-size:14px;font-weight:700;padding:14px;border-radius:9px;text-decoration:none;border:none;cursor:pointer;font-family:inherit;transition:opacity .15s,transform .15s;letter-spacing:-.1px}
.btn-primary:hover{opacity:.88;transform:translateY(-1px)}
.btn-save{display:flex;align-items:center;justify-content:center;gap:7px;background:#F4F1EC;color:#374151;font-size:13px;font-weight:500;padding:13px;border-radius:9px;border:none;cursor:pointer;font-family:inherit;transition:background .15s}
.btn-save:hover{background:#EDE9E3}
.btn-retry{display:block;text-align:center;font-size:13px;color:#B8B0A5;text-decoration:none;padding:10px;transition:color .15s}
.btn-retry:hover{color:#6B7280}

.retake-notice{background:#F4F1EC;border-radius:10px;padding:14px 16px;margin-bottom:8px;display:flex;align-items:flex-start;gap:10px}
.retake-icon{font-size:16px;flex-shrink:0;margin-top:1px}
.retake-text{font-size:13px;color:#6B7280;line-height:1.6}
.retake-text strong{color:#374151;font-weight:600}

@media(max-width:480px){.strengths{grid-template-columns:1fr}.careers{grid-template-columns:repeat(2,1fr)}.others-grid{grid-template-columns:repeat(4,1fr)}}
`

function ResultContent() {
  const searchParams = useSearchParams()
  const cardRef = useRef<HTMLDivElement>(null)
  const [saving, setSaving] = useState(false)
  const type = (searchParams.get('type') ?? 'detective') as ArchetypeKey
  const info = archetypeInfo[type] ?? archetypeInfo.detective
  const allTypes = Object.entries(archetypeInfo) as [ArchetypeKey, typeof archetypeInfo[ArchetypeKey]][]
  const others = allTypes.filter(([k]) => k !== type)

  const handleSave = async () => {
    if (!cardRef.current || saving) return
    setSaving(true)
    try {
      // @ts-ignore
      const h2c = (await import('html2canvas')).default
      // @ts-ignore
      const canvas = await h2c(cardRef.current)
      const link = document.createElement('a')
      link.download = `zume-archetype-${type}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    } catch { alert('ไม่สามารถบันทึกภาพได้') }
    finally { setSaving(false) }
  }

  return (
    <>
      <style>{CSS}</style>
      <nav className="nav">
        <div className="nav-inner">
          <Link href="/" className="logo">ZUME<span className="logo-dot">.</span>Datalab</Link>
          <Link href="/" className="nav-r">← หน้าแรก</Link>
        </div>
      </nav>

      <div className="main">
        <div ref={cardRef} style={{ paddingBottom: 4 }}>
          {/* Hero */}
          <div className="hero-row f1">
            <div className="hero-img">
              <img src={ANIMALS[type]} alt={info.name} style={{ objectPosition: ANIMAL_POS[type] }} />
            </div>
            <div className="hero-right">
              <div className="hero-badge" style={{ background:`${info.color}18`, color:info.color }}>
                Data Archetype
              </div>
              <div className="hero-name">{info.name}</div>
              <div className="hero-tagline" style={{ background:`${info.color}12`, color:info.color }}>
                {info.tagline}
              </div>
            </div>
          </div>

          <p className="hero-desc f2">{info.description}</p>

          <div className="divider" />

          {/* Strengths */}
          <div className="f3">
            <div className="section-label">จุดแข็ง</div>
            <div className="strengths">
              {info.strengths.map((s,i) => (
                <div key={i} className="strength-item">
                  <div className="s-dot" style={{ background:info.color }} />
                  <div className="s-txt">{s}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Blindspot */}
          <div className="blindspot f3">
            <div className="blindspot-lbl">ระวังด้วยนะ</div>
            <div className="blindspot-txt">{info.blindspot}</div>
          </div>

          {/* Careers */}
          <div className="f4">
            <div className="section-label">สายงานที่เหมาะ</div>
            <div className="careers">
              {info.careers.map((c,i) => (
                <div key={i} className="career-item"
                  style={{ background:`${info.color}10`, color:info.color, borderColor:`${info.color}30` }}>
                  {c}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="divider" />

        {/* Others */}
        <div className="f4">
          <div className="section-label" style={{ marginBottom:10 }}>Archetypes อื่นๆ</div>
          <div className="others-grid">
            {others.slice(0,5).map(([k,v]) => (
              <div key={k} className="other-card">
                <div className="other-img">
                  <img src={ANIMALS[k]} alt={v.name} style={{ objectPosition: ANIMAL_POS[k] }} />
                </div>
                <div className="other-name">{v.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Retake notice */}
        <div className="retake-notice f5">
          <span className="retake-icon">💡</span>
          <div className="retake-text">
            <strong>ได้ผลนี้แล้วอยากลองใหม่?</strong> ตอบแบบทดสอบซ้ำได้ตลอด ผลอาจต่างกันขึ้นอยู่กับ mood และมุมมองของคุณในแต่ละวัน
          </div>
        </div>

        {/* Actions */}
        <div className="actions f5">
          <Link href="/assessment/sql" className="btn-primary"
            style={{ background:info.color, color:['#F59E0B','#10B981'].includes(info.color)?'#000':'#fff' }}>
            ทดสอบทักษะต่อเลย →
          </Link>
          <button onClick={handleSave} className="btn-save" disabled={saving}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            {saving ? 'กำลังบันทึก...' : 'บันทึกผลลัพธ์เป็นรูป'}
          </button>
          <Link href="/archetype" className="btn-retry">ทำแบบทดสอบใหม่อีกครั้ง</Link>
        </div>
      </div>
    </>
  )
}

export default function ResultPage() {
  return (
    <>
      <ResultBanner />
      <Suspense fallback={
        <div style={{ minHeight:'100vh', background:'#FAFAF8', display:'flex', alignItems:'center', justifyContent:'center', color:'#B8B0A5', fontFamily:'system-ui' }}>
          กำลังโหลด...
        </div>
      }>
        <ResultContent />
      </Suspense>
    </>
  )
}
