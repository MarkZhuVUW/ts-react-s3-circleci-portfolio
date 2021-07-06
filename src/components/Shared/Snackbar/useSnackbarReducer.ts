import { useReducerOnSteroid } from "@employer-tracker-ui/Utils";
import { createContext, Dispatch, useContext, useEffect } from "react";
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
    case SnackbarActionTypes.Snackbar_OPEN: {
      return snackbarOpen(prevState, action);
    }
    default:
      throw new Error(`Unhandled Snackbar action type: ${action.type}`);
  }
};

const snackbarToggle = (prevState: SnackbarState, action: SnackbarAction) => ({
  ...prevState,
  open: action.payload.open
});

const snackbarOpen = (prevState: SnackbarState, action: SnackbarAction) => ({
  ...prevState,
  ...action.payload
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
      wbInstance.addEventListener("waiting", () => {
        // Dispatch event to show snackbar reminding user to reload.
        dispatch({
          type: SnackbarActionTypes.Snackbar_OPEN,
          payload: {
            open: true,
            label: "New version notification snack bar",
            message:
              "New version available, click the reload button to get the latest version but it may break existing tabs.",
            severity: "info",
            type: SnackbarTypes.newVersion
          }
        });
      });

      // Clean up the waiting event listener in case user decides to not reload the page.
      return wbInstance.removeEventListener("waiting", (listener) => {
        console.warn(`removed listener: ${listener} `);
      });
    }
  }, []);

  const handleReloadButtonClick = () => {
    if (wbInstance) {
      // skipWaiting to activate the new service worker when there is new build files.
      wbInstance.messageSkipWaiting();
      // No need to clean up this listener as we are page reloading in its handler callback.
      wbInstance.addEventListener("controlling", () => {
        window.location.reload();
      });
    }
  };
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
      handleSnackbarClose,
      handleReloadButtonClick
    },
    dispatch
  ];
};

export const SnackbarContext = createContext<SnackbarControls>({
  snackbarStates: {
    open: false,
    label: "",
    message: "",
    severity: "info",
    type: SnackbarTypes.newVersion
  },
  handleSnackbarClose: () => {
    console.warn(`No SnackbarContext.Provider. Event: ${event}`);
  },
  handleSnackbarOpen: () => {
    console.warn("No SnackbarContext.Provider");
  },
  handleReloadButtonClick: () => {
    console.warn("No SnackbarContext.Provider");
  }
});

export const useSnackbar = (): SnackbarControls => useContext(SnackbarContext);
