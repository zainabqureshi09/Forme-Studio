import { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { PRODUCTS } from "@/src/data/catalog";
import type { ProductCategory } from "@/src/types/ecommerce";
import { ProductCard } from "@/src/components/shop/ProductCard";
import { SectionLabel } from "@/src/components/ui/SectionLabel";
import { AppLink } from "@/src/components/ui/AppLink";
import { cn } from "@/src/lib/utils";
import { EDITORIAL_EASE } from "@/src/lib/motion";

const FILTERS: { id: "all" | ProductCategory; label: string }[] = [
  { id: "all", label: "All Bestsellers" },
  { id: "custom-frames", label: "Custom Frames" },
  { id: "floating-frames", label: "Linen Floats" },
  { id: "fine-art-prints", label: "Fine Art Prints" },
  { id: "gallery-sets", label: "Gallery Sets" },
];

export function BestsellingProducts() {
  const [filter, setFilter] = useState<"all" | ProductCategory>("all");

  const items =
    filter === "all"
      ? PRODUCTS.slice(0, 6)
      : PRODUCTS.filter((p) => p.category === filter);

  return (
    <section className="py-[var(--spacing-section)] hairline-b bg-ivory">
      <div className="editorial-container">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div>
            <SectionLabel index="03" label="Collector Favorites" />
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal mt-4 leading-[1.02]">
              Bestselling{" "}
              <span className="italic text-charcoal/65">Editions</span>
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {FILTERS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilter(tab.id)}
                className={cn(
                  "px-4 py-2 text-[11px] uppercase tracking-[0.18em] transition-colors cursor-pointer whitespace-nowrap shrink-0",
                  filter === tab.id
                    ? "bg-charcoal text-ivory"
                    : "border border-charcoal/18 text-charcoal/75 hover:border-charcoal"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          layout
          transition={{ duration: 0.45, ease: EDITORIAL_EASE }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14"
        >
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>

        <div className="mt-16 flex justify-center">
          <AppLink
            href="/collections"
            className="inline-flex items-center gap-3 px-8 py-4 border border-charcoal/25 text-[11px] uppercase tracking-[0.22em] hover:bg-charcoal hover:text-ivory transition-colors whitespace-nowrap"
          >
            <span>Explore Full Catalogue</span>
            <ArrowRight className="w-4 h-4" strokeWidth={1.35} />
          </AppLink>
        </div>
      </div>
    </section>
  );
}
