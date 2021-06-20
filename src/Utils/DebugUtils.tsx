/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dispatch,
  Reducer,
  ReducerAction,
  ReducerState,
  useEffect,
  useReducer,
  useRef
} from "react";

/**
 * Wraps the React useReducer hook and returns a customized useReducer hook with 'middlewares' and 'afterwares'
 * Disabled eslint "any" checking to achieve polymorphic state and action typing behavior.
 * @param reducer
 * @param initialState
 */
export const useReducerOnSteroid = (
  reducer: Reducer<any, any>,
  initialState: any,
  middlewareCbs: Array<(action: any, state: any) => void> = [],
  afterwareCbs: Array<(action: any, state: any) => void> = [logger]
): [
  ReducerState<Reducer<any, any>>,
  Dispatch<ReducerAction<Reducer<any, any>>>
] => {
  if (process.env.NODE_ENV === "development") {
    const ref = useRef(null);
    const [state, dispatch] = useReducer(reducer, initialState);
    /**
     * Curried function provides a way for us to do something like this:
     * In here I am "Attach"-ing middleware and afterware callbacks and I am "apply"-ing those callbacks in appropriate places...
     */
    const applyAfterwares = attachAfterwares(afterwareCbs);
    const applyMiddlewares = attachMiddlewares(middlewareCbs);

    /**
     * A closure that runs all the middlewares after dispatch.
     * @param action
     */
    const dispatchWithMiddlewares = (action: any) => {
      // Apply middleware callbacks here.
      applyMiddlewares(action, state);
      dispatch(action);
      ref.current = action;
    };

    // Apply afterwares here by listening to action change.
    useEffect(() => {
      applyAfterwares(state, ref.current);
    }, [ref.current]);
    return [state, dispatchWithMiddlewares];
  }

  return useReducer(reducer, initialState); // return infant useReducer in prod mode.
};

/**
 * A beautiful curried function that takes in an array of afterware callbacks and returns a function that runs all the afterwares.
 * @param afterwareCbs Array of afterware callbacks.
 */
const attachAfterwares =
  (afterwareCbs: Array<(action: any, state: any) => void>) =>
  (action: any, state: any) => {
    afterwareCbs.forEach((afterwareCb) => afterwareCb(action, state));
  };

/**
 * A beautiful curried function that takes in an array of middleware callbacks and returns a function that runs all the middlewares.
 * @param middlewareCbs Array of middleware callbacks.
 */
const attachMiddlewares =
  (middlewareCbs: Array<(action: any, state: any) => void>) =>
  (action: any, state: any) => {
    middlewareCbs.forEach((middlewareCb) => middlewareCb(action, state));
  };

/** A logger afterware which logs the action and the states after the action is done. */
export const logger = (action: any, afterState: any) => {
  console.log(afterState);
  console.log(action);
  console.log(
    "-------------------------------------------------------------------"
  );
};

/** A logger afterware which logs only the action type. */
export const actionTypeLogger = (action: any) => {
  console.log(action.type);
};
