import type { Metadata } from "next";
import Image from "next/image";
import { Star, CheckCircle } from "lucide-react";
import MiniHero from "@/components/shared/MiniHero";
import SectionHeader from "@/components/shared/SectionHeader";
import { CLIENT_LOGOS, TESTIMONIALS, CASE_STUDIES } from "@/lib/data";

export const metadata: Metadata = {
  title: "Khách hàng",
  description:
    "500+ doanh nghiệp đang tin dùng Benhub. Case studies thực tế và đánh giá từ khách hàng.",
};

export default function KhachHangPage() {
  return (
    <>
      <MiniHero
        title="Khách hàng của Benhub"
        subtitle="500+ đại lý VLXD, nhà thầu và cơ sở xây dựng đang tin dùng Benhub mỗi ngày."
        breadcrumb={[{ label: "Trang chủ", href: "/" }, { label: "Khách hàng" }]}
      />

      {/* Logo wall */}
      <section className="bg-cream py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Đối tác"
            title="Được tin dùng bởi các doanh nghiệp hàng đầu"
          />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[...CLIENT_LOGOS, ...CLIENT_LOGOS].slice(0, 16).map((client, i) => (
              <div
                key={`${client.name}-${i}`}
                className="group bg-white rounded-xl border border-border-soft h-20 flex items-center justify-center px-5 hover:border-primary/30 hover:shadow-sm transition-all duration-200"
              >
                <Image
                  src={client.logo}
                  alt={`${client.name} logo`}
                  width={220}
                  height={72}
                  unoptimized
                  className="h-11 w-full max-w-[170px] object-contain opacity-75 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case studies */}
      <section className="bg-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Case Study"
            title="Kết quả thực tế từ khách hàng"
            subtitle="Những con số không biết nói dối – đây là những gì Benhub đã giúp được."
          />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {CASE_STUDIES.map((cs) => (
              <div
                key={cs.id}
                className="rounded-2xl border border-border-soft p-6 hover:border-primary/30 hover:shadow-md transition-all duration-200"
              >
                <div className="mb-5">
                  <span className="text-xs font-semibold text-primary uppercase tracking-widest">
                    {cs.industry}
                  </span>
                  <h3 className="font-heading font-semibold text-xl text-secondary mt-1">
                    {cs.client}
                  </h3>
                </div>

                <div className="space-y-3 text-sm mb-5">
                  <div>
                    <span className="font-semibold text-secondary">Bài toán: </span>
                    <span className="text-muted">{cs.problem}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-secondary">Giải pháp: </span>
                    <span className="text-muted">{cs.solution}</span>
                  </div>
                </div>

                <div className="space-y-2 pt-4 border-t border-border-soft">
                  {cs.results.map((r, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                      <span className="text-sm text-secondary">{r}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-cream py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Đánh giá"
            title="Khách hàng nói gì về Benhub"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="bg-white rounded-2xl border border-border-soft p-6 shadow-sm"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
                <blockquote className="text-sm text-secondary leading-relaxed mb-5">
                  &ldquo;{t.content}&rdquo;
                </blockquote>
                <div className="flex items-center gap-3 pt-4 border-t border-border-soft">
                  <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                    <span className="font-heading font-bold text-secondary text-sm">
                      {t.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-secondary">{t.name}</p>
                    <p className="text-xs text-muted">
                      {t.role} – {t.company}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
