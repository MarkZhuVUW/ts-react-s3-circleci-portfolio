import React from "react";
import { FC } from "react";
import { useSnackbarReducer, SnackbarContext } from "./useSnackbarReducer";
import { CssBaseline } from "@material-ui/core";
import { SnackbarProviderProps, SnackbarState } from "./types";

const SnackbarProvider: FC<SnackbarProviderProps> = ({
  children
}: SnackbarProviderProps) => {
  const initialState: SnackbarState = {
    open: false,
    label: "",
    message: "",
    severity: undefined,
    type: undefined
  };
  return (
    <SnackbarContext.Provider
      value={{ ...useSnackbarReducer(initialState)[0] }}
    >
      <CssBaseline />
      {children}
    </SnackbarContext.Provider>
  );
};

export default SnackbarProvider;
