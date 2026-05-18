import Link from 'next/link'

const columns = [
  {
    heading: 'Buy',
    links: [
      { label: 'Browse listings', href: '/listings?type=for_sale' },
      { label: 'Browse by city', href: '/listings' },
      { label: 'New developments', href: '/developments' },
      { label: 'Find an agent', href: '/agents' },
    ],
  },
  {
    heading: 'Sell',
    links: [
      { label: 'List your property', href: '/listings/new' },
      { label: 'How it works', href: '/#how-it-works' },
      { label: 'Pricing', href: '/pricing' },
    ],
  },
  {
    heading: 'Investors',
    links: [
      { label: 'Flip opportunities', href: '/listings?type=flip' },
      { label: 'BRRRR calculator', href: '/tools/brrrr' },
      { label: 'Fix & flip calculator', href: '/tools/fix-flip' },
      { label: 'Mortgage calculator', href: '/tools/mortgage' },
    ],
  },
  {
    heading: 'About',
    links: [
      { label: 'About Haizer', href: '/about' },
      { label: 'Field Notes', href: '/field-notes' },
      { label: 'Service directory', href: '/directory' },
      { label: 'Contact', href: '/contact' },
    ],
  },
]

const cities = [
  { label: 'Boro Park', href: '/cities/boro-park' },
  { label: 'Williamsburg', href: '/cities/williamsburg' },
  { label: 'Flatbush', href: '/cities/flatbush' },
  { label: 'Monsey', href: '/cities/monsey' },
  { label: 'Lakewood', href: '/cities/lakewood' },
  { label: 'Kiryas Joel', href: '/cities/kiryas-joel' },
]

export function Footer() {
  return (
    <footer className="bg-[#F5F2EC] border-t border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">

        {/* Top: wordmark + tagline */}
        <div className="mb-10">
          <p className="text-xl font-semibold text-[#064E3B]">Haizer</p>
          <p className="text-sm text-[#64748B] mt-1">Homes. Flips. Rentals. Direct.</p>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {columns.map((col) => (
            <div key={col.heading}>
              <p className="text-xs font-semibold text-[#1A1A1A] uppercase tracking-wider mb-3">
                {col.heading}
              </p>
              <ul className="flex flex-col gap-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-[#64748B] hover:text-[#1A1A1A] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Cities */}
        <div className="mb-10">
          <p className="text-xs font-semibold text-[#1A1A1A] uppercase tracking-wider mb-3">
            Launch cities
          </p>
          <div className="flex flex-wrap gap-3">
            {cities.map((city) => (
              <Link
                key={city.href}
                href={city.href}
                className="text-sm text-[#64748B] hover:text-[#1A1A1A] transition-colors"
              >
                {city.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div className="border-t border-[#E2E8F0] pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-[#94A3B8]">
          <p>© 2026 Haizer. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-[#64748B] transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-[#64748B] transition-colors">Terms</Link>
            <Link href="/contact" className="hover:text-[#64748B] transition-colors">Contact</Link>
          </div>
        </div>

      </div>
    </footer>
  )
}
