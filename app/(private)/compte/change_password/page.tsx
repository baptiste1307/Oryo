"use client";

import BasicCard from "@/components/global/pages/BasicCard";
import HeroSection from "@/components/global/pages/HeroSection";
import { useAuth } from "@/context/AuthContext";
import { isMockMode, supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import CurrentPasswordField from "./CurrentPasswordField";
import PasswordResetPopup from "./PasswordResetPopup";
import NewPasswordFields from "./NewPasswordFields";
import { FormMessage } from "@/components/forms/FormMessage";

export default function ChangePasswordPage() {
  const { user } = useAuth();
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageTone, setMessageTone] = useState<"error" | "success">("error");
  const [invalidFields, setInvalidFields] = useState({
    current: false,
    password: false,
    confirmation: false,
  });
  const [showResetPopup, setShowResetPopup] = useState(false);
  const [recoveryMode, setRecoveryMode] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setRecoveryMode(params.get("recovery") === "true");
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setInvalidFields({ current: false, password: false, confirmation: false });

    if (password.length < 6) {
      setMessage("Le mot de passe doit contenir au moins 6 caractères.");
      setMessageTone("error");
      setInvalidFields((fields) => ({ ...fields, password: true }));
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Les deux mots de passe ne correspondent pas.");
      setMessageTone("error");
      setInvalidFields((fields) => ({ ...fields, password: true, confirmation: true }));
      return;
    }

    if (!recoveryMode && (!user?.email || !currentPassword)) {
      setMessage("Veuillez saisir votre mot de passe actuel.");
      setMessageTone("error");
      setInvalidFields((fields) => ({ ...fields, current: true }));
      return;
    }

    if (isMockMode()) {
      setCurrentPassword("");
      setPassword("");
      setConfirmPassword("");
      setMessage("Mode Démo : Mot de passe fictif mis à jour avec succès.");
      setMessageTone("success");
      return;
    }

    if (!recoveryMode && user?.email) {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: currentPassword,
      });
      if (signInError) {
        setMessage("Le mot de passe actuel est incorrect.");
        setMessageTone("error");
        setInvalidFields((fields) => ({ ...fields, current: true }));
        return;
      }
    }

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      console.error("Erreur changement mot de passe :", error);
      setMessage("Impossible de changer le mot de passe pour le moment.");
      setMessageTone("error");
      setInvalidFields((fields) => ({ ...fields, password: true, confirmation: true }));
      return;
    }

    setCurrentPassword("");
    setPassword("");
    setConfirmPassword("");
    setMessage("Mot de passe mis à jour.");
    setMessageTone("success");
  }

  async function handleForgotPassword() {
    if (!user?.email) {
      setMessage("Impossible de trouver l'email de votre compte.");
      setMessageTone("error");
      return;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(user.email, {
      redirectTo: `${window.location.origin}/compte/change_password?recovery=true`,
    });

    if (error) {
      console.error("Erreur email réinitialisation :", error);
      setMessage("Impossible d'envoyer l'email de réinitialisation.");
      setMessageTone("error");
      return;
    }

    setShowResetPopup(true);
  }

  return (
    <div className="parent_div">
      <HeroSection
        indicator="Sécurité"
        title="Modification du mot de passe"
        subtitle="Choisissez un nouveau mot de passe pour sécuriser votre compte."
      />

      <BasicCard title="Nouveau mot de passe">
        <form className="stack" autoComplete="on" onSubmit={handleSubmit}>
          <input
            className="visually-hidden"
            type="email"
            name="username"
            autoComplete="username"
            value={user?.email ?? ""}
            readOnly
            tabIndex={-1}
            aria-hidden="true"
          />
          <div className="grid-2">
            {!recoveryMode && (
              <CurrentPasswordField
                value={currentPassword}
                onChange={setCurrentPassword}
                onForgotPassword={handleForgotPassword}
                invalid={invalidFields.current}
              />
            )}
            <NewPasswordFields
              password={password}
              confirmPassword={confirmPassword}
              invalidPassword={invalidFields.password}
              invalidConfirmation={invalidFields.confirmation}
              onPasswordChange={setPassword}
              onConfirmPasswordChange={setConfirmPassword}
            />
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

      {showResetPopup && (
        <PasswordResetPopup
          email={user?.email}
          onClose={() => setShowResetPopup(false)}
        />
      )}
    </div>
  );
}
