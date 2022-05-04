import React, { useRef } from "react";
import { FC } from "react";
import { useMenuReducer, MenuContext } from "./useMenuReducer";
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
        label: "Frontend source code with CICD",
        href: "https://github.com/MarkZhuVUW/ts-react-s3-circleci-portfolio"
      },
      {
        label: "AWS CDK powered Spring Boot webscraper microservice with CICD",
        href: "https://github.com/MarkZhuVUW/spring-boot-web-scraper-service"
      }
    ]
  };

  return (
    <MenuContext.Provider value={{ ...useMenuReducer(initialState)[0] }}>
      {children}
    </MenuContext.Provider>
  );
};

export default MenuProvider;
