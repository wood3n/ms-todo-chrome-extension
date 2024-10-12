import { useMsal } from "@azure/msal-react";
import { Button } from "@nextui-org/react";

import { launchWebAuthFlow } from "@/auth/chrome-identity";
import { getSignInUrl } from "@/auth/ms-oauth";

/**
 * popup login
 */
function SignInButton() {
  const { inProgress, instance } = useMsal();

  const handleSignIn = async () => {
    const url = await getSignInUrl();

    const authInfo = await launchWebAuthFlow(url);

    if (authInfo?.account) {
      instance.setActiveAccount(authInfo.account);
    }
  };

  return (
    <Button color="primary" isLoading={inProgress === "login"} onClick={handleSignIn}>
      登录
    </Button>
  );
}

export default SignInButton;
