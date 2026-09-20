"use client";

import { AuthPageShell } from "@/components/auth/AuthPageShell";
import LoginForm from "./components/LoginForm";
import { getLoginRedirectUrl, getSignupHref } from "./helpers/loginRedirects";
import { useCallback, useEffect, useState } from "react";
import { isMockMode, supabase } from "@/lib/supabase";

export default function ConnectionPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [invalidFields, setInvalidFields] = useState({ email: false, password: false });
  const [signupHref, setSignupHref] = useState("/inscription");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    setSignupHref(getSignupHref(window.location.search));

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  async function handleLogin(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setInvalidFields({ email: false, password: false });

    if (isMockMode()) {
      if (typeof window !== "undefined") {
        window.sessionStorage.removeItem("oryo_mock_signed_out");
      }
      window.location.href = getLoginRedirectUrl(window.location.search);
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage("Erreur de connexion : " + error.message);
      setInvalidFields({ email: true, password: true });
    } else {
      window.location.href = getLoginRedirectUrl(window.location.search);
    }

    setLoading(false);
  }

  const handleGoogleSuccess = useCallback(() => {
    window.location.href = getLoginRedirectUrl(window.location.search);
  }, []);

  const handleGoogleError = useCallback((error: string) => {
    setMessage(error);
    setInvalidFields({ email: false, password: false });
  }, []);

  return (
    <AuthPageShell>
      <LoginForm
        email={email}
        password={password}
        loading={loading}
        message={message}
        signupHref={signupHref}
        onEmailChange={setEmail}
        onPasswordChange={setPassword}
        onSubmit={handleLogin}
        onGoogleSuccess={handleGoogleSuccess}
        onGoogleError={handleGoogleError}
        invalidEmail={invalidFields.email}
        invalidPassword={invalidFields.password}
      />
    </AuthPageShell>
  );
}
