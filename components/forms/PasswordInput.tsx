"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

type PasswordInputProps = {
  id?: string;
  name: string;
  value: string;
  autoComplete?: string;
  required?: boolean;
  invalid?: boolean;
  onChange: (value: string) => void;
};

export function PasswordInput({
  id,
  name,
  value,
  autoComplete,
  required,
  invalid = false,
  onChange,
}: PasswordInputProps) {
  const [visible, setVisible] = useState(false);
  const toggleVisibility = () => setVisible((current) => !current);

  return (
    <div className="password-input-wrapper">
      <input
        id={id}
        name={name}
        className="input password-input"
        type={visible ? "text" : "password"}
        autoComplete={autoComplete}
        autoCapitalize="none"
        autoCorrect="off"
        spellCheck={false}
        required={required}
        aria-invalid={invalid}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
      <button
        type="button"
        className="password-visibility-button"
        aria-label={visible ? "Masquer le mot de passe" : "Afficher le mot de passe"}
        aria-pressed={visible}
        onPointerDown={(event) => {
          event.preventDefault();
          toggleVisibility();
        }}
        onClick={(event) => {
          if (event.detail === 0) toggleVisibility();
        }}
        onKeyDown={(event) => {
          if (event.key !== "Enter" && event.key !== " ") return;
          event.preventDefault();
          toggleVisibility();
        }}
      >
        {visible ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  );
}
