import { AuthCard } from "@/components/auth/AuthCard";
import { EmailPasswordFields } from "@/components/auth/EmailPasswordFields";
import OAuthButtons from "@/components/auth/OAuthButtons";
import { FormMessage } from "@/components/forms/FormMessage";
import { useLanguage } from "@/context/LanguageContext";

type SignupFormProps = {
  email: string;
  password: string;
  message: string;
  loginHref: string;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onGoogleSuccess: () => void;
  onGoogleError: (message: string) => void;
  invalidEmail: boolean;
  invalidPassword: boolean;
  messageTone: "error" | "success";
};

export function SignupForm({
  email,
  password,
  message,
  loginHref,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  onGoogleSuccess,
  onGoogleError,
  invalidEmail,
  invalidPassword,
  messageTone,
}: SignupFormProps) {
  const { t, isFrench } = useLanguage();

  return (
    <AuthCard
      title={t.auth.signupTitle}
      prompt={t.auth.hasAccount}
      linkLabel={isFrench ? "Se connecter" : "Log In"}
      linkHref={loginHref}
    >
      <form className="stack" onSubmit={onSubmit}>
        <EmailPasswordFields
          idPrefix="signup"
          email={email}
          password={password}
          onEmailChange={onEmailChange}
          onPasswordChange={onPasswordChange}
          invalidEmail={invalidEmail}
          invalidPassword={invalidPassword}
        />
        <button className="button-primary" type="submit">
          {t.auth.signupButton}
        </button>
        <FormMessage message={message} tone={messageTone} />
      </form>
      <OAuthButtons onGoogleSuccess={onGoogleSuccess} onGoogleError={onGoogleError} />
    </AuthCard>
  );
}
