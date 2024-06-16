import Drawer from "@/components/drawer";
import TodoTaskList from "@/components/task-list";
import TodoList from "@/components/todo-list";
import { SettingConfig } from "@icon-park/react";
import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import { useState } from "react";

const Home = () => {
	const [open, setOpen] = useState(false);

	return (
		<Card radius="none" className="h-full">
			<CardHeader>
				<Button
					isIconOnly
					variant="light"
					size="sm"
					onClick={() => setOpen(true)}
				>
					<SettingConfig theme="outline" size={18} fill="#333" />
				</Button>
			</CardHeader>
			<CardBody>
				<TodoTaskList />
			</CardBody>
			<Drawer
				isOpen={open}
				onClose={() => setOpen(false)}
				onOpenChange={setOpen}
			>
				<TodoList />
			</Drawer>
		</Card>
	);
};

export default Home;
