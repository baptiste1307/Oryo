type GoogleInitializeOptions = {
  client_id: string;
  callback: (response: { credential?: string }) => void;
  nonce?: string;
};

type GoogleButtonOptions = {
  theme: "outline" | "filled_blue" | "filled_black";
  size: "large" | "medium" | "small";
  text: "continue_with" | "signin_with" | "signup_with";
  shape: "rectangular" | "pill" | "circle" | "square";
  width?: number;
  locale?: string;
};

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (options: GoogleInitializeOptions) => void;
          renderButton: (parent: HTMLElement, options: GoogleButtonOptions) => void;
        };
      };
    };
  }
}

export function loadGoogleIdentityScript() {
  const selector = 'script[src="https://accounts.google.com/gsi/client"]';
  const existingScript = document.querySelector<HTMLScriptElement>(selector);

  if (window.google) return Promise.resolve();
  if (existingScript) return waitForScript(existingScript);

  const script = document.createElement("script");
  script.src = "https://accounts.google.com/gsi/client";
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);
  return waitForScript(script);
}

export async function createNoncePair() {
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  const nonce = btoa(String.fromCharCode(...bytes));
  const encodedNonce = new TextEncoder().encode(nonce);
  const hashBuffer = await crypto.subtle.digest("SHA-256", encodedNonce);
  const hashedNonce = Array.from(new Uint8Array(hashBuffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");

  return { nonce, hashedNonce };
}

function waitForScript(script: HTMLScriptElement) {
  return new Promise<void>((resolve, reject) => {
    script.addEventListener("load", () => resolve(), { once: true });
    script.addEventListener("error", () => reject(new Error("Chargement Google impossible.")), {
      once: true,
    });
  });
}
