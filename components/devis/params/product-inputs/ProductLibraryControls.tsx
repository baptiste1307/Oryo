import type { Product, TvaCategory } from "@/context/quote/quoteTypes";
import { getTvaRate } from "@/context/quote/tva";
import ProductLibraryPicker from "../ProductLibraryPicker";

type Props = {
  product: Product;
  libraryMessage: string;
  onSaveProduct: () => void;
  onUpdate: <K extends keyof Product>(field: K, value: Product[K]) => void;
};

export default function ProductLibraryControls({
  product,
  libraryMessage,
  onSaveProduct,
  onUpdate,
}: Props) {
  function applyLibraryProduct(libraryProduct: {
    name?: string | null;
    type?: string | null;
    description?: string | null;
    price_ht?: number | string | null;
    unit?: string | null;
    tva_category?: string | null;
    tva_rate?: number | string | null;
  }) {
    const tvaCategory: TvaCategory =
      libraryProduct.tva_category === "restauration" ||
      libraryProduct.tva_category === "alimentaire" ||
      libraryProduct.tva_category === "export"
        ? libraryProduct.tva_category
        : "standard";

    onUpdate("name", libraryProduct.name ?? "");
    onUpdate("type", libraryProduct.type ?? "");
    onUpdate("description", libraryProduct.description ?? "");
    onUpdate("unitPrice", Number(libraryProduct.price_ht ?? 0));
    onUpdate("unit", libraryProduct.unit ?? "");
    onUpdate("tvaCategory", tvaCategory);
    onUpdate("tvaRate", Number(libraryProduct.tva_rate ?? getTvaRate(tvaCategory)));
  }

  return (
    <>
      <ProductLibraryPicker onSelect={applyLibraryProduct} />
      {product.name.trim() && (
        <div style={{ display: "grid", gap: "6px" }}>
          <button
            type="button"
            className="nav-link"
            onClick={onSaveProduct}
            style={{
              width: "fit-content",
              color: "var(--primary)",
              background: "transparent",
              padding: 0,
            }}
          >
            Ajouter à la bibliothèque ?
          </button>
          {libraryMessage && <p>{libraryMessage}</p>}
        </div>
      )}
    </>
  );
}
