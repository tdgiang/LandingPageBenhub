"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Package, Truck, Users, Moon, ArrowRight } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";

const services = [
  {
    icon: Package,
    title: "Giao hàng VLXD",
    description:
      "Xi măng, sắt thép, gạch, cát đá – giao tận công trình. Đảm bảo nguyên vẹn, đúng số lượng.",
    href: "/dich-vu#giao-hang",
  },
  {
    icon: Truck,
    title: "Điều phối xe tải",
    description:
      "Fleet 500kg → 15 tấn, xe bạt/kín, GPS realtime. Điều phối trong 30 phút, 24/7.",
    href: "/dich-vu#dieu-phoi",
  },
  {
    icon: Users,
    title: "Dịch vụ bốc xếp",
    description:
      "Đội bốc xếp chuyên nghiệp, bảo hiểm hàng hoá toàn hành trình. Hỗ trợ máy móc khi cần.",
    href: "/dich-vu#boc-xep",
  },
  {
    icon: Moon,
    title: "Giao ngoài giờ",
    description:
      "Ca đêm 22:00–06:00 & cuối tuần theo tiến độ công trình. Phụ thu cố định 20%, minh bạch.",
    href: "/dich-vu#ca-dem",
  },
];

const ease = [0, 0, 0.2, 1] as const;

const cardVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease, delay: i * 0.1 },
  }),
};

export default function ServicesSection() {
  return (
    <section className="bg-cream py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Dịch vụ"
          title="Giải pháp vận chuyển toàn diện cho ngành VLXD"
          subtitle="Từ giao hàng thông thường đến điều phối xe đặc biệt, chúng tôi có mọi giải pháp phù hợp với yêu cầu của bạn."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                custom={i}
                variants={cardVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="group bg-white rounded-2xl shadow-sm border border-border-soft border-l-4 border-l-primary p-6 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-xl text-secondary mb-3">
                  {service.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed flex-1">
                  {service.description}
                </p>
                <Link
                  href={service.href}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:gap-2.5 transition-all duration-200"
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
