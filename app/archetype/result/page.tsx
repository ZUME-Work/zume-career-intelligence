'use client'
import { useSearchParams } from 'next/navigation'
import { Suspense, useRef } from 'react'
import { archetypeInfo, type ArchetypeKey } from '@/lib/archetypeQuestions'
import Link from 'next/link'
import ResultBanner from './ResultBanner'

function ResultContent() {
  const searchParams = useSearchParams()
  const cardRef = useRef<HTMLDivElement>(null)
  const type = (searchParams.get('type') ?? 'detective') as ArchetypeKey
  const info = archetypeInfo[type] ?? archetypeInfo.detective
  const allTypes = Object.entries(archetypeInfo) as [ArchetypeKey, typeof archetypeInfo[ArchetypeKey]][]

  const handleSave = async () => {
    if (!cardRef.current) return
    try {
      const { default: html2canvas } = await import('html2canvas' as any)
      const canvas = await html2canvas(cardRef.current, { scale: 2, useCORS: true, backgroundColor: '#0F172A' })
      const link = document.createElement('a')
      link.download = `data-archetype-${type}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    } catch {
      alert('ไม่สามารถบันทึกภาพได้ ลองกด Screenshot ด้วยตัวเองนะคะ')
    }
  }

  return (
    <>
      <style>{`
        * { box-sizing:border-box; margin:0; padding:0; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes floatAnim { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        .f1{animation:fadeUp 0.5s ease both}
        .f2{animation:fadeUp 0.5s 0.1s ease both}
        .f3{animation:fadeUp 0.5s 0.15s ease both}
        .f4{animation:fadeUp 0.5s 0.2s ease both}
        .f5{animation:fadeUp 0.5s 0.25s ease both}
        .f6{animation:fadeUp 0.5s 0.3s ease both}
        .emoji-float { animation:floatAnim 3s ease-in-out infinite; display:inline-block; }
        .strength-item {
          display:flex; align-items:center; gap:10px;
          background:#1E293B; border-radius:10px; padding:12px 14px;
          border:1px solid #334155;
          transition:transform 0.15s, box-shadow 0.15s, border-color 0.15s;
        }
        .strength-item:hover { transform:translateY(-2px); box-shadow:0 6px 16px rgba(0,0,0,0.3); border-color:#475569; }
        .career-chip {
          border-radius:10px; padding:10px 14px; text-align:center;
          font-size:13px; font-weight:600;
          border:1px solid;
          transition:transform 0.15s, box-shadow 0.15s;
        }
        .career-chip:hover { transform:translateY(-2px); box-shadow:0 6px 16px rgba(0,0,0,0.2); }
        .arch-other {
          border-radius:12px; padding:12px 8px; text-align:center;
          transition:transform 0.15s, box-shadow 0.15s;
          border:1px solid;
        }
        .arch-other:hover { transform:translateY(-3px); box-shadow:0 8px 20px rgba(0,0,0,0.15); }
        .btn-save {
          display:flex; align-items:center; justify-content:center; gap:8px;
          background:#1E293B; color:#94A3B8;
          border:1px solid #334155; border-radius:12px;
          padding:13px; font-size:15px; font-weight:600;
          cursor:pointer; width:100%;
          transition:transform 0.15s, box-shadow 0.15s, border-color 0.15s, color 0.15s;
        }
        .btn-save:hover { transform:translateY(-2px); box-shadow:0 8px 20px rgba(0,0,0,0.3); border-color:#475569; color:#E2E8F0; }
        .btn-retry {
          display:block; text-align:center;
          background:#1E293B; color:#64748B;
          border:1px solid #1E293B; border-radius:12px;
          padding:13px; font-size:15px; font-weight:500;
          text-decoration:none;
          transition:transform 0.15s, border-color 0.15s, color 0.15s;
        }
        .btn-retry:hover { transform:translateY(-2px); border-color:#334155; color:#94A3B8; }
        .btn-skill {
          display:block; text-align:center;
          border-radius:12px; padding:15px;
          font-size:16px; font-weight:700;
          text-decoration:none; color:#000;
          transition:transform 0.15s, box-shadow 0.15s, opacity 0.15s;
        }
        .btn-skill:hover { transform:translateY(-3px); box-shadow:0 10px 28px rgba(0,0,0,0.25); opacity:0.9; }
        .back-link {
          display:inline-flex; align-items:center; gap:6px;
          color:#475569; font-size:14px; text-decoration:none;
          transition:color 0.15s;
        }
        .back-link:hover { color:#94A3B8; }
        .wrap { width:100%; max-width:480px; margin:0 auto; padding:0 20px; }
        @media(min-width:640px) { .wrap { max-width:560px; padding:0 32px; } }
      `}</style>

      <main style={{ minHeight:'100vh', background:'#080C14', fontFamily:'system-ui,sans-serif', color:'#fff', paddingBottom:40 }}>

        {/* Nav */}
        <div style={{ padding:'16px 20px', maxWidth:560, margin:'0 auto', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <Link href="/" className="back-link">← หน้าแรก</Link>
          <Link href="/archetype" className="back-link">ทำใหม่อีกครั้ง</Link>
        </div>

        {/* Result Card — ส่วนที่ save เป็นรูป */}
        <div className="wrap">
          <div ref={cardRef} style={{ background:'#0F172A', borderRadius:24, padding:'32px 24px', border:'1px solid #1E293B', marginBottom:20 }}>

            {/* Badge */}
            <div className="f1" style={{ textAlign:'center', marginBottom:24 }}>
              <span style={{ fontSize:11, fontWeight:700, letterSpacing:2, color:info.color, textTransform:'uppercase', background:`${info.color}18`, padding:'6px 14px', borderRadius:20 }}>
                Data Archetype
              </span>
            </div>

            {/* Emoji */}
            <div className="f2" style={{ textAlign:'center', marginBottom:16 }}>
              <span className="emoji-float" style={{ fontSize:80, lineHeight:1 }}>{info.emoji}</span>
            </div>

            {/* Name */}
            <div className="f3" style={{ textAlign:'center', marginBottom:6 }}>
              <div style={{ fontSize:'clamp(1.8rem,6vw,2.2rem)', fontWeight:800, color:'#fff', letterSpacing:'-0.3px' }}>
                {info.name}
              </div>
            </div>

            {/* Tagline */}
            <div className="f3" style={{ textAlign:'center', marginBottom:20 }}>
              <span style={{ fontSize:15, color:info.color, fontWeight:600 }}>{info.tagline}</span>
            </div>

            {/* Description */}
            <div className="f4" style={{ fontSize:16, color:'#94A3B8', lineHeight:1.8, textAlign:'center', marginBottom:28 }}>
              {info.description}
            </div>

            {/* Divider */}
            <div style={{ height:1, background:'#1E293B', marginBottom:24 }} />

            {/* Strengths */}
            <div className="f4" style={{ marginBottom:24 }}>
              <div style={{ fontSize:11, fontWeight:700, color:'#475569', letterSpacing:1.5, textTransform:'uppercase', marginBottom:12 }}>
                จุดแข็งของคุณ
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
                {info.strengths.map((s, i) => (
                  <div key={i} className="strength-item">
                    <div style={{ width:6, height:6, borderRadius:'50%', background:info.color, flexShrink:0 }} />
                    <div style={{ fontSize:13, color:'#CBD5E1' }}>{s}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Blind spot */}
            <div className="f5" style={{ background:'#0F172A', border:'1px solid #F59E0B33', borderRadius:12, padding:'14px 16px', marginBottom:24 }}>
              <div style={{ fontSize:11, fontWeight:700, color:'#F59E0B', letterSpacing:1.5, textTransform:'uppercase', marginBottom:6 }}>ระวังด้วยนะ</div>
              <div style={{ fontSize:14, color:'#94A3B8', lineHeight:1.7 }}>{info.blindspot}</div>
            </div>

            {/* Careers */}
            <div className="f5">
              <div style={{ fontSize:11, fontWeight:700, color:'#475569', letterSpacing:1.5, textTransform:'uppercase', marginBottom:12 }}>
                สายงานที่เหมาะกับคุณ
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:8 }}>
                {info.careers.map((c, i) => (
                  <div key={i} className="career-chip" style={{ background:`${info.color}15`, color:info.color, borderColor:`${info.color}44` }}>
                    {c}
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Other archetypes */}
          <div className="f5" style={{ marginBottom:24 }}>
            <div style={{ fontSize:11, fontWeight:700, color:'#334155', letterSpacing:1.5, textTransform:'uppercase', marginBottom:12, textAlign:'center' }}>
              Archetype อื่นๆ
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(6,1fr)', gap:8 }}>
              {allTypes.filter(([k]) => k !== type).map(([k, v]) => (
                <div key={k} className="arch-other" style={{ background:`${v.color}12`, borderColor:`${v.color}33` }}>
                  <div style={{ fontSize:22, marginBottom:4 }}>{v.emoji}</div>
                  <div style={{ fontSize:10, color:v.color, fontWeight:600, lineHeight:1.3 }}>{v.name.replace('The ','')}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="f6" style={{ display:'flex', flexDirection:'column', gap:10 }}>
            <Link href="/assessment/sql" className="btn-skill" style={{ background:info.color }}>
              ทดสอบทักษะต่อเลย →
            </Link>
            <button onClick={handleSave} className="btn-save">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              บันทึกผลลัพธ์เป็นรูป
            </button>
            <Link href="/archetype" className="btn-retry">ทำแบบทดสอบใหม่อีกครั้ง</Link>
          </div>

        </div>

        <div style={{ textAlign:'center', marginTop:32, fontSize:12, color:'#1E293B' }}>
          © 2026 ZUME Datalab · All rights reserved
        </div>
      </main>
    </>
  )
}

// banner added
export default function ResultPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight:'100vh', background:'#080C14', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontFamily:'system-ui,sans-serif' }}>
        กำลังโหลด...
      </div>
    }>
      <ResultContent />
    </Suspense>
  )
}
