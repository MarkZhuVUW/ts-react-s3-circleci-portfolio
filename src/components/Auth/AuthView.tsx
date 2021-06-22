import React, { FC, useState } from "react";
import LoginView from "./LoginView";

const AuthView: FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <LoginView showPassword={showPassword} setShowPassword={setShowPassword} />
  );
};
export default AuthView;
