import Link from "next/link";
import { useUI } from "@/context/UIContext";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { useRouter } from "next/navigation";
import { ArrowUpRight, LogOut } from "lucide-react";
import MobileMenuLink from "./MobileMenuLink";
import LanguageSwitcher from "@/components/global/LanguageSwitcher";

export default function MobileMenu() {
  const { setMobileMenuOpen } = useUI();
  const router = useRouter();
  const { user, signOut, isMock } = useAuth();
  const { t, isFrench } = useLanguage();

  const logout = async () => {
    await signOut();
    setMobileMenuOpen(false);
    router.replace("/");
  };

  const links = [
    {
      href: "/dashboard",
      title: t.nav.dashboard,
      description: isFrench ? "Vos devis et calculs" : "Your quotes and calculations",
      type: "auth",
    },
    {
      href: "/compte",
      title: t.nav.account,
      description: isFrench ? "Profil et préférences" : "Profile and preferences",
      type: "auth",
    },
    {
      href: "/",
      title: t.nav.tools,
      description: isFrench ? "Créer, calculer, structurer" : "Create, calculate, organize",
      type: "all",
    },
  ];
  const visibleLinks = links.filter((link) =>
    user
      ? link.type === "auth" || link.type === "all"
      : link.type === "public" || link.type === "all",
  );

  return (
    <div
      className="mobile-menu-panel"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        width: "100vw",
        minHeight: "100svh",
        height: "100dvh",
        boxSizing: "border-box",
        overflowY: "auto",
        background: "var(--surface)",
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        justifyContent: "flex-start",
        gap: "22px",
        marginTop: "50px",
        padding: "110px 20px max(32px, env(safe-area-inset-bottom)) 50px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
        <LanguageSwitcher />
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
      </div>

      {user ? (
        <>
          <nav className="mobile-menu-links">
            {visibleLinks.map((link, index) => (
              <MobileMenuLink
                key={link.href}
                link={link}
                index={index}
                onClick={() => setMobileMenuOpen(false)}
              />
            ))}
          </nav>

          <button
            className="button-secondary mobile-menu-logout"
            onClick={logout}
            style={{ animationDelay: `${visibleLinks.length * 70}ms` }}
          >
            <span>{t.auth.logout}</span>
            <LogOut size={19} />
          </button>
        </>
      ) : (
        <>
          <nav className="mobile-menu-links">
            {visibleLinks.map((link, index) => (
              <MobileMenuLink
                key={link.href}
                link={link}
                index={index}
                onClick={() => setMobileMenuOpen(false)}
              />
            ))}
          </nav>

          <div className="mobile-menu-actions">
            {[
              { href: "/connexion", title: t.auth.loginButton, variant: "primary" },
              {
                href: "/inscription",
                title: t.auth.signupButton,
                variant: "secondary",
              },
            ].map((action, index) => (
              <Link
                key={action.href}
                className={`button-${action.variant} mobile-menu-auth-button`}
                href={action.href}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  animationDelay: `${(visibleLinks.length + index) * 70}ms`,
                  width: "fit-content",
                }}
              >
                <span>{action.title}</span>
                <ArrowUpRight size={19} />
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
