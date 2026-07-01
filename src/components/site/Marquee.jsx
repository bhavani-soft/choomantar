const words = [
  "Himalayas",
  "Backwaters",
  "Backpacking",
  "Bonfires",
  "Bikepacking",
  "Weekend Getaways",
  "Sundowners",
  "Homestays",
  "Solo Meetups",
  "Chai at 3AM",
];

export default function Marquee() {
  const items = [...words, ...words];
  return (
    <section
      data-testid="marquee-section"
      className="relative bg-[var(--ink)] text-[var(--cream)] py-5 overflow-hidden border-y border-black/20"
    >
      <div className="flex whitespace-nowrap animate-marquee">
        {items.map((w, i) => (
          <span
            key={i}
            className="mx-6 sm:mx-10 font-display italic text-2xl sm:text-3xl text-[var(--cream)]/90"
          >
            {w}
            <span className="ml-6 sm:ml-10 text-[var(--marigold)]">✦</span>
          </span>
        ))}
      </div>
    </section>
  );
}
