import React from "react";
import { findByText, render } from "@testing-library/react";
import ThemeProvider from "./ThemeProvider";
import { Theme } from "../contexts/ThemeContext";
import LocalStorageProvider from "./LocalStorageProvider";
import { ThemeProviderDebug } from "../Utils/TestUtils";

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

    await findByText(container, Theme.Light, { exact: true });
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

    await findByText(container, Theme.Dark, { exact: true });
  });

  test("toggle light theme from dark", async () => {
    const { container } = render(
      <LocalStorageProvider>
        <ThemeProvider>
          <ThemeProviderDebug themeMode={Theme.Dark} />
        </ThemeProvider>
      </LocalStorageProvider>
    );
    expect(container).toBeTruthy();

    await findByText(container, Theme.Dark, { exact: true });
  });
});
