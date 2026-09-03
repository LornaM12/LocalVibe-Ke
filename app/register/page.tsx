import { signup } from '@/app/auth/actions'
import Link from 'next/link'

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const params = await searchParams

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-6">
        <h1 className="text-2xl font-bold text-center">Sign Up</h1>

        {params.error && (
          <p className="text-sm text-red-600 text-center">{params.error}</p>
        )}

        <form className="space-y-4">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium mb-1">
              Full Name
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              required
              className="w-full border rounded-md px-3 py-2"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full border rounded-md px-3 py-2"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={6}
              className="w-full border rounded-md px-3 py-2"
            />
          </div>

          <button
            formAction={signup}
            className="w-full bg-green-800 text-white rounded-md py-2 font-medium"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm text-center">
          Already have an account?{' '}
          <Link href="/login" className="text-green-800 underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  )
}