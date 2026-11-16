import { cn } from "@/src/lib/utils";

interface SectionLabelProps {
  index: string;
  label: string;
  className?: string;
}

export function SectionLabel({ index, label, className }: SectionLabelProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-charcoal/65",
        className
      )}
    >
      <span className="font-medium tabular-nums text-terracotta">{index}</span>
      <span className="w-6 h-[1px] bg-charcoal/25" aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}
