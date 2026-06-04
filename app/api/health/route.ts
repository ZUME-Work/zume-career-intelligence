import { createSupabaseServer } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = createSupabaseServer()
  const { error } = await supabase.from('questions').select('count')
  if (error) return NextResponse.json({ ok: false, error }, { status: 500 })
  return NextResponse.json({ ok: true, message: 'Supabase connected ✓' })
}