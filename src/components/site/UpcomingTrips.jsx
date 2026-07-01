import { useState } from "react";
import { ArrowUpRight, Clock, MapPin } from "lucide-react";

const defaultTrips = [
  {
    "id": "hampi",
    "image": "https://images.unsplash.com/photo-1600100397590-240a7b59d5c8?auto=compress&cs=tinysrgb&w=800",
    "title": "Ruins of Hampi Exploration",
    "tag": "Bestseller",
    "location": "Hampi, Karnataka",
    "duration": "3 Days",
    "dates": "Oct 12 - Oct 15",
    "price": 7999
  },
  {
    "id": "chikmagalur",
    "image": "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=compress&cs=tinysrgb&w=800",
    "title": "Coffee Estate & Mullayanagiri Trek",
    "tag": "Trending",
    "location": "Chikmagalur, Karnataka",
    "duration": "2 Days",
    "dates": "Oct 24 - Oct 26",
    "price": 5499
  },
  {
    "id": "gokarna",
    "image": "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=compress&cs=tinysrgb&w=800",
    "title": "Gokarna Beach Trek & Camping",
    "tag": "Popular",
    "location": "Gokarna, Karnataka",
    "duration": "3 Days",
    "dates": "Nov 07 - Nov 10",
    "price": 6499
  },
  {
    "id": "munnar",
    "image": "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=compress&cs=tinysrgb&w=800",
    "title": "Tea Hills & Meesapulimala Trek",
    "tag": "Scenic",
    "location": "Munnar, Kerala",
    "duration": "4 Days",
    "dates": "Nov 14 - Nov 18",
    "price": 9999
  },
  {
    "id": "hogenakkal",
    "image": "https://images.unsplash.com/photo-1626014903708-5445ea574373?auto=compress&cs=tinysrgb&w=800",
    "title": "Hogenakkal Falls Coracle Ride",
    "tag": "Weekend Getaway",
    "location": "Dharmapuri, Tamil Nadu",
    "duration": "1 Day",
    "dates": "Nov 22",
    "price": 2499
  },
  {
    "id": "karwar",
    "image": "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=compress&cs=tinysrgb&w=800",
    "title": "Karwar Island & Devbagh Escape",
    "tag": "Hidden Gem",
    "location": "Karwar, Karnataka",
    "duration": "3 Days",
    "dates": "Dec 05 - Dec 08",
    "price": 8999
  },
  {
    "id": "murudeshwar",
    "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=compress&cs=tinysrgb&w=800",
    "title": "Scuba Diving & Netrani Island",
    "tag": "Adventure",
    "location": "Murudeshwar, Karnataka",
    "duration": "2 Days",
    "dates": "Dec 12 - Dec 14",
    "price": 6999
  },
  {
    "id": "ooty",
    "image": "https://images.unsplash.com/photo-1598135753163-6167c1a1ad65?auto=compress&cs=tinysrgb&w=800",
    "title": "Nilgiri Peak & Toy Train Journey",
    "tag": "Classic",
    "location": "Ooty, Tamil Nadu",
    "duration": "3 Days",
    "dates": "Dec 25 - Dec 28",
    "price": 7499
  },
  {
    "id": "kochi",
    "image": "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=compress&cs=tinysrgb&w=800",
    "title": "Fort Kochi Heritage Walk",
    "tag": "Culture",
    "location": "Kochi, Kerala",
    "duration": "2 Days",
    "dates": "Jan 08 - Jan 10",
    "price": 4999
  },
  {
    "id": "alleppey",
    "image": "https://images.unsplash.com/photo-1593693411515-c202e974eb05?auto=compress&cs=tinysrgb&w=800",
    "title": "Alleppey Houseboat Backwater Cruise",
    "tag": "Romance",
    "location": "Alleppey, Kerala",
    "duration": "3 Days",
    "dates": "Jan 15 - Jan 18",
    "price": 8499
  },
  {
    "id": "andarban-devkund",
    "image": "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=compress&cs=tinysrgb&w=800",
    "title": "Andharban Forest & Devkund Falls Trek",
    "tag": "Monsoon Special",
    "location": "Tamhini Ghat, Maharashtra",
    "duration": "2 Days",
    "dates": "Jan 22 - Jan 24",
    "price": 3999
  }
];

export default function UpcomingTrips() {
  const [trips] = useState(defaultTrips);

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
