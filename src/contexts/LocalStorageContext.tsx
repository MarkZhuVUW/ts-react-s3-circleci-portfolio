import { createContext, useContext } from "react";

export type LocalStorageContextType = {
  keys: () => string[];
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
  removeItem: (key: string) => void;
};

export const LocalStorageContext = createContext<LocalStorageContextType>({
  keys: () => {
    console.log("Failed to get keys, no local storage provider");
    return [];
  },
  getItem: (key) => {
    console.log(
      `Failed to find item with key = ${key}, no local storage provider`
    );
    return null;
  },
  setItem: (key, value) => {
    console.log(
      `Failed to set item with key = ${key} and value = ${value}, no local storage provider`
    );
  },
  removeItem: (key) => {
    console.warn(
      `Failed to remove item with key = ${key}, no local storage provider`
    );
  }
});

export const useLocalStorage = () => useContext(LocalStorageContext);
