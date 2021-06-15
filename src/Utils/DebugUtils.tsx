/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dispatch,
  Reducer,
  ReducerAction,
  ReducerState,
  useCallback,
  useEffect,
  useMemo,
  useReducer as reactUseReducer,
  useRef
} from "react";

/**
 * Wraps the React useReducer hook and returns a customized useReducer hook with logging 'afterware'.
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
    let currentState: any = null;

    const [state, dispatch] = reactUseReducer(
      (state: any, action: any) => (currentState = reducer(state, action)),
      initialState
    );

    console.log("current states: ");
    console.log(currentState);
    /**
     * A closure that wraps the dispatch function with logger middleware.
     * @param action
     */
    const dispatchWithLoggerAfterware = (action: any) => {
      dispatch(action);
      //After dispatch do log action.
      console.log("action: ");
      console.log(action);
    };
    return [state, dispatchWithLoggerAfterware];
  }

  return reactUseReducer(reducer, initialState); // return infant useReducer in prod mode.
};
