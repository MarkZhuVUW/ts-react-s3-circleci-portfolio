import {
  actionTypeLogger,
  useReducerOnSteroid
} from "@employer-tracker-ui/Utils";
import { renderHook } from "@testing-library/react-hooks";
import { act } from "react-dom/test-utils";
import menuReducer from "./menuReducer";
import { useMenu } from "./useMenu";
import { menuActionMap } from "./menuReducer";
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
MENU_USE_REDUCER_SPY.mockReturnValue();
describe("useMenu hook tests.", () => {
  test("handleMenuToggle works", async () => {
    const { handleMenuToggle, isOpen } = renderHook(() => useMenu()).result
      .current;

    act(() => {
      handleMenuToggle();
    });
    expect(isOpen).toBeTruthy();
    act(() => {
      handleMenuToggle();
    });
  });
});
