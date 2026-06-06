import { createSupabaseServer } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import EmailGate from './EmailGate'
import ResultClient from './ResultClient'

export default async function ResultsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = createSupabaseServer()
  const { data: assessment, error } = await supabase.from('assessments').select('*').eq('assessment_id', id).single()
  if (error || !assessment) return notFound()

  const pct = Math.round((assessment.correct_count / assessment.total_questions) * 100)
  const color = pct >= 70 ? '#10B981' : pct >= 50 ? '#F59E0B' : '#EF4444'
  const label = pct >= 70 ? 'ยอดเยี่ยม' : pct >= 50 ? 'ดี' : 'ต้องพัฒนาต่อ'
  const skillLabel = assessment.skill.toUpperCase()
  const isGoodScore = pct >= 70

  const Navbar = () => (
    <nav style={{ background:'#fff', boxShadow:'0 1px 0 rgba(0,0,0,0.06)', position:'sticky', top:0, zIndex:100 }}>
      <div style={{ maxWidth:880, margin:'0 auto', padding:'13px 20px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <a href="/" style={{ fontWeight:800, fontSize:17, color:'#111', textDecoration:'none' }}>
          ZUME <span style={{ color:'#4F46E5', fontWeight:500 }}>Datalab</span>
        </a>
        <a href="https://www.facebook.com/profile.php?id=61581811456373" target="_blank" rel="noopener noreferrer"
          style={{ display:'flex', alignItems:'center', gap:7, background:'#fff', color:'#16A34A', padding:'7px 14px', borderRadius:20, textDecoration:'none', fontSize:13, fontWeight:600, boxShadow:'0 2px 8px rgba(22,163,74,0.15)' }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
          ZUME Datalab
        </a>
      </div>
    </nav>
  )

  return (
    <>
      <style>{`
        * { box-sizing:border-box; margin:0; padding:0; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        .f1{animation:fadeUp 0.5s ease both}
        .f2{animation:fadeUp 0.5s 0.1s ease both}
        .f3{animation:fadeUp 0.5s 0.15s ease both}
        .f4{animation:fadeUp 0.5s 0.2s ease both}
        @media(max-width:640px){
          .results-inner{padding:1.5rem 1rem !important}
          .stat-grid{gap:0.75rem !important}
        }
      `}</style>

      <Navbar />

      <main style={{ minHeight:'calc(100vh - 50px)', background:'#F8F9FA', fontFamily:'system-ui,sans-serif', padding:'2rem 1rem 4rem' }}>
        <div className="results-inner" style={{ maxWidth:460, margin:'0 auto', padding:'0 1rem' }}>

          {/* Score Card */}
          <div className="f1" style={{ background:'#fff', borderRadius:24, padding:'2rem', boxShadow:'0 4px 24px rgba(0,0,0,0.08)', textAlign:'center', marginBottom:16 }}>
            <div style={{ width:140, height:140, borderRadius:'50%', border:`5px solid ${color}`, margin:'0 auto 1.25rem', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', boxShadow:`0 0 32px ${color}33` }}>
              <div style={{ fontSize:'2.4rem', fontWeight:800, color, lineHeight:1 }}>{pct}%</div>
              <div style={{ fontSize:'0.75rem', color:'#aaa', marginTop:4 }}>{assessment.correct_count}/{assessment.total_questions}</div>
            </div>
            <div style={{ fontSize:'1.5rem', fontWeight:700, color, marginBottom:'0.3rem' }}>{label}</div>
            <div style={{ fontSize:'0.9rem', color:'#aaa', marginBottom:'1.5rem' }}>{skillLabel} Assessment</div>

            <div className="stat-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem', marginBottom:'1.5rem' }}>
              <div style={{ background:'#F8F9FA', borderRadius:12, padding:'1rem' }}>
                <div style={{ fontSize:'1.5rem', fontWeight:700, color:'#111' }}>{assessment.correct_count}</div>
                <div style={{ fontSize:'0.7rem', color:'#aaa', marginTop:4, textTransform:'uppercase', letterSpacing:0.5 }}>ตอบถูก</div>
              </div>
              <div style={{ background:'#F8F9FA', borderRadius:12, padding:'1rem' }}>
                <div style={{ fontSize:'1.5rem', fontWeight:700, color:'#111' }}>
                  {assessment.duration_sec ? assessment.duration_sec < 60 ? `${assessment.duration_sec}s` : `${Math.round(assessment.duration_sec/60)}m` : '—'}
                </div>
                <div style={{ fontSize:'0.7rem', color:'#aaa', marginTop:4, textTransform:'uppercase', letterSpacing:0.5 }}>เวลา</div>
              </div>
            </div>

            <div style={{ height:8, background:'#F0F0F0', borderRadius:4, overflow:'hidden', marginBottom:8 }}>
              <div style={{ height:'100%', width:`${pct}%`, background:color, borderRadius:4, transition:'width 1s ease', boxShadow:`0 0 8px ${color}66` }} />
            </div>
            <div style={{ display:'flex', justifyContent:'space-between', fontSize:'0.7rem', color:'#ccc' }}>
              <span style={{ color:'#EF4444' }}>ต้องพัฒนา</span>
              <span style={{ color:'#F59E0B' }}>ดี</span>
              <span style={{ color:'#10B981' }}>ยอดเยี่ยม</span>
            </div>
          </div>

          {/* Email Gate */}
          <div className="f2" style={{ marginBottom:12 }}>
            <EmailGate assessmentId={id} initialUnlocked={assessment.email_unlocked} percentile={assessment.percentile} skillLabel={skillLabel} />
          </div>

          <div className="f3" style={{ textAlign:'center' }}>
            <a href="/" style={{ display:'inline-block', background:'#fff', color:'#aaa', padding:'0.65rem 1.5rem', borderRadius:8, textDecoration:'none', fontWeight:500, fontSize:'0.8rem', boxShadow:'0 2px 8px rgba(0,0,0,0.06)' }}>
              ← ลองทดสอบ Skill อื่น
            </a>
          </div>

        </div>
      </main>

      <div style={{ position:'fixed', bottom:12, left:0, right:0, textAlign:'center', fontSize:'0.65rem', color:'#ccc', zIndex:10 }}>
        © 2026 ZUME Datalab · All rights reserved
      </div>

      <ResultClient isGoodScore={isGoodScore} pct={pct} />
    </>
  )
}
