import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface MiniHeroProps {
  title: string;
  subtitle?: string;
  breadcrumb?: BreadcrumbItem[];
}

export default function MiniHero({ title, subtitle, breadcrumb }: MiniHeroProps) {
  return (
    <section className="relative bg-secondary pt-28 pb-14 lg:pt-32 lg:pb-16 overflow-hidden">
      {/* Background layers */}
      <div className="dot-grid absolute inset-0 opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary to-black/30 pointer-events-none" />
      <div className="absolute -top-20 right-0 w-[400px] h-[400px] bg-primary/[0.08] rounded-full blur-[100px] pointer-events-none" />

      {/* Left accent bar */}
      <div className="absolute top-0 left-0 w-[3px] h-full"
        style={{ background: "linear-gradient(180deg, transparent, #e8521a 30%, #f5a623 70%, transparent)" }}
      />

      {/* Top edge */}
      <div className="absolute top-0 left-0 right-0 h-px divider-gradient" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        {breadcrumb && breadcrumb.length > 0 && (
          <nav className="flex items-center gap-1.5 mb-5" aria-label="Breadcrumb">
            {breadcrumb.map((item, i) => (
              <span key={i} className="flex items-center gap-1.5">
                {i > 0 && <ChevronRight className="w-3 h-3 text-white/25" />}
                {item.href ? (
                  <Link
                    href={item.href}
                    className="text-[0.8rem] text-white/45 hover:text-white/75 transition-colors cursor-pointer"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-[0.8rem] text-primary font-medium">{item.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}

        <h1 className="font-heading font-bold text-4xl lg:text-5xl text-white mb-4 max-w-3xl leading-[1.1] tracking-[-0.01em]">
          {title}
        </h1>

        {/* Accent underline */}
        <div className="w-16 h-[3px] rounded-full mb-5" style={{ background: "linear-gradient(90deg,#e8521a,#f5a623)" }} />

        {subtitle && (
          <p className="text-[0.9375rem] text-white/55 max-w-xl leading-[1.75]">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
