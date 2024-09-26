import { launchWebAuthFlow } from "@/auth/chrome-identity";
import { getSignOutUrl } from "@/auth/ms-oauth";
import { useMsal } from "@azure/msal-react";
import { Button } from "@nextui-org/react";

/**
 * popup login
 */
function SignOutButton() {
  const { inProgress } = useMsal();

  const handleSignOut = async () => {
    const logoutUrl = await getSignOutUrl();

    await launchWebAuthFlow(logoutUrl);
  };

  return (
    <Button color="primary" isLoading={inProgress === "logout"} onClick={handleSignOut}>
      退出登录
    </Button>
  );
}

export default SignOutButton;
