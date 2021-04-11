import React from "react";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "../src/providers/ThemeProvider";
import { useMuiTheme } from "../src/contexts/ThemeContext";

describe("ThemeProvider unit tests.", () => {
  test("theme provider dark theme works", async () => {
    const { container } = render(<ThemeProvider />);
    expect(container).toBeTruthy();
    const { theme, setMuiTheme } = useMuiTheme();
    expect(theme).toBeFalsy();
  });

  test("theme provider light theme works", async () => {
    // TODO
  });
});
