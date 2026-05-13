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
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isHome = pathname === "/";

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled || !isHome
          ? "bg-secondary/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
            <Truck className="w-5 h-5 text-white" />
          </div>
          <span className="font-heading font-bold text-xl tracking-widest text-white">
            BENHUB
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors duration-200 relative after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:bg-primary after:transition-all after:duration-200",
                pathname.startsWith(link.href)
                  ? "text-white after:w-full"
                  : "text-white/75 hover:text-white after:w-0 hover:after:w-full"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <Link
            href="/doi-tac"
            className="px-4 py-2 text-sm font-medium text-white border border-white/30 rounded-lg hover:bg-white/10 transition-colors duration-200 cursor-pointer"
          >
            Đăng ký đối tác
          </Link>
          <Link
            href="/#lien-he"
            className="px-4 py-2 text-sm font-semibold bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors duration-200 cursor-pointer"
          >
            Liên hệ tư vấn
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-white cursor-pointer"
          aria-label={open ? "Đóng menu" : "Mở menu"}
          aria-expanded={open}
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0, 0, 0.2, 1] }}
            className="md:hidden bg-secondary border-t border-white/10 overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "py-3 px-4 text-sm font-medium rounded-lg transition-colors duration-200 cursor-pointer",
                    pathname.startsWith(link.href)
                      ? "bg-primary/20 text-primary"
                      : "text-white/80 hover:bg-white/10 hover:text-white"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 flex flex-col gap-2 border-t border-white/10 mt-2">
                <Link
                  href="/doi-tac"
                  className="py-3 px-4 text-sm font-medium text-white border border-white/30 rounded-lg text-center hover:bg-white/10 transition-colors cursor-pointer"
                >
                  Đăng ký đối tác
                </Link>
                <Link
                  href="/#lien-he"
                  className="py-3 px-4 text-sm font-semibold bg-primary text-white rounded-lg text-center hover:bg-primary-dark transition-colors cursor-pointer"
                >
                  Liên hệ tư vấn
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
