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
      <LocalStorageProvider>
        <ThemeProvider>
          <SnackbarProvider>
            <SnackbarView />
          </SnackbarProvider>
        </ThemeProvider>
      </LocalStorageProvider>
    );

    expect(container).toBeTruthy();
    // await screen.findByLabelText("New version notification snack bar", {
    //   exact: true
    // });
    // await screen.findByText(
    //   "New version available, please close all tabs of this website and refresh to get the latest content."
    // );
  });
});
