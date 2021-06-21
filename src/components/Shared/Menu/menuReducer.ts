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
const menuReducer = (prevStates: MenuState, action: MenuAction): MenuState => {
  switch (action.type) {
    case MenuActionTypes.MENU_CLOSE:
      return menuClose(prevStates, action);
    case MenuActionTypes.MENU_TOGGLE: {
      console.log(menuToggle(prevStates));
      return menuToggle(prevStates);
    }
    default:
      throw new Error(`Unhandled menu action type: ${action.type}`);
  }
};

const menuClose = (prevStates: MenuState, action: MenuAction) => {
  if (
    prevStates.anchorRef.current &&
    prevStates.anchorRef.current.contains(
      action.payload?.event.target as HTMLElement
    )
  ) {
    return prevStates;
  }
  return { ...prevStates, isOpen: false };
};

const menuToggle = (prevStates: MenuState) => ({
  ...prevStates,
  isOpen: !prevStates.isOpen
});

export default menuReducer;
