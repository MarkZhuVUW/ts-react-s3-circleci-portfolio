import { useReducerOnSteroid } from "@employer-tracker-ui/Utils";
import { RefObject, useRef } from "react";
import menuReducer, { MenuActionTypes } from "./menuReducer";

type MenuControls = {
  isOpen: boolean;
  anchorRef: RefObject<HTMLButtonElement>;
  handleMenuClose: (event: React.MouseEvent<EventTarget>) => void;
  handleMenuToggle: () => void;
};

/**
 * A hook that handles states of the MenuView component.
 * @param reducer Defaults to using the menuReducer but user can specify their own reducer.
 * @returns The controls of the MenuView component.
 */
export const useMenu = (reducer = menuReducer): MenuControls => {
  const initialStates = {
    isOpen: false,
    anchorRef: useRef<HTMLButtonElement>(null)
  };
  const [{ isOpen, anchorRef }, dispatch] = useReducerOnSteroid(
    reducer,
    initialStates
  );

  const handleMenuClose = (event: React.MouseEvent<EventTarget>) => {
    dispatch({ type: MenuActionTypes.MENU_CLOSE, payload: { event } });
  };

  const handleMenuToggle = () => {
    dispatch({ type: MenuActionTypes.MENU_TOGGLE });
  };

  return { handleMenuClose, handleMenuToggle, isOpen, anchorRef };
};
