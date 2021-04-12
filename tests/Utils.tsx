import React, { FC, useEffect } from "react";
import { useLocalStorage } from "../src/contexts/LocalStorageContext";
import { Theme, useMuiTheme } from "../src/contexts/ThemeContext";

interface ThemeProviderDebugProps {
  themeMode?: Theme;
}
export const ThemeProviderDebug: FC<ThemeProviderDebugProps> = ({
  themeMode
}: ThemeProviderDebugProps) => {
  const { theme, setMuiTheme } = useMuiTheme();
  useEffect(() => {
    if (themeMode) setMuiTheme(themeMode);
  }, []);
  return <>{theme}</>;
};

interface LocalStorageProviderDebugProps {
  functionToDebug?: string;
}
export const LocalStorageProviderDebug: FC<LocalStorageProviderDebugProps> = ({
  functionToDebug
}: LocalStorageProviderDebugProps) => {
  const { keys, setItem, removeItem, getItem } = useLocalStorage();

  useEffect(() => {
    switch (functionToDebug) {
      case "setItem":
        setItem("a", "1");
      case "keys":
        setItem("a", "1");
        setItem("b", "2");
      case "removeItem":
        setItem("a", "1");
        setItem("b", "2");
        removeItem("a");
    }
  }, []);
  switch (functionToDebug) {
    case "setItem":
      return <>{getItem("a")}</>;
    case "keys":
    case "removeItem":
      return <>{keys() || "[]"}</>;
    default:
      return <>{getItem("a") || "null"}</>;
  }
};
