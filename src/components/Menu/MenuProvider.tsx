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
    label: "Code Github links",
    menuListItems: [
      {
        label: "Frontend React SPA",
        href: "https://github.com/MarkZhuVUW/ts-react-s3-circleci-portfolio"
      },
      {
        label: "Spring Boot Webscraper Service",
        href: "https://github.com/MarkZhuVUW/spring-boot-web-scraper-service"
      },
      {
        label: "AWS CDK Infra Code",
        href: "https://github.com/MarkZhuVUW/aws-cdk-all"
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
