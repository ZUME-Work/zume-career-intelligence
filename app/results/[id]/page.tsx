import { createSupabaseServer } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import EmailGate from './EmailGate'
import ResultClient from './ResultClient'

const CSS = `
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{font-family:'Inter',-apple-system,sans-serif;-webkit-font-smoothing:antialiased;background:#0A0A0A;color:#fff}
.nav{position:sticky;top:0;z-index:200;height:56px;background:rgba(10,10,10,0.92);backdrop-filter:blur(16px);border-bottom:1px solid rgba(255,255,255,0.07);display:flex;align-items:center}
.nav-inner{width:100%;max-width:1120px;margin:0 auto;padding:0 24px;display:flex;justify-content:space-between;align-items:center}
.logo{font-size:15px;font-weight:800;color:#fff;text-decoration:none;letter-spacing:-0.4px}
.logo-dot{color:#6366F1}
.nav-link{font-size:13px;color:rgba(255,255,255,0.3);text-decoration:none;transition:color .15s}
.nav-link:hover{color:rgba(255,255,255,0.6)}
.main{padding:40px 20px 80px}
.wrap{max-width:480px;margin:0 auto}
@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
.f1{animation:fadeUp .5s ease both}
.f2{animation:fadeUp .5s .08s ease both}
.f3{animation:fadeUp .5s .16s ease both}
.f4{animation:fadeUp .5s .24s ease both}

.score-card{background:#111;border:1px solid rgba(255,255,255,0.07);border-radius:20px;padding:36px 24px;text-align:center;margin-bottom:14px}
.score-ring-wrap{margin:0 auto 20px;position:relative;width:140px;height:140px}
.score-ring{transform:rotate(-90deg)}
.score-center{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center}
.score-num{font-size:38px;font-weight:800;letter-spacing:-1.5px;line-height:1}
.score-sub{font-size:12px;color:rgba(255,255,255,0.25);margin-top:4px}
.score-label{font-size:18px;font-weight:700;margin-bottom:4px;letter-spacing:-0.3px}
.score-skill{font-size:12px;color:rgba(255,255,255,0.3);margin-bottom:24px;text-transform:uppercase;letter-spacing:.08em}
.stat-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:24px}
.stat-box{background:rgba(255,255,255,0.04);border-radius:12px;padding:16px;text-align:center}
.stat-val{font-size:22px;font-weight:700;color:#fff;margin-bottom:4px}
.stat-lbl{font-size:11px;color:rgba(255,255,255,0.3);text-transform:uppercase;letter-spacing:.08em}
.bar-track{height:4px;background:rgba(255,255,255,0.08);border-radius:2px;overflow:hidden;margin-bottom:8px}
.bar-fill{height:100%;border-radius:2px;transition:width 1.2s cubic-bezier(.16,1,.3,1)}
.bar-labels{display:flex;justify-content:space-between;font-size:10px;color:rgba(255,255,255,0.2)}
`

export default async function ResultsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = createSupabaseServer()
  const { data: assessment, error } = await supabase.from('assessments').select('*').eq('assessment_id', id).single()
  if (error || !assessment) return notFound()

  const pct = Math.round((assessment.correct_count / assessment.total_questions) * 100)
  const color = pct >= 70 ? '#10B981' : pct >= 50 ? '#F59E0B' : '#EF4444'
  const label = pct >= 70 ? 'ยอดเยี่ยม' : pct >= 50 ? 'ดี' : 'ต้องพัฒนาต่อ'
  const skillLabel = assessment.skill.toUpperCase()
  const r = 54; const circ = 2 * Math.PI * r
  const dash = (pct / 100) * circ

  return (
    <>
      <style>{CSS}</style>
      <nav className="nav">
        <div className="nav-inner">
          <a href="/" className="logo">ZUME<span className="logo-dot">.</span>Datalab</a>
          <a href="/" className="nav-link">← ทดสอบ Skill อื่น</a>
        </div>
      </nav>
      <div className="main">
        <div className="wrap">
          <div className="score-card f1">
            <div className="score-ring-wrap">
              <svg className="score-ring" width="140" height="140" viewBox="0 0 140 140">
                <circle cx="70" cy="70" r={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="8"/>
                <circle cx="70" cy="70" r={r} fill="none" stroke={color} strokeWidth="8"
                  strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
                  style={{ transition:'stroke-dasharray 1.2s cubic-bezier(.16,1,.3,1)' }}/>
              </svg>
              <div className="score-center">
                <div className="score-num" style={{ color }}>{pct}%</div>
                <div className="score-sub">{assessment.correct_count}/{assessment.total_questions}</div>
              </div>
            </div>
            <div className="score-label" style={{ color }}>{label}</div>
            <div className="score-skill">{skillLabel} Assessment</div>
            <div className="stat-grid">
              <div className="stat-box">
                <div className="stat-val">{assessment.correct_count}</div>
                <div className="stat-lbl">ตอบถูก</div>
              </div>
              <div className="stat-box">
                <div className="stat-val">{assessment.duration_sec ? assessment.duration_sec < 60 ? `${assessment.duration_sec}s` : `${Math.round(assessment.duration_sec/60)}m` : '—'}</div>
                <div className="stat-lbl">เวลา</div>
              </div>
            </div>
            <div className="bar-track">
              <div className="bar-fill" style={{ width:`${pct}%`, background:color }}/>
            </div>
            <div className="bar-labels">
              <span style={{color:'#EF4444'}}>ต้องพัฒนา</span>
              <span style={{color:'#F59E0B'}}>ดี</span>
              <span style={{color:'#10B981'}}>ยอดเยี่ยม</span>
            </div>
          </div>
          <div className="f2">
            <EmailGate assessmentId={id} initialUnlocked={assessment.email_unlocked} percentile={assessment.percentile} skillLabel={skillLabel}/>
          </div>
        </div>
      </div>
      <ResultClient isGoodScore={pct >= 70} pct={pct}/>
    </>
  )
}
