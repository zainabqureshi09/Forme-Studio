import { FRAME_FINISHES, MAT_OPTIONS } from "@/src/data/catalog";
import type {
  FrameFinishId,
  GlazingId,
  MatOptionId,
} from "@/src/types/ecommerce";
import { cn } from "@/src/lib/utils";
import { EditorialImage } from "./EditorialImage";

interface FramedArtworkPreviewProps {
  imageUrl: string;
  alt: string;
  finishId: FrameFinishId;
  matId: MatOptionId;
  glazingId: GlazingId;
  aspectClass?: string;
  wallBackdrop?: "plaster" | "limestone" | "charcoal";
  className?: string;
}

const BACKDROP_STYLES = {
  plaster: "bg-[#EFECE4]",
  limestone: "bg-[#DFD7CA]",
  charcoal: "bg-[#252422]",
};

export function FramedArtworkPreview({
  imageUrl,
  alt,
  finishId,
  matId,
  glazingId,
  aspectClass = "aspect-[4/5]",
  wallBackdrop,
  className,
}: FramedArtworkPreviewProps) {
  const finish =
    FRAME_FINISHES.find((f) => f.id === finishId) ?? FRAME_FINISHES[0];
  const mat = MAT_OPTIONS.find((m) => m.id === matId) ?? MAT_OPTIONS[0];
  const isMuseumGlass = glazingId === "museum-anti-reflective";

  const frameContent = (
    <div
      className={cn(
        "relative w-full transition-all duration-500",
        aspectClass,
        !wallBackdrop && className
      )}
      style={{
        padding: `${Math.max(9, Math.round(finish.profileWidthMm * 0.68))}px`,
        backgroundColor: finish.hex,
        boxShadow: `inset 0 1px 0 rgba(255,255,255,0.18), inset 0 -2px 4px ${finish.accentHex}, 0 24px 48px -18px rgba(25,25,25,0.34)`,
      }}
    >
      <div
        className="relative w-full h-full transition-all duration-500"
        style={{
          padding: mat.id === "none" ? "0px" : `${mat.borderPx}px`,
          backgroundColor: mat.id === "none" ? "#191919" : mat.colorHex,
          boxShadow: "inset 0 2px 6px rgba(25,25,25,0.16)",
        }}
      >
        <div
          className={cn(
            "relative w-full h-full overflow-hidden bg-beige",
            mat.id === "warm-cotton" &&
              "ring-1 ring-inset ring-charcoal/15 shadow-[0_1px_2px_rgba(0,0,0,0.08)]",
            mat.id === "linen-float" &&
              "shadow-[0_10px_20px_rgba(25,25,25,0.22)]"
          )}
        >
          <EditorialImage src={imageUrl} alt={alt} />

          {!isMuseumGlass && (
            <div
              className="pointer-events-none absolute inset-0 opacity-25"
              style={{
                background:
                  "linear-gradient(125deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 42%)",
              }}
            />
          )}
        </div>
      </div>
    </div>
  );

  if (!wallBackdrop) return frameContent;

  return (
    <div
      className={cn(
        "relative w-full p-8 sm:p-14 lg:p-16 flex items-center justify-center transition-colors duration-500",
        BACKDROP_STYLES[wallBackdrop],
        className
      )}
    >
      <div className="w-full max-w-[410px]">{frameContent}</div>
    </div>
  );
}
