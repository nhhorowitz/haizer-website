'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useSearchSuggestions, SuggestionDropdown } from '@/components/listings/search-autocomplete'

const cities = [
  { value: '', label: 'All cities' },
  { value: 'boro-park', label: 'Boro Park' },
  { value: 'williamsburg', label: 'Williamsburg' },
  { value: 'flatbush', label: 'Flatbush' },
  { value: 'monsey', label: 'Monsey' },
  { value: 'lakewood', label: 'Lakewood' },
  { value: 'kiryas-joel', label: 'Kiryas Joel' },
]

const types = [
  { value: '', label: 'All' },
  { value: 'for_sale', label: 'Buy' },
  { value: 'for_rent', label: 'Rent' },
  { value: 'flip', label: 'Flip' },
]

const bedsOptions = [
  { value: '', label: 'Any beds' },
  { value: '1', label: '1+ bd' },
  { value: '2', label: '2+ bd' },
  { value: '3', label: '3+ bd' },
  { value: '4', label: '4+ bd' },
]

const minPrices = [
  { value: '', label: 'No min' },
  { value: '200000', label: '$200K' },
  { value: '300000', label: '$300K' },
  { value: '400000', label: '$400K' },
  { value: '500000', label: '$500K' },
  { value: '750000', label: '$750K' },
  { value: '1000000', label: '$1M' },
]

const maxPrices = [
  { value: '', label: 'No max' },
  { value: '300000', label: '$300K' },
  { value: '400000', label: '$400K' },
  { value: '500000', label: '$500K' },
  { value: '750000', label: '$750K' },
  { value: '1000000', label: '$1M' },
  { value: '1500000', label: '$1.5M' },
  { value: '2000000', label: '$2M+' },
]

const sortOptions = [
  { value: 'newest', label: 'Newest first' },
  { value: 'price_asc', label: 'Price: low → high' },
  { value: 'price_desc', label: 'Price: high → low' },
]

interface Props {
  total: number
}

