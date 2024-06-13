import { getTodoList } from "@/api/todolist";
import { getUser, getUserAvatar } from "@/api/user";
import Drawer from "@/components/drawer";
import SignInButton from "@/components/signin-button";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { SettingConfig } from "@icon-park/react";
import { Button, Card, CardBody, Modal, User } from "@nextui-org/react";
import { useRequest } from "ahooks";

import "./App.css";
import SignOutButton from "@/components/signout-button";
import { useState } from "react";

const App = () => {
	const isAuthenticated = useIsAuthenticated();
	const msalInstance = useMsal();
	const acount = msalInstance.instance.getActiveAccount();

	const { data } = useRequest(getTodoList);

	const { data: user } = useRequest(getUser);

	const { data: avatarUrl } = useRequest(async () => {
		const res = await getUserAvatar();

		console.log(res);

		const url = URL.createObjectURL(res);

		console.log(url);

		return url;
	});

	const [open, setOpen] = useState(false);

	console.log(acount);

	return (
		<Card radius="none" className="h-full">
			<CardBody>
				<Button isIconOnly size="sm" onClick={() => setOpen(true)}>
					<SettingConfig theme="outline" size={18} fill="#333" />
				</Button>
			</CardBody>
			<Drawer
				isOpen={open}
				onClose={() => setOpen(false)}
				onOpenChange={setOpen}
			>
				<div className="flex items-center">
					<User
						name={
							navigator.language.includes("zh")
								? `${user?.surname || ""}${user?.givenName || ""}`
								: user?.displayName
						}
						description={user?.mail}
						avatarProps={{
							src: avatarUrl,
						}}
					/>
				</div>
			</Drawer>
		</Card>
	);
};

export default App;
