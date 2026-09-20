import { isMockMode } from "@/lib/supabase";
import { MockCalculationRepository } from "./mock/mockCalculationRepository";
import { MockLibraryRepository } from "./mock/mockLibraryRepository";
import { MockProfileRepository } from "./mock/mockProfileRepository";
import { MockQuoteRepository } from "./mock/mockQuoteRepository";
import { initMockStorage } from "./mock/mockStore";
import { SupabaseCalculationRepository } from "./supabase/supabaseCalculationRepository";
import { SupabaseLibraryRepository } from "./supabase/supabaseLibraryRepository";
import { SupabaseProfileRepository } from "./supabase/supabaseProfileRepository";
import { SupabaseQuoteRepository } from "./supabase/supabaseQuoteRepository";
import type {
  ICalculationRepository,
  ILibraryRepository,
  IProfileRepository,
  IQuoteRepository,
} from "./types";

export * from "./types";

class RepositoryHub {
  private mockProfile = new MockProfileRepository();
  private mockCalculations = new MockCalculationRepository();
  private mockLibrary = new MockLibraryRepository();
  private mockQuotes = new MockQuoteRepository();

  private supabaseProfile = new SupabaseProfileRepository();
  private supabaseCalculations = new SupabaseCalculationRepository();
  private supabaseLibrary = new SupabaseLibraryRepository();
  private supabaseQuotes = new SupabaseQuoteRepository();

  constructor() {
    if (typeof window !== "undefined" && isMockMode()) {
      initMockStorage();
    }
  }

  get profiles(): IProfileRepository {
    return isMockMode() ? this.mockProfile : this.supabaseProfile;
  }

  get calculations(): ICalculationRepository {
    return isMockMode() ? this.mockCalculations : this.supabaseCalculations;
  }

  get library(): ILibraryRepository {
    return isMockMode() ? this.mockLibrary : this.supabaseLibrary;
  }

  get quotes(): IQuoteRepository {
    return isMockMode() ? this.mockQuotes : this.supabaseQuotes;
  }
}

export const repository = new RepositoryHub();
