import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
  const containerRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const track = trackRef.current;
    if (!track) return;

    // Use a base speed (pixels per animation frame)
    const baseSpeed = 1.0;
    let currentX = 0;
    let direction = -1; // -1 for leftward, 1 for rightward
    let velocityMultiplier = 1;

    // Main animation loop
    const animate = () => {
      // Gradually decay the velocity back to base speed
      velocityMultiplier += (1 - velocityMultiplier) * 0.08;

      // Calculate translation step
      currentX += baseSpeed * direction * velocityMultiplier;

      // Wrap around seamlessly
      const halfWidth = track.scrollWidth / 2;
      if (direction === -1 && Math.abs(currentX) >= halfWidth) {
        currentX = 0;
      } else if (direction === 1 && currentX >= 0) {
        currentX = -halfWidth;
      }

      gsap.set(track, { x: currentX });
    };

    // Add animation ticker
    gsap.ticker.add(animate);

    // ScrollTrigger to detect scroll velocity and accelerate/steer loop direction
    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        const velocity = self.getVelocity(); // positive when scrolling down, negative when scrolling up
        if (velocity !== 0) {
          direction = velocity < 0 ? 1 : -1;
          // Apply multiplier based on velocity strength
          velocityMultiplier = Math.min(1 + Math.abs(velocity) * 0.008, 12);
        }
      }
    });

    return () => {
      gsap.ticker.remove(animate);
      trigger.kill();
    };
  }, []);

  // Repeat words array to create a seamless looping list
  const items = [...words, ...words, ...words, ...words];

  return (
    <section
      ref={containerRef}
      data-testid="marquee-section"
      className="relative bg-[var(--ink)] text-[var(--cream)] py-6 overflow-hidden border-y border-black/20"
    >
      <div
        ref={trackRef}
        className="flex whitespace-nowrap will-change-transform"
      >
        {items.map((w, i) => (
          <span
            key={i}
            className="mx-6 sm:mx-10 font-display italic text-2xl sm:text-3xl text-[var(--cream)]/90 flex items-center gap-6 sm:gap-10 shrink-0"
          >
            {w}
            <span className="text-[var(--marigold)]">✦</span>
          </span>
        ))}
      </div>
    </section>
  );
}
