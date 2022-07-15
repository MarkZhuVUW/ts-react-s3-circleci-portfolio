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
export const useReducerOnSteroid = <R extends Reducer<any, any>>(
  reducer: R,
  initialState: ReducerState<R>,
  beforewareCbs: any = [reRenderChecker],
  middlewareCbs: Array<
    (action: ReducerAction<R> | null, state: ReducerState<R>) => void
  > = [],
  afterwareCbs: Array<
    (action: ReducerAction<R> | null, state: ReducerState<R>) => void
  > = [logger]
): [ReducerState<R>, Dispatch<ReducerAction<R>>] => {
  if (process.env.NODE_ENV !== "development") {
    return useReducer(reducer, initialState); // return infant useReducer in prod mode.
  }
  const ref = useRef(null);
  const [state, dispatch] = useReducer(reducer, initialState);
  /**
   * Curried function provides a way for us to do something like this:
   * In here I am "Attach"-ing middleware and afterware callbacks and I am "apply"-ing those callbacks in appropriate places...
   */
  const applyBeforewares = attachBeforewares(beforewareCbs);
  const applyMiddlewares = attachSoftwares(middlewareCbs);
  const applyAfterwares = attachSoftwares(afterwareCbs);

  applyBeforewares(reducer);

  /**
   * A closure that runs all the middlewares after dispatch.
   * @param action
   */
  const dispatchWithMiddlewares: Dispatch<ReducerAction<R>> = (
    action: ReducerAction<R>
  ) => {
    // Apply middleware callbacks here.
    applyMiddlewares(action, state);
    dispatch(action);
    ref.current = action;
  };

  // Apply afterwares here by listening to action change.
  useEffect(() => {
    applyAfterwares(ref.current as ReducerAction<R>, state);
  }, [ref.current]);
  return [state, dispatchWithMiddlewares];
};

/**
 * Takes in an array of beforeware callbacks and returns a function that applies all the beforeware.
 * @param beforewareCbs Array of beforeware callbacks.
 */
const attachBeforewares =
  <R extends Reducer<any, any>>(cbs: Array<(reducer: R) => void>) =>
  (reducer: R) => {
    cbs.forEach((cbs) => cbs(reducer));
  };

/**
 * Takes in an array of softwares callbacks and returns a function that applies all the softwares.
 * @param softwareCbs Array of software callbacks.
 */
const attachSoftwares =
  <R extends Reducer<any, any>>(
    cbs: Array<
      (action: ReducerAction<R> | null, state: ReducerState<R>) => void
    >
  ) =>
  (action: ReducerAction<R> | null, state: ReducerState<R>) => {
    cbs.forEach((cbs) => cbs(action, state));
  };

/** A logger afterware which logs the states after the action. */
export const logger = <R extends Reducer<any, any>>(
  action: ReducerAction<R> | null,
  afterState: ReducerState<R>
): void => {
  if (!action || !afterState) {
    return;
  }
  console.log("**********************************************************");

  console.log(
    "--------------------------Action-----------------------------------"
  );

  console.log(action);
  console.log(
    "--------------------------Action-----------------------------------"
  );

  console.log(
    "--------------------------After State-----------------------------------"
  );
  console.log(afterState);
  console.log(
    "--------------------------After State------------------------------"
  );
  console.log("**********************************************************");
};

// beforeware to check if a hook is called
export const reRenderChecker = <R extends Reducer<any, any>>(
  reducer: R
): void => {
  console.log(
    `<<${reducer.name.replace(/^\w/, (c) => c.toUpperCase())}>>` + " called"
  );
  // log the name of the function so we know which custom hook was called
  // which reveals which react hooks are called
};
