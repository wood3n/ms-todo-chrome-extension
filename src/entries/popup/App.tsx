import { getUser } from "@/api/user";
import SignInButton from "@/components/signin-button";
import SignOutButton from "@/components/signout-button";
import { useIsAuthenticated } from "@azure/msal-react";

import "./App.css";
import { useEffect } from "react";

const App = () => {
	const isAuthenticated = useIsAuthenticated();

	useEffect(() => {
		getUser();
	}, []);

	return <div>{isAuthenticated ? <SignOutButton /> : <SignInButton />}</div>;
};

export default App;
