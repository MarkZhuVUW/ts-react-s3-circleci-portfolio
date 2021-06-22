import { RefObject } from "react";

export enum MenuActionTypes {
  MENU_CLOSE = "MENU_CLOSE",
  MENU_TOGGLE = "MENU_TOGGLE"
}
export type MenuAction = {
  type: string;
  payload?: {
    event: React.MouseEvent<EventTarget>;
  };
};
export type MenuState = {
  anchorRef: RefObject<HTMLButtonElement>;
  isOpen: boolean;
  label: string;
  menuListItems: Array<{ href?: string; label: string }>;
};

/**
 * The default reducer for the useMenu hook.
 * @param prevStates Previous states object.
 * @param action MenuAction.
 * @returns MenuState
 */
const menuReducer = (prevState: MenuState, action: MenuAction): MenuState => {
  switch (action.type) {
    case MenuActionTypes.MENU_CLOSE:
      return menuClose(prevState, action);
    case MenuActionTypes.MENU_TOGGLE: {
      return menuToggle(prevState);
    }
    default:
      throw new Error(`Unhandled menu action type: ${action.type}`);
  }
};

const menuClose = (prevState: MenuState, action: MenuAction) => {
  if (
    prevState.anchorRef.current &&
    prevState.anchorRef.current.contains(
      action.payload?.event.target as HTMLElement
    )
  ) {
    return prevState;
  }
  return { ...prevState, isOpen: false };
};

const menuToggle = (prevState: MenuState) => ({
  ...prevState,
  isOpen: !prevState.isOpen
});

export default menuReducer;
