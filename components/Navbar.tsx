'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronUp, ChevronDown, User } from 'lucide-react'

type NavbarProps = {
  isLoggedIn: boolean
  role: string | null
  fullName?: string | null
}

export default function Navbar({ isLoggedIn, role, fullName }: NavbarProps) {
  const [collapsed, setCollapsed] = useState(false)

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
    <header className="w-full flex items-center justify-between gap-2 px-4 sm:px-6 py-3 sm:py-4 bg-white border-b flex-wrap">
      <Link href="/" className="text-lg sm:text-xl font-bold shrink-0">
        <span className="text-blue-950">LocalVibe</span>{' '}
        <span className="text-orange-500">Kenya</span>
      </Link>

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
  )
}