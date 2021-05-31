import React, { FC } from "react";
import { useMuiTheme } from "../../../contexts/ThemeContext";

import HeaderView from "./HeaderView";
const HeaderContainer: FC = () => {
  const { theme, toggleLightDarkTheme } = useMuiTheme();
  return (
    <HeaderView theme={theme} toggleLightDarkTheme={toggleLightDarkTheme} />
  );
};
export default HeaderContainer;
