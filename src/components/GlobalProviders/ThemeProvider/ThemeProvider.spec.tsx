import React from "react";
import { findByText, render } from "@testing-library/react";
import { ThemeProviderDebug } from "@portfolio-ui/Utils";
import { LocalStorageProvider } from "@portfolio-ui/components/GlobalProviders";
import ThemeProvider, { MuiTheme } from "./ThemeProvider";

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

    await findByText(container, MuiTheme.Light, { exact: true });
  });
  test("set theme to dark works", async () => {
    const { container } = render(
      <LocalStorageProvider>
        <ThemeProvider>
          <ThemeProviderDebug themeMode={MuiTheme.Dark} />
        </ThemeProvider>
      </LocalStorageProvider>
    );
    expect(container).toBeTruthy();

    await findByText(container, MuiTheme.Dark, { exact: true });
  });

  test("toggle light theme from dark", async () => {
    const { container } = render(
      <LocalStorageProvider>
        <ThemeProvider>
          <ThemeProviderDebug themeMode={MuiTheme.Dark} />
        </ThemeProvider>
      </LocalStorageProvider>
    );
    expect(container).toBeTruthy();

    await findByText(container, MuiTheme.Dark, { exact: true });
  });
});
