import { Navigate } from "react-router-dom";

import { useIsAuthenticated } from "@azure/msal-react";
import { Card, CardBody } from "@nextui-org/react";

import TodoIcon from "@/assets/microsoft-todo.svg?react";
import SignInButton from "@/components/signin-button";

const Login = () => {
  const isAuthenticated = useIsAuthenticated();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex size-full flex-col items-center justify-center space-y-6">
      <Card>
        <CardBody>
          <TodoIcon width={48} height={48} />
        </CardBody>
      </Card>
      <SignInButton />
    </div>
  );
};

export default Login;
