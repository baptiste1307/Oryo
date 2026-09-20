import type { Quote } from "@/context/quote/quoteTypes";
import {
  clampLayoutOffset,
  getQuotePageContentBounds,
  type LayoutSection,
} from "./pdfPreviewUtils";

type Options = {
  canDragLayout: boolean;
  customizerMode: boolean;
  draggingSection: LayoutSection | null;
  quote: Quote;
  setDraggingSection: (section: LayoutSection | null) => void;
  setQuote: React.Dispatch<React.SetStateAction<Quote>>;
};

const sectionLabels: Record<LayoutSection, string> = {
  header: "Conditions de règlement",
  seller: "Informations vendeur",
  client: "Informations client",
  meta: "Informations du devis",
  table: "Tableau des prestations",
  totals: "Tableau des totaux",
  signature: "Signature",
  footer: "Mentions légales",
};

export function useDraggableQuoteLayout({
  canDragLayout,
  customizerMode,
  draggingSection,
  quote,
  setDraggingSection,
  setQuote,
}: Options) {
  function startDrag(
    section: LayoutSection,
    event: React.PointerEvent<HTMLDivElement>,
  ) {
    if (!customizerMode) return;

    event.stopPropagation();
    event.currentTarget.focus();
    if (!canDragLayout) return;

    const startOffset = quote.layoutOffsets[section];
    const startX = event.clientX;
    const startY = event.clientY;
    const pointerId = event.pointerId;
    const elementRect = event.currentTarget.getBoundingClientRect();
    const page = event.currentTarget.closest<HTMLElement>(".pdf-preview-page");
    const pageBounds = page ? getQuotePageContentBounds(page) : null;
    const minX = pageBounds
      ? startOffset.x + pageBounds.left - elementRect.left
      : Number.NEGATIVE_INFINITY;
    const maxX = pageBounds
      ? startOffset.x + pageBounds.right - elementRect.right
      : Number.POSITIVE_INFINITY;
    const minY = pageBounds
      ? startOffset.y + pageBounds.top - elementRect.top
      : Number.NEGATIVE_INFINITY;
    const maxY = pageBounds
      ? startOffset.y + pageBounds.bottom - elementRect.bottom
      : Number.POSITIVE_INFINITY;
    event.currentTarget.setPointerCapture?.(pointerId);
    setDraggingSection(section);

    function handleMove(event: PointerEvent) {
      if (event.pointerId !== pointerId) return;
      const nextX = Math.round((startOffset.x + event.clientX - startX) / 4) * 4;
      const nextY = Math.round((startOffset.y + event.clientY - startY) / 4) * 4;

      setQuote((prev) => ({
        ...prev,
        layoutOffsets: {
          ...prev.layoutOffsets,
          [section]: {
            x: clampLayoutOffset(nextX, minX, maxX),
            y: clampLayoutOffset(nextY, minY, maxY),
          },
        },
      }));
    }

    function handleUp(event: PointerEvent) {
      if (event.pointerId !== pointerId) return;
      setDraggingSection(null);
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", handleUp);
      window.removeEventListener("pointercancel", handleUp);
    }

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", handleUp);
    window.addEventListener("pointercancel", handleUp);
  }

  function sectionClassName(section: LayoutSection) {
    return customizerMode
      ? `quote-draggable-section ${canDragLayout ? "can-drag" : "is-locked"} ${
          draggingSection === section ? "is-dragging" : ""
        } quote-draggable-${section}`
      : undefined;
  }

  function moveWithKeyboard(
    section: LayoutSection,
    event: React.KeyboardEvent<HTMLDivElement>,
  ) {
    if (!customizerMode) return;

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      event.stopPropagation();
      event.currentTarget.focus();
      return;
    }

    if (!canDragLayout) return;

    const direction = {
      ArrowLeft: { x: -1, y: 0 },
      ArrowRight: { x: 1, y: 0 },
      ArrowUp: { x: 0, y: -1 },
      ArrowDown: { x: 0, y: 1 },
    }[event.key];
    if (!direction) return;

    event.preventDefault();
    event.stopPropagation();
    const step = event.shiftKey ? 12 : 4;
    const element = event.currentTarget;
    const page = element.closest<HTMLElement>(".pdf-preview-page");
    const elementRect = element.getBoundingClientRect();
    const pageBounds = page ? getQuotePageContentBounds(page) : null;
    setQuote((prev) => ({
      ...prev,
      layoutOffsets: {
        ...prev.layoutOffsets,
        [section]: {
          x: clampLayoutOffset(
            prev.layoutOffsets[section].x + direction.x * step,
            pageBounds
              ? prev.layoutOffsets[section].x + pageBounds.left - elementRect.left
              : Number.NEGATIVE_INFINITY,
            pageBounds
              ? prev.layoutOffsets[section].x + pageBounds.right - elementRect.right
              : Number.POSITIVE_INFINITY,
          ),
          y: clampLayoutOffset(
            prev.layoutOffsets[section].y + direction.y * step,
            pageBounds
              ? prev.layoutOffsets[section].y + pageBounds.top - elementRect.top
              : Number.NEGATIVE_INFINITY,
            pageBounds
              ? prev.layoutOffsets[section].y + pageBounds.bottom - elementRect.bottom
              : Number.POSITIVE_INFINITY,
          ),
        },
      },
    }));
  }

  function getDragProps(section: LayoutSection) {
    return {
      className: sectionClassName(section),
      role: customizerMode ? "button" : undefined,
      tabIndex: customizerMode ? 0 : undefined,
      "aria-label": customizerMode
        ? `Déplacer : ${sectionLabels[section]}`
        : undefined,
      onPointerDown: (event: React.PointerEvent<HTMLDivElement>) =>
        startDrag(section, event),
      onClick: (event: React.MouseEvent<HTMLDivElement>) => {
        if (!customizerMode) return;
        event.stopPropagation();
        event.currentTarget.focus();
      },
      onKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) =>
        moveWithKeyboard(section, event),
      style: {
        transform: `translate(${quote.layoutOffsets[section].x}px, ${quote.layoutOffsets[section].y}px)`,
      },
    };
  }

  return { getDragProps };
}
