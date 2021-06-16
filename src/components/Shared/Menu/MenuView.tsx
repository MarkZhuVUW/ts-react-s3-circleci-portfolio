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
  MenuItem as MuiMenuItem,
  Typography,
  Box
} from "@material-ui/core";
import { useMenu } from "./useMenu";
import { MenuItem } from "@employer-tracker-ui/Utils";
import MenuIcon from "@material-ui/icons/Menu";
// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     paper: {
//       marginRight: theme.spacing(2)
//     }
//   })
// );

const MenuView: FC<MenuViewProps> = () => {
  // const classes = useStyles();
  const { isOpen, handleMenuClose, handleMenuToggle, anchorRef, label } =
    useMenu();
  return (
    <Box display="flex">
      {menuIconRenderer ? (
        <Tooltip title={label}>
          <IconButton
            ref={anchorRef}
            aria-controls={isOpen ? "menu-list-grow" : undefined}
            aria-haspopup="true"
            onClick={handleMenuToggle}
            aria-label={label}
            color="inherit"
          >
            {menuIconRenderer()}
          </IconButton>
        </Tooltip>
      ) : (
        <MenuIcon fontSize="large" />
      )}
      {isOpen && (
        <ClickAwayListener onClickAway={handleMenuClose}>
          <Popper
            open={isOpen}
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
                    {menuItemsList.map((menuItem, index) => (
                      <span key={`${menuItem.label} ${index}`}>
                        {menuItem.href ? (
                          <Link href={menuItem.href} color="inherit">
                            <MuiMenuItem
                              aria-label={menuItem.label}
                              onClick={handleMenuClose}
                              role="menuitem"
                            >
                              <Typography>{menuItem.label}</Typography>
                            </MuiMenuItem>
                          </Link>
                        ) : (
                          <MuiMenuItem
                            aria-label={menuItem.label}
                            onClick={handleMenuClose}
                            role="menuitem"
                          >
                            <Typography>{menuItem.label}</Typography>
                          </MuiMenuItem>
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
