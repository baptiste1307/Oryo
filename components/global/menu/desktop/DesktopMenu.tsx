import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useUI } from "@/context/UIContext";
import { useEffect, useRef } from "react";

export default function DesktopMenu() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const { spaceMenuOpen, setSpaceMenuOpen } = useUI();

  const spaceMenuCloseTimeout = useRef<NodeJS.Timeout | null>(null);

  const logout = async () => {
    await signOut();
    setSpaceMenuOpen(false);
    router.replace("/");
  };

  useEffect(() => {
    return () => {
      if (spaceMenuCloseTimeout.current) {
        clearTimeout(spaceMenuCloseTimeout.current);
      }
    };
  }, []);

  return (
    <div
      style={{ position: "relative" }}
      data-space-menu
      onMouseEnter={() => {
        if (spaceMenuCloseTimeout.current) {
          clearTimeout(spaceMenuCloseTimeout.current);
          spaceMenuCloseTimeout.current = null;
        }
        setSpaceMenuOpen(true);
      }}
      onMouseLeave={() => {
        spaceMenuCloseTimeout.current = setTimeout(() => {
          setSpaceMenuOpen(false);
        }, 180);
      }}
    >
      <button onClick={(e) => e.preventDefault()} className="button-primary">
        Mon espace
      </button>

      {spaceMenuOpen && user && (
        <div
          style={{
            position: "absolute",
            top: "110%",
            right: 0,
            background: "white",
            borderRadius: "12px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
            padding: "12px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            minWidth: "180px",
            zIndex: 3000,
          }}
        >
          <Link href="/dashboard" className="nav-link">
            Dashboard
          </Link>
          <Link href="/compte" className="nav-link">
            Mon compte
          </Link>
          <a
            onClick={logout}
            className="nav-link"
            style={{ cursor: "pointer" }}
          >
            Déconnexion
          </a>
        </div>
      )}

      {spaceMenuOpen && !user && (
        <div
          style={{
            position: "absolute",
            top: "110%",
            right: 0,
            background: "white",
            borderRadius: "12px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
            padding: "12px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            minWidth: "180px",
            zIndex: 3000,
          }}
        >
          <Link href="/connexion" className="nav-link">
            Connexion
          </Link>
          <Link href="/inscription" className="nav-link">
            Inscription
          </Link>
        </div>
      )}
    </div>
  );
}
