type SavedCalculationActionsProps = {
  onGoToDashboard: () => Promise<void>;
  onGoToAdvanced: () => Promise<void>;
};

export default function SavedCalculationActions({
  onGoToDashboard,
  onGoToAdvanced,
}: SavedCalculationActionsProps) {
  return (
    <div
      className="buttons-container"
      style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}
    >
      <button onClick={onGoToDashboard} className="button-primary">
        Aller au dashboard
      </button>
      <button onClick={onGoToAdvanced} className="button-secondary">
        Voir les fonctions avancées
      </button>
    </div>
  );
}
