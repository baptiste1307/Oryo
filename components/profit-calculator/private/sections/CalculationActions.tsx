import { Copy, Download, Library } from "lucide-react";

export default function CalculationActions({
  saveMessage,
  onSave,
  onDuplicate,
  onDownload,
  onSaveToLibrary,
}: {
  saveMessage: string;
  onSave: () => void;
  onDuplicate: () => void;
  onDownload: () => void;
  onSaveToLibrary: () => void;
}) {
  return (
    <>
      <div
        className="buttons-container"
        style={{
          marginTop: "28px",
          display: "flex",
          justifyContent: "flex-start",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        <button className="button-primary" onClick={onSave}>
          Sauvegarder ce résultat
        </button>

        <button type="button" className="button-secondary" onClick={onDuplicate}>
          <Copy size={16} /> Dupliquer
        </button>

        <button type="button" className="button-secondary" onClick={onDownload}>
          <Download size={16} /> Exporter le résumé
        </button>

        <button type="button" className="button-secondary" onClick={onSaveToLibrary}>
          <Library size={16} /> Enregistrer dans la bibliothèque
        </button>
      </div>

      {saveMessage && <p>{saveMessage}</p>}
    </>
  );
}
