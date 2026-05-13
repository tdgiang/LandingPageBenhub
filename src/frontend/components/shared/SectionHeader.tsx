import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  light?: boolean;
  gradient?: boolean;
}

export default function SectionHeader({
  badge,
  title,
  subtitle,
  align = "center",
  light = false,
  gradient = false,
}: SectionHeaderProps) {
  return (
    <div className={cn("mb-14", align === "center" ? "text-center" : "text-left")}>
      {/* Badge */}
      {badge && (
        <div className={cn("flex items-center gap-2 mb-5", align === "center" ? "justify-center" : "")}>
          <span
            className={cn(
              "inline-flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.16em] px-3.5 py-1.5 rounded-full border",
              light
                ? "border-white/15 bg-white/[0.07] text-white/70"
                : "border-primary/20 bg-primary/[0.07] text-primary"
            )}
          >
            <span
              className={cn(
                "w-1.5 h-1.5 rounded-full",
                light ? "bg-accent" : "bg-primary"
              )}
            />
            {badge}
          </span>
        </div>
      )}

      {/* Title */}
      <h2
        className={cn(
          "font-heading font-bold text-3xl lg:text-[2.5rem] leading-[1.15] tracking-[-0.01em]",
          gradient
            ? "text-gradient-primary"
            : light
            ? "text-white"
            : "text-secondary"
        )}
      >
        {title}
      </h2>

      {/* Decorative accent line */}
      {!light && (
        <div className={cn("mt-4 h-0.5 w-12 rounded-full bg-gradient-to-r from-primary to-accent",
          align === "center" ? "mx-auto" : ""
        )} />
      )}

      {/* Subtitle */}
      {subtitle && (
        <p
          className={cn(
            "mt-5 text-base lg:text-lg leading-[1.75]",
            align === "center" ? "max-w-2xl mx-auto" : "max-w-2xl",
            light ? "text-white/55" : "text-muted"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
