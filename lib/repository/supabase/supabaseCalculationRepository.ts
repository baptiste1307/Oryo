import { getCalculationPayload } from "@/lib/calculations";
import type { Calculation, CalculationInput } from "@/lib/calculationTypes";
import { supabase } from "@/lib/supabase";
import type { ICalculationRepository } from "../types";

export class SupabaseCalculationRepository implements ICalculationRepository {
  async getAllCalculations(userId: string): Promise<Calculation[]> {
    const { data, error } = await supabase
      .from("calculations")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Erreur lecture calculs Supabase :", error.message);
      return [];
    }

    return (data ?? []) as Calculation[];
  }

  async getCalculationById(id: string, userId: string): Promise<Calculation | null> {
    const { data, error } = await supabase
      .from("calculations")
      .select("*")
      .eq("id", id)
      .eq("user_id", userId)
      .single();

    if (error) {
      console.error("Erreur lecture calcul Supabase :", error.message);
      return null;
    }

    return data as Calculation;
  }

  async saveCalculation(
    userId: string,
    calculation: CalculationInput,
    calculationId?: string,
  ): Promise<string> {
    const calcValues = getCalculationPayload(calculation);

    if (calculationId) {
      const { error } = await supabase
        .from("calculations")
        .update(calcValues)
        .eq("id", calculationId)
        .eq("user_id", userId);

      if (error) throw error;
      return calculationId;
    }

    const { data, error } = await supabase
      .from("calculations")
      .insert(calcValues)
      .select("id")
      .single();

    if (error) throw error;
    if (!data?.id) throw new Error("Échec d'enregistrement du calcul.");

    return data.id as string;
  }

  async deleteCalculation(id: string): Promise<boolean> {
    const { error } = await supabase.from("calculations").delete().eq("id", id);
    if (error) {
      console.error("Erreur suppression calcul Supabase :", error.message);
      return false;
    }
    return true;
  }

  async toggleCalculationFavorite(id: string, favorite: boolean): Promise<boolean> {
    const { error } = await supabase
      .from("calculations")
      .update({ favorite, updated_at: new Date().toISOString() })
      .eq("id", id);

    if (error) {
      console.error("Erreur mise à jour favori calcul Supabase :", error.message);
      return false;
    }

    return true;
  }
}
