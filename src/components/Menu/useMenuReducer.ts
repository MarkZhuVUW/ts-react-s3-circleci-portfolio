import { useReducerOnSteroid } from "@portfolio-ui/Utils";
import { createContext, Dispatch, useContext } from "react";
import {
  MenuAction,
  MenuActionTypes,
  MenuControls,
  MenuItemProps,
  MenuState,
  MenuToggleProps
} from "./types";

/**
 * The default reducer for the useMenu hook.
 * @param prevStates Previous states object.
 * @param action MenuAction.
 * @returns MenuState
 */
const menuReducer = (prevState: MenuState, action: MenuAction): MenuState => {
  switch (action.type) {
    case MenuActionTypes.MENU_TOGGLE: {
      return menuToggle(prevState, action);
    }
    case MenuActionTypes.CLOSE_MENU: {
      return { ...prevState, isOpen: false };
    }
    default:
      throw new Error(`Unhandled menu action type: ${action.type}`);
  }
};

const menuToggle = (prevState: MenuState, action: MenuAction) => ({
  ...prevState,
  isOpen: !action.payload?.isOpen
});

export default menuReducer;

/**
 * A hook that handles states and functions of the MenuView component.
 * @param reducer Defaults to using the menuReducer but user can specify their own reducer.
 * @returns The controls of the MenuView component.
 */
export const useMenuReducer = (
  initialState: MenuState
): [MenuControls, Dispatch<MenuAction>] => {
  const [menuStates, dispatch] = useReducerOnSteroid(menuReducer, initialState);
  const { isOpen, menuListItems, anchorRef, label }: MenuState = menuStates;
  const handleMenuClose = (event: React.MouseEvent<EventTarget>) => {
    if (
      anchorRef?.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }
    dispatch({ type: MenuActionTypes.CLOSE_MENU });
  };
  const handleMenuToggle = () =>
    dispatch({
      type: MenuActionTypes.MENU_TOGGLE,
      payload: { isOpen }
    });

  const getMenuToggleProps = (): MenuToggleProps => ({
    ref: anchorRef,
    "aria-controls": isOpen ? "menu-list-grow" : undefined,
    "aria-haspopup": true,
    onClick: handleMenuToggle,
    "aria-label": `${label} toggle`,
    color: "inherit"
  });

  const getMenuItemProps = (label: string): MenuItemProps => ({
    "aria-label": label,
    onClick: handleMenuClose,
    role: "menuitem"
  });
  return [
    {
      menuStates: { isOpen, menuListItems, anchorRef, label },
      handleMenuClose,
      handleMenuToggle,
      getMenuToggleProps,
      getMenuItemProps
    },
    dispatch
  ];
};

export const MenuContext = createContext<MenuControls>({
  menuStates: {
    isOpen: false,
    anchorRef: null,
    label: "",
    menuListItems: []
  },
  handleMenuClose: (event: React.MouseEvent<EventTarget>) => {
    console.warn(`No MenuContext.Provider. Event: ${event}`);
  },
  handleMenuToggle: () => {
    console.warn("No MenuContext.Provider");
  },
  getMenuToggleProps: () => {
    console.warn("No MenuContext.Provider");
    return null;
  },
  getMenuItemProps: (label: string) => {
    console.warn(`No MenuContext.Provider. Label: ${label} `);
    return null;
  }
});

export const useMenu = (): MenuControls => useContext(MenuContext);
