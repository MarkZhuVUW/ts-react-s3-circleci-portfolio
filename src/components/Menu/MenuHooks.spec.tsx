import { renderHook } from "@testing-library/react-hooks";
import { act } from "react-dom/test-utils";
import { useMenuReducer } from "./useMenuReducer";
import * as GlobalHooks from "@portfolio-ui/components/GlobalProviders";
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
  test("handleMenuToggle sets isOpen to true", async () => {
    const { result } = renderHook(() =>
      useMenuReducer({
        isOpen: false,
        anchorRef: useRef<HTMLButtonElement>(null),
        label: "Github links menu",
        menuListItems: [
          {
            label: "Frontend source code",
            href: "https://github.com/MarkZhuVUW/ts-react-s3-circleci-portfolio"
          },
          {
            label:
              "AWS CDK powered Spring Boot webscraper microservice with CICD",
            href: "https://github.com/MarkZhuVUW/KAFKA-spring-boot-logging-microservice"
          }
        ]
      })
    );
    expect(result.current[0].handleMenuToggle);
    act(() => {
      result.current[0].handleMenuToggle();
    });
    expect(result.error).toBeFalsy();
    expect(result.current[0].menuStates.isOpen).toBeTruthy();
  });

  test("handleMenuClose sets isOpen to false when clicking outside the menu popup.", async () => {
    const buttonEl = document.createElement("button");
    const { result } = renderHook(() =>
      useMenuReducer({
        isOpen: true,
        anchorRef: useRef<HTMLButtonElement>(buttonEl),
        label: "Github links menu",
        menuListItems: [
          {
            label: "Frontend source code",
            href: "https://github.com/MarkZhuVUW/ts-react-s3-circleci-portfolio"
          },
          {
            label:
              "AWS CDK powered Spring Boot webscraper microservice with CICD",
            href: "https://github.com/MarkZhuVUW/KAFKA-spring-boot-logging-microservice"
          },
          {
            label: "General app backend microservice code",
            href: "https://github.com/MarkZhuVUW/spring-boot-aws-microservice"
          }
        ]
      })
    );
    expect(result.current[0].handleMenuClose);
    act(() =>
      result.current[0].handleMenuClose({
        target: null
      } as unknown as React.MouseEvent<EventTarget>)
    );
    expect(result.error).toBeFalsy();
    expect(result.current[0].menuStates.isOpen).toBeFalsy();
  });

  test("handleMenuClose does not close menu when clickin inside the menu popup.", async () => {
    const buttonEl = document.createElement("button");
    const { result } = renderHook(() =>
      useMenuReducer({
        isOpen: true,
        anchorRef: useRef<HTMLButtonElement>(buttonEl),
        label: "Github links menu",
        menuListItems: [
          {
            label: "Frontend source code",
            href: "https://github.com/MarkZhuVUW/ts-react-s3-circleci-portfolio"
          },
          {
            label:
              "AWS CDK powered Spring Boot webscraper microservice with CICD",
            href: "https://github.com/MarkZhuVUW/KAFKA-spring-boot-logging-microservice"
          }
        ]
      })
    );
    expect(result.current[0].handleMenuToggle);
    act(() =>
      result.current[0].handleMenuClose({
        target: buttonEl
      } as unknown as React.MouseEvent<EventTarget>)
    );
    expect(result.error).toBeFalsy();
    expect(result.current[0].menuStates.isOpen).toBeTruthy();
  });
});
