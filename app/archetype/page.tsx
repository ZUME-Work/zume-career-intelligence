'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { archetypeQuestions, type ArchetypeKey } from '@/lib/archetypeQuestions'

const ARCHETYPE_COLORS: Record<ArchetypeKey, string> = {
  detective: '#F59E0B',
  architect: '#3B82F6',
  storyteller: '#EC4899',
  engineer: '#10B981',
  scientist: '#8B5CF6',
  strategist: '#EF4444',
}

export default function ArchetypePage() {
  const router = useRouter()
  const [started, setStarted] = useState(false)
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [scores, setScores] = useState<Record<ArchetypeKey, number>>({
    detective: 0, architect: 0, storyteller: 0,
    engineer: 0, scientist: 0, strategist: 0,
  })
  const [history, setHistory] = useState<{ scores: Record<ArchetypeKey, number> }[]>([])
  const [animating, setAnimating] = useState(false)

  const q = archetypeQuestions[current]
  const progress = (current / archetypeQuestions.length) * 100
  const isLast = current === archetypeQuestions.length - 1

  const topArchetype = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0] as ArchetypeKey
  const accentColor = ARCHETYPE_COLORS[topArchetype]

  const progressLabels = [
    'ไม่มีผิดไม่มีถูก เลือกตามความรู้สึกเลย',
    'กำลังจับ pattern ของคุณอยู่...',
    'เริ่มชัดเจนขึ้นแล้ว',
    'ครึ่งทางแล้ว!',
    'ใกล้รู้แล้ว อีกนิดเดียว',
    'เกือบถึงแล้ว!',
  ]
  const labelIdx = Math.min(Math.floor((current / archetypeQuestions.length) * progressLabels.length), progressLabels.length - 1)

  const handleSelect = (i: number) => {
    if (animating) return
    setSelected(i)
    setAnimating(true)
    const newScores = { ...scores }
    const opt = q.options[i]
    Object.entries(opt.scores).forEach(([k, v]) => { newScores[k as ArchetypeKey] += v })
    setHistory(h => [...h, { scores: { ...scores } }])
    setScores(newScores)
    setTimeout(() => {
      if (isLast) {
        const result = Object.entries(newScores).sort((a, b) => b[1] - a[1])[0][0] as ArchetypeKey
        router.push('/archetype/result?type=' + result)
      } else {
        setCurrent(c => c + 1)
        setSelected(null)
        setAnimating(false)
      }
    }, 380)
  }

  const handleBack = () => {
    if (current === 0) { setStarted(false); return }
    const prev = history[history.length - 1]
    setScores(prev.scores)
    setHistory(h => h.slice(0, -1))
    setCurrent(c => c - 1)
    setSelected(null)
    setAnimating(false)
  }

  if (!started) return (
    <>
      <style>{`
        * { box-sizing:border-box; margin:0; padding:0; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes pulse { 0%,100%{box-shadow:0 4px 20px rgba(79,70,229,0.3)} 50%{box-shadow:0 8px 32px rgba(79,70,229,0.55)} }
        .f1{animation:fadeUp 0.5s ease both}
        .f2{animation:fadeUp 0.5s 0.1s ease both}
        .f3{animation:fadeUp 0.5s 0.2s ease both}
        .f4{animation:fadeUp 0.5s 0.3s ease both}
        .arch-mini { border-radius:16px; padding:18px 10px; text-align:center; animation:float ease-in-out infinite; transition:transform 0.2s,box-shadow 0.2s; box-shadow:0 2px 8px rgba(0,0,0,0.06); }
        .arch-mini:hover { transform:translateY(-8px) !important; box-shadow:0 16px 32px rgba(0,0,0,0.12); animation:none; }
        .start-btn { width:100%; background:#4F46E5; color:#fff; border:none; border-radius:16px; padding:18px; font-size:18px; font-weight:700; cursor:pointer; animation:pulse 2.5s ease infinite; transition:transform 0.18s; }
        .start-btn:hover { transform:translateY(-3px); animation:none; box-shadow:0 12px 32px rgba(79,70,229,0.45); }
        .back-link { color:#bbb; font-size:14px; text-decoration:none; transition:color 0.15s; }
        .back-link:hover { color:#555; }
        @media(max-width:540px) { .arch-intro-grid { grid-template-columns:repeat(3,1fr) !important; } }
      `}</style>
      <main style={{ minHeight:'100vh', background:'#fff', fontFamily:'system-ui,sans-serif', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'2rem 1.5rem' }}>
        <div style={{ width:'100%', maxWidth:520 }}>
          <a href="/" className="back-link" style={{ display:'inline-block', marginBottom:32 }}>← กลับหน้าแรก</a>
          <div className="f1" style={{ fontSize:12, fontWeight:700, color:'#4F46E5', letterSpacing:1.5, textTransform:'uppercase', marginBottom:14 }}>Data Archetype</div>
          <h1 className="f2" style={{ fontSize:'clamp(1.9rem,5vw,2.6rem)', fontWeight:800, color:'#111', lineHeight:1.2, marginBottom:14, letterSpacing:'-0.3px' }}>
            คุณเป็น Data<br />สายไหนกันนะ?
          </h1>
          <p className="f3" style={{ fontSize:17, color:'#666', lineHeight:1.8, marginBottom:36 }}>
            15 คำถามสั้นๆ ไม่มีผิดไม่มีถูก<br />กดคำตอบที่เป็นตัวคุณที่สุดได้เลย
          </p>
          <div className="f3 arch-intro-grid" style={{ display:'grid', gridTemplateColumns:'repeat(6,1fr)', gap:10, marginBottom:36 }}>
            {[
              { emoji:'🦊', name:'นักสืบ', bg:'#FEF9EE', border:'#F59E0B', delay:'0s' },
              { emoji:'🦅', name:'นักออกแบบ', bg:'#EFF6FF', border:'#3B82F6', delay:'0.4s' },
              { emoji:'🦋', name:'นักเล่าเรื่อง', bg:'#FDF2F8', border:'#EC4899', delay:'0.8s' },
              { emoji:'🦫', name:'นักสร้าง', bg:'#F0FDF4', border:'#10B981', delay:'1.2s' },
              { emoji:'🦉', name:'นักทดสอบ', bg:'#F5F3FF', border:'#8B5CF6', delay:'1.6s' },
              { emoji:'🐆', name:'นักกลยุทธ์', bg:'#FFF1F2', border:'#EF4444', delay:'2s' },
            ].map((a) => (
              <div key={a.name} className="arch-mini" style={{ background:a.bg, border:`1px solid ${a.border}33`, animationDuration:'3.5s', animationDelay:a.delay }}>
                <div style={{ fontSize:26, marginBottom:6 }}>{a.emoji}</div>
                <div style={{ fontSize:11, color:'#444', fontWeight:600, lineHeight:1.3 }}>{a.name}</div>
              </div>
            ))}
          </div>
          <button className="f4 start-btn" onClick={() => setStarted(true)}>เริ่มเลย →</button>
          <p style={{ fontSize:13, color:'#bbb', textAlign:'center', marginTop:14 }}>ใช้เวลาแค่ 3 นาที · ฟรี</p>
        </div>
      </main>
    </>
  )

  return (
    <>
      <style>{`
        * { box-sizing:border-box; margin:0; padding:0; }
        @keyframes slideIn { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeOpt { from{opacity:0;transform:translateX(-8px)} to{opacity:1;transform:translateX(0)} }
        .q-wrap { animation:slideIn 0.3s ease both; }
        .opt-btn {
          width:100%; text-align:left; cursor:pointer; border-radius:14px;
          padding:16px 18px; display:flex; align-items:center; gap:13px;
          transition:transform 0.15s, box-shadow 0.15s, border-color 0.15s, background 0.15s;
          -webkit-tap-highlight-color:transparent;
          animation:fadeOpt 0.2s ease both;
        }
        .opt-btn:hover { transform:translateX(4px); box-shadow:0 4px 16px rgba(0,0,0,0.08); }
        .back-btn { background:none; border:none; font-size:14px; color:#bbb; cursor:pointer; padding:0; display:flex; align-items:center; gap:6px; transition:color 0.15s; }
        .back-btn:hover { color:#555; }
        .next-btn { border:none; border-radius:12px; padding:12px 28px; font-size:15px; font-weight:700; cursor:pointer; transition:transform 0.15s, box-shadow 0.15s; }
        .next-btn:hover { transform:translateY(-2px); }
        @media(max-width:480px) { .q-text{font-size:17px !important} .quiz-pad{padding:1.5rem 1.25rem !important} }
      `}</style>

      <main style={{ minHeight:'100vh', background:'#FAFAFA', fontFamily:'system-ui,sans-serif', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'1rem 1.25rem' }}>

        <div style={{ width:'100%', maxWidth:560, marginBottom:'1.25rem' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10 }}>
            <button className="back-btn" onClick={handleBack}>← ย้อนกลับ</button>
            <div style={{ fontSize:14, color:'#94A3B8', fontWeight:600 }}>
              <span style={{ color: accentColor, fontSize:16, fontWeight:800 }}>{current + 1}</span>
              <span style={{ color:'#CBD5E1' }}> / {archetypeQuestions.length}</span>
            </div>
          </div>

          {/* Progress bar — เปลี่ยนสีตาม top archetype */}
          <div style={{ height:7, background:'#E5E7EB', borderRadius:4, overflow:'hidden' }}>
            <div style={{ height:'100%', width:`${progress}%`, background:accentColor, borderRadius:4, transition:'width 0.4s ease, background 0.6s ease', boxShadow:`0 0 8px ${accentColor}66` }} />
          </div>
          <div style={{ fontSize:13, color:'#C4C9D4', marginTop:8, textAlign:'center' }}>{progressLabels[labelIdx]}</div>
        </div>

        <div className="q-wrap" style={{ width:'100%', maxWidth:560, background:'#fff', borderRadius:22, boxShadow:'0 4px 32px rgba(0,0,0,0.08)', overflow:'hidden' }}>
          <div className="quiz-pad" style={{ padding:'2rem 1.75rem' }}>
            <div className="q-text" style={{ fontSize:20, fontWeight:700, color:'#111', lineHeight:1.6, textAlign:'center', marginBottom:'1.75rem' }}>
              {q.scenario}
            </div>

            <div style={{ display:'flex', flexDirection:'column', gap:11 }}>
              {q.options.map((opt, i) => {
                const isSel = selected === i
                return (
                  <button
                    key={i}
                    className="opt-btn"
                    onClick={() => handleSelect(i)}
                    style={{
                      border: isSel ? `2px solid ${accentColor}` : '1.5px solid #E5E7EB',
                      background: isSel ? `${accentColor}12` : '#FAFAFA',
                      boxShadow: isSel ? `0 2px 16px ${accentColor}25` : 'none',
                      animationDelay: `${i * 0.05}s`,
                    }}
                  >
                    <div style={{ width:32, height:32, borderRadius:10, flexShrink:0, background: isSel ? accentColor : '#fff', border: isSel ? 'none' : '1.5px solid #E5E7EB', display:'flex', alignItems:'center', justifyContent:'center', fontSize:13, fontWeight:700, color: isSel ? '#fff' : '#94A3B8' }}>
                      {['A','B','C','D'][i]}
                    </div>
                    <div style={{ fontSize:16, color: isSel ? '#111' : '#374151', lineHeight:1.5, fontWeight: isSel ? 600 : 400 }}>
                      {opt.text}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          <div style={{ padding:'0.5rem 1.75rem 1rem', background:'#F8FAFC', display:'flex', justifyContent:'center' }}>
            <div style={{ display:'flex', gap:4 }}>
              {archetypeQuestions.map((_, i) => (
                <div key={i} style={{ width: i === current ? 16 : 6, height:6, borderRadius:3, background: i < current ? accentColor : i === current ? accentColor : '#E2E8F0', transition:'all 0.3s ease', opacity: i < current ? 0.5 : 1 }} />
              ))}
            </div>
          </div>
        </div>

        <div style={{ marginTop:'1.5rem', fontSize:12, color:'#ddd' }}>© 2026 ZUME Datalab</div>
      </main>
    </>
  )
}
