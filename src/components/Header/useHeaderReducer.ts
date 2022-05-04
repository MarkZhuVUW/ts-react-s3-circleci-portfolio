import { useMuiTheme } from "@portfolio-ui/components/GlobalProviders";
import { useReducerOnSteroid } from "@portfolio-ui/Utils";
import { createContext, Dispatch, Reducer, useContext } from "react";
import { HeaderAction, HeaderControls, HeaderState } from "./types";

export enum HeaderActionTypes {}

/**
 * The default reducer for the useHeaderReducer hook.
 * @param prevStates Previous MenuState.
 * @param action MenuAction.
 * @returns MenuState
 */
export const headerReducer: Reducer<HeaderState, HeaderAction> = (
  prevState: HeaderState,
  action: HeaderAction
): HeaderState => {
  switch (action.type) {
    default:
      throw new Error(`Unhandled header action type: ${action.type}`);
  }
};

export const useHeaderReducer = (
  initialState: HeaderState
): [HeaderControls, Dispatch<HeaderAction>] => {
  const { toggleLightDarkTheme } = useMuiTheme();
  const [{}, dispatch] = useReducerOnSteroid(headerReducer, initialState);
  const handleThemeSwitchClick = () => {
    toggleLightDarkTheme();
  };

  return [{ handleThemeSwitchClick }, dispatch];
};

export const HeaderContext = createContext<HeaderControls>({
  handleThemeSwitchClick: () => {
    console.warn("No HeaderContext.Provider");
  }
});

export const useHeader = (): HeaderControls => useContext(HeaderContext);
