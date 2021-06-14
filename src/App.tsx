import {
  LocalStorageProvider,
  ThemeProvider
} from "@employer-tracker-ui/components/GlobalProviders";
import React, { FC } from "react";
import AuthView from "@employer-tracker-ui/components/Auth";

const App: FC = () => (
  <LocalStorageProvider>
    <ThemeProvider>
      <AuthView />
    </ThemeProvider>
  </LocalStorageProvider>
);
export default App;
