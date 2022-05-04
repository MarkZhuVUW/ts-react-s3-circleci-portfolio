import React from "react";
import { FC } from "react";
import { useAuthReducer, AuthContext } from "./useAuthReducer";
import { AuthProviderProps } from "./types";

const AuthProvider: FC<AuthProviderProps> = ({
  children
}: AuthProviderProps) => {
  const initialState = {
    skipButtonLabel: "skip button label",
    githubAuthLabel: "Github oauth button",
    isAuthenticated: false
  };
  return (
    <AuthContext.Provider value={{ ...useAuthReducer(initialState)[0] }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
