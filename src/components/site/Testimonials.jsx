import { Quote } from "lucide-react";

const items = [
  {
    quote:
      "Signed up solo for the Spiti trip. Came back with seven whatsapp groups, a slight tan and, apparently, a co-founder.",
    name: "Riya Menon",
    role: "Designer, Hyderabad",
    avatar:
      "https://images.pexels.com/photos/12327289/pexels-photo-12327289.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
  {
    quote:
      "The bonfire debate on day 3 about Maggi vs Poha lasted 4 hours. That's when I knew these people were mine.",
    name: "Aditya Rao",
    role: "Product Manager, Mumbai",
    avatar:
      "https://images.pexels.com/photos/29679657/pexels-photo-29679657.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
  {
    quote:
      "Booked on a Wednesday. On a train by Friday. Choomantar makes disappearing embarrassingly easy.",
    name: "Kavya Iyer",
    role: "Founder, Chennai",
    avatar:
      "https://images.pexels.com/photos/12327289/pexels-photo-12327289.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
];

export default function Testimonials() {
  return (
    <section
      data-testid="testimonials-section"
      className="relative py-20 sm:py-28 bg-[var(--bg-secondary)]"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="mb-12 sm:mb-16">
          <div className="text-eyebrow text-[var(--terracotta)] mb-4">
            Word on the trail
          </div>
          <h2 className="font-display text-4xl sm:text-6xl font-light leading-[1.05] max-w-3xl">
            The kind of reviews
            <br />
            that make our <em className="font-editorial italic">moms proud</em>.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5 sm:gap-6">
          {items.map((t, i) => (
            <figure
              key={i}
              data-testid={`testimonial-${i}`}
              className="relative bg-white rounded-2xl p-6 sm:p-7 border border-black/5 hover:-translate-y-1 hover:shadow-xl transition-all"
            >
              <Quote
                size={30}
                className="text-[var(--terracotta)]/40 absolute top-5 right-5"
              />
              <blockquote className="font-display text-xl sm:text-2xl leading-snug text-[var(--ink)]">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-11 h-11 rounded-full object-cover border border-black/10"
                  loading="lazy"
                />
                <div>
                  <div className="font-medium text-sm">{t.name}</div>
                  <div className="text-xs text-[var(--ink-soft)]">{t.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
