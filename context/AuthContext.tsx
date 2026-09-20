"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { isMockMode, supabase } from "@/lib/supabase";
import { DEMO_USER_ID } from "@/lib/repository/mock/seedData";

export const MOCK_USER: User = {
  id: DEMO_USER_ID,
  app_metadata: { provider: "email" },
  user_metadata: { full_name: "Développeur Démo", email: "demo@oryo.dev" },
  aud: "authenticated",
  confirmation_sent_at: new Date().toISOString(),
  confirmed_at: new Date().toISOString(),
  created_at: new Date().toISOString(),
  email: "demo@oryo.dev",
  phone: "",
  role: "authenticated",
  updated_at: new Date().toISOString(),
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
  signInDemo?: () => void;
  isMock: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const mockActive = typeof window !== "undefined" ? isMockMode() : false;

  const signOut = async () => {
    if (isMockMode()) {
      if (typeof window !== "undefined") {
        window.sessionStorage.setItem("oryo_mock_signed_out", "true");
      }
      setUser(null);
      return;
    }

    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Erreur de déconnexion :", error.message);
      throw error;
    }
    setUser(null);
  };

  const signInDemo = () => {
    if (typeof window !== "undefined") {
      window.sessionStorage.removeItem("oryo_mock_signed_out");
    }
    setUser(MOCK_USER);
  };

  useEffect(() => {
    if (isMockMode()) {
      const isSignedOut =
        typeof window !== "undefined" &&
        window.sessionStorage.getItem("oryo_mock_signed_out") === "true";

      setUser(isSignedOut ? null : MOCK_USER);
      setLoading(false);
      return;
    }

    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signOut,
        signInDemo,
        isMock: isMockMode(),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
