'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { archetypeQuestions, type ArchetypeKey } from '@/lib/archetypeQuestions'
import Link from 'next/link'

const ANIMALS: Record<string, string> = {
  detective:  'https://d8j0ntlcm91z4.cloudfront.net/user_3Et6nR8Yefq3LxvEYXJM7qntcjL/hf_20260609_062721_92e91c71-dd7e-43f7-9a31-04e9cc758262.png',
  architect:  'https://d8j0ntlcm91z4.cloudfront.net/user_3Et6nR8Yefq3LxvEYXJM7qntcjL/hf_20260609_062916_9567f017-65c7-48fe-b2cc-eecc8ac12df4.png',
  storyteller:'https://d8j0ntlcm91z4.cloudfront.net/user_3Et6nR8Yefq3LxvEYXJM7qntcjL/hf_20260609_063125_03a654e2-0f0b-4cac-9375-e0ebb94485f9.png',
  engineer:   'https://d8j0ntlcm91z4.cloudfront.net/user_3Et6nR8Yefq3LxvEYXJM7qntcjL/hf_20260609_063512_e28707fd-c89e-4a41-b508-6b3c6dac8a53.png',
  scientist:  'https://d8j0ntlcm91z4.cloudfront.net/user_3Et6nR8Yefq3LxvEYXJM7qntcjL/hf_20260609_063739_ecf2a873-eec1-42cc-bfbc-50256ffa3527.png',
  strategist: 'https://d8j0ntlcm91z4.cloudfront.net/user_3Et6nR8Yefq3LxvEYXJM7qntcjL/hf_20260609_063822_56fec52c-976a-45c8-be73-88acc72e0713.png',
}

const ANIMAL_POS: Record<string, string> = {
  detective: 'center 8%', architect: 'center 8%', storyteller: 'center 8%',
  engineer: 'center 8%', scientist: '65% 8%', strategist: 'center 8%',
}

const ACCENT: Record<string, string> = {
  detective: '#F59E0B', architect: '#2563EB', storyteller: '#EC4899',
  engineer: '#10B981', scientist: '#8B5CF6', strategist: '#EF4444',
}

const CARDS = [
  { key:'detective',  name:'นักสืบข้อมูล',      role:'The Detective'  },
  { key:'architect',  name:'นักออกแบบระบบ',     role:'The Architect'  },
  { key:'storyteller',name:'นักเล่าเรื่อง',      role:'The Storyteller'},
  { key:'engineer',   name:'นักสร้างระบบ',      role:'The Engineer'   },
  { key:'scientist',  name:'นักทดสอบสมมติฐาน', role:'The Scientist'  },
  { key:'strategist', name:'นักกลยุทธ์',        role:'The Strategist' },
]

