"use client";

import { getLoginRedirectUrl } from "@/app/(public)/connexion/helpers/loginRedirects";
import { AuthPageShell } from "@/components/auth/AuthPageShell";
import { isMockMode, supabase } from "@/lib/supabase";
import { useCallback, useEffect, useState } from "react";
import { SignupForm } from "./components/SignupForm";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageTone, setMessageTone] = useState<"error" | "success">("error");
  const [invalidFields, setInvalidFields] = useState({ email: false, password: false });
  const [loginHref, setLoginHref] = useState("/connexion");

  useEffect(() => {
    const query = new URLSearchParams(window.location.search).toString();
    setLoginHref(query ? `/connexion?${query}` : "/connexion");
  }, []);

  async function handleSignup(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setInvalidFields({ email: false, password: false });

    if (isMockMode()) {
      if (typeof window !== "undefined") {
        window.sessionStorage.removeItem("oryo_mock_signed_out");
      }
      window.location.href = getLoginRedirectUrl(window.location.search);
      return;
    }

    const emailRedirectTo = `${window.location.origin}/inscription/confirmation`;
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo },
    });
    if (error) {
      setMessage(`Erreur inscription : ${error.message}`);
      setMessageTone("error");
      setInvalidFields(getInvalidSignupFields(error.code, error.message));
      return;
    }

    if (data.session) {
      window.location.href = getLoginRedirectUrl(window.location.search);
      return;
    }

    sessionStorage.setItem("signup-email", email);
    window.location.href = "/inscription/confirmation";
  }

  const handleGoogleSuccess = useCallback(() => {
    window.location.href = getLoginRedirectUrl(window.location.search);
  }, []);

  const handleGoogleError = useCallback((error: string) => {
    setMessage(error);
    setMessageTone("error");
  }, []);

  return (
    <AuthPageShell>
      <SignupForm
        email={email}
        password={password}
        message={message}
        loginHref={loginHref}
        onEmailChange={setEmail}
        onPasswordChange={setPassword}
        onSubmit={handleSignup}
        onGoogleSuccess={handleGoogleSuccess}
        onGoogleError={handleGoogleError}
        invalidEmail={invalidFields.email}
        invalidPassword={invalidFields.password}
        messageTone={messageTone}
      />
    </AuthPageShell>
  );
}

function getInvalidSignupFields(code = "", message = "") {
  const errorText = `${code} ${message}`.toLowerCase();
  const password = errorText.includes("password") || errorText.includes("mot de passe");
  const email =
    errorText.includes("email") ||
    errorText.includes("user_already_exists") ||
    errorText.includes("already registered");

  return email || password ? { email, password } : { email: true, password: true };
}
