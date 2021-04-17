import React from "react";
import { findByText, getByText, render } from "@testing-library/react";
import { ThemeProvider } from "../src/providers/ThemeProvider";
import { Theme } from "../src/contexts/ThemeContext";
import { ThemeProviderDebug } from "./Utils";
import { LocalStorageProvider } from "../src/providers/LocalStorageProvider";

describe("ThemeProvider tests.", () => {
  test("default theme is light", async () => {
    const { container } = render(
      <LocalStorageProvider>
        <ThemeProvider>
          <ThemeProviderDebug />
        </ThemeProvider>
      </LocalStorageProvider>
    );
    expect(container).toBeTruthy();

    expect(findByText(container, Theme.Light, { exact: true })).toBeTruthy();
  });
  test("set theme to dark works", async () => {
    const { container } = render(
      <LocalStorageProvider>
        <ThemeProvider>
          <ThemeProviderDebug themeMode={Theme.Dark} />
        </ThemeProvider>
      </LocalStorageProvider>
    );
    expect(container).toBeTruthy();

    expect(findByText(container, Theme.Dark, { exact: true })).toBeTruthy();
  });
});
