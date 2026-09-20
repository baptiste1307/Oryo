-- ==============================================================================
-- SUPABASE DATABASE SCHEMA (ORYO)
-- ==============================================================================
-- 100% idempotent, production-ready PostgreSQL DDL with Row Level Security (RLS).
-- Completely free, open-source business suite: quotes, products, clients & margins.
--
-- Setup Instructions:
-- 1. Create a free project on https://supabase.com
-- 2. Open the "SQL Editor" in your Supabase dashboard
-- 3. Paste this script and execute it (Run)
-- ==============================================================================

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==============================================================================
-- 1. TABLE: PROFILES (User Settings & Branding)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  avatar_url TEXT,
  plan TEXT NOT NULL DEFAULT 'free',
  company_name TEXT DEFAULT '',
  professional_preferences TEXT DEFAULT '',
  company_logo_url TEXT DEFAULT '',
  company_logo_size NUMERIC DEFAULT 52,
  company_email TEXT DEFAULT '',
  company_address TEXT DEFAULT '',
  company_phone TEXT DEFAULT '',
  preferred_currency TEXT DEFAULT 'EUR',
  default_tva_rate NUMERIC DEFAULT 20,
  quote_prefix TEXT DEFAULT 'DEV',
  default_payment_terms TEXT DEFAULT 'Payment upon receipt of invoice',
  default_quote_validity_days INTEGER DEFAULT 30,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL
);

-- ==============================================================================
-- 2. TABLE: CLIENTS (Micro-CRM)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  name TEXT,
  email TEXT,
  phone TEXT,
  address TEXT,
  city TEXT,
  favorite BOOLEAN DEFAULT FALSE,
  archived BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- 3. TABLE: PRODUCTS (Catalog Items)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  type TEXT,
  description TEXT,
  price_ht NUMERIC DEFAULT 0,
  unit TEXT,
  favorite BOOLEAN DEFAULT FALSE,
  archived BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- 4. TABLE: QUOTES (Estimates & Invoicing Drafts)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.quotes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  client_id UUID REFERENCES public.clients(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'draft',
  favorite BOOLEAN DEFAULT FALSE,
  quote_number TEXT DEFAULT '01',
  effective_date DATE DEFAULT CURRENT_DATE,
  valid_until DATE DEFAULT CURRENT_DATE,
  conditions TEXT DEFAULT 'Terms and conditions of payment',
  currency TEXT DEFAULT 'EUR',
  decimal_places INTEGER DEFAULT 2,
  seller_name TEXT,
  seller_email TEXT,
  seller_phone TEXT,
  seller_address TEXT,
  seller_city TEXT,
  seller_logo_url TEXT,
  seller_logo_size NUMERIC DEFAULT 52,
  seller_signature_url TEXT,
  preview_color TEXT DEFAULT '#0f766e',
  quote_template TEXT DEFAULT 'classic',
  hide_customizer_grid BOOLEAN DEFAULT FALSE,
  table_radius NUMERIC DEFAULT 16,
  signature_radius NUMERIC DEFAULT 16,
  layout_header_x NUMERIC DEFAULT 0,
  layout_header_offset NUMERIC DEFAULT 0,
  layout_seller_x NUMERIC DEFAULT 0,
  layout_seller_offset NUMERIC DEFAULT 0,
  layout_client_x NUMERIC DEFAULT 0,
  layout_client_offset NUMERIC DEFAULT 0,
  layout_meta_x NUMERIC DEFAULT 0,
  layout_meta_offset NUMERIC DEFAULT 0,
  layout_table_x NUMERIC DEFAULT 0,
  layout_table_offset NUMERIC DEFAULT 0,
  layout_totals_x NUMERIC DEFAULT 0,
  layout_totals_offset NUMERIC DEFAULT 0,
  layout_signature_x NUMERIC DEFAULT 0,
  layout_signature_offset NUMERIC DEFAULT 0,
  layout_footer_x NUMERIC DEFAULT 0,
  layout_footer_offset NUMERIC DEFAULT 0,
  align_seller TEXT DEFAULT 'left',
  align_client TEXT DEFAULT 'right',
  align_meta TEXT DEFAULT 'right',
  align_totals TEXT DEFAULT 'right',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- 5. TABLE: QUOTE_ITEMS (Line Items in Quotes)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.quote_items (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  quote_id UUID REFERENCES public.quotes(id) ON DELETE CASCADE,
  product_name TEXT NOT NULL,
  price_ht NUMERIC NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  tva_rate NUMERIC NOT NULL DEFAULT 0.2,
  description TEXT,
  unit TEXT,
  tva_category TEXT DEFAULT 'standard',
  discount_type TEXT DEFAULT 'none',
  discount_value NUMERIC DEFAULT 0,
  service_date DATE
);

-- ==============================================================================
-- 6. TABLE: CALCULATIONS (Profitability & Margin Simulations)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.calculations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL DEFAULT auth.uid(),
  name TEXT DEFAULT '',
  notes TEXT DEFAULT '',
  category TEXT DEFAULT 'product',
  status TEXT DEFAULT 'draft',
  favorite BOOLEAN DEFAULT FALSE,
  cost NUMERIC,
  shipping_cost NUMERIC DEFAULT 0,
  platform_fees NUMERIC DEFAULT 0,
  payment_fees NUMERIC DEFAULT 0,
  time_hours NUMERIC DEFAULT 0,
  hourly_rate NUMERIC DEFAULT 0,
  total_cost NUMERIC DEFAULT 0,
  price NUMERIC,
  tva_rate NUMERIC DEFAULT 20,
  price_ttc NUMERIC DEFAULT 0,
  profit NUMERIC,
  margin NUMERIC,
  target_margin NUMERIC DEFAULT 30,
  suggested_price NUMERIC DEFAULT 0,
  low_price NUMERIC DEFAULT 0,
  recommended_price NUMERIC DEFAULT 0,
  premium_price NUMERIC DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- PERFORMANCE INDEXES
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_clients_user_id ON public.clients (user_id);
CREATE INDEX IF NOT EXISTS idx_products_user_id ON public.products (user_id);
CREATE INDEX IF NOT EXISTS idx_quotes_user_id ON public.quotes (user_id);
CREATE INDEX IF NOT EXISTS idx_quotes_client_id ON public.quotes (client_id);
CREATE INDEX IF NOT EXISTS idx_quote_items_quote_id ON public.quote_items (quote_id);
CREATE INDEX IF NOT EXISTS idx_calculations_user_id ON public.calculations (user_id);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quote_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.calculations ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Clients Policies
CREATE POLICY "Users can manage own clients"
  ON public.clients FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Products Policies
CREATE POLICY "Users can manage own products"
  ON public.products FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Quotes Policies
CREATE POLICY "Users can manage own quotes"
  ON public.quotes FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Quote Items Policies (cascaded verification via quote parent)
CREATE POLICY "Users can manage own quote items"
  ON public.quote_items FOR ALL
  USING (EXISTS (
    SELECT 1 FROM public.quotes q
    WHERE q.id = quote_items.quote_id AND q.user_id = auth.uid()
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.quotes q
    WHERE q.id = quote_items.quote_id AND q.user_id = auth.uid()
  ));

-- Calculations Policies
CREATE POLICY "Users can manage own calculations"
  ON public.calculations FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ==============================================================================
-- TRIGGER: AUTOMATIC PROFILE CREATION ON USER SIGNUP
-- ==============================================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, plan)
  VALUES (new.id, 'free')
  ON CONFLICT (id) DO NOTHING;
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
