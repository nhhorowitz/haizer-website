import Link from 'next/link'

const categories = [
  { label: 'Contractors', slug: 'contractors', icon: '🔨', color: '#FEF3C7' },
  { label: 'Title companies', slug: 'title', icon: '📋', color: '#D1FAE5' },
  { label: 'Attorneys', slug: 'attorneys', icon: '⚖️', color: '#DBEAFE' },
  { label: 'Inspectors', slug: 'inspectors', icon: '🔍', color: '#FCE7F3' },
  { label: 'Mortgage brokers', slug: 'mortgage-brokers', icon: '🏦', color: '#FEE2E2' },
  { label: 'Lenders', slug: 'lenders', icon: '💰', color: '#EDE9FE' },
  { label: 'Insurance', slug: 'insurance', icon: '🛡️', color: '#FEF3C7' },
  { label: 'Property managers', slug: 'property-managers', icon: '🏢', color: '#D1FAE5' },
  { label: 'CPAs', slug: 'cpas', icon: '📊', color: '#DBEAFE' },
]

export function LocalPros() {
  return (
    <section className="py-16 px-4 bg-[#FAF8F3]">
      <div className="max-w-7xl mx-auto">

        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl font-semibold text-[#1A1A1A]">Local pros</h2>
            <p className="text-[#64748B] mt-1">Trusted professionals in your community</p>
          </div>
          <Link href="/directory" className="text-sm font-medium text-[#064E3B] hover:underline hidden sm:block">
            Full directory →
          </Link>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-9 gap-3">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/directory/${cat.slug}`}
              className="group flex flex-col items-center text-center p-3 rounded-xl border border-[#E2E8F0] bg-white hover:border-[#CBD5E1] hover:shadow-sm transition-all duration-150"
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-lg mb-2"
                style={{ backgroundColor: cat.color }}
              >
                {cat.icon}
              </div>
              <p className="text-xs font-medium text-[#1A1A1A] group-hover:text-[#064E3B] transition-colors leading-tight">
                {cat.label}
              </p>
            </Link>
          ))}
        </div>

      </div>
    </section>
  )
}
