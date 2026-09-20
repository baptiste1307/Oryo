"use client";

import { isMockMode, supabase } from "@/lib/supabase";
import { memo, useEffect, useRef, useState } from "react";
import { createNoncePair, loadGoogleIdentityScript } from "./googleIdentity";

import { useLanguage } from "@/context/LanguageContext";

type Props = {
  onGoogleSuccess: () => void;
  onGoogleError: (message: string) => void;
};

function OAuthButtons({ onGoogleSuccess, onGoogleError }: Props) {
  const buttonContainerRef = useRef<HTMLDivElement | null>(null);
  const callbacksRef = useRef({ onGoogleError, onGoogleSuccess });
  const nonceRef = useRef("");
  const [ready, setReady] = useState(false);
  const { language, isFrench } = useLanguage();

  useEffect(() => {
    callbacksRef.current = { onGoogleError, onGoogleSuccess };
  }, [onGoogleError, onGoogleSuccess]);

  useEffect(() => {
    let cancelled = false;
    let resizeObserver: ResizeObserver | null = null;
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

    async function initializeGoogleButton() {
      if (!clientId || isMockMode()) {
        return;
      }

      await loadGoogleIdentityScript();
      if (cancelled || !window.google || !buttonContainerRef.current) return;

      const { nonce, hashedNonce } = await createNoncePair();
      if (cancelled || !window.google || !buttonContainerRef.current) return;
      nonceRef.current = nonce;

      window.google.accounts.id.initialize({
        client_id: clientId,
        nonce: hashedNonce,
        callback: async (response) => {
          if (!response.credential) {
            callbacksRef.current.onGoogleError(
              isFrench
                ? "Google n'a pas renvoyé de jeton de connexion."
                : "Google did not return an authentication token."
            );
            return;
          }

          const { error } = await supabase.auth.signInWithIdToken({
            provider: "google",
            token: response.credential,
            nonce: nonceRef.current,
          });

          if (error) {
            callbacksRef.current.onGoogleError(
              isFrench
                ? `Erreur connexion Google : ${error.message}`
                : `Google sign in error: ${error.message}`
            );
            return;
          }

          callbacksRef.current.onGoogleSuccess();
        },
      });

      const renderButton = () => {
        const container = buttonContainerRef.current;
        if (!container || !window.google) return;
        const availableWidth = Math.floor(container.getBoundingClientRect().width);
        const width = Math.max(200, Math.min(320, availableWidth));
        container.replaceChildren();
        window.google.accounts.id.renderButton(container, {
          theme: "outline",
          size: "large",
          text: "continue_with",
          shape: "rectangular",
          width,
          locale: language,
        });
      };

      renderButton();
      resizeObserver = new ResizeObserver(renderButton);
      resizeObserver.observe(buttonContainerRef.current);
      setReady(true);
    }

    initializeGoogleButton().catch((error) => {
      callbacksRef.current.onGoogleError(
        error instanceof Error
          ? error.message
          : isFrench
            ? "Chargement Google impossible."
            : "Failed to load Google Identity."
      );
    });

    return () => {
      cancelled = true;
      resizeObserver?.disconnect();
    };
  }, []);

  return (
    <div className="oauth-buttons">
      <div className="google-button-container" ref={buttonContainerRef} aria-busy={!ready} />
    </div>
  );
}

export default memo(OAuthButtons);
