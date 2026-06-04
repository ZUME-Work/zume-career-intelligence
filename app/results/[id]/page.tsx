import { createSupabaseServer } from '@/lib/supabase'
import { notFound } from 'next/navigation'

interface Props {
  params: { id: string }
}

export default async function ResultsPage({ params }: Props) {
  const supabase = createSupabaseServer()

  const { data: assessment, error } = await supabase
    .from('assessments')
    .select('*')
    .eq('assessment_id', params.id)
    .single()

  if (error || !assessment) return notFound()

  const percentage = Math.round((assessment.correct_count / assessment.total_questions) * 100)

  const getGrade = (pct: number) => {
    if (pct >= 80) return { label: 'Excellent', color: '#10B981' }
    if (pct >= 60) return { label: 'Good', color: '#3B82F6' }
    if (pct >= 40) return { label: 'Fair', color: '#F59E0B' }
    return { label: 'Needs Work', color: '#EF4444' }
  }

  const grade = getGrade(percentage)

  return (
    <main style={{ minHeight: '100vh', background: '#0a0a0a', color: '#fff', 
                   display: 'flex', alignItems: 'center', justifyContent: 'center',
                   fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ textAlign: 'center', maxWidth: 480, padding: '2rem' }}>

        {/* Score Circle */}
        <div style={{ width: 160, height: 160, borderRadius: '50%', 
                      border: `6px solid ${grade.color}`, margin: '0 auto 2rem',
                      display: 'flex', flexDirection: 'column',
                      alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ fontSize: '2.5rem', fontWeight: 700, color: grade.color }}>
            {percentage}%
          </div>
          <div style={{ fontSize: '0.8rem', color: '#999' }}>
            {assessment.correct_count}/{assessment.total_questions}
          </div>
        </div>

        {/* Grade */}
        <div style={{ fontSize: '1.5rem', fontWeight: 600, color: grade.color, marginBottom: '0.5rem' }}>
          {grade.label}
        </div>

        {/* Skill */}
        <div style={{ fontSize: '1rem', color: '#999', marginBottom: '2rem', textTransform: 'capitalize' }}>
          {assessment.skill} Assessment
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          <div style={{ background: '#1a1a1a', borderRadius: 12, padding: '1rem' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{assessment.correct_count}</div>
            <div style={{ fontSize: '0.75rem', color: '#666', marginTop: 4 }}>Correct</div>
          </div>
          <div style={{ background: '#1a1a1a', borderRadius: 12, padding: '1rem' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>
              {assessment.duration_sec ? `${Math.round(assessment.duration_sec / 60)}m` : '—'}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#666', marginTop: 4 }}>Time</div>
          </div>
        </div>

        {/* Percentile (if available) */}
        {assessment.percentile && (
          <div style={{ background: '#1a1a2e', border: '1px solid #3B82F6', 
                        borderRadius: 12, padding: '1rem', marginBottom: '2rem' }}>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#3B82F6' }}>
              Top {100 - assessment.percentile}%
            </div>
            <div style={{ fontSize: '0.75rem', color: '#666', marginTop: 4 }}>
              vs all test takers
            </div>
          </div>
        )}

        {/* CTA */}
        <a href="/" style={{ display: 'inline-block', background: '#3B82F6', color: '#fff',
                              padding: '0.75rem 2rem', borderRadius: 8, textDecoration: 'none',
                              fontWeight: 600, fontSize: '0.9rem' }}>
          Try Another Assessment
        </a>

      </div>
    </main>
  )
}