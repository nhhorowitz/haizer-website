'use client'

import { useState } from 'react'

interface Props {
  savesCount: number
  listingId: string
}

export function ListingSave({ savesCount, listingId }: Props) {
  const [saved, setSaved] = useState(false)
  const [count, setCount] = useState(savesCount)

  function toggle() {
    setSaved((s) => !s)
    setCount((c) => saved ? c - 1 : c + 1)
    // Will wire to listing_saves table in Feature 6
  }

  return (
    <button
      onClick={toggle}
      className="flex items-center gap-2 h-12 px-4 rounded-full border border-[#E2E8F0] hover:border-[#CBD5E1] bg-white transition-all"
    >
      <svg
        width="18" height="18" viewBox="0 0 18 18" fill="none"
        className="transition-all duration-200"
      >
        <path
          d="M9 15.5S2 11 2 6a4 4 0 0 1 7-2.65A4 4 0 0 1 16 6c0 5-7 9.5-7 9.5z"
          stroke={saved ? '#F43F5E' : '#94A3B8'}
          strokeWidth="1.5"
          fill={saved ? '#F43F5E' : 'none'}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="text-sm text-[#64748B]">{count}</span>
    </button>
  )
}
