import { StateStorage } from "zustand/middleware";

export const store: StateStorage = {
  setItem: (name, value) => {
    return store.setItem(name, value);
  },
  getItem: (name) => {
    const value = store.getItem(name);
    return value ?? null;
  },
  removeItem: (name) => {
    return store.removeItem(name);
  },
};