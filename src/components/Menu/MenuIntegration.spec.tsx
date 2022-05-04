import {
  LocalStorageProvider,
  ThemeProvider,
  MenuView
} from "@portfolio-ui/components";
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
    const { container } = render(<MenuView />);

    expect(container).toBeTruthy();
    expect(
      queryByLabelText(container, "Github links menu toggle", { exact: true })
    ).toBeFalsy();
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
    await screen.findByText(
      "AWS CDK powered Spring Boot webscraper microservice with CICD",
      {
        exact: true
      }
    );
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
      "AWS CDK powered Spring Boot webscraper microservice with CICD 123 https://github.com/MarkZhuVUW/spring-boot-web-scraper-service",
      {
        exact: true
      }
    );
  });
});
