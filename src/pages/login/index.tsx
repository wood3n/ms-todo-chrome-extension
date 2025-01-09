import { Navigate } from "react-router-dom";

import { useIsAuthenticated } from "@azure/msal-react";

import TodoIcon from "@/assets/microsoft-todo.svg?react";
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
        <TodoIcon width={64} height={64} />
        <span className="text-2xl text-white">Microsoft To Do</span>
        <SignInButton />
      </div>
    </BackgroundGradientAnimation>
  );
};

export default Login;
