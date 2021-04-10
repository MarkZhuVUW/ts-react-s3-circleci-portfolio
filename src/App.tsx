import React, { FC } from "react";
import Login from "./components/Login";
import { LocalStorageProvider } from "./providers/LocalStorageProvider";
import { ThemeProvider } from "./providers/ThemeProvider";

const App: FC = () => (
  <LocalStorageProvider>
    <ThemeProvider>
      <Login />
    </ThemeProvider>
  </LocalStorageProvider>
);
export default App;
