import Link from 'next/link'

const cities = [
  { name: 'Boro Park', slug: 'boro-park', count: '640+ listings', color: '#D1FAE5' },
  { name: 'Williamsburg', slug: 'williamsburg', count: '410+ listings', color: '#FEF3C7' },
  { name: 'Flatbush', slug: 'flatbush', count: '380+ listings', color: '#DBEAFE' },
  { name: 'Monsey', slug: 'monsey', count: '290+ listings', color: '#FCE7F3' },
  { name: 'Lakewood', slug: 'lakewood', count: '520+ listings', color: '#FEE2E2' },
  { name: 'Kiryas Joel', slug: 'kiryas-joel', count: '160+ listings', color: '#EDE9FE' },
]

export function BrowseCities() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-[#1A1A1A]">Browse by city</h2>
          <p className="text-[#64748B] mt-1">The six communities we know best</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {cities.map((city) => (
            <Link
              key={city.slug}
              href={`/cities/${city.slug}`}
              className="group flex flex-col items-center text-center rounded-xl border border-[#E2E8F0] p-5 hover:border-[#CBD5E1] hover:shadow-sm transition-all duration-150"
            >
              {/* City icon placeholder */}
              <div
                className="w-12 h-12 rounded-full mb-3 flex items-center justify-center text-lg font-semibold"
                style={{ backgroundColor: city.color, color: '#1A1A1A' }}
              >
                {city.name[0]}
              </div>
              <p className="text-sm font-semibold text-[#1A1A1A] group-hover:text-[#064E3B] transition-colors">
                {city.name}
              </p>
              <p className="text-xs text-[#94A3B8] mt-0.5">{city.count}</p>
            </Link>
          ))}
        </div>

      </div>
    </section>
  )
}
