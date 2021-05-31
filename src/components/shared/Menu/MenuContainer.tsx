import React, { FC } from "react";

import MenuView from "./MenuView";

type MenuContainerProps = {
  menuItemsList: Array<MenuItem>;
  /**
   * Every menu should have a text label representation of itself.
   */
  label: string;
  element?: JSX.Element;
};

type MenuItem = {
  label: string;
  href?: string; // if href exists, clicking on the menu list goes to the specified url.
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
