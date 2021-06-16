import { RefObject } from "react";

export enum MenuActionTypes {
  MENU_CLOSE = "MENU_CLOSE",
  MENU_TOGGLE = "MENU_TOGGLE"
}
type MenuAction = {
  type: string;
  payload?: {
    event: React.MouseEvent<EventTarget>;
  };
};
type MenuState = {
  anchorRef: RefObject<HTMLButtonElement>;
  isOpen: boolean;
  label: string;
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
      if (
        prevStates.anchorRef.current &&
        prevStates.anchorRef.current.contains(
          action.payload?.event.target as HTMLElement
        )
      ) {
        return prevStates;
      }

      return { ...prevStates, isOpen: false };
    case MenuActionTypes.MENU_TOGGLE: {
      return { ...prevStates, isOpen: !prevStates.isOpen };
    }
    default:
      throw new Error(`Unhandled menu action type: ${action.type}`);
  }
};

export default menuReducer;
