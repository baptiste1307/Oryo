"use client";

import { useLanguage } from "@/context/LanguageContext";
import { PasswordInput } from "@/components/forms/PasswordInput";

type EmailPasswordFieldsProps = {
  idPrefix: string;
  email: string;
  password: string;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  invalidEmail?: boolean;
  invalidPassword?: boolean;
};

export function EmailPasswordFields({
  idPrefix,
  email,
  password,
  onEmailChange,
  onPasswordChange,
  invalidEmail = false,
  invalidPassword = false,
}: EmailPasswordFieldsProps) {
  const { t } = useLanguage();

  return (
    <>
      <div>
        <label className="label" htmlFor={`${idPrefix}-email`}>
          {t.auth.emailLabel}
        </label>
        <input
          id={`${idPrefix}-email`}
          name="username"
          className="input"
          type="email"
          autoComplete={idPrefix === "login" ? "username" : "email"}
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          required
          aria-invalid={invalidEmail}
          placeholder={t.auth.emailPlaceholder}
          value={email}
          onChange={(event) => onEmailChange(event.target.value)}
        />
      </div>

      <div>
        <label className="label" htmlFor={`${idPrefix}-password`}>
          {t.auth.passwordLabel}
        </label>
        <PasswordInput
          id={`${idPrefix}-password`}
          name="password"
          autoComplete={idPrefix === "signup" ? "new-password" : "current-password"}
          required
          invalid={invalidPassword}
          value={password}
          onChange={onPasswordChange}
        />
      </div>
    </>
  );
}
