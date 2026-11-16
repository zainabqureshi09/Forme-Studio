import { useEffect, useState } from "react";
import { ArrowLeft, Check, ShieldCheck, Truck } from "lucide-react";
import {
  FRAME_FINISHES,
  FRAME_SIZES,
  GLAZING_OPTIONS,
  MAT_OPTIONS,
  PRODUCTS,
} from "@/src/data/catalog";
import type {
  FrameFinishId,
  FrameSizeId,
  GlazingId,
  MatOptionId,
} from "@/src/types/ecommerce";
import { calculateConfiguredPrice, cn, formatCurrency } from "@/src/lib/utils";
import { FramedArtworkPreview } from "@/src/components/ui/FramedArtworkPreview";
import { EditorialImage } from "@/src/components/ui/EditorialImage";
import { ProductCard } from "@/src/components/shop/ProductCard";
import { AppLink } from "@/src/components/ui/AppLink";
import { useCart } from "@/src/context/CartContext";

export function ProductDetailPage({ slug }: { slug: string }) {
  const product = PRODUCTS.find((p) => p.slug === slug) ?? PRODUCTS[0];
  const { addItem } = useCart();

  const [finishId, setFinishId] = useState<FrameFinishId>(
    product.defaultFinish
  );
  const [sizeId, setSizeId] = useState<FrameSizeId>(product.defaultSize);
  const [matId, setMatId] = useState<MatOptionId>("warm-cotton");
  const [glazingId, setGlazingId] = useState<GlazingId>("conservation-glass");
  const [viewMode, setViewMode] = useState<"studio" | "room">("studio");
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    setFinishId(product.defaultFinish);
    setSizeId(product.defaultSize);
    setViewMode("studio");
  }, [product]);

  const selectedFinish =
    FRAME_FINISHES.find((f) => f.id === finishId) ?? FRAME_FINISHES[0];
  const selectedSize =
    FRAME_SIZES.find((s) => s.id === sizeId) ?? FRAME_SIZES[0];

  const livePrice = calculateConfiguredPrice({
    basePrice: product.basePrice,
    finishId,
    sizeId,
    matId,
    glazingId,
  });

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      slug: product.slug,
      title: product.title,
      isBespoke: false,
      unitPrice: livePrice,
      thumbnail: product.image,
      config: {
        finishId,
        sizeId,
        matId,
        glazingId,
      },
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  };

  const related = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <div className="pb-24">
      <div className="editorial-container pt-8 pb-6">
        <AppLink
          href="/collections"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-charcoal/60 hover:text-charcoal transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Catalogue</span>
        </AppLink>
      </div>

      <section className="editorial-container grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        <div className="lg:col-span-7 lg:sticky lg:top-28">
          <div className="relative bg-beige/70">
            {viewMode === "studio" ? (
              <FramedArtworkPreview
                imageUrl={product.image}
                alt={product.title}
                finishId={finishId}
                matId={matId}
                glazingId={glazingId}
                aspectClass={selectedSize.aspectClass}
                wallBackdrop="plaster"
              />
            ) : (
              <div className="aspect-[4/3] w-full overflow-hidden">
                <EditorialImage
                  src={product.roomImage}
                  alt={`${product.title} installed in room`}
                />
              </div>
            )}

            <div className="absolute bottom-5 right-5 inline-flex bg-ivory/95 backdrop-blur-sm border border-charcoal/15 p-1">
              <button
                type="button"
                onClick={() => setViewMode("studio")}
                className={cn(
                  "px-3.5 py-1.5 text-[10px] uppercase tracking-[0.18em] cursor-pointer transition-colors",
                  viewMode === "studio"
                    ? "bg-charcoal text-ivory"
                    : "text-charcoal/65"
                )}
              >
                Live Frame
              </button>
              <button
                type="button"
                onClick={() => setViewMode("room")}
                className={cn(
                  "px-3.5 py-1.5 text-[10px] uppercase tracking-[0.18em] cursor-pointer transition-colors",
                  viewMode === "room"
                    ? "bg-charcoal text-ivory"
                    : "text-charcoal/65"
                )}
              >
                In Interior
              </button>
            </div>
          </div>

          <p className="mt-3 text-xs text-charcoal/55 italic font-serif">
            {product.artworkCaption}
          </p>
        </div>

        <div className="lg:col-span-5">
          <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.22em] text-olive">
            <span>{product.categoryLabel}</span>
            <span className="tabular-nums">SKU · {product.sku}</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl font-normal mt-2 leading-[1.04]">
            {product.title}
          </h1>
          <p className="text-sm text-charcoal/65 mt-2">{product.subtitle}</p>

          <div className="mt-6 pb-6 hairline-b flex items-baseline justify-between">
            <span className="font-serif text-3xl text-charcoal tabular-nums">
              {formatCurrency(livePrice)}
            </span>
            <span className="text-xs text-charcoal/60">
              {product.specs.leadTime}
            </span>
          </div>

          <div className="mt-7">
            <div className="flex justify-between items-baseline mb-3">
              <span className="text-[11px] uppercase tracking-[0.2em] font-medium">
                1. Moulding Finish
              </span>
              <span className="text-xs text-charcoal/65">
                {selectedFinish.name}
              </span>
            </div>
            <div className="flex flex-wrap gap-3">
              {product.availableFinishes.map((fId) => {
                const finish = FRAME_FINISHES.find((f) => f.id === fId);
                if (!finish) return null;
                const active = finishId === fId;
                return (
                  <button
                    key={fId}
                    type="button"
                    onClick={() => setFinishId(fId)}
                    className={cn(
                      "flex items-center gap-2.5 px-3.5 py-2.5 border text-xs transition-all cursor-pointer",
                      active
                        ? "border-charcoal bg-beige/70"
                        : "border-charcoal/15 hover:border-charcoal/45"
                    )}
                  >
                    <span
                      className="w-4 h-4 rounded-full border border-charcoal/15"
                      style={{ backgroundColor: finish.hex }}
                    />
                    <span>{finish.name.split(" ").slice(-1)[0]}</span>
                  </button>
                );
              })}
            </div>
            <p className="text-[11px] text-charcoal/55 mt-2">
              {selectedFinish.material}
            </p>
          </div>

          <div className="mt-7">
            <span className="block text-[11px] uppercase tracking-[0.2em] font-medium mb-3">
              2. Dimensions
            </span>
            <div className="grid grid-cols-2 gap-2.5">
              {FRAME_SIZES.map((size) => {
                const active = sizeId === size.id;
                return (
                  <button
                    key={size.id}
                    type="button"
                    onClick={() => setSizeId(size.id)}
                    className={cn(
                      "px-4 py-3 text-left border transition-colors cursor-pointer",
                      active
                        ? "border-charcoal bg-charcoal text-ivory"
                        : "border-charcoal/15 hover:border-charcoal/45"
                    )}
                  >
                    <p className="text-xs font-medium">{size.label}</p>
                    <p
                      className={cn(
                        "text-[10px] mt-0.5 tabular-nums",
                        active ? "text-ivory/70" : "text-charcoal/55"
                      )}
                    >
                      {size.dimensionsCm}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-7">
            <span className="block text-[11px] uppercase tracking-[0.2em] font-medium mb-3">
              3. Conservation Matting
            </span>
            <div className="space-y-2">
              {MAT_OPTIONS.map((mat) => {
                const active = matId === mat.id;
                return (
                  <button
                    key={mat.id}
                    type="button"
                    onClick={() => setMatId(mat.id)}
                    className={cn(
                      "w-full px-4 py-3 text-left border flex items-center justify-between transition-colors cursor-pointer",
                      active
                        ? "border-charcoal bg-beige/65"
                        : "border-charcoal/15 hover:border-charcoal/45"
                    )}
                  >
                    <div>
                      <p className="text-xs font-medium">{mat.name}</p>
                      <p className="text-[11px] text-charcoal/60 mt-0.5">
                        {mat.description}
                      </p>
                    </div>
                    <span className="text-xs text-charcoal/70 ml-3 shrink-0 tabular-nums">
                      {mat.priceDelta === 0
                        ? "Included"
                        : `+${formatCurrency(mat.priceDelta)}`}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-7">
            <span className="block text-[11px] uppercase tracking-[0.2em] font-medium mb-3">
              4. Archival Glazing
            </span>
            <div className="space-y-2">
              {GLAZING_OPTIONS.map((glaze) => {
                const active = glazingId === glaze.id;
                return (
                  <button
                    key={glaze.id}
                    type="button"
                    onClick={() => setGlazingId(glaze.id)}
                    className={cn(
                      "w-full px-4 py-3 text-left border flex items-center justify-between transition-colors cursor-pointer",
                      active
                        ? "border-charcoal bg-beige/65"
                        : "border-charcoal/15 hover:border-charcoal/45"
                    )}
                  >
                    <div>
                      <p className="text-xs font-medium">
                        {glaze.name}{" "}
                        <span className="text-terracotta ml-1">
                          · {glaze.uvRating}
                        </span>
                      </p>
                      <p className="text-[11px] text-charcoal/60 mt-0.5">
                        {glaze.description}
                      </p>
                    </div>
                    <span className="text-xs text-charcoal/70 ml-3 shrink-0 tabular-nums">
                      {glaze.priceDelta === 0
                        ? "Included"
                        : `+${formatCurrency(glaze.priceDelta)}`}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            className="mt-8 w-full py-4 bg-charcoal hover:bg-terracotta text-ivory text-xs uppercase tracking-[0.22em] transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            {justAdded ? (
              <>
                <Check className="w-4 h-4" />
                <span>Added to Your Bag</span>
              </>
            ) : (
              <span className="tabular-nums">
                Commission Piece · {formatCurrency(livePrice)}
              </span>
            )}
          </button>

          <div className="mt-6 grid grid-cols-2 gap-4 py-5 hairline-t hairline-b text-xs text-charcoal/70">
            <div className="flex items-start gap-2.5">
              <Truck className="w-4 h-4 text-terracotta shrink-0 mt-0.5" />
              <span>White-glove crated delivery on orders over $450</span>
            </div>
            <div className="flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-olive shrink-0 mt-0.5" />
              <span>Lifetime joinery &amp; UV preservation guarantee</span>
            </div>
          </div>

          <div className="mt-7 space-y-5 text-sm text-charcoal/75 leading-relaxed">
            <p>{product.description}</p>
            <dl className="grid grid-cols-1 gap-3 pt-4 hairline-t text-xs">
              <div>
                <dt className="uppercase tracking-[0.18em] text-charcoal/45">
                  Moulding Origin
                </dt>
                <dd className="mt-0.5 text-charcoal">
                  {product.specs.mouldingOrigin}
                </dd>
              </div>
              <div>
                <dt className="uppercase tracking-[0.18em] text-charcoal/45">
                  Conservation Standard
                </dt>
                <dd className="mt-0.5 text-charcoal">
                  {product.specs.archivalStandard}
                </dd>
              </div>
              <div>
                <dt className="uppercase tracking-[0.18em] text-charcoal/45">
                  Hanging Hardware
                </dt>
                <dd className="mt-0.5 text-charcoal">
                  {product.specs.hardware}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className="editorial-container mt-28 pt-16 hairline-t">
        <h2 className="font-serif text-3xl sm:text-4xl font-normal mb-10">
          Companion <span className="italic text-charcoal/60">Pieces</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {related.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
