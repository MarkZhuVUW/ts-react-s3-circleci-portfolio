import { useReducerOnSteroid } from "@portfolio-ui/Utils";
import { createContext, Dispatch, Reducer, useContext } from "react";
import {
  AuthAction,
  AuthControls,
  AuthState,
  AuthActionTypes,
  Page
} from "./types";

/**
 * The default reducer for the useAuthReducer hook.
 * @param prevStates Previous MenuState.
 * @param action MenuAction.
 * @returns MenuState
 */
export const authReducer: Reducer<AuthState, AuthAction> = (
  prevState: AuthState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case AuthActionTypes.SET_AUTH_STATE: {
      return setAuthState(prevState, action);
    }
    case AuthActionTypes.SET_CURR_PAGE: {
      return setCurrentPage(prevState, action);
    }
    default:
      throw new Error(`Unhandled auth action type: ${action.type}`);
  }
};
const setAuthState = (prevState: AuthState, action: AuthAction) => ({
  ...prevState,
  isAuthenticated: !!action.payload.isAuthenticated,
  currentPage: action.payload.currentPage
});

const setCurrentPage = (prevState: AuthState, action: AuthAction) => ({
  ...prevState,
  currentPage: action.payload.currentPage
});

export const useAuthReducer = (
  initialState: AuthState
): [AuthControls, Dispatch<AuthAction>] => {
  const [authStates, dispatch] = useReducerOnSteroid(authReducer, initialState);
  const {
    skipButtonLabel,
    githubAuthLabel,
    isAuthenticated,
    currentPage
  }: AuthState = authStates;

  const handleGoToWebscraperService = () => {
    dispatch({
      type: AuthActionTypes.SET_CURR_PAGE,
      payload: { currentPage: Page.WebscraperService }
    });
  };

  const handleSkipLogin = () => {
    dispatch({
      type: AuthActionTypes.SET_AUTH_STATE,
      payload: { isAuthenticated: true, currentPage: Page.AuthenticatedView }
    });
  };

  return [
    {
      authStates: {
        skipButtonLabel,
        githubAuthLabel,
        isAuthenticated,
        currentPage
      },
      handleGoToWebscraperService,
      handleSkipLogin
    },
    dispatch
  ];
};

export const AuthContext = createContext<AuthControls>({
  authStates: {
    skipButtonLabel: "",
    githubAuthLabel: "",
    isAuthenticated: false,
    currentPage: Page.LoginView
  },
  handleGoToWebscraperService: () => {
    console.warn("No AuthContext.Provider");
  },
  handleSkipLogin: () => {
    console.warn("No AuthContext.Provider");
  }
});

export const useAuth = (): AuthControls => useContext(AuthContext);
