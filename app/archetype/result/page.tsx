'use client'
import { useSearchParams } from 'next/navigation'
import { Suspense, useRef } from 'react'
import { archetypeInfo, type ArchetypeKey } from '@/lib/archetypeQuestions'
import Link from 'next/link'
import ResultBanner from './ResultBanner'

const ANIMALS: Record<string, string> = {
  detective:  'https://d8j0ntlcm91z4.cloudfront.net/user_3Et6nR8Yefq3LxvEYXJM7qntcjL/hf_20260609_062721_92e91c71-dd7e-43f7-9a31-04e9cc758262.png',
  architect:  'https://d8j0ntlcm91z4.cloudfront.net/user_3Et6nR8Yefq3LxvEYXJM7qntcjL/hf_20260609_062916_9567f017-65c7-48fe-b2cc-eecc8ac12df4.png',
  storyteller:'https://d8j0ntlcm91z4.cloudfront.net/user_3Et6nR8Yefq3LxvEYXJM7qntcjL/hf_20260609_063125_03a654e2-0f0b-4cac-9375-e0ebb94485f9.png',
  engineer:   'https://d8j0ntlcm91z4.cloudfront.net/user_3Et6nR8Yefq3LxvEYXJM7qntcjL/hf_20260609_063512_e28707fd-c89e-4a41-b508-6b3c6dac8a53.png',
  scientist:  'https://d8j0ntlcm91z4.cloudfront.net/user_3Et6nR8Yefq3LxvEYXJM7qntcjL/hf_20260609_063739_ecf2a873-eec1-42cc-bfbc-50256ffa3527.png',
  strategist: 'https://d8j0ntlcm91z4.cloudfront.net/user_3Et6nR8Yefq3LxvEYXJM7qntcjL/hf_20260609_063822_56fec52c-976a-45c8-be73-88acc72e0713.png',
}

const ANIMAL_POS: Record<string, string> = {
  detective:'center 8%', architect:'center 8%', storyteller:'center 8%',
  engineer:'center 8%', scientist:'65% 8%', strategist:'center 8%',
}

