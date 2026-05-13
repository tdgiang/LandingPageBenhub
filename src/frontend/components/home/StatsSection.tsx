"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { Users, MapPin, TrendingUp, Clock } from "lucide-react";

const STATS = [
  {
    value: 500,
    suffix: "+",
    label: "Khách hàng B2B",
    sub: "Đại lý & nhà thầu",
    Icon: Users,
  },
  {
    value: 50,
    suffix: "+",
    label: "Tỉnh thành",
    sub: "Phủ sóng toàn quốc",
    Icon: MapPin,
  },
  {
    value: 10000,
    suffix: "+",
    label: "Chuyến/tháng",
    sub: "Và tăng trưởng mỗi ngày",
    Icon: TrendingUp,
  },
  {
    value: 98,
    suffix: "%",
    label: "Tỷ lệ đúng hạn",
    sub: "Cam kết không thất hứa",
    Icon: Clock,
  },
];

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const start = performance.now();
    const update = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(target * eased));
      if (progress < 1) requestAnimationFrame(update);
      else setValue(target);
    };
    requestAnimationFrame(update);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {value.toLocaleString("vi-VN")}
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  return (
    <section className="relative bg-secondary py-16 lg:py-20 overflow-hidden">
      {/* Background */}
      <div className="dot-grid absolute inset-0 opacity-50" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/[0.06] via-transparent to-transparent" />
      <div className="absolute top-0 left-0 right-0 h-px divider-gradient" />
      <div className="absolute bottom-0 left-0 right-0 h-px divider-gradient" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/[0.06]">
          {STATS.map(({ value, suffix, label, sub, Icon }) => (
            <div
              key={label}
              className="flex flex-col items-center text-center px-4 py-4 first:pl-0 last:pr-0 group"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <div
                className="font-heading font-bold text-4xl lg:text-5xl xl:text-[3.5rem] leading-none mb-2"
                style={{
                  background: "linear-gradient(135deg,#e8521a,#f5a623)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                <CountUp target={value} suffix={suffix} />
              </div>
              <p className="text-sm font-semibold text-white/85 mb-0.5">
                {label}
              </p>
              <p className="text-[0.7rem] text-white/35">{sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
