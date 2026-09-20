import { PlusCircle } from "lucide-react";
import { useState } from "react";
import LibraryPicker from "./LibraryPicker";
import type { LibraryProduct } from "@/lib/library";

type ProductLibraryPickerProps = {
  onSelect: (product: LibraryProduct) => void;
};

export default function ProductLibraryPicker({ onSelect }: ProductLibraryPickerProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="nav-link"
        onClick={() => setOpen((prev) => !prev)}
        style={{
          width: "fit-content",
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          color: "var(--primary)",
          background: "transparent",
          padding: 0,
        }}
      >
        <PlusCircle size={16} />
        Choisir depuis la bibliothèque
      </button>

      {open && (
        <LibraryPicker
          type="products"
          onClose={() => setOpen(false)}
          onSelect={onSelect}
        />
      )}
    </>
  );
}
