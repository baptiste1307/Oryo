import { getPlanByName } from "@/lib/plans";
import { getProfile } from "@/lib/profiles";
import { repository } from "@/lib/repository";
import type { LibraryClient, LibraryItem, LibraryProduct, LibraryType } from "@/lib/libraryTypes";

export type { LibraryClient, LibraryItem, LibraryProduct, LibraryType };

export function mapClientToItem(client: LibraryClient): LibraryItem {
  return {
    id: client.id,
    kind: "client",
    title: client.name || "Client sans nom",
    subtitle: client.email || client.phone || client.city || "Informations à compléter",
    favorite: Boolean(client.favorite),
    createdAt: client.created_at ?? "",
  };
}

export function mapProductToItem(product: LibraryProduct): LibraryItem {
  return {
    id: product.id,
    kind: "product",
    title: product.name || "Produit sans nom",
    subtitle: `${Number(product.price_ht ?? 0).toFixed(2)} € HT · ${product.unit || "unité"}`,
    favorite: Boolean(product.favorite),
    createdAt: product.updated_at ?? product.created_at ?? "",
  };
}

export async function getLibraryItems(userId: string, type: LibraryType): Promise<LibraryItem[]> {
  return repository.library.getLibraryItems(userId, type);
}

export async function getLibraryClients(userId: string, search = ""): Promise<LibraryClient[]> {
  return repository.library.getLibraryClients(userId, search);
}

export async function getLibraryProducts(userId: string, search = ""): Promise<LibraryProduct[]> {
  return repository.library.getLibraryProducts(userId, search);
}

export async function deleteLibraryItem(item: LibraryItem): Promise<boolean> {
  return repository.library.deleteLibraryItem(item);
}

export async function getLibraryCount(userId: string): Promise<number> {
  const [clients, products] = await Promise.all([
    getLibraryClients(userId),
    getLibraryProducts(userId),
  ]);
  return clients.length + products.length;
}

export async function canAddLibraryItem(userId: string) {
  const profile = await getProfile(userId);
  const plan = getPlanByName(profile?.plan);
  const limit = plan.limits.libraryCards;

  if (limit === Infinity) {
    return { allowed: true, limit, count: 0 };
  }
  const count = await getLibraryCount(userId);
  return {
    allowed: count < limit,
    limit,
    count,
  };
}

export async function saveClientToLibrary(userId: string, client: Partial<LibraryClient>): Promise<void> {
  return repository.library.saveClientToLibrary(userId, client);
}

export async function saveProductToLibrary(userId: string, product: Partial<LibraryProduct>): Promise<void> {
  return repository.library.saveProductToLibrary(userId, product);
}

export async function getLibraryClientById(userId: string, id: string): Promise<LibraryClient | null> {
  return repository.library.getLibraryClientById(userId, id);
}

export async function getLibraryProductById(userId: string, id: string): Promise<LibraryProduct | null> {
  return repository.library.getLibraryProductById(userId, id);
}

export async function toggleLibraryFavorite(item: LibraryItem): Promise<boolean> {
  return repository.library.toggleLibraryFavorite(item);
}
