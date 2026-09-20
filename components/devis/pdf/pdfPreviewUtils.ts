import type { Product, Quote } from "@/context/quote/quoteTypes";

export type LayoutSection = keyof Quote["layoutOffsets"];

export type QuoteDragProps = {
  className?: string;
  role?: React.AriaRole;
  tabIndex?: number;
  "aria-label"?: string;
  onPointerDown?: (event: React.PointerEvent<HTMLDivElement>) => void;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  style?: React.CSSProperties;
};

export type GetQuoteDragProps = (section: LayoutSection) => QuoteDragProps;

export type QuotePagePlan = {
  products: Product[];
  showFooter: boolean;
  showTotals: boolean;
};

export function paginateProducts(products: Product[]): QuotePagePlan[] {
  const maxRowsWithEverything = 6;
  const maxRowsWithTotals = 10;
  const pages: QuotePagePlan[] = [];
  let remainingProducts = products;

  while (remainingProducts.length > maxRowsWithTotals) {
    pages.push({
      products: remainingProducts.slice(0, maxRowsWithTotals),
      showFooter: false,
      showTotals: false,
    });
    remainingProducts = remainingProducts.slice(maxRowsWithTotals);
  }

  if (remainingProducts.length <= maxRowsWithEverything) {
    pages.push({
      products: remainingProducts,
      showFooter: true,
      showTotals: true,
    });
  } else {
    pages.push({
      products: remainingProducts,
      showFooter: false,
      showTotals: true,
    });
    pages.push({ products: [], showFooter: true, showTotals: false });
  }

  return pages;
}

export function clampLayoutOffset(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

export function getQuotePageContentBounds(page: HTMLElement) {
  const rect = page.getBoundingClientRect();
  const style = window.getComputedStyle(page);

  return {
    bottom: rect.bottom - Number.parseFloat(style.paddingBottom || "0"),
    left: rect.left + Number.parseFloat(style.paddingLeft || "0"),
    right: rect.right - Number.parseFloat(style.paddingRight || "0"),
    top: rect.top + Number.parseFloat(style.paddingTop || "0"),
  };
}
