import TodoIcon from "@/assets/microsoft-todo.svg?react";
import Drawer from "@/components/drawer";
import LocalDate from "@/components/local-date";
import TodoTaskList from "@/components/task-list";
import TodoList from "@/components/todo-list";
import { SettingConfig } from "@icon-park/react";
import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import { useState } from "react";

const Home = () => {
	const [open, setOpen] = useState(false);

	return (
		<main className="h-full">
			<Card radius="none" className="h-full">
				<CardHeader className="justify-between">
					<Button
						isIconOnly
						variant="light"
						size="sm"
						onClick={() => setOpen(true)}
					>
						<SettingConfig
							theme="outline"
							size={18}
							className="dark:text-white"
						/>
					</Button>
					<div>
						<LocalDate />
					</div>
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
		</main>
	);
};

export default Home;
