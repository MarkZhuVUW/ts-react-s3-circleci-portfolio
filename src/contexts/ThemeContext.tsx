import { createContext, useContext } from "react";

type ThemeContextType = {
  theme: Theme;
  setMuiTheme: (theme: Theme) => void;
};

export enum Theme {
  Dark = "dark",
  Light = "light"
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: Theme.Dark,
  setMuiTheme: (theme) => {
    console.warn(`Failed to set theme = ${theme}, no theme provider`);
  }
});

export const useMuiTheme = (): ThemeContextType => useContext(ThemeContext);
