import Link from 'next/link'

export function SellCta() {
  return (
    <section className="py-16 px-4 bg-[#064E3B]">
      <div className="max-w-3xl mx-auto text-center">

        <h2 className="text-3xl font-semibold text-white mb-3">
          Sell or rent — totally free
        </h2>
        <p className="text-[#D1FAE5] text-lg mb-8 max-w-lg mx-auto">
          No commissions. No subscription required. List your property and reach thousands of buyers and renters in your community.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/listings/new"
            className="inline-flex items-center justify-center h-12 px-8 bg-white text-[#064E3B] font-semibold rounded-full hover:bg-[#F5F2EC] transition-colors text-sm"
          >
            List for free
          </Link>
          <Link
            href="/#how-it-works"
            className="inline-flex items-center justify-center h-12 px-8 border border-white/30 text-white font-medium rounded-full hover:bg-white/10 transition-colors text-sm"
          >
            How it works
          </Link>
        </div>

      </div>
    </section>
  )
}
