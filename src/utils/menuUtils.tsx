import React from "react";
import GitHubIcon from "@material-ui/icons/GitHub";

/**
 * Defines a map of existing menu in the app to an object of properties including its label, its corresponding icon and etc.
 */
export const menuMap = {
  githubLinksMenu: {
    element: <GitHubIcon fontSize="large" />,
    label: "Github links menu",
    menuItemsList: [
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
  }
};

/**
 * Defines a MenuItem.
 */
export type MenuItem = {
  label: string;
  href?: string; // if href exists, clicking on the menu list goes to the specified url.
};
