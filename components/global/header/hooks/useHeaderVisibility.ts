import { useEffect, useRef, useState } from "react";

export function useHeaderVisibility() {
  const [visible, setVisible] = useState(true);
  const [isAtTop, setIsAtTop] = useState(true);
  const lastScrollY = useRef(0);
  const showHeaderTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const atTop = currentScrollY < 10;
      const atBottom = currentScrollY + windowHeight >= documentHeight - 10;

      setIsAtTop(atTop);

      if (atTop || atBottom) {
        setVisible(atTop);
        lastScrollY.current = currentScrollY;
        return;
      }

      if (showHeaderTimeout.current) {
        clearTimeout(showHeaderTimeout.current);
        showHeaderTimeout.current = null;
      }

      setVisible(currentScrollY < lastScrollY.current);
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (showHeaderTimeout.current) clearTimeout(showHeaderTimeout.current);
    };
  }, []);

  return { visible, isAtTop };
}
