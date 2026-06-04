import { createSupabaseServer } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { email, roleCurrent, yearsExp, targetRole, salaryBand } = await req.json()

  if (!email) return NextResponse.json({ error: 'Missing email' }, { status: 400 })

  const supabase = createSupabaseServer()

  const { error } = await supabase
    .from('users')
    .update({
      role_current: roleCurrent || null,
      years_exp: yearsExp || null,
      target_role: targetRole || null,
      salary_band: salaryBand || null,
    })
    .eq('email', email)

  if (error) {
    console.error('Profile update error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}