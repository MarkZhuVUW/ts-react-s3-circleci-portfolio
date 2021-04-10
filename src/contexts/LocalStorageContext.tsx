import { createContext, useContext } from "react";

export type LocalStorageContextType = {
  keys: () => string[];
  getItem: (key: string) => any;
  getItemOrDefault: (key: string, defaultValue: any) => any;
  setItem: (key: string, value: any) => void;
  removeItem: (key: string) => void;
};

export const LocalStorageContext = createContext<LocalStorageContextType>({
  keys: () => {
    console.warn("Failed to get keys, no local storage provider");
    return [];
  },
  getItem: (key) => {
    console.warn(
      `Failed to find item with key = ${key}, no local storage provider`
    );
    return null;
  },
  getItemOrDefault: (key, defaultValue = null) => {
    console.warn(
      `Failed to find item with key = ${key}, no local storage provider`
    );
    return defaultValue;
  },
  setItem: (key, value) => {
    console.warn(
      `Failed to set item with key = ${key} and value = ${value}, not local storage provider`
    );
  },
  removeItem: (key) => {
    console.warn(
      `Failed to remove item with key = ${key}, no local storage provider`
    );
  }
});

export const useLocalStorage = () => useContext(LocalStorageContext);
