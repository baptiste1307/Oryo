type DeletionPopUpProps = {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  title: string;
};

export default function DeletionPopUp({
  isOpen,
  onCancel,
  onConfirm,
  title,
}: DeletionPopUpProps) {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
      onClick={onCancel}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "12px",
          minWidth: "300px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "16px",
          margin: "30px"
        }}
      >
        <strong style={{
          textAlign: "center"
        }}>{title}</strong>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "8px",
          }}
        >
          <button className="button-secondary" onClick={onCancel}>
            Annuler
          </button>

          <button className="button-delete" onClick={onConfirm}>
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}