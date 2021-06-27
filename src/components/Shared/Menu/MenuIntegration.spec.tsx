import {
  LocalStorageProvider,
  ThemeProvider,
  MenuView
} from "@employer-tracker-ui/components";
import {
  findByLabelText,
  findByText,
  render,
  screen
} from "@testing-library/react";
import React from "react";
import { Button, MenuItem } from "@material-ui/core";
import userEvent from "@testing-library/user-event";
import { MenuToggleProps, MenuItemProps } from "./types";
describe("Menu integration tests.", () => {
  test("Menu renders correctly with providers", async () => {
    const { container } = render(
      <LocalStorageProvider>
        <ThemeProvider>
          <MenuView />
        </ThemeProvider>
      </LocalStorageProvider>
    );

    expect(container).toBeTruthy();
  });

  test("MenuView menuToggleRenderer render prop works.", async () => {
    const { container } = render(
      <MenuView
        menuToggleRenderer={(
          getMenuToggleProps: () => MenuToggleProps,
          label: string
        ) => <Button {...getMenuToggleProps()}>{label} 123</Button>}
      />
    );
    expect(container).toBeTruthy();

    userEvent.click(
      await findByLabelText(container, "Github links menu", {
        exact: true
      })
    );
    await findByText(container, "Github links menu 123", {
      exact: true
    });
    await screen.findByLabelText("Github links menu popup");
    await screen.findByText("Check out frontend source code");
    await screen.findByText("Check out KAFKA logging microservice source code");
    await screen.findByText(
      "Check out general app backend microservice source code"
    );
  });

  test("MenuView menuItemRenderer render prop works.", async () => {
    const { container } = render(
      <MenuView
        menuItemRenderer={(
          getMenuItemProps: (label: string) => MenuItemProps,
          label: string,
          href?: string
        ) => (
          <MenuItem {...getMenuItemProps(label)}>
            {label} 123 {href}
          </MenuItem>
        )}
      />
    );
    expect(container).toBeTruthy();

    userEvent.click(
      await findByLabelText(container, "Github links menu", {
        exact: true
      })
    );
    await screen.findByLabelText("Github links menu popup");

    await findByText(
      container,
      "Check out frontend source code 123 https://github.com/MarkZhuVUW/ts-react-s3-circleci-employer-tracker",
      {
        exact: true
      }
    );
    await findByText(
      container,
      "Check out KAFKA logging microservice source code 123 https://github.com/MarkZhuVUW/KAFKA-spring-boot-logging-microservice",
      {
        exact: true
      }
    );
    await findByText(
      container,
      "Check out general app backend microservice source code 123 https://github.com/MarkZhuVUW/spring-boot-aws-microservice",
      {
        exact: true
      }
    );
  });
});
