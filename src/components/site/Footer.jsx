import { Instagram, Twitter, Youtube, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer
      data-testid="footer-section"
      className="relative bg-[var(--indigo-deep)] text-[var(--cream)] pt-20 pb-10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid sm:grid-cols-2 gap-10 pb-14 border-b border-white/10">
          <div>
            <div className="font-editorial italic text-[var(--marigold)] text-eyebrow mb-4">
              A parting note
            </div>
            <p className="font-display text-3xl sm:text-4xl leading-tight max-w-lg">
              “The world is a book, and those who do not travel read only one page.”
            </p>
            <p className="mt-4 text-white/60 text-sm">— St. Augustine (and a very biased travel brand)</p>
          </div>

          <div className="grid grid-cols-2 gap-8 text-sm">
            <div>
              <div className="text-eyebrow text-[var(--marigold)] mb-4">Wander</div>
              <ul className="space-y-2 text-white/80">
                <li><a href="#trips" className="hover:text-[var(--marigold)]">Upcoming Trips</a></li>
                <li><a href="#categories" className="hover:text-[var(--marigold)]">Categories</a></li>
                <li><a href="#book" className="hover:text-[var(--marigold)]">Custom Trips</a></li>
                <li><a href="#gallery" className="hover:text-[var(--marigold)]">Gallery</a></li>
              </ul>
            </div>
            <div>
              <div className="text-eyebrow text-[var(--marigold)] mb-4">Company</div>
              <ul className="space-y-2 text-white/80">
                <li><a href="#why" className="hover:text-[var(--marigold)]">About</a></li>
                <li><a href="#faq" className="hover:text-[var(--marigold)]">FAQ</a></li>
                <li><a href="#book" className="hover:text-[var(--marigold)]">Careers</a></li>
                <li><a href="#book" className="hover:text-[var(--marigold)]">Press</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="py-14 flex items-center justify-center w-full overflow-hidden">
          <div
            data-testid="footer-wordmark"
            className="font-wordmark text-white text-[15vw] sm:text-[15vw] md:text-[14vw] leading-none tracking-tighter select-none text-center"
          >
            choomantar<span className="text-[var(--marigold)]">.</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <div>© {new Date().getFullYear()} Choomantar Travel Co. · Crafted with चाय in Hyderabad.</div>
          <div className="flex items-center gap-3">
            <a href="https://instagram.com" data-testid="social-instagram" aria-label="Instagram" className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:bg-[var(--marigold)] hover:border-[var(--marigold)] hover:text-[var(--indigo-deep)] transition-colors"><Instagram size={15}/></a>
            <a href="https://twitter.com" data-testid="social-twitter" aria-label="Twitter" className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:bg-[var(--marigold)] hover:border-[var(--marigold)] hover:text-[var(--indigo-deep)] transition-colors"><Twitter size={15}/></a>
            <a href="https://youtube.com" data-testid="social-youtube" aria-label="YouTube" className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:bg-[var(--marigold)] hover:border-[var(--marigold)] hover:text-[var(--indigo-deep)] transition-colors"><Youtube size={15}/></a>
            <a href="mailto:hi@choomantar.in" data-testid="social-email" aria-label="Email" className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:bg-[var(--marigold)] hover:border-[var(--marigold)] hover:text-[var(--indigo-deep)] transition-colors"><Mail size={15}/></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
