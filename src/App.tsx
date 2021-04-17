import React, { FC } from "react";
import { LocalStorageProviderDebug } from "../tests/Utils";
import AuthContainer from "./components/auth/AuthContainer";
import { LocalStorageProvider } from "./providers/LocalStorageProvider";
import { ThemeProvider } from "./providers/ThemeProvider";

const App: FC = () => (
  <LocalStorageProvider>
    <ThemeProvider>
      <LocalStorageProviderDebug functionToDebug="setItem" />
    </ThemeProvider>
  </LocalStorageProvider>
);
export default App;
