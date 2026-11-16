import { motion, AnimatePresence } from "motion/react";
import { Minus, Plus, Trash2, X, ArrowRight } from "lucide-react";
import { useCart } from "@/src/context/CartContext";
import {
  FRAME_FINISHES,
  FRAME_SIZES,
  GLAZING_OPTIONS,
  MAT_OPTIONS,
} from "@/src/data/catalog";
import { formatCurrency } from "@/src/lib/utils";
import { EDITORIAL_EASE } from "@/src/lib/motion";
import { AppLink } from "@/src/components/ui/AppLink";

export function CartDrawer() {
  const {
    items,
    isDrawerOpen,
    closeDrawer,
    subtotal,
    amountToFreeShipping,
    freeShippingThreshold,
    updateQuantity,
    removeItem,
    atelierNote,
    setAtelierNote,
  } = useCart();

  const progress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeDrawer}
            className="fixed inset-0 z-50 bg-charcoal/45 backdrop-blur-[2px]"
          />

          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: EDITORIAL_EASE }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-[460px] bg-ivory text-charcoal shadow-2xl flex flex-col border-l border-charcoal/12"
            aria-label="Shopping Bag"
          >
            <div className="px-6 py-5 hairline-b flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] text-olive">
                  Atelier Dispatch
                </p>
                <h2 className="font-serif text-2xl font-normal mt-0.5">
                  Your Curated Bag
                </h2>
              </div>
              <button
                type="button"
                onClick={closeDrawer}
                aria-label="Close bag"
                className="p-2 -mr-2 text-charcoal/70 hover:text-charcoal cursor-pointer"
              >
                <X className="w-5 h-5" strokeWidth={1.35} />
              </button>
            </div>

            <div className="px-6 py-3.5 bg-beige/60 hairline-b">
              <p className="text-xs text-charcoal/80">
                {amountToFreeShipping > 0 ? (
                  <>
                    Add{" "}
                    <span className="font-medium text-charcoal tabular-nums">
                      {formatCurrency(amountToFreeShipping)}
                    </span>{" "}
                    for complimentary white-glove crated shipping.
                  </>
                ) : (
                  <span className="text-olive font-medium">
                    Complimentary white-glove crated shipping unlocked.
                  </span>
                )}
              </p>
              <div className="h-[2px] w-full bg-charcoal/10 mt-2.5 overflow-hidden">
                <div
                  className="h-full bg-terracotta transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-16">
                  <p className="font-serif text-3xl italic text-charcoal/75">
                    The gallery wall awaits.
                  </p>
                  <p className="text-sm text-charcoal/60 mt-3 max-w-xs">
                    Explore our solid-timber frames or upload your own photograph
                    in the Framing Studio.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 mt-7">
                    <AppLink
                      href="/studio"
                      onClick={closeDrawer}
                      className="px-5 py-3 bg-charcoal text-ivory text-[11px] uppercase tracking-[0.2em] hover:bg-terracotta transition-colors whitespace-nowrap"
                    >
                      Open Framing Studio
                    </AppLink>
                    <AppLink
                      href="/collections"
                      onClick={closeDrawer}
                      className="px-5 py-3 border border-charcoal/25 text-[11px] uppercase tracking-[0.2em] hover:border-charcoal transition-colors whitespace-nowrap"
                    >
                      Browse Editions
                    </AppLink>
                  </div>
                </div>
              ) : (
                items.map((item) => {
                  const finish = FRAME_FINISHES.find(
                    (f) => f.id === item.config.finishId
                  );
                  const size = FRAME_SIZES.find(
                    (s) => s.id === item.config.sizeId
                  );
                  const mat = MAT_OPTIONS.find(
                    (m) => m.id === item.config.matId
                  );
                  const glazing = GLAZING_OPTIONS.find(
                    (g) => g.id === item.config.glazingId
                  );

                  return (
                    <div
                      key={item.cartItemId}
                      className="flex gap-4 pb-6 hairline-b"
                    >
                      <div
                        className="w-20 h-24 shrink-0 p-1.5 bg-beige flex items-center justify-center"
                        style={{
                          border: `4px solid ${finish?.hex ?? "#191919"}`,
                        }}
                      >
                        <img
                          src={item.config.customImageUrl || item.thumbnail}
                          alt={item.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            {item.isBespoke && (
                              <p className="text-[10px] uppercase tracking-[0.18em] text-terracotta mb-0.5">
                                Bespoke Commission
                              </p>
                            )}
                            <h3 className="font-serif text-lg leading-snug text-charcoal">
                              {item.config.customTitle || item.title}
                            </h3>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeItem(item.cartItemId)}
                            aria-label="Remove item"
                            className="text-charcoal/40 hover:text-terracotta transition-colors cursor-pointer p-1"
                          >
                            <Trash2 className="w-4 h-4" strokeWidth={1.35} />
                          </button>
                        </div>

                        <div className="mt-1.5 space-y-0.5 text-[11px] text-charcoal/65">
                          <p>
                            {finish?.name} · {size?.dimensionsIn}
                          </p>
                          <p>
                            {mat?.name} · {glazing?.name}
                          </p>
                        </div>

                        <div className="mt-3 flex items-center justify-between">
                          <div className="inline-flex items-center border border-charcoal/20">
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(
                                  item.cartItemId,
                                  item.quantity - 1
                                )
                              }
                              aria-label="Decrease quantity"
                              className="p-2 text-charcoal/70 hover:text-charcoal cursor-pointer"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-3 text-xs font-medium tabular-nums">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(
                                  item.cartItemId,
                                  item.quantity + 1
                                )
                              }
                              aria-label="Increase quantity"
                              className="p-2 text-charcoal/70 hover:text-charcoal cursor-pointer"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <span className="text-sm font-medium tabular-nums">
                            {formatCurrency(item.unitPrice * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}

              {items.length > 0 && (
                <div className="pt-2">
                  <label
                    htmlFor="atelier-note"
                    className="block text-[10px] uppercase tracking-[0.2em] text-charcoal/60 mb-2"
                  >
                    Framing &amp; Gift Note (Optional)
                  </label>
                  <textarea
                    id="atelier-note"
                    rows={2}
                    value={atelierNote}
                    onChange={(e) => setAtelierNote(e.target.value)}
                    placeholder="Brass dedication plaque text or delivery notes..."
                    className="w-full bg-beige/40 border border-charcoal/15 px-3 py-2 text-xs text-charcoal placeholder:text-charcoal/40 focus:outline-none focus:border-terracotta"
                  />
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 hairline-t bg-ivory">
                <div className="flex items-baseline justify-between mb-4">
                  <span className="text-xs uppercase tracking-[0.18em] text-charcoal/65">
                    Estimated Subtotal
                  </span>
                  <span className="font-serif text-2xl tabular-nums">
                    {formatCurrency(subtotal)}
                  </span>
                </div>

                <AppLink
                  href="/checkout"
                  onClick={closeDrawer}
                  className="w-full flex items-center justify-center gap-2.5 bg-charcoal text-ivory py-4 text-[11px] uppercase tracking-[0.22em] hover:bg-terracotta transition-colors"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" strokeWidth={1.35} />
                </AppLink>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
