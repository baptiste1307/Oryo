"use client";

import { useViewport } from "@/context/ViewportContext";
import { useUI } from "@/context/UIContext";
import MobileMenuButton from "./mobile/MobileMenuButton";
import DesktopMenu from "./desktop/DesktopMenu";

export default function MenuButton({ mobileMenuRef }) {
  const { isMobile } = useViewport();
  const { mobileMenuOpen, setMobileMenuOpen } = useUI();

  return (
    <header>
      <nav>
        {isMobile ? (
          <div style={{ position: "relative" }} ref={mobileMenuRef}>
            <MobileMenuButton
              open={mobileMenuOpen}
              onToggle={() => setMobileMenuOpen((prev) => !prev)}
            />
          </div>
        ) : (
          <DesktopMenu />
        )}
      </nav>
    </header>
  );
}
