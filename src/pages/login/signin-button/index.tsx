import { useState } from "react";
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
        toast.error("登录失败，请重试");
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
      isLoading={loading}
      startContent={<MSIcon width={16} height={16} />}
      onClick={handleSignIn}
      className="border-1 border-gray-200 bg-white"
    >
      Connect with Microsoft Account
    </Button>
  );
}

export default SignInButton;
