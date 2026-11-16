import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CartConfiguration, CartItem } from "@/src/types/ecommerce";

interface AddToCartInput {
  productId: string;
  slug: string;
  title: string;
  isBespoke: boolean;
  unitPrice: number;
  quantity?: number;
  thumbnail: string;
  config: CartConfiguration;
}

interface CartContextValue {
  items: CartItem[];
  isDrawerOpen: boolean;
  itemCount: number;
  subtotal: number;
  freeShippingThreshold: number;
  amountToFreeShipping: number;
  atelierNote: string;
  setAtelierNote: (note: string) => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  addItem: (item: AddToCartInput) => void;
  addMultipleItems: (items: AddToCartInput[]) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  removeItem: (cartItemId: string) => void;
  clearCart: () => void;
}

const STORAGE_KEY = "forme-studio-cart-v1";
const FREE_SHIPPING_THRESHOLD = 450;

const CartContext = createContext<CartContextValue | null>(null);

function buildCartItemId(productId: string, config: CartConfiguration): string {
  const customKey = config.customImageUrl
    ? config.customImageUrl.slice(-24)
    : "std";
  return `${productId}__${config.finishId}__${config.sizeId}__${config.matId}__${config.glazingId}__${customKey}`;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [atelierNote, setAtelierNote] = useState("");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed.items)) setItems(parsed.items);
        if (typeof parsed.atelierNote === "string") {
          setAtelierNote(parsed.atelierNote);
        }
      }
    } catch {
      // Ignore malformed localStorage
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ items, atelierNote })
      );
    } catch {
      // Handle storage quota gracefully
    }
  }, [items, atelierNote, hydrated]);

  const openDrawer = useCallback(() => setIsDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setIsDrawerOpen(false), []);

  const mergeItems = useCallback(
    (prev: CartItem[], incoming: AddToCartInput[]): CartItem[] => {
      let next = [...prev];
      for (const input of incoming) {
        const cartItemId = buildCartItemId(input.productId, input.config);
        const existingIndex = next.findIndex(
          (item) => item.cartItemId === cartItemId
        );
        if (existingIndex >= 0) {
          next[existingIndex] = {
            ...next[existingIndex],
            quantity: next[existingIndex].quantity + (input.quantity ?? 1),
          };
        } else {
          next = [
            ...next,
            {
              cartItemId,
              productId: input.productId,
              slug: input.slug,
              title: input.title,
              isBespoke: input.isBespoke,
              unitPrice: input.unitPrice,
              quantity: input.quantity ?? 1,
              thumbnail: input.thumbnail,
              config: input.config,
            },
          ];
        }
      }
      return next;
    },
    []
  );

  const addItem = useCallback(
    (input: AddToCartInput) => {
      setItems((prev) => mergeItems(prev, [input]));
      setIsDrawerOpen(true);
    },
    [mergeItems]
  );

  const addMultipleItems = useCallback(
    (incoming: AddToCartInput[]) => {
      setItems((prev) => mergeItems(prev, incoming));
      setIsDrawerOpen(true);
    },
    [mergeItems]
  );

  const updateQuantity = useCallback((cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.cartItemId === cartItemId ? { ...item, quantity } : item
      )
    );
  }, []);

  const removeItem = useCallback((cartItemId: string) => {
    setItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    setAtelierNote("");
  }, []);

  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0),
    [items]
  );

  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  return (
    <CartContext.Provider
      value={{
        items,
        isDrawerOpen,
        itemCount,
        subtotal,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        amountToFreeShipping,
        atelierNote,
        setAtelierNote,
        openDrawer,
        closeDrawer,
        addItem,
        addMultipleItems,
        updateQuantity,
        removeItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
