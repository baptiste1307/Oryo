import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  currentPage: number;
  pageCount: number;
  onPageChange: (page: number) => void;
};

export default function PdfPageControls({
  currentPage,
  pageCount,
  onPageChange,
}: Props) {
  if (pageCount <= 1) return null;

  return (
    <div className="pdf-page-controls">
      <button
        type="button"
        className="favorite-link"
        onClick={() => onPageChange(Math.max(0, currentPage - 1))}
        disabled={currentPage === 0}
        aria-label="Page précédente"
      >
        <ChevronLeft size={18} />
      </button>
      <span>Page {currentPage + 1}/{pageCount}</span>
      <button
        type="button"
        className="favorite-link"
        onClick={() => onPageChange(Math.min(pageCount - 1, currentPage + 1))}
        disabled={currentPage === pageCount - 1}
        aria-label="Page suivante"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
