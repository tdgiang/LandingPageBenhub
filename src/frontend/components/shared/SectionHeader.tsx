import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  light?: boolean;
}

export default function SectionHeader({
  badge,
  title,
  subtitle,
  align = "center",
  light = false,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-12",
        align === "center" ? "text-center" : "text-left"
      )}
    >
      {badge && (
        <span
          className={cn(
            "inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-4",
            light
              ? "bg-white/10 text-white/80"
              : "bg-primary/10 text-primary"
          )}
        >
          {badge}
        </span>
      )}
      <h2
        className={cn(
          "font-heading font-bold text-3xl lg:text-4xl leading-tight",
          light ? "text-white" : "text-secondary"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-4 text-base lg:text-lg leading-relaxed",
            align === "center" ? "max-w-2xl mx-auto" : "max-w-2xl",
            light ? "text-white/65" : "text-muted"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
