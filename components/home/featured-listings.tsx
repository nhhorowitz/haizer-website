import Link from 'next/link'

const listings = [
  {
    id: '1',
    price: '$649,000',
    address: '1423 47th St',
    city: 'Boro Park',
    beds: 4,
    baths: 2,
    sqft: '1,920',
    type: 'For sale',
    saves: 14,
    color: '#D1FAE5',
  },
  {
    id: '2',
    price: '$2,800/mo',
    address: '783 Bedford Ave',
    city: 'Williamsburg',
    beds: 3,
    baths: 1,
    sqft: '1,100',
    type: 'For rent',
    saves: 7,
    color: '#FEF3C7',
  },
  {
    id: '3',
    price: '$385,000',
    address: '22 Oak Terrace',
    city: 'Monsey',
    beds: 3,
    baths: 2,
    sqft: '1,640',
    type: 'Flip',
    saves: 21,
    color: '#FCE7F3',
  },
  {
    id: '4',
    price: '$895,000',
    address: '54 Maple Ave',
    city: 'Lakewood',
    beds: 5,
    baths: 3,
    sqft: '2,800',
    type: 'For sale',
    saves: 9,
    color: '#DBEAFE',
  },
]

export function FeaturedListings() {
  return (
    <section className="py-16 px-4 bg-[#FAF8F3]">
      <div className="max-w-7xl mx-auto">

        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl font-semibold text-[#1A1A1A]">Featured listings</h2>
            <p className="text-[#64748B] mt-1">Hand-picked from across our launch cities</p>
          </div>
          <Link
            href="/listings"
            className="text-sm font-medium text-[#064E3B] hover:underline hidden sm:block"
          >
            View all listings →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {listings.map((listing) => (
            <Link
              key={listing.id}
              href={`/listings`}
              className="group bg-white rounded-xl border border-[#E2E8F0] overflow-hidden hover:border-[#CBD5E1] hover:shadow-sm transition-all duration-150"
            >
              {/* Photo placeholder */}
              <div
                className="h-44 w-full flex items-center justify-center overflow-hidden"
                style={{ backgroundColor: listing.color }}
              >
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="opacity-30">
                  <path d="M20 4L4 16v20h10V24h12v12h10V16L20 4z" fill="#064E3B"/>
                </svg>
              </div>

              {/* Info */}
              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <p className="text-lg font-semibold text-[#1A1A1A] tracking-tight">{listing.price}</p>
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-[#F5F2EC] text-[#64748B] shrink-0">
                    {listing.type}
                  </span>
                </div>
                <p className="text-sm text-[#1A1A1A]">{listing.address}</p>
                <p className="text-xs text-[#64748B] mb-3">{listing.city}</p>
                <div className="flex items-center gap-3 text-xs text-[#64748B]">
                  <span>{listing.beds} bd</span>
                  <span>·</span>
                  <span>{listing.baths} ba</span>
                  <span>·</span>
                  <span>{listing.sqft} sqft</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-6 text-center sm:hidden">
          <Link href="/listings" className="text-sm font-medium text-[#064E3B] hover:underline">
            View all listings →
          </Link>
        </div>
      </div>
    </section>
  )
}
