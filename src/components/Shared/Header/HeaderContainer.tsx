import React, { FC } from "react";
import { useMuiTheme } from "@employer-tracker-ui/components/GlobalProviders";
import HeaderView from "./HeaderView";
const HeaderContainer: FC = () => {
  const { theme, toggleLightDarkTheme } = useMuiTheme();

  const handlersMap = {
    handleThemeChange: () => toggleLightDarkTheme()
  };
  return <HeaderView theme={theme} handlersMap={handlersMap} />;
};
export default HeaderContainer;
