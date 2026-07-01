import { useState } from "react";
import { toast } from "sonner";
import { Loader2, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const interests = [
  "Weekend Getaway",
  "Himalayan Trek",
  "Backpacking",
  "Offbeat India",
  "Solo Meetup",
  "Custom / Private Trip",
];

export default function BookingForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    trip_interest: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const onChange = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone) {
      toast.error("Please fill in your name, email and phone.");
      return;
    }
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      toast.success("Choomantar! ✦ We'll reach out within 24 hours.");
      setForm({ name: "", email: "", phone: "", trip_interest: "", message: "" });
    } catch {
      toast.error("Something broke on our end. Try again in a minute?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="book"
      data-testid="booking-section"
      className="relative py-20 sm:py-28 bg-[var(--bg-secondary)] overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
        <div className="relative">
          <div className="text-eyebrow text-[var(--terracotta)] mb-4">
            Say the word
          </div>
          <h2 className="font-display text-4xl sm:text-6xl font-light leading-[1.05]">
            Choomantar.
            <br />
            <em className="font-editorial italic underline-brush">And you're gone.</em>
          </h2>
          <p className="mt-6 text-[var(--ink-soft)] text-base sm:text-lg leading-relaxed max-w-md">
            Drop us a line about what you're dreaming of — a monsoon in Meghalaya,
            a birthday in Ladakh, a Friday-night vanish to Coorg. A human replies
            within a day.
          </p>

          <div className="mt-10 space-y-3 text-sm text-[var(--ink-soft)]">
            <div>📞 <span className="font-medium text-[var(--ink)]">+91 98100 43210</span></div>
            <div>✉️ <span className="font-medium text-[var(--ink)]">hi@choomantar.in</span></div>
            <div>📍 Jubilee Hills, Hyderabad · Bandra, Mumbai</div>
          </div>
        </div>

        <form
          onSubmit={submit}
          data-testid="booking-form"
          className="bg-white rounded-3xl p-6 sm:p-8 border border-black/5 shadow-[0_20px_60px_-30px_rgba(31,27,22,0.25)]"
        >
          <div className="grid gap-5">
            <div>
              <Label htmlFor="name" className="text-xs uppercase tracking-widest text-[var(--ink-soft)]">Your name</Label>
              <Input
                id="name"
                data-testid="booking-name"
                value={form.name}
                onChange={(e) => onChange("name", e.target.value)}
                placeholder="Arjun Sharma"
                className="mt-2 h-12 rounded-xl border-black/10 focus-visible:ring-[var(--terracotta)]"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email" className="text-xs uppercase tracking-widest text-[var(--ink-soft)]">Email</Label>
                <Input
                  id="email"
                  type="email"
                  data-testid="booking-email"
                  value={form.email}
                  onChange={(e) => onChange("email", e.target.value)}
                  placeholder="you@somewhere.com"
                  className="mt-2 h-12 rounded-xl border-black/10 focus-visible:ring-[var(--terracotta)]"
                />
              </div>
              <div>
                <Label htmlFor="phone" className="text-xs uppercase tracking-widest text-[var(--ink-soft)]">Phone</Label>
                <Input
                  id="phone"
                  data-testid="booking-phone"
                  value={form.phone}
                  onChange={(e) => onChange("phone", e.target.value)}
                  placeholder="+91 ..."
                  className="mt-2 h-12 rounded-xl border-black/10 focus-visible:ring-[var(--terracotta)]"
                />
              </div>
            </div>

            <div>
              <Label className="text-xs uppercase tracking-widest text-[var(--ink-soft)]">I'm dreaming of...</Label>
              <Select value={form.trip_interest} onValueChange={(v) => onChange("trip_interest", v)}>
                <SelectTrigger
                  data-testid="booking-interest"
                  className="mt-2 h-12 rounded-xl border-black/10 focus:ring-[var(--terracotta)]"
                >
                  <SelectValue placeholder="Choose a vibe" />
                </SelectTrigger>
                <SelectContent>
                  {interests.map((i) => (
                    <SelectItem key={i} value={i} data-testid={`interest-${i.toLowerCase().replace(/[\s/]+/g,'-')}`}>
                      {i}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="message" className="text-xs uppercase tracking-widest text-[var(--ink-soft)]">Tell us more (optional)</Label>
              <Textarea
                id="message"
                data-testid="booking-message"
                value={form.message}
                onChange={(e) => onChange("message", e.target.value)}
                placeholder="Dates, group size, anything you'd like us to know..."
                className="mt-2 min-h-[110px] rounded-xl border-black/10 focus-visible:ring-[var(--terracotta)]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              data-testid="booking-submit"
              className="mt-2 inline-flex items-center justify-center gap-2 h-12 rounded-full bg-[var(--ink)] hover:bg-[var(--terracotta)] text-white font-medium transition-colors disabled:opacity-70"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
              {loading ? "Sending..." : "Plan my escape"}
            </button>
            <p className="text-xs text-[var(--ink-soft)] text-center">
              A human replies. Usually with too many emojis.
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
