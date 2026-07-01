import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Can I come solo?",
    a: "That's actually how most people join us. Every trip has a mix of solo travellers, and our tribe size is capped so you'll actually get to know everyone.",
  },
  {
    q: "How fit do I need to be for treks?",
    a: "If you can walk 5 km without dying, our Easy & Moderate treks are for you. We tag every trip with a difficulty rating, and our trip curator will honestly tell you if it's a bad fit.",
  },
  {
    q: "What's included in the trip cost?",
    a: "Stays, most meals, all transfers during the trip, permits, guide fees and insurance. Flights/trains to the base city are on you — we help you book them cheap.",
  },
  {
    q: "Cancellation policy?",
    a: "Full refund up to 21 days before the trip, 50% up to 10 days, and free rescheduling to any future trip within a year. We're founders, not sharks.",
  },
  {
    q: "Do you customise private trips?",
    a: "Yes — birthdays, bachelorettes, family trips, offsites. Drop us a line via the booking form and we'll craft one for you.",
  },
];

export default function FAQ() {
  return (
    <section
      id="faq"
      data-testid="faq-section"
      className="relative py-20 sm:py-28 bg-[var(--bg-primary)]"
    >
      <div className="max-w-4xl mx-auto px-5 sm:px-8">
        <div className="mb-12 text-center sm:text-left">
          <div className="text-eyebrow text-[var(--terracotta)] mb-4">
            Curious minds
          </div>
          <h2 className="font-display text-4xl sm:text-6xl font-light leading-[1.05]">
            Questions,
            <br />
            <em className="font-editorial italic">answered honestly</em>.
          </h2>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((f, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              data-testid={`faq-item-${i}`}
              className="border-b border-black/10 py-2"
            >
              <AccordionTrigger className="font-display text-xl sm:text-2xl text-left hover:text-[var(--terracotta)] hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-[var(--ink-soft)] text-base leading-relaxed pb-5">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
