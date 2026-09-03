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
    <header className="w-full flex items-center justify-between px-6 py-4 bg-white border-b">
      <Link href="/" className="text-xl font-bold">
        <span className="text-blue-950">LocalVibe</span>{' '}
        <span className="text-orange-500">Kenya</span>
      </Link>

      <div className="flex items-center gap-3">
        <Link
          href="/plan-my-trip"
          className="bg-blue-950 hover:bg-blue-900 text-white px-4 py-2 rounded-full text-sm font-semibold transition-colors"
        >
          + Plan New Trip
        </Link>

        {role === 'admin' && (
          <Link
            href="/admin"
            className="bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-semibold hover:bg-orange-200 transition-colors"
          >
            Admin
          </Link>
        )}

        {isLoggedIn ? (
          <Link href="/profile" className="p-2 rounded-full border" aria-label="Profile">
            <User size={18} />
          </Link>
        ) : (
          <Link href="/login" className="text-sm font-semibold">
            Log In
          </Link>
        )}

        <button
          onClick={() => setCollapsed(true)}
          className="p-2 rounded-full border"
          aria-label="Hide navigation"
        >
          <ChevronUp size={18} />
        </button>
      </div>
    </header>
  )
}