import { Navigate } from "react-router-dom";

import { useIsAuthenticated } from "@azure/msal-react";
import { Button, Card, CardBody } from "@nextui-org/react";

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
      <Button
        color="primary"
        variant="faded"
        onClick={() => window.open("https://to-do.office.com/tasks/", "_blank", "popup")}
        className="border-1 border-gray-200 bg-white"
      >
        Register an account
      </Button>
    </div>
  );
};

export default Login;