export function ListingsFilters({ total }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const type = searchParams.get('type') ?? ''
  const city = searchParams.get('city') ?? ''
  const beds = searchParams.get('beds') ?? ''
  const minPrice = searchParams.get('min_price') ?? ''
  const maxPrice = searchParams.get('max_price') ?? ''
  const sort = searchParams.get('sort') ?? 'newest'
  const [searchInput, setSearchInput] = useState(searchParams.get('q') ?? '')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const suggestions = useSearchSuggestions(searchInput, type)

  const cityMap: Record<string, string> = {
    'boro park': 'boro-park',
    'williamsburg': 'williamsburg',
    'flatbush': 'flatbush',
    'monsey': 'monsey',
    'lakewood': 'lakewood',
    'kiryas joel': 'kiryas-joel',
    'kj': 'kiryas-joel',
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    const params = new URLSearchParams(searchParams.toString())
    const trimmed = searchInput.trim()
    const citySlug = cityMap[trimmed.toLowerCase()]
    if (citySlug) {
      params.set('city', citySlug)
      params.delete('q')
    } else if (trimmed.length >= 3) {
      params.set('q', trimmed)
      params.delete('city')
    } else {
      params.delete('q')
    }
    router.push(`/listings?${params.toString()}`)
  }

  function update(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (value) params.set(key, value)
    else params.delete(key)
    router.push(`/listings?${params.toString()}`)
  }

  function clearAll() {
    router.push('/listings')
  }

  const hasFilters = type || city || beds || minPrice || maxPrice

  return (
    <div className="sticky top-[57px] z-30 bg-white border-b border-[#E2E8F0] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        {/* Filter row */}
        <div className="flex items-center gap-2 py-3 overflow-x-auto scrollbar-hide">

          {/* Search input */}
          <form onSubmit={handleSearch} className="relative shrink-0">
            <div className="flex items-center h-9 rounded-full border border-[#E2E8F0] bg-white focus-within:border-[#064E3B] transition-colors overflow-hidden">
              <svg className="ml-3 shrink-0 text-[#94A3B8]" width="13" height="13" viewBox="0 0 18 18" fill="none">
                <circle cx="7.5" cy="7.5" r="5.5" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M12 12l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setShowSuggestions(false)}
                placeholder="City or address…"
                className="h-full px-2.5 text-sm text-[#1A1A1A] placeholder:text-[#94A3B8] focus:outline-none bg-transparent w-44"
              />
            </div>
            {showSuggestions && suggestions.length > 0 && (
              <SuggestionDropdown
                items={suggestions}
                onSelect={(href) => { router.push(href); setShowSuggestions(false); setSearchInput('') }}
              />
            )}
          </form>

          <div className="w-px h-6 bg-[#E2E8F0] shrink-0" />

          {/* Type tabs */}
          <div className="flex items-center gap-1 shrink-0 bg-[#F5F2EC] rounded-full p-1">
            {types.map((t) => (
              <button
                key={t.value}
                onClick={() => update('type', t.value)}
                className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-150 cursor-pointer whitespace-nowrap ${
                  type === t.value
                    ? 'bg-white text-[#064E3B] shadow-sm'
                    : 'text-[#64748B] hover:text-[#1A1A1A]'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="w-px h-6 bg-[#E2E8F0] shrink-0" />

          {/* City */}
          <select
            value={city}
            onChange={(e) => update('city', e.target.value)}
            className="h-9 pl-3 pr-8 text-sm text-[#1A1A1A] border border-[#E2E8F0] rounded-full bg-white focus:outline-none focus:border-[#064E3B] cursor-pointer appearance-none shrink-0"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M2 4l4 4 4-4' stroke='%2394A3B8' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px center' }}
          >
            {cities.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>

          {/* Beds */}
          <select
            value={beds}
            onChange={(e) => update('beds', e.target.value)}
            className="h-9 pl-3 pr-8 text-sm text-[#1A1A1A] border border-[#E2E8F0] rounded-full bg-white focus:outline-none focus:border-[#064E3B] cursor-pointer appearance-none shrink-0"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M2 4l4 4 4-4' stroke='%2394A3B8' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px center' }}
          >
            {bedsOptions.map((b) => (
              <option key={b.value} value={b.value}>{b.label}</option>
            ))}
          </select>

          {/* Min price */}
          <select
            value={minPrice}
            onChange={(e) => update('min_price', e.target.value)}
            className="h-9 pl-3 pr-8 text-sm text-[#1A1A1A] border border-[#E2E8F0] rounded-full bg-white focus:outline-none focus:border-[#064E3B] cursor-pointer appearance-none shrink-0"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M2 4l4 4 4-4' stroke='%2394A3B8' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px center' }}
          >
            {minPrices.map((p) => (
              <option key={p.value} value={p.value}>{p.label}</option>
            ))}
          </select>

          <span className="text-xs text-[#94A3B8] shrink-0">to</span>

          {/* Max price */}
          <select
            value={maxPrice}
            onChange={(e) => update('max_price', e.target.value)}
            className="h-9 pl-3 pr-8 text-sm text-[#1A1A1A] border border-[#E2E8F0] rounded-full bg-white focus:outline-none focus:border-[#064E3B] cursor-pointer appearance-none shrink-0"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M2 4l4 4 4-4' stroke='%2394A3B8' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px center' }}
          >
            {maxPrices.map((p) => (
              <option key={p.value} value={p.value}>{p.label}</option>
            ))}
          </select>

          {/* Clear */}
          {hasFilters && (
            <button
              onClick={clearAll}
              className="h-9 px-3 text-sm text-[#64748B] hover:text-[#1A1A1A] transition-colors shrink-0 cursor-pointer underline underline-offset-2"
            >
              Clear
            </button>
          )}

          {/* Spacer */}
          <div className="flex-1" />

          {/* Sort */}
          <select
            value={sort}
            onChange={(e) => update('sort', e.target.value)}
            className="h-9 pl-3 pr-8 text-sm text-[#1A1A1A] border border-[#E2E8F0] rounded-full bg-white focus:outline-none focus:border-[#064E3B] cursor-pointer appearance-none shrink-0"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M2 4l4 4 4-4' stroke='%2394A3B8' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px center' }}
          >
            {sortOptions.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>

          {/* Map toggle — placeholder */}
          <button className="h-9 px-4 flex items-center gap-2 text-sm font-medium text-[#64748B] border border-[#E2E8F0] rounded-full hover:border-[#CBD5E1] hover:text-[#1A1A1A] transition-colors shrink-0 cursor-pointer">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M1 3.5L5.5 2l5 2.5L15 3v10l-4.5 1.5-5-2.5L1 13.5V3.5z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
              <path d="M5.5 2v11.5M10.5 4.5V16" stroke="currentColor" strokeWidth="1.3"/>
            </svg>
            Map
          </button>
        </div>

        {/* Result count */}
        <div className="pb-2.5">
          <p className="text-xs text-[#94A3B8]">
            {total === 0 ? 'No listings found' : `${total} listing${total === 1 ? '' : 's'}`}
            {city && ` in ${cities.find(c => c.value === city)?.label}`}
          </p>
        </div>

      </div>
    </div>
  )
}
