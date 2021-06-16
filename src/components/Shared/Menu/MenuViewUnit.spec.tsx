import {
  findByLabelText,
  findByText,
  queryByText,
  render
} from "@testing-library/react";
import React, { useRef } from "react";
import userEvent from "@testing-library/user-event";
import MenuView from "./MenuView";
import * as MenuHook from "./useMenu";
import * as GlobalHooks from "@employer-tracker-ui/components/GlobalProviders";

/** ------------------- Mocks and spies----------------- */

/** ------------------- Mocks and spies----------------- */

describe("Menu module tests.", () => {
  const THEME_STATE_SPY = jest.spyOn(GlobalHooks, "useMuiTheme");
  const MENU_STATE_SPY = jest.spyOn(MenuHook, "useMenu");

  const LOCAL_STORAGE_STATE_SPY = jest.spyOn(GlobalHooks, "useLocalStorage");
  const handleThemeSwitchClick = jest.fn();
  const toggleLightDarkTheme = jest.fn();
  const setMuiTheme = jest.fn();
  const keys = jest.fn();
  const getItem = jest.fn();
  const setItem = jest.fn();
  const removeItem = jest.fn();
  const handleMenuClose = jest.fn();
  const handleMenuToggle = jest.fn();
  const getMenuToggleProps = jest.fn();
  const getPopperProps = jest.fn();
  const getMenuItemProps = jest.fn();

  LOCAL_STORAGE_STATE_SPY.mockReturnValue({
    keys,
    getItem,
    setItem,
    removeItem
  });
  THEME_STATE_SPY.mockReturnValue({
    theme: GlobalHooks.MuiTheme.Dark,
    setMuiTheme,
    toggleLightDarkTheme
  });
  MENU_STATE_SPY.mockReturnValue({
    label: "",
    anchorRef: useRef(null),
    isOpen: false,
    menuListItems: [{ label: "test", href: "123" }],
    handleMenuClose,
    handleMenuToggle,
    getMenuToggleProps,
    getPopperProps,
    getMenuItemProps
  });
  afterAll(() => {
    jest.clearAllMocks();
  });
  test("MenuView renders correctly.", async () => {
    const { container } = render(<MenuView />);
    expect(container).toBeTruthy();

    await findByLabelText(container, "Github links menu", { exact: true });
    expect(
      queryByText(container, "Check out frontend source code", { exact: true })
    );
  });

  test("MenuView renders correctly when theme is set to light mode.", async () => {
    THEME_STATE_SPY.mockReturnValueOnce({
      theme: GlobalHooks.MuiTheme.Light,
      setMuiTheme,
      toggleLightDarkTheme
    });
    const { container } = render(<MenuView />);
    expect(container).toBeTruthy();

    userEvent.click(
      await findByLabelText(
        container,
        "Toggle light/dark mode - Currently light mode.",
        { exact: true }
      )
    );
    expect(handleThemeSwitchClick).toHaveBeenCalledTimes(3);

    await findByLabelText(container, "Contact the developer", { exact: true });
    await findByText(
      container,
      "Source codes and contact can be found on the right.",
      { exact: true }
    );
  });
});
