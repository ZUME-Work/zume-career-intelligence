'use client'
import { useEffect, useRef, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { createSupabaseBrowser } from '@/lib/supabase'
import type { Question } from '@/lib/types'

const CSS = `
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{font-family:-apple-system,'Inter',sans-serif;-webkit-font-smoothing:antialiased;background:#FAFAF8}

.nav{position:sticky;top:0;z-index:100;background:rgba(253,252,251,0.95);backdrop-filter:blur(12px);border-bottom:1px solid #EDE9E3}
.pb{height:3px;background:#EDE9E3}
.pb-f{height:3px;transition:width .4s ease,background .6s ease}
.nav-inner{display:flex;align-items:center;justify-content:space-between;padding:11px 18px}
.nav-l{display:flex;align-items:center;gap:10px}
.back-btn{font-size:13px;color:#B8B0A5;background:none;border:none;cursor:pointer;font-family:inherit;padding:0;line-height:1;transition:color .15s}
.back-btn:hover{color:#6B6560}
.skill-badge{font-size:10px;font-weight:700;background:#F0EDE8;color:#6B6560;padding:3px 8px;border-radius:4px;letter-spacing:.05em;text-transform:uppercase}
.nav-r{display:flex;align-items:center;gap:12px}
.timer{font-size:12px;color:#B8B0A5;font-variant-numeric:tabular-nums;font-family:'SF Mono',monospace}
.exit-btn{font-size:12px;color:#D0C8BF;background:none;border:none;cursor:pointer;font-family:inherit;transition:color .15s}
.exit-btn:hover{color:#9CA3AF}

.main{min-height:calc(100vh - 55px);display:flex;flex-direction:column;align-items:center;justify-content:center;padding:20px 16px 32px}
.q-wrap{width:100%;max-width:560px}
@keyframes qin{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
.q-anim{animation:qin .2s ease both}

.q-num{font-size:11px;font-weight:700;color:#C4BBB0;letter-spacing:.08em;text-transform:uppercase;margin-bottom:10px}
.q-text{font-size:clamp(17px,4vw,20px);font-weight:700;color:#111;line-height:1.5;letter-spacing:-.2px;margin-bottom:24px}
.opts{display:flex;flex-direction:column;gap:8px;margin-bottom:24px}
.opt{display:flex;align-items:center;gap:0;border:1.5px solid #EDE9E3;border-radius:10px;overflow:hidden;cursor:pointer;background:#FDFCFB;transition:border-color .12s,background .12s;-webkit-tap-highlight-color:transparent}
.opt:hover{border-color:#CCC7BF;background:#FAF8F5}
.opt.on{border-color:#111;background:#FDFCFB}
.opt-k{width:42px;height:48px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#C4BBB0;background:#F7F5F1;border-right:1.5px solid #EDE9E3;flex-shrink:0;font-family:'SF Mono',monospace;transition:background .12s,color .12s}
.opt.on .opt-k{background:#111;color:#fff;border-color:#111}
.opt-v{padding:0 16px;font-size:15px;color:#374151;line-height:1.5;flex:1}
.opt.on .opt-v{color:#111;font-weight:500}

.foot{display:flex;justify-content:space-between;align-items:center}
.skip-btn{font-size:13px;color:#C4BBB0;background:none;border:none;cursor:pointer;font-family:inherit;padding:4px 0;transition:color .15s}
.skip-btn:hover{color:#9CA3AF}
.next-btn{background:#111;color:#fff;border:none;border-radius:8px;padding:12px 28px;font-size:14px;font-weight:600;cursor:pointer;font-family:inherit;letter-spacing:-.1px;transition:opacity .15s,transform .15s}
.next-btn:hover{opacity:.88;transform:translateY(-1px)}
.next-btn:disabled{background:#EDE9E3;color:#C4BBB0;cursor:default;transform:none;opacity:1}

.loader{min-height:100vh;background:#FAFAF8;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;font-family:-apple-system,sans-serif}
.spin{width:28px;height:28px;border:2px solid #EDE9E3;border-top-color:#111;border-radius:50%;animation:sp .7s linear infinite}
@keyframes sp{to{transform:rotate(360deg)}}
.spin-lbl{font-size:13px;color:#B8B0A5}

.exit-screen{min-height:calc(100vh - 55px);display:flex;align-items:center;justify-content:center;padding:24px}
.exit-box{width:100%;max-width:340px;text-align:center}
.exit-title{font-size:20px;font-weight:800;color:#111;letter-spacing:-.4px;margin-bottom:8px}
.exit-sub{font-size:14px;color:#B8B0A5;line-height:1.6;margin-bottom:24px}
.exit-red{display:block;width:100%;background:#EF4444;color:#fff;border:none;border-radius:9px;padding:14px;font-size:15px;font-weight:700;cursor:pointer;font-family:inherit;margin-bottom:8px;transition:opacity .15s}
.exit-red:hover{opacity:.9}
.exit-cancel{display:block;width:100%;background:#F0EDE8;color:#6B6560;border:none;border-radius:9px;padding:14px;font-size:14px;font-weight:500;cursor:pointer;font-family:inherit;transition:background .15s}
.exit-cancel:hover{background:#E8E4DC}
`

export default function AssessmentPage() {
  const { skill } = useParams<{ skill: string }>()
  const router = useRouter()
  const [questions, setQuestions] = useState<Question[]>([])
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [seconds, setSeconds] = useState(0)
  const [loading, setLoading] = useState(true)
  const [redirecting, setRedirecting] = useState(false)
  const [showExit, setShowExit] = useState(false)
  const isSubmitting = useRef(false)

  useEffect(() => {
    const supabase = createSupabaseBrowser()
    supabase.from('questions').select('*').eq('skill', skill).eq('is_active', true)
      .order('question_id', { ascending: true }).limit(10)
      .then(({ data }) => { if (data) setQuestions(data); setLoading(false) })
  }, [skill])

  useEffect(() => {
    if (redirecting) return
    const t = setInterval(() => setSeconds(s => s + 1), 1000)
    return () => clearInterval(t)
  }, [redirecting])

  const fmt = (s: number) => `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`
  const LABEL: Record<string,string> = { sql:'SQL', numerical:'Numerical', excel:'Excel', tableau:'Tableau' }

  const pct = questions.length ? (current / questions.length) * 100 : 0
  const pColor = pct < 40 ? '#EF4444' : pct < 70 ? '#F59E0B' : '#10B981'

  const handleNext = async () => {
    if (!selected || isSubmitting.current || redirecting) return
    isSubmitting.current = true
    const q = questions[current]
    const newAnswers = { ...answers, [q.question_id]: selected }
    setAnswers(newAnswers)
    setSelected(null)
    if (current + 1 < questions.length) {
      setCurrent(c => c + 1)
      isSubmitting.current = false
      return
    }
    setRedirecting(true)
    const correct = questions.filter(q => newAnswers[q.question_id] === q.correct_answer).length
    const score = Math.round((correct / questions.length) * 100)
    const res = await fetch('/api/submit-assessment', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ skill, score, totalQuestions: questions.length, correctCount: correct, durationSec: seconds,
        responses: questions.map(q => ({ questionId: q.question_id, userAnswer: newAnswers[q.question_id] ?? null, isCorrect: newAnswers[q.question_id] === q.correct_answer })) }),
    })
    const result = await res.json()
    if (!res.ok) { setRedirecting(false); isSubmitting.current = false; return }
    router.push(`/results/${result.assessmentId}`)
  }

  const handleSkip = () => {
    if (current + 1 < questions.length) { setCurrent(c => c + 1); setSelected(null) }
  }

  const handleBack = () => {
    if (current > 0) { setCurrent(c => c - 1); setSelected(null) }
    else setShowExit(true)
  }

  const NavBar = ({ showBack = true }: { showBack?: boolean }) => (
    <nav className="nav">
      <div className="pb">
        <div className="pb-f" style={{ width: `${pct}%`, background: pColor }} />
      </div>
      <div className="nav-inner">
        <div className="nav-l">
          {showBack && <button className="back-btn" onClick={handleBack}>←</button>}
          <span className="skill-badge">{LABEL[skill] ?? skill}</span>
        </div>
        <div className="nav-r">
          <span className="timer">{fmt(seconds)}</span>
          <button className="exit-btn" onClick={() => setShowExit(true)}>ออก</button>
        </div>
      </div>
    </nav>
  )

  if (loading) return (
    <><style>{CSS}</style>
    <div className="loader"><div className="spin"/><span className="spin-lbl">กำลังโหลด...</span></div></>
  )

  if (redirecting) return (
    <><style>{CSS}</style>
    <div className="loader"><div className="spin" style={{ borderTopColor: '#10B981' }}/><span className="spin-lbl">กำลังคำนวณผล...</span></div></>
  )

  if (showExit) return (
    <><style>{CSS}</style>
    <NavBar showBack={false} />
    <div className="exit-screen">
      <div className="exit-box">
        <div className="exit-title">ออกจากแบบทดสอบ?</div>
        <p className="exit-sub">คำตอบที่ทำไปแล้วจะไม่ถูกบันทึก</p>
        <a href="/" className="exit-red">ออกเลย</a>
        <button className="exit-cancel" onClick={() => setShowExit(false)}>ทำต่อเลย</button>
      </div>
    </div></>
  )

  if (!questions.length) return (
    <><style>{CSS}</style>
    <div className="loader"><span className="spin-lbl">ไม่พบคำถาม</span></div></>
  )

  const q = questions[current]
  const KEYS = ['A','B','C','D']

  return (
    <><style>{CSS}</style>
    <NavBar />
    <div className="main">
      <div className="q-wrap q-anim" key={current}>
        <div className="q-num">ข้อ {current + 1} จาก {questions.length}</div>
        <div className="q-text">{q.question_text}</div>
        <div className="opts">
          {q.options.map((opt, i) => {
            const k = KEYS[i]
            const on = selected === k
            return (
              <div key={k} className={`opt${on ? ' on' : ''}`} onClick={() => setSelected(k)}>
                <div className="opt-k">{k}</div>
                <div className="opt-v">{opt.replace(/^[ABCD]\.\s/, '')}</div>
              </div>
            )
          })}
        </div>
        <div className="foot">
          <button className="skip-btn" onClick={handleSkip}>ข้าม</button>
          <button className="next-btn" onClick={handleNext} disabled={!selected}>
            {current + 1 === questions.length ? 'ส่งคำตอบ' : 'ถัดไป →'}
          </button>
        </div>
      </div>
    </div>
    </>
  )
}
