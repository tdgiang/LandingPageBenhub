import type { Metadata } from "next";
import { Zap, Handshake, Eye, Lightbulb } from "lucide-react";
import MiniHero from "@/components/shared/MiniHero";
import SectionHeader from "@/components/shared/SectionHeader";

export const metadata: Metadata = {
  title: "Về chúng tôi",
  description:
    "Benhub – Nền tảng vận chuyển VLXD B2B hành đầu Việt Nam. Câu chuyện thành lập, sứ mệnh và đội ngũ.",
};

const timeline = [
  {
    year: "2022",
    title: "Thành lập",
    desc: "10 xe tải đầu tiên tại Hà Nội, phục vụ 20 khách hàng B2B.",
  },
  {
    year: "2023",
    title: "Mở rộng",
    desc: "100+ xe, phủ 10 tỉnh thành, ra mắt app điều phối đầu tiên.",
  },
  {
    year: "2024",
    title: "Bứt phá",
    desc: "Ra mắt nền tảng điều phối tự động, nhận giải thưởng Logistics B2B tiêu biểu.",
  },
  {
    year: "2025",
    title: "Toàn quốc",
    desc: "500+ khách hàng B2B, 50+ tỉnh thành, 1,200+ đối tác tài xế.",
  },
];

const values = [
  {
    icon: Zap,
    title: "Nhanh chóng",
    desc: "Điều phối xe trong 30 phút, giao hàng đúng tiến độ cam kết.",
  },
  {
    icon: Handshake,
    title: "Tin cậy",
    desc: "98% tỷ lệ đúng hạn, bảo hiểm hàng hóa toàn hành trình.",
  },
  {
    icon: Eye,
    title: "Minh bạch",
    desc: "GPS realtime, báo giá rõ ràng, không phát sinh chi phí ẩn.",
  },
  {
    icon: Lightbulb,
    title: "Đột phá",
    desc: "Ứng dụng công nghệ để tối ưu logistics ngành VLXD.",
  },
];

export default function VeChungToiPage() {
  return (
    <>
      <MiniHero
        title="Về Benhub"
        subtitle="Sứ mệnh của chúng tôi là đơn giản hóa logistics vật liệu xây dựng cho mọi doanh nghiệp Việt Nam."
        breadcrumb={[{ label: "Trang chủ", href: "/" }, { label: "Về chúng tôi" }]}
      />

      {/* Brand story */}
      <section className="bg-cream py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full bg-primary/10 text-primary mb-5">
                Câu chuyện của chúng tôi
              </span>
              <h2 className="font-heading font-bold text-3xl lg:text-4xl text-secondary mb-6 leading-tight">
                Từ 10 xe đến 1,200 đối tác tài xế
              </h2>
              <div className="space-y-4 text-base text-muted leading-relaxed">
                <p>
                  Benhub được thành lập năm 2022 với một bài toán đơn giản: Tại
                  sao việc thuê xe tải giao vật liệu xây dựng ở Việt Nam lại
                  phức tạp và tốn kém đến vậy?
                </p>
                <p>
                  Nhóm sáng lập, gồm những người từng làm trong ngành xây dựng
                  và logistics, quyết định xây dựng một nền tảng kết nối trực
                  tiếp giữa doanh nghiệp VLXD với đội xe tải chuyên nghiệp —
                  minh bạch, nhanh chóng và tin cậy.
                </p>
                <p>
                  Hôm nay, Benhub phục vụ 500+ khách hàng B2B trên 50 tỉnh
                  thành với hơn 10,000 chuyến giao hàng mỗi tháng. Và chúng
                  tôi vẫn đang tiếp tục lớn lên mỗi ngày.
                </p>
              </div>
            </div>
            <div className="rounded-2xl bg-gradient-to-br from-secondary to-slate-900 aspect-[4/3] flex items-center justify-center">
              <div className="text-center text-white/20">
                <div className="font-heading font-bold text-6xl mb-2">BH</div>
                <div className="text-sm tracking-widest">BENHUB TEAM</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-white py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader badge="Hành trình" title="Cột mốc phát triển" />

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border-soft" />

            <div className="space-y-8">
              {timeline.map((item, i) => (
                <div key={i} className="relative flex gap-6 items-start pl-16">
                  {/* Dot */}
                  <div className="absolute left-0 w-12 h-12 bg-white border-2 border-primary rounded-full flex items-center justify-center shrink-0">
                    <span className="font-heading font-bold text-primary text-xs">
                      {item.year.slice(2)}
                    </span>
                  </div>

                  <div className="flex-1 pb-2">
                    <div className="font-heading font-bold text-accent text-sm mb-1">
                      {item.year}
                    </div>
                    <h3 className="font-heading font-semibold text-xl text-secondary mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="bg-secondary py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Định hướng"
            title="Tầm nhìn & Sứ mệnh"
            light
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-accent mb-4">
                Tầm nhìn
              </span>
              <p className="text-white text-lg leading-relaxed">
                Trở thành nền tảng logistics vật liệu xây dựng B2B số 1 Đông
                Nam Á vào năm 2030, kết nối 10,000+ doanh nghiệp với 50,000+
                đối tác tài xế.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-accent mb-4">
                Sứ mệnh
              </span>
              <p className="text-white text-lg leading-relaxed">
                Đơn giản hóa logistics cho ngành VLXD — giúp mọi doanh nghiệp
                giao hàng nhanh hơn, rẻ hơn và minh bạch hơn thông qua công
                nghệ.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core values */}
      <section className="bg-cream py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader badge="Giá trị" title="Giá trị cốt lõi" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div
                  key={v.title}
                  className="bg-white rounded-2xl border border-border-soft p-6 text-center hover:border-primary/30 hover:shadow-sm transition-all"
                >
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-heading font-semibold text-xl text-secondary mb-2">
                    {v.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
