import {
  LocalStorageProvider,
  ThemeProvider
} from "./components/GlobalProviders";
import React, { FC } from "react";
import { Auth } from "./components/Auth";

const App: FC = () => (
  <LocalStorageProvider>
    <ThemeProvider>
      <Auth />
    </ThemeProvider>
  </LocalStorageProvider>
);
export default App;
