import SignInButton from "@/components/LoginButton";
import { useIsAuthenticated } from "@azure/msal-react";

import "./App.css";

const App = () => {
	const isAuthenticated = useIsAuthenticated();

	return <div>{isAuthenticated ? <h1>已登录</h1> : <SignInButton />}</div>;
};

export default App;
