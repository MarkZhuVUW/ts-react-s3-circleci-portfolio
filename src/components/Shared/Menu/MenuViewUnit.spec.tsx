import {
  findByLabelText,
  findByText,
  render,
  screen
} from "@testing-library/react";
import React, { useRef } from "react";
import userEvent from "@testing-library/user-event";
import MenuView from "./MenuView";
import * as MenuHook from "./useMenu";
import * as GlobalHooks from "@employer-tracker-ui/components/GlobalProviders";
import { renderHook } from "@testing-library/react-hooks";
/** ------------------- Mocks and spies----------------- */

/** ------------------- Mocks and spies----------------- */

describe("Menu module tests.", () => {
  const THEME_STATE_SPY = jest.spyOn(GlobalHooks, "useMuiTheme");
  const MENU_STATE_SPY = jest.spyOn(MenuHook, "useMenu");

  const LOCAL_STORAGE_STATE_SPY = jest.spyOn(GlobalHooks, "useLocalStorage");
  const toggleLightDarkTheme = jest.fn();
  const setMuiTheme = jest.fn();
  const keys = jest.fn();
  const getItem = jest.fn();
  const setItem = jest.fn();
  const removeItem = jest.fn();
  const handleMenuClose = jest.fn();
  const handleMenuToggle = jest.fn();
  const anchorRef = renderHook(() => useRef(null)).result.current;
  const getMenuToggleProps = jest.fn().mockReturnValue({
    "aria-label": "test menu toggle button label",
    ref: anchorRef,
    onClick: handleMenuToggle
  });
  const getPopperProps = jest.fn().mockReturnValue({
    open: true,
    "aria-label": "test popper label",
    anchorEl: document.body,
    role: "dialog",
    transition: true,
    disablePortal: true,
    modifiers: {
      flip: {
        enabled: true
      },
      preventOverflow: {
        enabled: true,
        boundariesElement: "viewport"
      }
    }
  });
  const getMenuItemProps = jest.fn().mockReturnValue({
    "aria-label": "test menu list item label",
    onClick: handleMenuClose
  });

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
    label: "test menu toggle button label",
    anchorRef,
    isOpen: false,
    menuListItems: [{ label: "test menu list item label" }],
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
    await findByLabelText(container, "test menu toggle button label", {
      exact: true
    });
  });
  test("MenuView relevant handler functions are called when popper is not shown.", async () => {
    const { container } = render(<MenuView />);
    expect(container).toBeTruthy();
    userEvent.click(
      await findByLabelText(container, "test menu toggle button label", {
        exact: true
      })
    );
    expect(handleMenuToggle).toHaveBeenCalledTimes(1);
    userEvent.click(document.body); // click outside.
    expect(handleMenuClose).toHaveBeenCalledTimes(0);
  });

  test("MenuView popper renders when isOpen is set to true", async () => {
    MENU_STATE_SPY.mockReturnValueOnce({
      label: "test menu toggle button label",
      anchorRef,
      isOpen: true,
      menuListItems: [{ label: "test menu list item label" }],
      handleMenuClose,
      handleMenuToggle,
      getMenuToggleProps,
      getPopperProps,
      getMenuItemProps
    });
    const { container } = render(<MenuView />);
    expect(container).toBeTruthy();

    await findByLabelText(container, "test menu toggle button label", {
      exact: true
    });
    await screen.findByLabelText("test popper label", {
      exact: true
    });
    await screen.findByLabelText("test menu list item label", {
      exact: true
    });
    await screen.findByText("test menu list item label", {
      exact: true
    });
  });

  test("MenuView popper relevant functions are called", async () => {
    MENU_STATE_SPY.mockReturnValueOnce({
      label: "test menu toggle button label",
      anchorRef,
      isOpen: true,
      menuListItems: [{ label: "test menu list item label" }],
      handleMenuClose,
      handleMenuToggle,
      getMenuToggleProps,
      getPopperProps,
      getMenuItemProps
    });
    const { container } = render(<MenuView />);

    expect(container).toBeTruthy();
    userEvent.click(
      await screen.findByText("test menu list item label", { exact: true })
    );

    expect(handleMenuClose).toHaveBeenCalledTimes(1);

    userEvent.click(document.body); // click outside.
    expect(handleMenuClose).toHaveBeenCalledTimes(2);
  });
});
