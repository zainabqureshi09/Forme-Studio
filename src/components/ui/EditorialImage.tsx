import { useState } from "react";
import { cn } from "@/src/lib/utils";

interface EditorialImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function EditorialImage({ src, alt, className }: EditorialImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={cn(
          "w-full h-full bg-beige flex flex-col items-center justify-center p-8 text-center",
          className
        )}
        role="img"
        aria-label={alt}
      >
        <div className="w-16 h-20 border border-charcoal/25 mb-3 flex items-center justify-center">
          <div className="w-8 h-10 bg-terracotta/30" />
        </div>
        <span className="font-serif italic text-sm text-charcoal/65">
          {alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={cn(
        "w-full h-full object-cover transition-transform duration-700 ease-out",
        className
      )}
    />
  );
}
