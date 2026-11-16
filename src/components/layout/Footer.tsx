import { useState, type FormEvent } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { AppLink } from "@/src/components/ui/AppLink";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="bg-charcoal text-ivory pt-20 pb-10">
      <div className="editorial-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-ivory/15">
          <div className="lg:col-span-5">
            <p className="text-[10px] uppercase tracking-[0.26em] text-terracotta">
              Private Atelier Dispatch
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl font-normal leading-[1.08] mt-3">
              Preserving light, paper, <br />
              <span className="italic text-beige">and quiet permanence.</span>
            </h2>
            <p className="text-sm text-ivory/70 mt-5 max-w-md leading-relaxed">
              Receive seasonal timber releases, museum print collaborations, and
              private studio invitations.
            </p>

            <form onSubmit={handleSubmit} className="mt-7 max-w-md">
              {subscribed ? (
                <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-terracotta py-3">
                  <Check className="w-4 h-4" />
                  <span>Welcome to the Forme Journal.</span>
                </div>
              ) : (
                <div className="flex border-b border-ivory/30 focus-within:border-terracotta transition-colors">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    aria-label="Email address for atelier newsletter"
                    className="w-full bg-transparent py-3 text-sm text-ivory placeholder:text-ivory/45 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1 text-xs uppercase tracking-[0.2em] text-ivory hover:text-terracotta transition-colors pl-4 cursor-pointer whitespace-nowrap"
                  >
                    <span>Join</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </form>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-10 lg:pl-12">
            <div>
              <h3 className="text-[10px] uppercase tracking-[0.22em] text-ivory/50 mb-5">
                Catalogue
              </h3>
              <ul className="space-y-3 text-sm text-ivory/80">
                <li>
                  <AppLink
                    href="/collections?category=custom-frames"
                    className="hover:text-terracotta transition-colors"
                  >
                    Custom Timber Frames
                  </AppLink>
                </li>
                <li>
                  <AppLink
                    href="/collections?category=floating-frames"
                    className="hover:text-terracotta transition-colors"
                  >
                    Belgian Linen Floats
                  </AppLink>
                </li>
                <li>
                  <AppLink
                    href="/collections?category=fine-art-prints"
                    className="hover:text-terracotta transition-colors"
                  >
                    Archival Editions
                  </AppLink>
                </li>
                <li>
                  <AppLink
                    href="/collections?category=gallery-sets"
                    className="hover:text-terracotta transition-colors"
                  >
                    Salon Wall Sets
                  </AppLink>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-[10px] uppercase tracking-[0.22em] text-ivory/50 mb-5">
                Bespoke Services
              </h3>
              <ul className="space-y-3 text-sm text-ivory/80">
                <li>
                  <AppLink
                    href="/studio"
                    className="hover:text-terracotta transition-colors"
                  >
                    Interactive Frame Studio
                  </AppLink>
                </li>
                <li>
                  <AppLink
                    href="/#gallery-wall"
                    className="hover:text-terracotta transition-colors"
                  >
                    Gallery Wall Designer
                  </AppLink>
                </li>
                <li>
                  <AppLink
                    href="/atelier"
                    className="hover:text-terracotta transition-colors"
                  >
                    Conservation Glazing
                  </AppLink>
                </li>
                <li>
                  <AppLink
                    href="/checkout"
                    className="hover:text-terracotta transition-colors"
                  >
                    White-Glove Crating
                  </AppLink>
                </li>
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <h3 className="text-[10px] uppercase tracking-[0.22em] text-ivory/50 mb-5">
                Showroom Atelier
              </h3>
              <p className="text-sm text-ivory/80 leading-relaxed">
                48 Crosby Street, Loft 3B
                <br />
                SoHo, New York 10012
              </p>
              <p className="text-xs text-ivory/55 mt-4 leading-relaxed">
                Tue – Sat · 11:00 – 18:00
                <br />
                atelier@formestudio.co
              </p>
            </div>
          </div>
        </div>

        <div className="pt-12 pb-4 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
          <p className="font-serif text-[clamp(2.5rem,7.5vw,6.8rem)] leading-[0.86] tracking-[-0.02em] text-ivory/95 select-none">
            FORME STUDIO
          </p>
          <div className="text-[11px] uppercase tracking-[0.2em] text-ivory/55 sm:text-right">
            <p>Your Memories. Our Canvas.</p>
            <p className="mt-1">© {new Date().getFullYear()} Forme Studio LLC</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
