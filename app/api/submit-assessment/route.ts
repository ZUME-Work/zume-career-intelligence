import { createSupabaseServer } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { skill, score, totalQuestions, correctCount, durationSec, responses, email } = await req.json()

  if (!skill || score === undefined || !totalQuestions || correctCount === undefined) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  const supabase = createSupabaseServer()

  // Check cooldown if email provided
  if (email) {
    const { data: cooldown } = await supabase
      .rpc('check_assessment_cooldown', { p_email: email, p_skill: skill })

    if (cooldown && !cooldown.allowed) {
      return NextResponse.json({
        error: 'cooldown',
        message: `คุณได้ทำ ${skill.toUpperCase()} assessment ไปแล้วในช่วง 90 วัน`,
        nextAvailable: cooldown.nextAvailable,
        daysRemaining: cooldown.daysRemaining,
      }, { status: 429 })
    }
  }

  // Insert assessment
  const { data: assessment, error: assessmentError } = await supabase
    .from('assessments')
    .insert({
      skill,
      score,
      total_questions: totalQuestions,
      correct_count: correctCount,
      duration_sec: durationSec ?? null,
      email_unlocked: false,
    })
    .select('assessment_id')
    .single()

  if (assessmentError) {
    console.error('Assessment insert error:', assessmentError)
    return NextResponse.json({ error: assessmentError.message }, { status: 500 })
  }

  const assessmentId = assessment.assessment_id

  // Insert responses
  if (responses && responses.length > 0) {
    const responseRows = responses.map((r: any) => ({
      assessment_id: assessmentId,
      question_id: r.questionId,
      user_answer: r.userAnswer,
      is_correct: r.isCorrect,
      time_spent_sec: r.timeSpentSec ?? null,
    }))
    await supabase.from('responses').insert(responseRows)
  }

  // Calculate percentile
  const { data: percentileData } = await supabase
    .rpc('calculate_percentile', {
      p_assessment_id: assessmentId,
      p_skill: skill,
      p_score: score,
    })

  return NextResponse.json({
    ok: true,
    assessmentId,
    percentile: percentileData ?? null,
  })
}