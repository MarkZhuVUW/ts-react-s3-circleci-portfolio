import { RefObject } from "react";
import { MenuActionTypes } from "./menuReducer";
import { MenuItemProps, MenuToggleProps, PopperProps } from "./types";

type MenuControls = {
  handleMenuClose: (event: React.MouseEvent<EventTarget>) => void;
  handleMenuToggle: () => void;
  getMenuToggleProps: (
    isOpen: boolean,
    anchorRef: RefObject<HTMLButtonElement>,
    label: string
  ) => MenuToggleProps;
  getPopperProps: (
    isOpen: boolean,
    anchorRef: RefObject<HTMLButtonElement>,
    label: string
  ) => PopperProps;
  getMenuItemProps: (label: string) => MenuItemProps;
};

/**
 * A hook that handles states of the MenuView component.
 * @param reducer Defaults to using the menuReducer but user can specify their own reducer.
 * @returns The controls of the MenuView component.
 */
export const useMenu = (dispatch: React.Dispatch<any>): MenuControls => {
  const handleMenuClose = (event: React.MouseEvent<EventTarget>) => {
    dispatch({ type: MenuActionTypes.MENU_CLOSE, payload: { event } });
  };

  const handleMenuToggle = () => {
    dispatch({ type: MenuActionTypes.MENU_TOGGLE });
  };

  const getMenuToggleProps = (
    isOpen: boolean,
    anchorRef: RefObject<HTMLButtonElement>,
    label: string
  ): MenuToggleProps => ({
    ref: anchorRef,
    "aria-controls": isOpen ? "menu-list-grow" : undefined,
    "aria-haspopup": true,
    onClick: handleMenuToggle,
    "aria-label": label,
    color: "inherit"
  });

  const getPopperProps = (
    isOpen: boolean,
    anchorRef: RefObject<HTMLButtonElement>,
    label: string
  ): PopperProps => ({
    open: isOpen,
    anchorEl: anchorRef.current,
    role: "dialog",
    transition: true,
    disablePortal: true,
    modifiers: {
      flip: {
        enabled: true
      },
      preventOverflow: {
        enabled: true,
        boundariesElement: "viewport"
      }
    },
    "aria-label": `${label} popup`
  });

  const getMenuItemProps = (label: string): MenuItemProps => ({
    "aria-label": label,
    onClick: handleMenuClose,
    role: "menuitem"
  });
  return {
    handleMenuClose,
    handleMenuToggle,
    getMenuToggleProps,
    getPopperProps,
    getMenuItemProps
  };
};
