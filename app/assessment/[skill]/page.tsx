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
  const isSubmitting = useRef(false)

  useEffect(() => {
    const supabase = createSupabaseBrowser()
    supabase
      .from('questions')
      .select('*')
      .eq('skill', skill)
      .eq('is_active', true)
      .order('question_id', { ascending: true })
      .limit(10)
      .then(({ data }) => {
        if (data) setQuestions(data)
        setLoading(false)
      })
  }, [skill])

  useEffect(() => {
    if (redirecting) return
    const timer = setInterval(() => setSeconds(s => s + 1), 1000)
    return () => clearInterval(timer)
  }, [redirecting])

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60)
    const sec = (s % 60).toString().padStart(2, '0')
    return `${m}:${sec}`
  }

  const skillLabel: Record<string, string> = {
    sql: 'SQL Benchmark',
    numerical: 'Numerical Reasoning',
    excel: 'Excel Benchmark',
    tableau: 'Tableau Benchmark',
  }

  const handleNext = async () => {
    if (!selected || isSubmitting.current || redirecting) return
    isSubmitting.current = true

    const q = questions[current]
    const newAnswers = { ...answers, [q.question_id]: selected }
    setAnswers(newAnswers)
    setSelected(null)

    if (current + 1 < questions.length) {
      setCurrent(current + 1)
      isSubmitting.current = false
      return
    }

    setRedirecting(true)

    const correct = questions.filter(
      q => newAnswers[q.question_id] === q.correct_answer
    ).length
    const score = Math.round((correct / questions.length) * 100)

    const res = await fetch('/api/submit-assessment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        skill,
        score,
        totalQuestions: questions.length,
        correctCount: correct,
        durationSec: seconds,
        responses: questions.map(q => ({
          questionId: q.question_id,
          userAnswer: newAnswers[q.question_id] ?? null,
          isCorrect: newAnswers[q.question_id] === q.correct_answer,
        })),
      }),
    })

    const result = await res.json()
    if (!res.ok) {
      console.error('submit error:', result.error)
      setRedirecting(false)
      isSubmitting.current = false
      return
    }
    router.push(`/results/${result.assessmentId}`)
  }

  const handleSkip = () => {
    if (isSubmitting.current || redirecting) return
    setSelected(null)
    if (current + 1 < questions.length) setCurrent(current + 1)
  }

  if (loading) return (
    <main style={{ minHeight: '100vh', background: '#F8F9FA', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ color: '#999', fontFamily: 'system-ui' }}>Loading...</div>
    </main>
  )

  if (redirecting) return (
    <main style={{ minHeight: '100vh', background: '#F8F9FA', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16 }}>
      <div style={{ width: 40, height: 40, border: '3px solid #E8E6E0', borderTop: '3px solid #1B3A5C', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
      <div style={{ color: '#999', fontFamily: 'system-ui', fontSize: 14 }}>Calculating your results...</div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </main>
  )

  if (!questions.length) return (
    <main style={{ minHeight: '100vh', background: '#F8F9FA', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ color: '#999', fontFamily: 'system-ui' }}>No questions found for {skill}</div>
    </main>
  )

  const q = questions[current]
  const progress = (current / questions.length) * 100

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 640px) {
          .assessment-card { margin: 0 !important; border-radius: 0 !important; min-height: 100vh !important; box-shadow: none !important; }
          .assessment-wrap { padding: 0 !important; align-items: flex-start !important; }
          .q-text { font-size: 15px !important; }
          .opt-text { font-size: 13px !important; }
          .header-pad { padding: 12px 16px !important; }
          .body-pad { padding: 20px 16px 16px !important; }
          .footer-pad { padding: 12px 16px !important; }
        }
      `}</style>
      <main className="assessment-wrap" style={{ minHeight: '100vh', background: '#F8F9FA', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'system-ui, sans-serif', padding: '1rem' }}>
        <div className="assessment-card" style={{ width: '100%', maxWidth: 640, background: '#fff', borderRadius: 16, boxShadow: '0 2px 24px rgba(0,0,0,0.08)', overflow: 'hidden' }}>

          {/* Header */}
          <div className="header-pad" style={{ padding: '16px 24px', borderBottom: '0.5px solid #E8E6E0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
              <span style={{ background: '#EEF2FF', color: '#4F46E5', fontSize: 11, fontWeight: 600, padding: '4px 10px', borderRadius: 6, whiteSpace: 'nowrap' }}>
                {skillLabel[skill] ?? skill}
              </span>
              <span style={{ fontSize: 12, color: '#666' }}>Q {current + 1}/{questions.length}</span>
            </div>
            <span style={{ fontSize: 12, color: '#666', whiteSpace: 'nowrap' }}>⏱ {formatTime(seconds)}</span>
          </div>

          {/* Progress */}
          <div style={{ height: 3, background: '#F0F0F0' }}>
            <div style={{ height: '100%', width: `${progress}%`, background: '#4F46E5', transition: 'width 0.3s' }} />
          </div>

          {/* Question */}
          <div className="body-pad" style={{ padding: '24px 24px 20px' }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#999', letterSpacing: 1, marginBottom: 12, textTransform: 'uppercase' }}>
              {q.topic} · {q.difficulty}
            </div>
            <div className="q-text" style={{ fontSize: 16, fontWeight: 500, color: '#1A1A1A', lineHeight: 1.6, borderLeft: '3px solid #4F46E5', paddingLeft: 14, marginBottom: 20 }}>
              {q.question_text}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {q.options.map((opt, i) => {
                const key = ['A', 'B', 'C', 'D'][i]
                const isSelected = selected === key
                return (
                  <div key={key} onClick={() => setSelected(key)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', border: isSelected ? '1.5px solid #4F46E5' : '0.5px solid #E8E6E0', borderRadius: 10, cursor: 'pointer', background: isSelected ? '#EEF2FF' : '#fff', transition: 'all 0.15s', WebkitTapHighlightColor: 'transparent' }}>
                    <div style={{ width: 26, height: 26, borderRadius: 6, border: isSelected ? 'none' : '0.5px solid #ccc', background: isSelected ? '#4F46E5' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 600, color: isSelected ? '#fff' : '#999', flexShrink: 0 }}>
                      {key}
                    </div>
                    <div className="opt-text" style={{ fontSize: 14, color: '#1A1A1A', lineHeight: 1.4 }}>
                      {opt.replace(/^[ABCD]\.\s/, '')}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Footer */}
          <div className="footer-pad" style={{ padding: '16px 24px', borderTop: '0.5px solid #E8E6E0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button onClick={handleSkip} style={{ fontSize: 13, color: '#999', background: 'none', border: 'none', cursor: 'pointer', padding: '8px 0' }}>
              Skip
            </button>
            <button onClick={handleNext} disabled={!selected} style={{ fontSize: 13, fontWeight: 500, color: '#fff', background: selected ? '#1B3A5C' : '#ccc', border: 'none', borderRadius: 8, padding: '10px 24px', cursor: selected ? 'pointer' : 'default', minWidth: 80 }}>
              {current + 1 === questions.length ? 'Submit' : 'Next'}
            </button>
          </div>

        </div>

        {/* Page Footer */}
        <div style={{ position: 'fixed', bottom: 12, left: 0, right: 0, textAlign: 'center', fontSize: '0.65rem', color: '#bbb', zIndex: 10 }}>
          © 2026 ZUME Datalab · All rights reserved
        </div>
      </main>
    </>
  )
}