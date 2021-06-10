import { findByLabelText, findByText, render } from "@testing-library/react";
import React from "react";
import {
  LocalStorageProvider,
  ThemeProvider,
  MuiTheme
} from "@employer-tracker-ui/components/GlobalProviders";
import HeaderContainer from "./HeaderContainer";
import userEvent from "@testing-library/user-event";
import HeaderView from "./HeaderView";
describe("HeaderCotainer tests.", () => {
  test("HeaderView renders correctly", async () => {
    const { container } = render(
      <HeaderView theme={MuiTheme.Light} toggleLightDarkTheme={() => ({})} />
    );
    expect(container).toBeTruthy();

    userEvent.click(
      await findByLabelText(
        container,
        "Toggle light/dark mode - Currently light mode.",
        { exact: true }
      )
    );

    await findByLabelText(container, "Contact the developer", { exact: true });
    await findByText(
      container,
      "Source codes and contact can be found on the right.",
      { exact: true }
    );
  });

  test("HeaderContainer theme toggling works", async () => {
    const { container } = render(
      <LocalStorageProvider>
        <ThemeProvider>
          <HeaderContainer />
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

    await findByLabelText(
      container,
      "Toggle light/dark mode - Currently dark mode.",
      { exact: true }
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
