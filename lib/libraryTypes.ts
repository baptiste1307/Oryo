export type LibraryType = "clients" | "products" | "all";

export type LibraryClient = {
  id: string;
  user_id: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  city: string | null;
  favorite?: boolean | null;
  archived?: boolean | null;
  created_at: string | null;
};

export type LibraryProduct = {
  id: string;
  user_id: string;
  name: string | null;
  type: string | null;
  description: string | null;
  price_ht: number | string | null;
  unit: string | null;
  tva_category?: string | null;
  tva_rate?: number | string | null;
  favorite?: boolean | null;
  created_at: string | null;
  updated_at?: string | null;
  archived?: boolean | null;
};

export type LibraryItem = {
  id: string;
  kind: "client" | "product";
  title: string;
  subtitle: string;
  favorite: boolean;
  createdAt: string;
};
