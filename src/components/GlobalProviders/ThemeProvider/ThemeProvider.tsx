import React, { ReactNode } from "react";
import { FC, useState } from "react";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";

import { LightTheme, DarkTheme } from "@employer-tracker-ui/Themes";
import {
  useLocalStorage,
  localStorageKeys
} from "@employer-tracker-ui/components/GlobalProviders";

import { createContext, useContext } from "react";

type ThemeContextType = {
  /**
   * String representation of the current theme.
   */
  theme: MuiTheme;
  setMuiTheme: (theme: MuiTheme) => void;
  toggleLightDarkTheme: () => void;
};

export enum MuiTheme {
  Dark = "dark",
  Light = "light"
}

const ThemeContext = createContext<ThemeContextType>({
  theme: MuiTheme.Light,
  setMuiTheme: (theme) => {
    console.warn(`Failed to set theme = ${theme}, no theme provider`);
  },
  toggleLightDarkTheme: () => {
    console.warn(`Failed to toggle theme, no theme provider`);
  }
});

export const useMuiTheme = (): ThemeContextType => useContext(ThemeContext);

type ThemeProviderProps = {
  children?: ReactNode;
};

const ThemeProvider: FC<ThemeProviderProps> = ({
  children
}: ThemeProviderProps) => {
  const { getItem, setItem } = useLocalStorage();
  const [theme, setTheme] = useState(
    JSON.parse(getItem(localStorageKeys.THEME) || "") === MuiTheme.Dark
      ? MuiTheme.Dark
      : MuiTheme.Light
  );

  const setMuiTheme = (theme: MuiTheme) => {
    setItem(localStorageKeys.THEME, theme);
    setTheme(theme);
  };

  const muiTheme = theme === MuiTheme.Dark ? DarkTheme : LightTheme;

  const toggleLightDarkTheme = () => {
    const toggledTheme =
      theme == MuiTheme.Dark ? MuiTheme.Light : MuiTheme.Dark;
    setItem(localStorageKeys.THEME, toggledTheme);
    setTheme(toggledTheme);
  };
  return (
    <MuiThemeProvider theme={muiTheme}>
      <ThemeContext.Provider
        value={{ theme, setMuiTheme, toggleLightDarkTheme }}
      >
        {children}
      </ThemeContext.Provider>
    </MuiThemeProvider>
  );
};

export default ThemeProvider;
