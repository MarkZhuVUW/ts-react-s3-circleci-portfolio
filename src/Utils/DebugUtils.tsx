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
  middlewareCbs: Array<
    (action: ReducerAction<R>, state: ReducerState<R>) => void
  > = [],
  afterwareCbs: Array<
    (action: ReducerAction<R>, state: ReducerState<R>) => void
  > = [logger]
): [ReducerState<R>, Dispatch<ReducerAction<R>>] => {
  if (process.env.NODE_ENV === "development") {
    const ref = useRef(null);
    const [state, dispatch] = useReducer(reducer, initialState);
    /**
     * Curried function provides a way for us to do something like this:
     * In here I am "Attach"-ing middleware and afterware callbacks and I am "apply"-ing those callbacks in appropriate places...
     */
    const applyMiddlewares = attachMiddlewares(middlewareCbs);
    const applyAfterwares = attachAfterwares(afterwareCbs);

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
  }

  return useReducer(reducer, initialState); // return infant useReducer in prod mode.
};

/**
 * A beautiful curried function that takes in an array of afterware callbacks and returns a function that applies all the afterwares.
 * @param afterwareCbs Array of afterware callbacks.
 */
const attachAfterwares =
  <R extends Reducer<any, any>>(
    afterwareCbs: Array<
      (action: ReducerAction<R>, state: ReducerState<R>) => void
    >
  ) =>
  (action: ReducerAction<R>, state: ReducerState<R>) => {
    afterwareCbs.forEach((afterwareCb) => afterwareCb(action, state));
  };

/**
 * A beautiful curried function that takes in an array of middleware callbacks and returns a function that applies all the middlewares.
 * @param middlewareCbs Array of middleware callbacks.
 */
const attachMiddlewares =
  <R extends Reducer<any, any>>(
    middlewareCbs: Array<
      (action: ReducerAction<R>, state: ReducerState<R>) => void
    >
  ) =>
  (action: ReducerAction<R>, state: ReducerState<R>) => {
    middlewareCbs.forEach((middlewareCb) => middlewareCb(action, state));
  };

/** A logger afterware which logs the action and the states after the action is done. */
export const logger = <R extends Reducer<any, any>>(
  action: ReducerAction<R>,
  afterState: ReducerState<R>
): void => {
  if (!action || !afterState) {
    return;
  }
  console.log(action);
  console.log(afterState);
  console.log(
    "-------------------------------------------------------------------"
  );
};
