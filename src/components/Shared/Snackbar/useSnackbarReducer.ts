import { useReducerOnSteroid } from "@employer-tracker-ui/Utils";
import { createContext, Dispatch, SyntheticEvent, useContext } from "react";
import {
  SnackbarAction,
  SnackbarActionTypes,
  SnackbarControls,
  SnackbarState
} from "./types";

/**
 * The default reducer for the useSnackbar hook.
 * @param prevStates Previous states object.
 * @param action SnackbarAction.
 * @returns SnackbarState
 */
const SnackbarReducer = (
  prevState: SnackbarState,
  action: SnackbarAction
): SnackbarState => {
  switch (action.type) {
    case SnackbarActionTypes.Snackbar_TOGGLE: {
      return SnackbarToggle(prevState, action);
    }
    default:
      throw new Error(`Unhandled Snackbar action type: ${action.type}`);
  }
};

const SnackbarToggle = (prevState: SnackbarState, action: SnackbarAction) => ({
  ...prevState,
  open: action.payload?.open
});

export default SnackbarReducer;

/**
 * A hook that handles states and functions of the SnackbarView component.
 * @param reducer Defaults to using the SnackbarReducer but user can specify their own reducer.
 * @returns The controls of the SnackbarView component.
 */
export const useSnackbarReducer = (
  initialState: SnackbarState
): [SnackbarControls, Dispatch<SnackbarAction>] => {
  const [SnackbarStates, dispatch] = useReducerOnSteroid(
    SnackbarReducer,
    initialState
  );
  const { open, label, message, severity }: SnackbarState = SnackbarStates;

  const handleSnackbarClose = (
    event?: React.SyntheticEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch({
      type: SnackbarActionTypes.Snackbar_TOGGLE,
      payload: { open: false }
    });
  };

  return [
    {
      snackbarStates: { open, label, message, severity },
      handleSnackbarClose
    },
    dispatch
  ];
};

export const SnackbarContext = createContext<SnackbarControls>({
  snackbarStates: {
    open: false,
    label: "",
    message: "",
    severity: undefined
  },
  handleSnackbarClose: (event: SyntheticEvent<Element, Event>) => {
    console.warn(`No SnackbarContext.Provider. Event: ${event}`);
  }
});

export const useSnackbar = (): SnackbarControls => useContext(SnackbarContext);
