import type { Metadata } from "next";
import Link from "next/link";
import { Package, Truck, Users, Moon, CheckCircle, ArrowRight } from "lucide-react";
import MiniHero from "@/components/shared/MiniHero";
import { SERVICES } from "@/lib/data";

export const metadata: Metadata = {
  title: "Dịch vụ vận chuyển VLXD",
  description:
    "Giao hàng vật liệu xây dựng nhanh, đúng hạn. Xe tải đa dạng 500kg–15 tấn. Điều phối 24/7. Phủ khắp toàn quốc.",
};

const iconMap: Record<string, React.ElementType> = {
  Package,
  Truck,
  Users,
  Moon,
};

export default function DichVuPage() {
  return (
    <>
      <MiniHero
        title="Dịch vụ vận chuyển VLXD"
        subtitle="Giải pháp logistics toàn diện cho ngành vật liệu xây dựng – từ giao nhận thông thường đến điều phối xe đặc biệt."
        breadcrumb={[{ label: "Trang chủ", href: "/" }, { label: "Dịch vụ" }]}
      />

      {/* Services */}
      <div className="bg-cream">
        {SERVICES.map((service, i) => {
          const Icon = iconMap[service.icon] || Package;
          const isEven = i % 2 === 0;

          return (
            <section
              key={service.id}
              id={
                service.id === "1"
                  ? "giao-hang"
                  : service.id === "2"
                  ? "dieu-phoi"
                  : service.id === "3"
                  ? "boc-xep"
                  : "ca-dem"
              }
              className={`py-16 lg:py-20 ${isEven ? "bg-cream" : "bg-white"}`}
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                    !isEven ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  {/* Image placeholder */}
                  <div className={!isEven ? "lg:order-2" : ""}>
                    <div className="rounded-2xl bg-gradient-to-br from-slate-200 to-slate-300 aspect-[4/3] flex items-center justify-center">
                      <Icon className="w-20 h-20 text-slate-400" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className={!isEven ? "lg:order-1" : ""}>
                    <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-5">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    <h2 className="font-heading font-bold text-3xl lg:text-4xl text-secondary mb-4">
                      {service.title}
                    </h2>
                    <p className="text-muted text-base leading-relaxed mb-6">
                      {service.description}
                    </p>

                    {/* Specs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                      {Object.entries(service.specs).map(([key, value]) => (
                        <div
                          key={key}
                          className="flex items-start gap-2.5 bg-cream rounded-lg px-4 py-3"
                        >
                          <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <span className="text-sm text-secondary">{value}</span>
                        </div>
                      ))}
                    </div>

                    <Link
                      href="/#lien-he"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors duration-200 cursor-pointer"
                    >
                      Yêu cầu tư vấn
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* CTA banner */}
      <section className="bg-secondary py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading font-bold text-3xl text-white mb-4">
            Chưa chắc dịch vụ nào phù hợp?
          </h2>
          <p className="text-white/60 mb-8">
            Chat với chuyên gia của chúng tôi – miễn phí, không ràng buộc.
          </p>
          <Link
            href="/#lien-he"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors duration-200 cursor-pointer"
          >
            Chat với chuyên gia ngay
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
