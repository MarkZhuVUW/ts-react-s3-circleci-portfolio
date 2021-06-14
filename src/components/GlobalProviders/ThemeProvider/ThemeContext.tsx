import { createContext, useContext } from "react";

type ThemeContextType = {
  theme: MuiTheme;
  setMuiTheme: (theme: MuiTheme) => void;
  toggleLightDarkTheme: () => void;
};

export enum MuiTheme {
  Dark = "dark",
  Light = "light"
}

const ThemeContext = createContext<ThemeContextType>({
  theme: MuiTheme.Dark,
  setMuiTheme: (theme) => {
    console.warn(`Failed to set theme = ${theme}, no theme provider`);
  },
  toggleLightDarkTheme: () => {
    console.warn(`Failed to toggle theme, no theme provider`);
  }
});

export const useMuiTheme = (): ThemeContextType => useContext(ThemeContext);
export default ThemeContext;
