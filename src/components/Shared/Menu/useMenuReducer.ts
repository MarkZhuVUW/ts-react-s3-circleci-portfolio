import { useReducerOnSteroid } from "@employer-tracker-ui/Utils";
import { createContext, Dispatch, useContext } from "react";
import { MenuItemProps, MenuToggleProps } from "./types";

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
  anchorRef: RefObject<HTMLButtonElement> | null;
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
    prevState.anchorRef?.current &&
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

type MenuControls = {
  menuStates: MenuState;
  handleMenuClose: (event: React.MouseEvent<EventTarget>) => void;
  handleMenuToggle: () => void;
  getMenuToggleProps: () => MenuToggleProps | null;
  getMenuItemProps: (label: string) => MenuItemProps | null;
};

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
  const handleMenuClose = (event: React.MouseEvent<EventTarget>) =>
    dispatch({ type: MenuActionTypes.MENU_CLOSE, payload: { event } });
  const handleMenuToggle = () =>
    dispatch({ type: MenuActionTypes.MENU_TOGGLE });

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
    label: "Github links menu",
    menuListItems: [
      {
        label: "Frontend source code",
        href: "https://github.com/MarkZhuVUW/ts-react-s3-circleci-employer-tracker"
      },
      {
        label: "KAFKA logging microservice code",
        href: "https://github.com/MarkZhuVUW/KAFKA-spring-boot-logging-microservice"
      },
      {
        label: "General app backend microservice code",
        href: "https://github.com/MarkZhuVUW/spring-boot-aws-microservice"
      }
    ]
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
