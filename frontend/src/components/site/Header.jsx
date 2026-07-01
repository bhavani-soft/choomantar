import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#trips", label: "Trips" },
  { href: "#categories", label: "Categories" },
  { href: "#why", label: "Why Us" },
  { href: "#gallery", label: "Gallery" },
  { href: "#faq", label: "FAQ" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-testid="header-nav"
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/75 backdrop-blur-xl border-b border-black/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 sm:h-20 flex items-center justify-between">
        <a
          href="#top"
          data-testid="brand-wordmark"
          className={`font-wordmark text-3xl sm:text-4xl leading-none ${
            scrolled ? "text-[var(--ink)]" : "text-white drop-shadow-md"
          }`}
        >
          choomantar<span className="text-[var(--terracotta)]">.</span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-testid={`nav-link-${l.label.toLowerCase().replace(/\s/g, "-")}`}
              className={`font-body text-sm tracking-wide hover:text-[var(--terracotta)] transition-colors ${
                scrolled ? "text-[var(--ink-soft)]" : "text-white/90"
              }`}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#book"
            data-testid="header-cta"
            className="inline-flex items-center rounded-full bg-[var(--ink)] text-[var(--cream)] px-5 py-2.5 text-sm font-medium hover:bg-[var(--terracotta)] transition-colors"
          >
            Plan my escape
          </a>
        </nav>

        <button
          onClick={() => setOpen(!open)}
          data-testid="mobile-menu-toggle"
          aria-label="Menu"
          className={`md:hidden w-10 h-10 rounded-full flex items-center justify-center ${
            scrolled
              ? "bg-[var(--ink)] text-white"
              : "bg-white/20 backdrop-blur text-white border border-white/30"
          }`}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open && (
        <div
          data-testid="mobile-menu"
          className="md:hidden bg-[var(--bg-primary)] border-t border-black/5"
        >
          <div className="px-6 py-6 flex flex-col gap-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                data-testid={`mobile-link-${l.label.toLowerCase()}`}
                className="font-display text-3xl text-[var(--ink)] hover:text-[var(--terracotta)]"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#book"
              onClick={() => setOpen(false)}
              data-testid="mobile-cta"
              className="mt-3 inline-flex justify-center items-center rounded-full bg-[var(--terracotta)] text-white px-6 py-3 font-medium"
            >
              Plan my escape →
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
