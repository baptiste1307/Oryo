import { mapClientToItem, mapProductToItem } from "@/lib/library";
import type { LibraryClient, LibraryItem, LibraryProduct, LibraryType } from "@/lib/libraryTypes";
import type { ILibraryRepository } from "../types";
import { readStore, writeStore } from "./mockStore";
import { SEED_CLIENTS, SEED_PRODUCTS } from "./seedData";

export class MockLibraryRepository implements ILibraryRepository {
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
    const list = readStore<LibraryClient[]>("clients", SEED_CLIENTS);
    return list
      .filter((c) => (c.user_id === userId || !c.user_id) && !c.archived)
      .filter((c) => !search.trim() || (c.name?.toLowerCase().includes(search.toLowerCase())));
  }

  async getLibraryProducts(userId: string, search = ""): Promise<LibraryProduct[]> {
    const list = readStore<LibraryProduct[]>("products", SEED_PRODUCTS);
    return list
      .filter((p) => (p.user_id === userId || !p.user_id) && !p.archived)
      .filter((p) => !search.trim() || (p.name?.toLowerCase().includes(search.toLowerCase())));
  }

  async deleteLibraryItem(item: LibraryItem): Promise<boolean> {
    if (item.kind === "client") {
      const clients = readStore<LibraryClient[]>("clients", SEED_CLIENTS);
      const target = clients.find((c) => c.id === item.id);
      if (target) {
        target.archived = true;
        writeStore("clients", clients);
      }
    } else {
      const products = readStore<LibraryProduct[]>("products", SEED_PRODUCTS);
      const target = products.find((p) => p.id === item.id);
      if (target) {
        target.archived = true;
        writeStore("products", products);
      }
    }
    return true;
  }

  async saveClientToLibrary(userId: string, client: Partial<LibraryClient>): Promise<void> {
    const clients = readStore<LibraryClient[]>("clients", SEED_CLIENTS);
    const existingIndex = client.id ? clients.findIndex((c) => c.id === client.id) : -1;

    if (existingIndex !== -1) {
      clients[existingIndex] = {
        ...clients[existingIndex],
        ...client,
        user_id: userId,
      };
      writeStore("clients", clients);
      return;
    }

    const newClient: LibraryClient = {
      id: client.id || `client-demo-${Date.now()}`,
      user_id: userId,
      name: client.name ?? "",
      email: client.email ?? "",
      phone: client.phone ?? "",
      address: client.address ?? "",
      city: client.city ?? "",
      favorite: client.favorite ?? false,
      archived: false,
      created_at: new Date().toISOString(),
    };
    clients.unshift(newClient);
    writeStore("clients", clients);
  }

  async saveProductToLibrary(userId: string, product: Partial<LibraryProduct>): Promise<void> {
    const products = readStore<LibraryProduct[]>("products", SEED_PRODUCTS);
    const existingIndex = products.findIndex((p) => p.name?.toLowerCase() === product.name?.toLowerCase());

    const payload: LibraryProduct = {
      id: product.id || (existingIndex !== -1 ? products[existingIndex].id : `product-demo-${Date.now()}`),
      user_id: userId,
      name: product.name ?? "",
      type: product.type ?? "service",
      description: product.description ?? "",
      price_ht: product.price_ht ?? 0,
      unit: product.unit ?? "unité",
      tva_category: product.tva_category ?? "standard",
      tva_rate: product.tva_rate ?? 20,
      favorite: product.favorite ?? false,
      archived: false,
      created_at: existingIndex !== -1 ? products[existingIndex].created_at : new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (existingIndex !== -1) {
      products[existingIndex] = payload;
    } else {
      products.unshift(payload);
    }
    writeStore("products", products);
  }

  async getLibraryClientById(userId: string, id: string): Promise<LibraryClient | null> {
    const clients = readStore<LibraryClient[]>("clients", SEED_CLIENTS);
    return clients.find((c) => c.id === id && (c.user_id === userId || !c.user_id)) ?? null;
  }

  async getLibraryProductById(userId: string, id: string): Promise<LibraryProduct | null> {
    const products = readStore<LibraryProduct[]>("products", SEED_PRODUCTS);
    return products.find((p) => p.id === id && (p.user_id === userId || !p.user_id)) ?? null;
  }

  async toggleLibraryFavorite(item: LibraryItem): Promise<boolean> {
    if (item.kind === "client") {
      const clients = readStore<LibraryClient[]>("clients", SEED_CLIENTS);
      const target = clients.find((c) => c.id === item.id);
      if (target) {
        target.favorite = !target.favorite;
        writeStore("clients", clients);
      }
    } else {
      const products = readStore<LibraryProduct[]>("products", SEED_PRODUCTS);
      const target = products.find((p) => p.id === item.id);
      if (target) {
        target.favorite = !target.favorite;
        writeStore("products", products);
      }
    }
    return true;
  }
}
