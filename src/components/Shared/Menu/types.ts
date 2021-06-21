import { ReactNode, RefObject } from "react";

export type MenuItemProps = {
  "aria-label": string;
  onClick: (event: React.MouseEvent<EventTarget>) => void;
  role: "menuitem";
};

export type MenuToggleProps = {
  ref: RefObject<HTMLButtonElement>;
  "aria-controls": string | undefined;
  "aria-haspopup": true;
  onClick: (event: React.MouseEvent<EventTarget>) => void;
  "aria-label": string;
  color: "inherit";
};
export type MenuItemRenderer = (
  getMenuItemProps: (label: string) => MenuItemProps,
  label: string,
  href?: string
) => ReactNode;
export type MenuToggleRenderer = (
  getMenuToggleProps: () => MenuToggleProps
) => ReactNode;

export type PopperProps = {
  open: boolean;
  anchorEl: HTMLButtonElement | null;
  role: "dialog";
  transition: boolean;
  disablePortal: boolean;
  modifiers: {
    flip: {
      enabled: boolean;
    };
    preventOverflow: {
      enabled: boolean;
      boundariesElement: "viewport";
    };
  };
  "aria-label": string;
};
