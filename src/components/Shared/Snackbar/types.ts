import { ReactNode, SyntheticEvent } from "react";

export enum SnackbarActionTypes {
  Snackbar_OPEN = "Snackbar_OPEN",
  Snackbar_TOGGLE = "Snackbar_TOGGLE"
}
export type SnackbarAction = {
  type: string;
  payload: {
    open?: boolean;
    label?: string;
    severity?: "info" | "warning" | "error" | "success";
    message?: string;
    type?: SnackbarTypes;
  };
};

export type SnackbarState = {
  open: boolean | undefined;
  label: string;
  message: string;
  severity: "info" | "warning" | "error" | "success";
  type: SnackbarTypes;
};

export type SnackbarControls = {
  snackbarStates: SnackbarState;
  handleSnackbarClose: (event: SyntheticEvent<Element, Event>) => void;
  handleSnackbarOpen?: () => void;
};

export type SnackbarProviderProps = {
  children?: ReactNode;
};

export enum SnackbarTypes {
  newVersion = "new version",
  test = "test"
}
