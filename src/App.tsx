import { RouterProvider, useRouter } from "@/src/context/RouterContext";
import { CartProvider } from "@/src/context/CartContext";
import { SmoothScrollProvider } from "@/src/components/providers/SmoothScrollProvider";
import { Header } from "@/src/components/layout/Header";
import { CartDrawer } from "@/src/components/layout/CartDrawer";
import { Footer } from "@/src/components/layout/Footer";
import { HomePage } from "@/src/pages/HomePage";
import { CollectionsPage } from "@/src/pages/CollectionsPage";
import { ProductDetailPage } from "@/src/pages/ProductDetailPage";
import { StudioPage } from "@/src/pages/StudioPage";
import { AtelierPage } from "@/src/pages/AtelierPage";
import { CheckoutPage } from "@/src/pages/CheckoutPage";

function AppRoutes() {
  const { pathname } = useRouter();

  if (pathname === "/collections") {
    return <CollectionsPage />;
  }

  if (pathname.startsWith("/products/")) {
    const slug = pathname.replace("/products/", "").split("/")[0];
    return <ProductDetailPage slug={slug} />;
  }

  if (pathname === "/studio") {
    return <StudioPage />;
  }

  if (pathname === "/atelier") {
    return <AtelierPage />;
  }

  if (pathname === "/checkout") {
    return <CheckoutPage />;
  }

  return <HomePage />;
}

export default function App() {
  return (
    <RouterProvider>
      <CartProvider>
        <SmoothScrollProvider>
          <div className="min-h-screen flex flex-col bg-ivory text-charcoal font-sans">
            <Header />
            <CartDrawer />
            <main className="flex-1 pt-20">
              <AppRoutes />
            </main>
            <Footer />
          </div>
        </SmoothScrollProvider>
      </CartProvider>
    </RouterProvider>
  );
}
