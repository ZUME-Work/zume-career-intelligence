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
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.12; }
          50%       { transform: translateY(-28px) scale(1.08); opacity: 0.22; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.85); }
          to   { opacity: 1; transform: scale(1); }
        }
        .bubble { position: absolute; border-radius: 50%; animation: float linear infinite; pointer-events: none; }
        .card-in { animation: fadeUp 0.5s ease both; }
        .circle-in { animation: scaleIn 0.6s ease both; }
        @media (max-width: 640px) {
          .results-inner { padding: 1.5rem 1rem !important; }
          .score-circle { width: 130px !important; height: 130px !important; }
          .score-num { font-size: 2rem !important; }
          .stat-grid { gap: 0.75rem !important; }
        }
      `}</style>

      <main style={{ minHeight: '100vh', background: '#0a0a0a', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'system-ui, sans-serif', position: 'relative', overflow: 'hidden', padding: '1rem' }}>

        {/* Bubbles */}
        {[
          { size: 120, left: '5%',  top: '8%',  dur: '8s',  delay: '0s'   },
          { size: 80,  left: '82%', top: '12%', dur: '11s', delay: '2s'   },
          { size: 160, left: '62%', top: '58%', dur: '14s', delay: '1s'   },
          { size: 60,  left: '18%', top: '72%', dur: '9s',  delay: '3s'   },
          { size: 100, left: '42%', top: '78%', dur: '12s', delay: '0.5s' },
          { size: 50,  left: '88%', top: '48%', dur: '7s',  delay: '4s'   },
        ].map((b, i) => (
          <div key={i} className="bubble" style={{ width: b.size, height: b.size, left: b.left, top: b.top, background: color, animationDuration: b.dur, animationDelay: b.delay }} />
        ))}

        <div className="results-inner" style={{ textAlign: 'center', maxWidth: 460, width: '100%', padding: '2rem', position: 'relative', zIndex: 1 }}>

          {/* Score Circle */}
          <div className="circle-in score-circle" style={{ width: 150, height: 150, borderRadius: '50%', border: `5px solid ${color}`, margin: '0 auto 1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 48px ${color}55` }}>
            <div className="score-num" style={{ fontSize: '2.4rem', fontWeight: 800, color, lineHeight: 1 }}>{pct}%</div>
            <div style={{ fontSize: '0.75rem', color: '#666', marginTop: 4 }}>{assessment.correct_count}/{assessment.total_questions}</div>
          </div>

          {/* Label */}
          <div className="card-in" style={{ animationDelay: '0.1s' }}>
            <div style={{ fontSize: '1.4rem', fontWeight: 700, color, marginBottom: '0.4rem' }}>{label}</div>
            <div style={{ fontSize: '0.9rem', color: '#888', marginBottom: '1.5rem' }}>{skillLabel} Assessment</div>
          </div>

          {/* Stats */}
          <div className="card-in stat-grid" style={{ animationDelay: '0.2s', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ background: '#111', borderRadius: 12, padding: '1rem' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{assessment.correct_count}</div>
              <div style={{ fontSize: '0.7rem', color: '#555', marginTop: 4, textTransform: 'uppercase', letterSpacing: 0.5 }}>Correct</div>
            </div>
            <div style={{ background: '#111', borderRadius: 12, padding: '1rem' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>
                {assessment.duration_sec
                  ? assessment.duration_sec < 60
                    ? `${assessment.duration_sec}s`
                    : `${Math.round(assessment.duration_sec / 60)}m`
                  : '—'}
              </div>
              <div style={{ fontSize: '0.7rem', color: '#555', marginTop: 4, textTransform: 'uppercase', letterSpacing: 0.5 }}>Time</div>
            </div>
          </div>

          {/* Score Bar */}
          <div className="card-in" style={{ animationDelay: '0.25s', background: '#111', borderRadius: 12, padding: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#555', marginBottom: 8 }}>
              <span>0%</span>
              <span style={{ color: '#888' }}>Your Score</span>
              <span>100%</span>
            </div>
            <div style={{ height: 8, background: '#1a1a1a', borderRadius: 4, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${pct}%`, background: color, borderRadius: 4, transition: 'width 1s ease' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#444', marginTop: 8 }}>
              <span style={{ color: '#EF4444' }}>Needs Work</span>
              <span style={{ color: '#F59E0B' }}>Good</span>
              <span style={{ color: '#10B981' }}>Excellent</span>
            </div>
          </div>

          {/* Email Gate */}
          <div className="card-in" style={{ animationDelay: '0.3s' }}>
            <EmailGate
              assessmentId={id}
              initialUnlocked={assessment.email_unlocked}
              percentile={assessment.percentile}
              skillLabel={skillLabel}
            />
          </div>

          <div className="card-in" style={{ animationDelay: '0.4s', marginTop: '1rem' }}>
            <a href="/" style={{ display: 'inline-block', background: '#111', color: '#666', padding: '0.65rem 1.5rem', borderRadius: 8, textDecoration: 'none', fontWeight: 500, fontSize: '0.8rem', border: '1px solid #222' }}>
              ← Try Another Skill
            </a>
          </div>

        </div>

        {/* Footer */}
        <div style={{ position: 'fixed', bottom: 12, left: 0, right: 0, textAlign: 'center', fontSize: '0.65rem', color: '#333', zIndex: 10 }}>
          © 2026 ZUME Datalab · All rights reserved
        </div>

      </main>
    </>
  )
}