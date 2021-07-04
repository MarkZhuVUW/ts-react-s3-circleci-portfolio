import React from "react";
import { FC } from "react";
import { useHeaderReducer, HeaderContext } from "./useHeaderReducer";
import { CssBaseline } from "@material-ui/core";
import { HeaderProviderProps } from "./types";

const HeaderProvider: FC<HeaderProviderProps> = ({
  children
}: HeaderProviderProps) => {
  const initialState = {};
  return (
    <HeaderContext.Provider value={{ ...useHeaderReducer(initialState)[0] }}>
      <CssBaseline />
      {children}
    </HeaderContext.Provider>
  );
};

export default HeaderProvider;
