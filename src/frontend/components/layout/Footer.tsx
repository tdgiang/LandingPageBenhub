import Link from "next/link";
import { Truck, Share2, Link2, Phone, Mail, MapPin } from "lucide-react";

const footerSections = [
  {
    title: "Dịch vụ",
    links: [
      { label: "Giao hàng VLXD", href: "/dich-vu#giao-hang" },
      { label: "Điều phối xe tải", href: "/dich-vu#dieu-phoi" },
      { label: "Dịch vụ bốc xếp", href: "/dich-vu#boc-xep" },
      { label: "Giao ngoài giờ", href: "/dich-vu#ca-dem" },
    ],
  },
  {
    title: "Công ty",
    links: [
      { label: "Về chúng tôi", href: "/ve-chung-toi" },
      { label: "Khách hàng", href: "/khach-hang" },
      { label: "Tin tức", href: "/tin-tuc" },
      { label: "Tuyển dụng", href: "/tuyen-dung" },
    ],
  },
  {
    title: "Đối tác",
    links: [
      { label: "Trở thành tài xế", href: "/doi-tac" },
      { label: "Điều kiện đăng ký", href: "/doi-tac#dieu-kien" },
      { label: "Thu nhập & quyền lợi", href: "/doi-tac#quyen-loi" },
      { label: "Đăng ký ngay", href: "/doi-tac#form" },
    ],
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-secondary text-white overflow-hidden">
      {/* Subtle top glow line */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(232,82,26,0.4), rgba(245,166,35,0.3), transparent)" }}
      />
      {/* Bg dot grid */}
      <div className="dot-grid absolute inset-0 opacity-40 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-5">
              <div className="w-9 h-9 bg-primary rounded-md flex items-center justify-center">
                <Truck className="w-5 h-5 text-white" />
              </div>
              <span className="font-heading font-bold text-2xl tracking-widest">
                BENHUB
              </span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-sm">
              Nền tảng vận chuyển vật liệu xây dựng B2B hàng đầu Việt Nam. Kết
              nối đại lý, nhà thầu với đội xe tải chuyên nghiệp.
            </p>

            {/* Contact info */}
            <div className="flex flex-col gap-3 text-sm text-white/60">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <span>1800 6868 (miễn phí)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <span>contact@benhub.vn</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>Tầng 5, Tòa nhà ABC, 123 Đường Láng, Hà Nội</span>
              </div>
            </div>

            {/* Social */}
            <div className="flex gap-3 mt-6">
              <a
                href="#"
                aria-label="Facebook Benhub"
                className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-primary transition-colors duration-200 cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
              </a>
              <a
                href="#"
                aria-label="LinkedIn Benhub"
                className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-primary transition-colors duration-200 cursor-pointer"
              >
                <Link2 className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-heading font-semibold text-base tracking-wide mb-5 text-white">
                {section.title}
              </h3>
              <ul className="flex flex-col gap-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/60 hover:text-white transition-colors duration-200 cursor-pointer"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <p>© {currentYear} Benhub. Bảo lưu mọi quyền.</p>
          <div className="flex items-center gap-4">
            <Link href="#" className="hover:text-white/70 transition-colors">
              Chính sách bảo mật
            </Link>
            <Link href="#" className="hover:text-white/70 transition-colors">
              Điều khoản sử dụng
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
