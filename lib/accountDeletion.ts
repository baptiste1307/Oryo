import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";

export async function deleteAccountData(supabase: SupabaseClient, userId: string) {
  const { data: quotes, error: quoteReadError } = await supabase
    .from("quotes")
    .select("id")
    .eq("user_id", userId);
  if (quoteReadError) throw quoteReadError;

  const quoteIds = (quotes ?? []).map((quote) => quote.id as string);
  if (quoteIds.length > 0) {
    const { error } = await supabase.from("quote_items").delete().in("quote_id", quoteIds);
    if (error) throw error;
  }

  await deleteRows(supabase, "quotes", "user_id", userId);
  await deleteRows(supabase, "calculations", "user_id", userId);
  await deleteRows(supabase, "products", "user_id", userId);
  await deleteRows(supabase, "clients", "user_id", userId);
  await deleteRows(supabase, "subscriptions", "user_id", userId);
  await deleteRows(supabase, "profiles", "id", userId);
}

async function deleteRows(
  supabase: SupabaseClient,
  table: string,
  column: string,
  userId: string,
) {
  const { error } = await supabase.from(table).delete().eq(column, userId);
  if (error) throw error;
}
