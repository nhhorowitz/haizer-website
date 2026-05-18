'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'

export const CITIES = [
  { label: 'Boro Park', slug: 'boro-park' },
  { label: 'Williamsburg', slug: 'williamsburg' },
  { label: 'Flatbush', slug: 'flatbush' },
  { label: 'Monsey', slug: 'monsey' },
  { label: 'Lakewood', slug: 'lakewood' },
  { label: 'Kiryas Joel', slug: 'kiryas-joel' },
]

export type Suggestion =
  | { kind: 'city'; label: string; href: string }
  | { kind: 'listing'; label: string; sub: string; href: string }

export function useSearchSuggestions(query: string, typeParam: string) {
  const [items, setItems] = useState<Suggestion[]>([])

  useEffect(() => {
    if (query.trim().length < 2) { setItems([]); return }

    const t = setTimeout(async () => {
      const q = query.trim().toLowerCase()

      const cityMatches: Suggestion[] = CITIES
        .filter(c => c.label.toLowerCase().includes(q))
        .slice(0, 3)
        .map(c => ({
          kind: 'city',
          label: c.label,
          href: `/listings?${typeParam ? `type=${typeParam}&` : ''}city=${c.slug}`,
        }))

      const supabase = createClient()
      const { data } = await supabase
        .from('listings')
        .select('slug, city, address, title')
        .eq('admin_status', 'approved')
        .or(`address.ilike.%${query.trim()}%,title.ilike.%${query.trim()}%`)
        .limit(5)

      const listingMatches: Suggestion[] = (data ?? []).map(l => ({
        kind: 'listing' as const,
        label: l.address,
        sub: CITIES.find(c => c.slug === l.city)?.label ?? l.city,
        href: `/listings/${l.city}/${l.slug}`,
      }))

      setItems([...cityMatches, ...listingMatches])
    }, 280)

    return () => clearTimeout(t)
  }, [query, typeParam])

  return items
}

export function SuggestionDropdown({
  items,
  onSelect,
}: {
  items: Suggestion[]
  onSelect: (href: string) => void
}) {
  if (items.length === 0) return null

  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-[#E2E8F0] shadow-xl overflow-hidden z-[100]">
      {items.map((item, i) => (
        <button
          key={i}
          type="button"
          onMouseDown={(e) => { e.preventDefault(); onSelect(item.href) }}
          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#F5F2EC] transition-colors text-left cursor-pointer"
        >
          {item.kind === 'city' ? (
            <>
              <div className="w-8 h-8 rounded-full bg-[#D1FAE5] flex items-center justify-center shrink-0">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M8 1a5 5 0 0 1 5 5c0 4-5 9-5 9S3 10 3 6a5 5 0 0 1 5-5z" fill="#064E3B"/>
                  <circle cx="8" cy="6" r="1.5" fill="white"/>
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-[#1A1A1A]">{item.label}</p>
                <p className="text-xs text-[#94A3B8]">Neighborhood</p>
              </div>
            </>
          ) : (
            <>
              <div className="w-8 h-8 rounded-full bg-[#F5F2EC] flex items-center justify-center shrink-0">
                <svg width="14" height="14" viewBox="0 0 48 48" fill="none">
                  <path d="M24 6L6 18v24h12V30h12v12h12V18L24 6z" fill="#064E3B" opacity="0.5"/>
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-[#1A1A1A]">{item.label}</p>
                <p className="text-xs text-[#94A3B8]">{item.sub}</p>
              </div>
            </>
          )}
        </button>
      ))}
    </div>
  )
}
