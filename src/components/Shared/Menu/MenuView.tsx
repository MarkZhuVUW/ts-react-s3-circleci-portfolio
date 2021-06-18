import React, { FC } from "react";
import {
  IconButton,
  Link,
  Tooltip,
  Grow,
  Popper,
  Paper,
  ClickAwayListener,
  MenuList,
  MenuItem,
  Typography,
  Box,
  PopperProps
} from "@material-ui/core";
import { useMenu } from "./useMenu";
import GithubIcon from "@material-ui/icons/GitHub";
import { MenuItemRenderer, MenuToggleRenderer } from "./types";

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     paper: {
//       marginRight: theme.spacing(2)
//     }
//   })
// );

type MenuViewProps = {
  menuItemRenderer?: MenuItemRenderer;
  menuToggleRenderer?: MenuToggleRenderer;
  popperProps?: PopperProps;
};
const MenuView: FC<MenuViewProps> = ({
  menuItemRenderer,
  menuToggleRenderer,
  popperProps
}: MenuViewProps) => {
  // const classes = useStyles();
  const {
    isOpen,
    label,
    menuListItems,
    handleMenuClose,
    getMenuToggleProps,
    getMenuItemProps,
    getPopperProps
  } = useMenu();

  return (
    <Box display="flex">
      {menuToggleRenderer ? (
        menuToggleRenderer(getMenuToggleProps, label)
      ) : (
        <Tooltip title={label}>
          <IconButton {...getMenuToggleProps()}>
            <GithubIcon fontSize="large" />
          </IconButton>
        </Tooltip>
      )}
      {isOpen && (
        <ClickAwayListener onClickAway={handleMenuClose}>
          <Popper {...(popperProps || getPopperProps())}>
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === "bottom" ? "center top" : "bottom"
                }}
              >
                <Paper>
                  <MenuList
                    autoFocusItem={isOpen}
                    id="menu-list-grow"
                    role="menu"
                  >
                    {menuListItems.map(({ label, href }, index) => (
                      <span key={`${label} ${index}`}>
                        {menuItemRenderer ? (
                          menuItemRenderer(getMenuItemProps, label, href)
                        ) : (
                          <span>
                            <Link href={href} color="inherit">
                              <MenuItem {...getMenuItemProps()}>
                                <Typography>{label}</Typography>
                              </MenuItem>
                            </Link>
                          </span>
                        )}
                      </span>
                    ))}
                  </MenuList>
                </Paper>
              </Grow>
            )}
          </Popper>
        </ClickAwayListener>
      )}
    </Box>
  );
};

export default MenuView;
