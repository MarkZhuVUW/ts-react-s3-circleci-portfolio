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
