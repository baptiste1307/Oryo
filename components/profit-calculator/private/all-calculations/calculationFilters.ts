import { Calculation } from "@/lib/calculations";

export type CalculationFilterValues = {
  search: string;
  category: string;
  status: string;
  favoriteOnly: string;
  startDate: string;
  endDate: string;
  minCost: string;
  maxCost: string;
  minPrice: string;
  maxPrice: string;
  minProfit: string;
  maxProfit: string;
  minMargin: string;
  maxMargin: string;
};

export const initialCalculationFilters: CalculationFilterValues = {
  search: "",
  category: "all",
  status: "all",
  favoriteOnly: "all",
  startDate: "",
  endDate: "",
  minCost: "",
  maxCost: "",
  minPrice: "",
  maxPrice: "",
  minProfit: "",
  maxProfit: "",
  minMargin: "",
  maxMargin: "",
};

function isBelowMinimum(value: number, filterValue: string) {
  return filterValue !== "" && value < Number(filterValue);
}

function isAboveMaximum(value: number, filterValue: string) {
  return filterValue !== "" && value > Number(filterValue);
}

export function applyCalculationFilters(
  calculationList: Calculation[],
  filters: CalculationFilterValues,
) {
  return calculationList.filter((calculation) => {
    const createdAt = calculation.created_at?.slice(0, 10) ?? "";
    const search = filters.search.trim().toLowerCase();
    const calculationName = (calculation.name ?? "").toLowerCase();
    const calculationNotes = (calculation.notes ?? "").toLowerCase();
    const totalCost = Number(calculation.total_cost ?? calculation.cost);
    const price = Number(calculation.price);
    const profit = Number(calculation.profit);
    const margin = Number(calculation.margin);

    if (search && !calculationName.includes(search) && !calculationNotes.includes(search)) return false;
    if (filters.category !== "all" && calculation.category !== filters.category) return false;
    if (filters.status !== "all" && calculation.status !== filters.status) return false;
    if (filters.favoriteOnly === "favorites" && !calculation.favorite) return false;
    if (filters.startDate && createdAt < filters.startDate) return false;
    if (filters.endDate && createdAt > filters.endDate) return false;
    if (isBelowMinimum(totalCost, filters.minCost)) return false;
    if (isAboveMaximum(totalCost, filters.maxCost)) return false;
    if (isBelowMinimum(price, filters.minPrice)) return false;
    if (isAboveMaximum(price, filters.maxPrice)) return false;
    if (isBelowMinimum(profit, filters.minProfit)) return false;
    if (isAboveMaximum(profit, filters.maxProfit)) return false;
    if (isBelowMinimum(margin, filters.minMargin)) return false;
    if (isAboveMaximum(margin, filters.maxMargin)) return false;

    return true;
  });
}

export function formatAmount(value: number) {
  return Number(value).toFixed(2);
}
