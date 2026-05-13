"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Truck, CheckCircle, MapPin, Clock } from "lucide-react";

const stats = [
  { value: "500+", label: "Khách hàng B2B" },
  { value: "50+", label: "Tỉnh thành" },
  { value: "98%", label: "Đúng hạn" },
];

const ease = [0, 0, 0.2, 1] as const;

const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease } },
};

const fadeRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease, delay: 0.2 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

export default function HeroBanner() {
  return (
    <section className="relative min-h-screen bg-secondary flex items-center overflow-hidden">
      {/* Grain texture */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />

      {/* Gradient accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left — Text */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="flex flex-col"
        >
          <motion.div variants={fadeUp}>
            <span className="inline-flex items-center gap-2 bg-primary/20 text-primary text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full mb-6">
              <Truck className="w-3.5 h-3.5" />
              Chuyên giao vật liệu xây dựng
            </span>
          </motion.div>

          <motion.h1
            variants={fadeLeft}
            className="font-heading font-bold text-5xl sm:text-6xl lg:text-7xl text-white leading-tight mb-6"
          >
            Vận chuyển VLXD{" "}
            <span className="text-primary block">Nhanh – Đúng – Chắc</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-white/65 text-lg leading-relaxed mb-8 max-w-lg"
          >
            Benhub kết nối đại lý VLXD, nhà thầu và cơ sở xây dựng với đội xe
            tải chuyên nghiệp 500kg–15 tấn. GPS realtime, bốc xếp chuyên
            nghiệp, giao đúng tiến độ.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mb-10">
            <Link
              href="/#lien-he"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors duration-200 cursor-pointer"
            >
              Liên hệ tư vấn ngay
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/doi-tac"
              className="inline-flex items-center gap-2 px-6 py-3.5 border-2 border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors duration-200 cursor-pointer"
            >
              Trở thành đối tác tài xế
            </Link>
          </motion.div>

          {/* Stats bar */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap gap-6 pt-8 border-t border-white/10"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span className="font-heading font-bold text-2xl text-accent">
                  {stat.value}
                </span>
                <span className="text-sm text-white/50">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right — Visual */}
        <motion.div
          variants={fadeRight}
          initial="hidden"
          animate="visible"
          className="relative"
        >
          {/* Main image placeholder */}
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-slate-700 to-slate-900 aspect-[4/3] flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent" />
            <div className="relative flex flex-col items-center gap-4 text-white/20">
              <Truck className="w-24 h-24" />
              <span className="text-sm font-medium uppercase tracking-widest">
                Xe tải tại công trình
              </span>
            </div>

            {/* Overlay details */}
            <div className="absolute bottom-4 left-4 right-4 grid grid-cols-2 gap-2">
              <div className="bg-black/40 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                <span className="text-xs text-white/80">GPS Realtime</span>
              </div>
              <div className="bg-black/40 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-accent shrink-0" />
                <span className="text-xs text-white/80">Điều phối 30 phút</span>
              </div>
            </div>
          </div>

          {/* Floating success card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="absolute -bottom-5 -left-5 bg-white rounded-xl shadow-2xl px-4 py-3 flex items-center gap-3 min-w-[200px]"
          >
            <div className="w-9 h-9 bg-green-100 rounded-full flex items-center justify-center shrink-0">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-xs font-semibold text-secondary">
                Đơn hàng vừa giao
              </p>
              <p className="text-xs text-muted">Đại lý Phú Thọ • 2 phút trước</p>
            </div>
          </motion.div>

          {/* Fleet indicator */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="absolute -top-4 -right-4 bg-primary text-white rounded-xl shadow-xl px-4 py-3"
          >
            <p className="text-xs font-medium opacity-80">Fleet sẵn sàng</p>
            <p className="font-heading font-bold text-xl">1,200+ xe</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
