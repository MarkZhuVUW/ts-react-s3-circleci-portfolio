import React, { FC } from "react";
import { Theme, useMuiTheme } from "../src/contexts/ThemeContext";

interface ThemeProviderDebugProps {
  themeMode?: Theme;
}
export const ThemeProviderDebug: FC<ThemeProviderDebugProps> = ({
  themeMode
}: ThemeProviderDebugProps) => {
  const { theme, setMuiTheme } = useMuiTheme();
  if (themeMode) setMuiTheme(themeMode);
  return <>{theme}</>;
};
