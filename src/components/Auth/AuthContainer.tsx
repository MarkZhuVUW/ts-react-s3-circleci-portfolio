import React, { FC, useState } from "react";
import LoginView from "./LoginView";

const AuthContainer: FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <LoginView showPassword={showPassword} setShowPassword={setShowPassword} />
  );
};
export default AuthContainer;
