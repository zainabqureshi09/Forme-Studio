import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Camera } from "lucide-react";
import { VISUAL_JOURNAL_GALLERY } from "@/src/data/catalog";
import { SectionLabel } from "@/src/components/ui/SectionLabel";
import { EditorialImage } from "@/src/components/ui/EditorialImage";
import { AppLink } from "@/src/components/ui/AppLink";
import { cn } from "@/src/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export function VisualJournalGallery() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".journal-tile", {
        y: 28,
        opacity: 0,
        duration: 0.85,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 78%",
        },
      });
    }, gridRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="py-[var(--spacing-section)] bg-ivory">
      <div className="editorial-container">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <SectionLabel index="07" label="Visual Journal · @formestudio.ny" />
            <h2 className="font-serif text-4xl sm:text-5xl font-normal mt-4 leading-[1.04]">
              Inside private residences{" "}
              <span className="italic text-terracotta">&amp; studios.</span>
            </h2>
          </div>

          <AppLink
            href="/studio"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-charcoal hover:text-terracotta transition-colors whitespace-nowrap"
          >
            <Camera className="w-4 h-4" strokeWidth={1.35} />
            <span>Frame Your Own Story</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </AppLink>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-5 md:auto-rows-[250px]"
        >
          {VISUAL_JOURNAL_GALLERY.map((post) => (
            <AppLink
              key={post.id}
              href={post.href}
              className={cn(
                "journal-tile group relative overflow-hidden bg-beige min-h-[260px] md:min-h-0",
                post.spanClass
              )}
            >
              <EditorialImage
                src={post.image}
                alt={post.caption}
                className="group-hover:scale-[1.04]"
              />

              {/* Measured Contrast Scrim for Text Legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col justify-end p-6">
                <p className="text-[10px] uppercase tracking-[0.2em] text-beige">
                  {post.frameSpec}
                </p>
                <p className="font-serif text-xl text-ivory mt-1 leading-snug">
                  {post.caption}
                </p>
                <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-terracotta mt-3">
                  <span>View Specification</span>
                  <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>
            </AppLink>
          ))}
        </div>
      </div>
    </section>
  );
}
