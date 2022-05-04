import { ReactNode } from "react";

export enum AuthActionTypes {
  SET_AUTH_STATE = "SET_AUTH_STATE"
}
export type AuthAction = {
  type: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  payload?: { isAuthenticated: boolean };
};
// eslint-disable-next-line @typescript-eslint/ban-types
export type AuthState = {
  skipButtonLabel: string;
  githubAuthLabel: string;
  isAuthenticated: boolean;
};

export type AuthControls = {
  authStates: AuthState;
  handleSkipButtonClick: () => void;
};

export type AuthProviderProps = {
  children?: ReactNode;
};
