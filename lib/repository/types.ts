import type { Calculation, CalculationInput } from "@/lib/calculationTypes";
import type { LibraryClient, LibraryItem, LibraryProduct, LibraryType } from "@/lib/libraryTypes";
import type { Profile } from "@/lib/profiles";
import type { QuoteDraft, SaveQuoteDraftInput } from "@/lib/quoteDraftTypes";

export interface IProfileRepository {
  getProfile(userId: string): Promise<Profile | null>;
  upsertProfile(profile: Profile): Promise<boolean>;
}

export interface ICalculationRepository {
  getAllCalculations(userId: string): Promise<Calculation[]>;
  getCalculationById(id: string, userId: string): Promise<Calculation | null>;
  saveCalculation(userId: string, calculation: CalculationInput, calculationId?: string): Promise<string>;
  deleteCalculation(id: string): Promise<boolean>;
  toggleCalculationFavorite(id: string, favorite: boolean): Promise<boolean>;
}

export interface ILibraryRepository {
  getLibraryItems(userId: string, type: LibraryType): Promise<LibraryItem[]>;
  getLibraryClients(userId: string, search?: string): Promise<LibraryClient[]>;
  getLibraryProducts(userId: string, search?: string): Promise<LibraryProduct[]>;
  deleteLibraryItem(item: LibraryItem): Promise<boolean>;
  saveClientToLibrary(userId: string, client: Partial<LibraryClient>): Promise<void>;
  saveProductToLibrary(userId: string, product: Partial<LibraryProduct>): Promise<void>;
  getLibraryClientById(userId: string, id: string): Promise<LibraryClient | null>;
  getLibraryProductById(userId: string, id: string): Promise<LibraryProduct | null>;
  toggleLibraryFavorite(item: LibraryItem): Promise<boolean>;
}

export interface IQuoteRepository {
  getQuoteByStatus(userId: string, status: string): Promise<QuoteDraft[]>;
  getQuoteDraftById(id: string, userId: string): Promise<QuoteDraft | null>;
  saveQuoteDraft(input: SaveQuoteDraftInput): Promise<string>;
  deleteQuoteDraft(id: string): Promise<boolean>;
  toggleQuoteFavorite(id: string, favorite: boolean): Promise<boolean>;
}
