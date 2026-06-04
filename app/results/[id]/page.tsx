import { createSupabaseServer } from '@/lib/supabase'
import { notFound } from 'next/navigation'

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
  const color = pct >= 80 ? '#10B981' : pct >= 60 ? '#3B82F6' : pct >= 40 ? '#F59E0B' : '#EF4444'
  const label = pct >= 80 ? 'Excellent' : pct >= 60 ? 'Good' : pct >= 40 ? 'Fair' : 'Needs Work'

  return (
    <main style={{ minHeight:'100vh', background:'#0a0a0a', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'system-ui,sans-serif' }}>
      <div style={{ textAlign:'center', maxWidth:480, padding:'2rem' }}>

        <div style={{ width:160, height:160, borderRadius:'50%', border:`6px solid ${color}`, margin:'0 auto 2rem', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center' }}>
          <div style={{ fontSize:'2.5rem', fontWeight:700, color }}>{pct}%</div>
          <div style={{ fontSize:'0.8rem', color:'#999' }}>{assessment.correct_count}/{assessment.total_questions}</div>
        </div>

        <div style={{ fontSize:'1.5rem', fontWeight:600, color, marginBottom:'0.5rem' }}>{label}</div>
        <div style={{ fontSize:'1rem', color:'#999', marginBottom:'2rem', textTransform:'capitalize' }}>{assessment.skill} Assessment</div>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem', marginBottom:'2rem' }}>
          <div style={{ background:'#1a1a1a', borderRadius:12, padding:'1rem' }}>
            <div style={{ fontSize:'1.5rem', fontWeight:700 }}>{assessment.correct_count}</div>
            <div style={{ fontSize:'0.75rem', color:'#666', marginTop:4 }}>Correct</div>
          </div>
          <div style={{ background:'#1a1a1a', borderRadius:12, padding:'1rem' }}>
            <div style={{ fontSize:'1.5rem', fontWeight:700 }}>{assessment.duration_sec ? `${Math.round(assessment.duration_sec/60)}m` : '—'}</div>
            <div style={{ fontSize:'0.75rem', color:'#666', marginTop:4 }}>Time</div>
          </div>
        </div>

        <a href="/" style={{ display:'inline-block', background:'#3B82F6', color:'#fff', padding:'0.75rem 2rem', borderRadius:8, textDecoration:'none', fontWeight:600, fontSize:'0.9rem' }}>
          Try Another Assessment
        </a>

      </div>
    </main>
  )
}