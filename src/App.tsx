import {
  LocalStorageProvider,
  ThemeProvider,
  AuthView
} from "@employer-tracker-ui/components";
import React, { FC } from "react";
import SnackbarView, { SnackbarProvider } from "./components/Shared/Snackbar";
import { CssBaseline } from "@material-ui/core";

const App: FC = () => (
  <LocalStorageProvider>
    <ThemeProvider>
      <CssBaseline />
      <AuthView />
      <SnackbarProvider>
        <SnackbarView />
      </SnackbarProvider>
    </ThemeProvider>
  </LocalStorageProvider>
);
export default App;
