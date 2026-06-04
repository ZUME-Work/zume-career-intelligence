'use client'
import { useEffect, useState } from 'react'
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
    const t = setInterval(() => setSeconds(s => s + 1), 1000)
    return () => clearInterval(t)
  }, [])

  const fmt = (s: number) => {
    const m = Math.floor(s / 60).toString().padStart(2, '0')
    const sec = (s % 60).toString().padStart(2, '0')
    return `${m}:${sec}`
  }

  const skillLabel: Record<string, string> = {
    sql: 'SQL Benchmark',
    analytical: 'Analytical Reasoning',
    excel: 'Excel Benchmark',
  }

  const handleNext = async () => {
    if (!selected) return
    const q = questions[current]
    const newAnswers = { ...answers, [q.question_id]: selected }
    setAnswers(newAnswers)
    setSelected(null)

    if (current + 1 < questions.length) {
      setCurrent(current + 1)
    } else {
      const correct = questions.filter(
        q => newAnswers[q.question_id] === q.correct_answer
      ).length
      const score = Math.round((correct / questions.length) * 100)
      const supabase = createSupabaseBrowser()

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
        return
      }
      router.push(`/results/${result.assessmentId}`)
    }
  }

  const handleSkip = () => {
    setSelected(null)
    if (current + 1 < questions.length) setCurrent(current + 1)
  }

  if (loading || questions.length === 0) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: '#888', fontSize: 14 }}>Loading questions...</p>
    </div>
  )

  const q = questions[current]
  const opts = ['A', 'B', 'C', 'D']

  return (
    <div style={{ minHeight: '100vh', background: '#F8F9FB', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px 16px' }}>
      <div style={{ background: '#fff', border: '0.5px solid #E0DED8', borderRadius: 14, overflow: 'hidden', width: '100%', maxWidth: 620 }}>

        <div style={{ padding: '16px 24px', borderBottom: '0.5px solid #E8E6E0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 12, fontWeight: 500, color: '#1B3A5C', background: '#EEF2F7', padding: '3px 10px', borderRadius: 4 }}>
              {skillLabel[skill] ?? skill}
            </span>
            <span style={{ fontSize: 12, color: '#999' }}>Question {current + 1} of {questions.length}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            <span style={{ fontSize: 13, fontWeight: 500, color: '#666', fontFamily: 'monospace' }}>{fmt(seconds)}</span>
          </div>
        </div>

        <div style={{ padding: '6px 24px 0', display: 'flex', gap: 3 }}>
          {questions.map((_, i) => (
            <div key={i} style={{ height: 3, flex: 1, background: i < current ? '#1B3A5C' : i === current ? '#1B3A5C' : '#E8E6E0', borderRadius: 2, opacity: i === current ? 0.4 : 1 }} />
          ))}
        </div>

        <div style={{ padding: '28px 24px 20px' }}>
          <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: '.06em', textTransform: 'uppercase', color: '#aaa', marginBottom: 12 }}>
            {q.topic.replace(/_/g, ' ')} · {q.difficulty}
          </div>

          <div style={{ background: '#F7F9FC', borderLeft: '3px solid #1B3A5C', borderRadius: '0 8px 8px 0', padding: '16px 20px', marginBottom: 24 }}>
            <div style={{ fontSize: 16, fontWeight: 500, color: '#0D1B2E', lineHeight: 1.65 }}>{q.question_text}</div>
          </div>

          {q.options.map((opt, i) => {
            const key = opts[i]
            const isSelected = selected === key
            return (
              <div key={key} onClick={() => setSelected(key)}
                style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px', border: isSelected ? '1.5px solid #1B3A5C' : '0.5px solid #E0DED8', borderRadius: 10, cursor: 'pointer', marginBottom: 10, background: isSelected ? '#F4F7FB' : '#fff' }}>
                <div style={{ width: 28, height: 28, borderRadius: 6, border: isSelected ? 'none' : '0.5px solid #ccc', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 500, color: isSelected ? '#fff' : '#888', background: isSelected ? '#1B3A5C' : 'transparent', flexShrink: 0 }}>
                  {key}
                </div>
                <div style={{ fontSize: 14, color: '#1A1A1A' }}>{opt.replace(/^[ABCD]\.\s*/, '')}</div>
              </div>
            )
          })}
        </div>

        <div style={{ padding: '16px 24px', borderTop: '0.5px solid #E8E6E0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button onClick={handleSkip} style={{ fontSize: 13, color: '#999', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>Skip</button>
          <button onClick={handleNext} disabled={!selected}
            style={{ fontSize: 13, fontWeight: 500, color: '#fff', background: selected ? '#1B3A5C' : '#ccc', border: 'none', borderRadius: 8, padding: '10px 28px', cursor: selected ? 'pointer' : 'not-allowed' }}>
            {current + 1 === questions.length ? 'Submit' : 'Next'}
          </button>
        </div>

      </div>
    </div>
  )
}