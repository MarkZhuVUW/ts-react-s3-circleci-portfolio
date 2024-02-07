import { ReactNode } from "react";

export enum AuthActionTypes {
  SET_AUTH_STATE = "SET_AUTH_STATE",
  SET_CURR_PAGE = "SET_CURR_PAGE"
}
export type AuthAction = {
  type: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  payload: { isAuthenticated?: boolean; currentPage: Page };
};
// eslint-disable-next-line @typescript-eslint/ban-types
export type AuthState = {
  skipButtonLabel: string;
  githubAuthLabel: string;
  isAuthenticated: boolean;
  currentPage: Page;
};

export enum Page {
  WebscraperService = "WebscraperService",
  AuthenticatedView = "AuthenticatedView",
  LoginView = "LoginView"
}

export type AuthControls = {
  authStates: AuthState;
  handleGoToWebscraperService: () => void;
  handleSkipLogin: () => void;
};

export type AuthProviderProps = {
  children?: ReactNode;
};
