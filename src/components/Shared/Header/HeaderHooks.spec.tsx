import { useReducerOnSteroid } from "@employer-tracker-ui/Utils";
import { renderHook } from "@testing-library/react-hooks";
import { act } from "react-dom/test-utils";
import headerReducer from "./headerReducer";
import { useHeader } from "./useHeader";
import * as GlobalHooks from "@employer-tracker-ui/components/GlobalProviders";

const THEME_STATE_SPY = jest.spyOn(GlobalHooks, "useMuiTheme");
const LOCAL_STORAGE_STATE_SPY = jest.spyOn(GlobalHooks, "useLocalStorage");
const toggleLightDarkTheme = jest.fn();
const setMuiTheme = jest.fn();
const keys = jest.fn();
const getItem = jest.fn();
const setItem = jest.fn();
const removeItem = jest.fn();

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
describe("useHeader hook tests.", () => {
  test("handleThemeSwitchClick calls toggleLightDarkTheme function in ThemeProvider", async () => {
    const { handleThemeSwitchClick } = renderHook(() => useHeader()).result
      .current;
    act(() => {
      handleThemeSwitchClick();
    });
    expect(toggleLightDarkTheme).toHaveBeenCalledTimes(1);
  });
});

describe("headerReducer tests.", () => {
  let initialState = {};
  let result = renderHook(() =>
    useReducerOnSteroid(headerReducer, initialState)
  ).result;
  let dispatch = result.current[1];
  beforeEach(() => {
    initialState = {};
    result = renderHook(() =>
      useReducerOnSteroid(headerReducer, initialState)
    ).result;
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
});
