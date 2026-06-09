import { createSupabaseServer } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import EmailGate from './EmailGate'
import ResultClient from './ResultClient'

const CSS = `
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{font-family:-apple-system,'Inter',sans-serif;-webkit-font-smoothing:antialiased;background:#FAFAF8;color:#111}

.nav{height:52px;background:rgba(253,252,251,0.95);backdrop-filter:blur(12px);border-bottom:1px solid #EDE9E3;display:flex;align-items:center;position:sticky;top:0;z-index:100}
.nav-inner{width:100%;max-width:600px;margin:0 auto;padding:0 20px;display:flex;justify-content:space-between;align-items:center}
.logo{font-size:15px;font-weight:800;color:#111;text-decoration:none;letter-spacing:-.3px}
.logo-dot{color:#2563EB}
.nav-link{font-size:13px;color:#B8B0A5;text-decoration:none;transition:color .15s}
.nav-link:hover{color:#6B6560}

.main{padding:28px 20px 64px;max-width:560px;margin:0 auto}
@keyframes fu{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
.f1{animation:fu .45s ease both}
.f2{animation:fu .45s .08s ease both}
.f3{animation:fu .45s .16s ease both}

.score-block{margin-bottom:24px}
.score-row{display:flex;align-items:flex-end;gap:20px;margin-bottom:20px}
.ring-wrap{width:80px;height:80px;flex-shrink:0}
.score-right{}
.score-pct{font-size:44px;font-weight:800;letter-spacing:-2px;line-height:1;color:#111}
.score-verdict{font-size:14px;font-weight:600;margin-top:4px}
.score-skill{font-size:11px;color:#B8B0A5;text-transform:uppercase;letter-spacing:.07em;margin-top:3px}

.bar-wrap{margin-bottom:4px}
.bar-track{height:6px;background:#EDE9E3;border-radius:3px;overflow:hidden;position:relative}
.bar-fill{height:100%;border-radius:3px;transition:width 1s cubic-bezier(.16,1,.3,1)}
.bar-tick{position:absolute;top:0;height:6px;width:2px;background:#fff;opacity:.9}
.bar-labels{display:flex;justify-content:space-between;margin-top:5px;font-size:10px;color:#C4BBB0}

.divider{height:1px;background:#EDE9E3;margin:20px 0}

.stats-row{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:24px}
.stat-box{background:#F4F1EC;border-radius:10px;padding:16px;text-align:center}
.stat-v{font-size:26px;font-weight:800;color:#111;letter-spacing:-.5px;margin-bottom:3px}
.stat-l{font-size:10px;color:#B8B0A5;text-transform:uppercase;letter-spacing:.07em}
`

export default async function ResultsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = createSupabaseServer()
  const { data: assessment, error } = await supabase.from('assessments').select('*').eq('assessment_id', id).single()
  if (error || !assessment) return notFound()

  const pct = Math.round((assessment.correct_count / assessment.total_questions) * 100)
  const color = pct >= 70 ? '#059669' : pct >= 50 ? '#D97706' : '#DC2626'
  const verdict = pct >= 70 ? 'ยอดเยี่ยม' : pct >= 50 ? 'ดี — ยังพัฒนาได้' : 'ต้องพัฒนาต่อ'
  const skillLabel = assessment.skill.toUpperCase()
  const dur = assessment.duration_sec
  const durStr = dur ? (dur < 60 ? `${dur}s` : `${Math.floor(dur/60)}:${String(dur%60).padStart(2,'0')}`) : '—'
  const r = 30; const circ = 2 * Math.PI * r; const dash = (pct / 100) * circ

  return (
    <>
      <style>{CSS}</style>
      <nav className="nav">
        <div className="nav-inner">
          <a href="/" className="logo">ZUME<span className="logo-dot">.</span>Datalab</a>
          <a href="/" className="nav-link">← Skill อื่น</a>
        </div>
      </nav>
      <div className="main">

        <div className="score-block f1">
          <div className="score-row">
            <svg className="ring-wrap" viewBox="0 0 80 80">
              <circle cx="40" cy="40" r={r} fill="none" stroke="#EDE9E3" strokeWidth="6"/>
              <circle cx="40" cy="40" r={r} fill="none" stroke={color} strokeWidth="6"
                strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
                transform="rotate(-90 40 40)"
                style={{ transition:'stroke-dasharray 1s cubic-bezier(.16,1,.3,1)' }}/>
            </svg>
            <div className="score-right">
              <div className="score-pct" style={{ color }}>{pct}%</div>
              <div className="score-verdict" style={{ color }}>{verdict}</div>
              <div className="score-skill">{skillLabel} · {assessment.total_questions} ข้อ</div>
            </div>
          </div>

          <div className="bar-wrap">
            <div className="bar-track">
              <div className="bar-fill" style={{ width:`${pct}%`, background:color }}/>
              <div className="bar-tick" style={{ left:'50%' }}/>
              <div className="bar-tick" style={{ left:'70%' }}/>
            </div>
            <div className="bar-labels">
              <span>0</span>
              <span style={{ color:'#D97706' }}>50 ดี</span>
              <span style={{ color:'#059669' }}>70 ยอดเยี่ยม</span>
              <span>100</span>
            </div>
          </div>
        </div>

        <div className="stats-row f2">
          <div className="stat-box">
            <div className="stat-v">{assessment.correct_count}</div>
            <div className="stat-l">ตอบถูก</div>
          </div>
          <div className="stat-box">
            <div className="stat-v">{durStr}</div>
            <div className="stat-l">เวลาที่ใช้</div>
          </div>
        </div>

        <div className="f3">
          <EmailGate
            assessmentId={id}
            initialUnlocked={assessment.email_unlocked}
            percentile={assessment.percentile}
            skillLabel={skillLabel}
          />
        </div>

      </div>
      <ResultClient isGoodScore={pct >= 70} pct={pct} />
    </>
  )
}
