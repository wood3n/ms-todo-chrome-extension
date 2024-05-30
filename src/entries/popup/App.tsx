import { getTodoList } from "@/api/todolist";
import SignInButton from "@/components/signin-button";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { User } from "@nextui-org/user";
import { useRequest } from "ahooks";

import "./App.css";
import SignOutButton from "@/components/signout-button";

const App = () => {
	const isAuthenticated = useIsAuthenticated();
	const msalInstance = useMsal();
	const acount = msalInstance.instance.getActiveAccount();

	const { data } = useRequest(getTodoList);

	console.log(data);

	return <div>{isAuthenticated ? <SignOutButton /> : <SignInButton />}</div>;
};

export default App;
