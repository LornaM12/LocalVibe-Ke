import { redirect } from 'next/navigation'
import { getUserWithRole } from '@/lib/supabase/getUserRole'

export const dynamic = 'force-dynamic'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, role } = await getUserWithRole()

  console.log('DEBUG — user:', user?.email, '| role:', role)
  

  if (!user) {
    redirect('/login')
  }

  if (role !== 'admin') {
    redirect('/')
  }

  return <>{children}</>
}