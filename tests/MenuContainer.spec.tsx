import { render } from "@testing-library/react";
import React from "react";
import LocalStorageProvider from "../src/providers/LocalStorageProvider";
import ThemeProvider from "../src/providers/ThemeProvider";
describe("MenuContainer tests.", () => {
  test("bla", async () => {
    const { container } = render(
      <LocalStorageProvider>
        <ThemeProvider></ThemeProvider>
      </LocalStorageProvider>
    );
    expect(container).toBeTruthy();
  });
});
