import { createSupabaseServer } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import EmailGate from './EmailGate'

export default async function ResultsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = createSupabaseServer()

  const { data: assessment, error } = await supabase
    .from('assessments')
    .select('*')
    .eq('assessment_id', id)
    .single()

  if (error || !assessment) return notFound()

  const pct = Math.round((assessment.correct_count / assessment.total_questions) * 100)
  const color = pct >= 70 ? '#10B981' : pct >= 50 ? '#F59E0B' : '#EF4444'
  const label = pct >= 70 ? 'Excellent' : pct >= 50 ? 'Good' : 'Needs Work'
  const skillLabel = assessment.skill.toUpperCase()

  return (
    <>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.15; }
          50% { transform: translateY(-30px) scale(1.1); opacity: 0.25; }
        }
        .bubble {
          position: absolute;
          border-radius: 50%;
          animation: float linear infinite;
          pointer-events: none;
        }
      `}</style>

      <main style={{ minHeight: '100vh', background: '#0a0a0a', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'system-ui,sans-serif', position: 'relative', overflow: 'hidden' }}>

        {/* Bubbles */}
        {[
          { size: 120, left: '5%',  top: '10%', dur: '8s',  delay: '0s'   },
          { size: 80,  left: '80%', top: '15%', dur: '11s', delay: '2s'   },
          { size: 160, left: '60%', top: '60%', dur: '14s', delay: '1s'   },
          { size: 60,  left: '20%', top: '70%', dur: '9s',  delay: '3s'   },
          { size: 100, left: '40%', top: '80%', dur: '12s', delay: '0.5s' },
          { size: 50,  left: '90%', top: '50%', dur: '7s',  delay: '4s'   },
        ].map((b, i) => (
          <div key={i} className="bubble" style={{
            width: b.size, height: b.size,
            left: b.left, top: b.top,
            background: color,
            animationDuration: b.dur,
            animationDelay: b.delay,
          }} />
        ))}

        <div style={{ textAlign: 'center', maxWidth: 480, padding: '2rem', width: '100%', position: 'relative', zIndex: 1 }}>

          {/* Score Circle */}
          <div style={{ width: 160, height: 160, borderRadius: '50%', border: `6px solid ${color}`, margin: '0 auto 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 40px ${color}44` }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 700, color }}>{pct}%</div>
            <div style={{ fontSize: '0.8rem', color: '#999' }}>{assessment.correct_count}/{assessment.total_questions}</div>
          </div>

          <div style={{ fontSize: '1.5rem', fontWeight: 600, color, marginBottom: '0.5rem' }}>{label}</div>
          <div style={{ fontSize: '1rem', color: '#999', marginBottom: '2rem' }}>{skillLabel} Assessment</div>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
            <div style={{ background: '#1a1a1a', borderRadius: 12, padding: '1rem' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{assessment.correct_count}</div>
              <div style={{ fontSize: '0.75rem', color: '#666', marginTop: 4 }}>Correct</div>
            </div>
            <div style={{ background: '#1a1a1a', borderRadius: 12, padding: '1rem' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>
                {assessment.duration_sec
                  ? assessment.duration_sec < 60
                    ? `${assessment.duration_sec}s`
                    : `${Math.round(assessment.duration_sec / 60)}m`
                  : '—'}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#666', marginTop: 4 }}>Time</div>
            </div>
          </div>

          <EmailGate
            assessmentId={id}
            initialUnlocked={assessment.email_unlocked}
            percentile={assessment.percentile}
            skillLabel={skillLabel}
          />

          <a href="/" style={{ display: 'inline-block', marginTop: '1rem', background: '#1a1a1a', color: '#999', padding: '0.75rem 2rem', borderRadius: 8, textDecoration: 'none', fontWeight: 500, fontSize: '0.85rem' }}>
            Try Another Assessment
          </a>
        </div>

        {/* Footer */}
        <div style={{ position: 'fixed', bottom: 16, left: 0, right: 0, textAlign: 'center', fontSize: '0.7rem', color: '#444', zIndex: 10 }}>
          © 2026 ZUME Datalab · All rights reserved
        </div>

      </main>
    </>
  )
}