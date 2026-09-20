import {
  SEED_CALCULATIONS,
  SEED_CLIENTS,
  SEED_PRODUCTS,
  SEED_PROFILE,
  SEED_QUOTES,
} from "./seedData";

const memoryStore = new Map<string, unknown>();

function getLocalStorageKey(key: string) {
  return `oryo_mock_${key}`;
}

export function readStore<T>(key: string, defaultValue: T): T {
  if (typeof window === "undefined") {
    if (!memoryStore.has(key)) {
      memoryStore.set(key, defaultValue);
    }
    return (memoryStore.get(key) as T) ?? defaultValue;
  }

  try {
    const raw = window.localStorage.getItem(getLocalStorageKey(key));
    if (!raw) {
      writeStore(key, defaultValue);
      return defaultValue;
    }
    return JSON.parse(raw) as T;
  } catch {
    return defaultValue;
  }
}

export function writeStore<T>(key: string, value: T): void {
  if (typeof window === "undefined") {
    memoryStore.set(key, value);
    return;
  }

  try {
    window.localStorage.setItem(getLocalStorageKey(key), JSON.stringify(value));
  } catch (error) {
    console.warn("Erreur écriture mock store:", error);
  }
}

// Initialize localStorage stores with seed mock data if not already present
export function initMockStorage() {
  if (typeof window === "undefined") return;
  if (!window.localStorage.getItem(getLocalStorageKey("profile"))) {
    writeStore("profile", SEED_PROFILE);
  }
  if (!window.localStorage.getItem(getLocalStorageKey("clients"))) {
    writeStore("clients", SEED_CLIENTS);
  }
  if (!window.localStorage.getItem(getLocalStorageKey("products"))) {
    writeStore("products", SEED_PRODUCTS);
  }
  if (!window.localStorage.getItem(getLocalStorageKey("calculations"))) {
    writeStore("calculations", SEED_CALCULATIONS);
  }
  if (!window.localStorage.getItem(getLocalStorageKey("quotes"))) {
    writeStore("quotes", SEED_QUOTES);
  }
}
