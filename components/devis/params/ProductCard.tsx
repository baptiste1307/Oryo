import { useState } from "react";
import { ChevronDown, ChevronUp, Trash2 } from "lucide-react";
import { useQuote } from "@/context/QuoteContext";
import ProductCardInputs from "./ProductCardInputs";
import DeletionPopUp from "@/components/global/pages/DeletionPopUp";

export default function ProductCard() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [productToDelete, setProductToDelete] = useState<number | null>(null);
  const { quote, deleteProduct } = useQuote();

  return (
    <>
      {quote.products.map((product, index) => (
        <div
          key={index}
          className="quote-param-card"
          style={{ marginBottom: "-8px" }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <strong
              style={{
                color: openIndex === index ? "var(--primary)" : "var(--text)",
              }}
            >
              {product.name ? `${product.name}` : `Sans nom ${index + 1}`}
            </strong>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0px",
              }}
            >
              <button
                type="button"
                className="nav-link"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  // Align chevron icon vertically with text
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {openIndex === index ? (
                  <ChevronUp size={23} />
                ) : (
                  <ChevronDown size={23} />
                )}
              </button>

              {quote.products.length > 1 && (
                <button
                  type="button"
                  className="trash-link"
                  onClick={() => setProductToDelete(index)}
                >
                  {<Trash2 size={16} />}
                </button>
              )}
            </div>
          </div>

          {openIndex === index && (
            <>
              <ProductCardInputs index={index} />
            </>
          )}
        </div>
      ))}
      <DeletionPopUp
        title="Voulez-vous vraiment supprimer cette prestation ?"
        isOpen={productToDelete !== null}
        onCancel={() => setProductToDelete(null)}
        onConfirm={() => {
          deleteProduct(productToDelete!);
          setProductToDelete(null);
        }}
      />
    </>
  );
}
