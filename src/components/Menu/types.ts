import { ReactNode, RefObject } from "react";

export type MenuItemProps = {
  "aria-label": string;
  onClick: (event: React.MouseEvent<EventTarget>) => void;
  role: "menuitem";
};

export type MenuToggleProps = {
  ref: RefObject<HTMLButtonElement> | null;
  "aria-controls": string | undefined;
  "aria-haspopup": true;
  onClick: (event: React.MouseEvent<EventTarget>) => void;
  "aria-label": string;
  color: "inherit";
};
export type MenuItemRenderer = (
  getMenuItemProps: (label: string) => MenuItemProps | null,
  label: string,
  href?: string
) => ReactNode;
export type MenuToggleRenderer = (
  getMenuToggleProps: () => MenuToggleProps | null,
  label: string
) => ReactNode;

export enum MenuActionTypes {
  MENU_TOGGLE = "MENU_TOGGLE",
  CLOSE_MENU = "CLOSE_MENU"
}
export type MenuAction = {
  type: string;
  payload: {
    isOpen: boolean;
  };
};
export type MenuState = {
  anchorRef: RefObject<HTMLButtonElement> | null;
  isOpen: boolean;
  label: string;
  menuListItems: Array<{ href?: string; label: string }>;
};

export type MenuControls = {
  menuStates: MenuState;
  handleMenuClose: (event: React.MouseEvent<EventTarget>) => void;
  handleMenuToggle: () => void;
  getMenuToggleProps: () => MenuToggleProps | null;
  getMenuItemProps: (label: string) => MenuItemProps | null;
};

export type MenuViewProps = {
  menuItemRenderer?: MenuItemRenderer;
  menuToggleRenderer?: MenuToggleRenderer;
};

export type MenuProviderProps = {
  children?: ReactNode;
};
