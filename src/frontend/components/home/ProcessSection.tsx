"use client";

import { motion } from "framer-motion";
import { ClipboardList, Truck, PackageCheck, Star } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";

const steps = [
  {
    number: "01",
    icon: ClipboardList,
    title: "Tạo yêu cầu",
    description:
      "Mô tả loại hàng, địa điểm và thời gian giao. Nhận báo giá ngay trong 5 phút.",
  },
  {
    number: "02",
    icon: Truck,
    title: "Điều phối xe",
    description:
      "Hệ thống tự động tìm xe phù hợp gần nhất và xác nhận tài xế với GPS tracking.",
  },
  {
    number: "03",
    icon: PackageCheck,
    title: "Giao hàng",
    description:
      "Tài xế giao đúng địa điểm, chụp ảnh xác nhận và cập nhật trạng thái thời gian thực.",
  },
  {
    number: "04",
    icon: Star,
    title: "Hoàn tất",
    description:
      "Nhận hóa đơn điện tử, đánh giá dịch vụ và tích điểm ưu đãi cho lần tiếp theo.",
  },
];

const ease = [0, 0, 0.2, 1] as const;

export default function ProcessSection() {
  return (
    <section className="bg-secondary py-20 lg:py-28 relative overflow-hidden">
      {/* Background layers */}
      <div className="dot-grid absolute inset-0 opacity-60" />
      <div className="absolute top-0 left-0 right-0 h-px divider-gradient" />
      <div className="absolute bottom-0 left-0 right-0 h-px divider-gradient" />
      <div className="absolute top-1/2 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Quy trình"
          title="4 bước – Đơn giản, Minh bạch"
          subtitle="Từ lúc đặt xe đến khi giao hàng thành công, toàn bộ quy trình chỉ vài cú click."
          light
        />

        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Connector line desktop */}
          <div className="hidden lg:block absolute top-14 left-[15%] right-[15%] h-px z-0 pointer-events-none"
            style={{ background: "linear-gradient(90deg, transparent, rgba(232,82,26,0.25), rgba(245,166,35,0.25), transparent)" }}
          />

          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, ease, delay: i * 0.1 }}
                className="relative z-10 glass-dark rounded-2xl p-6 flex flex-col items-center text-center group hover:border-primary/20 transition-colors duration-300"
              >
                {/* Large bg number */}
                <span className="absolute top-3 right-4 font-heading font-bold text-5xl leading-none text-white/[0.04] select-none">
                  {step.number}
                </span>

                {/* Icon circle */}
                <div className="relative mb-5">
                  <div className="w-[4.5rem] h-[4.5rem] rounded-2xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center group-hover:border-primary/25 group-hover:bg-primary/[0.07] transition-all duration-300">
                    <Icon className="w-7 h-7 text-accent" />
                  </div>
                  {/* Step number dot */}
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary flex items-center justify-center text-[0.6rem] font-bold text-white leading-none">
                    {i + 1}
                  </span>
                </div>

                <h3 className="font-heading font-bold text-[1.15rem] text-white mb-2.5 leading-tight">
                  {step.title}
                </h3>
                <p className="text-[0.8125rem] text-white/50 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
