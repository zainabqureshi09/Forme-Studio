import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { PRODUCTS } from "@/src/data/catalog";
import type { FrameFinishId, ProductCategory } from "@/src/types/ecommerce";
import { ProductCard } from "@/src/components/shop/ProductCard";
import { SectionLabel } from "@/src/components/ui/SectionLabel";
import { useRouter } from "@/src/context/RouterContext";
import { cn } from "@/src/lib/utils";

const CATEGORIES: { id: "all" | ProductCategory; label: string }[] = [
  { id: "all", label: "All Objects" },
  { id: "custom-frames", label: "Custom Frames" },
  { id: "floating-frames", label: "Linen Floats" },
  { id: "fine-art-prints", label: "Fine Art Prints" },
  { id: "gallery-sets", label: "Gallery Sets" },
];

export function CollectionsPage() {
  const { search } = useRouter();
  const params = new URLSearchParams(search);
  const queryCategory =
    (params.get("category") as ProductCategory | null) ?? "all";

  const [category, setCategory] = useState<"all" | ProductCategory>(
    queryCategory
  );
  const [finishFilter, setFinishFilter] = useState<"all" | FrameFinishId>(
    "all"
  );
  const [sortBy, setSortBy] = useState<"curated" | "price-asc" | "price-desc">(
    "curated"
  );
  const [query, setQuery] = useState("");

  useEffect(() => {
    setCategory(queryCategory);
  }, [queryCategory]);

  const filtered = useMemo(() => {
    let list = [...PRODUCTS];

    if (category !== "all") {
      list = list.filter((p) => p.category === category);
    }

    if (finishFilter !== "all") {
      list = list.filter((p) => p.availableFinishes.includes(finishFilter));
    }

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q) ||
          p.categoryLabel.toLowerCase().includes(q)
      );
    }

    if (sortBy === "price-asc") {
      list.sort((a, b) => a.basePrice - b.basePrice);
    } else if (sortBy === "price-desc") {
      list.sort((a, b) => b.basePrice - a.basePrice);
    }

    return list;
  }, [category, finishFilter, sortBy, query]);

  return (
    <div className="editorial-container py-16 lg:py-24">
      <div className="max-w-3xl">
        <SectionLabel index="ARCHIVE" label="Curated Catalogue" />
        <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-normal mt-4 leading-[0.95]">
          Frames &amp; Archival{" "}
          <span className="italic text-terracotta">Editions</span>
        </h1>
        <p className="mt-5 text-base text-charcoal/70 max-w-xl">
          Every frame is milled to order in your chosen timber, matting, and
          glazing specification.
        </p>
      </div>

      <div className="mt-12 py-6 hairline-t hairline-b flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setCategory(cat.id)}
              className={cn(
                "px-4 py-2 text-[11px] uppercase tracking-[0.18em] transition-colors cursor-pointer whitespace-nowrap",
                category === cat.id
                  ? "bg-charcoal text-ivory"
                  : "border border-charcoal/15 text-charcoal/70 hover:border-charcoal"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-charcoal/45 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search titles or wood..."
              aria-label="Search catalogue"
              className="pl-9 pr-4 py-2 text-xs bg-transparent border border-charcoal/20 focus:outline-none focus:border-charcoal w-52"
            />
          </div>

          <select
            value={finishFilter}
            onChange={(e) =>
              setFinishFilter(e.target.value as "all" | FrameFinishId)
            }
            aria-label="Filter by finish"
            className="px-3 py-2 text-xs bg-ivory border border-charcoal/20 focus:outline-none"
          >
            <option value="all">All Finishes</option>
            <option value="natural-walnut">Natural Walnut</option>
            <option value="smoked-oak">Smoked Oak</option>
            <option value="raw-maple">Bleached Maple</option>
            <option value="gallery-black">Ebonized Ash</option>
            <option value="brushed-brass">Brushed Brass</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(
                e.target.value as "curated" | "price-asc" | "price-desc"
              )
            }
            aria-label="Sort products"
            className="px-3 py-2 text-xs bg-ivory border border-charcoal/20 focus:outline-none"
          >
            <option value="curated">Curated Order</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="py-24 text-center">
          <p className="font-serif text-3xl italic text-charcoal/70">
            No editions match your current selection.
          </p>
          <button
            type="button"
            onClick={() => {
              setCategory("all");
              setFinishFilter("all");
              setQuery("");
            }}
            className="mt-6 px-6 py-3 border border-charcoal/25 text-xs uppercase tracking-[0.18em] hover:bg-charcoal hover:text-ivory transition-colors cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
