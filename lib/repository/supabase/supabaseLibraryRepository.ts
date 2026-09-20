import { mapClientToItem, mapProductToItem } from "@/lib/library";
import type { LibraryClient, LibraryItem, LibraryProduct, LibraryType } from "@/lib/libraryTypes";
import { supabase } from "@/lib/supabase";
import type { ILibraryRepository } from "../types";

export class SupabaseLibraryRepository implements ILibraryRepository {
  async getLibraryItems(userId: string, type: LibraryType): Promise<LibraryItem[]> {
    const [clients, products] = await Promise.all([
      type !== "products" ? this.getLibraryClients(userId) : Promise.resolve([]),
      type !== "clients" ? this.getLibraryProducts(userId) : Promise.resolve([]),
    ]);
    return [
      ...clients.map(mapClientToItem),
      ...products.map(mapProductToItem),
    ].sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
  }

  async getLibraryClients(userId: string, search = ""): Promise<LibraryClient[]> {
    let query = supabase
      .from("clients")
      .select("*")
      .eq("user_id", userId)
      .eq("archived", false)
      .order("created_at", { ascending: false });

    if (search.trim()) query = query.ilike("name", `%${search.trim()}%`);
    const { data, error } = await query;
    if (error) {
      console.error("Erreur lecture clients Supabase :", error.message);
      return [];
    }
    return (data ?? []) as LibraryClient[];
  }

  async getLibraryProducts(userId: string, search = ""): Promise<LibraryProduct[]> {
    let query = supabase
      .from("products")
      .select("*")
      .eq("user_id", userId)
      .eq("archived", false)
      .order("created_at", { ascending: false });

    if (search.trim()) query = query.ilike("name", `%${search.trim()}%`);
    const { data, error } = await query;
    if (error) {
      console.error("Erreur lecture produits Supabase :", error.message);
      return [];
    }
    return (data ?? []) as LibraryProduct[];
  }

  async deleteLibraryItem(item: LibraryItem): Promise<boolean> {
    const table = item.kind === "client" ? "clients" : "products";
    const { error } = await supabase
      .from(table)
      .update({ archived: true })
      .eq("id", item.id);
    if (error) console.error("Erreur suppression bibliothèque Supabase :", error.message);
    return !error;
  }

  async saveClientToLibrary(userId: string, client: Partial<LibraryClient>): Promise<void> {
    if (client.id) {
      const { error } = await supabase
        .from("clients")
        .update({
          name: client.name ?? "",
          email: client.email ?? "",
          phone: client.phone ?? "",
          address: client.address ?? "",
          city: client.city ?? "",
        })
        .eq("id", client.id)
        .eq("user_id", userId);
      if (error) throw error;
      return;
    }

    const payload = {
      user_id: userId,
      name: client.name ?? "",
      email: client.email ?? "",
      phone: client.phone ?? "",
      address: client.address ?? "",
      city: client.city ?? "",
      archived: false,
    };
    const { error } = await supabase.from("clients").insert(payload);
    if (error) throw error;
  }

  async saveProductToLibrary(userId: string, product: Partial<LibraryProduct>): Promise<void> {
    const payload = {
      user_id: userId,
      name: product.name ?? "",
      type: product.type ?? "service",
      description: product.description ?? "",
      price_ht: product.price_ht ?? 0,
      unit: product.unit ?? "heure",
      tva_category: product.tva_category ?? "standard",
      tva_rate: product.tva_rate ?? 20,
      archived: false,
      updated_at: new Date().toISOString(),
    };
    const { error } = await supabase
      .from("products")
      .upsert(payload, { onConflict: "user_id,name" });
    if (error) throw error;
  }

  async getLibraryClientById(userId: string, id: string): Promise<LibraryClient | null> {
    const { data, error } = await supabase
      .from("clients")
      .select("*")
      .eq("user_id", userId)
      .eq("id", id)
      .single();
    if (error) return null;
    return data as LibraryClient;
  }

  async getLibraryProductById(userId: string, id: string): Promise<LibraryProduct | null> {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("user_id", userId)
      .eq("id", id)
      .single();
    if (error) return null;
    return data as LibraryProduct;
  }

  async toggleLibraryFavorite(item: LibraryItem): Promise<boolean> {
    const table = item.kind === "client" ? "clients" : "products";
    const { error } = await supabase
      .from(table)
      .update({ favorite: !item.favorite })
      .eq("id", item.id);
    if (error) console.error("Erreur favori bibliothèque Supabase :", error.message);
    return !error;
  }
}
