type PasswordResetPopupProps = {
  email?: string;
  onClose: () => void;
};

export default function PasswordResetPopup({
  email,
  onClose,
}: PasswordResetPopupProps) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 2000,
        display: "grid",
        placeItems: "center",
        padding: "24px",
        background: "rgba(23, 23, 23, 0.2)",
      }}
    >
      <div className="card" style={{ maxWidth: "420px", display: "grid", gap: "14px" }}>
        <strong>Email envoyé</strong>
        <p>Un email de réinitialisation vient d'être envoyé à {email}.</p>
        <button
          type="button"
          className="button-primary"
          onClick={onClose}
          style={{ width: "fit-content" }}
        >
          Compris
        </button>
      </div>
    </div>
  );
}
