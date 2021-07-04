import {
  LocalStorageProvider,
  ThemeProvider,
  AuthView
} from "@employer-tracker-ui/components";
import React, { FC } from "react";
import SnackbarView, { SnackbarProvider } from "./components/Shared/Snackbar";

const App: FC = () => (
  <LocalStorageProvider>
    <ThemeProvider>
      <AuthView />
      <SnackbarProvider>
        <SnackbarView />
      </SnackbarProvider>
    </ThemeProvider>
  </LocalStorageProvider>
);
export default App;
