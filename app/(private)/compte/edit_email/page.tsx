"use client";

import BasicCard from "@/components/global/pages/BasicCard";
import HeroSection from "@/components/global/pages/HeroSection";
import { useAuth } from "@/context/AuthContext";
import { isMockMode, supabase } from "@/lib/supabase";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FormMessage } from "@/components/forms/FormMessage";

export default function EditEmailPage() {
  const { user } = useAuth();
  const [email, setEmail] = useState(user?.email ?? "");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [message, setMessage] = useState("");
  const [messageTone, setMessageTone] = useState<"error" | "success">("error");
  const [invalidFields, setInvalidFields] = useState({ email: false, confirmation: false });

  useEffect(() => {
    if (user?.email) setEmail(user.email);
  }, [user?.email]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setInvalidFields({ email: false, confirmation: false });

    if (!email.includes("@")) {
      setMessage("Veuillez saisir une adresse email valide.");
      setMessageTone("error");
      setInvalidFields({ email: true, confirmation: false });
      return;
    }

    if (email !== confirmEmail) {
      setMessage("Les deux adresses email ne correspondent pas.");
      setMessageTone("error");
      setInvalidFields({ email: true, confirmation: true });
      return;
    }

    if (email === user?.email) {
      setMessage("Cette adresse email est déjà celle de votre compte.");
      setMessageTone("error");
      setInvalidFields({ email: true, confirmation: false });
      return;
    }

    if (isMockMode()) {
      setMessage("Mode Démo : Email fictif mis à jour avec succès.");
      setMessageTone("success");
      setConfirmEmail("");
      return;
    }

    const { error } = await supabase.auth.updateUser({ email });

    if (error) {
      console.error("Erreur changement email :", error);
      setMessage("Impossible de modifier l'email pour le moment.");
      setMessageTone("error");
      setInvalidFields({ email: true, confirmation: true });
      return;
    }

    setConfirmEmail("");
    setMessage(
      "Demande envoyée. Vérifiez votre boîte mail pour confirmer le changement d'adresse.",
    );
    setMessageTone("success");
  }

  return (
    <div className="parent_div">
      <HeroSection
        indicator="Mon compte"
        title="Modification de l'email"
        subtitle="Choisissez une nouvelle adresse email pour votre compte."
      />

      <BasicCard title="Nouvelle adresse email">
        <form className="stack" onSubmit={handleSubmit}>
          <div className="grid-2">
            <div className="stack">
              <label className="label">Nouvel email</label>
              <input
                className="input"
                type="email"
                aria-invalid={invalidFields.email}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="stack">
              <label className="label">Confirmer l'email</label>
              <input
                className="input"
                type="email"
                aria-invalid={invalidFields.confirmation}
                value={confirmEmail}
                onChange={(e) => setConfirmEmail(e.target.value)}
              />
            </div>
          </div>

          <button
            style={{ width: "fit-content" }}
            type="submit"
            className="button-primary"
          >
            Mettre à jour
          </button>

          <FormMessage message={message} tone={messageTone} />
        </form>
      </BasicCard>
    </div>
  );
}
