import { useReducerOnSteroid } from "@employer-tracker-ui/Utils";
import { renderHook } from "@testing-library/react-hooks";
import { act } from "react-dom/test-utils";
import menuReducer from "./menuReducer";
import { useMenuReducer } from "./useMenuReducer";
import * as GlobalHooks from "@employer-tracker-ui/components/GlobalProviders";
import { useRef } from "react";

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

describe("useMenuReducer hook tests", () => {
  test("handleMenuToggle exists and dispatches action.", async () => {
    const dispatch = jest.fn();

    const { handleMenuToggle } = renderHook(() => useMenuReducer(dispatch))
      .result.current;
    expect(handleMenuToggle);
    act(() => {
      handleMenuToggle();
    });

    expect(dispatch).toHaveBeenCalledTimes(1);
  });
});
describe("menuReducer tests.", () => {
  test.only("Can dispatch MENU_TOGGLE action and get correct states.", async () => {
    const initialState = {
      isOpen: false,
      anchorRef: renderHook(() => useRef(null)).result.current,
      label: "test menu label",
      menuListItems: [
        {
          label: "test menu list item 1",
          href: "bla"
        },
        {
          label: "test menu list item 2",
          href: "blabla"
        },
        {
          label: "test menu list item 3",
          href: "blablabla"
        }
      ]
    };
    const [{ isOpen, anchorRef, menuListItems, label }, dispatch] = renderHook(
      () => useReducerOnSteroid(menuReducer, initialState)
    ).result.current;

    act(() => {
      dispatch({ type: "MENU_TOGGLE" });
    });
    expect(isOpen).toBeTruthy();
    expect(anchorRef).toEqual(renderHook(() => useRef(null)).result.current);
    expect(menuListItems).toEqual([
      {
        label: "test menu list item 1",
        href: "bla"
      },
      {
        label: "test menu list item 2",
        href: "blabla"
      },
      {
        label: "test menu list item 3",
        href: "blablabla"
      }
    ]);
    expect(label).toEqual("test menu label");
  });

  test("Can dispatch MENU_CLOSE action and get correct states.", async () => {
    const initialState = {
      isOpen: true,
      anchorRef: renderHook(() => useRef(null)).result.current,
      label: "test menu label",
      menuListItems: [
        {
          label: "test menu list item 1",
          href: "bla"
        },
        {
          label: "test menu list item 2",
          href: "blabla"
        },
        {
          label: "test menu list item 3",
          href: "blablabla"
        }
      ]
    };
    const [{ isOpen, anchorRef, menuListItems, label }, dispatch] = renderHook(
      () => useReducerOnSteroid(menuReducer, initialState)
    ).result.current;

    act(() => {
      dispatch({ type: "MENU_TOGGLE" });
    });

    expect(isOpen).toBeFalsy();
    expect(anchorRef).toEqual(renderHook(() => useRef(null)).result.current);
    expect(menuListItems).toEqual([
      {
        label: "test menu list item 1",
        href: "bla"
      },
      {
        label: "test menu list item 2",
        href: "blabla"
      },
      {
        label: "test menu list item 3",
        href: "blablabla"
      }
    ]);
    expect(label).toEqual("test menu label");
  });

  test("Throws error on Hippity hoo blah action", async () => {
    const { result } = renderHook(() => useReducerOnSteroid(menuReducer, {}));

    act(() => {
      result.current[1]({ type: "Hippity hoo blah" });
    });

    expect(result.error).toEqual(
      Error("Unhandled menu action type: Hippity hoo blah")
    );
  });
});
