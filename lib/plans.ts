/**
 * Application feature limits configuration.
 * Oryo is 100% free and open-source: all features, templates, and PDF exports
 * are completely unlocked for all users without restrictions.
 */

export interface PlanDefinition {
  name: string;
  price: number;
  description: string;
  limits: {
    publicProfitCalculator: boolean;
    publicQuotePreview: boolean;
    quoteModels: string;
    quoteCreation: string;
    quotePdfExportsPerMonth: number;
    quoteCustomization: string;
    calculationCreation: string;
    calculationExports: string;
    libraryCards: number;
    customLogo: boolean;
    advancedQuoteTemplates: boolean;
    futurePremiumTools: boolean;
    quotesPerMonth: number;
    products: number;
    savings: string;
    clientLibrary: number;
  };
  highlights: string[];
}

export const PLANS = {
  free: {
    name: "Gratuit",
    price: 0,
    description: "Open access for all users",
    limits: {
      publicProfitCalculator: true,
      publicQuotePreview: true,
      quoteModels: "plusieurs",
      quoteCreation: "illimitée",
      quotePdfExportsPerMonth: Infinity,
      quoteCustomization: "complète",
      calculationCreation: "illimitée",
      calculationExports: "illimités",
      libraryCards: Infinity,
      customLogo: true,
      advancedQuoteTemplates: true,
      futurePremiumTools: true,
      quotesPerMonth: Infinity,
      products: Infinity,
      savings: "illimitée",
      clientLibrary: Infinity,
    },
    highlights: [
      "Calculateur de rentabilité",
      "Création de devis illimitée",
      "Exports PDF illimités",
      "Bibliothèque complète",
      "Tous les modèles de devis débloqués",
    ],
  },
} as const;

export type PlanKey = keyof typeof PLANS;

export function getPlanByName(_planName?: string | null) {
  return PLANS.free;
}

export function formatPlanLimit(
  value: number | string | boolean,
  lang: "en" | "fr" = "fr"
): string {
  if (value === Infinity) return lang === "fr" ? "Illimité" : "Unlimited";
  if (value === true) return lang === "fr" ? "Inclus" : "Included";
  if (value === false) return lang === "fr" ? "Non inclus" : "Not included";
  if (typeof value === "string") {
    if (lang === "en") {
      const mapping: Record<string, string> = {
        illimitée: "Unlimited",
        illimités: "Unlimited",
        "Couleur uniquement": "Color only",
        complète: "Full",
        plusieurs: "All available",
      };
      return mapping[value] ?? value;
    }
  }
  return String(value);
}
