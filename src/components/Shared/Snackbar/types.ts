import { ReactNode, SyntheticEvent } from "react";

export enum SnackbarActionTypes {
  Snackbar_CLOSE = "Snackbar_CLOSE",
  Snackbar_TOGGLE = "Snackbar_TOGGLE"
}
export type SnackbarAction = {
  type: string;
  payload?: {
    open?: boolean;
  };
};
export type SnackbarState = {
  open: boolean | undefined;
  label: string;
  message: string;
  severity: "info" | "warning" | "error" | "success" | undefined;
};

export type SnackbarControls = {
  snackbarStates: SnackbarState;
  handleSnackbarClose: (event: SyntheticEvent<Element, Event>) => void;
};

export type SnackbarProviderProps = {
  children?: ReactNode;
};
