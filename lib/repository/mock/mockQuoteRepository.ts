import type { QuoteDraft, SaveQuoteDraftInput } from "@/lib/quoteDraftTypes";
import type { IQuoteRepository } from "../types";
import { readStore, writeStore } from "./mockStore";
import { SEED_QUOTES } from "./seedData";

export class MockQuoteRepository implements IQuoteRepository {
  async getQuoteByStatus(_userId: string, status: string): Promise<QuoteDraft[]> {
    const list = readStore<QuoteDraft[]>("quotes", SEED_QUOTES);
    let result = list;
    if (status !== "all_quotes") {
      result = result.filter((q) => q.status === status);
    }
    return [...result].sort((a, b) => Date.parse(b.updatedAt || "") - Date.parse(a.updatedAt || ""));
  }

  async getQuoteDraftById(id: string, _userId: string): Promise<QuoteDraft | null> {
    const list = readStore<QuoteDraft[]>("quotes", SEED_QUOTES);
    return list.find((q) => q.id === id) ?? null;
  }

  async saveQuoteDraft({
    quote,
    draftId,
    status = "draft",
  }: SaveQuoteDraftInput): Promise<string> {
    const list = readStore<QuoteDraft[]>("quotes", SEED_QUOTES);
    const id = draftId || `quote-demo-${Date.now()}`;
    const now = new Date().toISOString();
    const existing = draftId ? list.find((q) => q.id === draftId) : null;

    const totalPrice = (quote.products || []).reduce((sum, p) => {
      return sum + (Number(p.unitPrice) || 0) * (Number(p.quantity) || 1);
    }, 0);

    const updatedDraft: QuoteDraft = {
      id,
      status: status || existing?.status || "draft",
      favorite: existing?.favorite ?? false,
      createdAt: existing?.createdAt ?? now,
      updatedAt: now,
      totalPrice,
      quote: { ...quote },
    };

    const existingIndex = list.findIndex((q) => q.id === id);
    if (existingIndex !== -1) {
      list[existingIndex] = updatedDraft;
    } else {
      list.unshift(updatedDraft);
    }

    writeStore("quotes", list);
    return id;
  }

  async deleteQuoteDraft(id: string): Promise<boolean> {
    const list = readStore<QuoteDraft[]>("quotes", SEED_QUOTES);
    const filtered = list.filter((q) => q.id !== id);
    writeStore("quotes", filtered);
    return true;
  }

  async toggleQuoteFavorite(id: string, favorite: boolean): Promise<boolean> {
    const list = readStore<QuoteDraft[]>("quotes", SEED_QUOTES);
    const target = list.find((q) => q.id === id);
    if (target) {
      target.favorite = favorite;
      target.updatedAt = new Date().toISOString();
      writeStore("quotes", list);
    }
    return true;
  }
}
