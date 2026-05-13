"use client";

import { motion } from "framer-motion";
import { Phone, Mail, Clock, ArrowRight } from "lucide-react";
import ContactForm from "@/components/forms/ContactForm";

const contactItems = [
  {
    icon: Phone,
    label: "Hotline",
    value: "1800 6868",
    sub: "Miễn phí · 7:00–22:00 mỗi ngày",
  },
  {
    icon: Mail,
    label: "Email",
    value: "contact@benhub.vn",
    sub: "Phản hồi trong vòng 2 giờ",
  },
  {
    icon: Clock,
    label: "Giờ làm việc",
    value: "T2–T7: 7:00–22:00",
    sub: "Chủ nhật: 8:00–17:00",
  },
];

const ease = [0, 0, 0.2, 1] as const;

export default function ContactCTA() {
  return (
    <section id="lien-he" className="relative bg-secondary py-20 lg:py-28 overflow-hidden">
      {/* Bg layers */}
      <div className="dot-grid absolute inset-0 opacity-50" />
      <div className="absolute top-0 left-0 right-0 h-px divider-gradient" />
      <div className="absolute -top-40 -left-20 w-[500px] h-[500px] bg-primary/[0.07] rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
          >
            <span className="inline-flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.16em] px-3.5 py-1.5 rounded-full border border-white/15 bg-white/[0.06] text-white/60 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Liên hệ
            </span>

            <h2 className="font-heading font-bold text-3xl lg:text-[2.5rem] text-white mb-5 leading-[1.15] tracking-[-0.01em]">
              Bắt đầu vận chuyển{" "}
              <span className="text-gradient-primary">ngay hôm nay</span>
            </h2>
            <p className="text-white/55 text-[0.9375rem] leading-[1.75] mb-10 max-w-md">
              Đội ngũ tư vấn sẵn sàng giúp bạn tìm giải pháp phù hợp nhất. Liên
              hệ ngay để nhận báo giá trong 30 phút — hoàn toàn miễn phí.
            </p>

            <div className="flex flex-col gap-4 mb-10">
              {contactItems.map(({ icon: Icon, label, value, sub }) => (
                <div key={label} className="flex items-center gap-4 group">
                  <div className="w-11 h-11 rounded-xl glass-dark flex items-center justify-center shrink-0 border-primary/10 group-hover:bg-primary/15 group-hover:border-primary/20 transition-all duration-300">
                    <Icon className="w-4.5 h-4.5 text-primary" />
                  </div>
                  <div>
                    <p className="text-[0.68rem] text-white/35 uppercase tracking-widest mb-0.5">
                      {label}
                    </p>
                    <p className="text-white font-semibold text-sm">{value}</p>
                    <p className="text-[0.7rem] text-white/40 mt-0.5">{sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-3">
              {["Báo giá trong 30 phút", "Không ràng buộc hợp đồng", "Hỗ trợ 24/7"].map((badge) => (
                <span key={badge} className="inline-flex items-center gap-1.5 text-[0.7rem] font-medium text-white/50 bg-white/[0.04] border border-white/[0.07] rounded-full px-3 py-1.5">
                  <ArrowRight className="w-2.5 h-2.5 text-primary shrink-0" />
                  {badge}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right — Form card */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease, delay: 0.1 }}
          >
            <div className="glass-dark rounded-3xl border border-white/[0.08] p-7 lg:p-9 shadow-2xl shadow-black/30">
              {/* Form header */}
              <div className="flex items-center gap-3 mb-7 pb-6 border-b border-white/[0.07]">
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
                  <Mail className="w-4.5 h-4.5 text-white" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg text-white leading-tight">
                    Gửi yêu cầu tư vấn
                  </h3>
                  <p className="text-[0.7rem] text-white/45 mt-0.5">
                    Nhận phản hồi trong 30 phút
                  </p>
                </div>
              </div>
              <ContactForm light />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
