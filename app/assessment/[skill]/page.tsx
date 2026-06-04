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
    const timer = setInterval(() => setSeconds(s => s + 1), 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60)
    const sec = (s % 60).toString().padStart(2, '0')
    return `${m}:${sec}`
  }

  const skillLabel: Record<string, string> = {
    sql: 'SQL Benchmark',
    analytical: 'Analytical Reasoning',
    excel: 'Excel Benchmark',
  }

  const handleNext = async () => {
    if (!selected || isSubmitting.current) return
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

    // Submit
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
      isSubmitting.current = false
      return
    }
    router.push(`/results/${result.assessmentId}`)
  }

  const handleSkip = () => {
    if (isSubmitting.current) return
    setSelected(null)
    if (current + 1 < questions.length) {
      setCurrent(current + 1)
    }
  }

  if (loading) return (
    <main style={{ minHeight: '100vh', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ color: '#999', fontFamily: 'system-ui' }}>Loading...</div>
    </main>
  )

  if (!questions.length) return (
    <main style={{ minHeight: '100vh', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ color: '#999', fontFamily: 'system-ui' }}>No questions found for {skill}</div>
    </main>
  )

  const q = questions[current]
  const progress = ((current) / questions.length) * 100

  return (
    <main style={{ minHeight: '100vh', background: '#F8F9FA', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'system-ui, sans-serif', padding: '1rem' }}>
      <div style={{ width: '100%', maxWidth: 640, background: '#fff', borderRadius: 16, boxShadow: '0 2px 24px rgba(0,0,0,0.08)', overflow: 'hidden' }}>

        {/* Header */}
        <div style={{ padding: '16px 24px', borderBottom: '0.5px solid #E8E6E0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ background: '#EEF2FF', color: '#4F46E5', fontSize: 12, fontWeight: 600, padding: '4px 10px', borderRadius: 6 }}>
              {skillLabel[skill] ?? skill}
            </span>
            <span style={{ fontSize: 13, color: '#666' }}>Question {current + 1} of {questions.length}</span>
          </div>
          <span style={{ fontSize: 13, color: '#666', display: 'flex', alignItems: 'center', gap: 4 }}>
            ⏱ {formatTime(seconds)}
          </span>
        </div>

        {/* Progress */}
        <div style={{ height: 3, background: '#F0F0F0' }}>
          <div style={{ height: '100%', width: `${progress}%`, background: '#4F46E5', transition: 'width 0.3s' }} />
        </div>

        {/* Question */}
        <div style={{ padding: '32px 24px 24px' }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#999', letterSpacing: 1, marginBottom: 16, textTransform: 'uppercase' }}>
            {q.topic} · {q.difficulty}
          </div>
          <div style={{ fontSize: 16, fontWeight: 500, color: '#1A1A1A', lineHeight: 1.6, borderLeft: '3px solid #4F46E5', paddingLeft: 16, marginBottom: 24 }}>
            {q.question_text}
          </div>

          {/* Options */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {q.options.map((opt, i) => {
              const key = ['A', 'B', 'C', 'D'][i]
              const isSelected = selected === key
              return (
                <div
                  key={key}
                  onClick={() => setSelected(key)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 14,
                    padding: '14px 18px',
                    border: isSelected ? '1.5px solid #4F46E5' : '0.5px solid #E8E6E0',
                    borderRadius: 10,
                    cursor: 'pointer',
                    background: isSelected ? '#EEF2FF' : '#fff',
                    transition: 'all 0.15s',
                  }}
                >
                  <div style={{
                    width: 28, height: 28, borderRadius: 6,
                    border: isSelected ? 'none' : '0.5px solid #ccc',
                    background: isSelected ? '#4F46E5' : '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 12, fontWeight: 600,
                    color: isSelected ? '#fff' : '#999',
                    flexShrink: 0,
                  }}>
                    {key}
                  </div>
                  <div style={{ fontSize: 14, color: '#1A1A1A' }}>
                    {opt.replace(/^[ABCD]\.\s/, '')}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: '16px 24px', borderTop: '0.5px solid #E8E6E0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button onClick={handleSkip} style={{ fontSize: 13, color: '#999', background: 'none', border: 'none', cursor: 'pointer' }}>
            Skip
          </button>
          <button
            onClick={handleNext}
            disabled={!selected}
            style={{
              fontSize: 13, fontWeight: 500,
              color: '#fff',
              background: selected ? '#1B3A5C' : '#ccc',
              border: 'none',
              borderRadius: 8,
              padding: '8px 20px',
              cursor: selected ? 'pointer' : 'default',
            }}
          >
            {current + 1 === questions.length ? 'Submit' : 'Next'}
          </button>
        </div>

      </div>
    </main>
  )
}