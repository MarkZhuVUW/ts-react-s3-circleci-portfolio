import React, { ReactNode } from "react";
import { FC } from "react";
import { useHeaderReducer, HeaderContext } from "./useHeaderReducer";
import { CssBaseline } from "@material-ui/core";

type HeaderProviderProps = {
  children?: ReactNode;
};

const HeaderProvider: FC<HeaderProviderProps> = ({
  children
}: HeaderProviderProps) => {
  const initialState = {};
  const [{ handleThemeSwitchClick }] = useHeaderReducer(initialState);
  return (
    <HeaderContext.Provider value={{ handleThemeSwitchClick }}>
      <CssBaseline />
      {children}
    </HeaderContext.Provider>
  );
};

export default HeaderProvider;
