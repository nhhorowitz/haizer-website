import { Suspense } from 'react'
import { createAdminSupabaseClient } from '@/lib/supabase-admin'
import { ListingCard } from '@/components/listings/listing-card'
import { ListingsFilters } from '@/components/listings/listings-filters'

export default async function ListingsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>
}) {
  const params = await searchParams
  const supabase = createAdminSupabaseClient()

  let query = supabase
    .from('listings')
    .select('id, title, slug, city, address, price, price_per_month, beds, baths, sqft, type, status, photos, published_at')
    .eq('admin_status', 'approved')

  if (params.type) query = query.eq('type', params.type)
  if (params.city) query = query.eq('city', params.city)
  if (params.beds) query = query.gte('beds', parseInt(params.beds))
  if (params.min_price) query = query.gte('price', parseInt(params.min_price))
  if (params.max_price) query = query.lte('price', parseInt(params.max_price))
  if (params.q && params.q.length >= 3) query = query.or(`title.ilike.%${params.q}%,address.ilike.%${params.q}%`)

  const sort = params.sort ?? 'newest'
  if (sort === 'price_asc') query = query.order('price', { ascending: true })
  else if (sort === 'price_desc') query = query.order('price', { ascending: false })
  else query = query.order('published_at', { ascending: false })

  const { data: listings } = await query.limit(48)
  const total = listings?.length ?? 0

  return (
    <div className="bg-[#FAF8F3] min-h-screen">

      <Suspense fallback={<div className="h-[89px] bg-white border-b border-[#E2E8F0]" />}>
        <ListingsFilters total={total} />
      </Suspense>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {total > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {listings!.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="opacity-20 mb-4">
              <path d="M24 6L6 18v24h12V30h12v12h12V18L24 6z" fill="#064E3B"/>
            </svg>
            <p className="text-lg font-medium text-[#1A1A1A] mb-1">No listings found</p>
            <p className="text-sm text-[#64748B]">Try adjusting your filters or clearing them to see all listings.</p>
          </div>
        )}
      </div>

    </div>
  )
}
