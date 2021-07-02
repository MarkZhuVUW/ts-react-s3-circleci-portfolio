import { findByLabelText, render, screen } from "@testing-library/react";
import React, { useRef } from "react";
import userEvent from "@testing-library/user-event";
import MenuView from "./MenuView";
import * as MenuHook from "./useMenuReducer";
import * as GlobalHooks from "@employer-tracker-ui/components/GlobalProviders";
import { renderHook } from "@testing-library/react-hooks";
import { MenuState } from "./menuReducer";

/** ------------------- Mocks and spies----------------- */

/** ------------------- Mocks and spies----------------- */

describe("Menu module tests.", () => {
  const THEME_STATE_SPY = jest.spyOn(GlobalHooks, "useMuiTheme");
  const USE_MENU_REDUCER_SPY = jest.spyOn(MenuHook, "useMenuReducer");
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
  const dispatch = jest.fn();
  USE_MENU_REDUCER_SPY.mockReturnValue([
    {
      menuStates: {
        label: "test menu toggle button label",
        anchorRef,
        isOpen: false,
        menuListItems: [{ label: "test menu list item label" }]
      },
      handleMenuClose,
      handleMenuToggle,
      getMenuToggleProps,
      getMenuItemProps
    },
    dispatch
  ]);

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
    const menuStates: MenuState = {
      label: "test menu toggle button label",
      anchorRef,
      isOpen: true,
      menuListItems: [{ label: "test menu list item label" }]
    };

    USE_MENU_REDUCER_SPY.mockReturnValueOnce([
      {
        menuStates,
        handleMenuClose,
        handleMenuToggle,
        getMenuToggleProps,
        getMenuItemProps
      },
      dispatch
    ]);
    const { container } = render(<MenuView />);
    expect(container).toBeTruthy();

    await findByLabelText(container, "test menu toggle button label", {
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
    const menuStates: MenuState = {
      label: "test menu toggle button label",
      anchorRef,
      isOpen: true,
      menuListItems: [{ label: "test menu list item label" }]
    };

    USE_MENU_REDUCER_SPY.mockReturnValueOnce([
      {
        menuStates,
        handleMenuClose,
        handleMenuToggle,
        getMenuToggleProps,
        getMenuItemProps
      },
      dispatch
    ]);

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
