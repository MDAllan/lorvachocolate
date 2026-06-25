'use client'

import { Suspense, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { signIn } from '@/lib/auth/client'

function LoginForm() {
  const router = useRouter()
  const params = useSearchParams()
  const from = params.get('from') ?? '/admin/products'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const result = await signIn.email({
        email,
        password,
        callbackURL: from,
      })

      if (result?.error) {
        setError('Invalid email or password.')
      } else {
        router.push(from)
        router.refresh()
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a0c0a] px-4">
      <div className="w-full max-w-sm">
        {/* Brand */}
        <div className="text-center mb-10">
          <p className="font-cormorant text-3xl text-cream tracking-[0.3em] uppercase">Lorva</p>
          <p className="font-inter text-[9px] tracking-[0.5em] text-champagne-gold/60 uppercase mt-1">
            Admin Portal
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-deep-cocoa p-8 space-y-5">
          <div className="space-y-1.5">
            <label className="block font-inter text-xs tracking-widest text-cream/60 uppercase">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="w-full bg-white/5 border border-white/10 text-cream font-inter text-sm px-4 py-3 focus:outline-none focus:border-champagne-gold/40 transition-colors placeholder:text-cream/20"
              placeholder="your@email.com"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block font-inter text-xs tracking-widest text-cream/60 uppercase">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="w-full bg-white/5 border border-white/10 text-cream font-inter text-sm px-4 py-3 focus:outline-none focus:border-champagne-gold/40 transition-colors placeholder:text-cream/20"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="font-inter text-xs text-red-400">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cocoa-wine text-cream font-inter text-xs tracking-widest uppercase py-3.5 hover:bg-cocoa-wine/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <p className="text-center font-inter text-[10px] text-cream/20 mt-8 tracking-wide">
          Lorva Fine Chocolate · Admin Only
        </p>
      </div>
    </div>
  )
}

export default function AdminLoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  )
}