const CSS = `
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{--ink:#111318;--ink2:#3D4451;--ink3:#6B7280;--ink4:#9CA3AF;--blue:#2563EB;--blue-lt:#DBEAFE;--warm:#FAFAF8;--white:#FFFFFF;--border:#E5E7EB;--border2:#F3F4F6;--yellow:#FEF9EE;--yellow-b:#FDE68A}
html{font-family:'Inter',-apple-system,sans-serif;background:var(--warm);color:var(--ink);-webkit-font-smoothing:antialiased}
.nav{position:sticky;top:0;z-index:200;height:58px;background:rgba(255,255,255,0.92);backdrop-filter:blur(16px);border-bottom:1px solid var(--border);display:flex;align-items:center}
.nav-inner{width:100%;max-width:1120px;margin:0 auto;padding:0 28px;display:flex;justify-content:space-between;align-items:center}
.logo{font-size:16px;font-weight:800;color:var(--ink);text-decoration:none;letter-spacing:-0.4px}
.logo-dot{color:var(--blue)}
.back-link{font-size:13px;color:var(--ink3);text-decoration:none;transition:color .15s}
.back-link:hover{color:var(--ink)}

.result-wrap{max-width:600px;margin:0 auto;padding:40px 20px 80px}
@keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
@keyframes floatAnim{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
.f1{animation:fadeUp .5s ease both}
.f2{animation:fadeUp .5s .08s ease both}
.f3{animation:fadeUp .5s .16s ease both}
.f4{animation:fadeUp .5s .24s ease both}
.f5{animation:fadeUp .5s .32s ease both}

.result-hero{background:var(--white);border:1px solid var(--border);border-radius:20px;padding:36px 28px 28px;margin-bottom:16px;text-align:center}
.animal-hero-wrap{width:140px;height:140px;border-radius:50%;overflow:hidden;margin:0 auto 20px;background:var(--warm)}
.animal-hero-wrap img{width:100%;height:115%;object-fit:cover;mix-blend-mode:multiply;animation:floatAnim 3.5s ease-in-out infinite}
.result-badge{display:inline-block;font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;padding:4px 12px;border-radius:20px;margin-bottom:12px}
.result-name{font-size:clamp(28px,6vw,38px);font-weight:800;color:var(--ink);letter-spacing:-1px;margin-bottom:8px}
.result-tagline{font-size:14px;font-weight:600;padding:4px 14px;border-radius:20px;display:inline-block;margin-bottom:20px}
.result-desc{font-size:16px;color:var(--ink2);line-height:1.8;max-width:480px;margin:0 auto}

.result-section{background:var(--white);border:1px solid var(--border);border-radius:16px;padding:24px;margin-bottom:12px}
.section-label{font-size:10px;font-weight:700;color:var(--ink4);letter-spacing:.12em;text-transform:uppercase;margin-bottom:14px}
.strengths-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.strength-item{display:flex;align-items:center;gap:10px;background:var(--warm);border-radius:10px;padding:11px 13px;border:1px solid var(--border)}
.strength-dot{width:6px;height:6px;border-radius:50%;flex-shrink:0}
.strength-text{font-size:13px;color:var(--ink2)}
.blindspot-box{background:var(--yellow);border:1px solid var(--yellow-b);border-radius:12px;padding:16px}
.blindspot-label{font-size:10px;font-weight:700;color:#D97706;letter-spacing:.1em;text-transform:uppercase;margin-bottom:6px}
.blindspot-text{font-size:14px;color:var(--ink2);line-height:1.7}
.careers-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}
.career-item{border-radius:10px;padding:10px 12px;text-align:center;font-size:13px;font-weight:600;border:1px solid}

.others-wrap{margin-bottom:16px}
.others-label{font-size:10px;font-weight:700;color:var(--ink4);letter-spacing:.12em;text-transform:uppercase;margin-bottom:12px;text-align:center}
.others-grid{display:grid;grid-template-columns:repeat(6,1fr);gap:8px}
.other-card{border:1px solid var(--border);border-radius:12px;padding:12px 6px;text-align:center;transition:transform .15s,box-shadow .15s;cursor:default;background:var(--white)}
.other-card:hover{transform:translateY(-3px);box-shadow:0 6px 16px rgba(0,0,0,.07)}
.other-img{width:44px;height:44px;border-radius:50%;overflow:hidden;background:var(--warm);margin:0 auto 6px}
.other-img img{width:100%;height:110%;object-fit:cover;mix-blend-mode:multiply}
.other-name{font-size:10px;font-weight:600;color:var(--ink4);line-height:1.3}

.action-stack{display:flex;flex-direction:column;gap:8px}
.btn-primary{display:flex;align-items:center;justify-content:center;gap:6px;background:var(--ink);color:#fff;font-size:15px;font-weight:600;padding:15px;border-radius:12px;text-decoration:none;border:none;cursor:pointer;font-family:inherit;transition:transform .15s,box-shadow .15s;box-shadow:0 1px 3px rgba(0,0,0,.18),0 4px 12px rgba(0,0,0,.1)}
.btn-primary:hover{transform:translateY(-2px);box-shadow:0 2px 6px rgba(0,0,0,.2),0 8px 24px rgba(0,0,0,.12)}
.btn-save{display:flex;align-items:center;justify-content:center;gap:8px;background:var(--white);color:var(--ink2);font-size:14px;font-weight:500;padding:13px;border-radius:12px;border:1px solid var(--border);cursor:pointer;font-family:inherit;transition:border-color .15s,transform .15s}
.btn-save:hover{border-color:#94A3B8;transform:translateY(-1px)}
.btn-retry{display:block;text-align:center;background:transparent;color:var(--ink4);font-size:13px;text-decoration:none;padding:10px;transition:color .15s}
.btn-retry:hover{color:var(--ink3)}

@media(max-width:480px){.strengths-grid{grid-template-columns:1fr}.careers-grid{grid-template-columns:repeat(2,1fr)}.others-grid{grid-template-columns:repeat(3,1fr)}}
`

