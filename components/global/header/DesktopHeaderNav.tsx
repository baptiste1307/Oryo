"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import LanguageSwitcher from "@/components/global/LanguageSwitcher";

type DesktopHeaderNavProps = {
  userExists: boolean;
};

export default function DesktopHeaderNav({ userExists }: DesktopHeaderNavProps) {
  const { isMock } = useAuth();
  const { t } = useLanguage();

  return (
    <nav style={{ display: "flex", gap: "20px", alignItems: "center" }}>
      {isMock && (
        <span
          style={{
            fontSize: "11px",
            padding: "3px 9px",
            borderRadius: "9999px",
            background: "var(--accent-soft)",
            color: "var(--primary)",
            fontWeight: 700,
            border: "1px solid rgba(15, 118, 110, 0.25)",
            letterSpacing: "0.04em",
          }}
          title={t.nav.demoModeTooltip}
        >
          {t.nav.demoMode}
        </span>
      )}
      <Link className="nav-link" href="/">
        {t.nav.tools}
      </Link>
      {userExists && (
        <Link className="nav-link" href="/dashboard">
          {t.nav.dashboard}
        </Link>
      )}
      <LanguageSwitcher compact />
    </nav>
  );
}
