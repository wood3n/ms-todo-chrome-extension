import React from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@nextui-org/react";

const Error = () => {
  const navigate = useNavigate();

  return (
    <div className="flex size-full flex-col items-center justify-center space-y-6">
      <h1 className="text-xl text-yellow-600">OOPS!</h1>
      <p className="text-lg">Something went wrong</p>
      <Button color="primary" variant="flat" onClick={() => navigate("/")}>Go home</Button>
    </div>
  );
};

export default Error;
