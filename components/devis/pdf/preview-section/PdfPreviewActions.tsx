import Link from "next/link";

type PdfPreviewActionsProps = {
  userExists: boolean;
  loginHref: string;
  onFinishDraft: () => void;
  onStartLogin: () => void;
};

export default function PdfPreviewActions({
  userExists,
  loginHref,
  onFinishDraft,
  onStartLogin,
}: PdfPreviewActionsProps) {
  return (
    <div style={{ display: "grid", gap: "18px" }}>
      {userExists ? (
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <Link className="button-secondary" href="/dashboard/build_quote/customize">
            Personnaliser l’aperçu
          </Link>
          <button
            onClick={onFinishDraft}
            className="button-primary"
            style={{ width: "fit-content" }}
          >
            Finaliser le devis
          </button>
        </div>
      ) : (
        <>
          <p>Vous souhaitez enregistrer, compléter ou personnaliser votre devis ?</p>
          <Link href={loginHref}>
            <button
              className="button-primary"
              style={{ width: "fit-content", height: "fit-content" }}
              onClick={onStartLogin}
            >
              Connexion
            </button>
          </Link>
        </>
      )}
    </div>
  );
}
