import type { Metadata } from "next";
import HeroBanner from "@/components/home/HeroBanner";
import ServicesSection from "@/components/home/ServicesSection";
import ProcessSection from "@/components/home/ProcessSection";
import StatsSection from "@/components/home/StatsSection";
import ClientsSection from "@/components/home/ClientsSection";
import ContactCTA from "@/components/home/ContactCTA";

export const metadata: Metadata = {
  title: "Benhub – Vận chuyển vật liệu xây dựng B2B",
  description:
    "Nền tảng vận chuyển VLXD B2B hàng đầu Việt Nam. 500+ khách hàng, phủ 50+ tỉnh thành, tỷ lệ đúng hạn 98%.",
};

export default function HomePage() {
  return (
    <>
      <HeroBanner />
      <ServicesSection />
      <ProcessSection />
      <StatsSection />
      <ClientsSection />
      <ContactCTA />
    </>
  );
}
