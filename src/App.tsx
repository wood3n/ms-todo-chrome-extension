import { useIsAuthenticated } from "@azure/msal-react";
import { Button } from "@nextui-org/button";
import "./App.css";

const App = () => {
	const isAuthenticated = useIsAuthenticated();

	return (
		<div>
			{isAuthenticated ? (
				<h1>以登录</h1>
			) : (
				<Button color="primary">登录</Button>
			)}
		</div>
	);
};

export default App;
