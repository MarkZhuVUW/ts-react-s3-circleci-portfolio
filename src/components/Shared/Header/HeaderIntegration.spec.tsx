import {
  LocalStorageProvider,
  ThemeProvider,
  HeaderView
} from "@employer-tracker-ui/components";
import { findByLabelText, findByText, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";

describe("HeaderView integtation tests.", () => {
  test("HeaderView integrated with all dependencies render correctly.", async () => {
    const { container } = render(
      <LocalStorageProvider>
        <ThemeProvider>
          <HeaderView />
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
    await findByText(
      container,
      "Source codes and contact can be found on the right.",
      { exact: true }
    );
  });

  test("HeaderView switch toggles theme.", async () => {
    const { container } = render(
      <LocalStorageProvider>
        <ThemeProvider>
          <HeaderView />
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
