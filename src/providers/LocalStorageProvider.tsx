import React, { ReactNode } from "react";

import { FC } from "react";
import LocalStorageContext from "../contexts/LocalStorageContext";

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
