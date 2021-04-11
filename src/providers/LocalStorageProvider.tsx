import React, { ReactNode } from "react";

import { FC } from "react";
import { LocalStorageContext } from "../contexts/LocalStorageContext";

const localStorage = window.localStorage;

type LocalStorageProps = {
  children?: ReactNode;
};
export const LocalStorageProvider: FC<LocalStorageProps> = ({
  children
}: LocalStorageProps) => {
  const keys = () => {
    const result: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      result.push(localStorage.key(i) as string);
    }
    return result;
  };

  const getItemOrDefault = (key: string, defaultValue: any = null) => {
    try {
      const payload = localStorage.getItem(key);
      if (payload === null) {
        return defaultValue;
      }
      return JSON.parse(payload);
    } catch (e) {
      console.log(`Failed to get item with key = ${key}, ${e.message}`);
      return defaultValue;
    }
  };

  const getItem = (key: string) => getItemOrDefault(key);

  const setItem = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const removeItem = (key: string) => {
    localStorage.removeItem(key);
  };

  return (
    <LocalStorageContext.Provider
      value={{ keys, getItem, getItemOrDefault, setItem, removeItem }}
    >
      {children}
    </LocalStorageContext.Provider>
  );
};
