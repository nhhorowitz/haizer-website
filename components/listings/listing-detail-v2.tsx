'use client'

import { useState } from 'react'
import Link from 'next/link'

const cityNames: Record<string, string> = {
  'boro-park': 'Boro Park',
  'williamsburg': 'Williamsburg',
  'flatbush': 'Flatbush',
  'monsey': 'Monsey',
  'lakewood': 'Lakewood',
  'kiryas-joel': 'Kiryas Joel',
}

const typeLabels: Record<string, string> = {
  for_sale: 'House for sale',
  for_rent: 'Apartment for rent',
  flip: 'Flip opportunity',
  land: 'Land for sale',
  commercial: 'Commercial',
}

function fmt(n: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)
}

function formatPrice(listing: Record<string, unknown>) {
  if (listing.price_per_month) return `${fmt(listing.price_per_month as number)}/mo`
  if (listing.price) return fmt(listing.price as number)
  return 'Price on request'
}

function isNew(publishedAt: unknown) {
  if (!publishedAt) return false
  return (Date.now() - new Date(publishedAt as string).getTime()) < 7 * 24 * 60 * 60 * 1000
}

type SimilarListing = {
  id: string
  title: string
  slug: string
  city: string
  address: string
  price: number | null
  price_per_month: number | null
  beds: number | null
  baths: number | null
  sqft: number | null
  type: string
  photos: string[]
}

interface Props {
  listing: Record<string, unknown>
  city: string
  similar: SimilarListing[]
}

