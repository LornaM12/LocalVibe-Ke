import { login } from '@/app/auth/actions'
import Link from 'next/link'

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; message?: string }>
}) {
  const params = await searchParams

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-6">
        <h1 className="text-2xl font-bold text-center">Log In</h1>

        {params.message && (
          <p className="text-sm text-green-600 text-center">{params.message}</p>
        )}
        {params.error && (
          <p className="text-sm text-red-600 text-center">{params.error}</p>
        )}

        <form className="space-y-4">
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
              className="w-full border rounded-md px-3 py-2"
            />
          </div>

          <button
            formAction={login}
            className="w-full bg-green-800 text-white rounded-md py-2 font-medium"
          >
            Log In
          </button>
        </form>

        <p className="text-sm text-center">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="text-green-800 underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}