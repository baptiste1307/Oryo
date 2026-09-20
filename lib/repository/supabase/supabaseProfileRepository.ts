import { supabase } from "@/lib/supabase";
import type { Profile } from "@/lib/profiles";
import type { IProfileRepository } from "../types";

export class SupabaseProfileRepository implements IProfileRepository {
  async getProfile(userId: string): Promise<Profile | null> {
    const { data, error } = await supabase
      .from("profiles")
      .select(
        "id,avatar_url,plan,company_name,company_logo_url,company_logo_size,company_email,company_address,company_phone,preferred_currency,default_tva_rate,quote_prefix,default_payment_terms,default_quote_validity_days",
      )
      .eq("id", userId)
      .maybeSingle();

    if (error) {
      console.error("Erreur lecture profil Supabase :", error.message);
      return null;
    }

    return data;
  }

  async upsertProfile(profile: Profile): Promise<boolean> {
    const { error } = await supabase.from("profiles").upsert(profile);
    if (error) {
      throw new Error(error.message);
    }
    return true;
  }
}
