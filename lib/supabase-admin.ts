import { createClient } from '@supabase/supabase-js'

// Server-only client using service role — bypasses RLS, never use in browser
export function createAdminSupabaseClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}
