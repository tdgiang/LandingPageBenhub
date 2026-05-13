import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Calendar, Clock, ArrowLeft, ArrowRight } from "lucide-react";
import { POSTS } from "@/lib/data";
import ContactForm from "@/components/forms/ContactForm";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = POSTS.find((p) => p.slug === slug);
  if (!post) return { title: "Bài viết không tồn tại" };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

const CATEGORY_COLORS: Record<string, string> = {
  company: "bg-blue-100 text-blue-700",
  market: "bg-green-100 text-green-700",
  logistics: "bg-orange-100 text-orange-700",
};

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = POSTS.find((p) => p.slug === slug);

  if (!post) notFound();

  const related = POSTS.filter(
    (p) => p.category === post.category && p.id !== post.id
  ).slice(0, 3);

  return (
    <article className="pt-24">
      {/* Article header */}
      <header className="bg-secondary py-14 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/50 mb-6">
            <Link href="/" className="hover:text-white/80 transition-colors">
              Trang chủ
            </Link>
            <span>/</span>
            <Link href="/tin-tuc" className="hover:text-white/80 transition-colors">
              Tin tức
            </Link>
            <span>/</span>
            <span className="text-primary truncate max-w-xs">{post.title}</span>
          </nav>

          <span
            className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full mb-5 ${
              CATEGORY_COLORS[post.category]
            }`}
          >
            {post.categoryLabel}
          </span>

          <h1 className="font-heading font-bold text-3xl lg:text-5xl text-white leading-tight mb-6">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-white/50">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {new Date(post.publishedAt).toLocaleDateString("vi-VN", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </span>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Article body */}
        <div className="lg:col-span-2">
          {/* Lead */}
          <div className="bg-cream rounded-2xl p-6 mb-8 border-l-4 border-primary">
            <p className="text-base leading-relaxed text-secondary font-medium">
              {post.excerpt}
            </p>
          </div>

          {/* Content placeholder */}
          <div className="prose max-w-none space-y-5">
            {[1, 2, 3, 4].map((i) => (
              <div key={i}>
                {i === 2 && (
                  <h2 className="font-heading font-bold text-2xl text-secondary mt-8 mb-4">
                    Những điểm nổi bật trong bài viết
                  </h2>
                )}
                <p className="text-base text-secondary leading-relaxed">
                  {post.excerpt} Nội dung chi tiết đang được biên soạn bởi đội
                  ngũ chuyên gia Benhub với các số liệu thực tế từ hơn 500
                  khách hàng và 1,200 tài xế trên toàn hệ thống.
                </p>
              </div>
            ))}
          </div>

          {/* Back */}
          <Link
            href="/tin-tuc"
            className="inline-flex items-center gap-2 mt-10 text-sm font-medium text-primary hover:underline cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Quay lại danh sách tin tức
          </Link>
        </div>

        {/* Sidebar */}
        <aside className="flex flex-col gap-6">
          {/* CTA */}
          <div className="bg-secondary rounded-2xl p-6 text-white">
            <h3 className="font-heading font-semibold text-lg mb-3">
              Cần tư vấn?
            </h3>
            <p className="text-sm text-white/60 mb-5">
              Liên hệ với chuyên gia Benhub để nhận giải pháp phù hợp.
            </p>
            <ContactForm light />
          </div>
        </aside>
      </div>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="bg-cream py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading font-bold text-2xl text-secondary mb-8">
              Bài viết liên quan
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((p) => (
                <Link
                  key={p.id}
                  href={`/tin-tuc/${p.slug}`}
                  className="group bg-white rounded-2xl border border-border-soft p-5 hover:border-primary/30 hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col gap-3"
                >
                  <h3 className="font-heading font-semibold text-base text-secondary leading-snug group-hover:text-primary transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-xs text-muted line-clamp-2 flex-1">{p.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-muted pt-3 border-t border-border-soft">
                    <span>{new Date(p.publishedAt).toLocaleDateString("vi-VN")}</span>
                    <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
