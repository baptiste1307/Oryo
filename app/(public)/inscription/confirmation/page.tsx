"use client";

import { AuthPageShell } from "@/components/auth/AuthPageShell";
import BasicCard from "@/components/global/pages/BasicCard";
import { FormMessage } from "@/components/forms/FormMessage";
import { supabase } from "@/lib/supabase";
import { MailCheck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SignupConfirmationPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [resending, setResending] = useState(false);
  const [message, setMessage] = useState("");
  const [messageTone, setMessageTone] = useState<"error" | "success">("success");

  useEffect(() => {
    setEmail(sessionStorage.getItem("signup-email") ?? "");

    const redirectToDashboard = () => {
      sessionStorage.removeItem("signup-email");
      router.replace("/dashboard");
    };

    supabase.auth.getSession().then(({ data }) => {
      if (data.session) redirectToDashboard();
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) redirectToDashboard();
    });

    return () => subscription.unsubscribe();
  }, [router]);

  async function resendConfirmationEmail() {
    if (!email) return;

    setResending(true);
    setMessage("");
    const { error } = await supabase.auth.resend({
      type: "signup",
      email,
      options: { emailRedirectTo: `${window.location.origin}/inscription/confirmation` },
    });

    if (error) {
      setMessage("Impossible de renvoyer l’email pour le moment.");
      setMessageTone("error");
    } else {
      setMessage("Un nouveau lien de confirmation vient d’être envoyé.");
      setMessageTone("success");
    }
    setResending(false);
  }

  return (
    <AuthPageShell>
      <div style={{ width: "min(100%, 520px)" }}>
        <BasicCard title="Confirmez votre adresse email" centered>
          <div className="confirmation-email-content">
            <span className="confirmation-email-icon" aria-hidden="true">
              <MailCheck size={34} />
            </span>
            <p>
              Nous vous avons envoyé un lien par email{email ? ` à ${email}` : ""}. Cliquez dessus
              pour confirmer votre compte. Vous serez ensuite redirigé automatiquement vers votre
              tableau de bord.
            </p>
            <p className="confirmation-email-hint">
              Pensez à vérifier le dossier des courriers indésirables si vous ne voyez rien arriver.
            </p>
            <FormMessage message={message} tone={messageTone} />
            <div className="buttons-container confirmation-email-actions">
              {email && (
                <button
                  className="button-primary"
                  type="button"
                  disabled={resending}
                  onClick={resendConfirmationEmail}
                >
                  {resending ? "Envoi…" : "Renvoyer l’email"}
                </button>
              )}
              <Link className="button-secondary" href="/connexion">
                Retour à la connexion
              </Link>
            </div>
          </div>
        </BasicCard>
      </div>
    </AuthPageShell>
  );
}
