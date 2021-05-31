import React, { FC } from "react";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { IconButton, Link, Tooltip } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex"
    },
    paper: {
      marginRight: theme.spacing(2)
    }
  })
);
type MenuViewProps = {
  label: string;
  menuItemsList: Array<MenuItem>;
  element?: JSX.Element;
  open: boolean;
  handleClose: (event: React.MouseEvent<EventTarget>) => void;
  handleToggle: () => void;
  anchorRef: React.RefObject<HTMLButtonElement>;
};
type MenuItem = {
  label: string;
  href?: string; // if href exists, clicking on the menu list goes to the specified url.
};
const MenuView: FC<MenuViewProps> = ({
  label,
  menuItemsList,
  open,
  handleClose,
  handleToggle,
  anchorRef,
  element
}: MenuViewProps) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {element && (
        <Tooltip title={label}>
          <IconButton
            ref={anchorRef}
            aria-controls={open ? "menu-list-grow" : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
            aria-label={label}
            color="inherit"
          >
            {element}
          </IconButton>
        </Tooltip>
      )}
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role="dialog"
        transition
        disablePortal
        aria-label={`${label} popup`}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom"
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={open} id="menu-list-grow" role="menu">
                  {menuItemsList.map((menuItem, index) => (
                    <MenuItem
                      key={`${menuItem.label} ${index}`}
                      aria-label={menuItem.label}
                      onClick={handleClose}
                      role="menuitem"
                    >
                      {menuItem.href ? (
                        <Link href={menuItem.href} color="inherit">
                          {menuItem.label}
                        </Link>
                      ) : (
                        <>{menuItem.label}</>
                      )}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
};

export default MenuView;
