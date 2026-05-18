import Link from 'next/link'

const tools = [
  {
    title: 'Mortgage calculator',
    description: 'Estimate monthly payments for any purchase price and down payment.',
    href: '/tools/mortgage',
    color: '#D1FAE5',
  },
  {
    title: 'BRRRR calculator',
    description: 'Model buy · rehab · rent · refi · repeat deals end to end.',
    href: '/tools/brrrr',
    color: '#FEF3C7',
  },
  {
    title: 'Fix & flip calculator',
    description: 'Calculate profit, ROI, and break-even on any flip deal.',
    href: '/tools/fix-flip',
    color: '#DBEAFE',
  },
  {
    title: 'Deal analyzer',
    description: 'Full investment analysis: cap rate, cash-on-cash, cash flow.',
    href: '/tools/deal-analyzer',
    color: '#FCE7F3',
  },
]

export function ToolsSection() {
  return (
    <section className="py-16 px-4 bg-[#FAF8F3]">
      <div className="max-w-7xl mx-auto">

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-[#1A1A1A]">Free tools for investors</h2>
          <p className="text-[#64748B] mt-1">Run the numbers before you make a move</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group bg-white rounded-xl border border-[#E2E8F0] p-6 hover:border-[#CBD5E1] hover:shadow-sm transition-all duration-150"
            >
              <div
                className="w-10 h-10 rounded-lg mb-4 flex items-center justify-center"
                style={{ backgroundColor: tool.color }}
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <rect x="2" y="2" width="14" height="14" rx="2" stroke="#064E3B" strokeWidth="1.5"/>
                  <path d="M5 9h8M9 5v8" stroke="#064E3B" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <h3 className="text-sm font-semibold text-[#1A1A1A] mb-2 group-hover:text-[#064E3B] transition-colors">
                {tool.title}
              </h3>
              <p className="text-xs text-[#64748B] leading-relaxed">{tool.description}</p>
            </Link>
          ))}
        </div>

      </div>
    </section>
  )
}
