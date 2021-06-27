import React, { ReactNode } from "react";

import { FC } from "react";
import { createContext, useContext } from "react";

type LocalStorageContextType = {
  /**
   * wrapper for the localStorage.keys function.
   * return an array of local storage keys
   */
  keys: () => string[];
  /**
   * wrapper for the localStorage.getItem function.
   * return true if successful, null if unsuccessful.
   */
  getItem: (key: string) => string | null;
  /**
   * wrapper for the localStorage.setItem function.
   * return true if successful, false if unsuccessful.
   */
  setItem: (key: string, value: string) => boolean;
  /**
   * wrapper for the localStorage.removeItem function.
   * return true if successful, false if unsuccessful.
   */
  removeItem: (key: string) => boolean;
};

const LocalStorageContext = createContext<LocalStorageContextType>({
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
      `Failed to set item with key = ${key} and value = ${value}, no local storage provider or an error is thrown`
    );
    return false;
  },
  removeItem: (key) => {
    console.log(
      `Failed to remove item with key = ${key}, no local storage provider or an error is thrown`
    );
    return false;
  }
});

export const useLocalStorage = (): LocalStorageContextType =>
  useContext(LocalStorageContext);

const localStorage = window.localStorage;

type LocalStorageProps = {
  children?: ReactNode;
};
const LocalStorageProvider: FC<LocalStorageProps> = ({
  children
}: LocalStorageProps) => {
  const keys = () => {
    const result: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      result.push(localStorage.key(i) as string);
    }
    return result;
  };

  const getItem = (key: string) => localStorage.getItem(key);

  const setItem = (key: string, value: string) => {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  };

  const removeItem = (key: string) => {
    localStorage.removeItem(key);
    return true;
  };

  return (
    <LocalStorageContext.Provider
      value={{ keys, getItem, setItem, removeItem }}
    >
      {children}
    </LocalStorageContext.Provider>
  );
};
export default LocalStorageProvider;
