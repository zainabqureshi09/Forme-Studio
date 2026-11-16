import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useCart } from "@/src/context/CartContext";
import { useRouter } from "@/src/context/RouterContext";
import { cn } from "@/src/lib/utils";
import { EDITORIAL_EASE } from "@/src/lib/motion";
import { AppLink } from "@/src/components/ui/AppLink";

const NAV_LINKS = [
  { href: "/collections", label: "Collections" },
  { href: "/studio", label: "Framing Studio" },
  { href: "/#gallery-wall", label: "Gallery Walls" },
  { href: "/atelier", label: "The Atelier" },
];

export function Header() {
  const { pathname } = useRouter();
  const { itemCount, openDrawer } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-40 transition-colors duration-500",
          scrolled
            ? "bg-ivory/92 backdrop-blur-md hairline-b"
            : "bg-ivory/50 backdrop-blur-[2px]"
        )}
      >
        <div className="editorial-container h-20 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark (Single Line) */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation menu"
              className="md:hidden p-2 -ml-2 text-charcoal cursor-pointer"
            >
              <Menu className="w-5 h-5" strokeWidth={1.35} />
            </button>

            <AppLink
              href="/"
              className="font-serif text-2xl sm:text-[26px] tracking-[0.14em] uppercase leading-none text-charcoal whitespace-nowrap shrink-0 hover:text-terracotta transition-colors"
            >
              Forme Studio
            </AppLink>
          </div>

          {/* Zone 2: Clean Single-Line Text Navigation */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center gap-8"
          >
            {NAV_LINKS.map((link) => {
              const baseHref = link.href.split("#")[0] || "/";
              const active =
                link.href !== "/#gallery-wall" &&
                (pathname === baseHref ||
                  (baseHref !== "/" && pathname.startsWith(baseHref)));

              return (
                <AppLink
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative text-[11px] uppercase tracking-[0.2em] transition-colors py-1 whitespace-nowrap shrink-0",
                    active
                      ? "text-charcoal font-medium"
                      : "text-charcoal/70 hover:text-charcoal"
                  )}
                >
                  {link.label}
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute left-0 right-0 -bottom-0.5 h-[1px] bg-terracotta"
                      transition={{ duration: 0.4, ease: EDITORIAL_EASE }}
                    />
                  )}
                </AppLink>
              );
            })}
          </nav>

          {/* Zone 3: Single Primary Bag Action */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={openDrawer}
              className="inline-flex items-center gap-2.5 px-4 py-2.5 border border-charcoal/20 hover:border-charcoal text-[11px] uppercase tracking-[0.2em] text-charcoal hover:bg-charcoal hover:text-ivory transition-colors cursor-pointer whitespace-nowrap shrink-0"
              aria-label={`Open shopping bag with ${itemCount} items`}
            >
              <ShoppingBag className="w-3.5 h-3.5" strokeWidth={1.5} />
              <span>Bag</span>
              <span className="tabular-nums font-medium">({itemCount})</span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-charcoal text-ivory flex flex-col justify-between p-6"
          >
            <div className="flex items-center justify-between">
              <span className="font-serif text-xl tracking-[0.16em] uppercase">
                Forme Studio
              </span>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Close navigation menu"
                className="p-2 text-ivory/80 hover:text-ivory cursor-pointer"
              >
                <X className="w-6 h-6" strokeWidth={1.25} />
              </button>
            </div>

            <nav className="flex flex-col gap-6 my-auto">
              {[
                { href: "/", label: "Home" },
                ...NAV_LINKS,
                { href: "/checkout", label: "Checkout" },
              ].map((item, idx) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.06 + idx * 0.05,
                    duration: 0.45,
                    ease: EDITORIAL_EASE,
                  }}
                >
                  <AppLink
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="font-serif text-4xl italic font-normal text-ivory hover:text-terracotta transition-colors block"
                  >
                    {item.label}
                  </AppLink>
                </motion.div>
              ))}
            </nav>

            <div className="border-t border-ivory/15 pt-5 text-[11px] tracking-[0.18em] uppercase text-ivory/60 flex justify-between">
              <span>Your Memories. Our Canvas.</span>
              <span>SoHo, New York</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
