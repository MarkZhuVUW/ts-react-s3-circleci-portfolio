import React, { FC } from "react";
import { MenuItem } from "../../../Utils/";

import MenuView from "./MenuView";

type MenuContainerProps = {
  menuItemsList: Array<MenuItem>;
  label: string;
  element?: JSX.Element;
};
const MenuContainer: FC<MenuContainerProps> = ({
  menuItemsList,
  label,
  element
}: MenuContainerProps) => {
  const [open, setOpen] = React.useState(false);
  const handleClose = (event: React.MouseEvent<EventTarget>) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };
  const anchorRef = React.useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpen(!open);
  };
  return (
    <MenuView
      label={label}
      menuItemsList={menuItemsList}
      open={open}
      handleClose={handleClose}
      handleToggle={handleToggle}
      anchorRef={anchorRef}
      element={element}
    />
  );
};
export default MenuContainer;
