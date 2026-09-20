import { repository } from "@/lib/repository";
import type { QuoteDraft, SaveQuoteDraftInput } from "@/lib/quoteDraftTypes";

export type { QuoteDraft } from "@/lib/quoteDraftTypes";

export async function getQuoteByStatus(
  userId: string,
  status: string,
): Promise<QuoteDraft[]> {
  return repository.quotes.getQuoteByStatus(userId, status);
}

export async function getQuoteDraftById(
  id: string,
  userId: string,
): Promise<QuoteDraft | null> {
  return repository.quotes.getQuoteDraftById(id, userId);
}

export async function saveQuoteDraft(input: SaveQuoteDraftInput): Promise<string> {
  return repository.quotes.saveQuoteDraft(input);
}

export async function deleteQuoteDraft(id: string): Promise<boolean> {
  return repository.quotes.deleteQuoteDraft(id);
}

export async function toggleQuoteFavorite(id: string, favorite: boolean): Promise<boolean> {
  return repository.quotes.toggleQuoteFavorite(id, favorite);
}
