import { SupportedLanguage, TranslationDictionary } from "./types";
import { en } from "./translations/en";
import { fr } from "./translations/fr";

export * from "./types";

export const translations: Record<SupportedLanguage, TranslationDictionary> = {
  en,
  fr,
};

export const DEFAULT_LANGUAGE: SupportedLanguage = "fr";

export function getDictionary(lang: SupportedLanguage): TranslationDictionary {
  return translations[lang] ?? translations[DEFAULT_LANGUAGE];
}
