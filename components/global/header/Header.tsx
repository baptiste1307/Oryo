"use client";

import MenuButton from "../menu/MenuButton";
import HeaderLogo from "./HeaderLogo";
import MobileMenu from "../menu/mobile/MobileMenu";
import { useEffect, useRef } from "react";
import { useViewport } from "@/context/ViewportContext";
import { useAuth } from "@/context/AuthContext";
import { useUI } from "@/context/UIContext";
import DesktopHeaderNav from "./DesktopHeaderNav";
import { useHeaderVisibility } from "./hooks/useHeaderVisibility";

export default function Header() {
  const { isMobile } = useViewport();
  const { user } = useAuth();
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const { mobileMenuOpen, setMobileMenuOpen } = useUI();
  const { visible, isAtTop } = useHeaderVisibility();

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!mobileMenuOpen) return;
      const target = event.target as HTMLElement;

      if (target.closest(".mobile-menu-panel")) return;

      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(target)
      ) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      className="header"
      style={{
        padding: isMobile ? "20px 16px 20px 30px" : "27px 50px",
        display: "flex",
        flexDirection: "column",
        transform: visible ? "translateY(0)" : "translateY(-110%)",
        background:
          isAtTop || mobileMenuOpen
            ? "var(--surface)"
            : "rgba(255,255,255,0.6)",
        borderBottom: mobileMenuOpen
          ? "1px solid var(--surface)"
          : "1px solid var(--border)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          position: "relative",
          zIndex: 1001,
        }}
      >
        <HeaderLogo />

        <div
          style={{
            display: "flex",
            gap: "24px",
          }}
        >
          {!isMobile && <DesktopHeaderNav userExists={Boolean(user)} />}
          <MenuButton mobileMenuRef={mobileMenuRef} />
        </div>
      </div>

      {isMobile && mobileMenuOpen && <MobileMenu />}
    </header>
  );
}
