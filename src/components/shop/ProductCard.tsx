import { useState } from "react";
import { Plus } from "lucide-react";
import { FRAME_FINISHES } from "@/src/data/catalog";
import { calculateConfiguredPrice, cn, formatCurrency } from "@/src/lib/utils";
import type { FrameFinishId, Product } from "@/src/types/ecommerce";
import { FramedArtworkPreview } from "@/src/components/ui/FramedArtworkPreview";
import { AppLink } from "@/src/components/ui/AppLink";
import { useCart } from "@/src/context/CartContext";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const [selectedFinish, setSelectedFinish] = useState<FrameFinishId>(
    product.defaultFinish
  );

  const livePrice = calculateConfiguredPrice({
    basePrice: product.basePrice,
    finishId: selectedFinish,
    sizeId: product.defaultSize,
    matId: "warm-cotton",
    glazingId: "conservation-glass",
  });

  const handleQuickAdd = () => {
    addItem({
      productId: product.id,
      slug: product.slug,
      title: product.title,
      isBespoke: false,
      unitPrice: livePrice,
      thumbnail: product.image,
      config: {
        finishId: selectedFinish,
        sizeId: product.defaultSize,
        matId: "warm-cotton",
        glazingId: "conservation-glass",
      },
    });
  };

  return (
    <article className="group flex flex-col">
      <div className="relative bg-beige/65 p-6 sm:p-8 transition-colors duration-500 group-hover:bg-beige">
        <AppLink
          href={`/products/${product.slug}`}
          className="block transition-transform duration-300 group-hover:-translate-y-0.5"
        >
          <FramedArtworkPreview
            imageUrl={product.image}
            alt={product.title}
            finishId={selectedFinish}
            matId="warm-cotton"
            glazingId="conservation-glass"
            aspectClass="aspect-[4/5]"
          />
        </AppLink>

        <button
          type="button"
          onClick={handleQuickAdd}
          className="mt-5 w-full py-2.5 bg-ivory/95 hover:bg-charcoal hover:text-ivory text-charcoal text-[11px] uppercase tracking-[0.2em] inline-flex items-center justify-center gap-2 transition-colors hairline-all cursor-pointer whitespace-nowrap"
        >
          <Plus className="w-3.5 h-3.5" strokeWidth={1.5} />
          <span className="tabular-nums">
            Quick Add · {formatCurrency(livePrice)}
          </span>
        </button>
      </div>

      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-olive">
            {product.categoryLabel}
            {product.editionNote ? ` · ${product.editionNote}` : ""}
          </p>
          <AppLink
            href={`/products/${product.slug}`}
            className="font-serif text-xl sm:text-2xl text-charcoal hover:text-terracotta transition-colors block mt-0.5"
          >
            {product.title}
          </AppLink>
        </div>
        <span className="text-sm font-medium text-charcoal/90 pt-1 tabular-nums">
          {formatCurrency(livePrice)}
        </span>
      </div>

      <div className="mt-3 flex items-center gap-2">
        {product.availableFinishes.map((fId) => {
          const finish = FRAME_FINISHES.find((f) => f.id === fId);
          if (!finish) return null;
          const active = selectedFinish === fId;
          return (
            <button
              key={fId}
              type="button"
              onClick={() => setSelectedFinish(fId)}
              title={finish.name}
              aria-label={`Select ${finish.name}`}
              className={cn(
                "w-4 h-4 rounded-full transition-transform cursor-pointer",
                active
                  ? "ring-1 ring-offset-2 ring-offset-ivory ring-charcoal scale-110"
                  : "opacity-75 hover:opacity-100"
              )}
              style={{ backgroundColor: finish.hex }}
            />
          );
        })}
        <span className="text-[11px] text-charcoal/55 ml-1 truncate">
          {FRAME_FINISHES.find((f) => f.id === selectedFinish)?.name}
        </span>
      </div>
    </article>
  );
}
