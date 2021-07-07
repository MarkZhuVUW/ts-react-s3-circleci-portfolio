import React from "react";
import {
  LocalStorageProvider,
  ThemeProvider,
  SnackbarView,
  SnackbarProvider
} from "@employer-tracker-ui/components";
import { render, screen } from "@testing-library/react";

describe("Snackbar integration tests.", () => {
  test("Snackbar does not render properly without SnackbarProvider", async () => {
    const { container } = render(<SnackbarView />);

    expect(container).toBeTruthy();
    expect(
      screen.queryByLabelText("New version notification snack bar", {
        exact: true
      })
    ).toBeFalsy();
    expect(
      screen.queryByText(
        "New version available, please close all tabs of this website and refresh to get the latest content.",
        {
          exact: true
        }
      )
    ).toBeFalsy();
  });
  test("Snackbar renders correctly with providers", async () => {
    const { container } = render(
      <SnackbarProvider>
        <SnackbarView />
      </SnackbarProvider>
    );

    expect(container).toBeTruthy();
    expect(
      screen.queryByLabelText("New version notification snack bar", {
        exact: true
      })
    ).toBeFalsy();
    expect(
      screen.queryByText(
        "New version available, click the reload button to get the latest version but it may break existing tabs.",
        { exact: true }
      )
    ).toBeFalsy();
    expect(
      screen.queryByLabelText("Snackbar close icon", { exact: true })
    ).toBeFalsy();
  });
});
