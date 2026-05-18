import { Hero } from '@/components/home/hero'
import { TrustStrip } from '@/components/home/trust-strip'
import { FeaturedListings } from '@/components/home/featured-listings'
import { BrowseCities } from '@/components/home/browse-cities'
import { InvestorSection } from '@/components/home/investor-section'
import { FeaturedAgents } from '@/components/home/featured-agents'
import { ToolsSection } from '@/components/home/tools-section'
import { HowItWorks } from '@/components/home/how-it-works'
import { LocalPros } from '@/components/home/local-pros'
import { SellCta } from '@/components/home/sell-cta'

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <FeaturedListings />
      <BrowseCities />
      <InvestorSection />
      <FeaturedAgents />
      <ToolsSection />
      <HowItWorks />
      <LocalPros />
      <SellCta />
    </>
  )
}
