type FormMessageProps = {
  message: string;
  tone?: "error" | "success" | "info";
};

export function FormMessage({ message, tone = "error" }: FormMessageProps) {
  if (!message) return null;

  return (
    <p
      className={`form-message form-message-${tone}`}
      role={tone === "error" ? "alert" : "status"}
    >
      {message}
    </p>
  );
}
