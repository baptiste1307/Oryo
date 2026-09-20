// QuoteContext maintains the active quote object in React state
// while the user fills out the quote parameters form.
// updateField updates root sections (seller, client, meta),
// and updateProduct modifies line items within quote.products.

"use client";

import { createContext, useContext, useState } from "react";
import { createEmptyProduct, initialQuote } from "./quote/quoteDefaults";
import type { Party, Product, Quote, QuoteMeta, QuoteSection } from "./quote/quoteTypes";

export type { Quote } from "./quote/quoteTypes";

type QuoteContextType = {
  quote: Quote;
  setQuote: React.Dispatch<React.SetStateAction<Quote>>;

  updateField: (
    section: QuoteSection,
    key: keyof Party | keyof QuoteMeta,
    value: string,
  ) => void;

  addProduct: () => void;
  updateProduct: (
    index: number,
    key: keyof Product,
    value: string | number,
  ) => void;

  deleteProduct: (index: number) => void;

  updateConditions: (value: string) => void;

  generated: boolean;
  setGenerated: (v: boolean) => void;

  error: string | null;
  setError: (v: string | null) => void;
};

const QuoteContext = createContext<QuoteContextType | null>(null);

export function QuoteProvider({ children }: { children: React.ReactNode }) {
  const [quote, setQuote] = useState<Quote>(initialQuote);

  const [generated, setGenerated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateField = (
    section: QuoteSection,
    key: keyof Party | keyof QuoteMeta,
    value: string,
  ) => {
    setQuote((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

  const addProduct = () => {
    setQuote((prev) => ({
      ...prev,
      products: [
        ...prev.products,
        createEmptyProduct(),
      ],
    }));
  };

  const updateProduct = (
    index: number,
    key: keyof Product,
    value: string | number,
  ) => {
    setQuote((prev) => ({
      ...prev,
      products: prev.products.map((p, i) =>
        i === index ? { ...p, [key]: value } : p,
      ),
    }));
  };

  const deleteProduct = (index: number) => {
    setQuote((prev) => ({
      ...prev,
      products:
        prev.products.length > 1
          ? prev.products.filter((_, i) => i !== index)
          : prev.products,
    }));
  };

  const updateConditions = (value: string) => {
    setQuote((prev) => ({
      ...prev,
      conditions: value,
    }));
  };

  return (
    <QuoteContext.Provider
      value={{
        quote,
        setQuote,
        updateField,
        addProduct,
        updateProduct,
        deleteProduct,
        updateConditions,
        generated,
        setGenerated,
        error,
        setError,
      }}
    >
      {children}
    </QuoteContext.Provider>
  );
}

export function useQuote() {
  const context = useContext(QuoteContext);

  if (!context) {
    throw new Error("useQuote must be used inside QuoteProvider");
  }

  return context;
}
