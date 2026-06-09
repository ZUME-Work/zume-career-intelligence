'use client'
import { useEffect, useRef, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { createSupabaseBrowser } from '@/lib/supabase'
import type { Question } from '@/lib/types'

const CSS = `
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{font-family:'Inter',-apple-system,sans-serif;-webkit-font-smoothing:antialiased}
.nav{position:sticky;top:0;z-index:200;height:56px;background:rgba(10,10,10,0.92);backdrop-filter:blur(16px);border-bottom:1px solid rgba(255,255,255,0.07);display:flex;align-items:center}
.nav-inner{width:100%;max-width:1120px;margin:0 auto;padding:0 24px;display:flex;justify-content:space-between;align-items:center}
.logo{font-size:15px;font-weight:800;color:#fff;text-decoration:none;letter-spacing:-0.4px}
.logo-dot{color:#6366F1}
.nav-right{display:flex;align-items:center;gap:12px}
.skill-badge{font-size:11px;font-weight:600;color:#6366F1;background:rgba(99,102,241,0.12);padding:4px 10px;border-radius:5px;letter-spacing:.06em;text-transform:uppercase}
.nav-exit{background:none;border:none;font-size:13px;color:rgba(255,255,255,0.3);cursor:pointer;font-family:inherit;transition:color .15s;padding:4px 8px}
.nav-exit:hover{color:rgba(255,255,255,0.6)}

.progress-bar-outer{height:2px;background:rgba(255,255,255,0.07);width:100%}
.progress-bar-inner{height:100%;transition:width .4s ease,background .6s ease}

.main{min-height:calc(100vh - 58px);background:#0A0A0A;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:24px}
.quiz-meta{width:100%;max-width:600px;display:flex;justify-content:space-between;align-items:center;margin-bottom:20px}
.meta-left{display:flex;align-items:center;gap:8px}
.meta-back{background:none;border:none;color:rgba(255,255,255,0.25);font-size:13px;cursor:pointer;font-family:inherit;transition:color .15s;padding:0;display:flex;align-items:center;gap:5px}
.meta-back:hover{color:rgba(255,255,255,0.5)}
.meta-count{font-size:13px;color:rgba(255,255,255,0.25);font-weight:500}
.meta-count em{font-style:normal;font-size:16px;font-weight:800;color:#6366F1}
.meta-timer{font-size:12px;color:rgba(255,255,255,0.2);font-variant-numeric:tabular-nums}

.quiz-card{width:100%;max-width:600px;background:#111;border:1px solid rgba(255,255,255,0.07);border-radius:18px;overflow:hidden}
@keyframes slideIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
.q-anim{animation:slideIn .22s ease both}
.quiz-q{padding:32px 28px 24px;font-size:18px;font-weight:600;color:#fff;line-height:1.65;text-align:center}
.quiz-opts{display:flex;flex-direction:column;gap:8px;padding:0 20px 24px}
.opt-btn{width:100%;text-align:left;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:12px;padding:15px 18px;font-size:15px;color:rgba(255,255,255,0.6);font-family:inherit;cursor:pointer;transition:transform .15s,border-color .15s,background .15s,color .15s;display:flex;align-items:center;gap:12px;line-height:1.5}
.opt-btn:hover{transform:translateX(4px);border-color:rgba(255,255,255,0.18);background:rgba(255,255,255,0.06);color:rgba(255,255,255,0.9)}
.opt-btn.sel{border-color:#6366F1;background:rgba(99,102,241,0.1);color:#fff;transform:translateX(4px)}
.opt-key{width:28px;height:28px;border-radius:7px;background:rgba(255,255,255,0.06);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:rgba(255,255,255,0.3);flex-shrink:0;transition:background .15s,color .15s}
.opt-btn.sel .opt-key{background:#6366F1;color:#fff}
.quiz-footer{background:rgba(255,255,255,0.02);padding:14px 20px;display:flex;justify-content:space-between;align-items:center;border-top:1px solid rgba(255,255,255,0.05)}
.btn-skip{background:none;border:none;font-size:13px;color:rgba(255,255,255,0.2);cursor:pointer;font-family:inherit;transition:color .15s}
.btn-skip:hover{color:rgba(255,255,255,0.4)}
.btn-next{border:none;border-radius:9px;padding:11px 28px;font-size:14px;font-weight:600;cursor:pointer;font-family:inherit;transition:transform .15s,box-shadow .15s,opacity .15s}
.btn-next:enabled:hover{transform:translateY(-2px)}
.btn-next:disabled{opacity:.3;cursor:default}

.loader{min-height:100vh;background:#0A0A0A;display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,0.3);font-family:'Inter',sans-serif;font-size:14px}
.spinner{width:36px;height:36px;border:2px solid rgba(255,255,255,0.08);border-top-color:#6366F1;border-radius:50%;animation:spin .8s linear infinite;margin-bottom:12px}
.spin-wrap{display:flex;flex-direction:column;align-items:center;gap:10px}
@keyframes spin{to{transform:rotate(360deg)}}

.exit-modal{min-height:100vh;background:#0A0A0A;display:flex;align-items:center;justify-content:center;padding:24px;font-family:'Inter',sans-serif}
.modal-box{background:#141414;border:1px solid rgba(255,255,255,0.08);border-radius:20px;padding:32px 28px;max-width:360px;width:100%;text-align:center}
.modal-title{font-size:20px;font-weight:700;color:#fff;margin-bottom:8px;letter-spacing:-0.3px}
.modal-sub{font-size:14px;color:rgba(255,255,255,0.4);line-height:1.7;margin-bottom:28px}
.btn-exit-confirm{display:block;width:100%;background:#EF4444;color:#fff;border:none;padding:14px;border-radius:11px;font-size:15px;font-weight:700;cursor:pointer;font-family:inherit;margin-bottom:8px;transition:opacity .15s}
.btn-exit-confirm:hover{opacity:.9}
.btn-continue{display:block;width:100%;background:rgba(255,255,255,0.05);color:rgba(255,255,255,0.5);border:1px solid rgba(255,255,255,0.07);padding:14px;border-radius:11px;font-size:14px;font-weight:500;cursor:pointer;font-family:inherit;transition:background .15s}
.btn-continue:hover{background:rgba(255,255,255,0.08)}
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
    supabase.from('questions').select('*').eq('skill', skill).eq('is_active', true).order('question_id', { ascending: true }).limit(10)
      .then(({ data }) => { if (data) setQuestions(data); setLoading(false) })
  }, [skill])

  useEffect(() => {
    if (redirecting) return
    const t = setInterval(() => setSeconds(s => s + 1), 1000)
    return () => clearInterval(t)
  }, [redirecting])

  const fmt = (s: number) => `${Math.floor(s/60)}:${(s%60).toString().padStart(2,'0')}`
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
    if (current + 1 < questions.length) { setCurrent(c => c+1); isSubmitting.current = false; return }
    setRedirecting(true)
    const correct = questions.filter(q => newAnswers[q.question_id] === q.correct_answer).length
    const score = Math.round((correct / questions.length) * 100)
    const res = await fetch('/api/submit-assessment', {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ skill, score, totalQuestions:questions.length, correctCount:correct, durationSec:seconds,
        responses: questions.map(q => ({ questionId:q.question_id, userAnswer:newAnswers[q.question_id]??null, isCorrect:newAnswers[q.question_id]===q.correct_answer })) }),
    })
    const result = await res.json()
    if (!res.ok) { setRedirecting(false); isSubmitting.current = false; return }
    router.push(`/results/${result.assessmentId}`)
  }

  if (loading) return <><style>{CSS}</style><div className="loader"><div className="spin-wrap"><div className="spinner"/><span>กำลังโหลด...</span></div></div></>
  if (redirecting) return <><style>{CSS}</style><div className="loader"><div className="spin-wrap"><div className="spinner" style={{borderTopColor:'#10B981'}}/><span>กำลังคำนวณผล...</span></div></div></>
  if (showExit) return (
    <><style>{CSS}</style>
    <div className="exit-modal">
      <div className="modal-box">
        <div className="modal-title">ออกจากแบบทดสอบ?</div>
        <p className="modal-sub">คำตอบที่ทำไปแล้วจะไม่ถูกบันทึก</p>
        <a href="/" className="btn-exit-confirm">ออกเลย</a>
        <button className="btn-continue" onClick={() => setShowExit(false)}>ทำต่อเลย</button>
      </div>
    </div></>
  )
  if (!questions.length) return <><style>{CSS}</style><div className="loader">ไม่พบคำถาม</div></>

  const q = questions[current]
  return (
    <><style>{CSS}</style>
    <nav className="nav">
      <div className="nav-inner">
        <a href="/" className="logo">ZUME<span className="logo-dot">.</span>Datalab</a>
        <div className="nav-right">
          <span className="skill-badge">{LABEL[skill]??skill}</span>
          <span className="meta-timer">⏱ {fmt(seconds)}</span>
          <button className="nav-exit" onClick={() => setShowExit(true)}>✕ ออก</button>
        </div>
      </div>
    </nav>
    <div className="progress-bar-outer">
      <div className="progress-bar-inner" style={{ width:`${pct}%`, background:pColor }}/>
    </div>
    <div className="main">
      <div className="quiz-meta">
        <div className="meta-left">
          <button className="meta-back" onClick={() => current > 0 ? (setCurrent(c=>c-1), setSelected(null)) : setShowExit(true)}>← ย้อนกลับ</button>
        </div>
        <div className="meta-count"><em style={{color:pColor}}>{current+1}</em> / {questions.length}</div>
      </div>
      <div className="quiz-card q-anim" key={current}>
        <div className="quiz-q">{q.question_text}</div>
        <div className="quiz-opts">
          {q.options.map((opt, i) => {
            const key = ['A','B','C','D'][i]
            const isSel = selected === key
            return (
              <button key={key} className={`opt-btn${isSel?' sel':''}`} onClick={() => setSelected(key)}>
                <span className="opt-key">{key}</span>
                {opt.replace(/^[ABCD]\.\s/,'')}
              </button>
            )
          })}
        </div>
        <div className="quiz-footer">
          <button className="btn-skip" onClick={() => { setSelected(null); if(current+1<questions.length) setCurrent(c=>c+1) }}>ข้ามข้อนี้</button>
          <button className="btn-next" onClick={handleNext} disabled={!selected}
            style={{ background:selected?pColor:'rgba(255,255,255,0.08)', color:selected?'#fff':'rgba(255,255,255,0.25)', boxShadow:selected?`0 4px 14px ${pColor}44`:'none' }}>
            {current+1===questions.length ? 'ส่งคำตอบ' : 'ถัดไป →'}
          </button>
        </div>
      </div>
    </div>
    </>
  )
}
