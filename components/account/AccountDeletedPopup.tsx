"use client";

import { useEffect, useState } from "react";

const DELETION_CONFIRMED_KEY = "oryo-account-deleted";

export function rememberAccountDeletion() {
  window.sessionStorage.setItem(DELETION_CONFIRMED_KEY, "1");
}

export default function AccountDeletedPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const url = new URL(window.location.href);
    const deletionConfirmed =
      url.searchParams.get("accountDeleted") === "1" ||
      window.sessionStorage.getItem(DELETION_CONFIRMED_KEY) === "1";
    if (!deletionConfirmed) return;

    window.sessionStorage.removeItem(DELETION_CONFIRMED_KEY);
    url.searchParams.delete("accountDeleted");
    window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
    setOpen(true);
  }, []);

  if (!open) return null;

  return (
    <div className="modal-backdrop" role="presentation">
      <div
        className="modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="account-deleted-title"
      >
        <h3 id="account-deleted-title">Votre compte a bien été supprimé</h3>
        <p>Vos données et votre session ont été supprimées.</p>
        <button className="button-primary" type="button" onClick={() => setOpen(false)}>
          Fermer
        </button>
      </div>
    </div>
  );
}
