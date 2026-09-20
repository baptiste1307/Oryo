import { useAuth } from "@/context/AuthContext";
import { useQuote } from "@/context/QuoteContext";
import type { Quote } from "@/context/quote/quoteTypes";
import { getProfile, type Profile } from "@/lib/profiles";
import { useCallback, useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { templateAlignments, templateLayouts } from "./customizerConfig";
import {
  getQuotePageContentBounds,
  type LayoutSection,
} from "../pdfPreviewUtils";

const RECENT_COLORS_KEY = "oryo_recent_quote_colors";

function readRecentColors() {
  try {
    return JSON.parse(window.localStorage.getItem(RECENT_COLORS_KEY) || "[]") as string[];
  } catch {
    return [];
  }
}

export function useQuoteCustomizer() {
  const { quote, setQuote, setGenerated } = useQuote();
  const { user } = useAuth();
  const colorInputRef = useRef<HTMLInputElement | null>(null);
  const previewElementRef = useRef<HTMLDivElement | null>(null);
  const previewObserverRef = useRef<ResizeObserver | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [previewHeight, setPreviewHeight] = useState<number | null>(null);
  const [recentColors, setRecentColors] = useState<string[]>([]);
  const isPremium = true; // Fully unlocked in free open-source edition

  useEffect(() => {
    setRecentColors(readRecentColors());
  }, []);

  useEffect(() => {
    if (!user) return;
    async function loadProfile() {
      if (!user) return;
      setProfile(await getProfile(user.id));
    }
    loadProfile();
  }, [user]);

  const updatePreviewHeight = useCallback(() => {
    const preview = previewElementRef.current;
    if (preview) setPreviewHeight(preview.getBoundingClientRect().height);
  }, []);

  const previewContainerRef = useCallback(
    (node: HTMLDivElement | null) => {
      previewObserverRef.current?.disconnect();
      previewObserverRef.current = null;
      previewElementRef.current = node;

      if (!node) return;
      updatePreviewHeight();
      window.requestAnimationFrame(updatePreviewHeight);

      if (typeof ResizeObserver !== "undefined") {
        previewObserverRef.current = new ResizeObserver(updatePreviewHeight);
        previewObserverRef.current.observe(node);
      }
    },
    [updatePreviewHeight],
  );

  useEffect(() => {
    window.addEventListener("resize", updatePreviewHeight);

    return () => {
      previewObserverRef.current?.disconnect();
      window.removeEventListener("resize", updatePreviewHeight);
    };
  }, [updatePreviewHeight]);

  function setColor(color: string) {
    setQuote((prev) => ({ ...prev, previewColor: color }));
    const nextColors = [color, ...recentColors.filter((item) => item !== color)].slice(0, 6);
    setRecentColors(nextColors);
    window.localStorage.setItem(RECENT_COLORS_KEY, JSON.stringify(nextColors));
  }

  function setTemplate(template: string) {
    if (!isPremium) return;
    const confirmed = window.confirm(
      "Attention, la disposition de votre devis va changer. Votre couleur sélectionnée sera conservée.",
    );
    if (!confirmed) return;

    setQuote((prev) => ({
      ...prev,
      quoteTemplate: template,
      layoutOffsets: templateLayouts[template],
      blockAlignments: templateAlignments[template],
    }));
  }

  function alignBlock(
    block: LayoutSection,
    alignment: "left" | "right",
  ) {
    if (!isPremium) return;

    if (isTextAlignmentBlock(block)) {
      flushSync(() => {
        setQuote((prev) => ({
          ...prev,
          blockAlignments: { ...prev.blockAlignments, [block]: alignment },
        }));
      });
    }

    const page = previewElementRef.current?.querySelector<HTMLElement>(
      ".pdf-preview-page.active",
    );
    const element = page?.querySelector<HTMLElement>(`.quote-draggable-${block}`);
    if (!page || !element) return;

    const pageBounds = getQuotePageContentBounds(page);
    const elementRect = element.getBoundingClientRect();
    const deltaX =
      alignment === "left"
        ? pageBounds.left - elementRect.left
        : pageBounds.right - elementRect.right;

    setQuote((prev) => ({
      ...prev,
      layoutOffsets: {
        ...prev.layoutOffsets,
        [block]: {
          ...prev.layoutOffsets[block],
          x: Math.round(prev.layoutOffsets[block].x + deltaX),
        },
      },
    }));
  }

  function resetLayout() {
    setQuote((prev) => ({
      ...prev,
      previewColor: "#0f766e",
      quoteTemplate: "classic",
      tableRadius: 16,
      signatureRadius: 16,
      hideCustomizerGrid: false,
      layoutOffsets: templateLayouts.classic,
      blockAlignments: templateAlignments.classic,
    }));
  }

  return {
    colorInputRef,
    isPremium,
    previewContainerRef,
    previewHeight,
    quote,
    recentColors,
    resetLayout,
    setBlockAlignment: alignBlock,
    setColor,
    setGenerated,
    setQuote,
    setTemplate,
  };
}

function isTextAlignmentBlock(
  block: LayoutSection,
): block is keyof Quote["blockAlignments"] {
  return block === "seller" || block === "client" || block === "meta" || block === "totals";
}
