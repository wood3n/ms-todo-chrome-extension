import { getLoginUrl, launchWebAuthFlow } from "@/auth/login";
import { Button } from "@nextui-org/react";

/**
 * popup login
 */
const SignInButton = () => {
	const handleLogin = async () => {
		const url = await getLoginUrl();

		const result = await launchWebAuthFlow(url);

		console.log("result>>", result);
	};

	return (
		<Button color="primary" onClick={handleLogin}>
			登录
		</Button>
	);
};

export default SignInButton;
