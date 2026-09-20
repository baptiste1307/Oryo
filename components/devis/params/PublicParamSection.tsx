import BasicCard from "@/components/global/pages/BasicCard";
import FieldList from "@/components/global/pages/FieldList";
import { useQuote } from "@/context/QuoteContext";
import { FormMessage } from "@/components/forms/FormMessage";

export default function PublicParamSection({ previewRef }) {
  const { quote, error, setError, setGenerated, updateField, updateProduct } =
    useQuote();

  function isValidForm() {
    return (
      quote.client.name.trim().length > 0 &&
      quote.products[0].name.trim().length > 0 &&
      !isNaN(Number(quote.products[0].unitPrice)) &&
      Number(quote.products[0].unitPrice) > 0
    );
  }
  return (
    <BasicCard
      title="Aperçu du devis"
      subtitle="Version simplifiée accessible sans connexion"
    >
      <FieldList
        fields={[
          {
            field_type: "input",
            label: "Nom du client",
            placeholder: "Ex: Entreprise Dupont",
            value: quote.client.name,
            onChange: (value: string) => updateField("client", "name", value),
            invalid: Boolean(error) && !quote.client.name.trim(),
          },
          {
            field_type: "input",
            label: "Prestation",
            placeholder: "Ex: Création site web",
            value: quote.products[0].name,
            onChange: (value: string) => updateProduct(0, "name", value),
            invalid: Boolean(error) && !quote.products[0].name.trim(),
          },
          {
            field_type: "input",
            label: "Montant estimé (€)",
            placeholder: "Ex: 1200",
            value: quote.products[0].unitPrice,
            value_type: "number",
            onChange: (value: string) => updateProduct(0, "unitPrice", value),
            invalid: Boolean(error) && Number(quote.products[0].unitPrice) <= 0,
          },
        ]}
      />

      {/* Afficher message d'erreur en rouge si un des champs vide ou incorrect */}
      <FormMessage message={error ?? ""} />

      <button
        className="button-primary"
        style={{ width: "fit-content", height: "fit-content" }}
        onClick={() => {
          if (!isValidForm()) {
            setError("Veuillez remplir tous les champs correctement.");
            setGenerated(false);
            return;
          }
          setError(null);
          setGenerated(true);
          /* Smoothly scroll down to the generated quote preview */
          requestAnimationFrame(() => {
            previewRef.current?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          });
        }}
      >
        Générer l’aperçu
      </button>
    </BasicCard>
  );
}
