import { useRef, useState, type ChangeEvent } from "react";
import { Upload, Check, Image as ImageIcon, Sparkles } from "lucide-react";
import {
  CURATED_SAMPLE_ARTWORKS,
  FRAME_FINISHES,
  FRAME_SIZES,
  GLAZING_OPTIONS,
  MAT_OPTIONS,
} from "@/src/data/catalog";
import type {
  FrameFinishId,
  FrameSizeId,
  GlazingId,
  MatOptionId,
} from "@/src/types/ecommerce";
import {
  calculateConfiguredPrice,
  cn,
  compressUploadedImage,
  formatCurrency,
} from "@/src/lib/utils";
import { FramedArtworkPreview } from "@/src/components/ui/FramedArtworkPreview";
import { SectionLabel } from "@/src/components/ui/SectionLabel";
import { useCart } from "@/src/context/CartContext";

const BESPOKE_BASE_PRICE = 195;

export function StudioPage() {
  const { addItem } = useCart();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [imageUrl, setImageUrl] = useState<string>(
    CURATED_SAMPLE_ARTWORKS[0].url
  );
  const [customTitle, setCustomTitle] = useState("My Framed Memory");
  const [isUserUpload, setIsUserUpload] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [finishId, setFinishId] = useState<FrameFinishId>("natural-walnut");
  const [sizeId, setSizeId] = useState<FrameSizeId>("16x20");
  const [matId, setMatId] = useState<MatOptionId>("warm-cotton");
  const [glazingId, setGlazingId] = useState<GlazingId>(
    "museum-anti-reflective"
  );
  const [wallBackdrop, setWallBackdrop] = useState<
    "plaster" | "limestone" | "charcoal"
  >("plaster");
  const [added, setAdded] = useState(false);

  const selectedSize =
    FRAME_SIZES.find((s) => s.id === sizeId) ?? FRAME_SIZES[0];
  const totalPrice = calculateConfiguredPrice({
    basePrice: BESPOKE_BASE_PRICE,
    finishId,
    sizeId,
    matId,
    glazingId,
  });

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const compressedDataUrl = await compressUploadedImage(file);
      setImageUrl(compressedDataUrl);
      setIsUserUpload(true);
      const cleanName = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
      if (cleanName) setCustomTitle(cleanName);
    } finally {
      setUploading(false);
    }
  };

  const handleCommission = () => {
    addItem({
      productId: "bespoke-custom-frame",
      slug: "studio",
      title: "Bespoke Custom Frame",
      isBespoke: true,
      unitPrice: totalPrice,
      thumbnail: imageUrl,
      config: {
        finishId,
        sizeId,
        matId,
        glazingId,
        customImageUrl: imageUrl,
        customTitle: customTitle.trim() || "Bespoke Memory",
        wallBackdrop,
      },
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="editorial-container py-12 lg:py-20">
      <div className="max-w-3xl mb-12">
        <SectionLabel index="STUDIO" label="Your Memories. Our Canvas." />
        <h1 className="font-serif text-5xl sm:text-6xl font-normal mt-4 leading-[0.98]">
          The Bespoke{" "}
          <span className="italic text-terracotta">Framing Studio</span>
        </h1>
        <p className="mt-4 text-base text-charcoal/70 max-w-xl">
          Upload your photograph or select a studio study. We print on 310gsm
          Hahnemühle cotton rag, mount, and hand-build your frame to archival
          specifications.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-7 lg:sticky lg:top-28 space-y-5">
          <FramedArtworkPreview
            imageUrl={imageUrl}
            alt={customTitle}
            finishId={finishId}
            matId={matId}
            glazingId={glazingId}
            aspectClass={selectedSize.aspectClass}
            wallBackdrop={wallBackdrop}
          />

          <div className="flex flex-wrap items-center justify-between gap-4 py-4 hairline-b">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="text-[10px] uppercase tracking-[0.2em] text-charcoal/55 mr-1">
                Wall Tone
              </span>
              {(
                [
                  { id: "plaster", label: "Warm Plaster", hex: "#EFECE4" },
                  { id: "limestone", label: "Limestone", hex: "#DFD7CA" },
                  { id: "charcoal", label: "Gallery Dark", hex: "#252422" },
                ] as const
              ).map((wall) => (
                <button
                  key={wall.id}
                  type="button"
                  onClick={() => setWallBackdrop(wall.id)}
                  className={cn(
                    "inline-flex items-center gap-2 px-3 py-1.5 text-xs border transition-colors cursor-pointer",
                    wallBackdrop === wall.id
                      ? "border-charcoal bg-beige/60"
                      : "border-charcoal/15"
                  )}
                >
                  <span
                    className="w-3 h-3 rounded-full border border-charcoal/20"
                    style={{ backgroundColor: wall.hex }}
                  />
                  <span>{wall.label}</span>
                </button>
              ))}
            </div>

            <span className="text-xs text-charcoal/60 tabular-nums">
              {selectedSize.dimensionsIn} ({selectedSize.dimensionsCm})
            </span>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-8">
          <div className="p-6 bg-beige/55 hairline-all">
            <span className="text-[10px] uppercase tracking-[0.22em] text-terracotta font-medium">
              Step 01 · Your Photograph
            </span>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="mt-4 w-full py-4 border border-dashed border-charcoal/35 hover:border-terracotta bg-ivory/70 flex items-center justify-center gap-2.5 text-xs uppercase tracking-[0.18em] transition-colors cursor-pointer"
            >
              <Upload className="w-4 h-4 text-terracotta" />
              <span>
                {uploading
                  ? "Preparing High-Res Preview..."
                  : isUserUpload
                    ? "Replace Uploaded Photo"
                    : "Upload Your Own Photo"}
              </span>
            </button>

            <div className="mt-4">
              <label
                htmlFor="memory-title"
                className="block text-[10px] uppercase tracking-[0.2em] text-charcoal/55 mb-1.5"
              >
                Artwork / Dedication Title
              </label>
              <input
                id="memory-title"
                type="text"
                value={customTitle}
                onChange={(e) => setCustomTitle(e.target.value)}
                className="w-full bg-ivory border border-charcoal/20 px-3 py-2 text-sm focus:outline-none focus:border-charcoal"
              />
            </div>

            <div className="mt-4">
              <p className="text-[10px] uppercase tracking-[0.18em] text-charcoal/55 mb-2 inline-flex items-center gap-1.5">
                <ImageIcon className="w-3 h-3" />
                <span>Or test with studio studies</span>
              </p>
              <div className="grid grid-cols-4 gap-2">
                {CURATED_SAMPLE_ARTWORKS.map((art) => (
                  <button
                    key={art.id}
                    type="button"
                    onClick={() => {
                      setImageUrl(art.url);
                      setCustomTitle(art.title);
                      setIsUserUpload(false);
                    }}
                    className={cn(
                      "aspect-square overflow-hidden border-2 transition-all cursor-pointer",
                      imageUrl === art.url
                        ? "border-terracotta"
                        : "border-transparent opacity-75 hover:opacity-100"
                    )}
                    title={art.title}
                  >
                    <img
                      src={art.url}
                      alt={art.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <span className="block text-[10px] uppercase tracking-[0.22em] text-olive mb-3">
              Step 02 · Solid Timber &amp; Metal Moulding
            </span>
            <div className="grid grid-cols-1 gap-2">
              {FRAME_FINISHES.map((finish) => (
                <button
                  key={finish.id}
                  type="button"
                  onClick={() => setFinishId(finish.id)}
                  className={cn(
                    "px-4 py-3 border text-left flex items-center justify-between transition-colors cursor-pointer",
                    finishId === finish.id
                      ? "border-charcoal bg-beige/70"
                      : "border-charcoal/15 hover:border-charcoal/45"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="w-5 h-5 rounded-full border border-charcoal/15 shrink-0"
                      style={{ backgroundColor: finish.hex }}
                    />
                    <div>
                      <p className="text-xs font-medium">{finish.name}</p>
                      <p className="text-[11px] text-charcoal/55">
                        {finish.profileWidthMm}mm architectural profile
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-charcoal/70 tabular-nums">
                    {finish.priceDelta === 0
                      ? "Base"
                      : `+${formatCurrency(finish.priceDelta)}`}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <span className="block text-[10px] uppercase tracking-[0.22em] text-olive mb-3">
              Step 03 · Print &amp; Frame Scale
            </span>
            <div className="grid grid-cols-2 gap-2.5">
              {FRAME_SIZES.map((size) => (
                <button
                  key={size.id}
                  type="button"
                  onClick={() => setSizeId(size.id)}
                  className={cn(
                    "px-4 py-3 border text-left transition-colors cursor-pointer",
                    sizeId === size.id
                      ? "border-charcoal bg-charcoal text-ivory"
                      : "border-charcoal/15 hover:border-charcoal/45"
                  )}
                >
                  <p className="text-xs font-medium">{size.label}</p>
                  <p
                    className={cn(
                      "text-[10px] mt-0.5 tabular-nums",
                      sizeId === size.id ? "text-ivory/70" : "text-charcoal/55"
                    )}
                  >
                    {size.priceDelta === 0
                      ? "Included"
                      : `+${formatCurrency(size.priceDelta)}`}
                  </p>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div>
              <span className="block text-[10px] uppercase tracking-[0.22em] text-olive mb-3">
                Step 04 · Mat Presentation
              </span>
              <div className="space-y-2">
                {MAT_OPTIONS.map((mat) => (
                  <button
                    key={mat.id}
                    type="button"
                    onClick={() => setMatId(mat.id)}
                    className={cn(
                      "w-full px-4 py-3 border text-left flex items-center justify-between transition-colors cursor-pointer",
                      matId === mat.id
                        ? "border-charcoal bg-beige/70"
                        : "border-charcoal/15 hover:border-charcoal/45"
                    )}
                  >
                    <span className="text-xs font-medium">{mat.name}</span>
                    <span className="text-xs text-charcoal/65 tabular-nums">
                      {mat.priceDelta === 0
                        ? "Included"
                        : `+${formatCurrency(mat.priceDelta)}`}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="block text-[10px] uppercase tracking-[0.22em] text-olive mb-3">
                Step 05 · Glazing Protection
              </span>
              <div className="space-y-2">
                {GLAZING_OPTIONS.map((glaze) => (
                  <button
                    key={glaze.id}
                    type="button"
                    onClick={() => setGlazingId(glaze.id)}
                    className={cn(
                      "w-full px-4 py-3 border text-left flex items-center justify-between transition-colors cursor-pointer",
                      glazingId === glaze.id
                        ? "border-charcoal bg-beige/70"
                        : "border-charcoal/15 hover:border-charcoal/45"
                    )}
                  >
                    <div>
                      <p className="text-xs font-medium">{glaze.name}</p>
                      <p className="text-[10px] text-terracotta">
                        {glaze.uvRating}
                      </p>
                    </div>
                    <span className="text-xs text-charcoal/65 tabular-nums">
                      {glaze.priceDelta === 0
                        ? "Included"
                        : `+${formatCurrency(glaze.priceDelta)}`}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 hairline-t">
            <div className="flex items-baseline justify-between mb-4">
              <span className="text-xs uppercase tracking-[0.2em] text-charcoal/60">
                Bespoke Total
              </span>
              <span className="font-serif text-3xl tabular-nums">
                {formatCurrency(totalPrice)}
              </span>
            </div>

            <button
              type="button"
              onClick={handleCommission}
              className="w-full py-4 bg-charcoal hover:bg-terracotta text-ivory text-xs uppercase tracking-[0.22em] transition-colors flex items-center justify-center gap-2.5 cursor-pointer"
            >
              {added ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added to Your Bag</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Commission Custom Frame</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
