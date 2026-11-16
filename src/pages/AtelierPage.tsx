import { ASSETS } from "@/src/data/catalog";
import { SectionLabel } from "@/src/components/ui/SectionLabel";
import { EditorialImage } from "@/src/components/ui/EditorialImage";
import { MagneticButton } from "@/src/components/ui/MagneticButton";

export function AtelierPage() {
  return (
    <div className="pb-24">
      <section className="editorial-container pt-16 pb-20 hairline-b">
        <SectionLabel index="ATELIER" label="Craft & Provenance" />
        <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-normal mt-4 max-w-4xl leading-[0.96]">
          We treat every personal photograph with{" "}
          <span className="italic text-terracotta">museum reverence.</span>
        </h1>
        <p className="mt-6 text-base sm:text-lg text-charcoal/70 max-w-2xl leading-relaxed">
          Founded in 2019 in SoHo, Forme Studio bridges architectural interior
          millwork with institutional archival conservation.
        </p>
      </section>

      <section className="editorial-container py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 aspect-[4/5] bg-beige overflow-hidden">
          <EditorialImage
            src={ASSETS.atelierCraft}
            alt="Solid timber workshop and spline-mitered corners"
          />
        </div>
        <div className="lg:col-span-6 space-y-8">
          <div>
            <p className="text-[10px] uppercase tracking-[0.22em] text-olive">
              01 · Timber Selection
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl mt-2">
              Zero MDF. Zero plastic veneers.
            </h2>
            <p className="text-sm text-charcoal/70 mt-3 leading-relaxed">
              Every profile begins as kiln-dried Appalachian walnut, quarter-sawn
              European oak, or hard Nordic maple. Corners are spline-mitered
              and hand-sanded to 320 grit before receiving three coats of matte
              tung oil.
            </p>
          </div>

          <div className="pt-8 hairline-t">
            <p className="text-[10px] uppercase tracking-[0.22em] text-olive">
              02 · Archival Chemistry
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl mt-2">
              Acid-free down to the hinging tape.
            </h2>
            <p className="text-sm text-charcoal/70 mt-3 leading-relaxed">
              Acidic backing boards yellow silver-gelatin and fine art papers
              within years. We mount solely with reversible Japanese mulberry
              paper hinges, 8-ply 100% cotton rag mats, and calcium-carbonate
              buffered backing.
            </p>
          </div>

          <div className="pt-4">
            <MagneticButton href="/studio" variant="dark">
              Commission a Custom Frame
            </MagneticButton>
          </div>
        </div>
      </section>
    </div>
  );
}
