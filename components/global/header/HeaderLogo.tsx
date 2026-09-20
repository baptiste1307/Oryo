import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function HeaderLogo() {
  const { user } = useAuth();

  return (
    <Link
      href={user ? "/dashboard" : "/"}
      className="logo-wave"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "12px",
        color: "var(--text)",
        textDecoration: "none",
      }}
    >
      <span
        style={{
          width: "15px",
          height: "15px",
          borderRadius: "999px",
          background: "linear-gradient(135deg, var(--primary), #38b2ac)",
          boxShadow: "0 0 0 6px rgba(15, 118, 110, 0.12)",
        }}
      />

      <Image src="/logo.png" alt="Oryo" width={100} height={35} />
    </Link>
  );
}
