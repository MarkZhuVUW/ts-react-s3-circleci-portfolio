import {
  LocalStorageProvider,
  ThemeProvider
} from "@employer-tracker-ui/components/GlobalProviders";
import React, { FC } from "react";
import { Auth } from "@employer-tracker-ui/components/Auth";

const App: FC = () => (
  <LocalStorageProvider>
    <ThemeProvider>
      <Auth />
    </ThemeProvider>
  </LocalStorageProvider>
);
export default App;
