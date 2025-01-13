import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { Button } from "@nextui-org/react";

const Error = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="flex size-full flex-col items-center justify-center space-y-6">
      <h1 className="text-xl text-yellow-600">OOPS!</h1>
      <p className="text-lg">{t("error")}</p>
      <Button color="primary" variant="flat" onClick={() => navigate("/")}>{t("Back to the list of tasks")}</Button>
    </div>
  );
};

export default Error;
