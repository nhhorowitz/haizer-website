import { notFound } from 'next/navigation'
import { createAdminSupabaseClient } from '@/lib/supabase-admin'
import { ListingDetailV2 } from '@/components/listings/listing-detail-v2'

export default async function ListingDetailPage({
  params,
}: {
  params: Promise<{ city: string; slug: string }>
}) {
  const { city, slug } = await params
  const supabase = createAdminSupabaseClient()

  const { data: listing } = await supabase
    .from('listings')
    .select('*')
    .eq('city', city)
    .eq('slug', slug)
    .eq('admin_status', 'approved')
    .single()

  if (!listing) notFound()

  const { data: similar } = await supabase
    .from('listings')
    .select('id, title, slug, city, address, price, price_per_month, beds, baths, sqft, type, photos')
    .eq('city', city)
    .eq('admin_status', 'approved')
    .neq('id', listing.id)
    .limit(4)

  return <ListingDetailV2 listing={listing} city={city} similar={similar ?? []} />
}
