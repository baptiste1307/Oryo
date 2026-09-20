import BasicCard from "@/components/global/pages/BasicCard";
import { useCalculation } from "@/context/CalculationContext";
import PublicCalculatorCard from "./calculator/PublicCalculatorCard";
import PublicCalculatorField from "./calculator/PublicCalculatorField";
import PublicFeatureList from "./calculator/PublicFeatureList";

export default function ProfitCalculatorSection() {
  const { calculation, updateField } = useCalculation();
  const { cost, price, profit, margin, targetMargin, suggestedPrice } =
    calculation;
  const saveResultUrl = `/connexion?intent=save-result&cost=${cost}&price=${price}&targetMargin=${targetMargin}`;

  const inputs = [
    {
      title: "Coût",
      value: cost,
      field: "cost" as const,
    },
    {
      title: "Prix de vente",
      value: price,
      field: "price" as const,
    },
  ];

  const getProfitColor = (profit: number) => {
    if (profit > 0) return "var(--success)";
    return "var(--danger)";
  };

  const getMarginColor = (margin: number) => {
    if (margin >= 30) return "var(--success)";
    if (margin >= 15) return "orange";
    return "var(--danger)";
  };

  const results = [
    {
      title: "Bénéfice",
      value: profit,
      color: getProfitColor(profit),
      unit: "EUR",
    },
    {
      title: "Marge",
      value: margin.toFixed(2),
      color: getMarginColor(margin),
      unit: "%",
    },
  ];

  return (
    <BasicCard
      title="Calculateur de rentabilité"
      subtitle="Entrez votre coût et votre prix de vente pour visualiser immédiatement
          votre bénéfice et votre marge."
      buttons={[
        {
          link: saveResultUrl,
          text: "Sauvegarder ce résultat",
        },
        {
          link: saveResultUrl,
          text: "Débloquer les fonctions avancées",
        },
      ]}
    >
      <div className="grid-2">
        {inputs.map((input) => (
          <PublicCalculatorField
            key={input.field}
            label={input.title}
            value={input.value}
            onChange={(value) => updateField(input.field, value)}
          />
        ))}
      </div>

      <div className="grid-2">
        <PublicCalculatorField
          label="Marge cible"
          value={targetMargin}
          onChange={(value) => updateField("targetMargin", value)}
        />
        <PublicCalculatorCard
          title="Prix conseillé pour atteindre cette marge"
          value={suggestedPrice.toFixed(2)}
          unit="EUR"
          color="var(--primary)"
        />
      </div>

      <div className="grid-2">
        {results.map((result, index) => (
          <PublicCalculatorCard key={index} {...result} />
        ))}
      </div>

      <PublicFeatureList />
    </BasicCard>
  );
}
