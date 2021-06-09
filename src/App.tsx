import React, { FC } from "react";
import { Auth } from "components/Auth";
import { LocalStorageProvider, ThemeProvider } from "GlobalProviders";

const App: FC = () => (
  <LocalStorageProvider>
    <ThemeProvider>
      <Auth />
    </ThemeProvider>
  </LocalStorageProvider>
);
export default App;
