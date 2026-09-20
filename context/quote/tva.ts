import type { TvaCategory } from "./quoteTypes";

export const TVA_RATES: Record<TvaCategory, number> = {
  standard: 0.2,
  restauration: 0.1,
  alimentaire: 0.055,
  export: 0,
};

export function getTvaRate(category: TvaCategory) {
  return TVA_RATES[category] ?? TVA_RATES.standard;
}
