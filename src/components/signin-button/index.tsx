import { launchWebAuthFlow } from "@/auth/chrome-identity";
import { getSignInUrl } from "@/auth/ms-oauth";
import { useMsal } from "@azure/msal-react";
import { Button } from "@nextui-org/react";

/**
 * popup login
 */
const SignInButton = () => {
	const { inProgress } = useMsal();

	const handleSignIn = async () => {
		const url = await getSignInUrl();

		const result = await launchWebAuthFlow(url);

		console.log("result>>", result);
	};

	return (
		<Button
			color="primary"
			isLoading={inProgress === "login"}
			onClick={handleSignIn}
		>
			登录
		</Button>
	);
};

export default SignInButton;
