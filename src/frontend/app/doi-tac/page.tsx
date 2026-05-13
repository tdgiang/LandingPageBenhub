import type { Metadata } from "next";
import { DollarSign, Package, Shield, CheckCircle } from "lucide-react";
import MiniHero from "@/components/shared/MiniHero";
import SectionHeader from "@/components/shared/SectionHeader";
import PartnerForm from "@/components/forms/PartnerForm";

export const metadata: Metadata = {
  title: "Trở thành đối tác tài xế",
  description:
    "Kiếm thu nhập ổn định 5–20 triệu/tháng. Đơn B2B ổn định, đăng ký online, duyệt 24h.",
};

const benefits = [
  {
    icon: DollarSign,
    title: "Thu nhập hấp dẫn",
    value: "5 – 20 triệu/tháng",
    description: "Thu nhập ổn định từ hệ thống đơn B2B lặp lại, không phụ thuộc mùa vụ.",
  },
  {
    icon: Package,
    title: "Đơn hàng B2B ổn định",
    value: "50+ đơn/tháng",
    description: "Kết nối trực tiếp với doanh nghiệp, đơn hàng định kỳ, không phải tìm kiếm.",
  },
  {
    icon: Shield,
    title: "Đăng ký đơn giản",
    value: "Duyệt trong 24h",
    description: "Điền form online, xác minh hồ sơ và bắt đầu nhận đơn ngay ngày hôm sau.",
  },
];

const requirements = [
  {
    category: "Loại xe",
    items: [
      "Xe tải 500kg, 1 tấn, 2.5 tấn",
      "Xe tải 5 tấn, 10 tấn, 15 tấn",
      "Xe bạt, xe kín đều được chấp nhận",
      "Xe phải còn trong hạn đăng kiểm",
    ],
  },
  {
    category: "Hồ sơ cần có",
    items: [
      "CMND/CCCD còn hiệu lực",
      "Bằng lái xe phù hợp tải trọng",
      "Đăng ký xe + bảo hiểm xe",
      "Không có tiền án, tiền sự",
    ],
  },
];

export default function DoiTacPage() {
  return (
    <>
      <MiniHero
        title="Kiếm thu nhập ổn định cùng Benhub"
        subtitle="Tham gia mạng lưới tài xế Benhub – nhận đơn B2B ổn định, thu nhập hấp dẫn, hỗ trợ 24/7."
        breadcrumb={[{ label: "Trang chủ", href: "/" }, { label: "Đối tác" }]}
      />

      {/* Benefits */}
      <section id="quyen-loi" className="bg-cream py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Quyền lợi"
            title="Tại sao nên trở thành đối tác Benhub?"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {benefits.map((b) => {
              const Icon = b.icon;
              return (
                <div
                  key={b.title}
                  className="bg-white rounded-2xl border border-border-soft p-8 hover:border-primary/30 hover:shadow-md transition-all duration-200 text-center"
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <div className="font-heading font-bold text-3xl text-primary mb-1">
                    {b.value}
                  </div>
                  <h3 className="font-heading font-semibold text-xl text-secondary mb-3">
                    {b.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">{b.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section id="dieu-kien" className="bg-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Điều kiện"
            title="Điều kiện tham gia"
            subtitle="Yêu cầu đơn giản – chúng tôi tìm kiếm đối tác chuyên nghiệp và có tâm."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {requirements.map((req) => (
              <div
                key={req.category}
                className="rounded-2xl border border-border-soft p-6"
              >
                <h3 className="font-heading font-semibold text-lg text-secondary mb-4 pb-3 border-b border-border-soft">
                  {req.category}
                </h3>
                <ul className="space-y-3">
                  {req.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm text-secondary">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section id="form" className="bg-cream py-16 lg:py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Đăng ký"
            title="Đăng ký trở thành đối tác"
            subtitle="Điền form dưới đây. Chúng tôi sẽ liên hệ xác nhận trong vòng 24 giờ."
          />
          <div className="bg-white rounded-2xl border border-border-soft p-6 lg:p-8 shadow-sm">
            <PartnerForm />
          </div>
        </div>
      </section>
    </>
  );
}
