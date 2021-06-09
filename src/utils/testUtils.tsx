import React, { FC, useEffect, useState } from "react";
import { useLocalStorage } from "../GlobalProviders/LocalStorageProvider/LocalStorageContext";
import { Theme, useMuiTheme } from "../GlobalProviders/ThemeProvider/ThemeContext";

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
  const [
    isLocalStorageEventSuccessful,
    setIsLocalStorageEventSuccessful
  ] = useState(false);
  useEffect(() => {
    switch (functionToDebug) {
      case "setItem":
      case "keys":
        setIsLocalStorageEventSuccessful(setItem("a", "1"));
        break;
      case "removeItem":
        setIsLocalStorageEventSuccessful(removeItem("a"));
        break;
      default:
        break;
    }
  }, []);
  switch (functionToDebug) {
    case "setItem":
      return <>{getItem("a") || "null"}</>;
    case "keys":
      return <>{keys() || "[]"}</>;

    case "removeItem":
      return (
        <>
          <span>
            is localstorage event successful:
            {isLocalStorageEventSuccessful.toString()}
          </span>
          <span>{keys() || "[]"}</span>
          {getItem("b") || "null"}
        </>
      );
    default:
      return <>{getItem("a") || "null"}</>;
  }
};
