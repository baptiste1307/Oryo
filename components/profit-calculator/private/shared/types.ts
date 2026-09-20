import { Calculation } from "@/context/CalculationContext";

export type EditableCalculationField = keyof Omit<
  Calculation,
  "id" | "userId" | "createdAt" | "updatedAt"
>;

export type UpdateCalculationField = (
  key: EditableCalculationField,
  value: string | number | boolean,
) => void;
