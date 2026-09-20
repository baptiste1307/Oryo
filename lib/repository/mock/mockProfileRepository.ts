import type { Profile } from "@/lib/profiles";
import type { IProfileRepository } from "../types";
import { readStore, writeStore } from "./mockStore";
import { SEED_PROFILE } from "./seedData";

export class MockProfileRepository implements IProfileRepository {
  async getProfile(userId: string): Promise<Profile | null> {
    const profile = readStore<Profile>("profile", SEED_PROFILE);
    return { ...profile, id: userId };
  }

  async upsertProfile(profile: Profile): Promise<boolean> {
    const current = readStore<Profile>("profile", SEED_PROFILE);
    writeStore("profile", { ...current, ...profile });
    return true;
  }
}
