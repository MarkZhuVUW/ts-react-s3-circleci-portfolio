import {
  AuthProvider,
  HeaderProvider,
  HeaderView,
  LocalStorageProvider,
  RouteProvider,
  ThemeProvider
} from "@portfolio-ui/components";
import React, { FC } from "react";
import { SnackbarView, SnackbarProvider } from "./components";
import { CssBaseline } from "@material-ui/core";

const App: FC = () => {
  return (
    <div>
      <LocalStorageProvider>
        <ThemeProvider>
          <CssBaseline />
          <HeaderProvider>
            <HeaderView />
          </HeaderProvider>
          <AuthProvider>
            <RouteProvider />
          </AuthProvider>
          <SnackbarProvider>
            <SnackbarView />
          </SnackbarProvider>
        </ThemeProvider>
      </LocalStorageProvider>
    </div>
  );
};
export default App;
