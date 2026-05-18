'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function ForgotPasswordPage() {
  const supabase = createClient()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    // Always show success — never reveal if email exists
    await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })

    setLoading(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-8 shadow-sm text-center">
        <div className="w-12 h-12 rounded-full bg-[#D1FAE5] flex items-center justify-center mx-auto mb-4">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#064E3B" strokeWidth="2">
            <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h1 className="text-xl font-semibold text-[#1A1A1A] mb-2">Check your email</h1>
        <p className="text-[#64748B] mb-6">
          If that email is in our system, you&apos;ll receive a reset link within a few minutes.
        </p>
        <Link href="/signin" className="text-[#064E3B] font-medium hover:underline text-sm">
          Back to sign in
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] p-8 shadow-sm">
      <h1 className="text-2xl font-semibold text-[#1A1A1A] mb-1">Reset your password</h1>
      <p className="text-[#64748B] mb-6">
        Enter your email and we&apos;ll send a reset link if we find an account.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          label="Email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button type="submit" loading={loading} className="w-full">
          Send reset link
        </Button>
      </form>

      <p className="text-center text-sm text-[#64748B] mt-6">
        <Link href="/signin" className="text-[#064E3B] font-medium hover:underline">
          Back to sign in
        </Link>
      </p>
    </div>
  )
}