const CSS = `
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{--ink:#111318;--ink2:#3D4451;--ink3:#6B7280;--ink4:#9CA3AF;--blue:#2563EB;--blue-lt:#DBEAFE;--warm:#FAFAF8;--white:#FFFFFF;--border:#E5E7EB;--border2:#F3F4F6}
html{font-family:'Inter',-apple-system,sans-serif;background:var(--white);color:var(--ink);-webkit-font-smoothing:antialiased}
.nav{position:sticky;top:0;z-index:200;height:58px;background:rgba(255,255,255,0.92);backdrop-filter:blur(16px);border-bottom:1px solid var(--border);display:flex;align-items:center}
.nav-inner{width:100%;max-width:1120px;margin:0 auto;padding:0 28px;display:flex;justify-content:space-between;align-items:center}
.logo{font-size:16px;font-weight:800;color:var(--ink);text-decoration:none;letter-spacing:-0.4px}
.logo-dot{color:var(--blue)}
.back-link{font-size:13px;color:var(--ink3);text-decoration:none;display:flex;align-items:center;gap:6px;transition:color .15s}
.back-link:hover{color:var(--ink)}

.intro-wrap{max-width:640px;margin:0 auto;padding:72px 24px 56px;text-align:center}
.intro-eyebrow{font-size:11px;font-weight:600;color:var(--blue);letter-spacing:.12em;text-transform:uppercase;margin-bottom:16px}
.intro-h1{font-size:clamp(28px,5vw,44px);font-weight:800;color:var(--ink);letter-spacing:-1.2px;line-height:1.1;margin-bottom:16px}
.intro-sub{font-size:16px;color:var(--ink3);line-height:1.75;margin-bottom:40px}
.btn-start{display:inline-flex;align-items:center;gap:8px;background:var(--ink);color:#fff;font-size:15px;font-weight:600;padding:14px 32px;border-radius:10px;text-decoration:none;border:none;cursor:pointer;box-shadow:0 1px 3px rgba(0,0,0,.18),0 4px 12px rgba(0,0,0,.1);transition:transform .15s,box-shadow .15s}
.btn-start:hover{transform:translateY(-2px);box-shadow:0 2px 6px rgba(0,0,0,.2),0 8px 24px rgba(0,0,0,.12)}
.intro-note{font-size:12px;color:var(--ink4);margin-top:12px}

.animal-grid{display:grid;grid-template-columns:repeat(6,1fr);gap:12px;max-width:720px;margin:0 auto 48px}
.animal-card{border:1px solid var(--border);border-radius:14px;padding:16px 8px 12px;text-align:center;background:var(--white);transition:border-color .18s,box-shadow .18s,transform .18s;cursor:default}
.animal-card:hover{transform:translateY(-4px);box-shadow:0 8px 24px rgba(0,0,0,.08)}
.animal-img-wrap{width:56px;height:56px;border-radius:50%;overflow:hidden;background:var(--warm);margin:0 auto 8px}
.animal-img-wrap img{width:100%;height:110%;object-fit:cover;mix-blend-mode:multiply}
.animal-role{font-size:9px;font-weight:600;color:var(--blue);letter-spacing:.08em;text-transform:uppercase;margin-bottom:3px}
.animal-name{font-size:12px;font-weight:600;color:var(--ink)}

.quiz-outer{min-height:calc(100vh - 58px);background:var(--warm);display:flex;flex-direction:column;align-items:center;justify-content:center;padding:24px}
.progress-bar-wrap{width:100%;max-width:600px;margin-bottom:20px}
.progress-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:10px}
.progress-back{background:none;border:none;font-size:13px;color:var(--ink4);cursor:pointer;display:flex;align-items:center;gap:5px;transition:color .15s;padding:0}
.progress-back:hover{color:var(--ink3)}
.progress-count{font-size:13px;font-weight:600;color:var(--ink3)}
.progress-count em{font-style:normal;font-size:15px;font-weight:800}
.progress-track{height:5px;background:var(--border);border-radius:3px;overflow:hidden}
.progress-fill{height:100%;border-radius:3px;transition:width .4s ease,background .6s ease}

.quiz-card{width:100%;max-width:600px;background:var(--white);border:1px solid var(--border);border-radius:20px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.06)}
.quiz-q{padding:32px 28px 24px;font-size:18px;font-weight:700;color:var(--ink);line-height:1.65;text-align:center}
.quiz-opts{display:flex;flex-direction:column;gap:8px;padding:0 20px 24px}
.opt-btn{width:100%;text-align:left;background:var(--warm);border:1.5px solid var(--border);border-radius:12px;padding:15px 18px;font-size:15px;color:var(--ink2);font-family:inherit;cursor:pointer;transition:transform .15s,box-shadow .15s,border-color .15s,background .15s;display:flex;align-items:center;gap:12px;line-height:1.5}
.opt-btn:hover{transform:translateX(4px);box-shadow:0 4px 16px rgba(0,0,0,.07);border-color:#94A3B8;background:var(--white)}
.opt-btn.selected{background:var(--white);box-shadow:0 4px 16px rgba(0,0,0,.07);transform:translateX(4px)}
.opt-key{width:28px;height:28px;border-radius:7px;background:var(--border2);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:var(--ink4);flex-shrink:0;transition:background .15s,color .15s}
.opt-btn.selected .opt-key{color:#fff}

.quiz-footer{background:var(--warm);padding:14px 20px;display:flex;justify-content:flex-end;border-top:1px solid var(--border2)}
.btn-next{border:none;border-radius:10px;padding:11px 28px;font-size:14px;font-weight:700;cursor:pointer;transition:transform .15s,box-shadow .15s;font-family:inherit}
.btn-next:enabled:hover{transform:translateY(-2px)}
.btn-next:disabled{opacity:.4;cursor:default}

@keyframes slideIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
.q-anim{animation:slideIn .25s ease both}

@media(max-width:540px){
  .animal-grid{grid-template-columns:repeat(3,1fr)}
  .quiz-q{font-size:16px;padding:24px 20px 16px}
  .quiz-opts{padding:0 14px 18px}
}
`

