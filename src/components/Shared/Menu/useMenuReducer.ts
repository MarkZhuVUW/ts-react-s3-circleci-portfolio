import { useReducerOnSteroid } from "@employer-tracker-ui/Utils";
import { Dispatch } from "react";
import menuReducer, {
  MenuAction,
  MenuActionTypes,
  MenuState
} from "./menuReducer";
import { MenuItemProps, MenuToggleProps, PopperProps } from "./types";

type MenuControls = {
  menuStates: MenuState;
  handleMenuClose: (event: React.MouseEvent<EventTarget>) => void;
  handleMenuToggle: () => void;
  getMenuToggleProps: () => MenuToggleProps;
  getPopperProps: () => PopperProps;
  getMenuItemProps: (label: string) => MenuItemProps;
};

/**
 * A hook that handles states and functions of the MenuView component.
 * @param reducer Defaults to using the menuReducer but user can specify their own reducer.
 * @returns The controls of the MenuView component.
 */
export const useMenuReducer = (
  initialState: MenuState,
  reducer = menuReducer
): [MenuControls, Dispatch<MenuAction>] => {
  const [menuStates, dispatch] = useReducerOnSteroid(reducer, initialState);
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
    "aria-label": label,
    color: "inherit"
  });

  const getPopperProps = (): PopperProps => ({
    open: isOpen,
    anchorEl: anchorRef.current,
    role: "dialog",
    transition: true,
    disablePortal: true,
    placement: "bottom",
    modifiers: {
      flip: {
        enabled: true
      },
      preventOverflow: {
        enabled: true,
        boundariesElement: "scrollParent"
      }
    },
    arrow: {
      enabled: true,
      element: anchorRef.current
    },
    "aria-label": `${label} popup`
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
      getPopperProps,
      getMenuItemProps
    },
    dispatch
  ];
};
