"use client";

import { createContext, useContext, useEffect, useState } from "react";

type ViewportContextType = {
  width: number;
  height: number;
  isMobile: boolean;
};

const ViewportContext = createContext<ViewportContextType | null>(null);

export function ViewportProvider({ children }: { children: React.ReactNode }) {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };

    // Call handleResize initially to populate viewport dimensions on mount
    handleResize();

    // Listen to browser resize events to update width and height
    window.addEventListener("resize", handleResize);

    // Clean up event listener on unmount to prevent memory leaks
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <ViewportContext.Provider
      value={{
        width,
        height,
        isMobile: width <= 768,
      }}
    >
      {children}
    </ViewportContext.Provider>
  );
}

export function useViewport() {
  const context = useContext(ViewportContext);
  if (!context) {
    throw new Error("useViewport must be used inside ViewportProvider");
  }
  return context;
}
