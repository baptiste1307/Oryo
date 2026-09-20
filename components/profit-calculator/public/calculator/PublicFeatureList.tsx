const privateFeatures = [
  "sauvegarde de vos calculs",
  "frais détaillés et coût total",
  "TVA et prix TTC",
  "notes, favoris et statuts",
  "scénarios bas / recommandé / premium",
  "filtres et historique complet",
];

export default function PublicFeatureList() {
  return (
    <div
      className="card"
      style={{ background: "#fcfcfb", display: "grid", gap: "10px" }}
    >
      <strong>En vous connectant, vous aurez accès à :</strong>
      <ul style={{ margin: 0, paddingLeft: "18px", display: "grid", gap: "6px" }}>
        {privateFeatures.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>
    </div>
  );
}
