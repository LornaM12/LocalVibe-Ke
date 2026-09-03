'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronUp, ChevronDown, User, Menu, X, LayoutDashboard, Mountain, Car, Store, Settings } from 'lucide-react'

type NavbarProps = {
  isLoggedIn: boolean
  role: string | null
  fullName?: string | null
}

export default function Navbar({ isLoggedIn, role, fullName }: NavbarProps) {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const isAdmin = pathname.startsWith('/admin')

  const links = [
    { href: isAdmin ? '/admin' : '/', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/destinations', label: 'Destinations', icon: Mountain },
    { href: '/roadtrips', label: 'Upcoming Trips', icon: Car },
    { href: '/listings', label: 'Listings', icon: Store },
    { href: '/profile', label: 'Settings', icon: Settings },
  ]

  if (collapsed) {
    return (
      <button
        onClick={() => setCollapsed(false)}
        className="fixed top-2 left-1/2 -translate-x-1/2 z-50 bg-blue-950 text-white rounded-full p-2 shadow-lg"
        aria-label="Show navigation"
      >
        <ChevronDown size={18} />
      </button>
    )
  }

  return (
    <>
      <header className="w-full flex items-center justify-between gap-2 px-4 sm:px-6 py-3 sm:py-4 bg-white border-b flex-wrap">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden p-2 rounded-md border shrink-0"
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>

          <Link href="/" className="text-lg sm:text-xl font-bold shrink-0">
            <span className="text-blue-950">LocalVibe</span>{' '}
            <span className="text-orange-500">Kenya</span>
          </Link>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-end">
          <Link
            href="/plan-my-trip"
            className="bg-blue-950 hover:bg-blue-900 text-white px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap"
          >
            <span className="hidden sm:inline">+ Plan New Trip</span>
            <span className="sm:hidden">+ Trip</span>
          </Link>

          {role === 'admin' && (
            <Link
              href="/admin"
              className="bg-orange-100 text-orange-700 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold hover:bg-orange-200 transition-colors"
            >
              Admin
            </Link>
          )}

          {isLoggedIn ? (
            <Link href="/profile" className="p-2 rounded-full border shrink-0" aria-label="Profile">
              <User size={18} />
            </Link>
          ) : (
            <Link href="/login" className="text-xs sm:text-sm font-semibold whitespace-nowrap">
              Log In
            </Link>
          )}

          <button
            onClick={() => setCollapsed(true)}
            className="p-2 rounded-full border shrink-0 hidden sm:block"
            aria-label="Hide navigation"
          >
            <ChevronUp size={18} />
          </button>
        </div>
      </header>

      {/* Mobile drawer overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 md:hidden"
          onClick={() => setMobileOpen(false)}
        >
          <aside
            className="w-64 h-full bg-white p-4 flex flex-col overflow-y-auto"
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
          </aside>
        </div>
      )}
    </>
  )
}