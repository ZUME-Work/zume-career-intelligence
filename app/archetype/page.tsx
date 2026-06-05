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
  const [animating, setAnimating] = useState(false)

  const q = archetypeQuestions[current]
  const progress = (current / archetypeQuestions.length) * 100
  const isLast = current === archetypeQuestions.length - 1

  const funMessages = [
    'แค่เลือกสิ่งที่รู้สึกใช่ ไม่มีผิดถูก 😊',
    'ยังไงก็ไม่มีคำตอบที่แย่นะ 🙌',
    'เชื่อ first instinct เลย! ⚡',
    'กำลังเก็ต vibe ของคุณอยู่... 🔍',
    'ใกล้รู้แล้ว! อีกนิดเดียว 🎯',
    'เกือบถึงแล้ว! 🚀',
  ]
  const msgIndex = Math.min(Math.floor((current / archetypeQuestions.length) * funMessages.length), funMessages.length - 1)

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

  if (!started) return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        .fade1 { animation: fadeUp 0.5s ease both; }
        .fade2 { animation: fadeUp 0.5s ease 0.1s both; }
        .fade3 { animation: fadeUp 0.5s ease 0.2s both; }
        .fade4 { animation: fadeUp 0.5s ease 0.3s both; }
        .arch-card { transition: transform 0.2s; cursor: default; }
        .arch-card:hover { transform: translateY(-6px); }
        .start-btn { transition: transform 0.15s, box-shadow 0.15s; }
        .start-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(79,70,229,0.4); }
      `}</style>
      <main style={{ minHeight: '100vh', background: '#FAFAFA', fontFamily: 'system-ui, sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem' }}>

        <div className="fade1" style={{ fontSize: 13, color: '#4F46E5', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 16 }}>
          ZUME Datalab
        </div>

        <div className="fade2" style={{ fontSize: 'clamp(2rem, 6vw, 3rem)', fontWeight: 800, color: '#0F1A2B', textAlign: 'center', lineHeight: 1.2, marginBottom: 16 }}>
          คุณเป็น Data<br />สายไหนกันนะ? 🤔
        </div>

        <div className="fade3" style={{ fontSize: 18, color: '#64748B', textAlign: 'center', lineHeight: 1.8, marginBottom: 40, maxWidth: 420 }}>
          ตอบ 15 คำถามสั้นๆ<br />แล้วเราจะบอกว่าคุณเป็น Data Archetype แบบไหน
        </div>

        {/* Archetype preview */}
        <div className="fade3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 40, width: '100%', maxWidth: 400 }}>
          {[
            { emoji: '🦊', name: 'นักสืบข้อมูล', color: '#FEF3C7', border: '#F59E0B' },
            { emoji: '🦅', name: 'นักออกแบบ', color: '#DBEAFE', border: '#3B82F6' },
            { emoji: '🦋', name: 'นักเล่าเรื่อง', color: '#FCE7F3', border: '#EC4899' },
            { emoji: '🦫', name: 'นักสร้าง', color: '#D1FAE5', border: '#10B981' },
            { emoji: '🦉', name: 'นักวิทยาศาสตร์', color: '#EDE9FE', border: '#8B5CF6' },
            { emoji: '🐆', name: 'นักกลยุทธ์', color: '#FEE2E2', border: '#EF4444' },
          ].map((a) => (
            <div key={a.name} className="arch-card" style={{ background: a.color, borderRadius: 16, padding: '16px 8px', textAlign: 'center', border: `1.5px solid ${a.border}44` }}>
              <div style={{ fontSize: 32, marginBottom: 6 }}>{a.emoji}</div>
              <div style={{ fontSize: 11, color: '#374151', fontWeight: 600, lineHeight: 1.3 }}>{a.name}</div>
            </div>
          ))}
        </div>

        <button className="fade4 start-btn" onClick={() => setStarted(true)} style={{ background: '#4F46E5', color: '#fff', border: 'none', borderRadius: 16, padding: '18px 48px', fontSize: 18, fontWeight: 700, cursor: 'pointer', marginBottom: 16 }}>
          เริ่มเลย! 🚀
        </button>

        <div className="fade4" style={{ fontSize: 13, color: '#94A3B8' }}>
          ใช้เวลาแค่ 3 นาที · ฟรี · ไม่ต้อง login
        </div>

      </main>
    </>
  )

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes slideIn { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        .q-wrap { animation: slideIn 0.3s ease both; }
        .opt-btn { transition: all 0.15s; cursor: pointer; -webkit-tap-highlight-color: transparent; }
        .opt-btn:active { transform: scale(0.98); }
        @media (max-width: 480px) {
          .q-text { font-size: 18px !important; }
          .opt-text { font-size: 15px !important; }
          .quiz-pad { padding: 1.5rem 1rem !important; }
        }
      `}</style>
      <main style={{ minHeight: '100vh', background: '#FAFAFA', fontFamily: 'system-ui, sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>

        {/* Progress */}
        <div style={{ width: '100%', maxWidth: 560, marginBottom: '1.5rem', padding: '0 4px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <div style={{ fontSize: 14, color: '#94A3B8', fontWeight: 500 }}>
              ข้อ {current + 1} จาก {archetypeQuestions.length}
            </div>
            <div style={{ fontSize: 13, color: '#4F46E5', fontWeight: 600 }}>
              {funMessages[msgIndex]}
            </div>
          </div>
          <div style={{ height: 6, background: '#E2E8F0', borderRadius: 3 }}>
            <div style={{ height: '100%', width: `${progress}%`, background: 'linear-gradient(90deg, #4F46E5, #7C3AED)', borderRadius: 3, transition: 'width 0.4s ease' }} />
          </div>
        </div>

        {/* Card */}
        <div className="q-wrap" style={{ width: '100%', maxWidth: 560, background: '#fff', borderRadius: 24, boxShadow: '0 4px 32px rgba(0,0,0,0.08)', overflow: 'hidden' }}>

          <div className="quiz-pad" style={{ padding: '2rem 1.75rem' }}>
            {/* Emoji */}
            <div style={{ fontSize: 48, textAlign: 'center', marginBottom: '1.25rem' }}>
              {q.emoji}
            </div>

            {/* Scenario */}
            <div className="q-text" style={{ fontSize: 20, fontWeight: 700, color: '#0F1A2B', lineHeight: 1.6, textAlign: 'center', marginBottom: '1.75rem' }}>
              {q.scenario}
            </div>

            {/* Options */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {q.options.map((opt, i) => {
                const isSelected = selected === i
                return (
                  <button
                    key={i}
                    className="opt-btn"
                    onClick={() => setSelected(i)}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '16px 18px',
                      borderRadius: 14,
                      border: isSelected ? '2px solid #4F46E5' : '1.5px solid #E2E8F0',
                      background: isSelected ? '#EEF2FF' : '#F8FAFC',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 14,
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{
                      width: 32, height: 32, borderRadius: 10, flexShrink: 0,
                      background: isSelected ? '#4F46E5' : '#fff',
                      border: isSelected ? 'none' : '1.5px solid #E2E8F0',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 13, fontWeight: 700,
                      color: isSelected ? '#fff' : '#94A3B8',
                    }}>
                      {['A', 'B', 'C', 'D'][i]}
                    </div>
                    <div className="opt-text" style={{ fontSize: 16, color: isSelected ? '#1E1B4B' : '#374151', lineHeight: 1.5, fontWeight: isSelected ? 600 : 400 }}>
                      {opt.text}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Footer */}
          <div style={{ padding: '1rem 1.75rem 1.5rem', background: '#F8FAFC', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: 13, color: '#CBD5E1' }}>
              {Array.from({ length: archetypeQuestions.length }).map((_, i) => (
                <span key={i} style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: i < current ? '#4F46E5' : i === current ? '#7C3AED' : '#E2E8F0', margin: '0 2px' }} />
              ))}
            </div>
            <button
              onClick={handleNext}
              disabled={selected === null}
              style={{
                background: selected !== null ? '#4F46E5' : '#E2E8F0',
                color: selected !== null ? '#fff' : '#94A3B8',
                border: 'none', borderRadius: 12,
                padding: '12px 28px', fontSize: 15, fontWeight: 700,
                cursor: selected !== null ? 'pointer' : 'default',
                transition: 'all 0.2s',
              }}
            >
              {isLast ? 'ดูผลลัพธ์ 🎉' : 'ต่อไป →'}
            </button>
          </div>

        </div>

        <div style={{ marginTop: '1.5rem', fontSize: 12, color: '#CBD5E1' }}>
          © 2026 ZUME Datalab
        </div>
      </main>
    </>
  )
}
