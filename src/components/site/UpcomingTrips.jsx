import { useEffect, useState } from "react";
import axios from "axios";
import { ArrowUpRight, Clock, MapPin } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function UpcomingTrips() {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    axios
      .get(`${API}/trips`)
      .then((r) => setTrips(r.data))
      .catch(() => setTrips([]));
  }, []);

  return (
    <section
      id="trips"
      data-testid="upcoming-trips-section"
      className="relative py-20 sm:py-28 bg-[var(--bg-primary)]"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex items-end justify-between mb-10 sm:mb-14 gap-6">
          <div>
            <div className="text-eyebrow text-[var(--terracotta)] mb-4">
              Upcoming departures
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-light leading-[1.05] max-w-2xl">
              Trips leaving <em className="font-editorial italic underline-brush">this season</em>.
            </h2>
          </div>
          <a
            href="#book"
            data-testid="trips-see-all"
            className="hidden sm:inline-flex items-center gap-2 text-sm font-medium text-[var(--ink)] hover:text-[var(--terracotta)]"
          >
            See all <ArrowUpRight size={16} />
          </a>
        </div>

        <div
          className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7 overflow-x-auto sm:overflow-visible snap-x snap-mandatory hide-scrollbar -mx-5 sm:mx-0 px-5 sm:px-0 pb-4"
        >
          {trips.map((t) => (
            <article
              key={t.id}
              data-testid={`trip-card-${t.id}`}
              className="group snap-start shrink-0 w-[82%] sm:w-auto bg-white rounded-2xl overflow-hidden border border-black/5 hover:-translate-y-1 hover:shadow-[0_20px_40px_-20px_rgba(31,27,22,0.25)] transition-all duration-500"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={t.image}
                  alt={t.title}
                  className="w-full h-full object-cover transition-transform duration-[900ms] group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <span className="absolute top-4 left-4 bg-white/95 text-[var(--ink)] text-xs font-semibold px-3 py-1.5 rounded-full">
                  {t.tag}
                </span>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center gap-1.5 text-xs opacity-90 mb-2">
                    <MapPin size={12} /> {t.location}
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl leading-tight">
                    {t.title}
                  </h3>
                </div>
              </div>
              <div className="p-5 flex items-center justify-between">
                <div className="text-sm text-[var(--ink-soft)] flex items-center gap-1.5">
                  <Clock size={13} /> {t.duration} · {t.dates}
                </div>
                <div className="text-right">
                  <div className="text-[10px] uppercase tracking-widest text-[var(--ink-soft)]">
                    From
                  </div>
                  <div className="font-editorial text-xl text-[var(--ink)]">
                    ₹{t.price.toLocaleString("en-IN")}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
