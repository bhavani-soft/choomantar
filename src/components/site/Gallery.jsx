const images = [
  {
    src: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?crop=entropy&cs=srgb&fm=jpg&q=85",
    alt: "Bonfire under the stars",
    span: "row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=compress&cs=tinysrgb&w=800",
    alt: "Himalayan peak at dawn",
  },
  {
    src: "https://images.unsplash.com/photo-1509316975850-ff9c5edd0cd9?auto=compress&cs=tinysrgb&w=800",
    alt: "Thar desert dunes",
  },
  {
    src: "https://images.unsplash.com/photo-1534777367038-9404f45b869a?crop=entropy&cs=srgb&fm=jpg&q=85",
    alt: "Traveler at the Taj",
    span: "col-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=compress&cs=tinysrgb&w=800",
    alt: "Kerala houseboat",
  },
  {
    src: "https://images.unsplash.com/photo-1651663020072-b51bfa7b0813?crop=entropy&cs=srgb&fm=jpg&q=85",
    alt: "Backpacker in the mountains",
    span: "row-span-2",
  },
];

export default function Gallery() {
  return (
    <section
      id="gallery"
      data-testid="gallery-section"
      className="relative py-20 sm:py-28 bg-[var(--ink)] text-[var(--cream)]"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex items-end justify-between mb-10 sm:mb-14 gap-6">
          <div>
            <div className="text-eyebrow text-[var(--marigold)] mb-4">
              From the road
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-light leading-[1.05] text-[var(--cream)]">
              Postcards from
              <br />
              our <em className="font-editorial italic">last quarter</em>.
            </h2>
          </div>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            data-testid="gallery-insta"
            className="hidden sm:inline-flex text-sm text-[var(--cream)]/80 hover:text-[var(--marigold)] underline underline-offset-4"
          >
            @choomantar.travel
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 auto-rows-[160px] sm:auto-rows-[200px] gap-3 sm:gap-4">
          {images.map((img, i) => (
            <div
              key={i}
              data-testid={`gallery-image-${i}`}
              className={`relative overflow-hidden rounded-xl group ${img.span || ""}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-[900ms] group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
