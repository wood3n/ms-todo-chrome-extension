import Drawer from "@/components/drawer";
import LocalDate from "@/components/local-date";
import TaskList from "@/components/task-list";
import TodoList from "@/components/todo-list";
import { SettingConfig } from "@icon-park/react";
import { Button } from "@nextui-org/react";
import { useState } from "react";

const Home = () => {
	const [open, setOpen] = useState(false);

	return (
		<main className="h-full p-2 flex flex-col">
			<div className="flex mb-2 justify-between items-center">
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
				<LocalDate />
			</div>
			<div className="flex-1 p-2 overflow-auto">
				<TaskList />
			</div>
			<Drawer
				isOpen={open}
				onClose={() => setOpen(false)}
				onOpenChange={setOpen}
			>
				<TodoList onClose={() => setOpen(false)} />
			</Drawer>
		</main>
	);
};

export default Home;
