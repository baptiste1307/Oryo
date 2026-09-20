"use client";

import { createContext, useContext, useState } from "react";

type UIContextType = {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;

  spaceMenuOpen: boolean;
  setSpaceMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const UIContext = createContext<UIContextType | null>(null);

export function UIProvider({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [spaceMenuOpen, setSpaceMenuOpen] = useState(false);

  return (
    <UIContext.Provider
      value={{
        mobileMenuOpen,
        setMobileMenuOpen,
        spaceMenuOpen,
        setSpaceMenuOpen,
      }}
    >
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  const context = useContext(UIContext);

  if (!context) {
    throw new Error("useUI must be used inside UIProvider");
  }

  return context;
}