export default function ArchetypePage() {
  const router = useRouter()
  const [started, setStarted] = useState(false)
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [scores, setScores] = useState<Record<ArchetypeKey, number>>({ detective:0, architect:0, storyteller:0, engineer:0, scientist:0, strategist:0 })
  const [history, setHistory] = useState<{ scores: Record<ArchetypeKey, number> }[]>([])
  const [animating, setAnimating] = useState(false)

  const q = archetypeQuestions[current]
  const total = archetypeQuestions.length
  const progress = (current / total) * 100
  const isLast = current === total - 1
  const topKey = Object.entries(scores).sort((a,b) => b[1]-a[1])[0][0] as ArchetypeKey
  const accent = ACCENT[topKey]

  const pColor = current / total < 0.4 ? '#EF4444' : current / total < 0.7 ? '#F59E0B' : '#10B981'

  const handleSelect = (i: number) => {
    if (animating) return
    setSelected(i)
    setAnimating(true)
    const newScores = { ...scores }
    Object.entries(q.options[i].scores).forEach(([k,v]) => { newScores[k as ArchetypeKey] += v })
    setHistory(h => [...h, { scores: { ...scores } }])
    setScores(newScores)
    setTimeout(() => {
      if (isLast) {
        const result = Object.entries(newScores).sort((a,b) => b[1]-a[1])[0][0]
        router.push('/archetype/result?type=' + result)
      } else {
        setCurrent(c => c+1); setSelected(null); setAnimating(false)
      }
    }, 350)
  }

  const handleBack = () => {
    if (current === 0) { setStarted(false); return }
    const prev = history[history.length-1]
    setScores(prev.scores); setHistory(h => h.slice(0,-1))
    setCurrent(c => c-1); setSelected(null); setAnimating(false)
  }

  const Navbar = () => (
    <nav className="nav">
      <div className="nav-inner">
        <Link href="/" className="logo">ZUME<span className="logo-dot">.</span>Datalab</Link>
        {started
          ? <button className="back-link" onClick={handleBack} style={{background:'none',border:'none',cursor:'pointer'}}>← ย้อนกลับ</button>
          : <Link href="/" className="back-link">← หน้าแรก</Link>
        }
      </div>
    </nav>
  )

  if (!started) return (
    <>
      <style>{CSS}</style>
      <Navbar />
      <div style={{ background:'var(--white)', minHeight:'calc(100vh - 58px)' }}>
        <div className="intro-wrap">
          <div className="intro-eyebrow">Data Archetype Quiz</div>
          <h1 className="intro-h1">คุณเป็น Data<br />สายไหนกันนะ?</h1>
          <p className="intro-sub">15 คำถามสั้นๆ ไม่มีผิดไม่มีถูก<br />กดคำตอบที่เป็นตัวคุณที่สุดได้เลย</p>

          <div className="animal-grid">
            {CARDS.map(c => (
              <div key={c.key} className="animal-card" style={{ borderColor: `${ACCENT[c.key]}33` }}>
                <div className="animal-img-wrap">
                  <img src={ANIMALS[c.key]} alt={c.name} style={{ objectPosition: ANIMAL_POS[c.key] }} />
                </div>
                <div className="animal-role">{c.role}</div>
                <div className="animal-name">{c.name}</div>
              </div>
            ))}
          </div>

          <button className="btn-start" onClick={() => setStarted(true)}>เริ่มเลย →</button>
          <p className="intro-note">ใช้เวลาแค่ 3 นาที · ฟรี</p>
        </div>
      </div>
    </>
  )

  return (
    <>
      <style>{CSS}</style>
      <Navbar />
      <div className="quiz-outer">
        <div className="progress-bar-wrap">
          <div className="progress-top">
            <button className="progress-back" onClick={handleBack}>← ย้อนกลับ</button>
            <div className="progress-count">
              <em style={{ color: accent }}>{current+1}</em> / {total}
            </div>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width:`${progress}%`, background: pColor }} />
          </div>
        </div>

        <div className="quiz-card q-anim" key={current}>
          <div className="quiz-q">{q.scenario}</div>
          <div className="quiz-opts">
            {q.options.map((opt, i) => {
              const keys = ['A','B','C','D']
              const isSel = selected === i
              return (
                <button
                  key={i}
                  className={`opt-btn${isSel ? ' selected' : ''}`}
                  onClick={() => handleSelect(i)}
                  style={isSel ? { borderColor: accent } : {}}
                >
                  <span className="opt-key" style={isSel ? { background: accent } : {}}>{keys[i]}</span>
                  {opt.text}
                </button>
              )
            })}
          </div>
          <div className="quiz-footer">
            <button
              className="btn-next"
              disabled={selected === null}
              onClick={() => selected !== null && handleSelect(selected)}
              style={{ background: selected !== null ? accent : '#E5E7EB', color: selected !== null ? '#fff' : '#94A3B8' }}
            >
              {isLast ? 'ดูผลลัพธ์ →' : 'ต่อไป →'}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
