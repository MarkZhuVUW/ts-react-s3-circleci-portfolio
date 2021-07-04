import React from "react";
import { FC } from "react";
import { useSnackbarReducer, SnackbarContext } from "./useSnackbarReducer";
import { CssBaseline } from "@material-ui/core";
import { SnackbarProviderProps, SnackbarState } from "./types";

const SnackbarProvider: FC<SnackbarProviderProps> = ({
  children
}: SnackbarProviderProps) => {
  const initialState: SnackbarState = {
    open: true,
    label: "New version notification snack bar",
    message: "New version available, please refresh to get the latest content.",
    severity: "info"
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
