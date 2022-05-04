import { ReactNode, SyntheticEvent } from "react";

export enum SnackbarActionTypes {
  SNACKBAR_OPEN = "SNACKBAR_OPEN",
  SNACKBAR_TOGGLE = "SNACKBAR_TOGGLE"
}
export type SnackbarAction = {
  type: string;
  payload: {
    open: boolean;
    label?: string;
    severity?: "info" | "warning" | "error" | "success";
    message?: string;
    type?: SnackbarTypes;
  };
};

export type SnackbarState = {
  open: boolean;
  label: string;
  message: string;
  severity: "info" | "warning" | "error" | "success";
  type: SnackbarTypes;
};

export type SnackbarControls = {
  snackbarStates: SnackbarState;
  handleSnackbarClose: (event: SyntheticEvent<Element, Event>) => void;
  handleReloadButtonClick: () => void;
};

export type SnackbarProviderProps = {
  children?: ReactNode;
};

export enum SnackbarTypes {
  newVersion = "New Version snackbar"
}
