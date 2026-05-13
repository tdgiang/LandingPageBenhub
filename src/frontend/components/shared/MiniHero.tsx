import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface MiniHeroProps {
  title: string;
  subtitle?: string;
  breadcrumb?: BreadcrumbItem[];
  dark?: boolean;
}

export default function MiniHero({
  title,
  subtitle,
  breadcrumb,
  dark = false,
}: MiniHeroProps) {
  return (
    <section
      className={cn(
        "pt-32 pb-16 lg:pt-36 lg:pb-20 relative overflow-hidden",
        dark ? "bg-secondary" : "bg-secondary"
      )}
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary to-black/40 pointer-events-none" />

      {/* Decorative accent */}
      <div className="absolute top-0 left-0 w-1 h-full bg-primary" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        {breadcrumb && breadcrumb.length > 0 && (
          <nav className="flex items-center gap-1.5 mb-4" aria-label="Breadcrumb">
            {breadcrumb.map((item, index) => (
              <span key={index} className="flex items-center gap-1.5">
                {index > 0 && (
                  <ChevronRight className="w-3.5 h-3.5 text-white/30" />
                )}
                {item.href ? (
                  <Link
                    href={item.href}
                    className="text-sm text-white/50 hover:text-white/80 transition-colors cursor-pointer"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-sm text-primary">{item.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}

        <h1 className="font-heading font-bold text-4xl lg:text-5xl text-white mb-4 max-w-3xl">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg text-white/65 max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
