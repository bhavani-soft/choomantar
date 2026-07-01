import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

export default function StickyMobileCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      data-testid="sticky-mobile-cta"
      className={`md:hidden fixed bottom-4 inset-x-4 z-40 transition-all duration-500 ${
        show ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0 pointer-events-none"
      }`}
    >
      <a
        href="#book"
        className="flex items-center justify-between gap-3 bg-[var(--ink)] text-white rounded-full pl-6 pr-2 py-2 shadow-2xl shadow-black/30"
      >
        <span className="font-display italic text-lg">Plan my escape</span>
        <span className="w-10 h-10 rounded-full bg-[var(--terracotta)] flex items-center justify-center">
          <ArrowRight size={18} />
        </span>
      </a>
    </div>
  );
}
