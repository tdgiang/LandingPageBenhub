"use client";

import { motion } from "framer-motion";
import { Phone, Mail, Clock } from "lucide-react";
import ContactForm from "@/components/forms/ContactForm";

export default function ContactCTA() {
  return (
    <section id="lien-he" className="bg-secondary py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left — info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full bg-white/10 text-white/70 mb-5">
              Liên hệ
            </span>
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-white mb-5 leading-tight">
              Bắt đầu vận chuyển{" "}
              <span className="text-primary">ngay hôm nay</span>
            </h2>
            <p className="text-white/60 text-base leading-relaxed mb-8">
              Đội ngũ tư vấn của chúng tôi sẵn sàng hỗ trợ bạn tìm giải pháp
              vận chuyển phù hợp nhất. Liên hệ ngay để nhận báo giá trong 30
              phút.
            </p>

            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-white/40 uppercase tracking-wider">
                    Hotline
                  </p>
                  <p className="text-white font-semibold">1800 6868</p>
                  <p className="text-xs text-white/40">Miễn phí, 7:00–22:00</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-white/40 uppercase tracking-wider">
                    Email
                  </p>
                  <p className="text-white font-semibold">contact@benhub.vn</p>
                  <p className="text-xs text-white/40">Phản hồi trong 2 giờ</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-white/40 uppercase tracking-wider">
                    Giờ làm việc
                  </p>
                  <p className="text-white font-semibold">
                    Thứ 2 – Thứ 7: 7:00–22:00
                  </p>
                  <p className="text-xs text-white/40">
                    Chủ nhật: 8:00–17:00
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 lg:p-8"
          >
            <h3 className="font-heading font-semibold text-xl text-white mb-6">
              Gửi yêu cầu tư vấn
            </h3>
            <ContactForm light />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
