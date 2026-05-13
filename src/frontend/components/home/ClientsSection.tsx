"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Image from "next/image";
import SectionHeader from "@/components/shared/SectionHeader";
import { CLIENT_LOGOS, TESTIMONIALS } from "@/lib/data";

const ease = [0, 0, 0.2, 1] as const;

export default function ClientsSection() {
  return (
    <section className="bg-cream py-20 lg:py-28 relative overflow-hidden">
      {/* Subtle top glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-border-soft to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Khách hàng"
          title="Được tin dùng bởi các doanh nghiệp hàng đầu"
          subtitle="Hơn 500 đại lý VLXD, nhà thầu và cơ sở xây dựng đang sử dụng Benhub mỗi ngày."
        />

        {/* Logo grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-16">
          {CLIENT_LOGOS.map((client, i) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.35, ease }}
              className="bg-white rounded-xl border border-border-soft h-[72px] flex items-center justify-center px-5
                hover:border-primary/25 hover:shadow-md hover:shadow-primary/5 hover:-translate-y-0.5
                transition-all duration-300 cursor-pointer group"
            >
              <Image
                src={client.logo}
                alt={`${client.name} logo`}
                width={220}
                height={72}
                unoptimized
                className="h-10 w-full max-w-[160px] object-contain opacity-70 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0"
              />
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, ease, delay: i * 0.1 }}
              className="relative bg-white rounded-2xl p-6 border border-border-soft border-l-[3px] border-l-primary
                shadow-sm hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-400 cursor-pointer overflow-hidden"
            >
              {/* Decorative quote mark */}
              <span className="absolute top-3 right-5 font-heading font-bold text-[4.5rem] leading-none text-primary/6 select-none pointer-events-none">
                &ldquo;
              </span>

              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, idx) => (
                  <Star key={idx} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>

              <blockquote className="text-[0.875rem] text-secondary/80 leading-[1.7] mb-5 relative">
                {t.content}
              </blockquote>

              <div className="flex items-center gap-3 pt-4 border-t border-border-soft">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-heading font-bold text-white text-sm"
                  style={{
                    background: "linear-gradient(135deg,#e8521a,#c94415)",
                  }}
                >
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-bold text-secondary leading-tight">
                    {t.name}
                  </p>
                  <p className="text-xs text-muted mt-0.5">
                    {t.role} · {t.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
