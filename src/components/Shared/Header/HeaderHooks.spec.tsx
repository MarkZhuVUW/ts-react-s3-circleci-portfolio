import { renderHook } from "@testing-library/react-hooks";
import { act } from "react-dom/test-utils";
import { useHeaderReducer } from "./useHeaderReducer";
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
describe("useHeaderReducer hook tests.", () => {
  test("handleThemeSwitchClick calls toggleLightDarkTheme function in ThemeProvider", async () => {
    const [{ handleThemeSwitchClick }] = renderHook(() => useHeaderReducer({}))
      .result.current;
    act(() => {
      handleThemeSwitchClick();
    });
    expect(toggleLightDarkTheme).toHaveBeenCalledTimes(1);
  });
});
