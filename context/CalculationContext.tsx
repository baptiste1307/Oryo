"use client";

import { createContext, useContext, useState } from "react";

export type Calculation = {
  id: string;
  userId: string;
  name: string;
  notes: string;
  category: string;
  status: "draft" | "validated" | "archived";
  favorite: boolean;
  cost: number;
  shippingCost: number;
  platformFees: number;
  paymentFees: number;
  timeHours: number;
  hourlyRate: number;
  totalCost: number;
  price: number;
  tvaRate: number;
  priceTtc: number;
  profit: number;
  margin: number;
  targetMargin: number;
  suggestedPrice: number;
  lowPrice: number;
  recommendedPrice: number;
  premiumPrice: number;
  createdAt: string;
  updatedAt: string;
};

type CalculationContextType = {
  calculation: Calculation;
  setCalculation: React.Dispatch<React.SetStateAction<Calculation>>;
  updateField: (
    key: keyof Omit<Calculation, "id" | "userId" | "createdAt" | "updatedAt">,
    value: string | number | boolean,
  ) => void;
  error: string | null;
  setError: (v: string | null) => void;
};

const CalculationContext = createContext<CalculationContextType | null>(null);

function getCalculationValues(calculation: Calculation) {
  const totalCost =
    Number(calculation.cost) +
    Number(calculation.shippingCost) +
    Number(calculation.platformFees) +
    Number(calculation.paymentFees) +
    Number(calculation.timeHours) * Number(calculation.hourlyRate);
  const price = Number(calculation.price);
  const profit = price - totalCost;
  const margin = price > 0 ? (profit * 100) / price : 0;
  const targetMargin = Number(calculation.targetMargin);
  const suggestedPrice =
    targetMargin > 0 && targetMargin < 100
      ? totalCost / (1 - targetMargin / 100)
      : 0;

  return {
    totalCost,
    priceTtc: price * (1 + Number(calculation.tvaRate) / 100),
    profit,
    margin,
    suggestedPrice,
  };
}

export function CalculationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [calculation, setCalculation] = useState<Calculation>({
    id: "",
    name: "",
    notes: "",
    category: "product",
    status: "draft",
    favorite: false,
    userId: "",
    cost: 0,
    shippingCost: 0,
    platformFees: 0,
    paymentFees: 0,
    timeHours: 0,
    hourlyRate: 0,
    totalCost: 0,
    price: 0,
    tvaRate: 20,
    priceTtc: 0,
    profit: 0,
    margin: 0,
    targetMargin: 30,
    suggestedPrice: 0,
    lowPrice: 0,
    recommendedPrice: 0,
    premiumPrice: 0,
    createdAt: "",
    updatedAt: "",
  });

  const [error, setError] = useState<string | null>(null);

  const updateField: CalculationContextType["updateField"] = (key, value) => {
    setCalculation((prev) => {
      const nextCalculation = {
        ...prev,
        [key]: value,
      };

      return {
        ...nextCalculation,
        ...getCalculationValues(nextCalculation),
      };
    });
  };

  return (
    <CalculationContext.Provider
      value={{
        calculation,
        setCalculation,
        updateField,
        error,
        setError,
      }}
    >
      {children}
    </CalculationContext.Provider>
  );
}

export function useCalculation() {
  const context = useContext(CalculationContext);

  if (!context) {
    throw new Error("useCalculation must be used inside CalculationProvider");
  }

  return context;
}
