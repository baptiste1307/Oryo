import { PasswordInput } from "@/components/forms/PasswordInput";

type NewPasswordFieldsProps = {
  password: string;
  confirmPassword: string;
  invalidPassword: boolean;
  invalidConfirmation: boolean;
  onPasswordChange: (value: string) => void;
  onConfirmPasswordChange: (value: string) => void;
};

export default function NewPasswordFields({
  password,
  confirmPassword,
  invalidPassword,
  invalidConfirmation,
  onPasswordChange,
  onConfirmPasswordChange,
}: NewPasswordFieldsProps) {
  return (
    <>
      <div className="stack">
        <label className="label" htmlFor="new-password">
          Nouveau mot de passe
        </label>
        <PasswordInput
          id="new-password"
          name="new-password"
          value={password}
          autoComplete="new-password"
          invalid={invalidPassword}
          onChange={onPasswordChange}
        />
      </div>
      <div className="stack">
        <label className="label" htmlFor="confirm-password">
          Confirmer le mot de passe
        </label>
        <PasswordInput
          id="confirm-password"
          name="confirm-password"
          value={confirmPassword}
          autoComplete="new-password"
          invalid={invalidConfirmation}
          onChange={onConfirmPasswordChange}
        />
      </div>
    </>
  );
}
