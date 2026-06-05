'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { archetypeQuestions, type ArchetypeKey } from '@/lib/archetypeQuestions'

export default function ArchetypePage() {
  const router = useRouter()
  const [started, setStarted] = useState(false)
  const [current, setCurrent] = useState(0)
  const [scores, setScores] = useState<Record<ArchetypeKey, number>>({
    detective: 0, architect: 0, storyteller: 0,
    engineer: 0, scientist: 0, strategist: 0,
  })
  const [history, setHistory] = useState<{ scores: Record<ArchetypeKey, number> }[]>([])
  const [animating, setAnimating] = useState(false)
  const [selected, setSelected] = useState<number | null>(null)

  const q = archetypeQuestions[current]
  const progress = (current / archetypeQuestions.length) * 100
  const isLast = current === archetypeQuestions.length - 1

  const progressLabels = [
    'เพิ่งเริ่ม แต่ไปได้เรื่อยๆ',
    'กำลังอุ่นเครื่อง',
    'เริ่มจับ pattern แล้ว',
    'ครึ่งทางแล้ว!',
    'เกินครึ่งแล้ว ไปต่อ!',
    'เกือบถึงแล้ว',
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
    }, 400)
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
        .f1{animation:fadeUp 0.5s ease both}
        .f2{animation:fadeUp 0.5s 0.1s ease both}
        .f3{animation:fadeUp 0.5s 0.2s ease both}
        .f4{animation:fadeUp 0.5s 0.3s ease both}
        .f5{animation:fadeUp 0.5s 0.4s ease both}
        .arch-mini {
          border-radius:16px; padding:20px 12px; text-align:center;
          animation:float ease-in-out infinite;
          transition:transform 0.2s, box-shadow 0.2s;
          box-shadow:0 2px 8px rgba(0,0,0,0.06);
        }
        .arch-mini:hover { transform:translateY(-8px) !important; box-shadow:0 16px 32px rgba(0,0,0,0.12); animation:none; }
        .start-btn {
          width:100%; background:#4F46E5; color:#fff; border:none;
          border-radius:16px; padding:18px; font-size:18px; font-weight:700;
          cursor:pointer; box-shadow:0 6px 24px rgba(79,70,229,0.35);
          transition:transform 0.18s, box-shadow 0.18s;
        }
        .start-btn:hover { transform:translateY(-3px); box-shadow:0 12px 32px rgba(79,70,229,0.45); }
        .start-btn:active { transform:translateY(0); }
        .back-link { color:#bbb; font-size:14px; text-decoration:none; transition:color 0.15s; }
        .back-link:hover { color:#555; }
        @media(max-width:540px) {
          .intro-pad { padding:48px 20px 40px !important; }
          .arch-intro-grid { grid-template-columns:repeat(3,1fr) !important; }
        }
      `}</style>

      <main style={{ minHeight:'100vh', background:'#fff', fontFamily:'system-ui,sans-serif', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'2rem 1.5rem' }}>
        <div style={{ width:'100%', maxWidth:520 }}>

          <a href="/" className="back-link" style={{ display:'inline-block', marginBottom:36 }}>← กลับหน้าแรก</a>

          <div className="f1" style={{ fontSize:12, fontWeight:700, color:'#4F46E5', letterSpacing:1.5, textTransform:'uppercase', marginBottom:16 }}>
            Data Archetype
          </div>

          <h1 className="f2" style={{ fontSize:'clamp(1.9rem,5vw,2.6rem)', fontWeight:800, color:'#111', lineHeight:1.2, marginBottom:16, letterSpacing:'-0.3px' }}>
            คุณเป็น Data<br />สายไหนกันนะ?
          </h1>

          <p className="f3" style={{ fontSize:17, color:'#666', lineHeight:1.8, marginBottom:12 }}>
            15 คำถามสั้นๆ ไม่มีผิดไม่มีถูก
          </p>
          <p className="f3" style={{ fontSize:17, color:'#666', lineHeight:1.8, marginBottom:40 }}>
            กดคำตอบที่เป็นตัวคุณที่สุดได้เลย
          </p>

          <div className="f4 arch-intro-grid" style={{ display:'grid', gridTemplateColumns:'repeat(6,1fr)', gap:10, marginBottom:40 }}>
            {[
              { emoji:'🦊', name:'นักสืบ',    bg:'#FEF9EE', border:'#F59E0B', delay:'0s'   },
              { emoji:'🦅', name:'นักออกแบบ', bg:'#EFF6FF', border:'#3B82F6', delay:'0.4s' },
              { emoji:'🦋', name:'นักเล่า',   bg:'#FDF2F8', border:'#EC4899', delay:'0.8s' },
              { emoji:'🦫', name:'นักสร้าง',  bg:'#F0FDF4', border:'#10B981', delay:'1.2s' },
              { emoji:'🦉', name:'นักทดสอบ',  bg:'#F5F3FF', border:'#8B5CF6', delay:'1.6s' },
              { emoji:'🐆', name:'นักกลยุทธ์',bg:'#FFF1F2', border:'#EF4444', delay:'2s'   },
            ].map((a) => (
              <div key={a.name} className="arch-mini" style={{ background:a.bg, border:`1px solid ${a.border}33`, animationDuration:'3.5s', animationDelay:a.delay }}>
                <div style={{ fontSize:26, marginBottom:6 }}>{a.emoji}</div>
                <div style={{ fontSize:11, color:'#444', fontWeight:600, lineHeight:1.3 }}>{a.name}</div>
              </div>
            ))}
          </div>

          <button className="f5 start-btn" onClick={() => setStarted(true)}>
            เริ่มเลย
          </button>
          <p style={{ fontSize:13, color:'#ccc', textAlign:'center', marginTop:14 }}>ใช้เวลาแค่ 3 นาที · ฟรี</p>

        </div>
      </main>
    </>
  )

  return (
    <>
      <style>{`
        * { box-sizing:border-box; margin:0; padding:0; }
        @keyframes slideIn { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pop { 0%{transform:scale(1)} 50%{transform:scale(0.97)} 100%{transform:scale(1)} }
        .q-wrap { animation:slideIn 0.3s ease both; }
        .opt-card {
          cursor:pointer; border-radius:16px; padding:18px 20px;
          transition:transform 0.15s, box-shadow 0.15s, border-color 0.15s, background 0.15s;
          -webkit-tap-highlight-color:transparent;
          box-shadow:0 1px 4px rgba(0,0,0,0.05);
        }
        .opt-card:hover {
          transform:translateY(-4px);
          box-shadow:0 10px 28px rgba(0,0,0,0.1);
          border-color:#A5B4FC !important;
          background:#F5F3FF !important;
        }
        .opt-card.selected {
          transform:scale(0.98);
          background:#EEF2FF !important;
          border-color:#4F46E5 !important;
          box-shadow:0 4px 16px rgba(79,70,229,0.2);
          animation:pop 0.3s ease;
        }
        .back-btn {
          background:none; border:none; font-size:14px; color:#bbb;
          cursor:pointer; padding:0; display:flex; align-items:center; gap:6px;
          transition:color 0.15s;
        }
        .back-btn:hover { color:#555; }
        @media(max-width:480px) {
          .quiz-pad { padding:1.5rem 1.25rem !important; }
          .q-text { font-size:18px !important; }
          .opt-text { font-size:15px !important; }
        }
      `}</style>

      <main style={{ minHeight:'100vh', background:'#FAFAFA', fontFamily:'system-ui,sans-serif', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'1rem 1.25rem' }}>

        {/* Top bar */}
        <div style={{ width:'100%', maxWidth:560, marginBottom:'1.25rem' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10 }}>
            <button className="back-btn" onClick={handleBack}>← ย้อนกลับ</button>
            <div style={{ fontSize:14, color:'#94A3B8', fontWeight:500 }}>
              {current + 1} / {archetypeQuestions.length}
            </div>
          </div>
          <div style={{ height:6, background:'#E5E7EB', borderRadius:3, overflow:'hidden' }}>
            <div style={{ height:'100%', width:`${progress}%`, background:'#4F46E5', borderRadius:3, transition:'width 0.4s ease' }} />
          </div>
          <div style={{ fontSize:13, color:'#C4C9D4', marginTop:8, textAlign:'center' }}>
            {progressLabels[labelIdx]}
          </div>
        </div>

        {/* Card */}
        <div className="q-wrap" style={{ width:'100%', maxWidth:560, background:'#fff', borderRadius:24, boxShadow:'0 4px 32px rgba(0,0,0,0.08)', overflow:'hidden' }}>

          <div className="quiz-pad" style={{ padding:'2rem 1.75rem' }}>

            {/* Question */}
            <div className="q-text" style={{ fontSize:21, fontWeight:700, color:'#111', lineHeight:1.6, textAlign:'center', marginBottom:'2rem' }}>
              {q.scenario}
            </div>

            {/* Options — กดแล้วเลือกเลย ไม่ต้องกด submit */}
            <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
              {q.options.map((opt, i) => (
                <div
                  key={i}
                  className={`opt-card${selected === i ? ' selected' : ''}`}
                  onClick={() => handleSelect(i)}
                  style={{
                    border: selected === i ? '2px solid #4F46E5' : '1.5px solid #E5E7EB',
                    background: selected === i ? '#EEF2FF' : '#fff',
                  }}
                >
                  <div className="opt-text" style={{ fontSize:16, color: selected === i ? '#1E1B4B' : '#374151', lineHeight:1.6, fontWeight: selected === i ? 600 : 400 }}>
                    {opt.text.replace(/^[🔍📊⚙️🎯🧹🗺️💡📈⚖️🚀📐👥🧪📢🔍⏳🔭🏗️🗣️♟️🎨🤔📚✂️🏗️🗣️❓🎯🕵️📊⚙️🔬📞📖🎯🔬📊📋🎭🤝🔒🔬🏗️📣🎨🔭🌉🏗️🧪✅💡🚀🌉😤📝🤷👨‍🏫]\s*/u, '')}
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Dot progress */}
          <div style={{ padding:'0.75rem 1.75rem 1.25rem', display:'flex', justifyContent:'center', gap:5 }}>
            {archetypeQuestions.map((_, i) => (
              <div key={i} style={{ width:6, height:6, borderRadius:'50%', background: i < current ? '#4F46E5' : i === current ? '#818CF8' : '#E2E8F0', transition:'background 0.3s' }} />
            ))}
          </div>

        </div>

        <div style={{ marginTop:'1.5rem', fontSize:12, color:'#ddd' }}>© 2026 ZUME Datalab</div>
      </main>
    </>
  )
}
