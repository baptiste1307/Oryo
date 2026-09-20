import ProductCard from "../ProductCard";

export default function QuoteProductsSection({
  addProduct,
}: {
  addProduct: () => void;
}) {
  return (
    <>
      <ProductCard />
      <button
        className="button-secondary"
        style={{ width: "fit-content", height: "fit-content" }}
        onClick={addProduct}
      >
        Ajouter une autre prestation
      </button>
    </>
  );
}
