import { AuthCard } from "@/components/auth/AuthCard";
import { EmailPasswordFields } from "@/components/auth/EmailPasswordFields";
import OAuthButtons from "@/components/auth/OAuthButtons";
import { FormMessage } from "@/components/forms/FormMessage";
import { useLanguage } from "@/context/LanguageContext";

type LoginFormProps = {
  email: string;
  password: string;
  loading: boolean;
  message: string;
  signupHref: string;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onGoogleSuccess: () => void;
  onGoogleError: (message: string) => void;
  invalidEmail: boolean;
  invalidPassword: boolean;
};

export default function LoginForm({
  email,
  password,
  loading,
  message,
  signupHref,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  onGoogleSuccess,
  onGoogleError,
  invalidEmail,
  invalidPassword,
}: LoginFormProps) {
  const { t, isFrench } = useLanguage();

  return (
    <AuthCard
      title={t.auth.loginTitle}
      prompt={t.auth.noAccount}
      linkLabel={isFrench ? "S'inscrire" : "Sign Up"}
      linkHref={signupHref}
    >
      <form className="stack" onSubmit={onSubmit}>
        <EmailPasswordFields
          idPrefix="login"
          email={email}
          password={password}
          onEmailChange={onEmailChange}
          onPasswordChange={onPasswordChange}
          invalidEmail={invalidEmail}
          invalidPassword={invalidPassword}
        />
        <button className="button-primary" type="submit" disabled={loading}>
          {loading ? t.auth.loggingIn : t.auth.loginButton}
        </button>
        <FormMessage message={message} />
      </form>
      <OAuthButtons onGoogleSuccess={onGoogleSuccess} onGoogleError={onGoogleError} />
    </AuthCard>
  );
}
