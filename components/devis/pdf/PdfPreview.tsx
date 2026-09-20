import QuoteFooter from "@/components/devis/pdf/footer/QuoteFooter";
import QuoteHeader from "@/components/devis/pdf/header/QuoteHeader";
import PdfPageControls from "@/components/devis/pdf/PdfPageControls";
import QuoteTable from "@/components/devis/pdf/table/QuoteTable";
import { useDraggableQuoteLayout } from "@/components/devis/pdf/useDraggableQuoteLayout";
import { useQuote } from "@/context/QuoteContext";
import { useEffect, useMemo, useState } from "react";
import { paginateProducts, type LayoutSection } from "./pdfPreviewUtils";

const previewSizes = {
  padding: "1cqw 3cqw",
  fontSize: "2.4cqw",
  tableFontSize: "2cqw",
};

export default function PdfPreview({
  customizerMode = false,
  canDragLayout = false,
}: {
  customizerMode?: boolean;
  canDragLayout?: boolean;
}) {
  const { quote, setQuote } = useQuote();
  const [currentPage, setCurrentPage] = useState(0);
  const [draggingSection, setDraggingSection] = useState<LayoutSection | null>(null);
  const pages = useMemo(() => paginateProducts(quote.products), [quote.products]);
  const safeCurrentPage = Math.min(currentPage, pages.length - 1);

  useEffect(() => {
    if (currentPage !== safeCurrentPage) setCurrentPage(safeCurrentPage);
  }, [currentPage, safeCurrentPage]);
  const { getDragProps } = useDraggableQuoteLayout({
    canDragLayout,
    customizerMode,
    draggingSection,
    quote,
    setDraggingSection,
    setQuote,
  });

  return (
    <div
      className="pdf-preview-root"
      style={{ "--quote-primary": quote.previewColor } as React.CSSProperties}
    >
      <PdfPageControls
        currentPage={safeCurrentPage}
        pageCount={pages.length}
        onPageChange={setCurrentPage}
      />

      <div className="pdf-pages">
        {pages.map((page, index) => {
          return (
            <div
              key={index}
              className={`pdf-preview pdf-preview-page ${
                index === safeCurrentPage ? "active" : ""
              } template-classic ${
                customizerMode && draggingSection && !quote.hideCustomizerGrid
                  ? "show-grid"
                  : ""
              }`}
            >
              <div className="pdf-page-content">
                <QuoteHeader
                  font_size={previewSizes.fontSize}
                  compact={index > 0}
                  getDragProps={getDragProps}
                />

                {(page.products.length > 0 || page.showTotals) && (
                  <QuoteTable
                    border_radius={`${quote.tableRadius / 10}cqw`}
                    font_size={previewSizes.tableFontSize}
                    padding={previewSizes.padding}
                    products={page.products}
                    showTotals={page.showTotals}
                    getDragProps={getDragProps}
                  />
                )}

                {page.showFooter && (
                  <QuoteFooter
                    font_size={previewSizes.fontSize}
                    padding={previewSizes.padding}
                    border_radius={`${quote.signatureRadius / 10}cqw`}
                    tab_font_size={previewSizes.tableFontSize}
                    getDragProps={getDragProps}
                  />
                )}
              </div>

              <span className="pdf-page-number">Page {index + 1}/{pages.length}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
