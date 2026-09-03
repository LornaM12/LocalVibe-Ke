import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { getUserWithRole } from '@/lib/supabase/getUserRole'

export const dynamic = 'force-dynamic'

export default async function AdminOverviewPage() {
  const { fullName } = await getUserWithRole()
  const supabase = await createClient()

  const [
    { count: destinationsCount },
    { count: roadtripsCount },
    { count: listingsCount },
    { count: usersCount },
  ] = await Promise.all([
    supabase.from('destinations_table').select('*', { count: 'exact', head: true }),
    supabase.from('roadtrips_table').select('*', { count: 'exact', head: true }),
    supabase.from('listings_table').select('*', { count: 'exact', head: true }),
    supabase.from('profiles').select('*', { count: 'exact', head: true }),
  ])

  const stats = [
    { label: 'Destinations', count: destinationsCount ?? 0, href: '/admin/destinations' },
    { label: 'Road Trips', count: roadtripsCount ?? 0, href: '/admin/roadtrips' },
    { label: 'Listings', count: listingsCount ?? 0, href: '/admin/listings' },
    { label: 'Users', count: usersCount ?? 0, href: '/admin/users' },
  ]

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-blue-950">Admin Dashboard</h1>
      <p className="text-gray-600 mt-1">Welcome back, {fullName}.</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="border rounded-xl p-5 hover:shadow-md transition-shadow bg-white"
          >
            <p className="text-3xl font-bold text-blue-900">{stat.count}</p>
            <p className="text-sm text-gray-600 mt-1">{stat.label}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}