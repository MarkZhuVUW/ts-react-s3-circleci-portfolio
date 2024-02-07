import React, { FC } from "react";

import {
  AuthenticatedView,
  useAuth,
  AuthView
} from "@portfolio-ui/components/Auth";

import { createContext, useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

type RouteContextType = Record<string, never>;

const RouteContext = createContext<RouteContextType>({});

export const useRoute = (): RouteContextType => useContext(RouteContext);

const RouteProvider: FC = () => {
  const { authStates } = useAuth();
  const { isAuthenticated } = authStates;

  return (
    <RouteContext.Provider value={{}}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/auth" />} />
          <Route path="/auth" element={<AuthView />} />

          <Route path="/authenticated" element={<AuthenticatedView />} />
        </Routes>
      </BrowserRouter>
    </RouteContext.Provider>
  );
};
export default RouteProvider;
