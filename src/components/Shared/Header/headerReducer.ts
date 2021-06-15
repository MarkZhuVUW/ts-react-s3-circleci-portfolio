/* eslint-disable @typescript-eslint/ban-types */
import { Reducer } from "react";

export enum HeaderActionTypes {
  HEADER_SWITCH_CLICK = "HEADER_SWITCH_CLICK"
}

export type HeaderAction = {
  type: string;
  payload?: { toggleLightDarkTheme: () => void };
};
export type HeaderState = {};
/**
 * The default reducer for the useHeader hook.
 * @param prevStates Previous MenuState.
 * @param action MenuAction.
 * @returns MenuState
 */
const headerReducer: Reducer<HeaderState, HeaderAction> = (
  prevStates: HeaderState,
  action: HeaderAction
): HeaderState => {
  switch (action.type) {
    case HeaderActionTypes.HEADER_SWITCH_CLICK:
      action.payload?.toggleLightDarkTheme();
      return {};
    default:
      throw new Error(`Unhandled header action type: ${action.type}`);
  }
};

export default headerReducer;
