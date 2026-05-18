import Link from 'next/link'

export type ListingCardData = {
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
  status: string
  photos: string[]
  published_at: string | null
}

const cityNames: Record<string, string> = {
  'boro-park': 'Boro Park',
  'williamsburg': 'Williamsburg',
  'flatbush': 'Flatbush',
  'monsey': 'Monsey',
  'lakewood': 'Lakewood',
  'kiryas-joel': 'Kiryas Joel',
}

const typeLabels: Record<string, string> = {
  for_sale: 'For sale',
  for_rent: 'For rent',
  flip: 'Flip',
  land: 'Land',
  commercial: 'Commercial',
}

function formatPrice(l: ListingCardData) {
  const fmt = (n: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)
  if (l.price_per_month) return `${fmt(l.price_per_month)}/mo`
  if (l.price) return fmt(l.price)
  return 'Price on request'
}

function isNew(publishedAt: string | null) {
  if (!publishedAt) return false
  return Date.now() - new Date(publishedAt).getTime() < 7 * 24 * 60 * 60 * 1000
}

export function ListingCard({ listing: l }: { listing: ListingCardData }) {
  const cover = l.photos?.[0]
  const cityName = cityNames[l.city] ?? l.city

  return (
    <Link
      href={`/listings/${l.city}/${l.slug}`}
      className="group block bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden hover:shadow-lg hover:shadow-black/[0.06] hover:border-[#CBD5E1] transition-all duration-200"
    >
      {/* Photo */}
      <div className="relative h-48 overflow-hidden bg-[#F5F2EC]">
        {cover ? (
          <img
            src={cover}
            alt={l.title}
            className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg width="32" height="32" viewBox="0 0 48 48" fill="none" className="opacity-20">
              <path d="M24 6L6 18v24h12V30h12v12h12V18L24 6z" fill="#064E3B"/>
            </svg>
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-1.5">
          {isNew(l.published_at) && (
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-[#FEF3C7] text-[#92400E]">New</span>
          )}
          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-white/90 text-[#64748B]">
            {typeLabels[l.type] ?? l.type}
          </span>
        </div>

        {/* Status dot */}
        {l.status === 'pending' && (
          <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-white/90 px-2.5 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span className="text-xs font-medium text-[#64748B]">Pending</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-xl font-bold text-[#1A1A1A] tracking-tight">{formatPrice(l)}</p>
        <p className="text-sm text-[#1A1A1A] mt-0.5 truncate">{l.address}</p>
        <p className="text-xs text-[#94A3B8] mt-0.5">{cityName}</p>

        {(l.beds || l.baths || l.sqft) && (
          <div className="flex items-center gap-3 mt-3 pt-3 border-t border-[#F1F5F9] text-xs text-[#64748B]">
            {l.beds && <span><strong className="text-[#1A1A1A] font-semibold">{l.beds}</strong> bd</span>}
            {l.baths && <span><strong className="text-[#1A1A1A] font-semibold">{l.baths}</strong> ba</span>}
            {l.sqft && <span><strong className="text-[#1A1A1A] font-semibold">{l.sqft.toLocaleString()}</strong> sqft</span>}
          </div>
        )}
      </div>
    </Link>
  )
}
