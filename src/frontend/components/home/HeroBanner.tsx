"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Truck, CheckCircle, MapPin, Clock, Zap } from "lucide-react";

const stats = [
  { value: "500+", label: "Khách hàng B2B", icon: "🏢" },
  { value: "50+", label: "Tỉnh thành", icon: "📍" },
  { value: "98%", label: "Đúng hạn", icon: "⚡" },
  { value: "30 phút", label: "Điều phối xe", icon: "🚛" },
];

const ease = [0, 0, 0.2, 1] as const;

const stagger = { visible: { transition: { staggerChildren: 0.1 } } };
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};
const fadeLeft = {
  hidden: { opacity: 0, x: -32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease } },
};
const fadeRight = {
  hidden: { opacity: 0, x: 32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease, delay: 0.15 } },
};

export default function HeroBanner() {
  return (
    <section className="relative min-h-screen bg-secondary flex items-center overflow-hidden">

      {/* ── Layered background ── */}
      {/* Dot grid */}
      <div className="dot-grid absolute inset-0 pointer-events-none" />

      {/* Orange glow orb – top right */}
      <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-primary/20 blur-[120px] pointer-events-none" />

      {/* Amber orb – bottom left */}
      <div className="absolute bottom-0 -left-20 w-[400px] h-[400px] rounded-full bg-accent/10 blur-[100px] pointer-events-none" />

      {/* Subtle diagonal sweep */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-55deg, #fff 0px, #fff 1px, transparent 1px, transparent 60px)",
        }}
      />

      {/* Top edge glow line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 lg:pt-32 lg:pb-24 grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center w-full">

        {/* ── Left: Text ── */}
        <motion.div variants={stagger} initial="hidden" animate="visible" className="flex flex-col">

          {/* Badge */}
          <motion.div variants={fadeUp} className="mb-7">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-[0.14em] border border-primary/30 bg-primary/[0.08] text-primary">
              <Zap className="w-3 h-3 fill-primary" />
              Nền tảng logistics VLXD B2B #1 Việt Nam
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1 variants={fadeLeft} className="font-heading font-bold leading-[1.05] mb-6">
            <span className="block text-5xl sm:text-6xl lg:text-[4.25rem] text-white mb-1">
              Vận chuyển VLXD
            </span>
            <span className="block text-5xl sm:text-6xl lg:text-[4.25rem] text-gradient-primary">
              Nhanh – Đúng – Chắc
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p variants={fadeUp} className="text-white/60 text-lg leading-[1.75] mb-9 max-w-[480px]">
            Benhub kết nối đại lý VLXD, nhà thầu với đội xe tải chuyên nghiệp
            500kg–15 tấn. GPS realtime · Bốc xếp chuyên nghiệp · Giao đúng tiến độ.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mb-10">
            <Link
              href="/#lien-he"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-primary text-white font-semibold rounded-xl shadow-glow-primary hover:bg-primary-dark hover:shadow-none transition-all duration-300 cursor-pointer text-sm"
            >
              Liên hệ tư vấn ngay
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/doi-tac"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 border border-white/20 text-white/85 font-semibold rounded-xl hover:bg-white/[0.07] hover:border-white/35 hover:text-white transition-all duration-300 cursor-pointer text-sm"
            >
              Trở thành đối tác tài xế
            </Link>
          </motion.div>

          {/* Stats pills */}
          <motion.div variants={fadeUp} className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {stats.map((s) => (
              <div
                key={s.label}
                className="glass-dark rounded-xl px-4 py-3 flex flex-col gap-0.5"
              >
                <span className="font-heading font-bold text-xl text-accent leading-none">
                  {s.value}
                </span>
                <span className="text-[0.7rem] text-white/45 leading-snug">{s.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Right: Visual card ── */}
        <motion.div
          variants={fadeRight}
          initial="hidden"
          animate="visible"
          className="relative lg:pl-8"
        >
          {/* Main card */}
          <div className="relative rounded-3xl overflow-hidden border border-white/[0.07] shadow-2xl shadow-black/50 aspect-[4/3]"
            style={{ background: "linear-gradient(145deg, #162a47 0%, #0a1a2e 100%)" }}
          >
            {/* Inner grid */}
            <div className="dot-grid absolute inset-0 opacity-50" />

            {/* Orange top glow */}
            <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-primary/15 to-transparent" />

            {/* Center illustration */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <div className="w-20 h-20 rounded-2xl bg-primary/15 border border-primary/20 flex items-center justify-center">
                <Truck className="w-10 h-10 text-primary/70" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/25">
                Xe tải chuyên dụng VLXD
              </span>
            </div>

            {/* Bottom overlay chips */}
            <div className="absolute bottom-4 left-4 right-4 grid grid-cols-2 gap-2">
              <div className="glass-dark rounded-lg px-3 py-2.5 flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                <div>
                  <p className="text-[0.68rem] text-white/40">Tracking</p>
                  <p className="text-xs text-white/85 font-medium">GPS Realtime</p>
                </div>
              </div>
              <div className="glass-dark rounded-lg px-3 py-2.5 flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-accent shrink-0" />
                <div>
                  <p className="text-[0.68rem] text-white/40">Điều phối</p>
                  <p className="text-xs text-white/85 font-medium">Trong 30 phút</p>
                </div>
              </div>
            </div>

            {/* Top-right badge */}
            <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-green-500/15 border border-green-500/25 rounded-full px-3 py-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[0.7rem] text-green-300 font-medium">Hệ thống hoạt động</span>
            </div>
          </div>

          {/* Floating delivery card */}
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.9, duration: 0.5, ease }}
            className="absolute -bottom-5 -left-4 glass-light rounded-2xl px-4 py-3.5 flex items-center gap-3 min-w-[210px] border border-white/80"
          >
            <div className="w-9 h-9 bg-green-100 rounded-full flex items-center justify-center shrink-0">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-xs font-bold text-secondary leading-tight">Đơn hàng vừa giao</p>
              <p className="text-[0.7rem] text-secondary/50 mt-0.5">Đại lý Phú Thọ · 2 phút trước</p>
            </div>
          </motion.div>

          {/* Floating fleet badge */}
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 1.1, duration: 0.5, ease }}
            className="absolute -top-4 -right-3 rounded-2xl px-5 py-3 text-white shadow-xl shadow-primary/40"
            style={{ background: "linear-gradient(135deg, #e8521a 0%, #c94415 100%)" }}
          >
            <p className="text-[0.68rem] font-medium text-white/75 uppercase tracking-wide">Fleet sẵn sàng</p>
            <p className="font-heading font-bold text-2xl leading-tight">1,200+ xe</p>
          </motion.div>

          {/* Decorative ring */}
          <div className="absolute -inset-4 rounded-[2rem] border border-white/[0.04] -z-10" />
        </motion.div>
      </div>
    </section>
  );
}
