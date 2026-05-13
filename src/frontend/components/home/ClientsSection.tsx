"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import { CLIENT_LOGOS, TESTIMONIALS } from "@/lib/data";

export default function ClientsSection() {
  return (
    <section className="bg-cream py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Khách hàng"
          title="Được tin dùng bởi các doanh nghiệp hàng đầu"
          subtitle="Hơn 500 đại lý VLXD, nhà thầu và cơ sở xây dựng đang sử dụng Benhub mỗi ngày."
        />

        {/* Logo grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16">
          {CLIENT_LOGOS.map((name, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.4 }}
              className="bg-white rounded-xl border border-border-soft h-16 flex items-center justify-center px-4 hover:border-primary/30 hover:shadow-sm transition-all duration-200 group cursor-pointer"
            >
              <span className="text-sm font-semibold text-muted group-hover:text-secondary transition-colors duration-200 text-center">
                {name}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white rounded-2xl border border-border-soft p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, idx) => (
                  <Star key={idx} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>

              <blockquote className="text-sm text-secondary leading-relaxed mb-5">
                &ldquo;{t.content}&rdquo;
              </blockquote>

              <div className="flex items-center gap-3 pt-4 border-t border-border-soft">
                <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                  <span className="font-heading font-bold text-secondary text-sm">
                    {t.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-secondary">{t.name}</p>
                  <p className="text-xs text-muted">
                    {t.role} – {t.company}
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
