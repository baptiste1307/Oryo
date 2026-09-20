import { Pencil } from "lucide-react";
import { RefObject } from "react";

export default function CompanyAvatar({
  companyName,
  logo,
  fileInputRef,
  onFileChange,
  logoSize = 78,
}: {
  companyName: string;
  logo: string;
  fileInputRef: RefObject<HTMLInputElement | null>;
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  logoSize?: number;
}) {
  const avatarSize = Math.max(32, Math.min(96, logoSize));

  return (
    <div style={{ position: "relative", width: "96px", height: "96px" }}>
      <div
        style={{
          width: "96px",
          height: "96px",
          borderRadius: "999px",
          border: "1px solid var(--border)",
          overflow: "hidden",
          background: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 800,
          color: "var(--primary)",
        }}
      >
        {logo ? (
          <img
            src={logo}
            alt=""
            style={{
              width: `${avatarSize}px`,
              height: `${avatarSize}px`,
              objectFit: "contain",
              maxWidth: "100%",
              maxHeight: "100%",
            }}
          />
        ) : (
          companyName.slice(0, 2).toUpperCase()
        )}
      </div>

      <button
        type="button"
        className="edit-link"
        onClick={() => fileInputRef.current?.click()}
        aria-label="Modifier le logo de l'entreprise"
        style={{
          position: "absolute",
          right: "-4px",
          bottom: "-4px",
          padding: "6px",
          borderRadius: "999px",
          background: "var(--surface)",
          border: "1px solid var(--border)",
        }}
      >
        <Pencil size={14} />
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={onFileChange}
        style={{ display: "none" }}
      />
    </div>
  );
}
