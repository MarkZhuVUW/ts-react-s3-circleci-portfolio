/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dispatch,
  Reducer,
  ReducerAction,
  ReducerState,
  useReducer,
  useRef
} from "react";

/**
 * Wraps the React useReducer hook and returns a customized useReducer hook with 'middlewares' and 'afterwares'
 * Diabled eslint any checking to achieve polymorphic state and action typing behavior.
 * @param reducer
 * @param initialState
 */
export const useReducerOnSteroid = (
  reducer: Reducer<any, any>,
  initialState: any
): [
  ReducerState<Reducer<any, any>>,
  Dispatch<ReducerAction<Reducer<any, any>>>
] => {
  const ref = useRef(null);
  const [state, dispatch] = useReducer(reducer, initialState);
  if (process.env.NODE_ENV === "development") {
    /**
     * Curried function provides a way for us to do something like this:
     * In here I am Attaching middleware and afterware callbacks and I am running those callbacks in appropriate places...
     */
    const applyAfterwares = attachAfterwares([logger]);
    const applyMiddlewares = attachMiddlewares([]);

    /**
     * A closure that runs all the afterwares after dispatch.
     * @param action
     */
    const dispatchWithAfterware = (action: any) => {
      // Run middleware callbacks here.
      applyMiddlewares(action, state);
      dispatch(action);

      ref.current = action;
    };
    // Run afterware callbacks here.
    applyAfterwares(state, ref.current);
    return [state, dispatchWithAfterware];
  }

  return [state, dispatch]; // return infant useReducer in prod mode.
};

/**
 * A curried function that takes in an array of afterware callbacks and returns a function that runs all the afterwares.
 * @param afterwares Array of afterware callbacks
 */
const attachAfterwares = (afterwares: any[]) => (action: any, state: any) => {
  afterwares.forEach((afterware) => afterware(action, state));
};

/**
 * A curried function that takes in an array of middleware callbacks and returns a function that runs all the middlewares.
 * @param middlewares Array of middleware callbacks.
 */
const attachMiddlewares = (middlewares: any[]) => (action: any, state: any) => {
  middlewares.forEach((middlewares) => middlewares(action, state));
};

const logger = (action: any, afterState: any) => {
  console.log(afterState);
  console.log(action);
  console.log(
    "-------------------------------------------------------------------"
  );
};
