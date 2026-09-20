import { getCalculationPayload } from "@/lib/calculations";
import type { Calculation, CalculationInput } from "@/lib/calculationTypes";
import type { ICalculationRepository } from "../types";
import { readStore, writeStore } from "./mockStore";
import { SEED_CALCULATIONS } from "./seedData";

export class MockCalculationRepository implements ICalculationRepository {
  async getAllCalculations(userId: string): Promise<Calculation[]> {
    const list = readStore<Calculation[]>("calculations", SEED_CALCULATIONS);
    return list.filter((c) => c.user_id === userId || !c.user_id);
  }

  async getCalculationById(id: string, userId: string): Promise<Calculation | null> {
    const list = readStore<Calculation[]>("calculations", SEED_CALCULATIONS);
    return list.find((c) => c.id === id) ?? null;
  }

  async saveCalculation(
    userId: string,
    calculation: CalculationInput,
    calculationId?: string,
  ): Promise<string> {
    const list = readStore<Calculation[]>("calculations", SEED_CALCULATIONS);
    const payload = getCalculationPayload(calculation);

    if (calculationId) {
      const index = list.findIndex((c) => c.id === calculationId);
      if (index !== -1) {
        list[index] = {
          ...list[index],
          ...payload,
          id: calculationId,
          user_id: userId,
          updated_at: new Date().toISOString(),
        };
        writeStore("calculations", list);
        return calculationId;
      }
    }

    const newId = `calc-demo-${Date.now()}`;
    const newCalc: Calculation = {
      ...payload,
      id: newId,
      user_id: userId,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    list.unshift(newCalc);
    writeStore("calculations", list);
    return newId;
  }

  async deleteCalculation(id: string): Promise<boolean> {
    const list = readStore<Calculation[]>("calculations", SEED_CALCULATIONS);
    const updated = list.filter((c) => c.id !== id);
    writeStore("calculations", updated);
    return true;
  }

  async toggleCalculationFavorite(id: string, favorite: boolean): Promise<boolean> {
    const list = readStore<Calculation[]>("calculations", SEED_CALCULATIONS);
    const item = list.find((c) => c.id === id);
    if (item) {
      item.favorite = favorite;
      item.updated_at = new Date().toISOString();
      writeStore("calculations", list);
    }
    return true;
  }
}
