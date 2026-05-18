import Link from 'next/link'

const agents = [
  { name: 'Yossi Katz', brokerage: 'Katz Realty Group', city: 'Boro Park', listings: 24, initials: 'YK', color: '#D1FAE5' },
  { name: 'Suri Feldman', brokerage: 'Feldman Properties', city: 'Williamsburg', listings: 18, initials: 'SF', color: '#FEF3C7' },
  { name: 'Moishe Stern', brokerage: 'Stern Real Estate', city: 'Lakewood', listings: 31, initials: 'MS', color: '#DBEAFE' },
  { name: 'Chana Weiss', brokerage: 'Independent', city: 'Flatbush', listings: 12, initials: 'CW', color: '#FCE7F3' },
]

export function FeaturedAgents() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">

        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-1">Sponsored</p>
            <h2 className="text-2xl font-semibold text-[#1A1A1A]">Featured agents</h2>
          </div>
          <Link href="/agents" className="text-sm font-medium text-[#064E3B] hover:underline hidden sm:block">
            All agents →
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {agents.map((agent) => (
            <Link
              key={agent.name}
              href="/agents"
              className="group bg-white rounded-xl border border-[#E2E8F0] p-5 text-center hover:border-[#CBD5E1] hover:shadow-sm transition-all duration-150"
            >
              <div
                className="w-14 h-14 rounded-full mx-auto mb-3 flex items-center justify-center text-base font-semibold"
                style={{ backgroundColor: agent.color }}
              >
                {agent.initials}
              </div>
              <p className="text-sm font-semibold text-[#1A1A1A] group-hover:text-[#064E3B] transition-colors">
                {agent.name}
              </p>
              <p className="text-xs text-[#64748B] mt-0.5">{agent.brokerage}</p>
              <p className="text-xs text-[#94A3B8] mt-1">{agent.city} · {agent.listings} listings</p>
            </Link>
          ))}
        </div>

      </div>
    </section>
  )
}
