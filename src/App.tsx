import {
  LocalStorageProvider,
  ThemeProvider,
  AuthView
} from "@employer-tracker-ui/components";
import React, { FC } from "react";

const App: FC = () => (
  <LocalStorageProvider>
    <ThemeProvider>
      <AuthView />
    </ThemeProvider>
  </LocalStorageProvider>
);
export default App;
