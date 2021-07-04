/* eslint-disable @typescript-eslint/ban-types */

import { useMuiTheme } from "@employer-tracker-ui/components/GlobalProviders";
import { useReducerOnSteroid } from "@employer-tracker-ui/Utils";
import { createContext, Dispatch, Reducer, useContext } from "react";

export enum HeaderActionTypes {}

export type HeaderAction = {
  type: string;
  payload?: {};
};
export type HeaderState = {};
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

type HeaderControls = { handleThemeSwitchClick: () => void };

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
