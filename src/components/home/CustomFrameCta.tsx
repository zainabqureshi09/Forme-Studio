import { useState } from "react";
import { Upload, ArrowRight } from "lucide-react";
import { ASSETS, FRAME_FINISHES } from "@/src/data/catalog";
import type { FrameFinishId } from "@/src/types/ecommerce";
import { FramedArtworkPreview } from "@/src/components/ui/FramedArtworkPreview";
import { MagneticButton } from "@/src/components/ui/MagneticButton";
import { SectionLabel } from "@/src/components/ui/SectionLabel";
import { cn } from "@/src/lib/utils";

export function CustomFrameCta() {
  const [finishId, setFinishId] = useState<FrameFinishId>("brushed-brass");

  return (
    <section className="py-[var(--spacing-section)] bg-charcoal text-ivory">
      <div className="editorial-container grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6">
          <SectionLabel
            index="05"
            label="Custom Frame Creation"
            className="text-ivory/65"
          />
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal mt-4 leading-[1.04]">
            Preview your own photograph{" "}
            <span className="italic text-terracotta">on our walls.</span>
          </h2>
          <p className="mt-6 text-base text-ivory/75 leading-relaxed max-w-lg">
            Upload any digital photograph or 35mm film scan inside our
            interactive studio. Test solid hardwood mouldings, 8-ply museum
            cotton mats, and wall plaster tones before we build your piece to
            order.
          </p>

          <div className="mt-8">
            <p className="text-[10px] uppercase tracking-[0.22em] text-ivory/55 mb-3">
              Test Timber &amp; Brass Finish
            </p>
            <div className="flex flex-wrap gap-2.5">
              {FRAME_FINISHES.map((finish) => (
                <button
                  key={finish.id}
                  type="button"
                  onClick={() => setFinishId(finish.id)}
                  className={cn(
                    "inline-flex items-center gap-2.5 px-3.5 py-2 text-xs border transition-colors cursor-pointer whitespace-nowrap",
                    finishId === finish.id
                      ? "border-terracotta bg-ivory/10 text-ivory"
                      : "border-ivory/20 text-ivory/70 hover:border-ivory/50"
                  )}
                >
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: finish.hex }}
                  />
                  <span>{finish.name.split(" ").slice(-1)[0]}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10">
            <MagneticButton href="/studio" variant="terracotta">
              <Upload className="w-4 h-4" strokeWidth={1.35} />
              <span>Create Your Frame</span>
              <ArrowRight className="w-4 h-4" strokeWidth={1.35} />
            </MagneticButton>
          </div>
        </div>

        <div className="lg:col-span-6">
          <FramedArtworkPreview
            imageUrl={ASSETS.marrakechLight}
            alt="Custom Frame Studio Interactive Preview"
            finishId={finishId}
            matId="warm-cotton"
            glazingId="museum-anti-reflective"
            aspectClass="aspect-[3/4]"
            wallBackdrop="limestone"
          />
        </div>
      </div>
    </section>
  );
}
