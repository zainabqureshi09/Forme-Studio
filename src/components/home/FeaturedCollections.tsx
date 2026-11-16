import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperInstance } from "swiper";
import "swiper/css";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { ASSETS } from "@/src/data/catalog";
import { SectionLabel } from "@/src/components/ui/SectionLabel";
import { EditorialImage } from "@/src/components/ui/EditorialImage";
import { AppLink } from "@/src/components/ui/AppLink";

const FEATURED_COLLECTIONS = [
  {
    index: "01",
    title: "The Timber Archive",
    subtitle: "Hand-rubbed Appalachian walnut, fumed oak & bleached maple",
    href: "/collections?category=custom-frames",
    image: ASSETS.atelierCraft,
    meta: "Custom Frames · 18 Profiles",
  },
  {
    index: "02",
    title: "Belgian Linen Floats",
    subtitle: "Deckled archival papers elevated over unbleached Flemish flax",
    href: "/collections?category=floating-frames",
    image: ASSETS.botanicalLinen,
    meta: "Signature Mount · 3mm Float",
  },
  {
    index: "03",
    title: "Collector Editions",
    subtitle: "Numbered fine art prints on 310gsm Hahnemühle Cotton Rag",
    href: "/collections?category=fine-art-prints",
    image: ASSETS.limestoneSolstice,
    meta: "Limited Prints · Archival Pigment",
  },
  {
    index: "04",
    title: "Salon Wall Suites",
    subtitle: "Coordinated diptych & triptych sets with 1:1 hanging templates",
    href: "/collections?category=gallery-sets",
    image: ASSETS.salonLookbook,
    meta: "Gallery Sets · Ready to Hang",
  },
];

export function FeaturedCollections() {
  const swiperRef = useRef<SwiperInstance | null>(null);

  return (
    <section
      id="collections"
      className="py-[var(--spacing-section)] hairline-b bg-ivory"
    >
      <div className="editorial-container">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <SectionLabel index="01" label="Featured Collections" />
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal mt-4 leading-[1.02]">
              Architectures for{" "}
              <span className="italic text-olive">meaningful walls.</span>
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => swiperRef.current?.slidePrev()}
              aria-label="Previous collection"
              className="w-11 h-11 hairline-all flex items-center justify-center hover:bg-charcoal hover:text-ivory transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" strokeWidth={1.35} />
            </button>
            <button
              type="button"
              onClick={() => swiperRef.current?.slideNext()}
              aria-label="Next collection"
              className="w-11 h-11 hairline-all flex items-center justify-center hover:bg-charcoal hover:text-ivory transition-colors cursor-pointer"
            >
              <ArrowRight className="w-4 h-4" strokeWidth={1.35} />
            </button>
          </div>
        </div>

        <Swiper
          className="forme-swiper"
          modules={[Navigation]}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          spaceBetween={24}
          slidesPerView={1.12}
          breakpoints={{
            640: { slidesPerView: 2.1, spaceBetween: 24 },
            1024: { slidesPerView: 3.15, spaceBetween: 28 },
          }}
        >
          {FEATURED_COLLECTIONS.map((col) => (
            <SwiperSlide key={col.index}>
              <AppLink href={col.href} className="group block">
                <div className="relative aspect-[4/5] bg-beige overflow-hidden">
                  <EditorialImage
                    src={col.image}
                    alt={col.title}
                    className="group-hover:scale-[1.04]"
                  />
                </div>

                <div className="mt-5 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.2em] text-terracotta">
                      {col.index} · {col.meta}
                    </p>
                    <h3 className="font-serif text-2xl sm:text-[26px] mt-1 group-hover:text-terracotta transition-colors">
                      {col.title}
                    </h3>
                    <p className="text-xs text-charcoal/65 mt-1.5 leading-relaxed max-w-xs">
                      {col.subtitle}
                    </p>
                  </div>
                  <ArrowUpRight
                    className="w-4 h-4 text-charcoal/45 group-hover:text-terracotta group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all mt-2 shrink-0"
                    strokeWidth={1.35}
                  />
                </div>
              </AppLink>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
