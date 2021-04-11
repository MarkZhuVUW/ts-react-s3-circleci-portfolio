import React from "react";
import { getByText, render } from "@testing-library/react";
import { ThemeProvider } from "../src/providers/ThemeProvider";
import { Theme } from "../src/contexts/ThemeContext";
import { ThemeProviderDebug } from "./Utils";
import { LocalStorageProvider } from "../src/providers/LocalStorageProvider";

describe("ThemeProvider unit tests.", () => {
  it("default theme is light", async () => {
    const { container } = render(
      <LocalStorageProvider>
        <ThemeProvider>
          <ThemeProviderDebug />
        </ThemeProvider>
      </LocalStorageProvider>
    );
    expect(container).toBeTruthy();

    getByText(container, Theme.Light);
  });
  it("sets theme to dark", async () => {
    const { container } = render(
      <LocalStorageProvider>
        <ThemeProvider>
          <ThemeProviderDebug themeMode={Theme.Dark} />
        </ThemeProvider>
      </LocalStorageProvider>
    );
    expect(container).toBeTruthy();

    getByText(container, Theme.Dark);
  });
});
