'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Mountain, Car, Store, Settings } from 'lucide-react'

export default function Sidebar() {
  const pathname = usePathname()
  const isAdmin = pathname.startsWith('/admin')

  const links = [
    { href: isAdmin ? '/admin' : '/', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/destinations', label: 'Destinations', icon: Mountain },
    { href: '/roadtrips', label: 'Upcoming Trips', icon: Car },
    { href: '/listings', label: 'Listings', icon: Store },
    { href: '/profile', label: 'Settings', icon: Settings },
  ]

  return (
    <aside className="w-64 shrink-0 bg-white border-r min-h-screen flex flex-col py-6 px-4">
      <nav className="flex flex-col gap-1">
        {links.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-orange-500 text-white'
                  : 'text-slate-600 hover:bg-orange-50'
              }`}
            >
              <Icon size={18} />
              {label}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}