'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function ResetPasswordPage() {
  const router = useRouter()
  const supabase = createClient()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (password !== confirm) {
      setError('Passwords do not match.')
      return
    }

    setLoading(true)
    const { error } = await supabase.auth.updateUser({ password })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    router.push('/signin')
  }

  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] p-8 shadow-sm">
      <h1 className="text-2xl font-semibold text-[#1A1A1A] mb-1">Set new password</h1>
      <p className="text-[#64748B] mb-6">Choose a strong password for your account.</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          label="New password"
          type="password"
          placeholder="Min. 8 characters"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={8}
        />
        <Input
          label="Confirm password"
          type="password"
          placeholder="Same password again"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
          error={error || undefined}
        />
        <Button type="submit" loading={loading} className="w-full">
          Update password
        </Button>
      </form>
    </div>
  )
}
