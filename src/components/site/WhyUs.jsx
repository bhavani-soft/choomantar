import { Users, ShieldCheck, Compass, Sparkles } from "lucide-react";

const items = [
  {
    icon: Users,
    title: "Small tribes, not tour buses",
    body: "Capped at 12 travellers. You'll know everyone's chai order by day two.",
  },
  {
    icon: Compass,
    title: "Curated by locals, not spreadsheets",
    body: "Every trip is scouted by someone who's lived there. No copy-paste itineraries.",
  },
  {
    icon: ShieldCheck,
    title: "Safety in the small print",
    body: "Verified guides, insured stays, 24×7 on-trip support. Boring stuff — done well.",
  },
  {
    icon: Sparkles,
    title: "Weirdly memorable moments",
    body: "Sunrise poha with a shepherd. Full-moon dinner on a cliff. That's the whole point.",
  },
];

export default function WhyUs() {
  return (
    <section
      id="why"
      data-testid="why-us-section"
      className="relative py-20 sm:py-28 bg-[var(--bg-primary)]"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-2 gap-14 items-start">
        <div className="lg:sticky lg:top-28">
          <div className="text-eyebrow text-[var(--terracotta)] mb-4">
            Why Choomantar
          </div>
          <h2 className="font-display text-4xl sm:text-6xl font-light leading-[1.05]">
            We plan escapes
            <br />
            like <em className="font-editorial italic underline-brush">friends</em> would.
          </h2>
          <p className="mt-6 text-[var(--ink-soft)] text-base sm:text-lg leading-relaxed max-w-md">
            No PDFs. No robotic call centres. Just a very small team, a very
            long spreadsheet of hidden places, and a slight obsession with
            getting the details right.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {items.map((it, i) => (
            <div
              key={i}
              data-testid={`why-item-${i}`}
              className="group bg-white rounded-2xl p-6 border border-black/5 hover:border-[var(--terracotta)]/30 hover:-translate-y-1 transition-all duration-500"
            >
              <div className="w-11 h-11 rounded-full bg-[var(--bg-secondary)] group-hover:bg-[var(--terracotta)] group-hover:text-white flex items-center justify-center mb-5 transition-colors">
                <it.icon size={18} strokeWidth={1.5} />
              </div>
              <h3 className="font-display text-2xl leading-tight mb-2">
                {it.title}
              </h3>
              <p className="text-sm text-[var(--ink-soft)] leading-relaxed">
                {it.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
