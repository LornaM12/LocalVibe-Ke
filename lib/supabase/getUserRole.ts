import { createClient } from '@/lib/supabase/server'

export async function getUserWithRole() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { user: null, role: null }
  }

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('role, full_name, country')
    .eq('id', user.id)
    .single()



  return {
    user,
    role: profile?.role ?? 'user',
    fullName: profile?.full_name,
    country: profile?.country,
  }
}