import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, Layers, Plus } from "lucide-react";
import { FRAME_FINISHES, GALLERY_WALL_PRESETS } from "@/src/data/catalog";
import type { FrameFinishId } from "@/src/types/ecommerce";
import { cn, formatCurrency } from "@/src/lib/utils";
import { SectionLabel } from "@/src/components/ui/SectionLabel";
import { FramedArtworkPreview } from "@/src/components/ui/FramedArtworkPreview";
import { useCart } from "@/src/context/CartContext";
import { EDITORIAL_EASE } from "@/src/lib/motion";

const WALL_SURFACES = [
  { id: "plaster", label: "Warm Plaster", bg: "#EFECE4", dark: false },
  { id: "limestone", label: "Limestone", bg: "#DDD4C6", dark: false },
  { id: "charcoal", label: "Gallery Dark", bg: "#242321", dark: true },
] as const;

export function GalleryWallShowcase() {
  const { addItem } = useCart();

  const [presetId, setPresetId] = useState(GALLERY_WALL_PRESETS[0].id);
  const [finishId, setFinishId] = useState<FrameFinishId>("natural-walnut");
  const [wallId, setWallId] = useState<"plaster" | "limestone" | "charcoal">(
    "plaster"
  );
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [commissioned, setCommissioned] = useState(false);

  const preset =
    GALLERY_WALL_PRESETS.find((p) => p.id === presetId) ??
    GALLERY_WALL_PRESETS[0];
  const wall =
    WALL_SURFACES.find((w) => w.id === wallId) ?? WALL_SURFACES[0];
  const finish =
    FRAME_FINISHES.find((f) => f.id === finishId) ?? FRAME_FINISHES[0];

  const handleCommissionWall = () => {
    addItem({
      productId: `wall-set-${preset.id}`,
      slug: "collections",
      title: `${preset.name} (${preset.frames.length}-Piece Suite)`,
      isBespoke: false,
      unitPrice: preset.totalPrice,
      thumbnail: preset.frames[0].imageUrl,
      config: {
        finishId,
        sizeId: preset.frames[0].size,
        matId: preset.frames[0].matId,
        glazingId: "museum-anti-reflective",
      },
    });
    setCommissioned(true);
    setTimeout(() => setCommissioned(false), 1800);
  };

  return (
    <section
      id="gallery-wall"
      className="py-[var(--spacing-section)] bg-beige/45 hairline-b"
    >
      <div className="editorial-container">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div className="max-w-2xl">
            <SectionLabel index="04" label="Interactive Gallery Wall Showcase" />
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal mt-4 leading-[1.02]">
              Compose your wall{" "}
              <span className="italic text-terracotta">in real proportion.</span>
            </h2>
            <p className="mt-4 text-sm sm:text-base text-charcoal/70 max-w-xl leading-relaxed">
              Toggle curated architectural arrangements, wall plaster tones, and
              solid-hardwood mouldings to preview how our frames harmonize before
              ordering.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {GALLERY_WALL_PRESETS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setPresetId(item.id)}
                className={cn(
                  "px-4 py-2.5 text-[11px] uppercase tracking-[0.18em] transition-colors cursor-pointer whitespace-nowrap",
                  presetId === item.id
                    ? "bg-charcoal text-ivory"
                    : "bg-ivory border border-charcoal/18 text-charcoal/75 hover:border-charcoal"
                )}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Interactive Architectural Wall Stage */}
          <div
            className="lg:col-span-8 relative p-8 sm:p-12 lg:p-16 flex flex-col justify-between min-h-[460px] sm:min-h-[540px] transition-colors duration-500 hairline-all"
            style={{ backgroundColor: wall.bg }}
          >
            <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.22em]">
              <span className={wall.dark ? "text-ivory/60" : "text-charcoal/55"}>
                {preset.arrangement.toUpperCase()} COMPOSITION ·{" "}
                {finish.name.toUpperCase()}
              </span>
              <span
                className={cn(
                  "tabular-nums",
                  wall.dark ? "text-ivory/60" : "text-charcoal/55"
                )}
              >
                {preset.frames.length} Framed Works
              </span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={preset.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.45, ease: EDITORIAL_EASE }}
                className={cn(
                  "my-auto py-8 grid items-center gap-5 sm:gap-7",
                  preset.arrangement === "trio" &&
                    "grid-cols-1 sm:grid-cols-12",
                  preset.arrangement === "diptych" &&
                    "grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto w-full",
                  preset.arrangement === "quartet" &&
                    "grid-cols-2 sm:grid-cols-4 max-w-4xl mx-auto w-full"
                )}
              >
                {preset.frames.map((frame, idx) => {
                  const trioSpan =
                    preset.arrangement === "trio"
                      ? idx === 0
                        ? "sm:col-span-5"
                        : idx === 1
                          ? "sm:col-span-4 sm:mt-8"
                          : "sm:col-span-3 sm:-mt-6"
                      : "";

                  return (
                    <div
                      key={`${preset.id}-${idx}`}
                      onMouseEnter={() => setHoveredIdx(idx)}
                      onMouseLeave={() => setHoveredIdx(null)}
                      className={cn(
                        "relative group transition-transform duration-500 hover:-translate-y-1",
                        trioSpan
                      )}
                    >
                      <FramedArtworkPreview
                        imageUrl={frame.imageUrl}
                        alt={frame.title}
                        finishId={finishId}
                        matId={frame.matId}
                        glazingId="museum-anti-reflective"
                        aspectClass={frame.aspectClass}
                      />

                      <div
                        className={cn(
                          "mt-2.5 transition-opacity duration-300 text-center",
                          hoveredIdx === idx ? "opacity-100" : "opacity-80"
                        )}
                      >
                        <p
                          className={cn(
                            "font-serif text-sm",
                            wall.dark ? "text-ivory" : "text-charcoal"
                          )}
                        >
                          {frame.title}
                        </p>
                        <p
                          className={cn(
                            "text-[10px] uppercase tracking-[0.16em] tabular-nums",
                            wall.dark ? "text-ivory/55" : "text-charcoal/55"
                          )}
                        >
                          {frame.artist} · {frame.size.replace("x", "×")}″
                        </p>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            </AnimatePresence>

            {/* Architectural Console Credenza Anchor Line */}
            <div
              aria-hidden="true"
              className={cn(
                "w-3/4 mx-auto h-[1px] transition-colors",
                wall.dark ? "bg-ivory/20" : "bg-charcoal/20"
              )}
            />
          </div>

          {/* Wall Controls & Suite Commissioning Panel */}
          <div className="lg:col-span-4 bg-ivory p-7 sm:p-9 hairline-all flex flex-col justify-between space-y-8">
            <div className="space-y-7">
              <div>
                <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-olive">
                  <Layers className="w-3.5 h-3.5 text-terracotta" />
                  <span>Curated Suite Details</span>
                </div>
                <h3 className="font-serif text-3xl mt-2">{preset.name}</h3>
                <p className="text-xs text-charcoal/65 mt-2 leading-relaxed">
                  {preset.subtitle}
                </p>
              </div>

              {/* Wall Finish Switcher */}
              <div className="pt-5 hairline-t">
                <span className="block text-[10px] uppercase tracking-[0.22em] text-charcoal/60 mb-3">
                  1. Wall Surface Tone
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {WALL_SURFACES.map((surface) => (
                    <button
                      key={surface.id}
                      type="button"
                      onClick={() => setWallId(surface.id)}
                      className={cn(
                        "px-2.5 py-2.5 border text-left transition-colors cursor-pointer",
                        wallId === surface.id
                          ? "border-charcoal bg-beige/65"
                          : "border-charcoal/15 hover:border-charcoal/40"
                      )}
                    >
                      <span
                        className="block w-4 h-4 rounded-full border border-charcoal/20 mb-1.5"
                        style={{ backgroundColor: surface.bg }}
                      />
                      <span className="block text-[11px] font-medium truncate">
                        {surface.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Frame Timber Switcher */}
              <div className="pt-5 hairline-t">
                <div className="flex justify-between items-baseline mb-3">
                  <span className="text-[10px] uppercase tracking-[0.22em] text-charcoal/60">
                    2. Moulding Finish
                  </span>
                  <span className="text-xs text-charcoal/75">
                    {finish.name}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {FRAME_FINISHES.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setFinishId(item.id)}
                      title={item.name}
                      aria-label={`Select ${item.name}`}
                      className={cn(
                        "w-8 h-8 rounded-full border border-charcoal/20 transition-transform cursor-pointer",
                        finishId === item.id
                          ? "ring-2 ring-offset-2 ring-offset-ivory ring-charcoal scale-105"
                          : "opacity-80 hover:opacity-100"
                      )}
                      style={{ backgroundColor: item.hex }}
                    />
                  ))}
                </div>
              </div>

              {/* Included Pieces Breakdown */}
              <div className="pt-5 hairline-t">
                <span className="block text-[10px] uppercase tracking-[0.22em] text-charcoal/60 mb-2.5">
                  Included In Suite
                </span>
                <ul className="space-y-1.5 text-xs text-charcoal/75">
                  {preset.frames.map((f, i) => (
                    <li key={i} className="flex justify-between">
                      <span>{f.title}</span>
                      <span className="tabular-nums text-charcoal/55">
                        {f.size.replace("x", "×")}″
                      </span>
                    </li>
                  ))}
                  <li className="flex justify-between text-olive pt-1">
                    <span>1:1 Kraft Wall Hanging Guide</span>
                    <span>Included</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-5 hairline-t">
              <div className="flex items-baseline justify-between mb-4">
                <span className="text-xs uppercase tracking-[0.2em] text-charcoal/60">
                  Complete Suite
                </span>
                <span className="font-serif text-3xl tabular-nums">
                  {formatCurrency(preset.totalPrice)}
                </span>
              </div>

              <button
                type="button"
                onClick={handleCommissionWall}
                className="w-full py-4 bg-charcoal hover:bg-terracotta text-ivory text-[11px] uppercase tracking-[0.22em] transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                {commissioned ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Suite Added to Bag</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    <span>Commission This Wall Set</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
