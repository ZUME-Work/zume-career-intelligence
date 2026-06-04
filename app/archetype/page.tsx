'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { archetypeQuestions, type ArchetypeKey } from '@/lib/archetypeQuestions'

export default function ArchetypePage() {
  const router = useRouter()
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [scores, setScores] = useState<Record<ArchetypeKey, number>>({
    detective: 0, architect: 0, storyteller: 0,
    engineer: 0, scientist: 0, strategist: 0,
  })
  const [animating, setAnimating] = useState(false)
  const q = archetypeQuestions[current]
  const progress = (current / archetypeQuestions.length) * 100
  const isLast = current === archetypeQuestions.length - 1
  const encouragements = ['เริ่มต้นดีมาก! 🔥','กำลังมาแรง! ⚡','เก่งมากเลย! 💪','ใกล้แล้ว! 🎯','เกือบถึงแล้ว! 🚀','ยอดเยี่ยม! ✨']
  const encourageIndex = Math.floor((current / archetypeQuestions.length) * encouragements.length)
  const handleNext = () => {
    if (selected === null || animating) return
    setAnimating(true)
    const newScores = { ...scores }
    const opt = q.options[selected]
    Object.entries(opt.scores).forEach(([k, v]) => { newScores[k as ArchetypeKey] += v })
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
    }, 300)
  }
  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes slideIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .question-wrap { animation: slideIn 0.35s ease both; }
        .opt-card { transition: all 0.15s; cursor: pointer; }
        .opt-card:hover { transform: translateX(4px); }
        @media (max-width: 640px) {
          .quiz-inner { padding: 1.25rem 1rem !important; }
          .scenario-text { font-size: 17px !important; }
        }
      `}</style>
      <main style={{ minHeight: '100vh', background: '#080C14', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'system-ui, sans-serif', padding: '1rem' }}>
        <div style={{ width: '100%', maxWidth: 600, marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <div style={{ fontSize: 13, color: '#475569' }}>{current + 1} / {archetypeQuestions.length}</div>
            <div style={{ fontSize: 12, color: '#3B82F6', fontWeight: 600 }}>{encouragements[encourageIndex]}</div>
          </div>
          <div style={{ height: 4, background: '#1E293B', borderRadius: 2 }}>
            <div style={{ height: '100%', width: `${progress}%`, background: 'linear-gradient(90deg, #3B82F6, #8B5CF6)', borderRadius: 2, transition: 'width 0.4s ease' }} />
          </div>
        </div>
        <div className="question-wrap" style={{ width: '100%', maxWidth: 600, background: '#0F172A', borderRadius: 20, border: '0.5px solid #1E293B', overflow: 'hidden' }}>
          <div className="quiz-inner" style={{ padding: '2rem 2rem 1.5rem' }}>
            <div style={{ fontSize: 40, marginBottom: '1rem', textAlign: 'center' }}>{q.emoji}</div>
            <div className="scenario-text" style={{ fontSize: 19, fontWeight: 600, color: '#F1F5F9', lineHeight: 1.6, textAlign: 'center', marginBottom: '2rem' }}>{q.scenario}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {q.options.map((opt, i) => {
                const isSelected = selected === i
                return (
                  <div key={i} className="opt-card" onClick={() => setSelected(i)} style={{ padding: '14px 18px', borderRadius: 12, border: isSelected ? '1.5px solid #3B82F6' : '0.5px solid #1E293B', background: isSelected ? 'rgba(59,130,246,0.12)' : '#0F172A', display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 28, height: 28, borderRadius: 8, flexShrink: 0, border: isSelected ? 'none' : '0.5px solid #334155', background: isSelected ? '#3B82F6' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600, color: isSelected ? '#fff' : '#475569' }}>
                      {['A','B','C','D'][i]}
                    </div>
                    <div style={{ fontSize: 15, color: isSelected ? '#E2E8F0' : '#94A3B8', lineHeight: 1.5 }}>{opt.text}</div>
                  </div>
                )
              })}
            </div>
          </div>
          <div style={{ padding: '1rem 2rem 1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
            <button onClick={handleNext} disabled={selected === null} style={{ background: selected !== null ? 'linear-gradient(135deg, #3B82F6, #8B5CF6)' : '#1E293B', color: selected !== null ? '#fff' : '#475569', border: 'none', borderRadius: 10, padding: '12px 28px', fontSize: 14, fontWeight: 600, cursor: selected !== null ? 'pointer' : 'default' }}>
              {isLast ? 'ดูผลลัพธ์ 🎉' : 'ถัดไป →'}
            </button>
          </div>
        </div>
        <div style={{ marginTop: '1.5rem', fontSize: 11, color: '#1E293B' }}>© 2026 ZUME Datalab · All rights reserved</div>
      </main>
    </>
  )
}
