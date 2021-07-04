import React, { useRef } from "react";
import { FC } from "react";
import { useMenuReducer, MenuContext } from "./useMenuReducer";
import { CssBaseline } from "@material-ui/core";
import { MenuProviderProps, MenuState } from "./types";

const MenuProvider: FC<MenuProviderProps> = ({
  children
}: MenuProviderProps) => {
  const initialState: MenuState = {
    isOpen: false,
    anchorRef: useRef<HTMLButtonElement>(null),
    label: "Github links menu",
    menuListItems: [
      {
        label: "Frontend source code",
        href: "https://github.com/MarkZhuVUW/ts-react-s3-circleci-employer-tracker"
      },
      {
        label: "KAFKA logging microservice code",
        href: "https://github.com/MarkZhuVUW/KAFKA-spring-boot-logging-microservice"
      },
      {
        label: "General app backend microservice code",
        href: "https://github.com/MarkZhuVUW/spring-boot-aws-microservice"
      }
    ]
  };

  return (
    <MenuContext.Provider value={{ ...useMenuReducer(initialState)[0] }}>
      <CssBaseline />
      {children}
    </MenuContext.Provider>
  );
};

export default MenuProvider;
