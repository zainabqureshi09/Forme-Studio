import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ArrowDown, Sparkles } from "lucide-react";
import { ASSETS } from "@/src/data/catalog";
import { MagneticButton } from "@/src/components/ui/MagneticButton";
import { FramedArtworkPreview } from "@/src/components/ui/FramedArtworkPreview";
import { EditorialImage } from "@/src/components/ui/EditorialImage";
import { AppLink } from "@/src/components/ui/AppLink";
import { EDITORIAL_EASE } from "@/src/lib/motion";

gsap.registerPlugin(ScrollTrigger);

const HEADLINE_LINES = [
  [
    { text: "MAKE", italic: false },
    { text: "YOUR", italic: false },
    { text: "WALLS", italic: true },
  ],
  [
    { text: "TELL", italic: true },
    { text: "STORIES.", italic: false },
  ],
];

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const backdropRevealRef = useRef<HTMLDivElement>(null);
  const leftFrameRef = useRef<HTMLDivElement>(null);
  const rightFrameRef = useRef<HTMLDivElement>(null);
  const decoTypeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReduced) return;

      // Custom SplitText-style masked word reveal
      gsap.from(".hero-split-word", {
        yPercent: 118,
        rotate: 1.5,
        opacity: 0,
        duration: 1.0,
        stagger: 0.07,
        ease: "power4.out",
        delay: 0.08,
      });

      // Smooth clip-path interior photography reveal
      if (backdropRevealRef.current) {
        gsap.fromTo(
          backdropRevealRef.current,
          { clipPath: "inset(100% 0% 0% 0%)", scale: 1.06 },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            scale: 1,
            duration: 1.3,
            ease: "power3.inOut",
            delay: 0.12,
          }
        );
      }

      // Layered gallery frames entrance
      gsap.from(".hero-layered-frame", {
        y: 42,
        opacity: 0,
        duration: 1.05,
        stagger: 0.16,
        ease: "power3.out",
        delay: 0.42,
      });

      // Animated circular decorative typography seal
      if (decoTypeRef.current) {
        gsap.to(decoTypeRef.current, {
          rotation: 360,
          duration: 30,
          repeat: -1,
          ease: "none",
        });
      }

      // Scroll-based layered parallax
      if (backdropRevealRef.current) {
        gsap.to(backdropRevealRef.current, {
          yPercent: 9,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.9,
          },
        });
      }

      if (leftFrameRef.current) {
        gsap.to(leftFrameRef.current, {
          y: -52,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.7,
          },
        });
      }

      if (rightFrameRef.current) {
        gsap.to(rightFrameRef.current, {
          y: -88,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.1,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[calc(100svh-5rem)] flex flex-col justify-between overflow-hidden paper-grain hairline-b"
    >
      <div className="editorial-container flex-1 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center py-8 lg:py-12">
        {/* Left Editorial Typography Column */}
        <div className="lg:col-span-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EDITORIAL_EASE }}
            className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.24em] text-olive mb-6"
          >
            <span>Architectural Framing Atelier</span>
            <span aria-hidden="true">·</span>
            <span>Your Memories. Our Canvas.</span>
          </motion.div>

          <h1
            aria-label="MAKE YOUR WALLS TELL STORIES."
            className="font-serif text-[clamp(3.15rem,6.4vw,6.15rem)] leading-[0.9] tracking-[-0.025em] text-charcoal font-normal"
          >
            {HEADLINE_LINES.map((line, lineIdx) => (
              <span
                key={lineIdx}
                className={
                  lineIdx === 1
                    ? "block sm:pl-10 lg:pl-14 mt-1"
                    : "block"
                }
              >
                {line.map((word, wordIdx) => (
                  <span
                    key={wordIdx}
                    className="inline-block overflow-hidden align-bottom mr-[0.22em] pb-[0.06em]"
                  >
                    <span
                      className={`hero-split-word inline-block ${
                        word.italic ? "italic text-terracotta" : ""
                      }`}
                    >
                      {word.text}
                    </span>
                  </span>
                ))}
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.4, ease: EDITORIAL_EASE }}
            className="mt-7 max-w-md text-base sm:text-[17px] leading-[1.7] text-charcoal/75 font-light"
          >
            Thoughtfully designed frames for the moments that matter.
            Hand-milled in solid walnut, smoked European oak, and museum-grade
            Optium® glazing.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.52, ease: EDITORIAL_EASE }}
            className="mt-9 flex flex-wrap items-center gap-4 sm:gap-5"
          >
            <MagneticButton href="/collections" variant="dark">
              <span>Explore Collection</span>
              <ArrowRight className="w-4 h-4" strokeWidth={1.35} />
            </MagneticButton>

            <AppLink
              href="/studio"
              className="inline-flex items-center justify-center gap-2.5 px-7 py-4 border border-charcoal/30 text-[11px] uppercase tracking-[0.22em] text-charcoal hover:border-terracotta hover:text-terracotta transition-colors whitespace-nowrap shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5" strokeWidth={1.4} />
              <span>Create Your Frame</span>
            </AppLink>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.68 }}
            className="mt-12 pt-6 hairline-t grid grid-cols-3 gap-6 max-w-lg"
          >
            <div>
              <p className="font-serif text-2xl sm:text-[26px] tabular-nums">
                18
              </p>
              <p className="text-[11px] uppercase tracking-[0.16em] text-charcoal/55 mt-1">
                Hardwood Profiles
              </p>
            </div>
            <div>
              <p className="font-serif text-2xl sm:text-[26px] tabular-nums">
                99.7%
              </p>
              <p className="text-[11px] uppercase tracking-[0.16em] text-charcoal/55 mt-1">
                UV Museum Glazing
              </p>
            </div>
            <div>
              <p className="font-serif text-2xl sm:text-[26px]">SoHo</p>
              <p className="text-[11px] uppercase tracking-[0.16em] text-charcoal/55 mt-1">
                Bespoke Millwork
              </p>
            </div>
          </motion.div>
        </div>

        {/* Right Contemporary Interior + Layered Gallery Wall Composition */}
        <div className="lg:col-span-6 relative h-[460px] sm:h-[560px] lg:h-[620px] flex items-center justify-center">
          {/* Animated Circular Decorative Typography Seal */}
          <div
            ref={decoTypeRef}
            aria-hidden="true"
            className="hidden sm:flex absolute -top-2 right-2 lg:right-0 z-20 w-28 h-28 items-center justify-center pointer-events-none"
          >
            <svg viewBox="0 0 120 120" className="w-full h-full">
              <defs>
                <path
                  id="hero-seal-path"
                  d="M 60, 60 m -44, 0 a 44,44 0 1,1 88,0 a 44,44 0 1,1 -88,0"
                />
              </defs>
              <text className="fill-charcoal/65 text-[8.3px] uppercase tracking-[0.26em] font-sans">
                <textPath href="#hero-seal-path">
                  FORME STUDIO · YOUR MEMORIES · OUR CANVAS ·
                </textPath>
              </text>
            </svg>
          </div>

          {/* Main Contemporary Interior Photograph (Clip-Path Reveal) */}
          <div
            ref={backdropRevealRef}
            className="relative w-[86%] sm:w-[80%] h-[82%] bg-beige overflow-hidden shadow-[0_30px_70px_-24px_rgba(25,25,25,0.24)]"
          >
            <EditorialImage
              src={ASSETS.heroLivingRoom}
              alt="Sunlit contemporary living room with walnut and brass gallery wall"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/20 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Layered Frame 01 — Bottom-Left Smoked Oak Study */}
          <div
            ref={leftFrameRef}
            className="hero-layered-frame absolute -bottom-2 left-0 sm:left-2 w-[42%] max-w-[225px] z-20"
          >
            <FramedArtworkPreview
              imageUrl={ASSETS.limestoneSolstice}
              alt="Solstice Colonnade in Smoked European Oak"
              finishId="smoked-oak"
              matId="warm-cotton"
              glazingId="museum-anti-reflective"
              aspectClass="aspect-[3/4]"
            />
          </div>

          {/* Layered Frame 02 — Top-Right Brushed Brass Composition */}
          <div
            ref={rightFrameRef}
            className="hero-layered-frame absolute top-8 right-0 sm:right-2 w-[36%] max-w-[195px] z-20"
          >
            <FramedArtworkPreview
              imageUrl={ASSETS.marrakechLight}
              alt="Courtyard Shadow Marrakech in Brushed Brass"
              finishId="brushed-brass"
              matId="linen-float"
              glazingId="museum-anti-reflective"
              aspectClass="aspect-[3/4]"
            />
          </div>
        </div>
      </div>

      {/* Bottom Editorial Scroll Cue */}
      <div className="editorial-container pb-5 pt-2 flex items-center justify-between text-[10px] uppercase tracking-[0.24em] text-charcoal/55">
        <span>Curated Living · Archival Craft</span>
        <a
          href="#collections"
          className="inline-flex items-center gap-2 hover:text-terracotta transition-colors"
        >
          <span>Scroll to Explore</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" strokeWidth={1.35} />
        </a>
      </div>
    </section>
  );
}
