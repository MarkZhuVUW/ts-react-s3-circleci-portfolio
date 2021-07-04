import {
  LocalStorageProvider,
  ThemeProvider,
  HeaderView
} from "@employer-tracker-ui/components";
import { findByLabelText, queryByText, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import HeaderProvider from "./HeaderProvider";

describe("HeaderView integtation tests.", () => {
  test("HeaderView integrated with all dependencies render correctly.", async () => {
    const { container } = render(
      <LocalStorageProvider>
        <ThemeProvider>
          <HeaderProvider>
            <HeaderView />
          </HeaderProvider>
        </ThemeProvider>
      </LocalStorageProvider>
    );
    expect(container).toBeTruthy();

    userEvent.click(
      await findByLabelText(
        container,
        "Toggle light/dark mode - Currently light mode.",
        { exact: true }
      )
    );
    userEvent.click(
      await findByLabelText(
        container,
        "Toggle light/dark mode - Currently dark mode.",
        { exact: true }
      )
    );
    await findByLabelText(
      container,
      "Toggle light/dark mode - Currently light mode.",
      { exact: true }
    );
    await findByLabelText(container, "Contact the developer", { exact: true });
  });

  test("HeaderView does not render properly without HeaderProvider", async () => {
    const { container } = render(
      <LocalStorageProvider>
        <ThemeProvider>
          <HeaderProvider>
            <HeaderView />
          </HeaderProvider>
        </ThemeProvider>
      </LocalStorageProvider>
    );
    expect(container).toBeTruthy();

    expect(
      queryByText(container, "Toggle light/dark mode - Currently light mode.", {
        exact: true
      })
    );
    expect(
      queryByText(container, "Contact the developer", {
        exact: true
      })
    );
  });

  test("HeaderView switch toggles theme.", async () => {
    const { container } = render(
      <LocalStorageProvider>
        <ThemeProvider>
          <HeaderProvider>
            <HeaderView />
          </HeaderProvider>
        </ThemeProvider>
      </LocalStorageProvider>
    );
    expect(container).toBeTruthy();

    userEvent.click(
      await findByLabelText(
        container,
        "Toggle light/dark mode - Currently light mode.",
        { exact: true }
      )
    );
    userEvent.click(
      await findByLabelText(
        container,
        "Toggle light/dark mode - Currently dark mode.",
        { exact: true }
      )
    );
    await findByLabelText(
      container,
      "Toggle light/dark mode - Currently light mode.",
      { exact: true }
    );
  });
});
