import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { ASSETS } from "@/src/data/catalog";
import { SectionLabel } from "@/src/components/ui/SectionLabel";
import { EditorialImage } from "@/src/components/ui/EditorialImage";
import { AppLink } from "@/src/components/ui/AppLink";

gsap.registerPlugin(ScrollTrigger);

const PILLARS = [
  {
    number: "01",
    title: "Solid FSC-Certified Timber",
    copy: "Milled from solid Appalachian walnut, European oak, and Nordic maple—never wrapped MDF—and locked with contrasting hardwood corner splines.",
  },
  {
    number: "02",
    title: "8-Ply Acid-Free Cotton Mats",
    copy: "Deep architectural bevel cuts in warm gallery ivory or raw Belgian linen that protect film grain and cotton rag from direct glazing contact.",
  },
  {
    number: "03",
    title: "Invisible Museum Glazing",
    copy: "Optium® anti-reflective glazing filters 99.7% of harmful UV light while eliminating surface reflections across sunlit residential rooms.",
  },
];

export function EditorialStorySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (photoRef.current) {
        gsap.fromTo(
          photoRef.current,
          { clipPath: "inset(0% 0% 100% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.2,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 72%",
            },
          }
        );
      }

      gsap.from(".story-pillar", {
        y: 28,
        opacity: 0,
        duration: 0.85,
        stagger: 0.14,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".story-pillars-list",
          start: "top 78%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-[var(--spacing-section)] bg-beige/55 hairline-b"
    >
      <div className="editorial-container grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        <div className="lg:col-span-6 lg:sticky lg:top-28">
          <div className="relative bg-ivory p-5 sm:p-8 hairline-all">
            <div ref={photoRef} className="aspect-[4/5] overflow-hidden bg-beige">
              <EditorialImage
                src={ASSETS.atelierCraft}
                alt="Handcrafted walnut corner spline joinery in the SoHo framing atelier"
              />
            </div>

            <div className="mt-5 flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-charcoal/55">
              <span>SoHo Millwork Bench</span>
              <span>Archival Conservation</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 lg:pt-4">
          <SectionLabel index="02" label="Editorial Manifesto" />

          <h2 className="font-serif text-4xl sm:text-5xl lg:text-[3.75rem] font-normal mt-4 leading-[1.02]">
            Your memories <br />
            <span className="italic text-terracotta">deserve a frame.</span>
          </h2>

          <p className="mt-6 text-base text-charcoal/75 leading-[1.75] max-w-xl">
            Too many meaningful photographs remain trapped on glowing screens or
            tucked inside drawers. At Forme Studio, we translate personal
            milestones, architectural travels, and family heirlooms into tactile
            wall objects crafted to endure for generations.
          </p>

          <div className="story-pillars-list mt-11 divide-y divide-charcoal/12 border-t border-b border-charcoal/12">
            {PILLARS.map((pillar) => (
              <div key={pillar.number} className="story-pillar py-7">
                <div className="flex items-baseline gap-5">
                  <span className="font-serif italic text-2xl text-terracotta shrink-0 tabular-nums">
                    {pillar.number}
                  </span>
                  <div>
                    <h3 className="font-serif text-2xl sm:text-[26px] font-normal">
                      {pillar.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-charcoal/70">
                      {pillar.copy}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-9">
            <AppLink
              href="/atelier"
              className="inline-flex items-center gap-2.5 text-xs uppercase tracking-[0.2em] text-charcoal hover:text-terracotta transition-colors"
            >
              <span>Read Our Craftsmanship Standards</span>
              <ArrowRight className="w-4 h-4" strokeWidth={1.35} />
            </AppLink>
          </div>
        </div>
      </div>
    </section>
  );
}
