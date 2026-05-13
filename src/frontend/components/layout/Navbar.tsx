"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Truck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/dich-vu", label: "Dịch vụ" },
  { href: "/khach-hang", label: "Khách hàng" },
  { href: "/doi-tac", label: "Đối tác" },
  { href: "/tin-tuc", label: "Tin tức" },
  { href: "/ve-chung-toi", label: "Về chúng tôi" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const isHome = pathname === "/";
  const solidBg = scrolled || !isHome;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-4 pt-4">
      <header className="max-w-7xl mx-auto">
        <nav
          className={cn(
            "rounded-2xl px-5 h-14 flex items-center justify-between transition-all duration-500",
            solidBg
              ? "bg-secondary/90 backdrop-blur-xl border border-white/[0.08] shadow-2xl shadow-black/40"
              : "bg-white/[0.04] backdrop-blur-md border border-white/[0.08]"
          )}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-lg shadow-primary/30 group-hover:shadow-primary/50 transition-shadow duration-300">
              <Truck className="w-4.5 h-4.5 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-heading font-bold text-[1.1rem] tracking-[0.18em] text-white">
              BENHUB
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative px-3 py-1.5 text-[0.8125rem] font-medium rounded-lg transition-all duration-200",
                    active
                      ? "text-white bg-white/10"
                      : "text-white/65 hover:text-white hover:bg-white/[0.07]"
                  )}
                >
                  {link.label}
                  {active && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-lg bg-white/10 -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-2 shrink-0">
            <Link
              href="/doi-tac"
              className="px-4 py-2 text-[0.8125rem] font-medium text-white/80 border border-white/15 rounded-lg hover:border-white/30 hover:text-white hover:bg-white/[0.07] transition-all duration-200 cursor-pointer"
            >
              Đăng ký đối tác
            </Link>
            <Link
              href="/#lien-he"
              className="px-4 py-2 text-[0.8125rem] font-semibold bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors duration-200 cursor-pointer shadow-lg shadow-primary/25 hover:shadow-primary/40"
            >
              Liên hệ tư vấn
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden w-9 h-9 flex items-center justify-center text-white/80 hover:text-white rounded-lg hover:bg-white/10 transition-all duration-200 cursor-pointer"
            aria-label={open ? "Đóng menu" : "Mở menu"}
            aria-expanded={open}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="mt-2 rounded-2xl overflow-hidden bg-secondary/95 backdrop-blur-xl border border-white/[0.08] shadow-2xl shadow-black/40"
            >
              <div className="p-3 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "py-3 px-4 text-sm font-medium rounded-xl transition-all duration-200 cursor-pointer",
                      pathname.startsWith(link.href)
                        ? "bg-primary/15 text-primary"
                        : "text-white/70 hover:bg-white/[0.07] hover:text-white"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-2 pb-1 flex flex-col gap-2 border-t border-white/[0.08] mt-1 px-1">
                  <Link
                    href="/doi-tac"
                    className="py-3 px-4 text-sm font-medium text-white/80 border border-white/15 rounded-xl text-center hover:bg-white/[0.07] hover:text-white transition-all cursor-pointer"
                  >
                    Đăng ký đối tác
                  </Link>
                  <Link
                    href="/#lien-he"
                    className="py-3 px-4 text-sm font-semibold bg-primary text-white rounded-xl text-center hover:bg-primary-dark transition-colors cursor-pointer"
                  >
                    Liên hệ tư vấn
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </div>
  );
}
