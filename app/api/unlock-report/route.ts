import { createSupabaseServer } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { email, assessmentId } = await req.json()

  if (!email || !assessmentId) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  const supabase = createSupabaseServer()

  // Upsert user by email
  const { data: user, error: userError } = await supabase
    .from('users')
    .upsert({ email }, { onConflict: 'email' })
    .select('user_id')
    .single()

  if (userError) {
    console.error('User upsert error:', userError)
    return NextResponse.json({ error: userError.message }, { status: 500 })
  }

  // Mark assessment as unlocked
  const { error: updateError } = await supabase
    .from('assessments')
    .update({ email_unlocked: true, user_id: user.user_id })
    .eq('assessment_id', assessmentId)

  if (updateError) {
    console.error('Assessment update error:', updateError)
    return NextResponse.json({ error: updateError.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}