'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { LayoutDashboard, Mountain, Car, Store, Settings, Menu, X } from 'lucide-react'

export default function Sidebar() {
  const pathname = usePathname()
  const isAdmin = pathname.startsWith('/admin')
  const [mobileOpen, setMobileOpen] = useState(false)

  const links = [
    { href: isAdmin ? '/admin' : '/', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/destinations', label: 'Destinations', icon: Mountain },
    { href: '/roadtrips', label: 'Upcoming Trips', icon: Car },
    { href: '/listings', label: 'Listings', icon: Store },
    { href: '/profile', label: 'Settings', icon: Settings },
  ]

  const NavLinks = () => (
    <nav className="flex flex-col gap-1">
      {links.map(({ href, label, icon: Icon }) => {
        const isActive = pathname === href
        return (
          <Link
            key={href}
            href={href}
            onClick={() => setMobileOpen(false)}
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
  )

  return (
    <>
      {/* Mobile top bar trigger */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-white border-b">
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 rounded-md border"
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-64 shrink-0 bg-white border-r min-h-screen flex-col py-6 px-4">
        <NavLinks />
      </aside>

      {/* Mobile drawer overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 md:hidden"
          onClick={() => setMobileOpen(false)}
        >
          <aside
            className="w-64 h-full bg-white p-4 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-end mb-4">
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 rounded-md border"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>
            <NavLinks />
          </aside>
        </div>
      )}
    </>
  )
}