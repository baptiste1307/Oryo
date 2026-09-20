import { X } from "lucide-react";

type Props = {
  setShowFinishedPopup: (show: boolean) => void;
  onSavePdf: () => void;
  exportingPdf: boolean;
};

export default function FinishedPopUp({
  setShowFinishedPopup,
  onSavePdf,
  exportingPdf,
}: Props) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="finished-quote-title"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        display: "grid",
        placeItems: "center",
        padding: "20px",
        background: "rgba(20, 24, 28, 0.42)",
      }}
    >
      <div
        className="card"
        style={{
          position: "relative",
          width: "min(100%, 420px)",
          display: "grid",
          gap: "18px",
        }}
      >
        <button
          type="button"
          aria-label="Fermer"
          onClick={() => setShowFinishedPopup(false)}
          className="trash-link"
          style={{
            position: "absolute",
            top: "14px",
            right: "14px",
            marginLeft: 0,
          }}
        >
          <X size={18} />
        </button>

        <strong id="finished-quote-title" style={{ paddingRight: "32px" }}>
          Votre devis est finalisé
        </strong>

        <button
          type="button"
          onClick={onSavePdf}
          className="button-primary"
          disabled={exportingPdf}
          style={{ width: "fit-content" }}
        >
          {exportingPdf ? "Génération..." : "Enregistrer le PDF"}
        </button>
      </div>
    </div>
  );
}
