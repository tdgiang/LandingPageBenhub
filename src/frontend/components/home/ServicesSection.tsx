"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Package, Truck, Users, Moon, ArrowRight } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";

const services = [
  {
    number: "01",
    icon: Package,
    title: "Giao hàng VLXD",
    description:
      "Xi măng, sắt thép, gạch, cát đá – giao tận công trình. Đảm bảo nguyên vẹn, đúng số lượng.",
    href: "/dich-vu#giao-hang",
    color: "from-orange-500/20 to-red-500/10",
  },
  {
    number: "02",
    icon: Truck,
    title: "Điều phối xe tải",
    description:
      "Fleet 500kg → 15 tấn, xe bạt/kín, GPS realtime. Điều phối trong 30 phút, hoạt động 24/7.",
    href: "/dich-vu#dieu-phoi",
    color: "from-blue-500/20 to-cyan-500/10",
  },
  {
    number: "03",
    icon: Users,
    title: "Dịch vụ bốc xếp",
    description:
      "Đội bốc xếp chuyên nghiệp, bảo hiểm hàng hoá toàn hành trình. Hỗ trợ máy móc khi cần.",
    href: "/dich-vu#boc-xep",
    color: "from-emerald-500/20 to-teal-500/10",
  },
  {
    number: "04",
    icon: Moon,
    title: "Giao ngoài giờ",
    description:
      "Ca đêm 22:00–06:00 & cuối tuần theo tiến độ công trình. Phụ thu cố định 20%, minh bạch.",
    href: "/dich-vu#ca-dem",
    color: "from-violet-500/20 to-purple-500/10",
  },
];

const ease = [0, 0, 0.2, 1] as const;

export default function ServicesSection() {
  return (
    <section className="bg-white py-20 lg:py-28 relative overflow-hidden">
      {/* Very subtle bg pattern */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#0f2340 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Dịch vụ"
          title="Giải pháp vận chuyển toàn diện cho ngành VLXD"
          subtitle="Từ giao hàng thông thường đến điều phối xe đặc biệt, chúng tôi có mọi giải pháp phù hợp với yêu cầu của bạn."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((svc, i) => {
            const Icon = svc.icon;
            return (
              <motion.div
                key={svc.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, ease, delay: i * 0.08 }}
                className="group relative bg-white rounded-2xl border border-border-soft p-6 flex flex-col overflow-hidden cursor-pointer
                  hover:-translate-y-2 transition-all duration-400"
                style={{
                  transition:
                    "transform 0.4s cubic-bezier(0,0,0.2,1), box-shadow 0.4s cubic-bezier(0,0,0.2,1)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 20px 60px -12px rgba(232,82,26,0.18), 0 4px 24px rgba(0,0,0,0.06)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "";
                }}
              >
                {/* Gradient top border — reveals on hover */}
                <div
                  className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl bg-gradient-to-r from-primary to-accent
                    scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                />

                {/* Number badge */}
                <span className="absolute top-5 right-5 font-heading font-bold text-[2rem] leading-none text-secondary/[0.05] select-none group-hover:text-primary/10 transition-colors duration-300">
                  {svc.number}
                </span>

                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${svc.color} flex items-center justify-center mb-5`}
                >
                  <Icon className="w-6 h-6 text-primary" />
                </div>

                {/* Text */}
                <h3 className="font-heading font-bold text-[1.2rem] text-secondary mb-2.5 leading-snug">
                  {svc.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed flex-1">
                  {svc.description}
                </p>

                {/* CTA */}
                <Link
                  href={svc.href}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-2.5 transition-all duration-300"
                >
                  Xem chi tiết
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
