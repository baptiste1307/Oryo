import { repository } from "@/lib/repository";

const profileRequests = new Map<string, Promise<Profile | null>>();

export type Profile = {
  id: string;
  avatar_url: string | null;
  plan: string | null;
  company_name?: string | null;
  company_logo_url?: string | null;
  company_logo_size?: number | null;
  company_email?: string | null;
  company_address?: string | null;
  company_phone?: string | null;
  preferred_currency?: string | null;
  default_tva_rate?: number | null;
  quote_prefix?: string | null;
  default_payment_terms?: string | null;
  default_quote_validity_days?: number | null;
};

export async function getProfile(userId: string): Promise<Profile | null> {
  const cachedRequest = profileRequests.get(userId);
  if (cachedRequest) return cachedRequest;

  const request = repository.profiles.getProfile(userId);
  profileRequests.set(userId, request);
  return request;
}

export async function upsertProfile(profile: Profile) {
  const success = await repository.profiles.upsertProfile(profile);
  profileRequests.set(profile.id, Promise.resolve(profile));
  return success;
}
