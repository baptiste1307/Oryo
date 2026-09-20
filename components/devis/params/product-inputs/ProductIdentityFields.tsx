import type { Product, TvaCategory } from "@/context/quote/quoteTypes";

type Props = {
  product: Product;
  onTvaCategoryChange: (value: TvaCategory) => void;
  onUpdate: <K extends keyof Product>(field: K, value: Product[K]) => void;
};

export default function ProductIdentityFields({
  product,
  onTvaCategoryChange,
  onUpdate,
}: Props) {
  return (
    <>
      <div>
        <label className="label">Nom de la prestation / du produit</label>
        <input
          className="input"
          placeholder="Ex: Maintenance site web"
          value={product.name}
          onChange={(e) => onUpdate("name", e.target.value)}
        />
      </div>

      <div>
        <label className="label">Type</label>
        <select
          className="input"
          value={product.type}
          style={{ color: "var(--muted)" }}
          onChange={(e) => onUpdate("type", e.target.value)}
        >
          <option value="site_web">Service</option>
          <option value="design">Site web</option>
          <option value="design">Design</option>
          <option value="maintenance">Maintenance</option>
        </select>
      </div>

      <DescriptionField product={product} onUpdate={onUpdate} />

      <div>
        <label className="label">Catégorie TVA</label>
        <select
          className="input"
          value={product.tvaCategory}
          onChange={(e) => onTvaCategoryChange(e.target.value as TvaCategory)}
        >
          <option value="standard">Standard - 20%</option>
          <option value="restauration">Restauration - 10%</option>
          <option value="alimentaire">Alimentaire - 5.5%</option>
          <option value="export">Export - 0%</option>
        </select>
      </div>
    </>
  );
}

function DescriptionField({ product, onUpdate }: Omit<Props, "onTvaCategoryChange">) {
  return (
    <div>
      <label className="label">Description</label>
      <textarea
        rows={1}
        maxLength={300}
        className="input"
        placeholder="Forfait de maintenance mensuelle"
        value={product.description}
        onChange={(e) => {
          onUpdate("description", e.target.value);
          e.target.style.height = "auto";
          e.target.style.height = `${e.target.scrollHeight}px`;
        }}
        style={{ resize: "vertical", paddingBottom: "24px" }}
      />
      <p
        style={{
          fontSize: "0.8rem",
          pointerEvents: "none",
          color:
            product.description.length === 300
              ? "var(--danger)"
              : product.description.length > 250
                ? "orange"
                : "var(--muted)",
        }}
      >
        {product.description.length}/300 caractères
      </p>
    </div>
  );
}
