import { findByLabelText, findByText, render } from "@testing-library/react";
import React from "react";
import userEvent from "@testing-library/user-event";
import HeaderView from "./HeaderView";
import * as HeaderHook from "./useHeader";
import * as GlobalHooks from "@employer-tracker-ui/components/GlobalProviders";
import { renderHook } from "@testing-library/react-hooks";
import { act } from "react-dom/test-utils";
import headerReducer from "./headerReducer";
import { useReducerOnSteroid } from "@employer-tracker-ui/Utils";

describe("Header module tests.", () => {
  const HEADER_STATE_SPY = jest.spyOn(HeaderHook, "useHeader");
  const THEME_STATE_SPY = jest.spyOn(GlobalHooks, "useMuiTheme");
  const LOCAL_STORAGE_STATE_SPY = jest.spyOn(GlobalHooks, "useLocalStorage");
  const handleThemeSwitchClick = jest.fn();

  HEADER_STATE_SPY.mockReturnValue({
    handleThemeSwitchClick
  });
  LOCAL_STORAGE_STATE_SPY.mockReturnValue({
    keys: jest.fn(),
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn()
  });
  THEME_STATE_SPY.mockReturnValue({
    theme: GlobalHooks.MuiTheme.Dark,
    setMuiTheme: jest.fn(),
    toggleLightDarkTheme: jest.fn()
  });
  test("HeaderView renders correctly when theme is set to dark mode.", async () => {
    const { container } = render(<HeaderView />);
    expect(container).toBeTruthy();

    userEvent.click(
      await findByLabelText(
        container,
        "Toggle light/dark mode - Currently dark mode.",
        { exact: true }
      )
    );
    expect(handleThemeSwitchClick).toHaveBeenCalled();

    await findByLabelText(container, "Contact the developer", { exact: true });
    await findByText(
      container,
      "Source codes and contact can be found on the right.",
      { exact: true }
    );
  });

  test("HeaderView renders correctly when theme is set to light mode.", async () => {
    THEME_STATE_SPY.mockReturnValue({
      theme: GlobalHooks.MuiTheme.Light,
      setMuiTheme: jest.fn(),
      toggleLightDarkTheme: jest.fn()
    });
    const { container } = render(<HeaderView />);
    expect(container).toBeTruthy();

    userEvent.click(
      await findByLabelText(
        container,
        "Toggle light/dark mode - Currently light mode.",
        { exact: true }
      )
    );
    expect(handleThemeSwitchClick).toHaveBeenCalled();

    await findByLabelText(container, "Contact the developer", { exact: true });
    await findByText(
      container,
      "Source codes and contact can be found on the right.",
      { exact: true }
    );
  });

  test("HeaderView renders correctly when theme is set to light mode.", async () => {
    THEME_STATE_SPY.mockReturnValue({
      theme: GlobalHooks.MuiTheme.Light,
      setMuiTheme: jest.fn(),
      toggleLightDarkTheme: jest.fn()
    });
    const { container } = render(<HeaderView />);
    expect(container).toBeTruthy();

    userEvent.click(
      await findByLabelText(
        container,
        "Toggle light/dark mode - Currently light mode.",
        { exact: true }
      )
    );
    expect(handleThemeSwitchClick).toHaveBeenCalled();

    await findByLabelText(container, "Contact the developer", { exact: true });
    await findByText(
      container,
      "Source codes and contact can be found on the right.",
      { exact: true }
    );
  });
});

describe("useHeader hook tests.", () => {
  test("handleThemeSwitchClick", async () => {
    const { handleThemeSwitchClick } = renderHook(() =>
      HeaderHook.useHeader()
    ).result.current;
    const { theme } = renderHook(() =>
      GlobalHooks.useMuiTheme()
    ).result.current;

    act(() => {
      handleThemeSwitchClick();
    });
    expect(theme).toEqual(GlobalHooks.MuiTheme.Light);
  });
});

describe("useHeader hook tests.", () => {
  let initialState = {};
  afterEach(() => {
    initialState = {};
  });
  test("handleThemeSwitchClick", async () => {
    const { handleThemeSwitchClick } = renderHook(() =>
      HeaderHook.useHeader()
    ).result.current;

    const [state, dispatch] = renderHook(() =>
      useReducerOnSteroid(headerReducer, initialState)
    ).result.current;

    act(() => {
      handleThemeSwitchClick();
    });
  });
});

describe.only("headerReducer tests.", () => {
  let initialState = {};
  let theme = renderHook(() => GlobalHooks.useMuiTheme()).result.current.theme;
  let result = renderHook(() =>
    useReducerOnSteroid(headerReducer, initialState)
  ).result;
  let dispatch = result.current[1];
  afterEach(() => {
    initialState = {};
    theme = renderHook(() => GlobalHooks.useMuiTheme()).result.current.theme;
    result = renderHook(() => useReducerOnSteroid(headerReducer, initialState))
      .result;
    dispatch = result.current[1];
  });
  test("Hippity hoo blah action", async () => {
    act(() => {
      dispatch({ type: "Hippity hoo blah" });
    });
    expect(result.error).toEqual(
      Error("Unhandled header action type: Hippity hoo blah")
    );
  });

  test("HEADER_SWITCH_CLICK action", async () => {
    expect(theme).toEqual(GlobalHooks.MuiTheme.Dark);

    act(() => {
      dispatch({ type: "HEADER_SWITCH_CLICK" });
    });
    expect(result.error).toBeFalsy();
    expect(theme).toEqual(GlobalHooks.MuiTheme.Light);
  });
});
