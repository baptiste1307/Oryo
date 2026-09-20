import Link from "next/link";

type Props = {
  onFinish: () => void;
  onReset: () => void;
};

export default function CustomizerActions({ onFinish, onReset }: Props) {
  return (
    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
      <Link
        className="button-primary"
        href="/dashboard/build_quote?preview=1"
        onClick={onFinish}
      >
        Terminer
      </Link>
      <button type="button" className="button-secondary" onClick={onReset}>
        Réinitialiser
      </button>
    </div>
  );
}
