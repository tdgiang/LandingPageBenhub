"use client";

import { useState } from "react";
import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import MiniHero from "@/components/shared/MiniHero";
import { POSTS } from "@/lib/data";

const CATEGORIES = [
  { value: "all", label: "Tất cả" },
  { value: "company", label: "Tin công ty" },
  { value: "market", label: "Tin thị trường" },
  { value: "logistics", label: "Logistics" },
];

const CATEGORY_COLORS: Record<string, string> = {
  company: "bg-blue-100 text-blue-700",
  market: "bg-green-100 text-green-700",
  logistics: "bg-orange-100 text-orange-700",
};

export default function TinTucPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered =
    activeCategory === "all"
      ? POSTS
      : POSTS.filter((p) => p.category === activeCategory);

  return (
    <>
      <MiniHero
        title="Tin tức & Cập nhật"
        subtitle="Cập nhật mới nhất từ Benhub và ngành logistics vật liệu xây dựng."
        breadcrumb={[{ label: "Trang chủ", href: "/" }, { label: "Tin tức" }]}
      />

      <section className="bg-cream py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2 mb-10">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                  activeCategory === cat.value
                    ? "bg-primary text-white shadow-sm"
                    : "bg-white text-muted border border-border-soft hover:border-primary/30 hover:text-secondary"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Posts grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((post) => (
              <Link
                key={post.id}
                href={`/tin-tuc/${post.slug}`}
                className="group bg-white rounded-2xl border border-border-soft overflow-hidden hover:border-primary/30 hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col"
              >
                {/* Thumbnail placeholder */}
                <div className="aspect-video bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center relative overflow-hidden">
                  <div className="text-slate-400 text-3xl font-heading font-bold">
                    {post.categoryLabel.charAt(0)}
                  </div>
                  <span
                    className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full ${
                      CATEGORY_COLORS[post.category]
                    }`}
                  >
                    {post.categoryLabel}
                  </span>
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-heading font-semibold text-lg text-secondary mb-2 leading-snug group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed mb-4 flex-1">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-border-soft">
                    <div className="flex items-center gap-3 text-xs text-muted">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(post.publishedAt).toLocaleDateString("vi-VN")}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {post.readTime}
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-muted">
              Chưa có bài viết trong danh mục này.
            </div>
          )}
        </div>
      </section>
    </>
  );
}
