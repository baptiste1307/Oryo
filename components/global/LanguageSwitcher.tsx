"use client";

import { useLanguage } from "@/context/LanguageContext";
import { SupportedLanguage } from "@/lib/i18n";

interface LanguageSwitcherProps {
  compact?: boolean;
}

export default function LanguageSwitcher({ compact = false }: LanguageSwitcherProps) {
  const { language, setLanguage } = useLanguage();

  const handleSelect = (lang: SupportedLanguage) => {
    if (lang !== language) {
      setLanguage(lang);
    }
  };

  return (
    <div
      role="group"
      aria-label="Language selector"
      style={{
        display: "inline-flex",
        alignItems: "center",
        background: "rgba(0, 0, 0, 0.04)",
        border: "1px solid var(--border)",
        borderRadius: "9999px",
        padding: "2px",
        gap: "2px",
        userSelect: "none",
      }}
    >
      <button
        type="button"
        onClick={() => handleSelect("fr")}
        aria-pressed={language === "fr"}
        aria-label="Passer en Français"
        style={{
          border: "none",
          cursor: "pointer",
          borderRadius: "9999px",
          padding: compact ? "3px 9px" : "4px 12px",
          fontSize: compact ? "11px" : "12px",
          fontWeight: language === "fr" ? 700 : 500,
          color: language === "fr" ? "var(--text)" : "var(--muted)",
          background:
            language === "fr" ? "var(--surface)" : "transparent",
          boxShadow:
            language === "fr"
              ? "0 1px 3px rgba(0, 0, 0, 0.08)"
              : "none",
          transition: "all 0.15s ease",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          lineHeight: 1,
        }}
      >
        FR
      </button>

      <button
        type="button"
        onClick={() => handleSelect("en")}
        aria-pressed={language === "en"}
        aria-label="Switch to English"
        style={{
          border: "none",
          cursor: "pointer",
          borderRadius: "9999px",
          padding: compact ? "3px 9px" : "4px 12px",
          fontSize: compact ? "11px" : "12px",
          fontWeight: language === "en" ? 700 : 500,
          color: language === "en" ? "var(--text)" : "var(--muted)",
          background:
            language === "en" ? "var(--surface)" : "transparent",
          boxShadow:
            language === "en"
              ? "0 1px 3px rgba(0, 0, 0, 0.08)"
              : "none",
          transition: "all 0.15s ease",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          lineHeight: 1,
        }}
      >
        EN
      </button>
    </div>
  );
}
