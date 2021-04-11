import React, { ReactNode } from "react";
import { FC, useState } from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Theme, ThemeContext } from "../contexts/ThemeContext";
import { useLocalStorage } from "../contexts/LocalStorageContext";
import LocalStorageKeys from "../constants/LocalStorageKeys";
import muiThemeDark from "../themes/Dark";
import muiThemeLight from "../themes/Light";

type ThemeProviderProps = {
  children?: ReactNode;
};

export const ThemeProvider: FC<ThemeProviderProps> = ({
  children
}: ThemeProviderProps) => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const { getItemOrDefault, setItem } = useLocalStorage();
  const [theme, setTheme] = useState(
    getItemOrDefault(
      LocalStorageKeys.THEME,
      prefersDarkMode ? Theme.Dark : Theme.Light
    ) || muiThemeLight
  );

  const setMuiTheme = (theme: Theme) => {
    setItem(LocalStorageKeys.THEME, theme);
    setTheme(theme);
  };

  const muiTheme = theme === Theme.Dark ? muiThemeDark : muiThemeLight;

  return (
    <MuiThemeProvider theme={muiTheme}>
      <ThemeContext.Provider value={{ theme, setMuiTheme }}>
        <CssBaseline />
        {children}
      </ThemeContext.Provider>
    </MuiThemeProvider>
  );
};
