'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { archetypeQuestions, type ArchetypeKey } from '@/lib/archetypeQuestions'

export default function ArchetypePage() {
  const router = useRouter()
  const [started, setStarted] = useState(false)
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [scores, setScores] = useState<Record<ArchetypeKey, number>>({
    detective: 0, architect: 0, storyteller: 0,
    engineer: 0, scientist: 0, strategist: 0,
  })
  const [history, setHistory] = useState<{ scores: Record<ArchetypeKey, number>, answer: number }[]>([])
  const [animating, setAnimating] = useState(false)

  const q = archetypeQuestions[current]
  const progress = (current / archetypeQuestions.length) * 100
  const isLast = current === archetypeQuestions.length - 1

  const funMessages = [
    'ไม่มีคำตอบผิดถูก เลือกตามความรู้สึกเลย 😊',
    'ยังไงก็ไม่มีคำตอบที่แย่นะ 🙌',
    'เชื่อ first instinct เลย!',
    'กำลังเก็บ vibe ของคุณอยู่...',
    'ใกล้รู้แล้ว อีกนิดเดียว',
    'เกือบถึงแล้ว!',
  ]
  const msgIndex = Math.min(Math.floor((current / archetypeQuestions.length) * funMessages.length), funMessages.length - 1)

  const handleNext = () => {
    if (selected === null || animating) return
    setAnimating(true)
    const newScores = { ...scores }
    const opt = q.options[selected]
    Object.entries(opt.scores).forEach(([k, v]) => { newScores[k as ArchetypeKey] += v })
    setHistory(h => [...h, { scores: { ...scores }, answer: selected }])
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
    }, 250)
  }

  const handleBack = () => {
    if (current === 0) { setStarted(false); return }
    const prev = history[history.length - 1]
    setScores(prev.scores)
    setHistory(h => h.slice(0, -1))
    setCurrent(c => c - 1)
    setSelected(prev.answer)
    setAnimating(false)
  }

  if (!started) return (
    <>
      <style>{`
        * { box-sizing:border-box; margin:0; padding:0; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        .f1{animation:fadeUp 0.5s ease both}
        .f2{animation:fadeUp 0.5s 0.1s ease both}
        .f3{animation:fadeUp 0.5s 0.2s ease both}
        .f4{animation:fadeUp 0.5s 0.3s ease both}
        .arch-mini { border-radius:14px; padding:18px 10px; text-align:center; transition:transform 0.2s,box-shadow 0.2s; animation:float ease-in-out infinite; }
        .arch-mini:hover { transform:translateY(-6px) !important; box-shadow:0 12px 24px rgba(0,0,0,0.1); animation:none; }
        .start-btn { transition:transform 0.18s,box-shadow 0.18s; }
        .start-btn:hover { transform:translateY(-3px); box-shadow:0 10px 32px rgba(79,70,229,0.4) !important; }
        .start-btn:active { transform:translateY(0); }
        .back-link { color:#999; font-size:14px; text-decoration:none; display:inline-flex; align-items:center; gap:6px; transition:color 0.15s; }
        .back-link:hover { color:#333; }
      `}</style>
      <main style={{ minHeight:'100vh', background:'#FAFAFA', fontFamily:'system-ui,sans-serif', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'2rem 1.5rem' }}>
        <div style={{ width:'100%', maxWidth:560 }}>
          <a href="/" className="back-link" style={{ marginBottom:32, display:'inline-flex' }}>← กลับหน้าแรก</a>

          <div className="f1" style={{ fontSize:13, color:'#4F46E5', fontWeight:700, letterSpacing:1, textTransform:'uppercase', marginBottom:14 }}>Data Archetype</div>
          <h1 className="f2" style={{ fontSize:'clamp(2rem,5vw,2.8rem)', fontWeight:800, color:'#111', lineHeight:1.2, marginBottom:16, letterSpacing:'-0.3px' }}>
            คุณเป็น Data<br />สายไหนกันนะ?
          </h1>
          <p className="f3" style={{ fontSize:17, color:'#666', lineHeight:1.8, marginBottom:40 }}>
            ตอบ 15 คำถามสั้นๆ<br />แล้วเราจะบอกว่าคุณถนัดด้านไหน
          </p>

          <div className="f3" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12, marginBottom:40 }}>
            {[
              { emoji:'🦊', name:'นักสืบข้อมูล', bg:'#FEF9EE', border:'#F59E0B', delay:'0s' },
              { emoji:'🦅', name:'นักออกแบบระบบ', bg:'#EFF6FF', border:'#3B82F6', delay:'0.4s' },
              { emoji:'🦋', name:'นักเล่าเรื่อง', bg:'#FDF2F8', border:'#EC4899', delay:'0.8s' },
              { emoji:'🦫', name:'นักสร้าง', bg:'#F0FDF4', border:'#10B981', delay:'1.2s' },
              { emoji:'🦉', name:'นักทดสอบ', bg:'#F5F3FF', border:'#8B5CF6', delay:'1.6s' },
              { emoji:'🐆', name:'นักกลยุทธ์', bg:'#FFF1F2', border:'#EF4444', delay:'2s' },
            ].map((a) => (
              <div key={a.name} className="arch-mini" style={{ background:a.bg, border:`1px solid ${a.border}33`, animationDuration:'3s', animationDelay:a.delay }}>
                <div style={{ fontSize:30, marginBottom:8 }}>{a.emoji}</div>
                <div style={{ fontSize:12, color:'#333', fontWeight:600, lineHeight:1.4 }}>{a.name}</div>
              </div>
            ))}
          </div>

          <button className="f4 start-btn" onClick={() => setStarted(true)} style={{ width:'100%', background:'#4F46E5', color:'#fff', border:'none', borderRadius:14, padding:'17px', fontSize:17, fontWeight:700, cursor:'pointer', boxShadow:'0 4px 20px rgba(79,70,229,0.3)', marginBottom:14 }}>
            เริ่มเลย →
          </button>
          <p style={{ fontSize:14, color:'#bbb', textAlign:'center' }}>ใช้เวลาแค่ 3 นาที · ฟรี · ไม่ต้อง login</p>
        </div>
      </main>
    </>
  )

  return (
    <>
      <style>{`
        * { box-sizing:border-box; margin:0; padding:0; }
        @keyframes slideIn { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        .q-wrap { animation:slideIn 0.28s ease both; }
        .opt-btn { transition:all 0.15s; cursor:pointer; -webkit-tap-highlight-color:transparent; border:none; text-align:left; width:100%; }
        .opt-btn:hover { transform:translateX(3px); }
        .opt-btn:active { transform:scale(0.99); }
        .next-btn { transition:transform 0.18s,box-shadow 0.18s; }
        .next-btn:hover { transform:translateY(-2px); box-shadow:0 8px 20px rgba(79,70,229,0.35) !important; }
        .back-btn { transition:color 0.15s; }
        .back-btn:hover { color:#333 !important; }
        @media(max-width:480px) {
          .q-text { font-size:18px !important; }
          .quiz-pad { padding:1.5rem 1.25rem !important; }
        }
      `}</style>
      <main style={{ minHeight:'100vh', background:'#FAFAFA', fontFamily:'system-ui,sans-serif', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'1rem 1.25rem' }}>

        {/* Progress */}
        <div style={{ width:'100%', maxWidth:580, marginBottom:'1.25rem' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10 }}>
            <button className="back-btn" onClick={handleBack} style={{ background:'none', border:'none', fontSize:14, color:'#aaa', cursor:'pointer', display:'flex', alignItems:'center', gap:6, padding:0 }}>
              ← ย้อนกลับ
            </button>
            <div style={{ fontSize:14, color:'#aaa' }}>{current + 1} / {archetypeQuestions.length}</div>
          </div>
          <div style={{ height:6, background:'#E5E7EB', borderRadius:3 }}>
            <div style={{ height:'100%', width:`${progress}%`, background:'#4F46E5', borderRadius:3, transition:'width 0.4s ease' }} />
          </div>
          <div style={{ fontSize:13, color:'#94A3B8', marginTop:8, textAlign:'center' }}>{funMessages[msgIndex]}</div>
        </div>

        {/* Card */}
        <div className="q-wrap" style={{ width:'100%', maxWidth:580, background:'#fff', borderRadius:20, boxShadow:'0 4px 32px rgba(0,0,0,0.08)', overflow:'hidden' }}>
          <div className="quiz-pad" style={{ padding:'2rem 1.75rem' }}>
            <div style={{ fontSize:44, textAlign:'center', marginBottom:'1.25rem' }}>{q.emoji}</div>
            <div className="q-text" style={{ fontSize:20, fontWeight:700, color:'#111', lineHeight:1.6, textAlign:'center', marginBottom:'1.75rem' }}>
              {q.scenario}
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:11 }}>
              {q.options.map((opt, i) => {
                const isSel = selected === i
                return (
                  <button key={i} className="opt-btn" onClick={() => setSelected(i)} style={{ padding:'15px 18px', borderRadius:13, border: isSel ? '2px solid #4F46E5' : '1.5px solid #E5E7EB', background: isSel ? '#EEF2FF' : '#FAFAFA', display:'flex', alignItems:'center', gap:13, boxShadow: isSel ? '0 2px 12px rgba(79,70,229,0.15)' : 'none' }}>
                    <div style={{ width:32, height:32, borderRadius:10, flexShrink:0, background: isSel ? '#4F46E5' : '#fff', border: isSel ? 'none' : '1.5px solid #E5E7EB', display:'flex', alignItems:'center', justifyContent:'center', fontSize:13, fontWeight:700, color: isSel ? '#fff' : '#94A3B8' }}>
                      {['A','B','C','D'][i]}
                    </div>
                    <div style={{ fontSize:16, color: isSel ? '#1E1B4B' : '#374151', lineHeight:1.5, fontWeight: isSel ? 600 : 400 }}>
                      {opt.text}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Footer */}
          <div style={{ padding:'1rem 1.75rem 1.5rem', background:'#F8FAFC', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <div style={{ display:'flex', gap:4 }}>
              {archetypeQuestions.map((_, i) => (
                <div key={i} style={{ width:6, height:6, borderRadius:'50%', background: i < current ? '#4F46E5' : i === current ? '#818CF8' : '#E2E8F0' }} />
              ))}
            </div>
            <button className="next-btn" onClick={handleNext} disabled={selected === null} style={{ background: selected !== null ? '#4F46E5' : '#E5E7EB', color: selected !== null ? '#fff' : '#94A3B8', border:'none', borderRadius:12, padding:'12px 30px', fontSize:15, fontWeight:700, cursor: selected !== null ? 'pointer' : 'default', boxShadow: selected !== null ? '0 4px 16px rgba(79,70,229,0.25)' : 'none' }}>
              {isLast ? 'ดูผลลัพธ์ 🎉' : 'ต่อไป →'}
            </button>
          </div>
        </div>

        <div style={{ marginTop:'1.5rem', fontSize:12, color:'#ddd' }}>© 2026 ZUME Datalab</div>
      </main>
    </>
  )
}
