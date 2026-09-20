import { Quote } from "@/context/QuoteContext";
import { supabase } from "@/lib/supabase";

export async function getQuoteClientId(draftId: string) {
  const { data, error } = await supabase
    .from("quotes")
    .select("client_id")
    .eq("id", draftId)
    .single();

  if (error) throw error;
  return data.client_id as string | null;
}

export async function saveClient(
  quote: Quote,
  userId: string,
  clientId?: string | null,
) {
  const payload = {
    user_id: userId,
    name: quote.client.name,
    email: quote.client.email,
    phone: quote.client.phone,
    address: quote.client.address,
    city: quote.client.city,
  };

  if (clientId) {
    const { error } = await supabase
      .from("clients")
      .update(payload)
      .eq("id", clientId);

    if (error) throw error;
    return clientId;
  }

  const { data, error } = await supabase
    .from("clients")
    .insert(payload)
    .select("id")
    .single();

  if (error) throw error;
  return data.id as string;
}

export async function replaceQuoteItems(draftId: string, quote: Quote) {
  const { error: deleteError } = await supabase
    .from("quote_items")
    .delete()
    .eq("quote_id", draftId);

  if (deleteError) throw deleteError;

  const items = quote.products.map((product) => ({
    quote_id: draftId,
    product_name: product.name,
    price_ht: product.unitPrice,
    quantity: product.quantity,
    tva_rate: product.tvaRate,
    tva_category: product.tvaCategory,
    discount_type: product.discountType,
    discount_value: product.discountValue,
    service_date: product.serviceDate || null,
    description: product.description,
    unit: product.unit,
  }));

  if (items.length === 0) return;

  const { error: insertError } = await supabase
    .from("quote_items")
    .insert(items);

  if (insertError) throw insertError;
}

export async function syncProductsToLibrary(userId: string, quote: Quote) {
  const products = quote.products
    .filter((product) => product.name.trim())
    .map((product) => ({
      user_id: userId,
      name: product.name,
      type: product.type,
      description: product.description,
      price_ht: product.unitPrice,
      unit: product.unit,
      tva_category: product.tvaCategory,
      tva_rate: product.tvaRate,
      updated_at: new Date().toISOString(),
    }));

  if (products.length === 0) return;

  const { error } = await supabase
    .from("products")
    .upsert(products, { onConflict: "user_id,name" });

  if (error) throw error;
}
