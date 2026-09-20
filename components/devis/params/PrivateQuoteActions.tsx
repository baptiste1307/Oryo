type PrivateQuoteActionsProps = {
  onSaveDraft: () => void;
  onGeneratePreview: () => void;
};

export default function PrivateQuoteActions({
  onSaveDraft,
  onGeneratePreview,
}: PrivateQuoteActionsProps) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "8px",
        padding: "clamp(20px, 3vw, 32px)",
        marginBottom: "-58px",
      }}
    >
      <button
        className="button-secondary"
        onClick={onSaveDraft}
        style={{ width: "fit-content", height: "fit-content" }}
      >
        Enregistrer le brouillon
      </button>

      <button
        className="button-primary"
        style={{ width: "fit-content", height: "fit-content" }}
        onClick={onGeneratePreview}
      >
        Générer l’aperçu
      </button>
    </div>
  );
}
