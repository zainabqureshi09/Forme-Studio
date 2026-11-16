import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  FRAME_FINISHES,
  FRAME_SIZES,
  GLAZING_OPTIONS,
  MAT_OPTIONS,
} from "@/src/data/catalog";
import type {
  FrameFinishId,
  FrameSizeId,
  GlazingId,
  MatOptionId,
} from "@/src/types/ecommerce";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function calculateConfiguredPrice(params: {
  basePrice: number;
  finishId: FrameFinishId;
  sizeId: FrameSizeId;
  matId: MatOptionId;
  glazingId: GlazingId;
}): number {
  const finish = FRAME_FINISHES.find((f) => f.id === params.finishId);
  const size = FRAME_SIZES.find((s) => s.id === params.sizeId);
  const mat = MAT_OPTIONS.find((m) => m.id === params.matId);
  const glazing = GLAZING_OPTIONS.find((g) => g.id === params.glazingId);

  return (
    params.basePrice +
    (finish?.priceDelta ?? 0) +
    (size?.priceDelta ?? 0) +
    (mat?.priceDelta ?? 0) +
    (glazing?.priceDelta ?? 0)
  );
}

export async function compressUploadedImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Could not read file."));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error("Invalid image file."));
      img.onload = () => {
        const maxDim = 900;
        let { width, height } = img;
        if (width > maxDim || height > maxDim) {
          const ratio = Math.min(maxDim / width, maxDim / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(reader.result as string);
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", 0.82));
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}
