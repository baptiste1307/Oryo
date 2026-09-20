import { createClient } from "@supabase/supabase-js";

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const rawAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * Détermine si l'application tourne en mode démo / mock
 * Actif si forcé par NEXT_PUBLIC_MOCK_MODE=true ou si aucune clé Supabase valide n'est configurée.
 */
export function isMockMode(): boolean {
  if (process.env.NEXT_PUBLIC_MOCK_MODE === "true") return true;
  if (!rawUrl || rawUrl.includes("your-project-id") || rawUrl.includes("placeholder")) return true;
  if (!rawAnonKey || rawAnonKey.includes("your-supabase-anon-key") || rawAnonKey.includes("placeholder")) return true;
  return false;
}

const supabaseUrl = rawUrl && !rawUrl.includes("your-project-id") ? rawUrl : "https://placeholder.supabase.co";
const supabaseAnonKey = rawAnonKey && !rawAnonKey.includes("your-supabase-anon-key") ? rawAnonKey : "placeholder-anon-key";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);