import { useReducerOnSteroid } from "@employer-tracker-ui/Utils";
import {
  createContext,
  Dispatch,
  SyntheticEvent,
  useContext,
  useEffect
} from "react";
import {
  SnackbarAction,
  SnackbarActionTypes,
  SnackbarControls,
  SnackbarState,
  SnackbarTypes
} from "./types";
import { wbInstance } from "@employer-tracker-ui/workboxWindow";
/**
 * The default reducer for the useSnackbar hook.
 * @param prevStates Previous states object.
 * @param action SnackbarAction.
 * @returns SnackbarState
 */
const snackbarReducer = (
  prevState: SnackbarState,
  action: SnackbarAction
): SnackbarState => {
  switch (action.type) {
    case SnackbarActionTypes.Snackbar_TOGGLE: {
      return snackbarToggle(prevState, action);
    }
    default:
      throw new Error(`Unhandled Snackbar action type: ${action.type}`);
  }
};

const snackbarToggle = (prevState: SnackbarState, action: SnackbarAction) => ({
  ...prevState,
  open: action.payload.open
});

export default snackbarReducer;

/**
 * A hook that handles states and functions of the SnackbarView component.
 * @param reducer Defaults to using the snackbarReducer but user can specify their own reducer.
 * @returns The controls of the SnackbarView component.
 */
export const useSnackbarReducer = (
  initialState: SnackbarState
): [SnackbarControls, Dispatch<SnackbarAction>] => {
  const [SnackbarStates, dispatch] = useReducerOnSteroid(
    snackbarReducer,
    initialState
  );
  const { open, label, severity, type, message }: SnackbarState =
    SnackbarStates;

  useEffect(() => {
    if (wbInstance) {
      wbInstance.addEventListener("installed", (event) => {
        if (!event.isUpdate) {
          // Do nothing on first service worker installation.
          return;
        }
        // Dispatch event to show snackbar reminding user to reload.
        dispatch({
          type: SnackbarActionTypes.Snackbar_OPEN,
          payload: {
            label: "New version notification snack bar",
            message:
              "New version available, please close all tabs of this website and refresh to get the latest content.",
            severity: "info",
            type: SnackbarTypes.newVersion
          }
        });
      });
      return wbInstance.removeEventListener("installed", (listener) => {
        console.warn(`removed listener: ${listener} `);
      });
    }
  });
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
      snackbarStates: { open, label, message, severity, type },
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
    severity: undefined,
    type: undefined
  },
  handleSnackbarClose: (event: SyntheticEvent<Element, Event>) => {
    console.warn(`No SnackbarContext.Provider. Event: ${event}`);
  },
  handleSnackbarOpen: () => {
    console.warn("No SnackbarContext.Provider");
  }
});

export const useSnackbar = (): SnackbarControls => useContext(SnackbarContext);
