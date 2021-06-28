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
  makeStyles,
  createStyles
} from "@material-ui/core";
import { useMenuReducer } from "./useMenuReducer";
import GithubIcon from "@material-ui/icons/GitHub";
import { MenuItemRenderer, MenuToggleRenderer, PopperProps } from "./types";

const useStyles = makeStyles(() =>
  createStyles({
    icon: {
      height: "100%"
    }
  })
);

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
  const classes = useStyles();
  const [
    {
      menuStates,
      handleMenuClose,
      getMenuToggleProps,
      getMenuItemProps,
      getPopperProps
    }
  ] = useMenuReducer({
    isOpen: false,
    anchorRef: useRef<HTMLButtonElement>(null),
    label: "Github links menu",
    menuListItems: [
      {
        label: "Check out frontend source code",
        href: "https://github.com/MarkZhuVUW/ts-react-s3-circleci-employer-tracker"
      },
      {
        label: "Check out KAFKA logging microservice source code",
        href: "https://github.com/MarkZhuVUW/KAFKA-spring-boot-logging-microservice"
      },
      {
        label: "Check out general app backend microservice source code",
        href: "https://github.com/MarkZhuVUW/spring-boot-aws-microservice"
      }
    ]
  });
  const { isOpen, label, menuListItems } = menuStates;
  return (
    <Box display="flex">
      {menuToggleRenderer ? (
        menuToggleRenderer(getMenuToggleProps, label)
      ) : (
        <Tooltip title={label}>
          <IconButton {...getMenuToggleProps()}>
            <GithubIcon className={classes.icon} fontSize="large" />
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
