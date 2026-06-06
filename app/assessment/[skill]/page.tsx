'use client'
import { useEffect, useRef, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { createSupabaseBrowser } from '@/lib/supabase'
import type { Question } from '@/lib/types'

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
    const timer = setInterval(() => setSeconds(s => s + 1), 1000)
    return () => clearInterval(timer)
  }, [redirecting])

  const formatTime = (s: number) => `${Math.floor(s/60)}:${(s%60).toString().padStart(2,'0')}`
  const skillLabel: Record<string,string> = { sql:'SQL', numerical:'Numerical', excel:'Excel', tableau:'Tableau' }

  const getProgressColor = (cur: number, total: number) => {
    const pct = cur / total
    if (pct < 0.4) return '#EF4444'
    if (pct < 0.7) return '#F59E0B'
    return '#10B981'
  }

  const progressColor = getProgressColor(current, questions.length || 10)
  const progress = questions.length ? (current / questions.length) * 100 : 0

  const handleNext = async () => {
    if (!selected || isSubmitting.current || redirecting) return
    isSubmitting.current = true
    const q = questions[current]
    const newAnswers = { ...answers, [q.question_id]: selected }
    setAnswers(newAnswers)
    setSelected(null)
    if (current + 1 < questions.length) { setCurrent(current + 1); isSubmitting.current = false; return }
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

  const Navbar = () => (
    <nav style={{ background:'#fff', boxShadow:'0 1px 0 rgba(0,0,0,0.06)', position:'sticky', top:0, zIndex:100 }}>
      <div style={{ maxWidth:880, margin:'0 auto', padding:'13px 20px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <a href="/" style={{ fontWeight:800, fontSize:17, color:'#111', textDecoration:'none' }}>
          ZUME <span style={{ color:'#4F46E5', fontWeight:500 }}>Datalab</span>
        </a>
        <a href="https://www.facebook.com/profile.php?id=61581811456373" target="_blank" rel="noopener noreferrer"
          style={{ display:'flex', alignItems:'center', gap:7, color:'#16A34A', padding:'7px 14px', borderRadius:20, textDecoration:'none', fontSize:13, fontWeight:600, boxShadow:'0 2px 8px rgba(22,163,74,0.15)' }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
          ZUME Datalab
        </a>
      </div>
    </nav>
  )

  if (loading) return <><Navbar /><main style={{ minHeight:'100vh', background:'#F8F9FA', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'system-ui' }}><div style={{ color:'#999' }}>กำลังโหลด...</div></main></>

  if (redirecting) return (
    <><Navbar />
    <main style={{ minHeight:'100vh', background:'#F8F9FA', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:16, fontFamily:'system-ui' }}>
      <div style={{ width:40, height:40, border:'3px solid #E8E6E0', borderTop:`3px solid ${progressColor}`, borderRadius:'50%', animation:'spin 0.8s linear infinite' }} />
      <div style={{ color:'#999', fontSize:14 }}>กำลังคำนวณผล...</div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </main></>
  )

  if (showExit) return (
    <><Navbar />
    <main style={{ minHeight:'100vh', background:'#F8F9FA', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'system-ui', padding:'1rem' }}>
      <div style={{ background:'#fff', borderRadius:20, padding:'2rem 1.75rem', maxWidth:380, width:'100%', boxShadow:'0 4px 32px rgba(0,0,0,0.1)', textAlign:'center' }}>
        <div style={{ fontSize:44, marginBottom:16 }}>🚪</div>
        <div style={{ fontSize:20, fontWeight:700, color:'#111', marginBottom:10 }}>ออกจากแบบทดสอบ?</div>
        <div style={{ fontSize:15, color:'#666', lineHeight:1.7, marginBottom:28 }}>คำตอบที่ทำไปแล้วจะไม่ถูกบันทึก</div>
        <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
          <a href="/" style={{ display:'block', background:'#EF4444', color:'#fff', padding:'14px', borderRadius:12, textDecoration:'none', fontSize:15, fontWeight:700, boxShadow:'0 4px 12px rgba(239,68,68,0.3)' }}>ออกเลย</a>
          <button onClick={() => setShowExit(false)} style={{ background:'#F1F5F9', color:'#374151', border:'none', padding:'14px', borderRadius:12, fontSize:15, fontWeight:600, cursor:'pointer' }}>ทำต่อเลย</button>
        </div>
      </div>
    </main></>
  )

  if (!questions.length) return <><Navbar /><main style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'system-ui' }}><div style={{ color:'#999' }}>ไม่พบคำถาม</div></main></>

  const q = questions[current]

  return (
    <>
      <style>{`
        * { box-sizing:border-box; margin:0; padding:0; }
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes slideIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        .q-wrap { animation:slideIn 0.25s ease both; }
        .opt-card {
          transition:transform 0.15s, box-shadow 0.15s, background 0.15s;
          cursor:pointer;
          -webkit-tap-highlight-color:transparent;
          border:1.5px solid #E5E7EB;
          background:#FAFAFA;
        }
        .opt-card:hover {
          transform:translateY(-3px);
          box-shadow:0 8px 20px rgba(0,0,0,0.1);
          background:#fff;
          border-color:#CBD5E1;
        }
        .opt-card.selected {
          background:#fff;
          border-color:#E5E7EB;
          box-shadow:0 8px 20px rgba(0,0,0,0.1);
          transform:translateY(-3px);
        }
        .exit-btn { background:none; border:none; font-size:13px; color:#ccc; cursor:pointer; padding:4px 8px; border-radius:6px; transition:color 0.15s; }
        .exit-btn:hover { color:#999; }
        .next-btn { border:none; border-radius:10px; padding:11px 28px; font-size:14px; font-weight:700; cursor:pointer; transition:transform 0.15s, box-shadow 0.15s; }
        .next-btn:enabled:hover { transform:translateY(-2px); }
        @media(max-width:480px){ .q-text{font-size:17px !important} .quiz-pad{padding:1.5rem 1.25rem !important} }
      `}</style>

      <Navbar />

      <main style={{ minHeight:'calc(100vh - 50px)', background:'#F8F9FA', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', fontFamily:'system-ui,sans-serif', padding:'1rem' }}>

        <div style={{ width:'100%', maxWidth:580, marginBottom:'1.25rem' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10 }}>
            <div style={{ display:'flex', alignItems:'center', gap:8 }}>
              <button className="exit-btn" onClick={() => setShowExit(true)}>← ออก</button>
              <span style={{ fontSize:11, background:'#EEF2FF', color:'#4F46E5', padding:'4px 10px', borderRadius:6, fontWeight:700 }}>{skillLabel[skill] ?? skill}</span>
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:10 }}>
              <span style={{ fontSize:13, color:'#aaa' }}>⏱ {formatTime(seconds)}</span>
              <span style={{ fontSize:14, fontWeight:700 }}>
                <span style={{ color: progressColor, fontSize:16 }}>{current + 1}</span>
                <span style={{ color:'#CBD5E1' }}> / {questions.length}</span>
              </span>
            </div>
          </div>

          {/* Progress bar — ไล่สีแดง→เหลือง→เขียวทีละข้อ */}
          <div style={{ height:6, background:'#E5E7EB', borderRadius:3, overflow:'hidden' }}>
            <div style={{ height:'100%', width:`${progress}%`, background:progressColor, borderRadius:3, transition:'width 0.4s ease, background 0.6s ease', boxShadow:`0 0 8px ${progressColor}66` }} />
          </div>
        </div>

        <div className="q-wrap" style={{ width:'100%', maxWidth:580, background:'#fff', borderRadius:20, boxShadow:'0 4px 24px rgba(0,0,0,0.08)', overflow:'hidden' }}>
          <div className="quiz-pad" style={{ padding:'2rem 1.75rem' }}>
            <div className="q-text" style={{ fontSize:19, fontWeight:700, color:'#111', lineHeight:1.7, textAlign:'center', marginBottom:'1.75rem' }}>
              {q.question_text}
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              {q.options.map((opt, i) => {
                const key = ['A','B','C','D'][i]
                const isSel = selected === key
                return (
                  <div
                    key={key}
                    className={`opt-card${isSel ? ' selected' : ''}`}
                    onClick={() => setSelected(key)}
                    style={{ padding:'14px 16px', borderRadius:12, display:'flex', alignItems:'center', gap:12 }}
                  >
                    <div style={{ width:30, height:30, borderRadius:8, flexShrink:0, background: isSel ? progressColor : '#F1F5F9', display:'flex', alignItems:'center', justifyContent:'center', fontSize:12, fontWeight:700, color: isSel ? '#fff' : '#94A3B8', transition:'background 0.2s', boxShadow: isSel ? `0 2px 8px ${progressColor}44` : 'none' }}>
                      {key}
                    </div>
                    <div style={{ fontSize:15, color:'#374151', lineHeight:1.5, fontWeight: isSel ? 600 : 400 }}>
                      {opt.replace(/^[ABCD]\.\s/, '')}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div style={{ padding:'1rem 1.75rem 1.5rem', background:'#F8FAFC', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <button onClick={() => { setSelected(null); if (current + 1 < questions.length) setCurrent(c => c + 1) }} style={{ fontSize:13, color:'#bbb', background:'none', border:'none', cursor:'pointer' }}>ข้ามข้อนี้</button>
            <button className="next-btn" onClick={handleNext} disabled={!selected}
              style={{ background: selected ? progressColor : '#E5E7EB', color: selected ? '#fff' : '#94A3B8', boxShadow: selected ? `0 4px 14px ${progressColor}44` : 'none' }}>
              {current + 1 === questions.length ? 'ส่งคำตอบ' : 'ถัดไป →'}
            </button>
          </div>
        </div>

        <div style={{ marginTop:'1.5rem', fontSize:11, color:'#ddd' }}>© 2026 ZUME Datalab · All rights reserved</div>
      </main>
    </>
  )
}
