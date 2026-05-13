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
      "Hệ thống tự động tìm xe phù hợp gần nhất. Xác nhận tài xế và theo dõi GPS thời gian thực.",
  },
  {
    number: "03",
    icon: PackageCheck,
    title: "Giao hàng",
    description:
      "Tài xế giao hàng đúng địa điểm, chụp ảnh xác nhận và cập nhật trạng thái ngay lập tức.",
  },
  {
    number: "04",
    icon: Star,
    title: "Hoàn tất",
    description:
      "Nhận hóa đơn điện tử, đánh giá dịch vụ và tích điểm ưu đãi cho lần sử dụng tiếp theo.",
  },
];

export default function ProcessSection() {
  return (
    <section className="bg-secondary py-20 lg:py-28 relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Quy trình"
          title="4 bước – Đơn giản, Minh bạch"
          subtitle="Từ lúc đặt xe đến khi giao hàng thành công, toàn bộ quy trình chỉ vài cú click."
          light
        />

        {/* Steps */}
        <div className="relative">
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-0.5 bg-white/10 z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="relative mb-6">
                    <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-primary transition-colors">
                      <Icon className="w-8 h-8 text-accent" />
                    </div>
                    <span className="absolute -top-3 -right-3 font-heading font-bold text-4xl text-white/5 select-none leading-none">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="font-heading font-semibold text-xl text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm text-white/55 leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
