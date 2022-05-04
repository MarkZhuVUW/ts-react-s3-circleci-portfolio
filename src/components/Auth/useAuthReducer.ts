import { useReducerOnSteroid } from "@portfolio-ui/Utils";
import { createContext, Dispatch, Reducer, useContext } from "react";
import { AuthAction, AuthControls, AuthState, AuthActionTypes } from "./types";

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
    default:
      throw new Error(`Unhandled auth action type: ${action.type}`);
  }
};
const setAuthState = (prevState: AuthState, action: AuthAction) => ({
  ...prevState,
  isAuthenticated: !!action.payload?.isAuthenticated
});

export const useAuthReducer = (
  initialState: AuthState
): [AuthControls, Dispatch<AuthAction>] => {
  const [authStates, dispatch] = useReducerOnSteroid(authReducer, initialState);
  const { skipButtonLabel, githubAuthLabel, isAuthenticated }: AuthState =
    authStates;

  const handleSkipButtonClick = () => {
    dispatch({
      type: AuthActionTypes.SET_AUTH_STATE,
      payload: { isAuthenticated: true }
    });
  };

  return [
    {
      authStates: { skipButtonLabel, githubAuthLabel, isAuthenticated },
      handleSkipButtonClick
    },
    dispatch
  ];
};

export const AuthContext = createContext<AuthControls>({
  authStates: {
    skipButtonLabel: "",
    githubAuthLabel: "",
    isAuthenticated: false
  },
  handleSkipButtonClick: () => {
    console.warn("No AuthContext.Provider");
  }
});

export const useAuth = (): AuthControls => useContext(AuthContext);
