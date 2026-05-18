const steps = [
  {
    number: '01',
    title: 'Find your property',
    description: 'Browse listings by city, type, and price. Filter by Eruv access, shul proximity, and more.',
  },
  {
    number: '02',
    title: 'Connect directly',
    description: 'Message the seller or agent directly — no middlemen, no gatekeeping, no fees.',
  },
  {
    number: '03',
    title: 'Close the deal',
    description: 'Work with the pro of your choice. We stay out of the transaction — you stay in control.',
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-12">
          <h2 className="text-2xl font-semibold text-[#1A1A1A]">How Haizer works</h2>
          <p className="text-[#64748B] mt-2 max-w-md mx-auto">
            Simple, transparent, and always free to list.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((step) => (
            <div key={step.number} className="text-center">
              <div className="w-12 h-12 rounded-full bg-[#064E3B] text-white text-sm font-semibold flex items-center justify-center mx-auto mb-4">
                {step.number}
              </div>
              <h3 className="text-base font-semibold text-[#1A1A1A] mb-2">{step.title}</h3>
              <p className="text-sm text-[#64748B] leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
