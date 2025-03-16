import TodoIcon from "@/assets/todo.svg?react";
import { useIsAuthenticated } from "@azure/msal-react";
import { Navigate } from "react-router-dom";

import BackgroundGradientAnimation from "@/components/background-gradient-animation";

import SignInButton from "./signin-button";

const Login = () => {
  const isAuthenticated = useIsAuthenticated();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <BackgroundGradientAnimation>
      <div className="absolute inset-0 z-50 flex h-full flex-col items-center justify-center space-y-4">
        <TodoIcon style={{ width: 64, height: 64 }} />
        <span className="text-2xl text-white">MS Todo</span>
        <SignInButton />
      </div>
    </BackgroundGradientAnimation>
  );
};

export default Login;
