import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { Button } from "@nextui-org/react";

import MSIcon from "@/assets/microsoft.svg?react";
import { launchWebAuthFlow } from "@/auth/chrome-identity";
import { getLoginInUrl } from "@/auth/ms-oauth";

/**
 * popup login
 */
function SignInButton() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSignIn = async () => {
    setLoading(true);
    try {
      const url = await getLoginInUrl();

      const res = await launchWebAuthFlow(url);

      if (res?.accessToken) {
        navigate("/", {
          replace: true,
        });
      }
      else {
        toast.error(t("signError"));
      }
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <Button
      color="primary"
      variant="faded"
      radius="none"
      isLoading={loading}
      startContent={<MSIcon width={16} height={16} />}
      onClick={handleSignIn}
      className="border-1 border-gray-200 bg-white"
    >
      {t("signIn")}
    </Button>
  );
}

export default SignInButton;
