import { mapRowToDraft } from "@/lib/quoteDraftMapper";
import { buildQuotePayload } from "@/lib/quoteDraftPayload";
import {
  getQuoteClientId,
  replaceQuoteItems,
  saveClient,
  syncProductsToLibrary,
} from "@/lib/quoteDraftPersistence";
import type { QuoteDraft, QuoteRow, SaveQuoteDraftInput } from "@/lib/quoteDraftTypes";
import { supabase } from "@/lib/supabase";
import type { IQuoteRepository } from "../types";

export class SupabaseQuoteRepository implements IQuoteRepository {
  async getQuoteByStatus(userId: string, status: string): Promise<QuoteDraft[]> {
    let query = supabase
      .from("quotes")
      .select(
        `
        id,
        user_id,
        client_id,
        status,
        favorite,
        created_at,
        updated_at,
        effective_date,
        valid_until,
        quote_number,
        conditions,
        currency,
        decimal_places,
        clients (*),
        quote_items (*)
      `,
      )
      .eq("user_id", userId)
      .order("updated_at", { ascending: false });

    if (status !== "all_quotes") {
      query = query.eq("status", status);
    }

    const { data, error } = await query;
    if (error) {
      console.error("Erreur lecture brouillons Supabase :", error.message);
      return [];
    }

    return ((data ?? []) as unknown as QuoteRow[]).map(mapRowToDraft);
  }

  async getQuoteDraftById(id: string, userId: string): Promise<QuoteDraft | null> {
    const { data, error } = await supabase
      .from("quotes")
      .select(
        `
        *,
        clients (*),
        quote_items (*)
      `,
      )
      .eq("id", id)
      .eq("user_id", userId)
      .single();

    if (error) {
      console.error("Erreur lecture brouillon Supabase :", error.message);
      return null;
    }

    return mapRowToDraft(data as QuoteRow);
  }

  async saveQuoteDraft({
    quote,
    userId,
    draftId,
    status = "draft",
  }: SaveQuoteDraftInput): Promise<string> {
    const existingClientId = draftId ? await getQuoteClientId(draftId) : null;
    const clientId = await saveClient(quote, userId, existingClientId);
    const quotePayload = buildQuotePayload({ clientId, quote, status, userId });

    let savedQuoteId = draftId ?? null;

    if (draftId) {
      const { error } = await supabase
        .from("quotes")
        .update(quotePayload)
        .eq("id", draftId);

      if (error) throw error;
    } else {
      const { data, error } = await supabase
        .from("quotes")
        .insert(quotePayload)
        .select("id")
        .single();

      if (error) throw error;
      savedQuoteId = data.id as string;
    }

    if (!savedQuoteId) {
      throw new Error("Le brouillon n'a pas pu être enregistré.");
    }

    await replaceQuoteItems(savedQuoteId, quote);
    await syncProductsToLibrary(userId, quote);

    return savedQuoteId;
  }

  async deleteQuoteDraft(id: string): Promise<boolean> {
    const { error } = await supabase.from("quotes").delete().eq("id", id);
    if (error) {
      console.error("Erreur suppression brouillon Supabase :", error.message);
      return false;
    }
    return true;
  }

  async toggleQuoteFavorite(id: string, favorite: boolean): Promise<boolean> {
    const { error } = await supabase
      .from("quotes")
      .update({ favorite })
      .eq("id", id);

    if (error) {
      console.error("Erreur mise à jour favori devis Supabase :", error.message);
      return false;
    }

    return true;
  }
}
