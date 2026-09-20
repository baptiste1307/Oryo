"use client";

import { FormMessage } from "@/components/forms/FormMessage";
import { isMockMode, supabase } from "@/lib/supabase";
import { useState } from "react";
import { rememberAccountDeletion } from "./AccountDeletedPopup";

const CONFIRMATION = "SUPPRIMER";

export default function DeleteAccountButton() {
  const [open, setOpen] = useState(false);
  const [confirmation, setConfirmation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function deleteAccount() {
    setLoading(true);
    setError("");

    if (isMockMode()) {
      if (typeof window !== "undefined") {
        window.sessionStorage.setItem("oryo_mock_signed_out", "true");
        window.localStorage.removeItem("oryo_mock_profile");
        window.localStorage.removeItem("oryo_mock_clients");
        window.localStorage.removeItem("oryo_mock_products");
        window.localStorage.removeItem("oryo_mock_calculations");
        window.localStorage.removeItem("oryo_mock_quotes");
      }
      rememberAccountDeletion();
      window.location.replace("/?accountDeleted=1");
      return;
    }

    try {
      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token;
      if (!token) throw new Error("Votre session a expiré. Reconnectez-vous.");

      const response = await fetch("/api/account/delete", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(result.error || "Suppression impossible.");

      rememberAccountDeletion();
      await supabase.auth.signOut({ scope: "local" });
      window.location.replace("/?accountDeleted=1");
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Suppression impossible.");
      setLoading(false);
    }
  }

  return (
    <>
      <button className="button-delete" type="button" onClick={() => setOpen(true)}>
        Supprimer mon compte
      </button>
      {open && (
        <div className="modal-backdrop" role="presentation">
          <div className="modal-card" role="dialog" aria-modal="true" aria-labelledby="delete-title">
            <h3 id="delete-title">Supprimer définitivement le compte ?</h3>
            <p>
              L’abonnement sera résilié immédiatement. Vos devis, clients, produits et calculs seront
              supprimés sans possibilité de récupération.
            </p>
            <label className="label" htmlFor="delete-confirmation">
              Saisissez {CONFIRMATION} pour confirmer
            </label>
            <input
              id="delete-confirmation"
              className="input"
              value={confirmation}
              aria-invalid={Boolean(error)}
              onChange={(event) => setConfirmation(event.target.value)}
            />
            <FormMessage message={error} />
            <div className="buttons-container">
              <button
                className="button-delete"
                type="button"
                disabled={confirmation !== CONFIRMATION || loading}
                onClick={deleteAccount}
              >
                {loading ? "Suppression…" : "Supprimer définitivement"}
              </button>
              <button className="button-secondary" type="button" onClick={() => setOpen(false)}>
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
