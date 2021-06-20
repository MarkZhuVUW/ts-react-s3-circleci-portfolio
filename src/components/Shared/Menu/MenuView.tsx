import React, { FC, useRef } from "react";
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
import { useReducerOnSteroid } from "@employer-tracker-ui/Utils";
import menuReducer, { MenuState } from "./menuReducer";

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

  const [menuStates, dispatch] = useReducerOnSteroid(menuReducer, {
    isOpen: false,
    anchorRef: useRef<HTMLButtonElement>(null),
    label: "Github links menu",
    menuListItems: [
      {
        label: "Check out frontend source code",
        href: "https://github.com/MarkZhuVUW/ts-react-s3-circleci-employer-tracker"
      },
      {
        label: "Check out APLAKKA logging microservice source code",
        href: "https://github.com/MarkZhuVUW/APLAKKA-spring-boot-logging-microservice"
      },
      {
        label: "Check out general app backend microservice source code",
        href: "https://github.com/MarkZhuVUW/spring-boot-aws-microservice"
      }
    ]
  });
  const {
    handleMenuClose,
    getMenuToggleProps,
    getMenuItemProps,
    getPopperProps
  } = useMenu(dispatch);

  const { isOpen, label, anchorRef, menuListItems }: MenuState = menuStates;
  return (
    <Box display="flex">
      {menuToggleRenderer ? (
        menuToggleRenderer(getMenuToggleProps, isOpen, anchorRef, label)
      ) : (
        <Tooltip title={label}>
          <IconButton {...getMenuToggleProps(isOpen, anchorRef, label)}>
            <GithubIcon fontSize="large" />
          </IconButton>
        </Tooltip>
      )}
      {isOpen && (
        <ClickAwayListener onClickAway={handleMenuClose}>
          <Popper
            {...(popperProps || getPopperProps(isOpen, anchorRef, label))}
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
                    {menuListItems.map(({ label, href }, index) => (
                      <span key={`${label} ${index}`}>
                        {menuItemRenderer ? (
                          menuItemRenderer(
                            getMenuItemProps,
                            isOpen,
                            anchorRef,
                            label
                          )
                        ) : (
                          <span>
                            <Link href={href} color="inherit">
                              <MenuItem {...getMenuItemProps(label)}>
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
