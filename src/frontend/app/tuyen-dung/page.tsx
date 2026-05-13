import type { Metadata } from "next";
import { MapPin, Briefcase, DollarSign, CheckCircle } from "lucide-react";
import MiniHero from "@/components/shared/MiniHero";
import SectionHeader from "@/components/shared/SectionHeader";
import JobApplyForm from "@/components/forms/JobApplyForm";
import { JOBS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Tuyển dụng",
  description:
    "Gia nhập đội ngũ Benhub. Sales B2B, Điều phối Vận hành, Operations Specialist. Môi trường startup năng động.",
};

export default function TuyenDungPage() {
  return (
    <>
      <MiniHero
        title="Gia nhập đội ngũ Benhub"
        subtitle="Cùng chúng tôi xây dựng nền tảng logistics hàng đầu Việt Nam. Môi trường startup, cơ hội phát triển nhanh."
        breadcrumb={[{ label: "Trang chủ", href: "/" }, { label: "Tuyển dụng" }]}
      />

      {/* Jobs list */}
      <section className="bg-cream py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Vị trí tuyển dụng"
            title="Các vị trí đang tuyển"
            align="left"
          />

          <div className="flex flex-col gap-5">
            {JOBS.filter((j) => j.isActive).map((job) => (
              <details
                key={job.id}
                className="group bg-white rounded-2xl border border-border-soft hover:border-primary/30 transition-colors"
              >
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                      <Briefcase className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-xl text-secondary mb-1.5">
                        {job.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-muted">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Briefcase className="w-3.5 h-3.5" />
                          {job.type}
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSign className="w-3.5 h-3.5" />
                          {job.salary}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-primary font-medium text-sm hidden sm:block group-open:hidden">
                    Xem chi tiết
                  </div>
                  <div className="text-primary font-medium text-sm hidden sm:group-open:block">
                    Thu gọn
                  </div>
                </summary>

                <div className="px-6 pb-6 pt-0 border-t border-border-soft">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-5">
                    <div>
                      <p className="text-sm text-muted leading-relaxed mb-5">
                        {job.description}
                      </p>
                      <h4 className="font-semibold text-secondary mb-3 text-sm uppercase tracking-wide">
                        Yêu cầu
                      </h4>
                      <ul className="space-y-2">
                        {job.requirements.map((r, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-secondary">
                            <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                            {r}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-secondary mb-3 text-sm uppercase tracking-wide">
                        Quyền lợi
                      </h4>
                      <ul className="space-y-2">
                        {job.benefits.map((b, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-secondary">
                            <CheckCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Apply form */}
      <section id="apply-form" className="bg-white py-14 lg:py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Ứng tuyển"
            title="Nộp hồ sơ ứng tuyển"
            subtitle="Điền thông tin bên dưới, chúng tôi sẽ liên hệ trong vòng 3–5 ngày làm việc."
          />
          <div className="bg-cream rounded-2xl p-6 lg:p-8 border border-border-soft">
            <JobApplyForm />
          </div>
        </div>
      </section>
    </>
  );
}
