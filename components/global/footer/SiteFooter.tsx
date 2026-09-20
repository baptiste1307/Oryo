"use client";

import Link from "next/link";
import { siteConfig } from "@/lib/config/site";
import { useLanguage } from "@/context/LanguageContext";

export default function SiteFooter() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  const footerLinks = [
    { href: "/privacy", label: t.legal.privacy },
    { href: "/terms", label: t.legal.terms },
  ];

  return (
    <footer className="site-footer">
      <div className="site-footer-content">
        <span>
          © {siteConfig.name} {currentYear} · {t.legal.copyright}
        </span>
        <nav aria-label={t.nav.legalLinks}>
          {footerLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
