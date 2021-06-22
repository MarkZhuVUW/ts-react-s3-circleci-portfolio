/* eslint-disable @typescript-eslint/ban-types */
import { Reducer } from "react";

export enum HeaderActionTypes {
  BLA = "BLA"
}

export type HeaderAction = {
  type: string;
  payload?: {};
};
export type HeaderState = {
  bla: boolean;
};
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
    case HeaderActionTypes.BLA:
      return { ...prevStates, bla: !prevStates.bla };
    default:
      throw new Error(`Unhandled header action type: ${action.type}`);
  }
};

export default headerReducer;
