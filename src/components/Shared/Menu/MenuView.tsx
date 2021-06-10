import React, { FC } from "react";
import {
  IconButton,
  Link,
  Tooltip,
  makeStyles,
  createStyles,
  Theme,
  Grow,
  Popper,
  Paper,
  ClickAwayListener,
  MenuList,
  MenuItem as MuiMenuItem,
  Typography
} from "@material-ui/core";
import { MenuItem } from "Utils";

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
        modifiers={{
          flip: {
            enabled: true
          },
          preventOverflow: {
            enabled: true,
            boundariesElement: "viewport"
          }
        }}
        aria-label={`${label} popup`}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: placement === "bottom" ? "center top" : "bottom"
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={open} id="menu-list-grow" role="menu">
                  {menuItemsList.map((menuItem, index) => (
                    <MuiMenuItem
                      key={`${menuItem.label} ${index}`}
                      aria-label={menuItem.label}
                      onClick={handleClose}
                      role="menuitem"
                    >
                      {menuItem.href ? (
                        <Link href={menuItem.href} color="inherit">
                          <Typography>{menuItem.label}</Typography>
                        </Link>
                      ) : (
                        <>{menuItem.label}</>
                      )}
                    </MuiMenuItem>
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
