import { useAuth } from "@/context/AuthContext";
import { useQuote } from "@/context/QuoteContext";
import { getTvaRate } from "@/context/quote/tva";
import type { Product, TvaCategory } from "@/context/quote/quoteTypes";
import { canAddLibraryItem, saveProductToLibrary } from "@/lib/library";
import { useState } from "react";
import ProductDiscountFields from "./product-inputs/ProductDiscountFields";
import ProductIdentityFields from "./product-inputs/ProductIdentityFields";
import ProductLibraryControls from "./product-inputs/ProductLibraryControls";
import ProductPricingFields from "./product-inputs/ProductPricingFields";

export default function ProductCardInputs({ index }: { index: number }) {
  const { quote, updateProduct } = useQuote();
  const { user } = useAuth();
  const [libraryMessage, setLibraryMessage] = useState("");
  const product = quote.products[index];

  function updateField<K extends keyof Product>(field: K, value: Product[K]) {
    updateProduct(index, field, value);
  }

  function updateTvaCategory(value: TvaCategory) {
    updateField("tvaCategory", value);
    updateField("tvaRate", getTvaRate(value));
  }

  async function saveCurrentProductToLibrary() {
    if (!user || !product.name.trim()) return;

    const libraryAccess = await canAddLibraryItem(user.id);
    if (!libraryAccess.allowed) {
      setLibraryMessage("Bibliothèque pleine pour le plan gratuit.");
      return;
    }

    await saveProductToLibrary(user.id, {
      name: product.name,
      type: product.type,
      description: product.description,
      price_ht: product.unitPrice,
      unit: product.unit,
      tva_category: product.tvaCategory,
      tva_rate: product.tvaRate,
    });
    setLibraryMessage("Produit ajouté à la bibliothèque.");
  }

  return (
    <div style={containerStyle}>
      <div className="stack" style={{ gap: "4px", marginBottom: "4px" }}>
        <ProductLibraryControls
          product={product}
          libraryMessage={libraryMessage}
          onSaveProduct={saveCurrentProductToLibrary}
          onUpdate={updateField}
        />
        <ProductIdentityFields
          product={product}
          onTvaCategoryChange={updateTvaCategory}
          onUpdate={updateField}
        />
        <ProductPricingFields product={product} onUpdate={updateField} />
        <ProductDiscountFields product={product} onUpdate={updateField} />
      </div>
    </div>
  );
}

const containerStyle = {
  display: "grid",
  gap: "8px",
  paddingTop: "12px",
  borderTop: "1px solid var(--border)",
};
