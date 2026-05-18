const stats = [
  { value: '2,400+', label: 'Active listings' },
  { value: '6', label: 'Launch cities' },
  { value: '$0', label: 'To list your property' },
]

export function TrustStrip() {
  return (
    <section className="bg-white border-y border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
          {stats.map((stat, i) => (
            <div key={stat.label} className="flex items-center gap-12">
              <div className="text-center">
                <p className="text-2xl font-semibold text-[#064E3B] tracking-tight">{stat.value}</p>
                <p className="text-sm text-[#64748B] mt-0.5">{stat.label}</p>
              </div>
              {i < stats.length - 1 && (
                <span className="hidden sm:block text-[#CBD5E1] text-2xl select-none">·</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
