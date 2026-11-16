import { useRef, type MouseEvent, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { cn } from "@/src/lib/utils";
import { AppLink } from "./AppLink";

interface MagneticButtonProps {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  variant?: "dark" | "outline" | "terracotta" | "ivory";
  strength?: number;
  className?: string;
}

export function MagneticButton({
  href,
  onClick,
  children,
  variant = "dark",
  strength = 0.25,
  className,
}: MagneticButtonProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const x = useSpring(rawX, { stiffness: 260, damping: 20, mass: 0.4 });
  const y = useSpring(rawY, { stiffness: 260, damping: 20, mass: 0.4 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!wrapperRef.current) return;
    const rect = wrapperRef.current.getBoundingClientRect();
    const offsetX = e.clientX - (rect.left + rect.width / 2);
    const offsetY = e.clientY - (rect.top + rect.height / 2);
    rawX.set(offsetX * strength);
    rawY.set(offsetY * strength);
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  const styles = {
    dark: "bg-charcoal text-ivory hover:bg-terracotta",
    outline:
      "border border-charcoal/30 text-charcoal hover:border-charcoal hover:bg-charcoal hover:text-ivory",
    terracotta: "bg-terracotta text-ivory hover:bg-charcoal",
    ivory: "bg-ivory text-charcoal hover:bg-terracotta hover:text-ivory",
  };

  const classes = cn(
    "inline-flex items-center justify-center gap-3 px-7 py-4 text-[11px] uppercase tracking-[0.22em] transition-colors duration-300 cursor-pointer select-none whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta",
    styles[variant],
    className
  );

  return (
    <motion.div
      ref={wrapperRef}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
    >
      {href ? (
        <AppLink href={href} className={classes}>
          {children}
        </AppLink>
      ) : (
        <button type="button" onClick={onClick} className={classes}>
          {children}
        </button>
      )}
    </motion.div>
  );
}
