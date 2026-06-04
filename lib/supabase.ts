import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export function createSupabaseBrowser() {
  return createClient(url, anon, {
    global: {
      headers: { 'sb-publishable-token': anon }
    }
  })
}

export function createSupabaseServer() {
  return createClient(url, process.env.SUPABASE_SERVICE_ROLE_KEY!)
}