import React from "react";
import { FC } from "react";
import { useSnackbarReducer, SnackbarContext } from "./useSnackbarReducer";
import { SnackbarProviderProps, SnackbarState, SnackbarTypes } from "./types";

const SnackbarProvider: FC<SnackbarProviderProps> = ({
  children
}: SnackbarProviderProps) => {
  const initialState: SnackbarState = {
    open: false,
    label: "New version notification snack bar",
    message:
      "New version available, click the reload button to get the latest version.",
    severity: "info",

    type: SnackbarTypes.newVersion
  };

  return (
    <SnackbarContext.Provider
      value={{ ...useSnackbarReducer(initialState)[0] }}
    >
      {children}
    </SnackbarContext.Provider>
  );
};

export default SnackbarProvider;
