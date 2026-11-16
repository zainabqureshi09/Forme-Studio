import { useState, type FormEvent } from "react";
import { CheckCircle2, Lock, ArrowLeft } from "lucide-react";
import { useCart } from "@/src/context/CartContext";
import { FRAME_FINISHES, FRAME_SIZES } from "@/src/data/catalog";
import { formatCurrency } from "@/src/lib/utils";
import { SectionLabel } from "@/src/components/ui/SectionLabel";
import { AppLink } from "@/src/components/ui/AppLink";

export function CheckoutPage() {
  const { items, subtotal, amountToFreeShipping, atelierNote, clearCart } =
    useCart();

  const [orderPlacedId, setOrderPlacedId] = useState<string | null>(null);
  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postal, setPostal] = useState("");

  const shippingCost = amountToFreeShipping === 0 || subtotal === 0 ? 0 : 28;
  const total = subtotal + shippingCost;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const id = `FS-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderPlacedId(id);
    clearCart();
  };

  if (orderPlacedId) {
    return (
      <div className="editorial-container py-24 max-w-2xl text-center">
        <CheckCircle2
          className="w-12 h-12 text-olive mx-auto"
          strokeWidth={1.25}
        />
        <p className="text-[10px] uppercase tracking-[0.24em] text-terracotta mt-6 tabular-nums">
          Commission Confirmed · {orderPlacedId}
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl font-normal mt-3">
          Thank you, {customerName || "Collector"}.
        </h1>
        <p className="mt-4 text-sm text-charcoal/70 leading-relaxed">
          Your framing specifications have been routed to our SoHo millwork
          bench. A confirmation dossier has been dispatched to{" "}
          <span className="text-charcoal font-medium">{email}</span>.
        </p>
        <AppLink
          href="/collections"
          className="inline-block mt-9 px-8 py-4 bg-charcoal text-ivory text-xs uppercase tracking-[0.2em] hover:bg-terracotta transition-colors"
        >
          Return to Collections
        </AppLink>
      </div>
    );
  }

  return (
    <div className="editorial-container py-14 lg:py-20">
      <AppLink
        href="/collections"
        className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-charcoal/60 hover:text-charcoal mb-8"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Continue Curating</span>
      </AppLink>

      <SectionLabel index="CHECKOUT" label="Atelier Dispatch" />
      <h1 className="font-serif text-4xl sm:text-5xl font-normal mt-3 mb-12">
        Complete Your <span className="italic text-terracotta">Commission</span>
      </h1>

      {items.length === 0 ? (
        <div className="py-16 hairline-t">
          <p className="font-serif text-2xl italic text-charcoal/70">
            Your bag is currently empty.
          </p>
          <AppLink
            href="/studio"
            className="inline-block mt-6 px-6 py-3 bg-charcoal text-ivory text-xs uppercase tracking-[0.2em]"
          >
            Open Framing Studio
          </AppLink>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-8">
            <div className="p-6 sm:p-8 bg-beige/40 hairline-all space-y-5">
              <h2 className="font-serif text-2xl">Collector Details</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-charcoal/60 mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Elena Rostova"
                    className="w-full bg-ivory border border-charcoal/20 px-3.5 py-2.5 text-sm focus:outline-none focus:border-charcoal"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-charcoal/60 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="elena@domain.com"
                    className="w-full bg-ivory border border-charcoal/20 px-3.5 py-2.5 text-sm focus:outline-none focus:border-charcoal"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-charcoal/60 mb-1.5">
                  Delivery Street Address
                </label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="142 Mercer Street, Apt 4A"
                  className="w-full bg-ivory border border-charcoal/20 px-3.5 py-2.5 text-sm focus:outline-none focus:border-charcoal"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-charcoal/60 mb-1.5">
                    City
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="New York"
                    className="w-full bg-ivory border border-charcoal/20 px-3.5 py-2.5 text-sm focus:outline-none focus:border-charcoal"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-charcoal/60 mb-1.5">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    required
                    value={postal}
                    onChange={(e) => setPostal(e.target.value)}
                    placeholder="10012"
                    className="w-full bg-ivory border border-charcoal/20 px-3.5 py-2.5 text-sm focus:outline-none focus:border-charcoal"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-charcoal hover:bg-terracotta text-ivory text-xs uppercase tracking-[0.22em] transition-colors flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5" />
              <span className="tabular-nums">
                Place Atelier Order · {formatCurrency(total)}
              </span>
            </button>
          </form>

          <aside className="lg:col-span-5 p-6 sm:p-8 bg-beige/65 hairline-all">
            <h2 className="font-serif text-2xl pb-4 hairline-b">
              Commission Summary
            </h2>

            <div className="divide-y divide-charcoal/12 my-4">
              {items.map((item) => {
                const finish = FRAME_FINISHES.find(
                  (f) => f.id === item.config.finishId
                );
                const size = FRAME_SIZES.find(
                  (s) => s.id === item.config.sizeId
                );
                return (
                  <div
                    key={item.cartItemId}
                    className="py-4 flex items-center gap-4"
                  >
                    <img
                      src={item.config.customImageUrl || item.thumbnail}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-14 h-16 object-cover border-2 border-charcoal"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-serif text-lg truncate">
                        {item.config.customTitle || item.title}
                      </p>
                      <p className="text-[11px] text-charcoal/60 tabular-nums">
                        {finish?.name} · {size?.dimensionsIn} × {item.quantity}
                      </p>
                    </div>
                    <span className="text-sm font-medium tabular-nums">
                      {formatCurrency(item.unitPrice * item.quantity)}
                    </span>
                  </div>
                );
              })}
            </div>

            {atelierNote && (
              <div className="py-3 px-4 bg-ivory/70 text-xs text-charcoal/70 mb-4">
                <span className="uppercase tracking-[0.16em] text-[10px] block text-charcoal/50 mb-1">
                  Atelier Note
                </span>
                {atelierNote}
              </div>
            )}

            <div className="space-y-2.5 pt-4 hairline-t text-sm">
              <div className="flex justify-between text-charcoal/70">
                <span>Subtotal</span>
                <span className="tabular-nums">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between text-charcoal/70">
                <span>Crated White-Glove Shipping</span>
                <span className="tabular-nums">
                  {shippingCost === 0
                    ? "Complimentary"
                    : formatCurrency(shippingCost)}
                </span>
              </div>
              <div className="flex justify-between font-serif text-2xl pt-3 hairline-t">
                <span>Total</span>
                <span className="tabular-nums">{formatCurrency(total)}</span>
              </div>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
