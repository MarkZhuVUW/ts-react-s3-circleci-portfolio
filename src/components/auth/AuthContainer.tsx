import React, { FC } from "react";
import LoginView from "./LoginView";

type AuthContainerProps = {
  // theme: Theme;
};
const AuthContainer: FC<AuthContainerProps> = ({}: AuthContainerProps) => (
  <LoginView />
);

export default AuthContainer;
