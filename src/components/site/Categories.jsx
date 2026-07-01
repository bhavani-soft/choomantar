import { ArrowUpRight } from "lucide-react";

const categories = [
  {
    id: "weekend",
    title: "Weekend Getaways",
    tagline: "Two nights. Zero regrets.",
    image:
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=compress&cs=tinysrgb&w=800",
    span: "sm:col-span-2 sm:row-span-2",
  },
  {
    id: "himalayas",
    title: "Himalayan Treks",
    tagline: "Above the clouds.",
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "backpacking",
    title: "Backpacking",
    tagline: "Light bag, heavy stories.",
    image:
      "https://images.unsplash.com/photo-1651663020072-b51bfa7b0813?crop=entropy&cs=srgb&fm=jpg&q=85",
  },
  {
    id: "offbeat",
    title: "Offbeat India",
    tagline: "Places Google didn't pin.",
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "meetups",
    title: "Solo Meetups",
    tagline: "Come alone, leave with a tribe.",
    image:
      "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?crop=entropy&cs=srgb&fm=jpg&q=85",
  },
];

export default function Categories() {
  return (
    <section
      id="categories"
      data-testid="categories-section"
      className="relative py-20 sm:py-28 bg-[var(--bg-secondary)] jaali-bg"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="text-eyebrow text-[var(--terracotta)] mb-4">
            Pick your poison
          </div>
          <h2 className="font-display text-4xl sm:text-6xl font-light leading-[1.05]">
            Five moods.
            <br />
            <em className="font-editorial italic">One escape hatch.</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 auto-rows-[220px] sm:auto-rows-[200px] gap-4 sm:gap-5">
          {categories.map((c) => (
            <a
              key={c.id}
              href="#book"
              data-testid={`category-${c.id}`}
              className={`group relative overflow-hidden rounded-2xl ${c.span || ""}`}
            >
              <img
                src={c.image}
                alt={c.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[900ms] group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/70 via-black/30 to-transparent" />
              <div className="relative h-full p-5 sm:p-6 flex flex-col justify-end text-white">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display text-2xl sm:text-3xl leading-tight">
                      {c.title}
                    </h3>
                    <p className="text-sm text-white/80 mt-1 font-editorial italic">
                      {c.tagline}
                    </p>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-white/15 backdrop-blur border border-white/30 flex items-center justify-center group-hover:bg-[var(--marigold)] group-hover:border-[var(--marigold)] transition-all">
                    <ArrowUpRight size={16} />
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