export function ListingDetailV2({ listing, city, similar }: Props) {
  const photos = (listing.photos as string[]) ?? []
  const [current, setCurrent] = useState(0)
  const [lightbox, setLightbox] = useState(false)
  const [saved, setSaved] = useState(false)
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  const cityName = cityNames[city] ?? city
  const typeLabel = typeLabels[listing.type as string] ?? String(listing.type)
  const hasPhotos = photos.length > 0

  const features = [
    { key: 'eruv_access', label: 'Eruv access' },
    { key: 'walk_to_shul', label: 'Walk to shul' },
    { key: 'yeshiva_nearby', label: 'Yeshiva nearby' },
    { key: 'bais_yaakov_nearby', label: 'Bais Yaakov nearby' },
    { key: 'mikvah_nearby', label: 'Mikvah nearby' },
    { key: 'recently_renovated', label: 'Recently renovated' },
    { key: 'move_in_ready', label: 'Move-in ready' },
  ].filter((f) => listing[f.key])

  const details = [
    listing.property_type && { label: 'Property type', value: listing.property_type },
    listing.year_built && { label: 'Year built', value: listing.year_built },
    listing.sqft && { label: 'Size', value: `${(listing.sqft as number).toLocaleString()} sqft` },
    listing.lot_size && { label: 'Lot size', value: `${(listing.lot_size as number).toLocaleString()} sqft` },
    listing.beds && { label: 'Beds', value: listing.beds },
    listing.baths && { label: 'Baths', value: listing.baths },
    listing.annual_taxes && { label: 'Annual taxes', value: `$${Number(listing.annual_taxes).toLocaleString()}` },
    listing.hoa_fee && { label: 'HOA fee', value: `$${Number(listing.hoa_fee).toLocaleString()}/mo` },
    listing.zip && { label: 'ZIP code', value: listing.zip },
  ].filter(Boolean) as { label: string; value: unknown }[]

  function handleSend() {
    setSent(true)
    setTimeout(() => setSent(false), 2000)
  }

  return (
    <div className="bg-[#FAF8F3] min-h-screen pb-24 lg:pb-0">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">

        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-xs text-[#94A3B8] mb-5">
          <Link href="/" className="hover:text-[#64748B]">Home</Link>
          <span>›</span>
          <Link href={`/listings?city=${city}`} className="hover:text-[#64748B]">{cityName}</Link>
          <span>›</span>
          <span className="text-[#64748B] truncate">{listing.address as string}</span>
        </div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-[1fr_400px] gap-8 items-start">

          {/* ── LEFT: photo + all content ── */}
          <div>

            {/* Photo */}
            <div className="relative bg-[#F0EDE8] rounded-2xl overflow-hidden" style={{ height: 480 }}>
              {hasPhotos ? (
                <>
                  <img
                    src={photos[current]}
                    alt={`${listing.title as string} — photo ${current + 1}`}
                    onClick={() => setLightbox(true)}
                    className="w-full h-full object-contain cursor-zoom-in"
                  />
                  {photos.length > 1 && (
                    <>
                      <button onClick={() => setCurrent((c) => (c - 1 + photos.length) % photos.length)}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-md cursor-pointer transition-colors">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8l5 5" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </button>
                      <button onClick={() => setCurrent((c) => (c + 1) % photos.length)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-md cursor-pointer transition-colors">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </button>
                      <div className="absolute bottom-4 right-4 bg-black/60 text-white text-xs font-medium px-3 py-1.5 rounded-full">
                        {current + 1} / {photos.length}
                      </div>
                    </>
                  )}
                  <button onClick={() => setLightbox(true)}
                    className="absolute bottom-4 left-4 flex items-center gap-1.5 bg-black/60 hover:bg-black/80 text-white text-xs font-medium px-3 py-1.5 rounded-full cursor-pointer transition-colors">
                    View all photos
                  </button>
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#E8F5E9] to-[#C8E6C9]">
                  <p className="text-sm text-[#064E3B]/30">No photos yet</p>
                </div>
              )}
            </div>

            {/* Thumbnail strip */}
            {photos.length > 1 && (
              <div className="relative mt-3">
                <div className="flex gap-2 overflow-x-auto pb-1 scroll-smooth" style={{ scrollbarWidth: 'none' }}>
                  {photos.map((p, i) => (
                    <button key={i} onClick={() => setCurrent(i)}
                      className={`shrink-0 w-24 h-16 rounded-xl overflow-hidden transition-all duration-200 cursor-pointer ${
                        i === current
                          ? 'ring-2 ring-[#064E3B] ring-offset-2 scale-105 opacity-100'
                          : 'opacity-50 hover:opacity-80 hover:scale-102'
                      }`}>
                      <img src={p} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
                {/* Fade hint on right edge if scrollable */}
                <div className="pointer-events-none absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-[#FAF8F3] to-transparent" />
              </div>
            )}


            {/* Description */}
            {listing.description && (
              <div className="mt-6 pb-6 border-b border-[#E2E8F0]">
                <h2 className="text-base font-semibold text-[#1A1A1A] mb-2">About this property</h2>
                <p className="text-sm text-[#64748B] leading-relaxed whitespace-pre-line">{listing.description as string}</p>
              </div>
            )}

            {/* Community features */}
            {features.length > 0 && (
              <div className="mt-6 pb-6 border-b border-[#E2E8F0]">
                <h2 className="text-base font-semibold text-[#1A1A1A] mb-3">Community features</h2>
                <div className="flex flex-wrap gap-2">
                  {features.map((f) => (
                    <span key={f.key} className="px-3 py-1.5 text-xs font-medium bg-[#D1FAE5] text-[#064E3B] rounded-full">{f.label}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Property details */}
            {details.length > 0 && (
              <div className="mt-6 pb-6 border-b border-[#E2E8F0]">
                <h2 className="text-base font-semibold text-[#1A1A1A] mb-4">Property details</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {details.map((d) => (
                    <div key={d.label} className="bg-white rounded-xl border border-[#E2E8F0] p-4">
                      <p className="text-xs text-[#94A3B8] mb-1">{d.label}</p>
                      <p className="text-sm font-semibold text-[#1A1A1A]">{String(d.value)}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Investor numbers — flip only */}
            {listing.type === 'flip' && listing.arv && (
              <div className="mt-6 pb-6 border-b border-[#E2E8F0]">
                <h2 className="text-base font-semibold text-[#1A1A1A] mb-4">Investor numbers</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="bg-white rounded-xl border border-[#E2E8F0] p-4">
                    <p className="text-xs text-[#94A3B8] mb-1">Asking price</p>
                    <p className="text-sm font-semibold text-[#1A1A1A]">${Number(listing.price).toLocaleString()}</p>
                  </div>
                  {listing.rehab_cost && (
                    <div className="bg-white rounded-xl border border-[#E2E8F0] p-4">
                      <p className="text-xs text-[#94A3B8] mb-1">Est. rehab</p>
                      <p className="text-sm font-semibold text-[#1A1A1A]">${Number(listing.rehab_cost).toLocaleString()}</p>
                    </div>
                  )}
                  <div className="bg-white rounded-xl border border-[#E2E8F0] p-4">
                    <p className="text-xs text-[#94A3B8] mb-1">ARV</p>
                    <p className="text-sm font-semibold text-[#1A1A1A]">${Number(listing.arv).toLocaleString()}</p>
                  </div>
                  {listing.rehab_cost && (
                    <div className="bg-[#FEF3C7] rounded-xl border border-[#FDE68A] p-4">
                      <p className="text-xs text-[#92400E] mb-1">Est. profit</p>
                      <p className="text-sm font-semibold text-[#92400E]">
                        ${(Number(listing.arv) - Number(listing.price) - Number(listing.rehab_cost)).toLocaleString()}
                      </p>
                    </div>
                  )}
                </div>
                <Link href="/tools/fix-flip" className="inline-block mt-3 text-xs font-medium text-[#064E3B] hover:underline">
                  Run your own numbers in the Fix &amp; Flip calculator →
                </Link>
              </div>
            )}

            {/* Similar listings */}
            {similar.length > 0 && (
              <div className="mt-6">
                <h2 className="text-base font-semibold text-[#1A1A1A] mb-4">Similar listings in {cityName}</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {similar.map((s) => (
                    <Link key={s.id} href={`/listings/${s.city}/${s.slug}`}
                      className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden hover:shadow-sm hover:border-[#CBD5E1] transition-all">
                      <div className="h-24 bg-[#F5F2EC] overflow-hidden">
                        {s.photos?.[0] ? (
                          <img src={s.photos[0]} alt={s.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <svg width="20" height="20" viewBox="0 0 48 48" fill="none" className="opacity-20">
                              <path d="M24 6L6 18v24h12V30h12v12h12V18L24 6z" fill="#064E3B"/>
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className="p-3">
                        <p className="text-sm font-semibold text-[#1A1A1A]">
                          {s.price_per_month ? `$${Number(s.price_per_month).toLocaleString()}/mo` : s.price ? `$${Number(s.price).toLocaleString()}` : 'POA'}
                        </p>
                        <p className="text-xs text-[#64748B] truncate mt-0.5">{s.address}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── RIGHT: sticky contact card ── */}
          <div className="hidden lg:block sticky top-24">
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm">

              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-[#D1FAE5] text-[#064E3B]">
                  {listing.status === 'active' ? 'Active' : 'Pending'}
                </span>
                {isNew(listing.published_at) && (
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-[#FEF3C7] text-[#92400E]">New</span>
                )}
                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-[#F5F2EC] text-[#64748B]">{typeLabel}</span>
              </div>

              <h1 className="text-xl font-semibold text-[#1A1A1A] leading-snug mb-1">{listing.title as string}</h1>
              <p className="text-sm text-[#64748B] flex items-center gap-1 mb-4">
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                  <path d="M8 1a5 5 0 0 1 5 5c0 4-5 9-5 9S3 10 3 6a5 5 0 0 1 5-5z" stroke="#94A3B8" strokeWidth="1.4"/>
                  <circle cx="8" cy="6" r="1.5" stroke="#94A3B8" strokeWidth="1.4"/>
                </svg>
                {listing.address as string}, {cityName}{listing.zip ? `, NY ${listing.zip}` : ''}
              </p>

              <p className="text-3xl font-bold text-[#1A1A1A] tracking-tight mb-1">{formatPrice(listing)}</p>
              {(listing.beds || listing.baths || listing.sqft) && (
                <p className="text-sm text-[#64748B] mb-5">
                  {[
                    listing.beds ? `${listing.beds} bd` : null,
                    listing.baths ? `${listing.baths} ba` : null,
                    listing.sqft ? `${(listing.sqft as number).toLocaleString()} sqft` : null,
                  ].filter(Boolean).join(' · ')}
                </p>
              )}

              <div className="flex gap-4 py-4 border-y border-[#F1F5F9] mb-5">
                <div className="text-center flex-1">
                  <p className="text-lg font-semibold text-[#1A1A1A]">{(listing.saves_count as number) ?? 0}</p>
                  <p className="text-xs text-[#94A3B8]">Saves</p>
                </div>
                <div className="text-center flex-1 border-x border-[#F1F5F9]">
                  <p className="text-lg font-semibold text-[#1A1A1A]">{listing.status === 'active' ? 'Active' : 'Pending'}</p>
                  <p className="text-xs text-[#94A3B8]">Status</p>
                </div>
                <div className="text-center flex-1">
                  <p className="text-lg font-semibold text-[#1A1A1A]">{isNew(listing.published_at) ? 'New' : 'Listed'}</p>
                  <p className="text-xs text-[#94A3B8]">Listing</p>
                </div>
              </div>

              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-full bg-[#064E3B] text-white font-semibold flex items-center justify-center text-sm shrink-0">H</div>
                <div>
                  <p className="text-sm font-semibold text-[#1A1A1A]">Haizer member</p>
                  <p className="text-xs text-[#94A3B8]">{cityName}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-3">
                {['Is it available?', 'Schedule showing', 'Make an offer'].map((q) => (
                  <button key={q} onClick={() => setMessage(q)}
                    className="text-xs px-3 py-1.5 rounded-full border border-[#E2E8F0] text-[#64748B] hover:border-[#064E3B] hover:text-[#064E3B] transition-colors cursor-pointer">
                    {q}
                  </button>
                ))}
              </div>

              {sent ? (
                <div className="flex items-center justify-center gap-2 py-4 text-sm text-[#064E3B] font-medium">
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="#064E3B" strokeWidth="2">
                    <path d="M4 10l4 4 8-8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Message sent
                </div>
              ) : (
                <>
                  <textarea value={message} onChange={(e) => setMessage(e.target.value)}
                    placeholder="Ask about this property..." rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] text-sm text-[#1A1A1A] resize-none focus:outline-none focus:ring-2 focus:ring-[#064E3B]/20 focus:border-[#064E3B] mb-3" />
                  <button onClick={handleSend} disabled={!message.trim()}
                    className="w-full h-12 bg-[#064E3B] hover:bg-[#043B2C] text-white text-sm font-semibold rounded-full transition-colors disabled:opacity-40 cursor-pointer">
                    Send message
                  </button>
                </>
              )}

              <button onClick={() => setSaved((s) => !s)}
                className="w-full h-11 mt-3 flex items-center justify-center gap-2 border border-[#E2E8F0] rounded-full text-sm text-[#64748B] hover:border-[#CBD5E1] transition-colors cursor-pointer">
                <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                  <path d="M9 15.5S2 11 2 6a4 4 0 0 1 7-2.65A4 4 0 0 1 16 6c0 5-7 9.5-7 9.5z"
                    stroke={saved ? '#F43F5E' : '#94A3B8'} strokeWidth="1.5"
                    fill={saved ? '#F43F5E' : 'none'} strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {saved ? 'Saved' : 'Save to wishlist'}
              </button>

              <p className="text-xs text-[#94A3B8] text-center mt-3">Typically responds within a few hours</p>
            </div>
          </div>

        </div>
      </div>

      {/* Mobile sticky bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#E2E8F0] px-4 py-3 flex gap-3 z-40">
        <button onClick={() => setSaved((s) => !s)}
          className="flex items-center gap-2 h-12 px-4 rounded-full border border-[#E2E8F0] hover:border-[#CBD5E1] bg-white transition-all cursor-pointer">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M9 15.5S2 11 2 6a4 4 0 0 1 7-2.65A4 4 0 0 1 16 6c0 5-7 9.5-7 9.5z"
              stroke={saved ? '#F43F5E' : '#94A3B8'} strokeWidth="1.5"
              fill={saved ? '#F43F5E' : 'none'} strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button onClick={() => setMessage('Hi, is this property still available?')}
          className="flex-1 h-12 bg-[#064E3B] text-white text-sm font-semibold rounded-full hover:bg-[#043B2C] transition-colors cursor-pointer">
          Contact seller
        </button>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center" onClick={() => setLightbox(false)}>
          <img src={photos[current]} alt={`${listing.title as string} — photo ${current + 1}`}
            onClick={(e) => e.stopPropagation()} className="max-h-[85vh] max-w-[85vw] object-contain rounded-lg" />
          <button onClick={() => setLightbox(false)}
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center cursor-pointer">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 3l10 10M13 3L3 13" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </button>
          {photos.length > 1 && (
            <>
              <button onClick={(e) => { e.stopPropagation(); setCurrent((c) => (c - 1 + photos.length) % photos.length) }}
                className="absolute left-5 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center cursor-pointer">
                <svg width="20" height="20" viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8l5 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              <button onClick={(e) => { e.stopPropagation(); setCurrent((c) => (c + 1) % photos.length) }}
                className="absolute right-5 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center cursor-pointer">
                <svg width="20" height="20" viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </>
          )}
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 bg-white/10 text-white text-sm px-4 py-2 rounded-full">
            {current + 1} / {photos.length}
          </div>
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 max-w-[80vw] overflow-x-auto">
            {photos.map((p, i) => (
              <button key={i} onClick={(e) => { e.stopPropagation(); setCurrent(i) }}
                className={`shrink-0 w-14 h-10 rounded overflow-hidden border-2 cursor-pointer transition-all ${i === current ? 'border-white opacity-100' : 'border-transparent opacity-50 hover:opacity-80'}`}>
                <img src={p} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