function ResultContent() {
  const searchParams = useSearchParams()
  const cardRef = useRef<HTMLDivElement>(null)
  const type = (searchParams.get('type') ?? 'detective') as ArchetypeKey
  const info = archetypeInfo[type] ?? archetypeInfo.detective
  const allTypes = Object.entries(archetypeInfo) as [ArchetypeKey, typeof archetypeInfo[ArchetypeKey]][]

  const handleSave = async () => {
    if (!cardRef.current) return
    try {
      // @ts-ignore
      const h2c = (await import('html2canvas')).default
      const canvas = await h2c(cardRef.current)
      const link = document.createElement('a')
      link.download = `data-archetype-${type}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    } catch { alert('ไม่สามารถบันทึกภาพได้') }
  }

  return (
    <>
      <style>{CSS}</style>
      <nav className="nav">
        <div className="nav-inner">
          <Link href="/" className="logo">ZUME<span className="logo-dot">.</span>Datalab</Link>
          <Link href="/archetype" className="back-link">ทำใหม่</Link>
        </div>
      </nav>

      <div className="result-wrap">
        <div ref={cardRef}>
          {/* Hero card */}
          <div className="result-hero f1">
            <div className="animal-hero-wrap">
              <img src={ANIMALS[type]} alt={info.name} style={{ objectPosition: ANIMAL_POS[type] }} />
            </div>
            <div className="result-badge f2" style={{ background:`${info.color}18`, color:info.color }}>
              Data Archetype
            </div>
            <div className="result-name f2">{info.name}</div>
            <div className="result-tagline f3" style={{ background:`${info.color}15`, color:info.color }}>
              {info.tagline}
            </div>
            <p className="result-desc f3">{info.description}</p>
          </div>

          {/* Strengths */}
          <div className="result-section f4">
            <div className="section-label">จุดแข็งของคุณ</div>
            <div className="strengths-grid">
              {info.strengths.map((s, i) => (
                <div key={i} className="strength-item">
                  <div className="strength-dot" style={{ background:info.color }} />
                  <div className="strength-text">{s}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Blindspot */}
          <div className="f4" style={{ marginBottom:12 }}>
            <div className="blindspot-box">
              <div className="blindspot-label">ระวังด้วยนะ</div>
              <div className="blindspot-text">{info.blindspot}</div>
            </div>
          </div>

          {/* Careers */}
          <div className="result-section f5">
            <div className="section-label">สายงานที่เหมาะกับคุณ</div>
            <div className="careers-grid">
              {info.careers.map((c, i) => (
                <div key={i} className="career-item" style={{ background:`${info.color}12`, color:info.color, borderColor:`${info.color}33` }}>
                  {c}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Others */}
        <div className="others-wrap f5">
          <div className="others-label">Archetype อื่นๆ</div>
          <div className="others-grid">
            {allTypes.filter(([k]) => k !== type).map(([k, v]) => (
              <div key={k} className="other-card">
                <div className="other-img">
                  <img src={ANIMALS[k]} alt={v.name} style={{ objectPosition: ANIMAL_POS[k] }} />
                </div>
                <div className="other-name">{v.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="action-stack f5">
          <Link href="/assessment/sql" className="btn-primary" style={{ background:info.color, color: ['#F59E0B','#10B981'].includes(info.color)?'#000':'#fff' }}>
            ทดสอบทักษะต่อเลย →
          </Link>
          <button onClick={handleSave} className="btn-save">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            บันทึกผลลัพธ์เป็นรูป
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
        <div style={{ minHeight:'100vh', background:'#FAFAF8', display:'flex', alignItems:'center', justifyContent:'center', color:'#9CA3AF', fontFamily:'system-ui' }}>
          กำลังโหลด...
        </div>
      }>
        <ResultContent />
      </Suspense>
    </>
  )
}
