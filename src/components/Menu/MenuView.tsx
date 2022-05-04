import React, { FC } from "react";
import {
  IconButton,
  Link,
  Tooltip,
  Menu,
  ClickAwayListener,
  MenuList,
  MenuItem,
  Typography,
  Box,
  makeStyles,
  createStyles
} from "@material-ui/core";
import { useMenu } from "./useMenuReducer";
import GithubIcon from "@material-ui/icons/GitHub";
import { MenuViewProps } from "./types";
const useStyles = makeStyles(() =>
  createStyles({
    icon: {
      height: "100%"
    },
    container: {
      height: "100%"
    }
  })
);

const MenuView: FC<MenuViewProps> = ({
  menuItemRenderer,
  menuToggleRenderer
}: MenuViewProps) => {
  const classes = useStyles();
  const { menuStates, handleMenuClose, getMenuToggleProps, getMenuItemProps } =
    useMenu();
  const { isOpen, label, menuListItems, anchorRef } = menuStates;
  return (
    <div className={classes.container}>
      <Box display="flex">
        {menuToggleRenderer ? (
          menuToggleRenderer(getMenuToggleProps, label)
        ) : (
          <Tooltip title={`${label} toggle`}>
            <IconButton {...getMenuToggleProps()}>
              <GithubIcon className={classes.icon} fontSize="large" />
            </IconButton>
          </Tooltip>
        )}

        <ClickAwayListener
          mouseEvent={isOpen && "onClick"} // if isOpen is false, disable listener
          touchEvent={isOpen && "onTouchStart"}
          onClickAway={handleMenuClose}
        >
          <Menu
            aria-label={`${label} popup`}
            anchorEl={anchorRef?.current}
            keepMounted
            open={isOpen}
            onClose={handleMenuClose}
            role="menu"
            aria-controls="menu-list-grow"
          >
            <MenuList autoFocusItem={isOpen}>
              {menuListItems.map(({ label, href }, index) => (
                <span key={`${label} ${index}`}>
                  {menuItemRenderer ? (
                    menuItemRenderer(getMenuItemProps, label, href)
                  ) : (
                    <Link
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      color="inherit"
                    >
                      <MenuItem {...getMenuItemProps(label)}>
                        <Typography noWrap>{label}</Typography>
                      </MenuItem>
                    </Link>
                  )}
                </span>
              ))}
            </MenuList>
          </Menu>
        </ClickAwayListener>
      </Box>
    </div>
  );
};

export default MenuView;
