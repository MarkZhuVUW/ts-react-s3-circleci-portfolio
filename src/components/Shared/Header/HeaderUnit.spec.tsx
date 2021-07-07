import { findByLabelText, render } from "@testing-library/react";
import React from "react";
import userEvent from "@testing-library/user-event";
import HeaderView from "./HeaderView";
import * as HeaderHook from "./useHeaderReducer";
import * as GlobalHooks from "@employer-tracker-ui/components/GlobalProviders";
import HeaderProvider from "./HeaderProvider";

/** ------------------- Mocks and spies----------------- */

/** ------------------- Mocks and spies----------------- */

describe("Header module tests.", () => {
  const HEADER_STATE_SPY = jest.spyOn(HeaderHook, "useHeaderReducer");
  const THEME_STATE_SPY = jest.spyOn(GlobalHooks, "useMuiTheme");
  const LOCAL_STORAGE_STATE_SPY = jest.spyOn(GlobalHooks, "useLocalStorage");
  const handleThemeSwitchClick = jest.fn();
  const toggleLightDarkTheme = jest.fn();
  const setMuiTheme = jest.fn();
  const keys = jest.fn();
  const getItem = jest.fn();
  const setItem = jest.fn();
  const removeItem = jest.fn();
  HEADER_STATE_SPY.mockReturnValue([
    {
      handleThemeSwitchClick
    },
    jest.fn()
  ]);

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

  test("HeaderView renders correctly when theme is set to dark mode.", async () => {
    const { container } = render(
      <HeaderProvider>
        <HeaderView />
      </HeaderProvider>
    );
    expect(container).toBeTruthy();

    userEvent.click(
      await findByLabelText(
        container,
        "Toggle light/dark mode - Currently dark mode.",
        { exact: true }
      )
    );
    expect(handleThemeSwitchClick).toHaveBeenCalledTimes(1);

    await findByLabelText(container, "Contact the developer", { exact: true });
    await findByLabelText(container, "Github links menu toggle", {
      exact: true
    });
  });

  test("HeaderView renders correctly when theme is set to light mode.", async () => {
    THEME_STATE_SPY.mockReturnValueOnce({
      theme: GlobalHooks.MuiTheme.Light,
      setMuiTheme,
      toggleLightDarkTheme
    });
    const { container } = render(
      <HeaderProvider>
        <HeaderView />
      </HeaderProvider>
    );
    expect(container).toBeTruthy();

    userEvent.click(
      await findByLabelText(
        container,
        "Toggle light/dark mode - Currently light mode.",
        { exact: true }
      )
    );
    expect(handleThemeSwitchClick).toHaveBeenCalledTimes(2);
    await findByLabelText(container, "Contact the developer", { exact: true });
  });
});
