import React, { ReactNode } from "react";
import { FC, useState } from "react";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import { LightTheme, DarkTheme } from "Themes";
import {
  useLocalStorage,
  ThemeContext,
  MuiTheme,
  localStorageKeys
} from "components/GlobalProviders";

type ThemeProviderProps = {
  children?: ReactNode;
};

const ThemeProvider: FC<ThemeProviderProps> = ({
  children
}: ThemeProviderProps) => {
  const { getItem, setItem } = useLocalStorage();
  const [theme, setTheme] = useState(
    getItem(localStorageKeys.THEME) == MuiTheme.Dark
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
        <CssBaseline />
        {children}
      </ThemeContext.Provider>
    </MuiThemeProvider>
  );
};

export default ThemeProvider;