/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dispatch,
  Reducer,
  ReducerAction,
  ReducerState,
  useReducer as reactUseReducer
} from "react";

/**
 * Wraps the React useReducer hook and returns a customized useReducer hook with 'middlewares' and 'afterwares'
 * Diabled eslint any checking to achieve polymorphic state and action typing behavior.
 * @param reducer
 * @param initialState
 * @returns
 */
export const useReducerOnSteroid = (
  reducer: Reducer<any, any>,
  initialState: any
): [
  ReducerState<Reducer<any, any>>,
  Dispatch<ReducerAction<Reducer<any, any>>>
] => {
  if (process.env.NODE_ENV === "development") {
    let afterState: any = null;
    const [state, dispatch] = reactUseReducer(
      (state: any, action: any) => (afterState = reducer(state, action)),
      initialState
    );

    /**
     * A closure that wraps the dispatch function with logger middleware.
     * @param action
     * @returns The
     */
    const dispatchWithLoggerAfterware = (action: any) => {
      dispatch(action);
      //After dispatch do log action.
      console.log(afterState);
      console.log(action);
      console.log(
        "-------------------------------------------------------------------"
      );
      return { afterState, action };
    };
    return [state, dispatchWithLoggerAfterware];
  }
  return reactUseReducer(reducer, initialState); // return infant useReducer in prod mode.
};
