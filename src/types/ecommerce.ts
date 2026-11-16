export type ProductCategory =
  | "custom-frames"
  | "fine-art-prints"
  | "gallery-sets"
  | "floating-frames";

export type FrameFinishId =
  | "smoked-oak"
  | "natural-walnut"
  | "brushed-brass"
  | "gallery-black"
  | "raw-maple";

export type FrameSizeId = "8x10" | "16x20" | "24x36" | "30x40";

export type MatOptionId = "none" | "warm-cotton" | "linen-float";

export type GlazingId = "conservation-glass" | "museum-anti-reflective";

export interface FrameFinish {
  id: FrameFinishId;
  name: string;
  material: string;
  hex: string;
  accentHex: string;
  profileWidthMm: number;
  priceDelta: number;
}

export interface FrameSize {
  id: FrameSizeId;
  label: string;
  dimensionsIn: string;
  dimensionsCm: string;
  aspectClass: string;
  ratio: number;
  priceDelta: number;
}

export interface MatOption {
  id: MatOptionId;
  name: string;
  description: string;
  borderPx: number;
  colorHex: string;
  priceDelta: number;
}

export interface GlazingOption {
  id: GlazingId;
  name: string;
  uvRating: string;
  description: string;
  priceDelta: number;
}

export interface Product {
  id: string;
  slug: string;
  sku: string;
  title: string;
  subtitle: string;
  category: ProductCategory;
  categoryLabel: string;
  basePrice: number;
  defaultFinish: FrameFinishId;
  availableFinishes: FrameFinishId[];
  defaultSize: FrameSizeId;
  image: string;
  roomImage: string;
  artworkCaption: string;
  editionNote?: string;
  description: string;
  specs: {
    mouldingOrigin: string;
    archivalStandard: string;
    leadTime: string;
    hardware: string;
  };
  featured?: boolean;
  isNew?: boolean;
}

export interface CartConfiguration {
  finishId: FrameFinishId;
  sizeId: FrameSizeId;
  matId: MatOptionId;
  glazingId: GlazingId;
  customImageUrl?: string;
  customTitle?: string;
  wallBackdrop?: string;
}

export interface CartItem {
  cartItemId: string;
  productId: string;
  slug: string;
  title: string;
  isBespoke: boolean;
  unitPrice: number;
  quantity: number;
  thumbnail: string;
  config: CartConfiguration;
}

export interface GalleryWallPreset {
  id: string;
  name: string;
  subtitle: string;
  arrangement: "trio" | "diptych" | "quartet";
  totalPrice: number;
  frames: {
    title: string;
    artist: string;
    size: FrameSizeId;
    matId: MatOptionId;
    imageUrl: string;
    aspectClass: string;
  }[];
}

export interface CollectorReview {
  id: string;
  quote: string;
  author: string;
  role: string;
  location: string;
  commissionedPiece: string;
  outcomeMetric: string;
}
