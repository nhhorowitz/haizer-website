'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSearchSuggestions, SuggestionDropdown } from '@/components/listings/search-autocomplete'

type Tab = 'buy' | 'rent' | 'flip'

const tabs: { id: Tab; label: string }[] = [
  { id: 'buy', label: 'Buy' },
  { id: 'rent', label: 'Rent' },
  { id: 'flip', label: 'Flip' },
]

// Each pill navigates directly to the right filtered URL
const pills: Record<Tab, { label: string; href: string }[]> = {
  buy: [
    { label: 'Boro Park', href: '/listings?type=for_sale&city=boro-park' },
    { label: 'Williamsburg', href: '/listings?type=for_sale&city=williamsburg' },
    { label: 'Flatbush', href: '/listings?type=for_sale&city=flatbush' },
    { label: 'Under $800K', href: '/listings?type=for_sale&max_price=800000' },
  ],
  rent: [
    { label: 'Boro Park', href: '/listings?type=for_rent&city=boro-park' },
    { label: 'Lakewood', href: '/listings?type=for_rent&city=lakewood' },
    { label: '3+ beds', href: '/listings?type=for_rent&beds=3' },
    { label: 'Under $3K/mo', href: '/listings?type=for_rent&max_price=3000' },
  ],
  flip: [
    { label: 'Under $500K', href: '/listings?type=flip&max_price=500000' },
    { label: 'Boro Park', href: '/listings?type=flip&city=boro-park' },
    { label: 'BRRRR-ready', href: '/listings?type=flip' },
    { label: 'High ARV', href: '/listings?type=flip' },
  ],
}

const cityMap: Record<string, string> = {
  'boro park': 'boro-park',
  'williamsburg': 'williamsburg',
  'flatbush': 'flatbush',
  'monsey': 'monsey',
  'lakewood': 'lakewood',
  'kiryas joel': 'kiryas-joel',
  'kj': 'kiryas-joel',
}

export function Hero() {
  const router = useRouter()
  const [tab, setTab] = useState<Tab>('buy')
  const [query, setQuery] = useState('')
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const typeParam = tab === 'buy' ? 'for_sale' : tab === 'rent' ? 'for_rent' : 'flip'
  const suggestions = useSearchSuggestions(query, typeParam)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    const type = tab === 'buy' ? 'for_sale' : tab === 'rent' ? 'for_rent' : 'flip'
    const params = new URLSearchParams({ type })
    const citySlug = cityMap[query.trim().toLowerCase()]
    if (citySlug) params.set('city', citySlug)
    else if (query.trim()) params.set('q', query.trim())
    router.push(`/listings?${params}`)
  }

  const tabLabel = tabs.find((t) => t.id === tab)!.label

  return (
    <section className="bg-[#FAF8F3] pt-14 pb-20 px-4">
      <div className="max-w-3xl mx-auto text-center">

        {/* Eyebrow */}
        <p className="text-sm font-medium text-[#064E3B] mb-4 tracking-wide uppercase">
          Free to list · No agent fees
        </p>

        {/* Headline */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-[#1A1A1A] leading-tight tracking-tight mb-4">
          Homes. Flips. Rentals.{' '}
          <span className="text-[#064E3B]">Direct.</span>
        </h1>

        {/* Sub */}
        <p className="text-lg text-[#64748B] mb-10 max-w-xl mx-auto">
          Buy, sell, rent, and flip — all in one place. Free to list, always.
        </p>

        {/* Search bar */}
        <div className="max-w-2xl mx-auto">
          <div className="relative">
          <form onSubmit={handleSearch}>
            <div className="flex items-center h-14 rounded-full border border-[#E2E8F0] bg-white shadow-md shadow-black/[0.06] focus-within:border-[#064E3B] focus-within:ring-2 focus-within:ring-[#064E3B]/15 transition-all overflow-visible relative">

              {/* Type dropdown */}
              <div ref={dropdownRef} className="relative shrink-0">
                <button
                  type="button"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-1.5 pl-5 pr-3 h-14 text-sm font-semibold text-[#1A1A1A] hover:text-[#064E3B] transition-colors"
                >
                  {tabLabel}
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className={`transition-transform duration-150 ${dropdownOpen ? 'rotate-180' : ''}`}>
                    <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>

                {dropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 bg-white rounded-xl border border-[#E2E8F0] shadow-lg py-1 z-50 min-w-[120px]">
                    {tabs.map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => { setTab(t.id); setDropdownOpen(false) }}
                        className={[
                          'w-full text-left px-4 py-2.5 text-sm transition-colors',
                          tab === t.id
                            ? 'text-[#064E3B] font-semibold bg-[#F5F2EC]'
                            : 'text-[#1A1A1A] hover:bg-[#F5F2EC]',
                        ].join(' ')}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Divider */}
              <div className="w-px h-5 bg-[#E2E8F0] shrink-0" />

              {/* Search icon */}
              <svg className="ml-3 shrink-0 text-[#94A3B8]" width="16" height="16" viewBox="0 0 18 18" fill="none">
                <circle cx="7.5" cy="7.5" r="5.5" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M12 12l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>

              {/* Input */}
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setShowSuggestions(false)}
                placeholder="City, neighborhood, or address…"
                className="flex-1 h-full px-3 text-sm text-[#1A1A1A] placeholder:text-[#94A3B8] focus:outline-none bg-transparent"
              />

              {/* Search button */}
              <button
                type="submit"
                className="h-10 px-6 bg-[#064E3B] text-white text-sm font-medium hover:bg-[#043B2C] transition-colors shrink-0 rounded-full mr-2"
              >
                Search
              </button>
            </div>
          </form>

          {showSuggestions && suggestions.length > 0 && (
            <SuggestionDropdown items={suggestions} onSelect={(href) => { router.push(href); setShowSuggestions(false); setQuery('') }} />
          )}
          </div>

          {/* Quick pills */}
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {pills[tab].map((pill) => (
              <button
                key={pill.label}
                type="button"
                onClick={() => router.push(pill.href)}
                className="px-3.5 py-1.5 text-xs font-medium text-[#64748B] border border-[#E2E8F0] rounded-full hover:border-[#064E3B] hover:text-[#064E3B] transition-colors focus:outline-none"
              >
                {pill.label}
              </button>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
