import {
  LocalStorageProvider,
  ThemeProvider,
  MenuView
} from "@employer-tracker-ui/components";
import {
  findByLabelText,
  findByText,
  queryByLabelText,
  render,
  screen
} from "@testing-library/react";
import React from "react";
import { Button, MenuItem } from "@material-ui/core";
import userEvent from "@testing-library/user-event";
import { MenuToggleProps, MenuItemProps } from "./types";
import MenuProvider from "./MenuProvider";
describe("Menu integration tests.", () => {
  test("Menu renders correctly with providers", async () => {
    const { container } = render(
      <LocalStorageProvider>
        <ThemeProvider>
          <MenuProvider>
            <MenuView />
          </MenuProvider>
        </ThemeProvider>
      </LocalStorageProvider>
    );

    expect(container).toBeTruthy();
  });

  test("Menu does not render properly without MenuProvider", async () => {
    const { container } = render(
      <MenuProvider>
        <MenuView />
      </MenuProvider>
    );

    expect(container).toBeTruthy();
    expect(
      queryByLabelText(container, "Github links menu toggle", { exact: true })
    );
  });

  test("MenuView menuToggleRenderer render prop works.", async () => {
    const { container } = render(
      <MenuProvider>
        <MenuView
          menuToggleRenderer={(
            getMenuToggleProps: () => MenuToggleProps | null,
            label: string
          ) => <Button {...getMenuToggleProps()}>{label} 123</Button>}
        />
      </MenuProvider>
    );
    expect(container).toBeTruthy();
    await findByText(container, "Github links menu 123", {
      exact: true
    });
    userEvent.click(
      await findByLabelText(container, "Github links menu toggle", {
        exact: true
      })
    );

    await screen.findByLabelText("Github links menu popup", { exact: true });
    await screen.findByText("Frontend source code", { exact: true });
    await screen.findByText("KAFKA logging microservice code", { exact: true });
    await screen.findByText("General app backend microservice code", {
      exact: true
    });
  });

  test("MenuView menuItemRenderer render prop works.", async () => {
    const { container } = render(
      <MenuProvider>
        <MenuView
          menuItemRenderer={(
            getMenuItemProps: (label: string) => MenuItemProps | null,
            label: string,
            href?: string
          ) => (
            <MenuItem {...getMenuItemProps(label)}>
              {label} 123 {href}
            </MenuItem>
          )}
        />
      </MenuProvider>
    );
    expect(container).toBeTruthy();

    userEvent.click(
      await findByLabelText(container, "Github links menu toggle", {
        exact: true
      })
    );
    await screen.findByLabelText("Github links menu popup", { exact: true });

    await screen.findByText(
      "Frontend source code 123 https://github.com/MarkZhuVUW/ts-react-s3-circleci-employer-tracker",
      {
        exact: true
      }
    );
    await screen.findByText(
      "KAFKA logging microservice code 123 https://github.com/MarkZhuVUW/KAFKA-spring-boot-logging-microservice",
      {
        exact: true
      }
    );
    await screen.findByText(
      "General app backend microservice code 123 https://github.com/MarkZhuVUW/spring-boot-aws-microservice",
      {
        exact: true
      }
    );
  });
});
