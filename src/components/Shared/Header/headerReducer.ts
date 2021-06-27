/* eslint-disable @typescript-eslint/ban-types */
import { Reducer } from "react";

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
const headerReducer: Reducer<HeaderState, HeaderAction> = (
  prevState: HeaderState,
  action: HeaderAction
): HeaderState => {
  switch (action.type) {
    default:
      throw new Error(`Unhandled header action type: ${action.type}`);
  }
};

export default headerReducer;
