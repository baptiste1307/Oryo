type CurrentPasswordFieldProps = {
  value: string;
  onChange: (value: string) => void;
  onForgotPassword: () => void;
  invalid?: boolean;
};

export default function CurrentPasswordField({
  value,
  onChange,
  onForgotPassword,
  invalid = false,
}: CurrentPasswordFieldProps) {
  return (
    <div className="stack">
      <label className="label" htmlFor="current-password">
        Mot de passe actuel
      </label>
      <PasswordInput
        id="current-password"
        name="current-password"
        value={value}
        autoComplete="current-password"
        invalid={invalid}
        onChange={onChange}
      />
      <button
        type="button"
        className="nav-link"
        onClick={onForgotPassword}
        style={{
          width: "fit-content",
          color: "var(--primary)",
          textDecoration: "underline",
          background: "transparent",
          padding: 0,
        }}
      >
        Mot de passe oublié ?
      </button>
    </div>
  );
}
import { PasswordInput } from "@/components/forms/PasswordInput";
