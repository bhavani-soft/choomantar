import { ArrowRight, Star } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="top"
      data-testid="hero-section"
      className="relative min-h-[100svh] w-full overflow-hidden"
    >
      <img
        src="https://images.unsplash.com/photo-1604394823436-623c4eaf029b?crop=entropy&cs=srgb&fm=jpg&q=85"
        alt="Backpacker walking into misty mountains"
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/25 to-[var(--bg-primary)]" />
      <div className="absolute inset-0 grain" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 pt-32 sm:pt-40 pb-20 min-h-[100svh] flex flex-col justify-end">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 text-white/90 text-eyebrow mb-6">
            <span className="w-8 h-px bg-[var(--marigold)]" />
            <span>Est. 2024 · Made in Bharat</span>
          </div>

          <h1
            data-testid="hero-heading"
            className="font-display text-white text-[3.4rem] leading-[0.95] sm:text-7xl md:text-8xl font-light tracking-tight"
          >
            Vanish into
            <br />
            the <em className="font-editorial italic text-[var(--marigold)]">extra</em>ordinary.
          </h1>

          <p className="mt-6 text-white/85 text-base sm:text-lg max-w-xl leading-relaxed">
            Small groups. Wild corners of India. Weekends that feel like a
            month off. <span className="font-editorial italic">Choomantar</span> — say the word, and off you go.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <a
              href="#trips"
              data-testid="hero-cta-primary"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-[var(--terracotta)] hover:bg-[var(--terracotta-deep)] text-white px-6 py-4 font-medium transition-colors"
            >
              Find your escape
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#book"
              data-testid="hero-cta-secondary"
              className="inline-flex items-center justify-center rounded-full bg-white/10 backdrop-blur border border-white/40 text-white px-6 py-4 font-medium hover:bg-white/20 transition-colors"
            >
              Talk to a trip curator
            </a>
          </div>

          <div className="mt-10 flex items-center gap-6 text-white/90">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className="fill-[var(--marigold)] text-[var(--marigold)]" />
              ))}
            </div>
            <div className="text-sm">
              <span className="font-semibold">4.9</span> · loved by 12,000+ travellers
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
