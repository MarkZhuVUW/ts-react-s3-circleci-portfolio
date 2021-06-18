import { useReducerOnSteroid } from "@employer-tracker-ui/Utils";
import { renderHook } from "@testing-library/react-hooks";
import { act } from "react-dom/test-utils";
import menuReducer from "./menuReducer";
import { useMenu } from "./useMenu";
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
describe("useMenu hook tests.", () => {
  test("handleMenuToggle works", async () => {
    const { handleMenuToggle } = renderHook(() => useMenu()).result.current;
    const [{ actionDebug }] = renderHook(() =>
      useReducerOnSteroid(menuReducer, { isOpen: false })
    ).result.current;
    act(() => {
      handleMenuToggle();
    });

    expect(actionDebug).toBe("MENU_TOGGLE");
  });
});

describe("menuReducer tests.", () => {
  let initialState = {};
  let result = renderHook(() =>
    useReducerOnSteroid(menuReducer, initialState)
  ).result;
  let dispatch = result.current[1];
  beforeEach(() => {
    initialState = {};
    result = renderHook(() =>
      useReducerOnSteroid(menuReducer, initialState)
    ).result;
    dispatch = result.current[1];
  });
  test("Hippity hoo blah action", async () => {
    act(() => {
      dispatch({ type: "Hippity hoo blah" });
    });
    expect(result.error).toEqual(
      Error("Unhandled menu action type: Hippity hoo blah")
    );
  });
});
