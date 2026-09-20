import { repository } from "@/lib/repository";
export type { Calculation, CalculationInput } from "@/lib/calculationTypes";
import type { Calculation, CalculationInput } from "@/lib/calculationTypes";

/**
 * Prepares and normalizes calculation payload with safe fallback defaults.
 */
export function getCalculationPayload(calculation: CalculationInput) {
  return {
    user_id: calculation.user_id,
    name: calculation.name?.trim() || "New calculation",
    notes: calculation.notes ?? "",
    category: calculation.category ?? "product",
    status: calculation.status ?? "draft",
    favorite: calculation.favorite ?? false,
    cost: calculation.cost,
    shipping_cost: calculation.shipping_cost ?? 0,
    platform_fees: calculation.platform_fees ?? 0,
    payment_fees: calculation.payment_fees ?? 0,
    time_hours: calculation.time_hours ?? 0,
    hourly_rate: calculation.hourly_rate ?? 0,
    total_cost: calculation.total_cost ?? calculation.cost,
    price: calculation.price,
    tva_rate: calculation.tva_rate ?? 20,
    price_ttc: calculation.price_ttc ?? calculation.price,
    profit: calculation.profit,
    margin: calculation.margin,
    target_margin: calculation.target_margin ?? 30,
    suggested_price: calculation.suggested_price ?? 0,
    low_price: calculation.low_price ?? 0,
    recommended_price: calculation.recommended_price ?? 0,
    premium_price: calculation.premium_price ?? 0,
    updated_at: new Date().toISOString(),
  };
}

export async function getAllCalculations(user_id: string): Promise<Calculation[] | null> {
  return repository.calculations.getAllCalculations(user_id);
}

export async function getCalculationById(
  id: string,
  user_id: string,
): Promise<Calculation | null> {
  return repository.calculations.getCalculationById(id, user_id);
}

export async function saveCalculation(
  user_id: string,
  calculation: CalculationInput,
  calculationId?: string,
): Promise<string> {
  return repository.calculations.saveCalculation(user_id, calculation, calculationId);
}

export async function deleteCalculation(id: string): Promise<boolean> {
  return repository.calculations.deleteCalculation(id);
}

export async function toggleCalculationFavorite(id: string, favorite: boolean): Promise<boolean> {
  return repository.calculations.toggleCalculationFavorite(id, favorite);
}
