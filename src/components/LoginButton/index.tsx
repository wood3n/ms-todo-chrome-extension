import { loginPopupRequest } from "@/auth/loginRequest";
import { useMsal } from "@azure/msal-react";
import { Button } from "@nextui-org/react";

/**
 * popup login
 */
const SignInButton = () => {
	const { instance } = useMsal();

	const handleLogin = () => {
		instance.loginPopup(loginPopupRequest).catch((e) => {
			console.log(e);
		});
	};

	return (
		<Button color="primary" onClick={handleLogin}>
			登录
		</Button>
	);
};

export default SignInButton;
