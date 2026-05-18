import Link from 'next/link'

const flips = [
  { price: '$385,000', address: '22 Oak Terrace', city: 'Monsey', arv: '$580K', rehab: '$65K', profit: '$130K' },
  { price: '$290,000', address: '8 Pine St', city: 'Boro Park', arv: '$475K', rehab: '$55K', profit: '$130K' },
  { price: '$445,000', address: '301 Forest Ave', city: 'Lakewood', arv: '$650K', rehab: '$80K', profit: '$125K' },
]

const brrrr = [
  { price: '$420,000', address: '15 Elm Dr', city: 'Williamsburg', units: 3, grossRent: '$5,400/mo', capRate: '6.2%' },
  { price: '$310,000', address: '77 Maple Blvd', city: 'Flatbush', units: 2, grossRent: '$3,800/mo', capRate: '5.8%' },
  { price: '$555,000', address: '9 River Rd', city: 'Lakewood', units: 4, grossRent: '$7,200/mo', capRate: '6.6%' },
]

export function InvestorSection() {
  return (
    <section className="py-16 px-4 bg-[#FAF8F3]">
      <div className="max-w-7xl mx-auto">

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-[#1A1A1A]">Investor opportunities</h2>
          <p className="text-[#64748B] mt-1">Fix &amp; flip deals and BRRRR-ready properties</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">

          {/* Flips column */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-[#1A1A1A] uppercase tracking-wider">Fix &amp; flip</h3>
              <Link href="/listings?type=flip" className="text-xs font-medium text-[#064E3B] hover:underline">
                All flips →
              </Link>
            </div>
            <div className="flex flex-col gap-3">
              {flips.map((f) => (
                <Link
                  key={f.address}
                  href="/listings?type=flip"
                  className="bg-white rounded-xl border border-[#E2E8F0] p-4 hover:border-[#CBD5E1] hover:shadow-sm transition-all duration-150"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold text-[#1A1A1A]">{f.price}</p>
                      <p className="text-sm text-[#64748B]">{f.address}, {f.city}</p>
                    </div>
                    <span className="text-xs font-semibold text-[#064E3B] bg-[#D1FAE5] px-2 py-0.5 rounded-full shrink-0">
                      +{f.profit} est.
                    </span>
                  </div>
                  <div className="flex gap-4 mt-3 text-xs text-[#64748B]">
                    <span>ARV {f.arv}</span>
                    <span>·</span>
                    <span>Rehab {f.rehab}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* BRRRR column */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-[#1A1A1A] uppercase tracking-wider">BRRRR-ready</h3>
              <Link href="/listings?type=for_sale" className="text-xs font-medium text-[#064E3B] hover:underline">
                All rentals →
              </Link>
            </div>
            <div className="flex flex-col gap-3">
              {brrrr.map((b) => (
                <Link
                  key={b.address}
                  href="/listings?type=for_sale"
                  className="bg-white rounded-xl border border-[#E2E8F0] p-4 hover:border-[#CBD5E1] hover:shadow-sm transition-all duration-150"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold text-[#1A1A1A]">{b.price}</p>
                      <p className="text-sm text-[#64748B]">{b.address}, {b.city}</p>
                    </div>
                    <span className="text-xs font-semibold text-[#E2725B] bg-[#FEF3C7] px-2 py-0.5 rounded-full shrink-0">
                      {b.capRate} cap
                    </span>
                  </div>
                  <div className="flex gap-4 mt-3 text-xs text-[#64748B]">
                    <span>{b.units} units</span>
                    <span>·</span>
                    <span>{b.grossRent}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
